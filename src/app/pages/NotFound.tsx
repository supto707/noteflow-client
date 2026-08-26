import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import {
  PenLine, ArrowRight, Search, Home, Mail, MessageSquare,
  Sparkles, Zap, Palette, FileText, Database, BookOpen, Globe,
  Layers, Table2, LayoutGrid, Calendar
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import Navbar from "../components/Navbar";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function RevealLine({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6%" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div initial={{ y: "105%", skewY: 1.5 }} animate={inView ? { y: 0, skewY: 0 } : {}}
        transition={{ duration: 2, delay, ease: EASE }}>
        {children}
      </motion.div>
    </div>
  );
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-4%" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: EASE }} className={className}>
      {children}
    </motion.div>
  );
}

export default function NotFound() {
  const { dark } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const cardBg = dark ? "#141412" : "#FFFFFF";
  const borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(14,14,12,0.09)";
  const bg = dark ? "#0A0A08" : "#F7F6F2";

  const floatingIcons = [
    { Icon: Sparkles, color: "#6357E8", delay: 0 },
    { Icon: Zap, color: "#F59E0B", delay: 0.5 },
    { Icon: Palette, color: "#EC4899", delay: 1 },
    { Icon: FileText, color: "#22C27D", delay: 1.5 },
    { Icon: Database, color: "#6357E8", delay: 2 },
    { Icon: BookOpen, color: "#F59E0B", delay: 2.5 },
    { Icon: Globe, color: "#EC4899", delay: 3 },
    { Icon: Layers, color: "#22C27D", delay: 3.5 },
    { Icon: Table2, color: "#6357E8", delay: 4 },
    { Icon: LayoutGrid, color: "#F59E0B", delay: 4.5 },
    { Icon: Calendar, color: "#EC4899", delay: 5 },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <section ref={containerRef} className="overflow-hidden" style={{ position: "relative", minHeight: "100vh", paddingTop: 140, paddingBottom: 80 }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,0.03)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.03)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px)`, backgroundSize: "72px 72px" }} />
        
        {floatingIcons.map((item, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{
              top: `${20 + (i * 8) % 80}%`,
              left: `${10 + (i * 13) % 80}%`,
              width: 48, height: 48,
              background: `${item.color}18`,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 2, delay: item.delay, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          >
            <item.Icon size={22} style={{ color: item.color }} />
          </motion.div>
        ))}

        <motion.div style={{ opacity }} className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative z-10">
          <FadeUp delay={0.05} className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border" style={{ padding: "7px 18px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: "#6357E8", background: "rgba(99,87,232,0.08)", borderColor: "rgba(99,87,232,0.22)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#6357E8]" /> 404 — Page not found <ArrowRight size={13} />
            </div>
          </FadeUp>

          <div className="mb-8" style={{ lineHeight: 0.92 }}>
            <RevealLine delay={0.1}>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(6rem, 18vw, 16rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95 }}>404</div>
            </RevealLine>
            <RevealLine delay={0.18}>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#6357E8", lineHeight: 0.95, marginTop: "0.06em" }}>Page Missing</div>
            </RevealLine>
          </div>

          <FadeUp delay={0.42}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)", color: sub, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
              The page you&apos;re looking for doesn&apos;t exist — or it may have been moved. 
              No worries, it happens to the best of us. Let&apos;s get you back on track.
            </p>
          </FadeUp>

          <FadeUp delay={0.55} className="mt-12">
            <div style={{ maxWidth: 420, margin: "0 auto" }}>
              <div className="relative" style={{ marginBottom: 16 }}>
                <input
                  type="search"
                  placeholder="Search docs, features, changelog..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && searchQuery.trim()) window.location.href = `/docs?q=${encodeURIComponent(searchQuery)}`; }}
                  style={{
                    width: "100%",
                    padding: "16px 52px 16px 20px",
                    fontSize: 16,
                    fontFamily: "'DM Sans', sans-serif",
                    background: cardBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: 14,
                    color: fg,
                    outline: "none"
                  }}
                />
                <button
                  onClick={() => searchQuery.trim() && (window.location.href = `/docs?q=${encodeURIComponent(searchQuery)}`)}
                  style={{
                    position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                    background: "#6357E8", border: "none", borderRadius: 10,
                    width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", color: "white"
                  }}
                  aria-label="Search"
                >
                  <Search size={18} />
                </button>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub, marginTop: 8 }}>Press Enter to search</p>
            </div>
          </FadeUp>

          <FadeUp delay={0.65} className="mt-16">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/" className="inline-flex items-center gap-2 rounded-full group transition-all duration-300"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", background: "#6357E8", color: "white", textDecoration: "none" }}>
                <Home size={16} /> Back to Home
              </Link>
              <a href="mailto:hello@noteflow.io" className="inline-flex items-center gap-2 rounded-full transition-all duration-300"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(14,14,12,0.14)"}`, color: fg, textDecoration: "none" }}>
                <Mail size={16} /> Contact Support
              </a>
              <Link to="/docs" className="inline-flex items-center gap-2 rounded-full transition-all duration-300"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(14,14,12,0.14)"}`, color: fg, textDecoration: "none" }}>
                <FileText size={16} /> Browse Docs
              </Link>
            </div>
          </FadeUp>

          <FadeUp delay={0.85} className="mt-20">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="rounded-lg bg-[#6357E8] flex items-center justify-center" style={{ width: 34, height: 34 }}><PenLine size={16} className="text-white" /></div>
              <span className="font-bold tracking-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, color: fg }}>NoteFlow</span>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.75, maxWidth: 320, margin: "0 auto" }}>
              A free workspace for docs, databases, and wikis. Think clearly. Note freely.
            </p>
          </FadeUp>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6" style={{ maxWidth: 800, margin: "48px auto 0" }}>
            {[
              { Icon: FileText, label: "Documentation", href: "/docs", color: "#6357E8" },
              { Icon: BookOpen, label: "Features", href: "/features", color: "#22C27D" },
              { Icon: Sparkles, label: "Changelog", href: "/changelog", color: "#F59E0B" },
              { Icon: Globe, label: "Templates", href: "/docs#templates", color: "#EC4899" },
            ].map((item, i) => (
              <Link key={item.label} to={item.href} className="group flex flex-col items-center gap-3 rounded-2xl p-6 transition-all duration-300"
                style={{ background: cardBg, border: `1px solid ${borderColor}`, textDecoration: "none" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = item.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${item.color}40`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = borderColor; e.currentTarget.style.boxShadow = "none"; }}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 6 }}
                  transition={{ duration: 0.3 }}
                  style={{ width: 56, height: 56, borderRadius: 14, background: `${item.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <item.Icon size={24} style={{ color: item.color }} />
                </motion.div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: fg }}>{item.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      <footer style={{ background: "#0A0A08", padding: "60px 0 30px" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: `1px solid ${borderColor}` }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub }}>© 2025 NoteFlow, Inc. · Free forever · Made with care</span>
            <div className="flex items-center gap-2" style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: sub }}><div className="w-1.5 h-1.5 rounded-full bg-[#22C27D]" />All systems operational</div>
          </div>
        </div>
      </footer>
    </div>
  );
}