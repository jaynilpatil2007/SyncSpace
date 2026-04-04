import { useState } from "react";
import { useProjectStore } from "../../store/projectStore";
import { useNavigate } from "react-router";

const starPositions = [
  { top: "14%", left: "7%",  size: 14, cross: true },
  { top: "22%", left: "80%", size: 8,  cross: false },
  { top: "55%", left: "4%",  size: 10, cross: true },
  { top: "68%", left: "88%", size: 10, cross: true },
  { top: "30%", left: "93%", size: 6,  cross: false },
  { top: "80%", left: "20%", size: 5,  cross: false },
  { top: "10%", left: "50%", size: 4,  cross: false },
];

function CrossStar({ size, style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      style={style}
    >
      <line x1="10" y1="0" x2="10" y2="20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="0" y1="10" x2="20" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10" y1="4" x2="10" y2="16" stroke="white" strokeWidth="3.5" strokeLinecap="round" opacity="0.5" />
      <line x1="4" y1="10" x2="16" y2="10" stroke="white" strokeWidth="3.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function StarField() {
  return (
    <>
      {starPositions.map((s, i) =>
        s.cross ? (
          <CrossStar
            key={i}
            size={s.size * 2.5}
            style={{
              position: "absolute",
              top: s.top,
              left: s.left,
              opacity: 0.7,
              animation: `twinkle ${2.2 + i * 0.35}s ease-in-out infinite alternate`,
              filter: "drop-shadow(0 0 6px rgba(255,255,255,0.5))",
            }}
          />
        ) : (
          <div
            key={i}
            style={{
              position: "absolute",
              top: s.top,
              left: s.left,
              width: s.size * 0.35,
              height: s.size * 0.35,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.6)",
              boxShadow: `0 0 ${s.size}px ${s.size * 0.5}px rgba(255,255,255,0.15)`,
              animation: `twinkle ${2.5 + i * 0.4}s ease-in-out infinite alternate`,
            }}
          />
        )
      )}
    </>
  );
}

function GlobeSphere() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "-40%",
        left: "50%",
        transform: "translateX(-50%)",
        width: 920,
        height: 920,
        borderRadius: "50%",
        background:
          "radial-gradient(ellipse at 40% 28%, #242424 0%, #181818 55%, #101010 100%)",
        boxShadow:
          "0 -20px 80px 0 rgba(255,255,255,0.035), inset 0 20px 60px rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.055)",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

function GridOverlay() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

function SparkleIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <path
        d="M15 2 L16.8 13 L28 15 L16.8 17 L15 28 L13.2 17 L2 15 L13.2 13 Z"
        fill="white"
        opacity="0.8"
      />
    </svg>
  );
}

function PlusCircleIcon() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
      <circle cx="23" cy="23" r="21" stroke="white" strokeWidth="2" />
      <line x1="23" y1="13" x2="23" y2="33" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="13" y1="23" x2="33" y2="23" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export default function CreateProject() {
  const [form, setForm] = useState({ projName: "", projPassword: ""});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const mounted = true;
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const { createProject } = useProjectStore();

  const handleSubmit = async () => {
      
    if (!form.projName.trim() || !form.projPassword.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }
    try {
      setLoading(true);

      const res = await createProject(form);
      console.log(res);

      setSuccess(true);

      setTimeout(( ) => {
        navigate(`/getstart/${res._id}`);
      }, 500)

      

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#0e0e0e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Syne', 'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes twinkle {
          0%   { opacity: 0.3; transform: scale(0.85); }
          100% { opacity: 1;   transform: scale(1.15); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%     { transform: translateX(-8px); }
          40%     { transform: translateX(8px); }
          60%     { transform: translateX(-5px); }
          80%     { transform: translateX(5px); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-5px); }
        }
        @keyframes successPop {
          0%   { transform: scale(0.8); opacity: 0; }
          60%  { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes glowPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.12); }
          50%     { box-shadow: 0 0 0 8px rgba(255,255,255,0); }
        }

        .cp-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 10px;
          color: #fff;
          font-size: 13.5px;
          font-family: 'DM Sans', sans-serif;
          padding: 13px 16px;
          outline: none;
          transition: border-color 0.22s, background 0.22s, box-shadow 0.22s;
          box-sizing: border-box;
          letter-spacing: 0.01em;
        }
        .cp-input::placeholder { color: rgba(255,255,255,0.25); font-weight: 300; }
        .cp-input:focus {
          border-color: rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.07);
          box-shadow: 0 0 0 3px rgba(255,255,255,0.055);
        }

        .init-btn {
          width: 100%;
          background: #fff;
          color: #0e0e0e;
          border: none;
          border-radius: 999px;
          padding: 14px;
          font-size: 15px;
          font-weight: 700;
          font-family: 'Syne', sans-serif;
          letter-spacing: 0.01em;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.2s, background 0.2s;
          position: relative;
          overflow: hidden;
        }
        .init-btn:hover:not(:disabled) {
          transform: translateY(-1.5px);
          box-shadow: 0 10px 36px rgba(255,255,255,0.2);
        }
        .init-btn:active:not(:disabled) { transform: translateY(0); }
        .init-btn:disabled { opacity: 0.65; cursor: not-allowed; }
      `}</style>

      <GridOverlay />
      <StarField />
      <GlobeSphere />

      {/* Sparkle bottom-right */}
      <div style={{
        position: "absolute", bottom: 28, right: 32, zIndex: 5,
        animation: "twinkle 2.1s ease-in-out infinite alternate",
      }}>
        <SparkleIcon />
      </div>

      {/* Logo top-left */}
      <div style={{
        position: "absolute", top: 24, left: 28, zIndex: 10,
        color: "rgba(255,255,255,0.88)", fontWeight: 700,
        fontSize: 15, letterSpacing: "0.03em",
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

      {/* Avatar group top-center */}
      <div style={{
        position: "absolute", top: 20, left: "50%",
        transform: "translateX(-50%)", zIndex: 10,
        display: "flex", alignItems: "center",
        animation: "float 3s ease-in-out infinite",
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          border: "2.5px solid #0e0e0e",
          background: "linear-gradient(135deg,#c8a882,#a07850)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, position: "relative", zIndex: 2, overflow: "hidden",
        }}>
          👤
          <div style={{
            position: "absolute", bottom: 2, right: 2,
            width: 9, height: 9, borderRadius: "50%",
            background: "#22c55e", border: "2px solid #0e0e0e",
          }} />
        </div>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          border: "2.5px solid #0e0e0e",
          background: "#7c3aed",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginLeft: -10, zIndex: 1, fontSize: 18,
        }}>
          🔥
        </div>
      </div>

      {/* Card */}
      <div
        style={{
          position: "relative", zIndex: 10,
          width: 368,
          background: "rgba(28,28,28,0.75)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: 20,
          padding: "38px 36px 34px",
          boxShadow:
            "0 36px 90px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.06) inset",
          animation: mounted ? "fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both" : "none",
          animationDelay: "0.08s",
        }}
      >
        {/* Glow highlight top-right of card */}
        <div style={{
          position: "absolute", top: -1, right: 60, width: 100, height: 2,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
          borderRadius: "50%",
        }} />

        {/* Plus icon */}
        <div style={{
          display: "flex", justifyContent: "center", marginBottom: 18,
          animation: "glowPulse 2.8s ease-in-out infinite",
        }}>
          <PlusCircleIcon />
        </div>

        {/* Title */}
        <h1 style={{
          textAlign: "center",
          color: "#fff",
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: 24,
          letterSpacing: "0.08em",
          margin: "0 0 10px",
          textTransform: "uppercase",
          textShadow: "0 1px 18px rgba(255,255,255,0.12)",
        }}>
          Create Project
        </h1>

        <p style={{
          textAlign: "center",
          color: "rgba(255,255,255,0.4)",
          fontSize: 13,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 400,
          margin: "0 0 26px",
          lineHeight: 1.6,
        }}>
          Start your next creative masterpiece.<br />
          Enter a unique name and secure password.
        </p>

        {/* Fields */}
        <div
          style={{
            display: "flex", flexDirection: "column", gap: 14,
            animation: shake ? "shake 0.5s ease" : "none",
          }}
        >
          <div>
            <label style={{
              display: "block",
              color: "rgba(255,255,255,0.5)",
              fontSize: 12.5,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              marginBottom: 7,
              letterSpacing: "0.015em",
            }}>
              Project Name:
            </label>
            <input
              className="cp-input"
              name="projName"
              type="text"
              placeholder="[My Creative Venture]"
              value={form.projName}
              onChange={(e) => setForm({...form, projName: e.target.value})}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          <div>
            <label style={{
              display: "block",
              color: "rgba(255,255,255,0.5)",
              fontSize: 12.5,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              marginBottom: 7,
              letterSpacing: "0.015em",
            }}>
              Password:
            </label>
            <div style={{ position: "relative" }}>
              <input
                className="cp-input"
                name="projPassword"
                type={showPass ? "text" : "password"}
                placeholder="Create a strong password"
                value={form.projPassword}
                onChange={(e) => setForm({...form, projPassword: e.target.value})}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                style={{ paddingRight: 44 }}
              />
              <button
                onClick={() => setShowPass(v => !v)}
                style={{
                  position: "absolute", right: 12, top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "rgba(255,255,255,0.3)", padding: 4,
                  display: "flex", alignItems: "center",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
              >
                {showPass ? (
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Button */}
        <div style={{ marginTop: 22 }}>
          <button
            className="init-btn"
            onClick={handleSubmit}
            disabled={loading || success}
          >
            {success ? (
              <span style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                animation: "successPop 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                color: "#22c55e",
              }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Workspace Created!
              </span>
            ) : loading ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                  style={{ animation: "spin 0.75s linear infinite" }}>
                  <circle cx="7.5" cy="7.5" r="6" stroke="#999" strokeWidth="2" />
                  <path d="M7.5 1.5a6 6 0 016 6" stroke="#111" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Initializing...
              </span>
            ) : (
              "Initialize Workspace"
            )}
          </button>
        </div>

        {/* Divider hint */}
        <p style={{
          textAlign: "center", marginTop: 15,
          fontSize: 12, color: "rgba(255,255,255,0.22)",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          Already have a project?{" "}
          <span style={{
            color: "rgba(255,255,255,0.48)", cursor: "pointer",
            textDecoration: "underline",
          }}>
            Unlock it
          </span>
        </p>
      </div>
    </div>
  );
}