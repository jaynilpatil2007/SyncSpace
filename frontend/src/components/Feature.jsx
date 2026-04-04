import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Real-Time Collaboration",
    items: [
      "Multiple users can edit documents simultaneously",
      "Instant updates across all users using WebSockets",
    ],
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Document Management",
    items: [
      "Create, edit, and delete documents",
      "Real-time synchronization across all devices",
    ],
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    title: "Task Management",
    items: [
      "Assign tasks to team members",
      "Track progress and completion",
    ],
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
      </svg>
    ),
    title: "Auto Save",
    items: [
      "Automatically saves changes in real-time",
      "Full version history support",
    ],
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Responsive Design",
    items: [
      "Works on both mobile and desktop",
      "Optimized for touch and keyboard input",
    ],
  },
];

export default function Feature() {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap";
    document.head.appendChild(link);
    const t = setTimeout(() => setHeaderVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const observers = cardRefs.current.map((el, index) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards((prev) => [...new Set([...prev, index])]);
            }, index * 110);
            observer.disconnect();
          }
        },
        { threshold: 0.12 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((obs) => obs && obs.disconnect());
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "#09090b", color: "#fff", fontFamily: "'Sora', sans-serif" }}
    >
      {/* ── Background ── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 60% at 50% 110%, rgba(228,228,231,0.13) 0%, #09090b 62%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            width: 420,
            height: 420,
            top: "5%",
            left: "60%",
            background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-10"
          style={{
            width: 300,
            height: 300,
            top: "40%",
            left: "5%",
            background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">

        {/* ── Header ── */}
        <header
          className="mb-20 text-center"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div
            className="mb-10 inline-flex items-center gap-2.5 rounded-full border px-5 py-2 text-sm font-semibold tracking-wide"
            style={{
              borderColor: "rgba(167,139,250,0.3)",
              background: "rgba(167,139,250,0.08)",
              color: "#c4b5fd",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            SyncSpace · Features
          </div>

          <h1
            className="mx-auto mb-6 max-w-4xl text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
            style={{
              background: "linear-gradient(160deg, #ffffff 30%, #71717a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Build, Edit, and Sync
            <br className="hidden sm:block" />
            Instantly, Anywhere.
          </h1>

          <p className="mx-auto max-w-xl text-base sm:text-lg leading-relaxed" style={{ color: "#a1a1aa" }}>
            A real-time collaboration workspace with offline support, seamless syncing,
            and lightning-fast performance.
          </p>

          <div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.7s ease 0.25s, transform 0.7s ease 0.25s",
            }}
          >
            {/* <button
              className="rounded-full px-7 py-3 text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: "#a78bfa", color: "#09090b", boxShadow: "0 0 28px rgba(167,139,250,0.35)" }}
            >
              Get Started Free
            </button>
            <button
              className="rounded-full border px-7 py-3 text-sm font-semibold transition-all duration-200 hover:border-violet-400 hover:text-violet-300 active:scale-95"
              style={{ borderColor: "rgba(255,255,255,0.15)", color: "#d4d4d8" }}
            >
              View Demo →
            </button> */}
          </div>
        </header>

        {/* ── Features grid ── */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const isVisible = visibleCards.includes(i);
            return (
              <div
                key={feature.title}
                ref={(el) => (cardRefs.current[i] = el)}
                className="group relative rounded-2xl border p-8 backdrop-blur-md"
                style={{
                  background: "rgba(255,255,255,0.028)",
                  borderColor: "rgba(255,255,255,0.09)",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0px)" : "translateY(28px)",
                  transition:
                    "opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1), border-color 0.3s, background 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(167,139,250,0.38)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.052)";
                  e.currentTarget.style.transform = "translateY(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.028)";
                  e.currentTarget.style.transform = "translateY(0px)";
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: "inset 0 0 40px rgba(167,139,250,0.06)" }}
                />

                <div
                  className="mb-6 flex items-center justify-center rounded-xl"
                  style={{
                    width: 48,
                    height: 48,
                    background: "rgba(167,139,250,0.1)",
                    color: "#a78bfa",
                    boxShadow: "0 0 22px rgba(167,139,250,0.12)",
                  }}
                >
                  {feature.icon}
                </div>

                <h3 className="mb-4 text-xl font-semibold tracking-tight" style={{ color: "#f4f4f5" }}>
                  {feature.title}
                </h3>

                <ul className="space-y-2.5">
                  {feature.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: "#a1a1aa" }}>
                      <span style={{ color: "#a78bfa", marginTop: 1, flexShrink: 0 }}>—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* ── Footer ── */}
        <p className="mt-16 text-center text-xs" style={{ color: "#52525b" }}>
          © 2026 SyncSpace · Built for teams that move fast.
        </p>
      </div>
    </div>
  );
}