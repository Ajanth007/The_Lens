import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import Preloader from "./Preloader";

// ---- Timings (ms) ----
const FIRST_VISIT_MS = 2800; // first visit in this browser session
const REPEAT_LOAD_MS = 1000; // later full page loads
const ROUTE_MS = 900;        // curtain between routes
const EXIT_MS = 900;         // curtain slide-away duration (match CSS)
const MAX_WAIT_MS = 10000;   // safety: never block the site longer than this
const SESSION_KEY = "preloader:seen";

const PreloaderContext = createContext({ hold: () => {}, release: () => {} });

export const usePreloader = () => useContext(PreloaderContext);

/**
 * Keeps the curtain closed while `active` is true.
 * Usage: usePreloaderHold(loading);
 */
export function usePreloaderHold(active) {
  const { hold, release } = usePreloader();
  useEffect(() => {
    if (!active) return undefined;
    hold();
    return release;
  }, [active, hold, release]);
}

function wasSeen() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* storage unavailable */
  }
}

export function PreloaderProvider({ children }) {
  const location = useLocation();
  const [firstVisit] = useState(() => !wasSeen());
  const [state, setState] = useState({ show: true, leaving: false, kind: "initial", key: 0 });
  const [holds, setHolds] = useState(0);
  const [minDone, setMinDone] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);
  const lastPath = useRef(location.pathname);

  const hold = useCallback(() => setHolds((h) => h + 1), []);
  const release = useCallback(() => setHolds((h) => Math.max(0, h - 1)), []);

  const duration =
    state.kind === "route" ? ROUTE_MS : firstVisit ? FIRST_VISIT_MS : REPEAT_LOAD_MS;

  // Wait for web fonts (Playfair / DM Sans) so text doesn't jump after reveal
  useEffect(() => {
    let done = false;
    const finish = () => {
      if (!done) {
        done = true;
        setFontsReady(true);
      }
    };
    const t = setTimeout(finish, 1500);
    if (document.fonts?.ready) document.fonts.ready.then(finish);
    else finish();
    return () => clearTimeout(t);
  }, []);

  // Route change: close the curtain again
  useEffect(() => {
    if (location.pathname === lastPath.current) return;
    lastPath.current = location.pathname;
    setMinDone(false);
    setState((s) => ({ show: true, leaving: false, kind: "route", key: s.key + 1 }));
  }, [location.pathname]);

  // Minimum display time + safety timeout for each curtain
  useEffect(() => {
    const key = state.key;
    const min = setTimeout(() => setMinDone(true), duration);
    const safety = setTimeout(
      () => setState((s) => (s.key === key && s.show ? { ...s, leaving: true } : s)),
      MAX_WAIT_MS
    );
    return () => {
      clearTimeout(min);
      clearTimeout(safety);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.key]);

  // Open the curtain when the minimum time is up, fonts are ready and nothing is holding it
  useEffect(() => {
    if (state.show && !state.leaving && minDone && fontsReady && holds === 0) {
      setState((s) => ({ ...s, leaving: true }));
    }
  }, [state.show, state.leaving, minDone, fontsReady, holds]);

  // Remove the curtain after the slide-away finishes
  useEffect(() => {
    if (!state.leaving) return undefined;
    const t = setTimeout(() => {
      setState((s) => ({ ...s, show: false, leaving: false }));
      markSeen();
    }, EXIT_MS);
    return () => clearTimeout(t);
  }, [state.leaving]);

  // Lock scrolling while the curtain is closed
  useEffect(() => {
    if (!state.show) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [state.show]);

  const value = useMemo(() => ({ hold, release }), [hold, release]);

  return (
    <PreloaderContext.Provider value={value}>
      {children}
      {state.show && (
        <Preloader
          key={state.key}
          kind={state.kind}
          leaving={state.leaving}
          durationMs={duration}
        />
      )}
    </PreloaderContext.Provider>
  );
}