
import { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Mail, LockKeyhole, Check } from "lucide-react";
import "./Login.css";
import axios from "axios";
import {AuthContext} from '../context/AuthContext'
 
const api  ='http://localhost:8000'

const fieldClass = (hasError) =>
  `flex items-center gap-3 rounded-xl border bg-white px-4 transition focus-within:ring-4 ${
    hasError
      ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-100"
      : "border-gray-200 hover:border-gray-300 focus-within:border-amber-500 focus-within:ring-amber-400/20"
  }`;

const inputClass =
  "min-w-0 flex-1 bg-transparent py-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-400";

const labelClass = "text-sm font-medium text-gray-700";

export default function Login() {
  const navigate =useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

 const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  setErrors({});
  setMessage("");
};



    const { dispatch } = useContext(AuthContext); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.name)) {
      newErrors.email = "Enter a valid username.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setMessage("Form validated. Connect your authentication API to sign in.");
    }

    try {
      const response = await axios.post(`${api}/auth/login`, 
       formData
      );
      const { token, user } = response.data;

      dispatch({
        type: "LOGIN",
        payload: { token, username: user.username, id: user.id },
      });

      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);

   setFormData({name : "",email : ""})

      alert("User logged in successfully");
      console.log("User logged in :" , formData)
      navigate("/profile");
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data?.message || error.message,
      );
      alert(error.response?.data?.message || "Login failed");
    }

  };

  return (
    <main className="lg-page mt-8 min-h-screen bg-[#fffaf5] p-4 sm:p-6 lg:p-10 ">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_18px_60px_-35px_rgba(80,50,20,0.25)] lg:grid-cols-2 ">
        {/* Brand panel */}
        <section className="relative flex min-h-[300px] flex-col justify-between overflow-hidden bg-gray-900 p-7 text-white sm:p-10 lg:min-h-full lg:p-14">
          {/* <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 85% 15%, rgba(245,158,11,0.22) 0, transparent 38%), radial-gradient(circle at 5% 95%, rgba(180,83,9,0.30) 0, transparent 42%)",
            }}
          /> */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border-[32px] border-white/5"
          />

          <Link
            to="/"
            className="relative flex w-fit items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-amber-500/60 text-sm font-semibold text-amber-500">
              L.
            </span>
            <span>
              <span className="block text-lg font-semibold tracking-[0.16em]">
                THE LENS
              </span>
              <span className="mt-1 block text-[10px] tracking-[0.25em] text-gray-400">
                IDEAS WORTH YOUR TIME
              </span>
            </span>
          </Link>

          <div className="relative my-10 max-w-lg lg:my-16">
            <span className="mb-6 inline-block rounded-full border border-amber-400/40 px-4 py-2 text-xs uppercase tracking-[0.2em] text-amber-400">
              Read beyond the headlines
            </span>

            <h1 className="font-editorial text-4xl font-semibold leading-[1.13] tracking-tight sm:text-5xl lg:text-6xl">
              Make room for
              <span className="block italic text-amber-400">
                deeper thinking.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-gray-300 sm:text-base">
              Discover thoughtful perspectives on technology, culture, science,
              work, and the ideas shaping our world.
            </p>

            <div className="mt-10 border-l-2 border-amber-500 pl-5">
              <p className="font-editorial text-lg italic text-white">
                “Not everything important fits in a headline.”
              </p>
              <p className="mt-2 text-xs tracking-wider text-amber-400">
                YOUR NEXT GOOD READ STARTS HERE
              </p>
            </div>
          </div>

          <p className="relative text-xs text-gray-400">
            © {new Date().getFullYear()} The Lens. All rights reserved.
          </p>
        </section>

        {/* Login form */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-12 lg:px-16">
          <div className="w-full max-w-md">
            <Link
              to="/"
              className="mb-10 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-amber-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
            >
              <ArrowRight className="rotate-180" size={16} aria-hidden="true" />
              Back to home
            </Link>

            <div className="mb-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">
                Welcome back
              </p>
              <h2 className="font-editorial text-4xl font-semibold text-gray-900 sm:text-5xl">
                Sign in
              </h2>
              <p className="mt-4 text-sm leading-6 text-gray-500">
                Sign in to continue exploring stories and perspectives that
                matter.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className={`${labelClass} mb-2 block`}>
                  Username
                </label>
                <div className={fieldClass(errors.email)}>
                  <Mail
                    size={18}
                    className="shrink-0 text-gray-500"
                    aria-hidden="true"
                  />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="username"
                    placeholder="Enter your username"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                {errors.email && (
                  <p
                    id="email-error"
                    role="alert"
                    className="mt-2 text-xs text-red-600"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label htmlFor="password" className={labelClass}>
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-amber-700 transition hover:text-amber-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className={fieldClass(errors.password)}>
                  <LockKeyhole
                    size={18}
                    className="shrink-0 text-gray-500"
                    aria-hidden="true"
                  />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={formData.password ?? ""}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password ? "password-error" : undefined
                    }
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                    className="shrink-0 rounded text-gray-500 transition hover:text-amber-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  >
                    {showPassword ? (
                      <EyeOff size={18} aria-hidden="true" />
                    ) : (
                      <Eye size={18} aria-hidden="true" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p
                    id="password-error"
                    role="alert"
                    className="mt-2 text-xs text-red-600"
                  >
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember me */}
              <label className="flex w-fit cursor-pointer items-center gap-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`flex h-4 w-4 items-center justify-center rounded border transition peer-focus-visible:ring-2 peer-focus-visible:ring-amber-500 peer-focus-visible:ring-offset-2 ${
                    rememberMe
                      ? "border-amber-600 bg-amber-600 text-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {rememberMe && <Check size={12} />}
                </span>
                Remember me
              </label>

              {message && (
                <p
                  role="status"
                  className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-800"
                >
                  {message}
                </p>
              )}

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-4 text-sm font-medium text-white transition duration-300 hover:bg-amber-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/50"
              >
                Sign in
                <ArrowRight
                  size={17}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </form>

            <div className="my-8 flex items-center gap-4" aria-hidden="true">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs tracking-wide text-gray-500">
                NEW TO THE LENS?
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <Link
              to="/register"
              className="flex w-full items-center justify-center rounded-xl border border-gray-300 px-5 py-3.5 text-sm font-medium text-gray-900 transition hover:border-amber-600 hover:bg-amber-50 hover:text-amber-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400/40"
            >
              Create an account
            </Link>

            <p className="mt-8 text-center text-xs leading-6 text-gray-500">
              By continuing, you agree to our{" "}
              <Link
                to="/terms"
                className="underline underline-offset-2 transition hover:text-amber-700"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="underline underline-offset-2 transition hover:text-amber-700"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}