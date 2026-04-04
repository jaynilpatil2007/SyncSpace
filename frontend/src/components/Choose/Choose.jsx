import { useState } from "react";
import Create from "../Create/Create.jsx";
import { useNavigate } from "react-router";

const starPositions = [
  { top: "15%", left: "6%",   size: 22, cross: true },
  { top: "22%", left: "82%",  size: 8,  cross: false },
  { top: "58%", left: "3%",   size: 8,  cross: false },
  { top: "65%", left: "90%",  size: 18, cross: true },
  { top: "28%", left: "94%",  size: 5,  cross: false },
  { top: "10%", left: "48%",  size: 4,  cross: false },
  { top: "80%", left: "22%",  size: 4,  cross: false },
];

function CrossStar({ size, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" style={style}>
      <line x1="20" y1="0"  x2="20" y2="40" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="0"  y1="20" x2="40" y2="20" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="20" y1="8"  x2="20" y2="32" stroke="white" strokeWidth="4"   strokeLinecap="round" opacity="0.45" />
      <line x1="8"  y1="20" x2="32" y2="20" stroke="white" strokeWidth="4"   strokeLinecap="round" opacity="0.45" />
    </svg>
  );
}

function StarField() {
  return (
    <>
      {starPositions.map((s, i) =>
        s.cross ? (
          <CrossStar key={i} size={s.size} style={{
            position: "absolute", top: s.top, left: s.left,
            opacity: 0.65,
            animation: `twinkle ${2.3 + i * 0.3}s ease-in-out infinite alternate`,
            filter: "drop-shadow(0 0 7px rgba(255,255,255,0.45))",
          }} />
        ) : (
          <div key={i} style={{
            position: "absolute", top: s.top, left: s.left,
            width: s.size * 0.38, height: s.size * 0.38,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.55)",
            boxShadow: `0 0 ${s.size}px ${s.size * 0.4}px rgba(255,255,255,0.12)`,
            animation: `twinkle ${2.6 + i * 0.38}s ease-in-out infinite alternate`,
          }} />
        )
      )}
    </>
  );
}

function GridOverlay() {
  return (
    <div style={{
      position: "absolute", inset: 0,
      backgroundImage:
        "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
      backgroundSize: "52px 52px",
      zIndex: 0, pointerEvents: "none",
    }} />
  );
}

function GlobeSphere() {
  return (
    <div style={{
      position: "absolute", bottom: "-42%", left: "50%",
      transform: "translateX(-50%)",
      width: 980, height: 980, borderRadius: "50%",
      background: "radial-gradient(ellipse at 38% 26%, #232323 0%, #181818 55%, #0f0f0f 100%)",
      boxShadow: "0 -22px 80px rgba(255,255,255,0.032), inset 0 22px 60px rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.05)",
      zIndex: 0, pointerEvents: "none",
    }} />
  );
}

function PlusIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <line x1="19" y1="6"  x2="19" y2="32" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="6"  y1="19" x2="32" y2="19" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function EnterIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
      <rect x="2" y="2" width="38" height="38" rx="8" stroke="white" strokeWidth="2" />
      <path d="M14 21h16M24 15l6 6-6 6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <path d="M15 2 L16.8 13 L28 15 L16.8 17 L15 28 L13.2 17 L2 15 L13.2 13 Z"
        fill="white" opacity="0.78" />
    </svg>
  );
}

export default function ProjectSelection() {
  const mounted = true;
  const [hoverLeft,  setHoverLeft]  = useState(false);
  const [hoverRight, setHoverRight] = useState(false);
  const [pressedLeft,  setPressedLeft]  = useState(false);
  const [pressedRight, setPressedRight] = useState(false);

  const navigate = useNavigate();

  const handleCreate = () => {
    setPressedLeft(true);
    setTimeout(() => setPressedLeft(false), 300);
    navigate("/getstart/create");
  }

  const handleEnter = () => {
    setPressedRight(true);
    setTimeout(() => setPressedRight(false), 300);
    navigate("/getstart/join");
  }; 

  return (
    <div style={{
      minHeight: "100vh", width: "100%",
      background: "#0d0d0d",
      display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      fontFamily: "'Syne', 'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes twinkle {
          0%   { opacity: 0.28; transform: scale(0.82); }
          100% { opacity: 1;   transform: scale(1.18); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUpLeft {
          from { opacity: 0; transform: translateY(32px) translateX(-12px); }
          to   { opacity: 1; transform: translateY(0) translateX(0); }
        }
        @keyframes fadeUpRight {
          from { opacity: 0; transform: translateY(32px) translateX(12px); }
          to   { opacity: 1; transform: translateY(0) translateX(0); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-5px); }
        }
        @keyframes glowBreath {
          0%,100% { opacity: 0.7; }
          50%     { opacity: 1; }
        }
        @keyframes scanline {
          0%   { background-position: 0 0; }
          100% { background-position: 0 100px; }
        }

        .card-left {
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s;
        }
        .card-left:hover {
          transform: translateY(-6px) scale(1.012);
        }
        .card-right {
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s;
        }
        .card-right:hover {
          transform: translateY(-6px) scale(1.012);
        }

        .btn-create {
          width: 100%; background: #fff; color: #0d0d0d;
          border: none; border-radius: 999px;
          padding: 13px; font-size: 13px; font-weight: 800;
          font-family: 'Syne', sans-serif;
          letter-spacing: 0.09em; text-transform: uppercase;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.2s, background 0.2s;
        }
        .btn-create:hover {
          box-shadow: 0 8px 30px rgba(255,255,255,0.22);
          background: #f2f2f2;
        }
        .btn-create:active { transform: scale(0.97); }

        .btn-enter {
          width: 100%;
          background: rgba(255,255,255,0.07);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 999px;
          padding: 13px; font-size: 13px; font-weight: 800;
          font-family: 'Syne', sans-serif;
          letter-spacing: 0.09em; text-transform: uppercase;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.2s, background 0.2s, border-color 0.2s;
        }
        .btn-enter:hover {
          background: rgba(255,255,255,0.11);
          border-color: rgba(255,255,255,0.25);
          box-shadow: 0 8px 30px rgba(0,0,0,0.3);
        }
        .btn-enter:active { transform: scale(0.97); }
      `}</style>

      <GridOverlay />
      <StarField />
      <GlobeSphere />

      {/* Sparkle bottom-right */}
      <div style={{
        position: "absolute", bottom: 26, right: 30, zIndex: 5,
        animation: "twinkle 2s ease-in-out infinite alternate",
      }}>
        <SparkleIcon />
      </div>

      {/* Logo */}
      <div style={{
        position: "absolute", top: 24, left: 28, zIndex: 10,
        color: "rgba(255,255,255,0.88)",
        fontWeight: 700, fontSize: 15, letterSpacing: "0.03em",
        display: "flex", alignItems: "center", gap: 8,
        fontFamily: "'Syne', sans-serif",
      }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2"  y="2"  width="6" height="6" rx="1.5" fill="white" opacity="0.9" />
          <rect x="12" y="2"  width="6" height="6" rx="1.5" fill="white" opacity="0.45" />
          <rect x="2"  y="12" width="6" height="6" rx="1.5" fill="white" opacity="0.45" />
          <rect x="12" y="12" width="6" height="6" rx="1.5" fill="white" opacity="0.18" />
        </svg>
        SyncSpace
      </div>

      {/* Avatar group */}
      <div style={{
        position: "absolute", top: 20, left: "50%",
        transform: "translateX(-50%)", zIndex: 10,
        display: "flex", alignItems: "center",
        animation: "float 3.2s ease-in-out infinite",
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          border: "2.5px solid #0d0d0d",
          background: "linear-gradient(135deg,#c8a882,#a07850)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, position: "relative", zIndex: 2,
        }}>
          👤
          <div style={{
            position: "absolute", bottom: 1, right: 1,
            width: 9, height: 9, borderRadius: "50%",
            background: "#22c55e", border: "2px solid #0d0d0d",
          }} />
        </div>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          border: "2.5px solid #0d0d0d",
          background: "#7c3aed",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginLeft: -10, zIndex: 1, fontSize: 18,
        }}>
          🔥
        </div>
      </div>

      {/* Cards container */}
      <div style={{
        position: "relative", zIndex: 10,
        display: "flex", gap: 20,
        alignItems: "stretch",
        animation: mounted ? "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both" : "none",
        animationDelay: "0.05s",
      }}>

        {/* LEFT CARD — Create */}
        <div
          className="card-left"
          onMouseEnter={() => setHoverLeft(true)}
          onMouseLeave={() => setHoverLeft(false)}
          style={{
            width: 310,
            background: hoverLeft
              ? "rgba(32,44,68,0.82)"
              : "rgba(20,28,46,0.72)",
            backdropFilter: "blur(26px)",
            WebkitBackdropFilter: "blur(26px)",
            border: `1px solid ${hoverLeft ? "rgba(80,140,255,0.55)" : "rgba(80,140,255,0.32)"}`,
            borderRadius: 18,
            padding: "44px 32px 32px",
            boxShadow: hoverLeft
              ? "0 0 0 1px rgba(80,140,255,0.2), 0 0 50px rgba(80,140,255,0.18), 0 28px 70px rgba(0,0,0,0.5)"
              : "0 0 0 1px rgba(80,140,255,0.08), 0 0 30px rgba(80,140,255,0.08), 0 28px 60px rgba(0,0,0,0.4)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "space-between",
            gap: 28,
            cursor: "default",
            position: "relative",
            overflow: "hidden",
            animation: mounted ? "fadeUpLeft 0.65s cubic-bezier(0.22,1,0.36,1) both" : "none",
            animationDelay: "0.12s",
          }}
        >
          {/* Blue top glow line */}
          <div style={{
            position: "absolute", top: 0, left: "15%", right: "15%", height: 1,
            background: "linear-gradient(90deg, transparent, rgba(80,160,255,0.6), transparent)",
            animation: "glowBreath 2.5s ease-in-out infinite",
          }} />

          {/* Scanline texture */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(80,140,255,0.015) 3px, rgba(80,140,255,0.015) 4px)",
            borderRadius: 18,
          }} />

          <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <div style={{ marginBottom: 22, opacity: hoverLeft ? 1 : 0.8, transition: "opacity 0.3s" }}>
              <PlusIcon />
            </div>
            <h2 style={{
              color: "#fff", fontFamily: "'Syne', sans-serif",
              fontWeight: 800, fontSize: 20,
              letterSpacing: "0.07em", textTransform: "uppercase",
              margin: "0 0 12px",
              textShadow: hoverLeft ? "0 0 20px rgba(80,160,255,0.4)" : "none",
              transition: "text-shadow 0.3s",
            }}>
              Create a New Project
            </h2>
            <p style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 13, fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400, lineHeight: 1.55, margin: 0,
            }}>
              Start fresh. Define your new creative workspace.
            </p>
          </div>

          <button className="btn-create" onClick={handleCreate} style={{ position: "relative", zIndex: 1 }}>
            Create Project
          </button>
        </div>

        {/* RIGHT CARD — Quick Enter */}
        <div
          className="card-right"
          onMouseEnter={() => setHoverRight(true)}
          onMouseLeave={() => setHoverRight(false)}
          style={{
            width: 310,
            background: hoverRight
              ? "rgba(36,36,36,0.82)"
              : "rgba(26,26,26,0.72)",
            backdropFilter: "blur(26px)",
            WebkitBackdropFilter: "blur(26px)",
            border: `1px solid ${hoverRight ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.09)"}`,
            borderRadius: 18,
            padding: "44px 32px 32px",
            boxShadow: hoverRight
              ? "0 0 0 1px rgba(255,255,255,0.07), 0 28px 70px rgba(0,0,0,0.5)"
              : "0 28px 60px rgba(0,0,0,0.4)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "space-between",
            gap: 28,
            cursor: "default",
            position: "relative",
            overflow: "hidden",
            animation: mounted ? "fadeUpRight 0.65s cubic-bezier(0.22,1,0.36,1) both" : "none",
            animationDelay: "0.18s",
          }}
        >
          {/* Subtle top line */}
          <div style={{
            position: "absolute", top: 0, left: "20%", right: "20%", height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
          }} />

          <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <div style={{ marginBottom: 22, opacity: hoverRight ? 1 : 0.75, transition: "opacity 0.3s" }}>
              <EnterIcon />
            </div>
            <h2 style={{
              color: "#fff", fontFamily: "'Syne', sans-serif",
              fontWeight: 800, fontSize: 20,
              letterSpacing: "0.07em", textTransform: "uppercase",
              margin: "0 0 12px",
            }}>
              Quick Enter Project
            </h2>
            <p style={{
              color: "rgba(255,255,255,0.38)",
              fontSize: 13, fontFamily: "'DM Sans', sans-serif",
              fontWeight: 400, lineHeight: 1.55, margin: 0,
            }}>
              Access an existing project instantly
            </p>
          </div>

          <button className="btn-enter" onClick={handleEnter} style={{ position: "relative", zIndex: 1 }}>
            Enter Project
          </button>
        </div>

      </div>
    </div>
  );
}