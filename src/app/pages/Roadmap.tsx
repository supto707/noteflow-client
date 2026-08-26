import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import {
  PenLine, ArrowRight, ChevronRight, Check, Flag, Github, Zap, Sparkles, Bug, Trash2, Calendar, Users, Star, Lock, Globe, Database, FileText, LayoutGrid, Calendar as CalIcon
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

const now = new Date();
const quarters = [
  { label: "Q1 2025", date: "Jan–Mar", status: "done", items: [
    { type: "feature", title: "Real-time collaboration cursors", desc: "See who's editing in real-time with colored cursors and selections", icon: Users },
    { type: "feature", title: "Offline-first mobile apps", desc: "Full read/write offline support with background sync", icon: Sparkles },
    { type: "feature", title: "Command palette (⌘K) everywhere", desc: "Instant navigation, commands, and search from any page", icon: Zap },
    { type: "improvement", title: "Database formula engine v2", desc: "Rollups, relations, and nested if/then logic", icon: Database },
    { type: "bugfix", title: "Fixed sync conflicts on slow connections", desc: "Improved CRDT merge for unreliable networks", icon: Bug },
  ]},
  { label: "Q2 2025", date: "Apr–Jun", status: "current", items: [
    { type: "feature", title: "AI writing assistant", desc: "Draft, summarize, translate, and extract action items with local LLMs", icon: Sparkles },
    { type: "feature", title: "Custom automation workflows", desc: "If this, then that — triggers, actions, and webhooks", icon: Zap },
    { type: "feature", title: "Plugin marketplace (beta)", desc: "Install community widgets, views, and integrations", icon: Globe },
    { type: "improvement", title: "Board view: swimlanes & sub-items", desc: "Group by any property, nest cards infinitely", icon: LayoutGrid },
    { type: "feature", title: "Public API v2 (GraphQL)", desc: "Real-time subscriptions, batch mutations, typed schema", icon: Database },
  ]},
  { label: "Q3 2025", date: "Jul–Sep", status: "planned", items: [
    { type: "feature", title: "Canvas / whiteboard view", desc: "Infinite spatial canvas with sticky notes, diagrams, embeds", icon: FileText },
    { type: "feature", title: "Advanced permissions & SCIM", desc: "Page-level roles, group sync, provisioning via Okta/Entra", icon: Lock },
    { type: "feature", title: "Time-travel version history", desc: "Visual diff, branch & merge page versions, restore points", icon: Calendar },
    { type: "improvement", title: "Calendar view: recurring events & resources", desc: "Book rooms, equipment, recurring team rituals", icon: CalIcon },
    { type: "feature", title: "Self-hosted Enterprise (Docker)", desc: "Air-gapped deployments, data residency, audit logs", icon: Globe },
  ]},
  { label: "Q4 2025", date: "Oct–Dec", status: "planned", items: [
    { type: "feature", title: "AI-powered workspace insights", desc: "Auto-generated reports, anomaly detection, usage analytics", icon: Star },
    { type: "feature", title: "Native sync with GitHub/GitLab", desc: "Two-way issue ↔ page sync, PR docs, changelog gen", icon: Github },
    { type: "feature", title: "Advanced forms & data collection", desc: "Conditional logic, file uploads, webhook responses", icon: LayoutGrid },
    { type: "improvement", title: "Performance: 100k+ block pages", desc: "Virtualized rendering, streaming hydration", icon: Zap },
    { type: "feature", title: "Marketplace: paid plugins & templates", desc: "Revenue share for creators, verified publishers", icon: Globe },
  ]},
];

const typeStyles = {
  feature: { label: "New", color: "#6357E8", bg: "rgba(99,87,232,0.12)", Icon: Sparkles },
  improvement: { label: "Improved", color: "#22C27D", bg: "rgba(34,194,125,0.12)", Icon: Zap },
  bugfix: { label: "Fixed", color: "#F59E0B", bg: "rgba(245,158,11,0.12)", Icon: Bug },
};

export default function Roadmap() {
  const { dark } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const cardBg = dark ? "#141412" : "#FFFFFF";
  const borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(14,14,12,0.09)";
  const bg = dark ? "#0A0A08" : "#F7F6F2";

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <section ref={containerRef} className="overflow-hidden" style={{ position: "relative", minHeight: "100vh", paddingTop: 140, paddingBottom: 80 }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,0.03)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.03)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px)`, backgroundSize: "72px 72px" }} />
        <div className="absolute pointer-events-none" style={{ top: -80, right: -80, width: 700, height: 700, background: "radial-gradient(circle, rgba(99,87,232,0.14) 0%, transparent 65%)", borderRadius: "50%" }} />
        <div className="absolute pointer-events-none" style={{ bottom: 0, left: -100, width: 500, height: 500, background: "radial-gradient(circle, rgba(99,87,232,0.08) 0%, transparent 65%)", borderRadius: "50%" }} />

        <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <FadeUp delay={0.05} className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border" style={{ padding: "7px 18px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: "#6357E8", background: "rgba(99,87,232,0.08)", borderColor: "rgba(99,87,232,0.22)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#6357E8]" /> Public roadmap — we build in the open <ChevronRight size={13} />
            </div>
          </FadeUp>

          <div className="mb-8" style={{ lineHeight: 0.92 }}>
            <RevealLine delay={0.1}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95 }}>What's</h1>
            </RevealLine>
            <RevealLine delay={0.18}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#6357E8", lineHeight: 0.95, marginTop: "0.06em" }}>next</h1>
            </RevealLine>
          </div>

          <FadeUp delay={0.42}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2vw, 1.25rem)", color: sub, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
              Every item below comes from community requests. <a href="https://github.com/noteflow/roadmap" target="_blank" rel="noopener noreferrer" style={{ color: "#6357E8", textDecoration: "underline" }}>Vote on GitHub</a> or suggest your own.
            </p>
          </FadeUp>
        </motion.div>
      </section>

      <section style={{ padding: "100px 0", background: bg }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {quarters.map((quarter, qi) => (
            <FadeUp key={quarter.label} delay={qi * 0.1}>
              <div style={{ marginBottom: qi < quarters.length - 1 ? 80 : 0 }}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: quarter.status === "done" ? "rgba(34,194,125,0.15)" : quarter.status === "current" ? "rgba(99,87,232,0.15)" : "rgba(138,138,128,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {quarter.status === "done" && <Check size={20} style={{ color: "#22C27D" }} />}
                      {quarter.status === "current" && <Sparkles size={20} style={{ color: "#6357E8" }} />}
                      {quarter.status === "planned" && <Flag size={20} style={{ color: "#8A8A80" }} />}
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 24, fontWeight: 800, color: fg }}>{quarter.label}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub }}>{quarter.date}</div>
                    </div>
                  </div>
                  <div style={{ marginLeft: "auto", fontFamily: "'Geist Mono', monospace", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: quarter.status === "done" ? "#22C27D" : quarter.status === "current" ? "#6357E8" : "#8A8A80", background: quarter.status === "done" ? "rgba(34,194,125,0.12)" : quarter.status === "current" ? "rgba(99,87,232,0.12)" : "rgba(138,138,128,0.1)", padding: "4px 12px", borderRadius: 9999 }}>
                    {quarter.status === "done" && "Shipped"}
                    {quarter.status === "current" && "In progress"}
                    {quarter.status === "planned" && "Planned"}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
{quarter.items.map((item, ii) => (
                      <FadeUp key={item.title} delay={ii * 0.06}>
                        <motion.div
                          whileHover={{ y: -4 }}
                          transition={{ duration: 0.3 }}
                          style={{ padding: 24, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16 }}
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <div style={{ width: 40, height: 40, borderRadius: 10, background: typeStyles[item.type].bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              {(() => {
                                const Icon = typeStyles[item.type].Icon;
                                return <Icon size={18} style={{ color: typeStyles[item.type].color }} />;
                              })()}
                            </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, fontWeight: 600, color: typeStyles[item.type].color, background: typeStyles[item.type].bg, padding: "2px 8px", borderRadius: 9999, textTransform: "uppercase" }}>{typeStyles[item.type].label}</span>
                            </div>
                            <h4 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, color: fg, marginBottom: 4 }}>{item.title}</h4>
                          </div>
                        </div>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.6 }}>{item.desc}</p>
                      </motion.div>
                    </FadeUp>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section style={{ padding: "100px 0", background: dark ? "#0E0E0C" : "#F7F6F2" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <FadeUp className="flex items-center justify-center gap-3 mb-12">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Have an idea?</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>
          <RevealLine>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95, marginBottom: "0.12em" }}>Shape the roadmap with us</h2>
          </RevealLine>
          <FadeUp delay={0.2}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: sub, maxWidth: 500, margin: "24px auto 32px", lineHeight: 1.6 }}>The best features come from real workflows. Vote, comment, or open a discussion on GitHub.</p>
          </FadeUp>
          <FadeUp delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://github.com/noteflow/roadmap/discussions" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "14px 32px", background: "#6357E8", color: "white", textDecoration: "none" }}>
              <Github size={16} /> Open a discussion
            </a>
            <Link to="/changelog" className="inline-flex items-center gap-2 rounded-full"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "14px 32px", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(14,14,12,0.14)"}`, color: fg, textDecoration: "none" }}>
              <Star size={15} /> View changelog
            </Link>
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
                    <a key={link} href={`/${link.toLowerCase().replace(" ", "-")}`} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub, display: "block", textDecoration: "none" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "white")}
                      onMouseLeave={e => (e.currentTarget.style.color = sub)}>
                      {link}
                    </a>
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