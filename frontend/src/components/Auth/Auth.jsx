import React, { useState } from 'react';
import { useProjectStore } from '../../store/projectStore';

const ResponsiveProjectAuth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ projName: "", projPassword: ""});

  const { joinProject } = useProjectStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    joinProject(form);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      
      {/* Background Decor - Responsive Scale */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none select-none">
        <div className="absolute top-10 left-[5%] sm:left-[15%] w-1 h-1 bg-white rounded-full shadow-[0_0_8px_#fff]"></div>
        <div className="absolute top-32 right-[10%] sm:right-[20%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_12px_#fff]"></div>
        {/* Responsive Planet Curve */}
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[180%] sm:w-[130%] h-75 sm:h-125 bg-linear-to-t from-[#121212] to-transparent rounded-[100%] border-t border-white/5"></div>
      </div>

      {/* Top Branding - Responsive Placement */}
      <div className="absolute top-6 left-6 sm:top-10 sm:left-10 flex items-center gap-2 font-bold text-lg tracking-tighter z-30">
        <span className="text-blue-500 text-xl">≫</span> 
        <span className="hidden sm:inline">SyncSpace</span>
      </div>

      {/* Main Container - Responsive Width */}
      <main className="relative z-20 w-full max-w-105 animate-in fade-in zoom-in duration-500">
        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl p-6 sm:p-12 rounded-[2.5rem] shadow-2xl">
          
          {/* Header Section */}
          <header className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-blue-500/10 border border-blue-500/20 rounded-2xl mb-5 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
              <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Locked Project</h1>
            <p className="text-gray-400 text-xs sm:text-sm px-2">Authenticate to access your secure workspace.</p>
          </header>

          {/* User-Friendly Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="group">
              <label  htmlFor="pname" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 ml-1 group-focus-within:text-blue-400 transition-colors">
                Project Name
              </label>
              <input 
                id="pname"
                name = "projName"
                value={form.projName}
                onChange={(e) => setForm({...form, projName: e.target.value})}
                type="text" 
                placeholder="Enter project name"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 sm:py-4 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-gray-600 text-sm sm:text-base"
                required
              />
            </div>

            <div className="group relative">
              <label htmlFor="pass" className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2 ml-1 group-focus-within:text-blue-400 transition-colors">
                Password
              </label>
              <div className="relative">
                <input 
                  id="pass"
                  name='projPassword'
                  value={form.projPassword}
                  onChange={(e) => setForm({...form, projPassword: e.target.value})}
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 sm:py-4 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-gray-600 text-sm sm:text-base pr-12"
                  required
                />
                {/* User Friendly Toggle */}
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-white transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.024 10.024 0 014.132-5.411m0 0L21 21m-2.122-2.122L11.25 11.25m0 0L4.636 4.636" /></svg>
                  )}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-white text-black font-extrabold py-4 sm:py-4.5 rounded-2xl hover:bg-blue-50 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)] mt-6 text-sm sm:text-base"
            >
              Unlock Project
            </button>
          </form>

          {/* Mobile Friendly Helper Link */}
          <footer className="mt-10 pt-6 border-t border-white/5 flex flex-col items-center gap-4">
            <button className="text-xs text-gray-500 hover:text-blue-400 transition-colors uppercase tracking-widest font-medium">
              Forgot Credentials?
            </button>
            <div className="flex gap-4 opacity-50">
               {/* Small icons for extra polish */}
               <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
               <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
               <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default ResponsiveProjectAuth;