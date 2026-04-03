import { useState, useEffect } from "react";
import { Link } from "react-router";

const StarField = () => {
  const stars = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.5 + 0.2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
          }}
        />
      ))}
      {/* Cross/plus decorators like in the design */}
      {[
        { x: "30%", y: "14%" },
        { x: "10%", y: "23%" },
        { x: "78%", y: "12%" },
        { x: "88%", y: "46%" },
      ].map((pos, i) => (
        <div
          key={`cross-${i}`}
          className="absolute"
          style={{ left: pos.x, top: pos.y }}
        >
          <div className="relative w-3 h-3">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-500 -translate-y-1/2" />
            <div className="absolute left-1/2 top-0 h-full w-px bg-gray-500 -translate-x-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = ({ show }) =>
  show ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const LogoIcon = () => (
    <div className="flex items-center gap-0.5">
          <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
            <path d="M2 4L8 9L2 14" stroke="#f97316" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 4L15 9L9 14" stroke="#f97316" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
);

export default function Signin() {
  const [form, setForm] = useState({ fullname: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 50);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const inputFields = [
    { name: "name", placeholder: "Full Name", type: "text", icon: <UserIcon /> },
    { name: "email", placeholder: "Email Address", type: "email", icon: <EmailIcon /> },
    { name: "password", placeholder: "Password", type: showPassword ? "text" : "password", icon: <LockIcon /> },
  ];

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: "#0a0a0a", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      {/* Animated gradient blob behind the card */}
      <div
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(255,90,20,0.08) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <StarField />

      {/* Logo */}
      <div
        className="absolute top-6 left-6 flex items-center gap-2 z-10"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <LogoIcon />
        <span className="text-white font-semibold text-base tracking-wide">SyncSpace</span>
      </div>

      {/* Tablet frame hint at top */}
      <div
        className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-2 rounded-full pointer-events-none"
        style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
      />

      {/* Card */}
      <div
        className="relative z-10 w-full mx-4 sm:mx-0"
        style={{
          maxWidth: "440px",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
          transition: "opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div
          className="rounded-2xl px-8 py-10 sm:px-10 sm:py-12"
          style={{
            background: "rgba(22, 22, 22, 0.95)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Heading */}
          <div className="text-center mb-8">
            <h1
              className="text-white font-bold mb-2"
              style={{ fontSize: "clamp(1.75rem, 5vw, 2.2rem)", letterSpacing: "-0.03em" }}
            >
              Get Started
            </h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              Create your account
            </p>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-3">
            {inputFields.map((field, idx) => (
              <div
                key={field.name}
                className="relative flex items-center rounded-xl overflow-hidden"
                style={{
                  background: focused === field.name ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
                  border: focused === field.name
                    ? "1px solid rgba(255, 100, 30, 0.45)"
                    : "1px solid rgba(255,255,255,0.07)",
                  transition: "background 0.2s, border 0.2s, box-shadow 0.2s",
                  boxShadow: focused === field.name ? "0 0 0 3px rgba(255,90,20,0.08)" : "none",
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateX(0)" : "translateX(-12px)",
                  transitionDelay: `${0.15 + idx * 0.07}s`,
                }}
              >
                <span
                  className="pl-4 pr-1 shrink-0"
                  style={{ color: focused === field.name ? "rgba(255,110,40,0.9)" : "rgba(255,255,255,0.3)", transition: "color 0.2s" }}
                >
                  {field.icon}
                </span>
                <input
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.name]}
                  onChange={handleChange}
                  onFocus={() => setFocused(field.name)}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent py-4 px-3 text-sm outline-none placeholder-gray-600"
                  style={{ color: "rgba(255,255,255,0.85)", caretColor: "#ff6a1e" }}
                  autoComplete={field.name === "password" ? "new-password" : "off"}
                />
                {field.name === "password" && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="pr-4 pl-1 shrink-0 cursor-pointer"
                    style={{ color: "rgba(255,255,255,0.25)", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
                  >
                    <EyeIcon show={showPassword} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Sign Up Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-6 py-4 rounded-full font-bold text-sm tracking-widest uppercase text-white cursor-pointer relative overflow-hidden"
            style={{
              background: loading
                ? "rgba(180,60,0,0.7)"
                : "linear-gradient(135deg, #ff6a1e 0%, #e8350a 50%, #c92a05 100%)",
              boxShadow: loading ? "none" : "0 8px 32px rgba(220,60,10,0.45), 0 2px 8px rgba(255,90,20,0.3)",
              border: "none",
              letterSpacing: "0.12em",
              transition: "box-shadow 0.2s, opacity 0.2s, transform 0.15s",
              transform: loading ? "scale(0.98)" : "scale(1)",
              opacity: mounted ? 1 : 0,
              transitionDelay: "0.38s",
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.boxShadow = "0 12px 40px rgba(220,60,10,0.6), 0 4px 12px rgba(255,90,20,0.4)";
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.boxShadow = "0 8px 32px rgba(220,60,10,0.45), 0 2px 8px rgba(255,90,20,0.3)";
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                Creating Account…
              </span>
            ) : (
              "Sign Up"
            )}
          </button>

          {/* Login Link */}
          <p
            className="text-center mt-5 text-sm"
            style={{ color: "rgba(255,255,255,0.35)", opacity: mounted ? 1 : 0, transitionDelay: "0.44s", transition: "opacity 0.5s" }}
          >
            Already have an account?{" "}
         <Link className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
 to={'/login'}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}