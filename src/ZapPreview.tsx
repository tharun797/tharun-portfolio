import { useState, useEffect, useRef } from "react";
import loginImg from "./assets/zap/login_screen.png";
import homeImg from "./assets/zap/home.png";
import productViewExtendedImg from "./assets/zap/detailed_product_view_extended.png";
import categoriesImg from "./assets/zap/categories.png";
import cartImg from "./assets/zap/cart.png";
import basketImg from "./assets/zap/basket.png";
import chefsChoiceImg from "./assets/zap/chefs_choice.png";
import profileImg from "./assets/zap/account.png";
import addressImg from "./assets/zap/address.png";
import addAddressImg from "./assets/zap/add_address.png";
import cartExtendedImg from "./assets/zap/cart_view_extended.png";
import chefsChoiceExtendedImg from "./assets/zap/chefs_choice_extended_product_view.png";
import chefsChoiceProductImg from "./assets/zap/chefs_choice_product_view.png";
import createBasketImg from "./assets/zap/create_basket.png";
import createBasketExtendedImg from "./assets/zap/create_basket_extended.png";
import detailedProductViewImg from "./assets/zap/detailed_product_view.png";
import filterSearchImg from "./assets/zap/filter_search.png";
import recommendedImg from "./assets/zap/recommended.png";
import searchScreenImg from "./assets/zap/search_screen.png";
import supportImg from "./assets/zap/support.png";

/* ─── Data ─── */
const features = [
  {
    icon: "🔐",
    title: "Authentication",
    desc: "Frictionless, secure sign-in built for speed. Zap's auth system handles OTP, and session management so users go from open to ordering in seconds — no friction, no drop-off."
  },
  {
    icon: "🔍",
    title: "Search Engine",
    desc: "Intelligent product discovery powered by real-time indexing. Filter by category, price, availability, or distance. The more you search, the smarter Zap gets — tailored results for every user."
  },
  {
    icon: "🧺",
    title: "Basket",
    desc: "Your personal auto-replenishment system. Group the products you buy regularly into a Basket, set a schedule, and let Zap handle the rest. Zero effort, zero forgetting — groceries that order themselves."
  },
  {
    icon: "👨‍🍳",
    title: "Chef's Choice",
    desc: "Cook anything without the shopping hassle. Browse recipes curated by local chefs, tap a dish, and Zap automatically adds every required ingredient to your cart — fresh, sourced locally, delivered in minutes."
  },
  {
    icon: "💬",
    title: "Customer Support",
    desc: "Real-time, in-app support that resolves issues before they escalate. From order tracking to refunds, Zap's support layer keeps customers confident every step of the delivery journey."
  },
];

const ticker = [
  "ULTRA FAST DELIVERY", "REAL-TIME INVENTORY", "LOCALLY SOURCED", "SMART ROUTING",
  "HYPER-LOCAL COMMERCE", "ZERO FRICTION CHECKOUT", "10 MINUTE GUARANTEE",
];

/*
  Card dimensions — phone screenshots are roughly 9:19.5 ratio.
  Use objectFit: "cover" + objectPosition: "top" so image fills card edge-to-edge
  with no dark padding. Width × (19.5/9) = height.
  
  CARD_W = 200 → CARD_H = 200 * (19.5/9) ≈ 433  — too tall for cascade
  CARD_W = 180 → CARD_H = 390 — good balance
*/
const CARD_W = 190;
const CARD_H = Math.round(CARD_W * (19.5 / 9)); // ≈ 412
const COL_GAP = 14;
const ROW_GAP = 14;
const COL_OFFSET = 80;

// Columns — diagonal cascade left-to-right, each col starts lower
const columns: { img: string; alt: string }[][] = [
  [
    { img: profileImg, alt: "Profile" },
    { img: addressImg, alt: "Address" },
  ],
  [
    { img: recommendedImg, alt: "Recommended" },
    { img: categoriesImg, alt: "Categories" },
    { img: createBasketImg, alt: "Create Basket" },
  ],
  [
    { img: loginImg, alt: "Login" },
    { img: searchScreenImg, alt: "Search Screen" },
    { img: filterSearchImg, alt: "Filter Search" },
    { img: supportImg, alt: "Support" },
  ],
  [
    { img: homeImg, alt: "Home" },
    { img: chefsChoiceImg, alt: "Chef's Choice" },
    { img: detailedProductViewImg, alt: "Product View" },
    { img: addAddressImg, alt: "Add Address" },
  ],
  [
    { img: chefsChoiceProductImg, alt: "Chef's Choice Product" },
    { img: chefsChoiceExtendedImg, alt: "Chef's Choice Extended" },
    { img: cartImg, alt: "Cart" },
  ],
  [
    { img: basketImg, alt: "Basket" },
    { img: createBasketExtendedImg, alt: "Create Basket Extended" },
    { img: cartExtendedImg, alt: "Cart Extended" },
    { img: productViewExtendedImg, alt: "Product View Extended" },
  ],
];

// Col 2 is the peak (offset 0), each step away adds COL_OFFSET
const colOffsets = [
  COL_OFFSET * 2,
  COL_OFFSET * 1,
  0,
  COL_OFFSET * 1,
  COL_OFFSET * 2,
  COL_OFFSET * 3,
];

function useInView(threshold = 0.05) {
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

function PhoneCard({ img, alt, delay = 0 }: { img: string; alt: string; delay?: number }) {
  const [hovered, setHovered] = useState(false);
  const { ref, visible } = useInView();

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: CARD_W,
        height: CARD_H,
        borderRadius: 22,
        overflow: "hidden",
        // No background — image will fill edge-to-edge
        border: hovered
          ? "1.5px solid rgba(204,0,34,0.6)"
          : "1.5px solid rgba(255,255,255,0.08)",
        boxShadow: hovered
          ? "0 24px 60px rgba(0,0,0,0.8), 0 0 40px rgba(204,0,34,0.14)"
          : "0 8px 28px rgba(0,0,0,0.55)",
        transform: visible
          ? hovered ? "translateY(-4px)" : "translateY(0)"
          : "scale(0.9) translateY(16px)",
        opacity: visible ? 1 : 0,
        transition: [
          `opacity 0.55s ease ${delay}ms`,
          `transform 0.55s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
          "box-shadow 0.35s ease",
          "border-color 0.35s ease",
        ].join(", "),
        cursor: "default",
        position: "relative",
        flexShrink: 0,
      }}
    >
      <img
        src={img}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          // cover fills the card fully — top-aligned so status bar + header always shows
          objectFit: "cover",
          objectPosition: "top center",
          display: "block",
        }}
      />
    </div>
  );
}

function BentoShowcase({ loaded }: { loaded: boolean }) {
  const maxColHeight = Math.max(
    ...columns.map((col, i) =>
      colOffsets[i] + col.length * (CARD_H + ROW_GAP) - ROW_GAP
    )
  );
  const totalWidth = columns.length * (CARD_W + COL_GAP) - COL_GAP;

  return (
    <section style={{ padding: "160px 5vw 140px", background: "#060606" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>

        {/* Headline */}
        <div style={{
          textAlign: "center",
          maxWidth: 800,
          margin: "0 auto 120px",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(40px)",
          transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "rgba(204,0,34,0.08)", border: "1px solid rgba(204,0,34,0.2)",
            borderRadius: 100, padding: "6px 18px",
            fontFamily: "'Space Mono', monospace", fontSize: 10,
            color: "#cc0022", letterSpacing: 3, marginBottom: 32,
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%",
              background: "#cc0022",
              animation: "glow-pulse 2s infinite",
            }} />
            CLIENT PROJECT
          </div>

          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(52px, 9vw, 120px)",
            lineHeight: 0.9, letterSpacing: 3,
            color: "#fff", marginBottom: 28,
          }}>
            QUICK<br />
            <span style={{ color: "#cc0022", textShadow: "0 0 80px rgba(204,0,34,0.5)" }}>
              COMMERCE
            </span>
          </h1>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(15px, 1.8vw, 18px)",
            color: "#666", lineHeight: 1.8,
            maxWidth: 520, margin: "0 auto",
          }}>
            <span style={{ color: "#cc0022", fontWeight: 500 }}>Zap</span> is a high-performance
            quick commerce platform designed for sub-10 minute deliveries.
            Built with Flutter and a custom location-based inventory system.
          </p>
        </div>

        {/* ── Diagonal Cascade ── */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s ease 0.4s",
          display: "flex",
          justifyContent: "center",
          // Allow horizontal scroll on very small screens
          overflowX: "auto",
          paddingBottom: 20,
        }}>
          <div style={{
            position: "relative",
            width: totalWidth,
            height: maxColHeight,
            flexShrink: 0,
          }}>
            {columns.map((col, colIdx) =>
              col.map((card, rowIdx) => {
                const x = colIdx * (CARD_W + COL_GAP);
                const y = colOffsets[colIdx] + rowIdx * (CARD_H + ROW_GAP);
                const delay = (colIdx + rowIdx) * 55;
                return (
                  <div
                    key={`${colIdx}-${rowIdx}`}
                    style={{ position: "absolute", left: x, top: y }}
                  >
                    <PhoneCard img={card.img} alt={card.alt} delay={delay} />
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─── Ticker ─── */
function Ticker() {
  return (
    <div style={{
      overflow: "hidden", padding: "20px 0",
      borderTop: "1px solid #111", borderBottom: "1px solid #111",
      background: "#040404",
    }}>
      <div style={{
        display: "flex",
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
            <span style={{ color: "#cc0022", fontSize: 8 }}>⚡</span>
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
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "40px 36px",
        background: hovered ? "rgba(204,0,34,0.04)" : "#0a0a0a",
        border: `1px solid ${hovered ? "rgba(204,0,34,0.2)" : "#141414"}`,
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        transform: visible
          ? hovered ? "translateY(-6px)" : "translateY(0)"
          : "translateY(32px)",
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${index * 70}ms` : "0ms",
        boxShadow: hovered ? "0 20px 50px rgba(204,0,34,0.06)" : "none",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(to right, ${hovered ? "#cc0022" : "transparent"}, transparent)`,
        transition: "background 0.4s ease",
      }} />
      <div style={{
        fontFamily: "'Space Mono', monospace", fontSize: 12,
        color: "#cc0022", marginBottom: 20,
        transition: "transform 0.3s ease",
        transform: hovered ? "scale(1.3) rotate(15deg)" : "scale(1)",
      }}>
        {feature.icon}
      </div>
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif", fontSize: 22,
        color: "#fff", letterSpacing: 2, marginBottom: 10,
      }}>
        {feature.title}
      </div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 14,
        color: "#555", lineHeight: 1.7,
      }}>
        {feature.desc}
      </div>
    </div>
  );
}

/* ─── Main ─── */
export default function ZapPreview() {
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
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #060606; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #cc0022; }
        ::selection { background: rgba(204,0,34,0.3); color: #fff; }
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.33%); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 8px rgba(204,0,34,0.4); }
          50%       { box-shadow: 0 0 20px rgba(204,0,34,0.8); }
        }
      `}</style>

      {/* Cursor glow */}
      <div style={{
        position: "fixed", pointerEvents: "none", zIndex: 0,
        left: mousePos.x - 250, top: mousePos.y - 250,
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(204,0,34,0.05) 0%, transparent 70%)",
        transition: "left 0.15s ease, top 0.15s ease",
      }} />

      <div style={{ background: "#060606", color: "#fff", minHeight: "100vh", position: "relative" }}>

        {/* Nav */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "0 5vw", height: 64,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(6,6,6,0.9)", backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(204,0,34,0.12)",
        }}>
          <button
            onClick={() => window.history.back()}
            style={{
              background: "none", border: "1px solid #222", color: "#555",
              fontFamily: "'Space Mono', monospace", fontSize: 11,
              letterSpacing: 2, textTransform: "uppercase",
              padding: "8px 18px", cursor: "pointer", transition: "all 0.3s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#cc0022"; e.currentTarget.style.color = "#cc0022"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#222"; e.currentTarget.style.color = "#555"; }}
          >
            ← Back
          </button>

          <div style={{
            fontFamily: "'Bebas Neue', sans-serif", fontSize: 30,
            color: "#cc0022", letterSpacing: 6,
            textShadow: "0 0 40px rgba(204,0,34,0.4)",
          }}>
            ZAP
          </div>

          <div style={{ width: 100 }} />
        </nav>

        <BentoShowcase loaded={loaded} />
        <Ticker />

        {/* Features */}
        <section style={{ padding: "120px 5vw", background: "#050505" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 20,
            maxWidth: 1200, margin: "0 auto 72px",
          }}>
            <div style={{ fontFamily: "'Space Mono', monospace", color: "#cc0022", fontSize: 11, letterSpacing: 4 }}>01 /</div>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(32px, 4vw, 56px)",
              margin: 0, color: "#fff", letterSpacing: 2,
            }}>
              CORE FEATURES
            </h2>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, #cc002230, transparent)" }} />
          </div>
          {/* Row 1: 3 cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2, maxWidth: 1200, margin: "0 auto 2px",
          }}>
            {features.slice(0, 3).map((f, i) => <FeatureCard key={f.title} feature={f} index={i} />)}
          </div>
          {/* Row 2: 2 cards centered */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 2, maxWidth: 800, margin: "0 auto",
          }}>
            {features.slice(3).map((f, i) => <FeatureCard key={f.title} feature={f} index={i + 3} />)}
          </div>
        </section>

        {/* CTA */}
        <section style={{
          padding: "120px 5vw 80px", background: "#050505",
          textAlign: "center", position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 600, height: 600, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(204,0,34,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto" }}>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(48px, 8vw, 96px)",
              color: "#fff", letterSpacing: 3, lineHeight: 1, marginBottom: 24,
            }}>
              NEED A<br />
              <span style={{ color: "#cc0022", textShadow: "0 0 80px rgba(204,0,34,0.5)" }}>
                SIMILAR APP?
              </span>
            </h2>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 16,
              color: "#555", lineHeight: 1.8, marginBottom: 48,
            }}>
              Let's discuss how we can build your next high-performance mobile application.
            </p>
            <button
              onClick={() => window.location.href = "/#contact"}
              style={{
                display: "inline-block", padding: "16px 52px",
                background: "#cc0022", color: "#fff",
                fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: 2,
                textTransform: "uppercase",
                border: "1px solid #cc0022", transition: "all 0.3s ease", cursor: "pointer",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#cc0022"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#cc0022"; e.currentTarget.style.color = "#fff"; }}
            >
              Get In Touch
            </button>
          </div>

          <div style={{
            borderTop: "1px solid #111", marginTop: 80, paddingTop: 32,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: 16,
          }}>
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: 10,
              color: "#2a2a2a", letterSpacing: 2,
            }}>
              © 2025 ZAP — BY THARUNKUMAR B
            </div>
            <button
              onClick={() => window.history.back()}
              style={{
                fontFamily: "'Space Mono', monospace", fontSize: 10,
                color: "#333", letterSpacing: 1,
                background: "none", border: "none",
                cursor: "pointer", transition: "color 0.3s",
              }}
              onMouseEnter={e => e.currentTarget.style.color = "#cc0022"}
              onMouseLeave={e => e.currentTarget.style.color = "#333"}
            >
              ← BACK TO PORTFOLIO
            </button>
          </div>
        </section>

      </div>
    </>
  );
}