import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/* ─── Data ─── */
const screens = [
  {
    id: "match",
    label: "Daily Match",
    icon: "❤️",
    title: "Your One Match",
    subtitle: "One AI-curated connection. Every day at 8PM.",
    accent: "#ff2244",
    bg: "linear-gradient(160deg, #1a0008 0%, #2d0010 50%, #1a0008 100%)",
    pill: "LIVE",
  },
  {
    id: "personality",
    label: "AI Matching",
    icon: "🧠",
    title: "Deep Analysis",
    subtitle: "Personality-driven. Not swipe-driven.",
    accent: "#ff4466",
    bg: "linear-gradient(160deg, #0d0015 0%, #1a0025 50%, #0d0015 100%)",
    pill: "AI",
  },
  {
    id: "chat",
    label: "Real Chat",
    icon: "💬",
    title: "24hr Window",
    subtitle: "No ghosting. No ignoring. Real conversations.",
    accent: "#ff6688",
    bg: "linear-gradient(160deg, #001010 0%, #001a1a 50%, #001010 100%)",
    pill: "LIVE",
  },
  {
    id: "shield",
    label: "No Swipes",
    icon: "🛡️",
    title: "Zero Games",
    subtitle: "No algorithm bias. Everyone gets a fair chance.",
    accent: "#ff2244",
    bg: "linear-gradient(160deg, #100800 0%, #1a0f00 50%, #100800 100%)",
    pill: "SAFE",
  },
];

const features = [
  { icon: "◆", title: "1 Match / Day", desc: "Quality over quantity. One AI-curated match daily." },
  { icon: "◆", title: "24hr Window", desc: "Every match expires — urgency breeds real connection." },
  { icon: "◆", title: "Zero Ghosting", desc: "Built-in accountability. No vanishing acts allowed." },
  { icon: "◆", title: "AI Powered", desc: "Deep personality analysis. Not just photos and bios." },
  { icon: "◆", title: "Privacy First", desc: "Your data is yours. No selling, no third-party access." },
  { icon: "◆", title: "Real People", desc: "Verified profiles. No bots, no catfishing." },
];

const ticker = [
  "NO SWIPING", "ONE MATCH DAILY", "ZERO GHOSTING", "AI POWERED",
  "PRIVACY FIRST", "REAL CONNECTIONS", "NO PAY TO PLAY", "24HR WINDOW",
];

const steps = [
  { step: "01", title: "Build Your Real Profile", desc: "Answer personality-driven questions. Deep dives into who you actually are — not just your best photos." },
  { step: "02", title: "AI Finds Your Match", desc: "Our algorithm analyzes compatibility across values, communication style, interests, and life goals." },
  { step: "03", title: "One Match. Every Day.", desc: "At 8PM daily, you receive your match. No browsing, no swiping, no paradox of choice." },
  { step: "04", title: "24-Hour Window", desc: "You have 24 hours to connect. If both engage, the conversation stays. No ghosting possible." },
];

/* ─── Hooks ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ─── Phone Mockup ─── */
function PhoneMockup({
  screen, position,
}: {
  screen: typeof screens[0];
  position: "left" | "center" | "right";
  // real image URL can go here later
}) {
  const isCenter = position === "center";
  const isLeft = position === "left";

  return (
    <div style={{
      width: isCenter ? 260 : 220,
      height: isCenter ? 520 : 440,
      borderRadius: 36,
      background: "#0e0e0e",
      border: `2px solid ${isCenter ? "rgba(255,34,68,0.4)" : "#1e1e1e"}`,
      padding: 6,
      position: "relative",
      flexShrink: 0,
      transform: isCenter
        ? "translateY(0) scale(1)"
        : isLeft
          ? "translateY(40px) scale(0.88) rotate(-3deg)"
          : "translateY(40px) scale(0.88) rotate(3deg)",
      opacity: isCenter ? 1 : 0.45,
      transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
      boxShadow: isCenter
        ? `0 0 60px rgba(255,34,68,0.15), 0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)`
        : "0 20px 40px rgba(0,0,0,0.4)",
      zIndex: isCenter ? 2 : 1,
    }}>
      {/* Status bar */}
      <div style={{
        position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)",
        width: 90, height: 20,
        background: "#0e0e0e",
        borderRadius: "0 0 14px 14px",
        zIndex: 10,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: "#222" }} />
      </div>

      {/* Screen content */}
      <div style={{
        width: "100%", height: "100%",
        borderRadius: 30,
        overflow: "hidden",
        background: screen.bg,
        display: "flex", flexDirection: "column",
        padding: "48px 24px 28px",
        position: "relative",
      }}>
        {/* Noise overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.4, pointerEvents: "none",
        }} />

        {/* Pill badge */}
        <div style={{
          alignSelf: "flex-start",
          background: "rgba(255,34,68,0.15)",
          border: "1px solid rgba(255,34,68,0.3)",
          borderRadius: 100,
          padding: "4px 12px",
          fontFamily: "'Space Mono', monospace",
          fontSize: 9, color: screen.accent,
          letterSpacing: 2, marginBottom: 20,
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: screen.accent, boxShadow: `0 0 6px ${screen.accent}` }} />
          {screen.pill}
        </div>

        {/* Icon */}
        <div style={{
          fontSize: isCenter ? 52 : 40,
          marginBottom: 16,
          filter: `drop-shadow(0 0 20px ${screen.accent}60)`,
        }}>{screen.icon}</div>

        {/* Title */}
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: isCenter ? 26 : 22,
          color: "#fff", letterSpacing: 3,
          lineHeight: 1.1, marginBottom: 10,
        }}>{screen.title}</div>

        {/* Subtitle */}
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12, color: "rgba(255,255,255,0.6)",
          lineHeight: 1.6, marginBottom: "auto",
        }}>{screen.subtitle}</div>

        {/* Fake UI element — match card */}
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: "14px 16px",
          marginTop: 20,
          backdropFilter: "blur(10px)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: `linear-gradient(135deg, ${screen.accent}, #330011)`,
              flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16,
            }}>👤</div>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#fff", fontWeight: 600 }}>Your match is ready</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "rgba(255,34,68,0.7)", letterSpacing: 1, marginTop: 2 }}>EXPIRES IN 23:47:12</div>
            </div>
          </div>
        </div>

        {/* Bottom button */}
        <div style={{
          marginTop: 14,
          background: screen.accent,
          borderRadius: 14,
          padding: "12px 16px",
          textAlign: "center",
          fontFamily: "'Space Mono', monospace",
          fontSize: 10, color: "#fff",
          letterSpacing: 2,
          boxShadow: `0 4px 20px ${screen.accent}50`,
        }}>CONNECT NOW</div>
      </div>
    </div>
  );
}

/* ─── Ticker ─── */
function Ticker() {
  return (
    <div style={{
      overflow: "hidden", padding: "20px 0",
      borderTop: "1px solid #111", borderBottom: "1px solid #111",
      background: "#040404",
      position: "relative",
    }}>
      <div style={{
        display: "flex", gap: 0,
        animation: "ticker 20s linear infinite",
        width: "max-content",
      }}>
        {[...ticker, ...ticker, ...ticker].map((t, i) => (
          <span key={i} style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 14, letterSpacing: 4, color: "#222",
            padding: "0 32px", whiteSpace: "nowrap",
            display: "flex", alignItems: "center", gap: 32,
          }}>
            <span style={{ color: "#ff2244", fontSize: 8 }}>◆</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Feature Card ─── */
function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { ref, visible } = useInView();

  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        padding: "40px 36px",
        background: hovered ? "rgba(255,34,68,0.04)" : "#0a0a0a",
        border: `1px solid ${hovered ? "rgba(255,34,68,0.2)" : "#141414"}`,
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        transform: visible
          ? hovered ? "translateY(-6px)" : "translateY(0)"
          : "translateY(32px)",
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${index * 70}ms` : "0ms",
        boxShadow: hovered ? "0 20px 50px rgba(255,34,68,0.06)" : "none",
        cursor: "default",
        position: "relative", overflow: "hidden",
      }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(to right, ${hovered ? "#ff2244" : "transparent"}, transparent)`,
        transition: "background 0.4s ease",
      }} />
      <div style={{
        fontFamily: "'Space Mono', monospace", fontSize: 12,
        color: "#ff2244", marginBottom: 20,
        transition: "transform 0.3s ease",
        transform: hovered ? "scale(1.3) rotate(45deg)" : "scale(1)",
      }}>{feature.icon}</div>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif", fontSize: 22,
        color: "#fff", letterSpacing: 2, marginBottom: 10,
      }}>{feature.title}</div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 14,
        color: "#555", lineHeight: 1.7,
      }}>{feature.desc}</div>
    </div>
  );
}

/* ─── Step ─── */
function StepItem({ item, index, total }: { item: typeof steps[0]; index: number; total: number }) {
  const [hovered, setHovered] = useState(false);
  const { ref, visible } = useInView();

  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid", gridTemplateColumns: "64px 1fr",
        gap: 32, padding: "44px 0",
        borderTop: "1px solid #111",
        background: hovered ? "rgba(255,34,68,0.015)" : "transparent",
        transition: "all 0.4s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${index * 100}ms`,
        position: "relative",
      }}>
      {/* Connecting line */}
      {index < total - 1 && (
        <div style={{
          position: "absolute", left: 30, top: "100%",
          width: 1, height: 44,
          background: "linear-gradient(to bottom, #ff224430, transparent)",
          zIndex: 0,
        }} />
      )}
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif", fontSize: 44,
        color: hovered ? "#ff2244" : "#1c1c1c",
        transition: "color 0.3s ease",
        letterSpacing: 2, lineHeight: 1,
      }}>{item.step}</div>
      <div>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif", fontSize: 26,
          color: "#fff", letterSpacing: 2, marginBottom: 10,
        }}>{item.title}</div>
        <div style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 15,
          color: "#555", lineHeight: 1.8,
        }}>{item.desc}</div>
      </div>
    </div>
  );
}

/* ─── Main ─── */
export default function DeepPreview() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveScreen(p => (p + 1) % screens.length), 3800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const prev = (activeScreen - 1 + screens.length) % screens.length;
  const next = (activeScreen + 1) % screens.length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #060606; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #ff2244; }
        ::selection { background: rgba(255,34,68,0.3); color: #fff; }

        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 30px rgba(255,34,68,0.25); }
          50% { box-shadow: 0 0 60px rgba(255,34,68,0.5), 0 0 100px rgba(255,34,68,0.15); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Cursor glow */}
      <div style={{
        position: "fixed", pointerEvents: "none", zIndex: 0,
        left: mousePos.x - 250, top: mousePos.y - 250,
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,34,68,0.05) 0%, transparent 70%)",
        transition: "left 0.15s ease, top 0.15s ease",
      }} />

      <div style={{ background: "#060606", color: "#fff", minHeight: "100vh", position: "relative" }}>

        {/* ── Nav ── */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "0 5vw", height: 64,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(6,6,6,0.9)", backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,34,68,0.12)",
        }}>
          <button onClick={() => window.history.back()} style={{
            background: "none", border: "1px solid #222", color: "#555",
            fontFamily: "'Space Mono', monospace", fontSize: 11,
            letterSpacing: 2, textTransform: "uppercase",
            padding: "8px 18px", cursor: "pointer", transition: "all 0.3s ease",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#ff2244"; e.currentTarget.style.color = "#ff2244"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#222"; e.currentTarget.style.color = "#555"; }}
          >← Back</button>

          <div style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: 30,
            color: "#ff2244", letterSpacing: 6,
            textShadow: "0 0 40px rgba(255,34,68,0.4)",
          }}>deep</div>

          <a href="https://deep-waitlist-website.vercel.app" target="_blank" rel="noreferrer"
            style={{
              padding: "9px 22px", background: "#ff2244", color: "#fff",
              fontFamily: "'Space Mono', monospace", fontSize: 10,
              letterSpacing: 2, textDecoration: "none", textTransform: "uppercase",
              border: "1px solid #ff2244", transition: "all 0.3s ease",
              animation: "glow-pulse 3s infinite ease-in-out",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#ff2244"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#ff2244"; e.currentTarget.style.color = "#fff"; }}
          >Join Waitlist ↗</a>
        </nav>

        {/* ── Hero ── */}
        <section style={{
          minHeight: "100vh", display: "flex", alignItems: "center",
          justifyContent: "center", padding: "100px 5vw 80px",
          position: "relative", overflow: "hidden",
        }}>
          {/* Grid */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(255,34,68,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,34,68,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px", pointerEvents: "none",
          }} />

          {/* Radial glow center */}
          <div style={{
            position: "absolute", top: "40%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700, height: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,34,68,0.06) 0%, transparent 65%)",
            pointerEvents: "none",
          }} />

          {/* Spinning ring */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800, height: 800,
            border: "1px dashed rgba(255,34,68,0.06)",
            borderRadius: "50%",
            animation: "spin-slow 60s linear infinite",
            pointerEvents: "none",
          }} />

          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 64, maxWidth: 1200, width: "100%", position: "relative", zIndex: 1,
          }}>
            {/* Top copy */}
            <div style={{
              textAlign: "center", maxWidth: 720,
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(40px)",
              transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "rgba(255,34,68,0.08)", border: "1px solid rgba(255,34,68,0.2)",
                borderRadius: 100, padding: "6px 18px",
                fontFamily: "'Space Mono', monospace", fontSize: 10,
                color: "#ff2244", letterSpacing: 3, marginBottom: 32,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff2244", boxShadow: "0 0 8px #ff2244", animation: "glow-pulse 2s infinite" }} />
                APP PREVIEW — PROTOTYPE
              </div>

              <h1 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(52px, 9vw, 120px)",
                lineHeight: 0.9, letterSpacing: 3, color: "#fff", marginBottom: 28,
              }}>
                DATING<br />
                <span style={{ color: "#ff2244", textShadow: "0 0 80px rgba(255,34,68,0.5)" }}>REIMAGINED</span>
              </h1>

              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(15px, 1.8vw, 18px)",
                color: "#666", lineHeight: 1.8, maxWidth: 520, margin: "0 auto 40px",
              }}>
                <span style={{ color: "#ff2244", fontWeight: 500 }}>deep</span> eliminates everything
                broken about modern dating. No swiping, no ghosting, no pay-to-play.
                Just <span style={{ color: "#ccc" }}>one real match</span>, every single day.
              </p>

              <a href="https://deep-waitlist-website.vercel.app" target="_blank" rel="noreferrer"
                style={{
                  display: "inline-block", padding: "15px 44px",
                  background: "#ff2244", color: "#fff",
                  fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: 2,
                  textDecoration: "none", textTransform: "uppercase",
                  border: "1px solid #ff2244", transition: "all 0.3s ease",
                  animation: "glow-pulse 3s infinite ease-in-out",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#ff2244"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#ff2244"; e.currentTarget.style.color = "#fff"; }}
              >Join Waitlist ↗</a>
            </div>

            {/* ── 3-Phone Carousel ── */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: -20, position: "relative",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(60px)",
              transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.4s",
              animation: loaded ? "float 6s ease-in-out infinite 1.5s" : "none",
            }}>
              <PhoneMockup screen={screens[prev]} position="left" />
              <div style={{ zIndex: 3, marginLeft: -20, marginRight: -20 }}>
                <PhoneMockup screen={screens[activeScreen]} position="center" />
              </div>
              <PhoneMockup screen={screens[next]} position="right" />
            </div>

            {/* Dots */}
            <div style={{ display: "flex", gap: 10 }}>
              {screens.map((s, i) => (
                <button key={i} onClick={() => setActiveScreen(i)} style={{
                  width: activeScreen === i ? 36 : 8, height: 8,
                  borderRadius: 4,
                  background: activeScreen === i ? "#ff2244" : "#1e1e1e",
                  border: "none", cursor: "pointer",
                  transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                  boxShadow: activeScreen === i ? "0 0 14px rgba(255,34,68,0.6)" : "none",
                }} />
              ))}
            </div>

            {/* Screen labels */}
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
              {screens.map((s, i) => (
                <button key={i} onClick={() => setActiveScreen(i)} style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 10,
                  letterSpacing: 2, textTransform: "uppercase",
                  color: activeScreen === i ? "#ff2244" : "#333",
                  background: "none", border: "none", cursor: "pointer",
                  transition: "color 0.3s ease",
                  padding: "4px 0",
                  borderBottom: `1px solid ${activeScreen === i ? "#ff2244" : "transparent"}`,
                }}>{s.label}</button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Ticker ── */}
        <Ticker />

        {/* ── More Projects section ── */}
        <div style={{
          padding: "60px 5vw",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
          margin: "0 5vw",
          borderRadius: 2,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 40, flexWrap: "wrap",
        }}>
          <div style={{ flex: 1, minWidth: 300 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#ff2244", letterSpacing: 3, marginBottom: 8 }}>CASE STUDY</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: "#fff", letterSpacing: 2 }}>TODOER — PRODUCTIVITY</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#666", marginTop: 8, maxWidth: 400, lineHeight: 1.6 }}>
              A high-performance productivity engine for habit tracking and task management.
              Built with Flutter and a focus on minimalist UX.
            </div>
            <Link to="/todoer" style={{
              display: "inline-block",
              marginTop: 24, padding: "10px 24px", background: "transparent", border: "1px solid #333",
              color: "#fff", fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 2,
              cursor: "pointer", transition: "all 0.3s ease", textDecoration: "none"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#ff2244"; e.currentTarget.style.color = "#ff2244"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.color = "#fff"; }}
            >VIEW CASE STUDY →</Link>
          </div>
          <div style={{ display: "flex", gap: 10, overflow: "hidden" }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                width: 100, height: 180, borderRadius: 12,
                background: `linear-gradient(160deg, #111, #000)`,
                border: "1px solid #222",
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", overflow: "hidden"
              }}>
                <div style={{
                  position: "absolute", inset: 10, borderRadius: 8,
                  background: "rgba(255,51,85,0.05)", border: "1px solid rgba(255,51,85,0.1)"
                }} />
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: "#444", letterSpacing: 1, textAlign: "center", zIndex: 1 }}>SCREEN<br />0{i}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Features ── */}
        <section style={{ padding: "120px 5vw", background: "#050505" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 72, maxWidth: 1200, margin: "0 auto 72px" }}>
            <div style={{ fontFamily: "'Space Mono', monospace", color: "#ff2244", fontSize: 11, letterSpacing: 4 }}>01 /</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 4vw, 56px)", margin: 0, color: "#fff", letterSpacing: 2 }}>WHAT MAKES DEEP DIFFERENT</h2>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, #ff224430, transparent)" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 2, maxWidth: 1200, margin: "0 auto" }}>
            {features.map((f, i) => <FeatureCard key={f.title} feature={f} index={i} />)}
          </div>
        </section>

        {/* ── How it works ── */}
        <section style={{ padding: "120px 5vw" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 80, maxWidth: 1000, margin: "0 auto 80px" }}>
            <div style={{ fontFamily: "'Space Mono', monospace", color: "#ff2244", fontSize: 11, letterSpacing: 4 }}>02 /</div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 4vw, 56px)", margin: 0, color: "#fff", letterSpacing: 2 }}>HOW IT WORKS</h2>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, #ff224430, transparent)" }} />
          </div>
          <div style={{ maxWidth: 860, margin: "0 auto", position: "relative" }}>
            {steps.map((s, i) => <StepItem key={s.step} item={s} index={i} total={steps.length} />)}
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{
          padding: "120px 5vw 80px", background: "#050505",
          textAlign: "center", position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 600, height: 600, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,34,68,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto" }}>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(48px, 8vw, 96px)",
              color: "#fff", letterSpacing: 3, lineHeight: 1, marginBottom: 24,
            }}>
              READY FOR<br />
              <span style={{ color: "#ff2244", textShadow: "0 0 80px rgba(255,34,68,0.5)" }}>SOMETHING REAL?</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#555", lineHeight: 1.8, marginBottom: 48 }}>
              Join the waitlist. Be first to experience dating that actually works.
            </p>
            <a href="https://deep-waitlist-website.vercel.app" target="_blank" rel="noreferrer"
              style={{
                display: "inline-block", padding: "16px 52px",
                background: "#ff2244", color: "#fff",
                fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: 2,
                textDecoration: "none", textTransform: "uppercase",
                border: "1px solid #ff2244", transition: "all 0.3s ease",
                animation: "glow-pulse 3s infinite ease-in-out",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#ff2244"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#ff2244"; e.currentTarget.style.color = "#fff"; }}
            >Join Waitlist ↗</a>
          </div>

          <div style={{
            borderTop: "1px solid #111", marginTop: 80, paddingTop: 32,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: 16,
          }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#2a2a2a", letterSpacing: 2 }}>© 2025 DEEP — BY THARUNKUMAR B</div>
            <button onClick={() => window.history.back()} style={{
              fontFamily: "'Space Mono', monospace", fontSize: 10,
              color: "#333", letterSpacing: 1, background: "none", border: "none",
              cursor: "pointer", transition: "color 0.3s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#ff2244"}
              onMouseLeave={e => e.currentTarget.style.color = "#333"}
            >← BACK TO PORTFOLIO</button>
          </div>
        </section>
      </div>
    </>
  );
}