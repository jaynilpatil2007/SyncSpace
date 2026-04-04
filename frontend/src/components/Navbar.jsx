import { teamMembers } from '../lib/data.js';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-dark-900/60 border-b border-white/6 px-4 sm:px-6 lg:px-8 py-3.5">
      <div className="max-w-370 mx-auto flex items-center justify-between">
        {/* Left: Workspace name */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/6 border border-white/8 flex items-center justify-center">
            <svg className="w-5 h-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-[15px] font-semibold text-white tracking-tight">Team Workspace</h1>
              <svg className="w-3.5 h-3.5 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
            <p className="text-[11px] text-white/30 font-medium -mt-0.5">Hackathon Sprint</p>
          </div>
        </div>

        {/* Right: Team avatars + icons */}
        <div className="flex items-center gap-5">
          {/* Team avatars */}
          <div className="hidden sm:flex items-center -space-x-2">
            {teamMembers.map((member, i) => (
              <div
                key={member.id}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-semibold ring-2 ring-dark-900 cursor-pointer transition-all duration-200 hover:scale-110 hover:z-10 hover:-translate-y-0.5"
                style={{ backgroundColor: member.color, color: member.textColor, zIndex: teamMembers.length - i }}
                title={member.name}
              >
                {member.initials}
              </div>
            ))}
            <div className="w-8 h-8 rounded-full bg-white/6 border border-white/8 flex items-center justify-center text-[10px] font-medium text-white/40 ring-2 ring-dark-900 cursor-pointer hover:bg-white/10 transition-colors">
              +2
            </div>
          </div>

          {/* Notification bell */}
          <button
            className="relative p-2 rounded-xl text-white/30 hover:text-white/70 hover:bg-white/4 transition-all duration-200"
            aria-label="Notifications"
            id="notification-btn"
          >
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-dark-900"></span>
          </button>

          {/* Menu */}
          <button
            className="p-2 rounded-xl text-white/30 hover:text-white/70 hover:bg-white/4 transition-all duration-200"
            aria-label="Menu"
            id="menu-btn"
          >
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}