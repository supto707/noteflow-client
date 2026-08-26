import { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import {
  PenLine, ArrowRight, Check, ChevronRight,
  FileText, Database, BookOpen, Globe,
  Layers, Table2, LayoutGrid, Calendar, Link2, Download, Search,
  Zap, Shield, Cpu, GitBranch, Code, Terminal, Palette, Sparkles,
  Users, BarChart, Clock, Globe as GlobeIcon, MessageSquare, Ticket
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

const features = [
  { icon: FileText, label: "Docs", color: "#6357E8", title: "Write anything, beautifully", desc: "Rich text with Markdown shortcuts, code blocks, callouts, and toggles. The most powerful editor that stays out of your way." },
  { icon: Database, label: "Databases", color: "#22C27D", title: "Databases with a soul", desc: "Every database is also a page. Add properties, filters, sorts, and formulas. Link between databases. Build the exact system you need." },
  { icon: LayoutGrid, label: "Board view", color: "#F59E0B", title: "Kanban without the chaos", desc: "Drag and drop tasks across columns. Group by any property. Every card is a full page with notes, checklists, and attachments." },
  { icon: Table2, label: "Table view", color: "#EC4899", title: "Spreadsheet meets document", desc: "Inline editing, multi-select, relation fields, rollup calculations. All the power of a spreadsheet without leaving your notes." },
  { icon: Calendar, label: "Calendar", color: "#6357E8", title: "Plan your time visually", desc: "Switch any database to calendar view. Drag events to reschedule. Filter by assignee, tag, or status." },
  { icon: BookOpen, label: "Wiki", color: "#22C27D", title: "One home for team knowledge", desc: "Nested pages with infinite depth. Verification badges so you always know what's current." },
  { icon: Layers, label: "Templates", color: "#F59E0B", title: "Start from a proven structure", desc: "Thousands of community templates — from meeting notes to project trackers. One click, ready to go." },
  { icon: Globe, label: "Publish to web", color: "#EC4899", title: "Share a link, share the world", desc: "Every note and database can become a public webpage in one toggle." },
  { icon: Link2, label: "Relations", color: "#6357E8", title: "Connect everything", desc: "Link any two databases with a relation field. Pull data across with rollups. Build relational systems, no code needed." },
];

const integrations = [
  { name: "Slack", desc: "Send updates to channels", icon: MessageSquare },
  { name: "GitHub", desc: "Link PRs and issues", icon: GitBranch },
  { name: "Figma", desc: "Embed designs live", icon: Palette },
  { name: "Jira", desc: "Sync tickets two-way", icon: Ticket },
  { name: "Notion", desc: "Import in minutes", icon: FileText },
  { name: "Zapier", desc: "Connect 5000+ apps", icon: Zap },
];

function Features() {
  const { dark } = useTheme();
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const cardBg = dark ? "#141412" : "#FFFFFF";
  const borderColor = dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.08)";

  return (
    <section style={{ padding: "140px 0", background: dark ? "#0A0A08" : "#F7F6F2" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeUp className="flex items-center gap-3 mb-6"><div className="h-px bg-[#6357E8]" style={{ width: 28 }} /><span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Features</span></FadeUp>
        <div className="mb-20">
          <RevealLine><h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 7vw, 6.5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95 }}>Every tool</h2></RevealLine>
          <RevealLine delay={0.1}><h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 7vw, 6.5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#6357E8", lineHeight: 0.95 }}>you actually use.</h2></RevealLine>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden" style={{ border: `1px solid ${borderColor}`, background: borderColor }}>
          {features.map((f, i) => (
            <FadeUp key={f.label} delay={i * 0.06}>
              <motion.div whileHover={{ scale: 1.015 }} transition={{ duration: 0.25 }} className="h-full flex flex-col" style={{ padding: 32, background: cardBg, cursor: "default" }}>
                <div className="rounded-xl flex items-center justify-center mb-6" style={{ width: 46, height: 46, background: f.color + "16" }}>
                  <f.icon size={21} style={{ color: f.color }} />
                </div>
                <div className="flex items-center gap-2 mb-2"><span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, color: f.color, letterSpacing: "0.06em", textTransform: "uppercase" }}>{f.label}</span></div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg, marginBottom: 8, letterSpacing: "-0.01em" }}>{f.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.7 }}>{f.desc}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function Integrations() {
  const { dark } = useTheme();
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const cardBg = dark ? "#141412" : "#FFFFFF";
  const borderColor = dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.08)";

  return (
    <section style={{ padding: "100px 0", background: dark ? "#0E0E0C" : "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeUp className="flex items-center gap-3 mb-6"><div className="h-px bg-[#6357E8]" style={{ width: 28 }} /><span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Integrations</span></FadeUp>
        <RevealLine><h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95 }}>Works where you work</h2></RevealLine>
        <FadeUp delay={0.2}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: sub, maxWidth: 480, margin: "24px 0 48px", lineHeight: 1.65 }}>Connect NoteFlow to your favorite tools. Automate workflows, sync data, and keep everything in one place.</p></FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((int, i) => (
            <FadeUp key={int.name} delay={i * 0.06}>
              <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }} className="h-full flex flex-col" style={{ padding: 24, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16 }}>
                <div className="rounded-xl flex items-center justify-center mb-4" style={{ width: 40, height: 40, background: "#6357E816" }}>
                  <int.icon size={20} style={{ color: "#6357E8" }} />
                </div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, color: fg, marginBottom: 6 }}>{int.name}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.6 }}>{int.desc}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const { dark } = useTheme();
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const borderColor = dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.08)";
  const stats = [
    { value: "40ms", label: "Median search latency" }, { value: "99.97%", label: "Uptime last 12 months" },
    { value: "2.4M+", label: "Active workspaces" }, { value: "184+", label: "Countries with users" },
  ];
  return (
    <section style={{ borderTop: `1px solid ${borderColor}`, borderBottom: `1px solid ${borderColor}`, padding: "80px 0", background: dark ? "#0E0E0C" : "#F7F6F2" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <FadeUp key={s.label} delay={i * 0.07} className="text-center">
            <RevealLine delay={i * 0.06}>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
            </RevealLine>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub }}>{s.label}</div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function CTABanner() {
  const { dark } = useTheme();
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#6E6E68" : "#8A8A80";
  const bg = dark ? "#0E0E0C" : "#F7F6F2";
  return (
    <section style={{ padding: "140px 0", background: bg, overflow: "hidden", position: "relative" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,0.025)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.025)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative">
        <RevealLine><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: fg, lineHeight: 0.92 }}>Start today.</div></RevealLine>
        <RevealLine delay={0.1}><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: "#6357E8", lineHeight: 0.92 }}>It&apos;s free.</div></RevealLine>
        <FadeUp delay={0.25}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: sub, maxWidth: 440, margin: "28px auto 40px", lineHeight: 1.65 }}>No credit card. No trial. Just a better place to think and work.</p></FadeUp>
        <FadeUp delay={0.35} className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/signup" className="rounded-full flex items-center gap-2 group transition-all duration-300"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", background: "#6357E8", color: "white", textDecoration: "none" }}>
            Get NoteFlow free <ArrowRight size={15} />
          </Link>
          <Link to="/docs" className="rounded-full transition-all duration-300"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(14,14,12,0.14)"}`, color: fg, textDecoration: "none" }}>
            Read the docs
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}

function Footer() {
  const { dark } = useTheme();
  const sub = "#8A8A80";
  const borderColor = "rgba(255,255,255,0.07)";
  const footerLinks = {
    Product: [
      { label: "Features", to: "/features" },
      { label: "Pricing", to: "/pricing" },
      { label: "Changelog", to: "/changelog" },
      { label: "Roadmap", to: "/roadmap" },
      { label: "Status", to: "/status" },
    ],
    Resources: [
      { label: "Docs", to: "/docs" },
      { label: "API Reference", to: "/api-reference" },
      { label: "Templates", to: "/templates" },
      { label: "Community", to: "/community" },
    ],
    Company: [
      { label: "About", to: "/about" },
      { label: "Blog", to: "/blog" },
      { label: "Careers", to: "/careers" },
      { label: "Press Kit", to: "/press-kit" },
    ],
    Legal: [
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
      { label: "Cookie Policy", to: "/cookie-policy" },
      { label: "Security", to: "/security" },
    ],
  };
  return (
    <footer style={{ background: "#0A0A08", padding: "80px 0 40px" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="rounded-lg bg-[#6357E8] flex items-center justify-center" style={{ width: 34, height: 34 }}><PenLine size={16} className="text-white" /></div>
              <span className="font-bold tracking-tight text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18 }}>NoteFlow</span>
            </div>
            <FadeUp><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.75, maxWidth: 240 }}>A free workspace for docs, databases, and wikis. Think clearly. Note freely.</p></FadeUp>
          </div>
          {Object.entries(footerLinks).map(([group, links], gi) => (
            <div key={group}>
              <FadeUp delay={gi * 0.05}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "white", marginBottom: 16 }}>{group}</div>
                <div className="flex flex-col gap-2.5">
                  {links.map((link, li) => (
                    <RevealLine key={link.to} delay={gi * 0.03 + li * 0.025}>
                      <a href={link.to} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub, display: "block", textDecoration: "none" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "white")}
                        onMouseLeave={e => (e.currentTarget.style.color = sub)}>
                        {link.label}
                      </a>
                    </RevealLine>
                  ))}
                </div>
              </FadeUp>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: `1px solid ${borderColor}` }}>
          <RevealLine><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub }}>© 2025 NoteFlow, Inc. · Free forever · Made with care</span></RevealLine>
          <FadeUp><div className="flex items-center gap-2" style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: sub }}><div className="w-1.5 h-1.5 rounded-full bg-[#22C27D]" />All systems operational</div></FadeUp>
        </div>
      </div>
    </footer>
  );
}

export default function FeaturesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <section ref={containerRef} className="overflow-hidden" style={{ position: "relative", minHeight: "100vh", paddingTop: 140, paddingBottom: 80 }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(14,14,12,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(14,14,12,0.04) 1px, transparent 1px)`, backgroundSize: "72px 72px" }} />
        <div className="absolute pointer-events-none" style={{ top: -80, right: -80, width: 700, height: 700, background: "radial-gradient(circle, rgba(99,87,232,0.14) 0%, transparent 65%)", borderRadius: "50%" }} />
        <div className="absolute pointer-events-none" style={{ bottom: 0, left: -100, width: 500, height: 500, background: "radial-gradient(circle, rgba(99,87,232,0.08) 0%, transparent 65%)", borderRadius: "50%" }} />

        <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp delay={0.05} className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border" style={{ padding: "7px 18px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: "#6357E8", background: "rgba(99,87,232,0.08)", borderColor: "rgba(99,87,232,0.22)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#6357E8]" /> Everything you need. Nothing you don&apos;t. <ChevronRight size={13} />
            </div>
          </FadeUp>

          <div className="text-center mb-8" style={{ lineHeight: 0.92 }}>
            <RevealLine delay={0.1}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#0E0E0C", lineHeight: 0.95 }}>Features that</h1>
            </RevealLine>
            <RevealLine delay={0.18}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#6357E8", lineHeight: 0.95, marginTop: "0.06em" }}>just work.</h1>
            </RevealLine>
          </div>

          <FadeUp delay={0.42} className="text-center mb-12">
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "#6E6E68", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
              Powerful enough for teams at Figma, Linear, and Vercel. Simple enough for your personal notes.
            </p>
          </FadeUp>
        </motion.div>
      </section>

      <Features />
      <Integrations />
      <Stats />
      <CTABanner />
      <Footer />
    </div>
  );
}