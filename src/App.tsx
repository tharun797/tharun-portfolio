import { useState, useEffect, useRef } from "react";

const skills = [
  { name: "Flutter", level: 95 },
  { name: "Dart", level: 90 },
  { name: "Firebase", level: 88 },
  { name: "Riverpod", level: 85 },
  { name: "REST APIs", level: 87 },
  { name: "Java", level: 72 },
  { name: "JavaScript", level: 70 },
  { name: "Python", level: 65 },
];

const experiences = [
  {
    company: "ABShrms",
    role: "Executive Flutter Developer",
    period: "June 2025 – January 2026",
    location: "Chennai, India",
    bullets: [
      "Developed cross-platform HRMS mobile app for Android & iOS",
      "Improved app performance by 10% migrating GetX → Riverpod",
      "Owned Attendance & Leave management modules end-to-end",
      "Delivered Loan & Salary Advance modules via REST APIs",
      "Reduced production issues by 25% through rigorous UAT",
    ],
  },
  {
    company: "Digichorus Technologies",
    role: "Software Engineer",
    period: "June 2022 – May 2023",
    location: "Pune, India",
    bullets: [
      "Maintained notification platform (Flutter, Firebase) for 200+ users",
      "Built Java-based NFI module for Qatar National Bank",
      "Implemented Firebase Cloud Messaging & in-app state logic",
      "Collaborated across teams for native integrations",
    ],
  },
];

const projects = [
  {
    name: "deep",
    subtitle: "AI Dating — 1 Real Match. Every Day.",
    period: "June 2024 – Present",
    desc: "Dating apps are rigged — algorithmic blacklisting, ghosting, swipe addiction. deep fixes that with 1 AI-curated match per day, no swiping, no games. Built real-time chat, personality-based matching, and a Firebase backend designed to scale.",
    tags: ["Flutter", "Firebase", "Firestore", "FCM", "AI Matching", "Real-time Chat"],
    color: "#ff2244",
    featured: true,
    link: "https://deep-waitlist-website.vercel.app",
    linkLabel: "Join Waitlist ↗",
    highlights: ["1 AI match/day", "No swiping ever", "Expires in 24hrs", "Zero ghosting", "Live waitlist"],
  },
  {
    name: "Sozo",
    subtitle: "Surplus Food Marketplace",
    period: "Dec 2024 – Apr 2025",
    desc: "Too Good To Go inspired MVP food rescue marketplace for India. Built both consumer and admin Flutter apps to connect restaurants with buyers before surplus food is wasted.",
    tags: ["Flutter", "Firebase", "Admin App", "Marketplace"],
    color: "#ff5500",
    featured: false,
    link: null,
    linkLabel: null,
    highlights: ["Consumer + Admin apps", "Indian market MVP", "Food rescue platform"],
  },
  {
    name: "Zap",
    subtitle: "Quick Commerce App",
    period: "June 2024 – June 2025",
    desc: "Client project — a full quick commerce app with location-based inventory, real-time availability, and a streamlined checkout flow optimised for speed.",
    tags: ["Flutter", "Location API", "REST APIs", "Riverpod"],
    color: "#cc0022",
    featured: false,
    link: null,
    linkLabel: null,
    highlights: ["Client project", "Location-based inventory", "Fast checkout UX"],
  },
  {
    name: "Todoer",
    subtitle: "Productivity & Habit Tracker",
    period: "July 2023 – Aug 2024",
    desc: "Productivity app for task management and habit tracking with smart reminders, streaks, and analytics to keep users consistently on track.",
    tags: ["Flutter", "Local DB", "Analytics", "Notifications"],
    color: "#ff3355",
    featured: false,
    link: null,
    linkLabel: null,
    highlights: ["Habit streaks", "Smart reminders", "Analytics dashboard"],
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(48px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: "#e0e0e0", letterSpacing: 1 }}>{name}</span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#ff2244" }}>{level}%</span>
      </div>
      <div style={{ height: 4, background: "#1a1a1a", borderRadius: 2, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: visible ? `${level}%` : "0%",
            background: "linear-gradient(90deg, #ff2244, #ff6080)",
            borderRadius: 2,
            transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
            boxShadow: "0 0 12px #ff224480",
          }}
        />
      </div>
    </div>
  );
}

function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        left: pos.x - 200,
        top: pos.y - 200,
        width: 400,
        height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,34,68,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
        transition: "left 0.1s ease, top 0.1s ease",
      }}
    />
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = ["About", "Experience", "Projects", "Skills", "Contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 5vw",
      height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(6,6,6,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,34,68,0.15)" : "none",
      transition: "all 0.4s ease",
    }}>
      <div style={{ fontFamily: "'Space Mono', monospace", color: "#ff2244", fontSize: 18, fontWeight: 700, letterSpacing: 2 }}>
        TK<span style={{ color: "#fff" }}>.</span>
      </div>
      <div style={{ display: "flex", gap: 32 }}>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#888",
            textDecoration: "none", letterSpacing: 2, textTransform: "uppercase",
            transition: "color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = "#ff2244")}
            onMouseLeave={e => (e.currentTarget.style.color = "#888")}
          >{l}</a>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section id="about" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      padding: "0 5vw", position: "relative", overflow: "hidden",
    }}>
      {/* Red diagonal slash */}
      <div style={{
        position: "absolute", right: "-10vw", top: "10%",
        width: "55vw", height: "80vh",
        background: "linear-gradient(135deg, rgba(255,34,68,0.06) 0%, rgba(255,34,68,0.02) 50%, transparent 100%)",
        transform: "rotate(-8deg)",
        borderLeft: "1px solid rgba(255,34,68,0.15)",
        pointerEvents: "none",
      }} />
      {/* Grid lines */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,34,68,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,34,68,0.03) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 900, position: "relative", zIndex: 1 }}>
        <div style={{
          fontFamily: "'Space Mono', monospace", color: "#ff2244", fontSize: 13,
          letterSpacing: 4, textTransform: "uppercase", marginBottom: 24,
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)",
          transition: "all 0.6s ease 0.1s",
        }}>
          ◆ Flutter Developer
        </div>
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(56px, 10vw, 140px)",
          lineHeight: 0.9, margin: 0, letterSpacing: 2,
          color: "#fff",
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(40px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
        }}>
          THARUN<br />
          <span style={{ color: "#ff2244", WebkitTextStroke: "0px", textShadow: "0 0 60px rgba(255,34,68,0.4)" }}>KUMAR</span>
          <span style={{ color: "#222", WebkitTextStroke: "1px #333" }}> B</span>
        </h1>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(15px, 2vw, 19px)",
          color: "#888", maxWidth: 560, lineHeight: 1.7, marginTop: 32,
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(30px)",
          transition: "all 0.8s ease 0.5s",
        }}>
          Building beautiful, performant mobile experiences with Flutter.
          From HRMS platforms to AI-powered apps — I craft code that works
          and interfaces that feel <em style={{ color: "#ff2244", fontStyle: "normal" }}>alive</em>.
        </p>
        <div style={{
          display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap",
          opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)",
          transition: "all 0.8s ease 0.7s",
        }}>
          <a href="#contact" style={{
            padding: "14px 36px", background: "#ff2244", color: "#fff",
            fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: 2,
            textDecoration: "none", textTransform: "uppercase",
            border: "1px solid #ff2244",
            transition: "all 0.3s ease",
            boxShadow: "0 0 30px rgba(255,34,68,0.3)",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#ff2244"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#ff2244"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
          >
            Get In Touch
          </a>
          <a href="https://github.com/tharun797" target="_blank" rel="noreferrer" style={{
            padding: "14px 36px", background: "transparent", color: "#888",
            fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: 2,
            textDecoration: "none", textTransform: "uppercase",
            border: "1px solid #333",
            transition: "all 0.3s ease",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#ff2244"; (e.currentTarget as HTMLElement).style.color = "#ff2244"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#333"; (e.currentTarget as HTMLElement).style.color = "#888"; }}
          >
            GitHub ↗
          </a>
        </div>

        {/* Stat pills */}
        <div style={{
          display: "flex", gap: 40, marginTop: 64, flexWrap: "wrap",
          opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 0.9s",
        }}>
          {[["3+", "Years Exp."], ["10+", "Apps Built"], ["200+", "Users Served"], ["25%", "Bugs Squashed"]].map(([num, label]) => (
            <div key={label}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: "#ff2244", lineHeight: 1 }}>{num}</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#555", letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.2s",
        animation: "bounce 2s infinite 1.5s",
      }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#444", letterSpacing: 3 }}>SCROLL</div>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #ff2244, transparent)" }} />
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" style={{ padding: "120px 5vw", position: "relative" }}>
      <AnimatedSection>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 80 }}>
          <div style={{ fontFamily: "'Space Mono', monospace", color: "#ff2244", fontSize: 11, letterSpacing: 4, textTransform: "uppercase" }}>02 /</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 5vw, 64px)", margin: 0, color: "#fff", letterSpacing: 2 }}>EXPERIENCE</h2>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, #ff224430, transparent)" }} />
        </div>
      </AnimatedSection>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {experiences.map((exp, i) => (
          <AnimatedSection key={exp.company} delay={i * 120}>
            <div style={{
              padding: "48px 0",
              borderTop: "1px solid #1a1a1a",
              display: "grid", gridTemplateColumns: "1fr 2fr", gap: "5vw",
              transition: "background 0.3s ease",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,34,68,0.02)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "#ff2244", letterSpacing: 2, marginBottom: 8 }}>{exp.company}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#ccc", marginBottom: 6 }}>{exp.role}</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#555", letterSpacing: 1 }}>{exp.period}</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#555", marginTop: 4 }}>📍 {exp.location}</div>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {exp.bullets.map((b, bi) => (
                  <li key={bi} style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#777",
                    lineHeight: 1.7, paddingLeft: 20, position: "relative", marginBottom: 8,
                  }}>
                    <span style={{ position: "absolute", left: 0, color: "#ff2244", fontWeight: 700 }}>›</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);
  const featured = projects.find(p => p.featured);
  const rest = projects.filter(p => !p.featured);

  return (
    <section id="projects" style={{ padding: "120px 5vw", background: "#050505" }}>
      <AnimatedSection>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 80 }}>
          <div style={{ fontFamily: "'Space Mono', monospace", color: "#ff2244", fontSize: 11, letterSpacing: 4, textTransform: "uppercase" }}>03 /</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 5vw, 64px)", margin: 0, color: "#fff", letterSpacing: 2 }}>PROJECTS</h2>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, #ff224430, transparent)" }} />
        </div>
      </AnimatedSection>

      {featured && (
        <AnimatedSection delay={0}>
          <div style={{
            marginBottom: 4,
            padding: "56px 52px",
            background: "linear-gradient(135deg, rgba(255,34,68,0.07) 0%, rgba(255,34,68,0.02) 50%, #0a0a0a 100%)",
            border: "1px solid rgba(255,34,68,0.25)",
            position: "relative", overflow: "hidden",
            boxShadow: "0 0 80px rgba(255,34,68,0.07)",
            // position: "relative", zIndex: 0, isolation: "isolate",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(to right, #ff2244, #ff6080, transparent)" }} />
            <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,34,68,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 24 }}>
              <div style={{ flex: 1, minWidth: 280 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#ff2244", border: "1px solid #ff2244", padding: "4px 10px", letterSpacing: 2, textTransform: "uppercase" }}>Featured</span>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#555", letterSpacing: 2 }}>{featured.period}</span>
                </div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(52px, 7vw, 88px)", color: "#fff", letterSpacing: 3, lineHeight: 1, marginBottom: 8 }}>{featured.name}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#ff2244", marginBottom: 24, letterSpacing: 0.5 }}>{featured.subtitle}</div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#777", lineHeight: 1.8, maxWidth: 560, marginBottom: 28 }}>{featured.desc}</p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
                  {featured.highlights?.map(h => (
                    <span key={h} style={{
                      fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#fff",
                      background: "rgba(255,34,68,0.15)", border: "1px solid rgba(255,34,68,0.3)",
                      padding: "6px 14px", letterSpacing: 0.5,
                    }}>● {h}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
                  {featured.tags.map(tag => (
                    <span key={tag} style={{
                      fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#555",
                      border: "1px solid #1e1e1e", padding: "4px 10px", letterSpacing: 1, textTransform: "uppercase",
                    }}>{tag}</span>
                  ))}
                </div>
                {featured.link && (
                  <a href={featured.link} target="_blank" rel="noreferrer" style={{
                    display: "inline-block", padding: "14px 36px",
                    background: "#ff2244", color: "#fff",
                    fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: 2,
                    textDecoration: "none", textTransform: "uppercase",
                    boxShadow: "0 0 30px rgba(255,34,68,0.35)",
                    transition: "all 0.3s ease", border: "1px solid #ff2244",
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#ff2244"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#ff2244"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                  >
                    {featured.linkLabel}
                  </a>
                )}
              </div>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(80px, 12vw, 160px)",
                color: "transparent",
                WebkitTextStroke: "1px rgba(255,34,68,0.15)",
                lineHeight: 1, letterSpacing: 4,
                userSelect: "none", pointerEvents: "none",
                alignSelf: "center",
              }}>deep</div>
            </div>
          </div>
        </AnimatedSection>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 10, marginTop: 10 }}>
        {rest.map((p, i) => (
          <AnimatedSection key={p.name} delay={i * 80}>
            <div
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: "40px 36px",
                background: hovered === i ? "rgba(255,34,68,0.04)" : "#0a0a0a",
                border: `1px solid ${hovered === i ? "rgba(255,34,68,0.25)" : "#141414"}`,
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                transform: hovered === i ? "translateY(-8px)" : "translateY(0px)",
                boxShadow: hovered === i ? "0 24px 60px rgba(255,34,68,0.08)" : "none",
                position: "relative", overflow: "hidden", height: "100%",
                zIndex: hovered === i ? 2 : 1,
                isolation: "isolate",
              }}
            >
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(to right, ${p.color}, transparent)`,
                opacity: hovered === i ? 1 : 0, transition: "opacity 0.3s ease",
              }} />
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#555", letterSpacing: 3, marginBottom: 16, textTransform: "uppercase" }}>{p.period}</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 42, color: "#fff", letterSpacing: 2, lineHeight: 1, marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#ff2244", marginBottom: 20, letterSpacing: 0.5 }}>{p.subtitle}</div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#666", lineHeight: 1.7, margin: "0 0 20px 0" }}>{p.desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 24 }}>
                {p.highlights?.map(h => (
                  <div key={h} style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#444", letterSpacing: 0.5 }}>› {h}</div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {p.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: "'Space Mono', monospace", fontSize: 10, color: "#ff2244",
                    border: "1px solid rgba(255,34,68,0.2)", padding: "4px 10px",
                    letterSpacing: 1, textTransform: "uppercase",
                  }}>{tag}</span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" style={{ padding: "120px 5vw" }}>
      <AnimatedSection>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 80 }}>
          <div style={{ fontFamily: "'Space Mono', monospace", color: "#ff2244", fontSize: 11, letterSpacing: 4, textTransform: "uppercase" }}>04 /</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px, 5vw, 64px)", margin: 0, color: "#fff", letterSpacing: 2 }}>SKILLS</h2>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, #ff224430, transparent)" }} />
        </div>
      </AnimatedSection>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5vw 8vw" }}>
        <div>
          <AnimatedSection>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#555", letterSpacing: 3, textTransform: "uppercase", marginBottom: 32 }}>Technical Proficiency</div>
          </AnimatedSection>
          {skills.map((s, i) => <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 80} />)}
        </div>
        <div>
          <AnimatedSection delay={200}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#555", letterSpacing: 3, textTransform: "uppercase", marginBottom: 32 }}>Stack & Tools</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[
                "Flutter", "Dart", "Riverpod", "Provider", "GetX",
                "Firebase Auth", "Firestore", "Cloud Functions", "FCM",
                "REST APIs", "Git", "Android Studio", "VS Code", "Xcode",
                "MVVM", "Clean Architecture", "MVC", "Method Channels",
                "Play Store", "Google Cloud", "Responsive Design",
              ].map(tech => (
                <span key={tech} style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#666",
                  border: "1px solid #1e1e1e", padding: "8px 14px", letterSpacing: 0.5,
                  transition: "all 0.2s ease",
                  cursor: "default",
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#ff2244";
                    (e.currentTarget as HTMLElement).style.color = "#ff2244";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,34,68,0.05)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#1e1e1e";
                    (e.currentTarget as HTMLElement).style.color = "#666";
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >{tech}</span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ padding: "120px 5vw 80px", background: "#050505", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: "60vw", height: "60vw", maxWidth: 600,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,34,68,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <AnimatedSection>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: "'Space Mono', monospace", color: "#ff2244", fontSize: 11, letterSpacing: 4, textTransform: "uppercase", marginBottom: 24 }}>05 / Let's Connect</div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(48px, 8vw, 100px)", color: "#fff", margin: "0 0 24px 0", letterSpacing: 2, lineHeight: 1 }}>
            LET'S BUILD<br /><span style={{ color: "#ff2244", textShadow: "0 0 60px rgba(255,34,68,0.4)" }}>SOMETHING</span>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#666", lineHeight: 1.8, marginBottom: 48 }}>
            Looking for a Flutter developer who ships clean, beautiful apps?<br />I'm open to opportunities — let's talk.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: "tharunln22@gmail.com", href: "mailto:tharunln22@gmail.com" },
              { label: "LinkedIn ↗", href: "https://linkedin.com/in/tharun-kumar-679686276" },
              { label: "GitHub ↗", href: "https://github.com/tharun797" },
            ].map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer" style={{
                fontFamily: "'Space Mono', monospace", fontSize: 12, color: "#888",
                border: "1px solid #222", padding: "14px 28px", textDecoration: "none",
                letterSpacing: 1, textTransform: "uppercase",
                transition: "all 0.3s ease",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#ff2244"; (e.currentTarget as HTMLElement).style.color = "#ff2244"; (e.currentTarget as HTMLElement).style.background = "rgba(255,34,68,0.05)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#222"; (e.currentTarget as HTMLElement).style.color = "#888"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >{link.label}</a>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <div style={{ borderTop: "1px solid #111", marginTop: 80, paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#333", letterSpacing: 2 }}>© 2025 THARUNKUMAR B</div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#333", letterSpacing: 1 }}>FLUTTER DEVELOPER · CHENNAI, INDIA</div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #060606; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #060606; }
        ::-webkit-scrollbar-thumb { background: #ff2244; }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        ::selection { background: rgba(255,34,68,0.3); color: #fff; }
      `}</style>
      <div style={{ background: "#060606", color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>
        <CursorGlow />
        <Navbar />
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </>
  );
}