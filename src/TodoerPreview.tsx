import { useState, useEffect, useRef } from "react";

// Real Product Screenshots
import homepageImg from "./assets/todo/homepage.PNG";
import newTaskImg from "./assets/todo/add new task.PNG";
import remindersImg from "./assets/todo/reminders.PNG";
import detailedViewImg from "./assets/todo/detailed_view.PNG";
import menuImg from "./assets/todo/menu.PNG";
import upcomingImg from "./assets/todo/upcoming.PNG";

/* ─── Data ─── */
const bentoSlides = [
  { img: homepageImg, title: "Home", desc: "Your daily focus, simplified. Glanceable tasks and clean typography." },
  { img: newTaskImg, title: "Add New Task", desc: "Capture ideas at the speed of thought with an intuitive creation flow." },
  { img: remindersImg, title: "Reminders", desc: "Never forget a critical task again with smart, context-aware notifications." },
  { img: detailedViewImg, title: "Detailed Task View", desc: "Detailed task views for complex projects and step-by-step checklists." },
  { img: menuImg, title: "Menu", desc: "Intuitive navigation and personalization options at your fingertips." },
  { img: upcomingImg, title: "Upcoming", desc: "Plan your future with confidence using the chronological agenda view." },
];




const features = [
  { icon: "🔥", title: "Habit Streaks", desc: "Build lasting consistency with gamified streaks inspired by Snapchat. Turn daily actions into a winning streak and never break the chain." },
  { icon: "⏰", title: "Smart Reminders", desc: "Context-aware notifications that ensure you're always on track, providing the perfect nudge at the exact moment you need it." },
  { icon: "📅", title: "Future Planning", desc: "Stay ahead of the curve by creating tasks for upcoming days. Plan your week with a clean, chronological view of what's next." },
  { icon: "⚡", title: "Firebase Backend", desc: "Powered by Firebase for lightning-fast synchronization, real-time updates, and robust cloud storage you can depend on." },
  { icon: "🧪", title: "List Lab", desc: "Complete creative freedom to build custom lists for anything from projects to groceries, fully independent of your habits." },
  { icon: "🔒", title: "Privacy First", desc: "Secure authentication and industry-standard encryption ensure your data stays private and synced across all your devices." },
];

const ticker = [
  "FOCUS ON WHAT MATTERS", "BUILD BETTER HABITS", "STREAKS THAT MOTIVATE", "PRODUCTIVITY REIMAGINED",
  "MINIMALIST DESIGN", "SMART NOTIFICATIONS", "INSIGHTFUL ANALYTICS", "DEEP WORK ENABLED",
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


/* ─── Ticker ─── */
function Ticker() {
  return (
    <div style={{
      overflow: "hidden", padding: "24px 0",
      borderTop: "1px solid #111", borderBottom: "1px solid #111",
      background: "#040404",
      position: "relative",
    }}>
      <div style={{
        display: "flex", gap: 0,
        animation: "ticker 25s linear infinite",
        width: "max-content",
      }}>
        {[...ticker, ...ticker].map((t, i) => (
          <span key={i} style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 16, letterSpacing: 4, color: "#222",
            padding: "0 40px", whiteSpace: "nowrap",
            display: "flex", alignItems: "center", gap: 40,
          }}>
            <span style={{ color: "#ff3355", fontSize: 10 }}>●</span>
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
        padding: "48px 40px",
        background: hovered ? "rgba(255,51,85,0.04)" : "#0a0a0a",
        border: `1px solid ${hovered ? "rgba(255,51,85,0.2)" : "#141414"}`,
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        transform: visible
          ? hovered ? "translateY(-8px)" : "translateY(0)"
          : "translateY(32px)",
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${index * 80}ms` : "0ms",
        cursor: "default",
        position: "relative",
      }}>
      <div style={{
        fontSize: 32, marginBottom: 24,
        transition: "transform 0.3s ease",
        transform: hovered ? "scale(1.2) rotate(10deg)" : "scale(1)",
      }}>{feature.icon}</div>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif", fontSize: 24,
        color: "#fff", letterSpacing: 2, marginBottom: 12,
      }}>{feature.title}</div>
      <div style={{
        fontFamily: "'Inter', sans-serif", fontSize: 14,
        color: "#666", lineHeight: 1.7,
      }}>{feature.desc}</div>
    </div>
  );
}

/* ─── Bento Showcase ─── */
function BentoShowcase({ loaded }: { loaded: boolean }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section style={{ padding: "160px 5vw 120px", background: "#060606", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        
        {/* Headline */}
        <div style={{
          textAlign: "center", maxWidth: 800, margin: "0 auto 100px",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(40px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <div style={{
            display: "inline-block", background: "#ff33551a", border: "1px solid #ff335533",
            borderRadius: 100, padding: "8px 20px",
            fontFamily: "'Space Mono', monospace", fontSize: 11,
            color: "#ff3355", letterSpacing: 2, marginBottom: 40,
          }}>
            INTERNAL TOOL — CASE STUDY
          </div>

          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(60px, 12vw, 160px)",
            lineHeight: 0.85, letterSpacing: 2, color: "#fff", marginBottom: 32,
          }}>
            MASTER YOUR<br />
            <span style={{ color: "#ff3355" }}>WORKFLOW</span>
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "#777", lineHeight: 1.6, maxWidth: 600, margin: "0 auto",
          }}>
            A minimalist, high-performance productivity engine for
            habit tracking and task management. Designed for speed,
            built for consistency.
          </p>
        </div>

        <div style={{
          display: "flex",
          height: "650px",
          gap: 12,
          width: "100%",
        }}>
          {bentoSlides.map((slide, i) => {
            const isHovered = hoveredIndex === i;
            const isAnyHovered = hoveredIndex !== null;

            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  position: "relative",
                  flex: isHovered ? 4 : (isAnyHovered ? 1 : 1.5),
                  height: "100%",
                  borderRadius: 24,
                  overflow: "hidden",
                  transition: "flex 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s ease",
                  cursor: "pointer",
                  border: isHovered ? "1px solid rgba(255, 51, 85, 0.4)" : "1px solid #1a1a1a",
                  transform: "scale(1)",
                  zIndex: isHovered ? 10 : 1,
                  boxShadow: isHovered ? "0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(255,51,85,0.1)" : "none",
                }}
              >
                <div style={{ width: "100%", height: "100%", position: "relative" }}>
                  <img
                    src={slide.img}
                    alt={slide.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: [0, 1, 2, 4, 5].includes(i) ? "top" : "center",
                      transform: "scale(1)",
                      filter: isHovered ? "none" : "grayscale(0.6) contrast(1.1) brightness(0.6)",
                      transition: "all 0.6s ease",
                    }}
                  />



                  {/* Side Title (Visible when not hovered) */}
                  <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%) rotate(-90deg)",
                    whiteSpace: "nowrap",
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 20,
                    letterSpacing: 6,
                    color: "#fff",
                    opacity: isHovered ? 0 : 1,
                    transition: "opacity 0.3s ease",
                    pointerEvents: "none",
                    textTransform: "uppercase",
                  }}>
                    {slide.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Main ─── */

export default function TodoerPreview() {
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;600;700&family=Space+Mono&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #060606; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #ff3355; }

        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; filter: blur(2px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
      `}</style>

      {/* Background ambient glow */}
      <div style={{
        position: "fixed", pointerEvents: "none", zIndex: 0,
        left: mousePos.x - 300, top: mousePos.y - 300,
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,51,85,0.06) 0%, transparent 70%)",
        transition: "left 0.2s ease, top 0.2s ease",
      }} />

      <div style={{ background: "#060606", color: "#fff", minHeight: "100vh", position: "relative" }}>

        {/* ── Nav ── */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "0 5vw", height: 72,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(6,6,6,0.8)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}>
          <button onClick={() => window.history.back()} style={{
            background: "none", border: "1px solid #222", color: "#666",
            fontFamily: "'Space Mono', monospace", fontSize: 11,
            letterSpacing: 2, textTransform: "uppercase",
            padding: "10px 22px", cursor: "pointer", transition: "all 0.3s ease",
            borderRadius: 4
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#ff3355"; e.currentTarget.style.color = "#ff3355"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#222"; e.currentTarget.style.color = "#666"; }}
          >← Back</button>

          <div style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: 32,
            color: "#fff", letterSpacing: 4,
          }}>TODOER<span style={{ color: "#ff3355" }}>.</span></div>

          <div style={{ width: 100 }} />
        </nav>

        <BentoShowcase loaded={loaded} />

        <Ticker />


        {/* ── Features ── */}

        <section style={{ padding: "140px 5vw", background: "#050505" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 80 }}>
              <div style={{ fontFamily: "'Space Mono', monospace", color: "#ff3355", fontSize: 12 }}>01 /</div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 6vw, 72px)", color: "#fff", letterSpacing: 2 }}>CORE ENGINE</h2>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, #ff335540, transparent)" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 2 }}>
              {features.map((f, i) => <FeatureCard key={f.title} feature={f} index={i} />)}
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <section style={{ padding: "100px 5vw 60px", textAlign: "center", borderTop: "1px solid #111" }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, color: "#222", letterSpacing: 10, marginBottom: 40 }}>TODOER.PRODUCTIVITY</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#333", letterSpacing: 2 }}>© 2025 THARUNKUMAR B</div>
            <button onClick={() => window.history.back()} style={{
              background: "none", border: "none", color: "#666", fontFamily: "'Space Mono', monospace", fontSize: 11, cursor: "pointer"
            }}>BACK TO PORTFOLIO</button>
          </div>
        </section>
      </div>
    </>
  );
}
