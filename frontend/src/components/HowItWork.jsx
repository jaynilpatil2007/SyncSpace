export default function HowItWork() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #111; font-family: 'Inter', sans-serif; }

        .page {
          min-height: 100vh;
          background: #111111;
          color: white;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        /* ── TOP SPOTLIGHT (like in image — soft white cone from top center) ── */
        .bg-spotlight {
          position: fixed; top: -80px; left: 50%;
          transform: translateX(-50%);
          width: 1000px; height: 600px;
          background: radial-gradient(ellipse at 50% 0%,
            rgba(255,255,255,0.09) 0%,
            rgba(220,210,240,0.05) 25%,
            transparent 60%
          );
          pointer-events: none; z-index: 0;
        }

        /* Side ambient glows */
        .bg-side-l {
          position: fixed; top: 25%; left: -80px;
          width: 300px; height: 400px;
          background: radial-gradient(circle, rgba(130,100,200,0.09) 0%, transparent 70%);
          pointer-events: none; z-index: 0; filter: blur(20px);
        }
        .bg-side-r {
          position: fixed; top: 10%; right: -80px;
          width: 280px; height: 350px;
          background: radial-gradient(circle, rgba(110,80,180,0.08) 0%, transparent 70%);
          pointer-events: none; z-index: 0; filter: blur(20px);
        }
        .bg-bottom {
          position: fixed; bottom: -80px; left: 50%;
          transform: translateX(-50%);
          width: 600px; height: 250px;
          background: radial-gradient(ellipse, rgba(90,60,150,0.1) 0%, transparent 70%);
          pointer-events: none; z-index: 0; filter: blur(30px);
        }

        .content {
          position: relative; z-index: 1;
          max-width: 1080px; margin: 0 auto;
          padding: 26px 24px 60px;
        }

        /* ── NAV ── */
        .nav {
          display: flex; align-items: center;
          margin-bottom: 28px;
          position: relative;
        }
        .logo-wrap { display: flex; align-items: center; gap: 7px; }
        .logo-text { font-size: 13.5px; font-weight: 600; color: rgba(255,255,255,0.88); }
        .avatars-wrap {
          position: absolute; left: 50%; transform: translateX(-50%);
          display: flex; align-items: center; gap: 5px;
        }
        .avatar-circle {
          width: 42px; height: 42px; border-radius: 50%;
          overflow: hidden; border: 2px solid #1a1a1a;
          flex-shrink: 0; display: flex; align-items: center; justify-content: center;
        }

        /* ── HEADING ── */
        .main-heading {
          text-align: center;
          font-size: clamp(34px, 5.5vw, 64px);
          font-weight: 900; color: #fff;
          letter-spacing: -0.025em; line-height: 1.05;
          margin-bottom: 36px;
        }

        /* ── CARDS ── */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px; align-items: start;
        }
        @media (max-width: 860px) {
          .cards-grid { grid-template-columns: 1fr 1fr; }
          .card-3 { grid-column: span 2; max-width: 420px; margin: 0 auto; width: 100%; }
        }
        @media (max-width: 540px) {
          .cards-grid { grid-template-columns: 1fr; }
          .card-3 { grid-column: span 1; max-width: 100%; }
        }

        .card {
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 16px;
          padding: 20px 18px 0;
          display: flex; flex-direction: column;
          overflow: hidden;
        }

        .card-title {
          font-size: 20px; font-weight: 800; color: #fff;
          line-height: 1.28; margin-bottom: 9px; letter-spacing: -0.015em;
        }
        .card-desc {
          font-size: 14px; color: rgba(255,255,255,0.52);
          line-height: 1.6; margin-bottom: 18px;
        }

        /* ── INNER MOCK PANELS ── */
        .inner-panel {
          border-radius: 10px 10px 0 0;
          border: 1px solid rgba(255,255,255,0.09);
          border-bottom: none;
          background: #181820;
          overflow: hidden;
        }

        /* CONNECT */
        .cp { padding: 12px 13px 0; }
        .panel-label { font-size: 10.5px; color: rgba(255,255,255,0.42); font-weight: 500; margin-bottom: 10px; }

        .hub-wrap { display: flex; justify-content: center; margin-bottom: 6px; }
        .hub-outer {
          position: relative; width: 66px; height: 66px;
          display: flex; align-items: center; justify-content: center;
        }
        .hub-inner-btn {
          width: 44px; height: 44px; border-radius: 50%;
          background: #0e0e14; border: 1px solid rgba(255,255,255,0.14);
          display: flex; align-items: center; justify-content: center;
        }
        .dashed-v {
          width: 0; height: 16px; margin: 0 auto 0;
          border-left: 1.5px dashed rgba(255,255,255,0.15);
        }

        .icon-row {
          display: flex; margin: 0 -13px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .icon-cell {
          flex: 1; height: 50px;
          display: flex; align-items: center; justify-content: center;
          border-right: 1px solid rgba(255,255,255,0.07);
        }
        .icon-cell:last-child { border-right: none; }

        .join-wrap { padding: 10px 13px 13px; }
        .join-btn {
          width: 100%; padding: 9px 0;
          background: white; color: #111;
          font-weight: 700; font-size: 13px;
          border: none; border-radius: 7px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 5px;
          font-family: 'Inter', sans-serif;
        }

        /* DOC HUB */
        .dp { padding: 12px 13px; }
        .doc-btns { display: flex; gap: 8px; margin-bottom: 10px; }
        .doc-btn {
          flex: 1; padding: 9px 6px; border-radius: 7px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          cursor: pointer;
        }
        .doc-btn-txt { font-size: 9.5px; color: rgba(255,255,255,0.45); font-family: 'Inter', sans-serif; }
        .file-row {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .file-row:last-child { border-bottom: none; }
        .file-name { font-size: 11px; color: rgba(255,255,255,0.68); margin-bottom: 3px; font-weight: 500; }
        .file-bar { height: 2.5px; border-radius: 2px; background: rgba(255,255,255,0.1); }
        .file-bar-fill { height: 100%; border-radius: 2px; background: rgba(255,255,255,0.32); }

        /* LIVE EDIT */
        .lp { padding: 12px 12px 0; }
        .live-box {
          position: relative; background: #10101a;
          border-radius: 9px; border: 1px solid rgba(255,255,255,0.08);
          height: 190px; overflow: hidden;
        }
        .live-doc-chip {
          position: absolute; top: 8px; right: 8px;
          width: 108px; background: #1c1c28;
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 7px; padding: 7px 7px 5px;
        }
        .live-doc-lbl { font-size: 7.5px; color: rgba(255,255,255,0.3); margin-bottom: 4px; font-family: 'Inter', sans-serif; }
        .badge {
          position: absolute; border-radius: 50%;
          background: #7c3aed; border: 1.5px solid #111;
          display: flex; align-items: center; justify-content: center;
          font-size: 6.5px; font-weight: 800; color: white;
          font-family: 'Inter', sans-serif;
          width: 18px; height: 18px;
        }

        /* ── DIVIDER ── */
        .divider {
          display: flex; align-items: center; justify-content: center;
          margin: 44px auto; max-width: 600px;
        }
        .div-line { flex: 1; height: 1px; background: rgba(255,255,255,0.11); }
        .div-dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,0.32); margin: 0 2px; }

        /* ── FUTURE ── */
        .future { text-align: center; position: relative; padding-bottom: 10px; }
        .future-h {
          font-size: clamp(28px, 4.5vw, 58px); font-weight: 900; color: #fff;
          letter-spacing: -0.025em; margin-bottom: 14px;
        }
        .future-item { font-size: clamp(14px, 1.8vw, 20px); color: rgba(255,255,255,0.6); line-height: 1.8; }
        .sparkle { position: absolute; bottom: -4px; right: 0; }

        @media (max-width: 480px) {
          .content { padding: 18px 14px 40px; }
          .card { padding: 16px 14px 0; }
          .card-title { font-size: 17px; }
        }
      `}</style>

      <div className="page">
        <div className="bg-spotlight" />
        <div className="bg-side-l" />
        <div className="bg-side-r" />
        <div className="bg-bottom" />

        <div className="content">

          {/* ── NAV ── */}
          <div className="nav">
            <div className="logo-wrap">
              {/* SyncSpace double-arrow logo */}
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                <path d="M1 4L5 8L9 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 14L14 8L18 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="logo-text">SyncSpace</span>
            </div>

            {/* Centered avatars */}
            <div className="avatars-wrap">
              {/* Anime/person avatar */}
              <div className="avatar-circle">
                <svg width="42" height="42" viewBox="0 0 42 42">
                  <circle cx="21" cy="21" r="21" fill="#8b7355"/>
                  {/* face */}
                  <ellipse cx="21" cy="19" rx="8" ry="9" fill="#f5d5a0"/>
                  {/* hair */}
                  <path d="M13 17 Q13 8 21 7 Q29 8 29 17 Q27 11 21 11 Q15 11 13 17Z" fill="#2d1a0e"/>
                  {/* eyes */}
                  <circle cx="18.5" cy="18" r="1.3" fill="#222"/>
                  <circle cx="23.5" cy="18" r="1.3" fill="#222"/>
                  {/* mouth */}
                  <path d="M19 22 Q21 24 23 22" stroke="#c08040" strokeWidth="1" fill="none" strokeLinecap="round"/>
                  {/* body */}
                  <ellipse cx="21" cy="34" rx="9" ry="7" fill="#3b6cb5"/>
                  {/* green online dot */}
                  <circle cx="32" cy="9" r="3.5" fill="#22c55e" stroke="#8b7355" strokeWidth="1.5"/>
                </svg>
              </div>

              {/* Fire avatar — purple circle */}
              <div className="avatar-circle">
                <svg width="42" height="42" viewBox="0 0 42 42">
                  <circle cx="21" cy="21" r="21" fill="#7c3aed"/>
                  {/* flame */}
                  <path d="M21 6 C21 6 28 13 28 20 C28 24 25 27 21 27 C17 27 14 24 14 20 C14 17 16 15 16 15 C16 15 18 19 19.5 19 C18.5 16 19.5 10 21 6Z" fill="white" opacity="0.92"/>
                  <path d="M19 21.5 C19 21.5 20 24 21 24 C22 24 23 23 23 21.5 C23 20.5 22 20 21 20.5 C20 20 19 20.5 19 21.5Z" fill="#fb923c" opacity="0.75"/>
                </svg>
              </div>
            </div>
          </div>

          {/* ── MAIN HEADING ── */}
          <h1 className="main-heading">## How It Works</h1>

          {/* ── 3 CARDS ── */}
          <div className="cards-grid">

            {/* CARD 1 */}
            <div className="card">
              <div className="card-title">1. Users log in or join a workspace</div>
              <div className="card-desc">Easily connect to your centralized team environment.</div>
              <div className="inner-panel cp">
                <div className="panel-label">Connect</div>

                <div className="hub-wrap">
                  <div className="hub-outer">
                    {/* dashed ring */}
                    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox="0 0 66 66">
                      <circle cx="33" cy="33" r="30" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" strokeDasharray="4 4"/>
                      {/* 4 connector lines */}
                      <line x1="33" y1="3" x2="33" y2="17" stroke="rgba(255,255,255,0.13)" strokeWidth="1" strokeDasharray="3 3"/>
                      <line x1="33" y1="49" x2="33" y2="63" stroke="rgba(255,255,255,0.13)" strokeWidth="1" strokeDasharray="3 3"/>
                      <line x1="3" y1="33" x2="17" y2="33" stroke="rgba(255,255,255,0.13)" strokeWidth="1" strokeDasharray="3 3"/>
                      <line x1="49" y1="33" x2="63" y2="33" stroke="rgba(255,255,255,0.13)" strokeWidth="1" strokeDasharray="3 3"/>
                    </svg>
                    <div className="hub-inner-btn">
                      {/* Sync arrows */}
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M20 8H8a5 5 0 000 10h4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M4 16H16a5 5 0 000-10h-4" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M17 5l3 3-3 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7 19l-3-3 3-3" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="dashed-v" />

                {/* 4 icon cells */}
                <div className="icon-row">
                  {/* Google */}
                  <div className="icon-cell">
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </div>
                  {/* GitHub */}
                  <div className="icon-cell">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                  </div>
                  {/* Slack */}
                  <div className="icon-cell">
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313z"/>
                      <path fill="#36C5F0" d="M8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 012.521 2.521 2.528 2.528 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312z"/>
                      <path fill="#2EB67D" d="M18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zm-1.271 0a2.528 2.528 0 01-2.521 2.521 2.527 2.527 0 01-2.521-2.521V2.522A2.527 2.527 0 0115.164 0a2.528 2.528 0 012.521 2.522v6.312z"/>
                      <path fill="#ECB22E" d="M15.164 18.956a2.528 2.528 0 012.521 2.522A2.528 2.528 0 0115.164 24a2.527 2.527 0 01-2.521-2.522v-2.522h2.521zm0-1.271a2.527 2.527 0 01-2.521-2.521 2.526 2.526 0 012.521-2.521h6.312A2.527 2.527 0 0124 15.164a2.528 2.528 0 01-2.522 2.521h-6.314z"/>
                    </svg>
                  </div>
                  {/* C / Cursor */}
                  <div className="icon-cell">
                    <div style={{
                      width:22,height:22,background:"#1c1c1c",
                      border:"1px solid rgba(255,255,255,0.18)",borderRadius:5,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontWeight:900,fontSize:14,color:"white",fontFamily:"Georgia,serif"
                    }}>C</div>
                  </div>
                </div>

                <div className="join-wrap">
                  <button className="join-btn">Join Workspace <span style={{fontSize:15}}>›</span></button>
                </div>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="card">
              <div className="card-title">2. They can create or open documents</div>
              <div className="card-desc">Start from scratch or pick up right where you left off.</div>
              <div className="inner-panel dp">
                <div className="panel-label">Document Hub</div>

                <div className="doc-btns">
                  <div className="doc-btn">
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5">
                      <rect x="4" y="2" width="12" height="16" rx="2"/>
                      <path d="M7 7h6M7 10h6M7 13h4" strokeLinecap="round"/>
                    </svg>
                    <span className="doc-btn-txt">New Doc</span>
                  </div>
                  <div className="doc-btn">
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5">
                      <circle cx="10" cy="10" r="7"/>
                      <path d="M10 6v4l2.5 2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="doc-btn-txt">Open Recent</span>
                  </div>
                </div>

                {[
                  {name:"Project Alpha Plan", icon:"doc", w:"65%"},
                  {name:"Brainstorming Notes", icon:"list", w:"42%"},
                  {name:"Progress", icon:"folder", w:"22%"},
                ].map((f,i) => (
                  <div className="file-row" key={i}>
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="rgba(255,255,255,0.36)" strokeWidth="1.5" style={{flexShrink:0}}>
                      {f.icon==="doc"&&<><rect x="2" y="1" width="12" height="14" rx="1.5"/><path d="M4 5h8M4 8h8M4 11h5" strokeLinecap="round"/></>}
                      {f.icon==="list"&&<><path d="M3 4h10M3 8h10M3 12h6" strokeLinecap="round"/></>}
                      {f.icon==="folder"&&<><path d="M1 5h5l1.5-2H15v9H1z" strokeLinejoin="round"/></>}
                    </svg>
                    <div style={{flex:1}}>
                      <div className="file-name">{f.name}</div>
                      <div className="file-bar"><div className="file-bar-fill" style={{width:f.w}}/></div>
                    </div>
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="rgba(255,255,255,0.18)" style={{flexShrink:0}}>
                      <circle cx="6" cy="1.5" r="1"/><circle cx="6" cy="6" r="1"/><circle cx="6" cy="10.5" r="1"/>
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD 3 */}
            <div className="card card-3">
              <div className="card-title">3. Multiple users edit in real-time</div>
              <div className="card-desc">Experience seamless collaboration with others.</div>
              <div className="inner-panel lp">
                <div className="panel-label">Live Edit View</div>
                <div className="live-box">

                  {/* Crosshair 1 — top-left — red vertical + green horizontal + blue overlay */}
                  <div style={{position:"absolute",top:14,left:16,width:46,height:46}}>
                    <svg width="46" height="46" viewBox="0 0 46 46">
                      <line x1="23" y1="0" x2="23" y2="46" stroke="#ff3636" strokeWidth="1.5"/>
                      <line x1="0" y1="23" x2="46" y2="23" stroke="#36ff7a" strokeWidth="1.5"/>
                      <line x1="23" y1="0" x2="23" y2="46" stroke="#5bb5ff" strokeWidth="1.5" strokeDasharray="3 8" opacity="0.55"/>
                      <circle cx="23" cy="23" r="4.5" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1"/>
                    </svg>
                  </div>

                  {/* Live Document chip — top right */}
                  <div className="live-doc-chip">
                    <div className="live-doc-lbl">Live Document</div>
                    <svg viewBox="0 0 100 48" width="100%" height="34">
                      <defs>
                        <linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ff5050" stopOpacity="0.25"/>
                          <stop offset="100%" stopColor="#ff5050" stopOpacity="0"/>
                        </linearGradient>
                        <linearGradient id="lg2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#50ff99" stopOpacity="0.18"/>
                          <stop offset="100%" stopColor="#50ff99" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      <polygon points="0,44 0,32 15,22 30,28 45,12 60,20 75,8 100,18 100,44" fill="url(#lg1)"/>
                      <polyline points="0,32 15,22 30,28 45,12 60,20 75,8 100,18" fill="none" stroke="#ff6050" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"/>
                      <polygon points="0,44 0,38 20,35 40,40 55,30 70,34 85,24 100,28 100,44" fill="url(#lg2)"/>
                      <polyline points="0,38 20,35 40,40 55,30 70,34 85,24 100,28" fill="none" stroke="#50ffaa" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round"/>
                    </svg>
                  </div>

                  {/* Crosshair 2 — lower left — yellow + pink  */}
                  <div style={{position:"absolute",bottom:28,left:18,width:46,height:46}}>
                    <svg width="46" height="46" viewBox="0 0 46 46">
                      <line x1="23" y1="0" x2="23" y2="46" stroke="#ffd600" strokeWidth="1.5"/>
                      <line x1="0" y1="23" x2="46" y2="23" stroke="#ff60cc" strokeWidth="1.5"/>
                      <circle cx="23" cy="23" r="4.5" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                    </svg>
                    {/* Pink cursor arrow pointing bottom-right */}
                    <div style={{position:"absolute",bottom:-4,right:-12}}>
                      <svg width="26" height="28" viewBox="0 0 26 28" fill="none">
                        <path d="M2 2L24 13L16 15.5L20 24L16 26L12 17L2 22V2Z" fill="#c084fc" stroke="#10101a" strokeWidth="0.8"/>
                      </svg>
                      <div className="badge" style={{bottom:-6,right:-8}}>IN</div>
                    </div>
                  </div>

                  {/* Second IN badge lower area */}
                  <div className="badge" style={{bottom:16,left:22}}>IN</div>

                </div>
              </div>
            </div>

          </div>{/* end cards-grid */}

          {/* ── DIVIDER ── */}
          <div className="divider">
            <div className="div-line"/>
            <div className="div-dot"/>
            <div className="div-line"/>
          </div>

          {/* ── FUTURE IMPROVEMENTS ── */}
          <div className="future">
            <div className="sparkle">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="white">
                <path d="M15 0 L16.8 13 L30 15 L16.8 17 L15 30 L13.2 17 L0 15 L13.2 13 Z"/>
              </svg>
            </div>
            <h2 className="future-h">## Future Improvements</h2>
            <div className="future-item">- Notifications system</div>
            <div className="future-item">- File uploads</div>
          </div>

        </div>
      </div>
    </>
  );
}