import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import {
  PenLine, ArrowRight, Check, ChevronRight,
  FileText, Database, BookOpen, Globe,
  Layers, Table2, LayoutGrid, Calendar, Link2, Download, Search,
  Zap, Shield, Cpu, GitBranch, Code, Terminal, Palette, Sparkles,
  Users, BarChart, Clock, Globe as GlobeIcon, MessageSquare, Ticket,
  Tag, X, Loader2, AlertTriangle, Star, Heart, Bug, Sparkle
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

function SlideIn({ children, delay = 0, from = "left", className = "" }: { children: React.ReactNode; delay?: number; from?: "left" | "right"; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-4%" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: from === "left" ? -60 : 60 }} animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 2, delay, ease: EASE }} className={className}>
      {children}
    </motion.div>
  );
}

const releases = [
  {
    version: "3.2.0",
    date: "January 15, 2025",
    type: "major",
    highlights: ["New formula engine for databases", "Real-time collaboration cursors", "Command palette (⌘K) everywhere"],
    changes: [
      { type: "feature", title: "Formula Engine v2", desc: "Complete rewrite with 50+ new functions, rollups, and cross-database references. 10x faster." },
      { type: "feature", title: "Real-time Cursors", desc: "See teammates' cursors and selections in real-time. Presence indicators in page headers." },
      { type: "feature", title: "Command Palette", desc: "Press ⌘K anywhere to search, create, navigate, and run commands instantly." },
      { type: "improvement", title: "Mobile App Redesign", desc: "Native iOS/Android apps rebuilt with offline sync, better editor, and push notifications." },
      { type: "improvement", title: "Performance", desc: "Database queries 40% faster. Large workspaces load in under 2 seconds." },
      { type: "fix", title: "Fixed", desc: "Sync conflicts on slow connections. Embed block sizing. Dark mode flicker on load." },
    ]
  },
  {
    version: "3.1.0",
    date: "November 28, 2024",
    type: "minor",
    highlights: ["Calendar view for databases", "Custom page icons & covers", "Improved block editor"],
    changes: [
      { type: "feature", title: "Calendar View", desc: "Switch any database to calendar view. Drag events to reschedule. Filter by any property." },
      { type: "feature", title: "Custom Icons & Covers", desc: "Upload custom icons, choose from emoji, or use gradient covers for pages and databases." },
      { type: "improvement", title: "Block Editor", desc: "Slash commands show inline. Better drag handles. New callout types. Code block line numbers." },
      { type: "improvement", title: "API Webhooks", desc: "Subscribe to page, database, and comment events. Retry logic and signatures included." },
      { type: "fix", title: "Fixed", desc: "Table view column resize. Relation picker search. Dark mode print styles." },
    ]
  },
  {
    version: "3.0.0",
    date: "October 1, 2024",
    type: "major",
    highlights: ["Complete redesign", "Databases 2.0", "Web publishing"],
    changes: [
      { type: "feature", title: "All-New Design", desc: "Cleaner UI, denser information, customizable density. New color system and typography." },
      { type: "feature", title: "Databases 2.0", desc: "Relations, rollups, formulas, filters, sorts, groups. Every database is a page." },
      { type: "feature", title: "Web Publishing", desc: "Turn any page into a public site. Custom domains. Password protection. SEO settings." },
      { type: "feature", title: "Templates Gallery", desc: "500+ templates across categories. One-click duplicate. Submit your own." },
      { type: "improvement", title: "Collaboration", desc: "Comments, mentions, tasks, reminders. Activity feed. Page history (7 days free)." },
      { type: "improvement", title: "Mobile & Desktop", desc: "Native apps for iOS, Android, macOS, Windows. Offline-first architecture." },
      { type: "fix", title: "Fixed", desc: "Hundreds of bugs squashed. Migration from v2 seamless." },
    ]
  },
  {
    version: "2.8.0",
    date: "July 15, 2024",
    type: "minor",
    highlights: ["Board view", "Page lock", "Export improvements"],
    changes: [
      { type: "feature", title: "Kanban Board View", desc: "Drag cards across columns. Group by any property. Sub-tasks with own boards." },
      { type: "feature", title: "Page Lock", desc: "Prevent accidental edits. Lock entire pages or specific blocks." },
      { type: "improvement", title: "Export", desc: "PDF, Markdown, HTML, CSV. Batch export. Preserve formatting." },
      { type: "fix", title: "Fixed", desc: "Large file uploads. Search indexing. Nested toggle rendering." },
    ]
  },
];

export default function Changelog() {
  const { dark } = useTheme();
  const [activeVersion, setActiveVersion] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const cardBg = dark ? "#141412" : "#FFFFFF";
  const borderColor = dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.08)";
  const bg = dark ? "#0A0A08" : "#F7F6F2";

  const typeStyles: Record<string, { icon: any; color: string; bg: string; label: string }> = {
    feature: { icon: Sparkle, color: "#6357E8", bg: "rgba(99,87,232,0.1)", label: "New" },
    improvement: { icon: Zap, color: "#22C27D", bg: "rgba(34,194,125,0.1)", label: "Improved" },
    fix: { icon: Bug, color: "#EF4444", bg: "rgba(239,68,68,0.1)", label: "Fixed" },
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <section ref={containerRef} className="overflow-hidden" style={{ position: "relative", minHeight: "100vh", paddingTop: 140, paddingBottom: 80 }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,0.03)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.03)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px)`, backgroundSize: "72px 72px" }} />
        <div className="absolute pointer-events-none" style={{ top: -80, right: -80, width: 700, height: 700, background: "radial-gradient(circle, rgba(99,87,232,0.14) 0%, transparent 65%)", borderRadius: "50%" }} />
        <div className="absolute pointer-events-none" style={{ bottom: 0, left: -100, width: 500, height: 500, background: "radial-gradient(circle, rgba(99,87,232,0.08) 0%, transparent 65%)", borderRadius: "50%" }} />

        <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp delay={0.05} className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border" style={{ padding: "7px 18px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: "#6357E8", background: "rgba(99,87,232,0.08)", borderColor: "rgba(99,87,232,0.22)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#6357E8]" /> Latest: v{releases[0].version} — {releases[0].date} <ChevronRight size={13} />
            </div>
          </FadeUp>

          <div className="text-center mb-8" style={{ lineHeight: 0.92 }}>
            <RevealLine delay={0.1}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95 }}>Changelog</h1>
            </RevealLine>
            <RevealLine delay={0.18}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#6357E8", lineHeight: 0.95, marginTop: "0.06em" }}>Every update.</h1>
            </RevealLine>
          </div>

          <FadeUp delay={0.42} className="text-center mb-12">
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2vw, 1.25rem)", color: sub, maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
              We ship fast. Every week brings new features, improvements, and fixes. Here's what's new.
            </p>
          </FadeUp>

          {/* Version Tabs */}
          <FadeUp delay={0.5} className="flex flex-wrap justify-center gap-2 mb-12">
            {releases.map((r, i) => (
              <button
                key={r.version}
                onClick={() => setActiveVersion(i)}
                style={{
                  padding: "8px 16px",
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: "'DM Sans', sans-serif",
                  color: activeVersion === i ? (dark ? "#0E0E0C" : "#FFFFFF") : sub,
                  background: activeVersion === i ? "#6357E8" : "transparent",
                  border: activeVersion === i ? "none" : `1px solid ${borderColor}`,
                  borderRadius: 9999,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
                onMouseEnter={(e) => { if (activeVersion !== i) { e.currentTarget.style.background = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)"; e.currentTarget.style.color = fg; } }}
                onMouseLeave={(e) => { if (activeVersion !== i) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = sub; } }}
              >
                {r.type === "major" && <Star size={12} style={{ color: "#F59E0B" }} />}
                v{r.version}
              </button>
            ))}
          </FadeUp>
        </motion.div>
      </section>

      {/* Release Content */}
      <section style={{ padding: "100px 0 140px", background: bg }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          {releases.map((release, ri) => (
            <FadeUp key={release.version} delay={ri * 0.08}>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: activeVersion === ri ? 1 : 0, height: activeVersion === ri ? "auto" : 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                style={{ overflow: "hidden" }}
              >
                <div className="mb-8" style={{ border: `1px solid ${borderColor}`, borderRadius: 16, background: cardBg, overflow: "hidden" }}>
                  <div style={{ background: release.type === "major" ? "linear-gradient(90deg, #6357E8, #22C27D)" : "#6357E8", padding: "24px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                        <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 800, color: "white" }}>v{release.version}</span>
                        {release.type === "major" && <Star size={16} style={{ color: "#F59E0B" }} />}
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.8)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em" }}>{release.type}</span>
                      </div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{release.date}</div>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {release.highlights.map((h, hi) => (
                        <span key={hi} style={{ fontSize: 12, padding: "4px 10px", background: "rgba(255,255,255,0.15)", borderRadius: 9999, color: "white", fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>{h}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ padding: "32px" }}>
                    <div className="space-y-4">
                      {release.changes.map((change, ci) => {
                        const style = typeStyles[change.type] || typeStyles.feature;
                        return (
                          <motion.div
                            key={ci}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: ci * 0.05 }}
                            style={{ display: "flex", gap: 16, padding: "16px 20px", background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)", border: `1px solid ${borderColor}`, borderRadius: 12, transition: "all 0.2s" }}
                            whileHover={{ background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", x: 4 }}
                          >
                            <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 10, background: style.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <style.icon size={16} style={{ color: style.color }} />
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                <span style={{ fontSize: 10, padding: "2px 6px", background: style.bg, color: style.color, borderRadius: 4, fontWeight: 600, fontFamily: "'Geist Mono', monospace", letterSpacing: "0.05em", textTransform: "uppercase" }}>{style.label}</span>
                                <h4 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, fontWeight: 700, color: fg }}>{change.title}</h4>
                              </div>
                              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub, lineHeight: 1.6 }}>{change.desc}</p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section style={{ padding: "140px 0", background: dark ? "#0E0E0C" : "#FFFFFF", overflow: "hidden", position: "relative" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,0.025)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.025)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative">
          <RevealLine><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: fg, lineHeight: 0.92 }}>Stay updated.</div></RevealLine>
          <RevealLine delay={0.1}><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: "#6357E8", lineHeight: 0.92 }}>Every week.</div></RevealLine>
          <FadeUp delay={0.25}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: sub, maxWidth: 440, margin: "28px auto 40px", lineHeight: 1.65 }}>Subscribe to our changelog newsletter. No spam, just the good stuff.</p></FadeUp>
          <FadeUp delay={0.35} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <form className="flex gap-3" style={{ maxWidth: 400, width: "100%" }}>
              <input type="email" placeholder="your@email.com" style={{ flex: 1, padding: "14px 18px", fontSize: 15, fontFamily: "'DM Sans', sans-serif", background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 9999, color: fg, outline: "none" }} />
              <button type="submit" className="rounded-full flex items-center justify-center group transition-all duration-300"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, padding: "14px 28px", background: "#6357E8", color: "white", border: "none", cursor: "pointer" }}>
                Subscribe <ArrowRight size={15} />
              </button>
            </form>
          </FadeUp>
        </div>
      </section>

      <footer style={{ background: "#0A0A08", padding: "80px 0 40px" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="rounded-lg bg-[#6357E8] flex items-center justify-center" style={{ width: 34, height: 34 }}><PenLine size={16} className="text-white" /></div>
                <span className="font-bold tracking-tight text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18 }}>NoteFlow</span>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.75, maxWidth: 240 }}>A free workspace for docs, databases, and wikis. Think clearly. Note freely.</p>
            </div>
            {Object.entries({
              Product: ["Features", "Pricing", "Changelog", "Roadmap", "Status"],
              Resources: ["Documentation", "API Reference", "Templates", "Community"],
              Company: ["About", "Blog", "Careers", "Press kit"],
              Legal: ["Privacy", "Terms", "Cookie policy", "Security"],
            }).map(([group, links], gi) => (
              <div key={group}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "white", marginBottom: 16 }}>{group}</div>
                <div className="flex flex-col gap-2.5">
                  {links.map((link, li) => (
                    <Link key={link} to={link === "Documentation" ? "/docs" : link === "API Reference" ? "/api-reference" : link === "Press kit" ? "/press-kit" : link === "Cookie policy" ? "/cookie-policy" : `/${link.toLowerCase().replace(/ /g, "-")}`} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub, display: "block", textDecoration: "none" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "white")}
                      onMouseLeave={e => (e.currentTarget.style.color = sub)}>
                    {link}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: `1px solid ${borderColor}` }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub }}>© 2025 NoteFlow, Inc. · Free forever · Made with care</span>
            <div className="flex items-center gap-2" style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: sub }}><div className="w-1.5 h-1.5 rounded-full bg-[#22C27D]" />All systems operational</div>
          </div>
        </div>
      </footer>
    </div>
  );
}