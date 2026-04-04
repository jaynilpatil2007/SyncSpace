import React from "react";
import { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router";

/* ── Responsive hook ── */
function useBreakpoint() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return {
    isMobile: width < 640,
    isTablet: width >= 640 && width < 1024,
    isDesktop: width >= 1024,
  };
}

/* ── Sub-components ── */
const BtnIcon = () => (
  <span style={{
    width: 13, height: 13, border: "1.5px solid currentColor", borderRadius: 2,
    position: "relative", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  }}>
    <span style={{ width: 5, height: 5, borderRight: "1.5px solid currentColor", borderBottom: "1.5px solid currentColor", transform: "rotate(-45deg)", display: "block" }} />
    <span style={{ position: "absolute", left: 0, top: "50%", marginTop: -0.75, width: 7, height: 1.5, background: "currentColor", display: "block" }} />
  </span>
);

const DemoIcon = () => (
  <span style={{
    display: "inline-block", width: 0, height: 0, borderStyle: "solid",
    borderWidth: "5px 0 5px 8px", borderColor: "transparent transparent transparent currentColor",
    borderRadius: 1, flexShrink: 0,
  }} />
);

const LogoIcon = () => (
   <div className="flex items-center gap-0.5">
          <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
            <path d="M2 4L8 9L2 14" stroke="#f97316" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 4L15 9L9 14" stroke="#f97316" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
);

const HamburgerIcon = ({ open }) => (
  <div style={{ width: 22, height: 16, position: "relative" }}>
    {[0, 7, 14].map((top, i) => (
      <span key={i} style={{
        position: "absolute", left: 0, top,
        width: open && i === 1 ? 0 : 22, height: 1.5,
        background: "rgba(255,255,255,0.85)", borderRadius: 2,
        transition: "all 0.25s",
        transform: open
          ? i === 0 ? "rotate(45deg) translate(5px, 5px)"
          : i === 2 ? "rotate(-45deg) translate(5px, -5px)"
          : "none"
          : "none",
        opacity: open && i === 1 ? 0 : 1,
      }} />
    ))}
  </div>
);

/* ── Main Component ── */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isMobile, isTablet } = useBreakpoint();
  const navigate = useNavigate();

  const px = isMobile ? 20 : isTablet ? 36 : 60;
  const h1Size = isMobile ? 36 : isTablet ? 54 : 80;

  return (
    <div style={{
      margin: 0, padding: 0, backgroundColor: "#000", color: "#fff",
      fontFamily: "'Inter', sans-serif", WebkitFontSmoothing: "antialiased",
      overflowX: "hidden", minHeight: "100vh",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        .ss-nav-link { color: rgba(255,255,255,0.8); text-decoration: none; font-size: 13.5px; font-weight: 400; transition: color 0.2s; }
        .ss-nav-link:hover { color: #fff; }
        .ss-btn-primary { background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,0.2); transition: all 0.2s; cursor: pointer; }
        .ss-btn-primary:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.3); }
        .ss-btn-demo { background: transparent; color: rgba(255,255,255,0.85); border: 1.5px solid rgba(255,255,255,0.1); transition: all 0.2s; cursor: pointer; }
        .ss-btn-demo:hover { color: #fff; background: rgba(255,255,255,0.05); }
        .ss-btn-header { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.2); transition: background 0.2s; cursor: pointer; }
        .ss-btn-header:hover { background: rgba(255,255,255,0.1); }
        .ss-mobile-link { display: block; color: rgba(255,255,255,0.8); text-decoration: none; font-size: 17px; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.07); transition: color 0.2s; }
        .ss-mobile-link:hover { color: #fff; }
      `}</style>

      <div style={{ position: "relative", width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Background */}
        <div style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
          background: `linear-gradient(rgba(0,0,0,0.95), rgba(0,0,0,0.7)),
            conic-gradient(from 180deg at 50% 50%, #000 0deg, #121212 180deg, #000 360deg), #000`,
          zIndex: -2,
        }} />

        {/* Earth Arc */}
        <div style={{
          position: "absolute", bottom: -50, left: "-20%", width: "140%", height: "30vh",
          backgroundColor: "#000", borderTop: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "50% / 100%", filter: "blur(2px)", zIndex: -1,
        }} />

        {/* Stars */}
        {!isMobile && <span style={{ position: "absolute", top: "38%", left: "27%", fontSize: 24, opacity: 0.7, userSelect: "none" }}>✦</span>}
        <span style={{ position: "absolute", top: "46%", right: isMobile ? "5%" : "9%", fontSize: isMobile ? 16 : 24, opacity: 0.7, userSelect: "none" }}>✦</span>
        <span style={{ position: "absolute", top: "14.5%", right: isMobile ? "8%" : "21.8%", fontSize: 14, opacity: 0.5, userSelect: "none" }}>✦</span>

        {/* Bottom glow */}
        <div style={{
          position: "absolute", bottom: "-70vh", left: "-10%", width: "120%", height: "100vh",
          background: "radial-gradient(circle at top, rgba(255,255,255,0.092) 0%, transparent 90%)",
          borderRadius: "60%", pointerEvents: "none",
        }} />

        {/* ── HEADER ── */}
        <header style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: `${isMobile ? 16 : isTablet ? 20 : 24}px ${px}px`,
          zIndex: 20, position: "relative",
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", fontWeight: 600, fontSize: 18, letterSpacing: "-0.02em" }}>
            <LogoIcon />
            SyncSpace
          </div>

          {/* Desktop nav */}
          {!isMobile && (
            <nav style={{ display: "flex", gap: isTablet ? 16 : 24 }}>
              {["Home", "Features", "How it Works", "Demo"].map((item) => {
              const path = item === "Home" ? "/" : item === "Features" ? "/feature" : item === "How it Works" ? "/howitwork" : "#";
              return(
                <Link
                  key={item}
                  to={path}
                  className="ss-mobile-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </Link>
              )
            })}
            </nav>
          )}

          {/* Desktop actions */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Link to={'/login'}>Login</Link>
              <button className="ss-btn-header" style={{
                padding: "8px 18px", borderRadius: 20, fontSize: 13, fontWeight: 500,
                display: "flex", alignItems: "center", gap: 7,
              }}>
                <BtnIcon />
                Get Started
              </button>
            </div>
          )}

          {/* Mobile: login + hamburger */}
          {isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <Link to={'/login'}>Login</Link>
              <button
                onClick={() => setMenuOpen(o => !o)}
                style={{ background: "none", border: "none", padding: 4, cursor: "pointer", display: "flex", alignItems: "center" }}
                aria-label="Toggle menu"
              >
                <HamburgerIcon open={menuOpen} />
              </button>
              
            </div>
          )}
        </header>

        {/* ── MOBILE MENU ── */}
        {isMobile && (
          <div style={{
            position: "absolute", top: 56, left: 0, right: 0, zIndex: 15,
            background: "rgba(0,0,0,0.97)", backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            padding: menuOpen ? "8px 24px 28px" : "0 24px",
            maxHeight: menuOpen ? 380 : 0,
            overflow: "hidden",
            transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1), padding 0.3s",
          }}>
            {["Home", "Features", "How it Works", "Demo"].map((item) => {
              const path = item === "Home" ? "/" : item === "Features" ? "/feature" : item === "How it Works" ? "/howitwork" : "#";
              return(
                <Link
                  key={item}
                  to={path}
                  className="ss-mobile-link"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </Link>
              )
            })}
            <button className="ss-btn-header" 
            onClick={() => navigate("/getstart")}
            
            style={{
              marginTop: 20, width: "100%", padding: "13px 18px", borderRadius: 20,
              fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              <BtnIcon />
              Get Started
            </button>
          </div>
        )}

        {/* ── HERO CONTENT ── */}
        <div style={{
          display: "flex", flexDirection: "column", justifyContent: "center", flex: 1,
          paddingLeft: px, paddingRight: px,
          paddingTop: isMobile ? 64 : isTablet ? 80 : 0,
          paddingBottom: isMobile ? 100 : 0,
          minHeight: `calc(100vh - ${isMobile ? 56 : 80}px)`,
        }}>
          <h1 style={{
            fontSize: h1Size, fontWeight: 600, lineHeight: 1.05,
            letterSpacing: isMobile ? "-0.025em" : "-0.035em",
            margin: 0, marginBottom: isMobile ? 28 : 40, opacity: 0.95,
            maxWidth: isMobile ? "100%" : isTablet ? "80%" : "65%",
          }}>
            Collaborate Smarter,{isMobile ? " " : <br />}Work anywhere
          </h1>

          {/* CTA Buttons */}
          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 12 : 18,
            marginBottom: isMobile ? 0 : "15vh",
            width: isMobile ? "100%" : "auto",
          }}>
            <button className="ss-btn-primary" style={{
              padding: isMobile ? "13px 24px" : "12px 28px",
              borderRadius: 25, fontSize: isMobile ? 14 : 14.5, fontWeight: 500,
              display: "flex", alignItems: "center",
              justifyContent: isMobile ? "center" : "flex-start",
              gap: 10, width: isMobile ? "100%" : "auto",
            }}
            onClick={() => navigate("/getstart")}>
              <BtnIcon />
              Get Started
            </button>

            <button className="ss-btn-demo" style={{
              padding: isMobile ? "13px 24px" : "12px 28px",
              borderRadius: 25, fontSize: isMobile ? 14 : 14.5, fontWeight: 400,
              display: "flex", alignItems: "center",
              justifyContent: isMobile ? "center" : "flex-start",
              gap: 10, width: isMobile ? "100%" : "auto",
            }}>
              <DemoIcon />
              watch Demo
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}