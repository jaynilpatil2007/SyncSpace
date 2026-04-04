import { useState } from "react";
import { Link } from "react-router";
import { userStore } from "../../store/userStore";

const StarField = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(18)].map((_, i) => {
      const positions = [
        { top: "12%", left: "8%" }, { top: "25%", left: "92%" },
        { top: "60%", left: "5%" }, { top: "75%", left: "88%" },
        { top: "40%", left: "3%" }, { top: "85%", left: "15%" },
        { top: "10%", left: "70%" }, { top: "50%", left: "96%" },
        { top: "90%", left: "55%" }, { top: "20%", left: "45%" },
        { top: "35%", left: "78%" }, { top: "65%", left: "30%" },
        { top: "15%", left: "55%" }, { top: "80%", left: "40%" },
        { top: "45%", left: "18%" }, { top: "5%", left: "33%" },
        { top: "70%", left: "62%" }, { top: "55%", left: "85%" },
      ];
      const isCross = i % 3 === 0;
      const pos = positions[i];
      return isCross ? (
        <div
          key={i}
          className="absolute opacity-40"
          style={{ top: pos.top, left: pos.left }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <line x1="6" y1="0" x2="6" y2="12" stroke="#888" strokeWidth="1" />
            <line x1="0" y1="6" x2="12" y2="6" stroke="#888" strokeWidth="1" />
          </svg>
        </div>
      ) : (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gray-500 opacity-30"
          style={{ top: pos.top, left: pos.left }}
        />
      );
    })}
  </div>
);

export default function Login() {
  const [form, setForm] = useState({ email:"", password: ""});
  const [loading, setLoading] = useState(false);

  const { login } = userStore();

  const handleLogin = async () => {
    setLoading(true);

    await login(form);

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative px-4 font-sans">
      <StarField />

      {/* Logo */}
      <div className="absolute top-5 left-6 flex items-center gap-2 z-10">
        <div className="flex items-center gap-0.5">
          <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
            <path d="M2 4L8 9L2 14" stroke="#f97316" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 4L15 9L9 14" stroke="#f97316" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-white text-base font-semibold tracking-wide">SyncSpace</span>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl px-8 py-10 sm:px-10 sm:py-12 shadow-2xl">

        {/* Small icon top center */}
        <div className="flex justify-center mb-6">
          <div className="w-9 h-7 border-2 border-neutral-600 rounded-md opacity-60" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white text-center mb-1 tracking-tight">
          welcome back !
        </h1>
        <p className="text-neutral-400 text-sm text-center mb-8">
          Login to access your account
        </p>

        {/* Email Field */}
        <div className="mb-4">
          <div className="flex items-center gap-3 bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 focus-within:border-neutral-500 transition-colors">
            <svg className="w-5 h-5 text-neutral-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              className="bg-transparent text-white placeholder-neutral-500 text-sm w-full outline-none"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-7">
          <div className="flex items-center gap-3 bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 focus-within:border-neutral-500 transition-colors">
            <svg className="w-5 h-5 text-neutral-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              <circle cx="12" cy="16" r="1.2" fill="currentColor" />
            </svg>
            <input
              type="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value})}
              className="bg-transparent text-white placeholder-neutral-500 text-sm w-full outline-none"
            />
          </div>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3.5 rounded-full font-bold text-white text-sm tracking-widest uppercase transition-all duration-200 relative overflow-hidden"
          style={{
            background: loading
              ? "#c2410c"
              : "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
            boxShadow: loading
              ? "none"
              : "0 0 24px 4px rgba(249,115,22,0.45), 0 2px 16px rgba(249,115,22,0.3)",
          }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10" />
              </svg>
              Logging in...
            </span>
          ) : (
            "LOG IN"
          )}
        </button>

        {/* Sign up link */}
        <p className="text-center text-sm text-neutral-500 mt-5">
          Don't have a account ?{" "}
        
                        <Link className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
 to={'/signin'}>Sign up</Link>

        </p>
      </div>
    </div>
  );
}