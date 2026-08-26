import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import {
  PenLine, ArrowRight, Check, ChevronRight, ChevronDown,
  FileText, Database, BookOpen, Globe,
  Layers, Table2, LayoutGrid, Calendar, Link2, Download, Search,
  Zap, Shield, Cpu, GitBranch, Code, Terminal, Palette, Sparkles,
  Users, BarChart, Clock, Globe as GlobeIcon, MessageSquare, Ticket,
  Tag, X, Loader2, AlertTriangle, Star, Heart, Bug, Sparkle,
  Menu, Sun, Moon, Home, ExternalLink, Copy, Type, Heading1, Heading2, Heading3,
  List, Quote, Code2, Image, Table, Separator, MoreHorizontal
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

const docSections = [
  {
    title: "Getting Started",
    icon: Home,
    pages: [
      { slug: "introduction", title: "Introduction", description: "Welcome to NoteFlow. Learn the basics in 5 minutes." },
      { slug: "quickstart", title: "Quick Start Guide", description: "Create your first workspace, page, and database." },
      { slug: "navigation", title: "Navigation & UI", description: "Master the sidebar, search, and keyboard shortcuts." },
      { slug: "settings", title: "Account Settings", description: "Profile, preferences, billing, and team management." },
    ]
  },
  {
    title: "Editor",
    icon: Type,
    pages: [
      { slug: "blocks", title: "Block Types", description: "Text, headings, lists, code, callouts, toggles, and more." },
      { slug: "markdown", title: "Markdown Shortcuts", description: "Write faster with /commands and markdown syntax." },
      { slug: "inline", title: "Inline Formatting", description: "Bold, italic, code, links, mentions, and equations." },
      { slug: "media", title: "Images & Media", description: "Embed images, videos, PDFs, Figma, Loom, and more." },
      { slug: "columns", title: "Columns & Layouts", description: "Drag blocks side-by-side. Responsive columns." },
    ]
  },
  {
    title: "Databases",
    icon: Database,
    pages: [
      { slug: "databases-intro", title: "Databases Overview", description: "Tables, boards, calendars, galleries, lists, timelines." },
      { slug: "properties", title: "Property Types", description: "Text, number, select, multi-select, date, person, file, formula, rollup, relation." },
      { slug: "views", title: "Views & Filters", description: "Create custom views. Filter, sort, group, and hide properties." },
      { slug: "formulas", title: "Formulas", description: "50+ functions. Date math, string manipulation, conditionals, rollups." },
      { slug: "relations", title: "Relations & Rollups", description: "Link databases. Pull data across with rollups." },
      { slug: "templates", title: "Database Templates", description: "Default properties for new pages. Duplicate with one click." },
    ]
  },
  {
    title: "Collaboration",
    icon: Users,
    pages: [
      { slug: "sharing", title: "Sharing & Permissions", description: "Invite guests, set roles, public links, password protection." },
      { slug: "comments", title: "Comments & Mentions", description: "Threaded discussions. @mention teammates. Assign tasks." },
      { slug: "activity", title: "Activity & History", description: "Page history (7 days free, 90 days Plus). Restore versions." },
      { slug: "notifications", title: "Notifications", description: "In-app, email, and push. Customize what you receive." },
    ]
  },
  {
    title: "Publishing",
    icon: Globe,
    pages: [
      { slug: "publish", title: "Publish to Web", description: "Turn any page into a public site. SEO, custom domains, analytics." },
      { slug: "domains", title: "Custom Domains", description: "Connect your domain. SSL included. Subpath or root." },
      { slug: "embed", title: "Embed Pages", description: "Embed NoteFlow pages in Notion, Webflow, Framer, anywhere." },
    ]
  },
  {
    title: "Integrations & API",
    icon: GitBranch,
    pages: [
      { slug: "api", title: "REST API", description: "Full CRUD for pages, databases, blocks, users, comments." },
      { slug: "webhooks", title: "Webhooks", description: "Real-time events. Page, database, comment, user triggers." },
      { slug: "oauth", title: "OAuth & SSO", description: "Build integrations. SAML/OIDC for Enterprise." },
      { slug: "import", title: "Import from Notion", description: "One-click migration. Preserves structure, media, databases." },
    ]
  },
  {
    title: "Reference",
    icon: Code2,
    pages: [
      { slug: "shortcuts", title: "Keyboard Shortcuts", description: "Complete list. Editor, navigation, database, global." },
      { slug: "limits", title: "Limits & Quotas", description: "File sizes, workspace members, API rate limits, blocks." },
      { slug: "markdown", title: "Markdown Spec", description: "Supported syntax. Extensions. Differences from CommonMark." },
      { slug: "changelog", title: "Changelog", description: "Version history. Migration guides. Deprecations." },
    ]
  },
];

function DocCard({ page, dark, fg, sub, cardBg, borderColor }: any) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 16px 32px -8px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.2 }}
      style={{ padding: 20, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 12, cursor: "pointer", transition: "all 0.2s" }}
    >
      <div style={{ fontSize: 13, fontWeight: 600, color: fg, marginBottom: 4, fontFamily: "'Bricolage Grotesque', sans-serif" }}>{page.title}</div>
      <div style={{ fontSize: 12, color: sub, lineHeight: 1.5 }}>{page.description}</div>
    </motion.div>
  );
}

function DocSection({ section, dark, fg, sub, cardBg, borderColor }: any) {
  const [open, setOpen] = useState(true);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ marginBottom: 32 }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 0",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: fg,
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "#6357E816", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <section.icon size={18} style={{ color: "#6357E8" }} />
          </div>
          {section.title}
        </div>
        <ChevronDown size={20} style={{ transition: "transform 0.2s", transform: open ? "rotate(0deg)" : "rotate(-90deg)" }} />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3, delayChildren: 0.1 }}
          style={{ overflow: "hidden" }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginTop: 16 }}>
            {section.pages.map((page, pi) => (
              <FadeUp key={page.slug} delay={pi * 0.03}>
                <DocCard page={page} dark={dark} fg={fg} sub={sub} cardBg={cardBg} borderColor={borderColor} />
              </FadeUp>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function SearchBar({ dark, fg, sub, cardBg, borderColor }: any) {
  const [query, setQuery] = useState("");
  const filtered = docSections.flatMap(s => s.pages.filter(p => p.title.toLowerCase().includes(query.toLowerCase())));

  if (!query) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: "fixed", top: 100, left: "50%", transform: "translateX(-50%)",
        width: "90%", maxWidth: 600, zIndex: 100,
        background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16,
        padding: 20, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <Search size={20} style={{ color: sub }} />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search documentation..."
          autoFocus
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 16, color: fg, fontFamily: "'DM Sans', sans-serif" }}
        />
        <button onClick={() => setQuery("")} style={{ background: "transparent", border: "none", color: sub, cursor: "pointer" }}><X size={20} /></button>
      </div>
      <div style={{ maxHeight: 400, overflow: "auto" }}>
        {filtered.length === 0 ? (
          <div style={{ padding: 32, textAlign: "center", color: sub }}>No results for "{query}"</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {filtered.slice(0, 10).map((page, i) => (
              <Link key={page.slug} to={`/docs/${page.slug}`} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 8, color: fg, textDecoration: "none", background: i % 2 === 0 ? "transparent" : dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)", transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)"}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "transparent" : dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"}
              >
                <FileText size={18} style={{ color: "#6357E8" }} />
                <div>
                  <div style={{ fontWeight: 500 }}>{page.title}</div>
                  <div style={{ fontSize: 12, color: sub }}>{page.description}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Docs() {
  const { dark, toggle } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const cardBg = dark ? "#141412" : "#FFFFFF";
  const borderColor = dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.08)";
  const bg = dark ? "#0A0A08" : "#F7F6F2";
  const sidebarBg = dark ? "#0E0E0C" : "#F7F6F2";

  const totalPages = docSections.reduce((acc, s) => acc + s.pages.length, 0);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSidebarOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 40, background: "rgba(0,0,0,0.5)" }}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ duration: 0.3, ease: EASE }}
        style={{
          position: "fixed", top: 0, left: 0, bottom: 0, width: 280,
          zIndex: 50, background: sidebarBg,
          borderRight: `1px solid ${borderColor}`,
          padding: "20px 16px", overflow: "auto"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <Link to="/docs" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: fg }}>
            <div className="rounded-lg bg-[#6357E8] flex items-center justify-center" style={{ width: 32, height: 32 }}>
              <PenLine size={16} className="text-white" />
            </div>
            <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700 }}>NoteFlow Docs</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} style={{ background: "transparent", border: "none", color: sub, cursor: "pointer" }}><X size={22} /></button>
        </div>

        <div style={{ marginBottom: 24 }}>
          <button
            onClick={() => setSearchOpen(true)}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 10, color: sub, fontSize: 14, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", textAlign: "left" }}
          >
            <Search size={18} />
            Search documentation...
            <kbd style={{ marginLeft: "auto", fontSize: 10, padding: "2px 6px", background: dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)", borderRadius: 4, color: sub, fontFamily: "'Geist Mono', monospace" }}>⌘K</kbd>
          </button>
        </div>

        <nav>
          {docSections.map((section, si) => (
            <div key={section.title} style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", marginBottom: 8, color: sub, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'DM Sans', sans-serif" }}>
                <section.icon size={14} />
                {section.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {section.pages.map((page, pi) => (
                  <Link
                    key={page.slug}
                    to={`/docs/${page.slug}`}
                    onClick={() => setSidebarOpen(false)}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "8px 10px", borderRadius: 8,
                      color: sub, fontSize: 13, textDecoration: "none",
                      fontFamily: "'DM Sans', sans-serif",
                      transition: "all 0.15s"
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = cardBg; e.currentTarget.style.color = fg; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = sub; }}
                  >
                    <FileText size={14} style={{ color: "#6357E8", flexShrink: 0 }} />
                    <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{page.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div style={{ marginTop: 32, paddingTop: 20, borderTop: `1px solid ${borderColor}` }}>
          <Link to="/changelog" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px", borderRadius: 8, color: sub, textDecoration: "none", fontSize: 13, fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.background = cardBg; e.currentTarget.style.color = fg; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = sub; }}
          >
            <GitBranch size={18} style={{ color: "#6357E8" }} />
            <span>Changelog</span>
          </Link>
        </div>
      </motion.aside>

      {/* Search Modal */}
      <SearchBar dark={dark} fg={fg} sub={sub} cardBg={cardBg} borderColor={borderColor} />

      {/* Main Content */}
      <main style={{ marginLeft: 0, minHeight: "100vh", background: bg }}>

        {/* Hero */}
        <section ref={containerRef} className="overflow-hidden" style={{ position: "relative", paddingTop: 120, paddingBottom: 80 }}>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,0.03)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.03)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px)`, backgroundSize: "72px 72px" }} />
          <div className="absolute pointer-events-none" style={{ top: -80, right: -80, width: 700, height: 700, background: "radial-gradient(circle, rgba(99,87,232,0.14) 0%, transparent 65%)", borderRadius: "50%" }} />
          <div className="absolute pointer-events-none" style={{ bottom: 0, left: -100, width: 500, height: 500, background: "radial-gradient(circle, rgba(99,87,232,0.08) 0%, transparent 65%)", borderRadius: "50%" }} />

          <motion.div style={{ opacity }} className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
            <FadeUp delay={0.05} className="flex justify-center mb-10">
              <div className="inline-flex items-center gap-2 rounded-full border" style={{ padding: "7px 18px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: "#6357E8", background: "rgba(99,87,232,0.08)", borderColor: "rgba(99,87,232,0.22)" }}>
                <div className="w-1.5 h-1.5 rounded-full bg-[#6357E8]" /> {totalPages} guides • API reference • Examples <ChevronRight size={13} />
              </div>
            </FadeUp>

            <div className="mb-8" style={{ lineHeight: 0.92 }}>
              <RevealLine delay={0.1}>
                <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95 }}>Documentation</h1>
              </RevealLine>
              <RevealLine delay={0.18}>
                <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#6357E8", lineHeight: 0.95, marginTop: "0.06em" }}>{totalPages} guides.</h1>
              </RevealLine>
            </div>

            <FadeUp delay={0.42} className="text-center mb-12">
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2vw, 1.25rem)", color: sub, maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
                Everything you need to build with NoteFlow. From your first page to advanced API integrations.
              </p>
            </FadeUp>

            <FadeUp delay={0.54} className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/docs/getting-started" className="rounded-full flex items-center gap-2 group transition-all duration-300 hover:gap-3"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "15px 30px", background: "#6357E8", color: "white", textDecoration: "none" }}>
                Get started <ArrowRight size={16} />
              </Link>
              <Link to="/api-reference" className="rounded-full flex items-center gap-2 transition-all duration-300"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "15px 30px", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(14,14,12,0.14)"}`, color: fg, textDecoration: "none" }}>
                <Code2 size={15} /> View API reference
              </Link>
            </FadeUp>
          </motion.div>
        </section>

        {/* Sections */}
        <section style={{ padding: "0 0 140px" }}>
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            {docSections.map((section, si) => (
              <FadeUp key={section.title} delay={si * 0.06}>
                <DocSection section={section} dark={dark} fg={fg} sub={sub} cardBg={cardBg} borderColor={borderColor} />
              </FadeUp>
            ))}
          </div>
        </section>

        <CTABanner />
        <Footer />
      </main>
    </div>
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
        <RevealLine><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: fg, lineHeight: 0.92 }}>Start building.</div></RevealLine>
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
  return (
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
  );
}