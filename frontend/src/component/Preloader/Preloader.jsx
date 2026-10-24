import "./Preloader.css";

// Change these to your site's branding
export const SITE_NAME = "The Editorial";
const TAGLINE = "Stories worth your time";

export default function Preloader({ kind, leaving, durationMs }) {
  const className = [
    "pl",
    kind === "route" && !leaving ? "pl--route" : "",
    kind === "route" ? "pl--fast" : "",
    leaving ? "pl--leaving" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={className}
      role="status"
      aria-live="polite"
      aria-label="Loading"
      style={{ "--pl-duration": `${durationMs}ms` }}
    >
      <div className="pl__inner">
        <h1 className="pl__brand" aria-hidden="true">
          {SITE_NAME.split("").map((ch, i) => (
            <span className="pl__mask" key={i}>
              <span className="pl__char" style={{ "--i": i }}>
                {ch === " " ? "\u00A0" : ch}
              </span>
            </span>
          ))}
        </h1>
        {kind !== "route" && <p className="pl__tagline">{TAGLINE}</p>}
        <div className="pl__bar" aria-hidden="true">
          <span className="pl__bar-fill" />
        </div>
      </div>
    </div>
  );
}