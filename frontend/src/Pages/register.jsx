// // Register.jsx
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   UserRound,
//   Mail,
//   LockKeyhole,
//   MapPin,
//   Eye,
//   EyeOff,
//   Palette,
//   ArrowRight,
// } from "lucide-react";

// const avatarBgOptions = [
//   { label: "Amber", value: "#fef3c7" },
//   { label: "Blue", value: "#dbeafe" },
//   { label: "Pink", value: "#fce7f3" },
//   { label: "Green", value: "#d1fae5" },
// ];

// const avatarTextOptions = [
//   { label: "Brown", value: "#92400e" },
//   { label: "Blue", value: "#1d4ed8" },
//   { label: "Pink", value: "#9d174d" },
//   { label: "Green", value: "#065f46" },
// ];

// const accentColorOptions = [
//   { label: "Amber", value: "#f59e0b" },
//   { label: "Blue", value: "#3b82f6" },
//   { label: "Pink", value: "#ec4899" },
//   { label: "Green", value: "#10b981" },
// ];

// function Register() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const [formData, setFormData] = useState({
//     name: "",
//     initials: "",
//     email: "",
//     role: "",
//     bio: "",
//     avatar_bg: "#fef3c7",
//     avatar_text: "#92400e",
//     accent_color: "#f59e0b",
//     location: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//       ...(name === "name" && !prev.initials
//         ? {
//             initials: value
//               .trim()
//               .split(/\s+/)
//               .filter(Boolean)
//               .slice(0, 2)
//               .map((word) => word[0].toUpperCase())
//               .join(""),
//           }
//         : {}),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!formData.name.trim() || !formData.email.trim()) {
//       setError("Please enter your name and email address.");
//       return;
//     }

//     if (formData.password.length < 8) {
//       setError("Password must contain at least 8 characters.");
//       return;
//     }

//     setLoading(true);

//     try {
//       // Connect this function to your backend registration API.
//       // Example:
//       // await axios.post("http://localhost:8000/auth/register", formData);

//       console.log("Registration data:", formData);
//       setSuccess(
//         "Form validation successful. Connect your registration API to create your account.",
//       );
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Registration failed. Please try again.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputClass =
//     "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100";

//   const labelClass = "mb-2 block text-sm font-medium text-gray-900";

//   const selectClass =
//     "w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-100";

//   const initials =
//     formData.initials.trim().toUpperCase() ||
//     formData.name
//       .trim()
//       .split(/\s+/)
//       .filter(Boolean)
//       .slice(0, 2)
//       .map((word) => word[0].toUpperCase())
//       .join("") ||
//     "U";

//   return (
//     <>
//       <style></style>
//       <main className="min-h-screen bg-[#fed7aa]/20 px-4 py-10 text-gray-900 sm:px-6 lg:px-8">
//         <div className="mx-auto grid min-h-[700px] max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-amber-900/5 lg:grid-cols-2">
//           {/* Left section */}
//           <section className="relative hidden flex-col justify-between overflow-hidden bg-gray-900 p-10 text-white lg:flex xl:p-14">
//             <div className="absolute -right-24 -top-20 h-80 w-80 rounded-full bg-amber-500/20 blur-3xl" />
//             <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#fed7aa]/10 blur-3xl" />

//             <div className="relative z-10">
//               <Link
//                 to="/"
//                 className="text-xl font-bold tracking-[0.2em] text-amber-500"
//               >
//                 THE LENS
//               </Link>
//               <p className="mt-2 text-xs tracking-[0.25em] text-gray-400">
//                 STORIES THAT MATTER
//               </p>
//             </div>

//             <div className="relative z-10 max-w-md">
//               <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 px-4 py-2 text-xs text-amber-500">
//                 <Palette size={14} />
//                 YOUR VOICE. YOUR SPACE.
//               </span>

//               <h1 className="mt-8 text-4xl font-semibold leading-tight xl:text-5xl">
//                 Every writer has a story worth sharing.
//               </h1>

//               <p className="mt-6 max-w-sm leading-7 text-gray-400">
//                 Create your profile, introduce yourself, and make your mark with
//                 ideas that inspire, inform, and challenge perspectives.
//               </p>

//               <div className="mt-10 flex items-center gap-4">
//                 <div className="flex -space-x-3">
//                   {avatarBgOptions.map((option, index) => (
//                     <div
//                       key={option.value}
//                       className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-gray-900 text-sm font-semibold"
//                       style={{
//                         backgroundColor: option.value,
//                         color: avatarTextOptions[index].value,
//                       }}
//                     >
//                       {["A", "J", "M", "S"][index]}
//                     </div>
//                   ))}
//                 </div>
//                 <p className="text-sm text-gray-400">
//                   A space for every perspective.
//                 </p>
//               </div>
//             </div>

//             <p className="relative z-10 text-xs text-gray-500">
//               Read thoughtfully. Write boldly.
//             </p>
//           </section>

//           {/* Registration form */}
//           <section className="px-5 py-9 sm:px-10 sm:py-12 lg:px-12 xl:px-16">
//             <div className="mx-auto max-w-lg">
//               <div className="mb-8">
//                 <Link
//                   to="/"
//                   className="text-sm font-medium text-amber-700 hover:text-amber-500 lg:hidden"
//                 >
//                   ← Back to home
//                 </Link>

//                 <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
//                   Join the community
//                 </p>

//                 <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900">
//                   Create your account
//                 </h2>

//                 <p className="mt-3 text-sm leading-6 text-gray-500">
//                   Set up your author profile and tell the world a little about
//                   yourself.
//                 </p>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Name and initials */}
//                 <div className="grid gap-5 sm:grid-cols-2">
//                   <div>
//                     <label htmlFor="name" className={labelClass}>
//                       Full name *
//                     </label>
//                     <div className="relative">
//                       <UserRound
//                         size={17}
//                         className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
//                       />
//                       <input
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         placeholder="Your full name"
//                         className={`${inputClass} pl-10`}
//                         autoComplete="name"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="initials" className={labelClass}>
//                       Initials
//                     </label>
//                     <input
//                       id="initials"
//                       name="initials"
//                       value={formData.initials}
//                       onChange={handleChange}
//                       placeholder="e.g. AA"
//                       maxLength={4}
//                       className={inputClass}
//                     />
//                   </div>
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label htmlFor="email" className={labelClass}>
//                     Email address *
//                   </label>
//                   <div className="relative">
//                     <Mail
//                       size={17}
//                       className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
//                     />
//                     <input
//                       id="email"
//                       name="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       placeholder="you@example.com"
//                       className={`${inputClass} pl-10`}
//                       autoComplete="email"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Role */}
//                 <div>
//                   <label htmlFor="role" className={labelClass}>
//                     Your role
//                   </label>
//                   <input
//                     id="role"
//                     name="role"
//                     value={formData.role}
//                     onChange={handleChange}
//                     placeholder="e.g. Writer, Journalist, Designer"
//                     className={inputClass}
//                     maxLength={80}
//                   />
//                   <p className="mt-2 text-xs text-gray-500">
//                     Enter any role or title that describes you.
//                   </p>
//                 </div>

//                 {/* Bio */}
//                 <div>
//                   <label htmlFor="bio" className={labelClass}>
//                     Short bio
//                   </label>
//                   <textarea
//                     id="bio"
//                     name="bio"
//                     value={formData.bio}
//                     onChange={handleChange}
//                     placeholder="Tell readers what you write about..."
//                     rows={3}
//                     maxLength={300}
//                     className={`${inputClass} resize-y`}
//                   />
//                   <p className="mt-1 text-right text-xs text-gray-400">
//                     {formData.bio.length}/300
//                   </p>
//                 </div>

//                 {/* Avatar colors */}
//                 <div>
//                   <div className="mb-4">
//                     <h3 className="text-sm font-semibold text-gray-900">
//                       Personalize your profile
//                     </h3>
//                     <p className="mt-1 text-xs text-gray-500">
//                       Choose the colors for your avatar and profile accent.
//                     </p>
//                   </div>

//                   <div className="grid gap-4 sm:grid-cols-3">
//                     <div>
//                       <label htmlFor="avatar_bg" className={labelClass}>
//                         Avatar background
//                       </label>
//                       <select
//                         id="avatar_bg"
//                         name="avatar_bg"
//                         value={formData.avatar_bg}
//                         onChange={handleChange}
//                         className={selectClass}
//                       >
//                         {avatarBgOptions.map((option) => (
//                           <option key={option.value} value={option.value}>
//                             {option.label}
//                           </option>
//                         ))}
//                       </select>
//                       <div
//                         className="mt-2 h-6 rounded-md border border-gray-200"
//                         style={{ backgroundColor: formData.avatar_bg }}
//                       />
//                     </div>

//                     <div>
//                       <label htmlFor="avatar_text" className={labelClass}>
//                         Avatar text
//                       </label>
//                       <select
//                         id="avatar_text"
//                         name="avatar_text"
//                         value={formData.avatar_text}
//                         onChange={handleChange}
//                         className={selectClass}
//                       >
//                         {avatarTextOptions.map((option) => (
//                           <option key={option.value} value={option.value}>
//                             {option.label}
//                           </option>
//                         ))}
//                       </select>
//                       <div
//                         className="mt-2 flex h-6 items-center justify-center rounded-md text-xs font-bold"
//                         style={{
//                           backgroundColor: formData.avatar_bg,
//                           color: formData.avatar_text,
//                         }}
//                       >
//                         Aa
//                       </div>
//                     </div>

//                     <div>
//                       <label htmlFor="accent_color" className={labelClass}>
//                         Accent color
//                       </label>
//                       <select
//                         id="accent_color"
//                         name="accent_color"
//                         value={formData.accent_color}
//                         onChange={handleChange}
//                         className={selectClass}
//                       >
//                         {accentColorOptions.map((option) => (
//                           <option key={option.value} value={option.value}>
//                             {option.label}
//                           </option>
//                         ))}
//                       </select>
//                       <div
//                         className="mt-2 h-6 rounded-md"
//                         style={{ backgroundColor: formData.accent_color }}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Location */}
//                 <div>
//                   <label htmlFor="location" className={labelClass}>
//                     Location
//                   </label>
//                   <div className="relative">
//                     <MapPin
//                       size={17}
//                       className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
//                     />
//                     <input
//                       id="location"
//                       name="location"
//                       value={formData.location}
//                       onChange={handleChange}
//                       placeholder="City, Country"
//                       className={`${inputClass} pl-10`}
//                       autoComplete="address-level2"
//                       maxLength={120}
//                     />
//                   </div>
//                 </div>

//                 {/* Password */}
//                 <div>
//                   <label htmlFor="password" className={labelClass}>
//                     Password *
//                   </label>
//                   <div className="relative">
//                     <LockKeyhole
//                       size={17}
//                       className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
//                     />
//                     <input
//                       id="password"
//                       name="password"
//                       type={showPassword ? "text" : "password"}
//                       value={formData.password}
//                       onChange={handleChange}
//                       placeholder="At least 8 characters"
//                       className={`${inputClass} pl-10 pr-12`}
//                       autoComplete="new-password"
//                       minLength={8}
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword((prev) => !prev)}
//                       aria-label={
//                         showPassword ? "Hide password" : "Show password"
//                       }
//                       className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-amber-700"
//                     >
//                       {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Feedback */}
//                 {error && (
//                   <p
//                     role="alert"
//                     className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
//                   >
//                     {error}
//                   </p>
//                 )}

//                 {success && (
//                   <p
//                     role="status"
//                     className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800"
//                   >
//                     {success}
//                   </p>
//                 )}

//                 {/* Submit */}
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-3.5 text-sm font-semibold text-gray-900 transition hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   {loading ? "Creating account..." : "Create account"}
//                   {!loading && <ArrowRight size={17} />}
//                 </button>

//                 <p className="text-center text-sm text-gray-500">
//                   Already have an account?{" "}
//                   <Link
//                     to="/login"
//                     className="font-semibold text-amber-700 transition hover:text-amber-500"
//                   >
//                     Sign in
//                   </Link>
//                 </p>
//               </form>

//               <p className="mt-8 text-center text-xs leading-5 text-gray-400">
//                 By creating an account, you agree to our{" "}
//                 <Link
//                   to="/terms"
//                   className="text-amber-700 hover:text-amber-500"
//                 >
//                   Terms
//                 </Link>{" "}
//                 and{" "}
//                 <Link
//                   to="/privacy"
//                   className="text-amber-700 hover:text-amber-500"
//                 >
//                   Privacy Policy
//                 </Link>
//                 .
//               </p>
//             </div>
//           </section>
//         </div>
//       </main>
//     </>
//   );
// }

// export default Register;


import { useState } from "react";
import { Form, Link } from "react-router-dom";
import axios from "axios";
import {
  ArrowRight,
  ArrowUpRight,
  Eye,
  EyeOff,
  MapPin,
  UserRound,
  Mail,
  LockKeyhole,
} from "lucide-react";
// import "./AuthorLogin.css"; // shared tokens and components
import "./Register.css";

const api ='http://localhost:8000'
const colors = {
  names: ["Amber", "Blue", "Rose", "Emerald"],
  backgrounds: ["#fef3c7", "#dbeafe", "#fce7f3", "#d1fae5"],
  texts: ["#92400e", "#1d4ed8", "#9d174d", "#065f46"],
  accents: ["#f59e0b", "#3b82f6", "#ec4899", "#10b981"],
};

const initialForm = {
  name: "",
  initials: "",
  role: "",
  bio: "",
  avatar_bg: colors.backgrounds[2],
  avatar_text: colors.texts[2],
  accent_color: colors.accents[2],
  location: "",
  password: "",
};

const colorFields = [
  { name: "avatar_bg", label: "Avatar background", options: colors.backgrounds },
  { name: "avatar_text", label: "Avatar text", options: colors.texts },
  { name: "accent_color", label: "Accent color", options: colors.accents },
];

function makeInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function SectionTitle({ number, children }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="rg-step" aria-hidden="true">{number}</span>
      <h3 className="al-serif text-xl font-bold">{children}</h3>
      <div className="al-rule h-px flex-1 border-t" aria-hidden="true" />
    </div>
  );
}

function IconField({ icon: Icon, id, label, required, className = "", children, ...inputProps }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="al-field-label">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <div className="relative">
        <Icon size={16} className="rg-icon" aria-hidden="true" />
        <input id={id} name={id} required={required} className="al-input rg-has-icon" {...inputProps} />
        {children}
      </div>
    </div>
  );
}

export default function Register() {
  const [form, setForm] = useState(initialForm);
  const [initialsEdited, setInitialsEdited] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (e) => {
    const { name, value } = e.target;
    if (name === "initials") setInitialsEdited(true);

    setForm((prev) => ({
      ...prev,
      [name]: name === "initials" ? value.toUpperCase() : value,
      // keep deriving initials from the name until the author edits them manually
      ...(name === "name" && !initialsEdited ? { initials: makeInitials(value) } : {}),
    }));
  };

  const setColor = (field, color) => setForm((prev) => ({ ...prev, [field]: color }));

  const initials = form.initials.trim().toUpperCase() || makeInitials(form.name) || "U";
////

  const submit = async (e) => {
  e.preventDefault();

  console.log("1. Submit function triggered");

  if (loading) {
    console.log("2. Already loading, returning...");
    return;
  }

  setError("");
  setMessage("");

  setLoading(true);

  try {
    console.log("3. API URL:", `${api}/auth/register`);
    console.log("4. Sending registration request...");

    console.log(form)

    // Never log the password or the complete form object
    const response = await axios.post(`${api}/auth/register`, 
      form,
    );

    console.log("5. API response status:", response.status);
    console.log("6. API response data:", response.data);

    alert(JSON.stringify(response.data));

    console.log("7. Navigating to login page...");
    navigate("/login");

    setMessage("Registration successful!");
  } catch (err) {
    console.error("8. Registration failed!");
    console.error("Error message:", err.message);
    console.error("HTTP status:", err.response?.status);
    console.error("Backend error:", err.response?.data);
    console.error("Request URL:", err.config?.url);

    setError(
      err.response?.data?.message ||
      "Registration failed. Please try again."
    );
  } finally {
    console.log("9. Registration request completed");
    setLoading(false);
  }
};

  return (
    <main className="al-page" style={{ "--al-accent": form.accent_color }}>
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-8 sm:py-8">
        {/* Header */}
        <header className="al-rule flex items-center justify-between border-b pb-5">
          <Link to="/" className="al-serif al-ink-link text-2xl font-extrabold tracking-tight">
            TheLens
          </Link>

          <p className="al-label hidden text-xs uppercase tracking-[0.25em] sm:block">
            The Lens · Author Portal
          </p>

          <Link to="/author/login" className="al-link inline-flex items-center gap-1 text-sm">
            Sign in <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </header>

        <div className="grid items-start gap-10 py-8 md:py-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:py-16">
          {/* Editorial introduction */}
          <section className="al-fade lg:sticky lg:top-10">
            <p className="al-label text-xs uppercase tracking-[0.25em]">Your next chapter starts here</p>

            <h1 className="al-serif mt-5 max-w-xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl xl:text-6xl">
              Every voice has a story.
              <em className="al-em block">Make yours heard.</em>
            </h1>

            <p className="al-muted mt-6 max-w-md text-base leading-relaxed">
              Join a community of curious minds, independent thinkers, and storytellers. Build your
              profile and share the perspective only you can bring.
            </p>

            <div
              className="al-card relative mt-9 hidden max-w-md overflow-hidden rounded-2xl p-7 sm:block sm:p-9"
              style={{ "--card-accent": form.accent_color }}
            >
              <span className="al-card__stripe" aria-hidden="true" />
              <p className="al-label inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em]">
                <span className="al-dot" aria-hidden="true" />
                A place for ideas
              </p>
              <p className="rg-quote mt-5">“Write to discover what you think.”</p>
              <p className="al-muted al-rule mt-6 border-t pt-4 text-xs uppercase tracking-[0.15em]">
                Read thoughtfully. Write boldly.
              </p>
            </div>

            <div className="mt-8 hidden items-center gap-3 lg:flex">
              <div className="flex -space-x-2" aria-hidden="true">
                {colors.backgrounds.map((bg, i) => (
                  <span
                    key={bg}
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-bold al-serif"
                    style={{ backgroundColor: bg, color: colors.texts[i], borderColor: "var(--al-bg)" }}
                  >
                    {["A", "J", "M", "S"][i]}
                  </span>
                ))}
              </div>
              <p className="al-muted text-xs">Your identity. Your perspective. Your space.</p>
            </div>
          </section>

          {/* Registration panel */}
          <section className="rg-panel al-fade p-5 sm:p-8 lg:p-10" aria-labelledby="rg-heading">
            <div className="mb-8">
              <p className="al-label text-xs uppercase tracking-[0.25em]">Create your profile</p>
              <h2 id="rg-heading" className="al-serif mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                Join the conversation.
              </h2>
              <p className="al-muted mt-3 text-base">
                A few details to introduce yourself to the community.
              </p>
            </div>

            {/* Live profile preview */}
         {/*    <div
              className="al-card relative mb-8 flex items-center gap-4 overflow-hidden rounded-2xl p-4 sm:p-5"
              style={{ "--card-accent": form.accent_color }}
              aria-label="Profile preview"
            >
              <span className="al-card__stripe" aria-hidden="true" />
              <span
                aria-hidden="true"
                className="rg-avatar al-serif flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-bold"
                style={{
                  backgroundColor: form.avatar_bg,
                  color: form.avatar_text,
                  boxShadow: `inset 0 0 0 2px ${form.accent_color}`,
                }}
              >
                {initials}
              </span>

              <div className="min-w-0 flex-1">
                <p className="al-serif truncate text-lg font-bold">{form.name || "Your name goes here"}</p>
                <p className="truncate text-sm font-medium" style={{ color: form.avatar_text }}>
                  {form.role || "Your role or creative title"}
                </p>
                <span
                  className="al-label mt-2 inline-block rounded-full px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.15em]"
                  style={{ backgroundColor: `${form.accent_color}22`, color: form.avatar_text }}
                >
                  Profile preview
                </span>
              </div>
            </div> */}

            <form onSubmit={submit} className="space-y-8">
              {/* 01 About you */}
              <div>
                <SectionTitle number="01">About you</SectionTitle>

                <div className="grid gap-5 sm:grid-cols-2">
                  <IconField
                    icon={UserRound}
                    id="name"
                    label="Full name"
                    required
                    value={form.name}
                    onChange={update}
                    placeholder="Your full name"
                    autoComplete="name"
                    disabled={loading}
                  />

                  <div>
                    <label htmlFor="initials" className="al-field-label">Initials</label>
                    <input
                      id="initials"
                      name="initials"
                      className="al-input"
                      value={form.initials}
                      onChange={update}
                      placeholder="e.g. AA"
                      maxLength={4}
                      autoComplete="off"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="role" className="al-field-label">Role or title</label>
                  <input
                    id="role"
                    name="role"
                    className="al-input"
                    value={form.role}
                    onChange={update}
                    placeholder="Writer, journalist, designer…"
                    maxLength={80}
                    autoComplete="organization-title"
                    disabled={loading}
                  />
                </div>

                <div className="mt-5">
                  <label htmlFor="bio" className="al-field-label">Short biography</label>
                  <textarea
                    id="bio"
                    name="bio"
                    className="al-input rg-textarea"
                    value={form.bio}
                    onChange={update}
                    rows={3}
                    maxLength={300}
                    placeholder="What do you love writing or thinking about?"
                    disabled={loading}
                  />
                  <p className="al-muted mt-1.5 text-right text-xs">{form.bio.length}/300</p>
                </div>

                <IconField
                  className="mt-5"
                  icon={MapPin}
                  id="location"
                  label="Location"
                  value={form.location}
                  onChange={update}
                  placeholder="City, country"
                  maxLength={120}
                  autoComplete="address-level2"
                  disabled={loading}
                />
              </div>

              {/* 02 Colours */}
              <div className="al-rule border-t pt-8">
                <SectionTitle number="02">Make it yours</SectionTitle>

                <p className="al-muted mb-5 text-sm leading-relaxed">
                  Choose your profile colors. The preview and this page's accent update as you change them.
                </p>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  {colorFields.map((field) => (
                    <div key={field.name} className="min-w-0">
                      <label htmlFor={field.name} className="al-field-label">{field.label}</label>
                      <select
                        id={field.name}
                        name={field.name}
                        value={form[field.name]}
                        onChange={update}
                        className="al-input rg-select"
                        disabled={loading}
                      >
                        {field.options.map((color, i) => (
                          <option key={color} value={color}>{colors.names[i]}</option>
                        ))}
                      </select>

                      <div className="rg-swatches">
                        {field.options.map((color, i) => (
                          <button
                            key={color}
                            type="button"
                            className="rg-swatch"
                            style={{ backgroundColor: color }}
                            aria-label={`${field.label}: ${colors.names[i]}`}
                            aria-pressed={form[field.name] === color}
                            title={colors.names[i]}
                            onClick={() => setColor(field.name, color)}
                            disabled={loading}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 03 Password */}
              <div className="al-rule border-t pt-8">
                <SectionTitle number="03">Secure your account</SectionTitle>

                <IconField
                  icon={LockKeyhole}
                  id="password"
                  label="Password"
                  required
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={update}
                  placeholder="At least 8 characters"
                  minLength={8}
                  autoComplete="new-password"
                  aria-describedby="password-hint"
                  disabled={loading}
                >
                  <button
                    type="button"
                    className="al-toggle"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                  </button>
                </IconField>
                <p id="password-hint" className="al-muted mt-2 text-xs">Use at least 8 characters.</p>
              </div>

              {error && <p role="alert" className="al-alert">{error}</p>}
              {message && <p role="status" className="rg-success">{message}</p>}

              <button type="submit" className="al-btn group" disabled={loading} aria-busy={loading}>
                {loading ? (
                  <>
                    <span className="al-spinner" aria-hidden="true" />
                    Creating your account…
                  </>
                ) : (
                  <>
                    Create your account
                    <ArrowRight
                      size={17}
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>

              <p className="al-muted text-center text-sm">
                Already part of the community?{" "}
                <Link to="/author/login" className="al-link">Sign in</Link>
              </p>
            </form>
          </section>
        </div>

        <footer className="al-rule al-muted flex flex-col gap-2 border-t py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} TheLens. All rights reserved.</p>
          <p className="tracking-wide">A home for thoughtful stories.</p>
        </footer>
      </div>
    </main>
  );
}