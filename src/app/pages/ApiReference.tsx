import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import {
  PenLine, ArrowRight, ChevronRight, Copy, ExternalLink, FileCode, Globe, Key, Shield, Zap, Database, Search, Terminal, Loader2, Users, BookOpen, Link as LinkIcon, Settings, Zap as ZapIcon, Mail, Github, Twitter, MessageSquare
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

const endpoints = [
  { method: "GET", path: "/v1/workspaces", desc: "List workspaces", auth: true },
  { method: "POST", path: "/v1/workspaces", desc: "Create workspace", auth: true },
  { method: "GET", path: "/v1/workspaces/:id", desc: "Get workspace", auth: true },
  { method: "PATCH", path: "/v1/workspaces/:id", desc: "Update workspace", auth: true },
  { method: "DELETE", path: "/v1/workspaces/:id", desc: "Delete workspace", auth: true },
  { method: "GET", path: "/v1/pages", desc: "List pages (with filters)", auth: true },
  { method: "POST", path: "/v1/pages", desc: "Create page", auth: true },
  { method: "GET", path: "/v1/pages/:id", desc: "Get page content", auth: true },
  { method: "PATCH", path: "/v1/pages/:id", desc: "Update page", auth: true },
  { method: "DELETE", path: "/v1/pages/:id", desc: "Delete page", auth: true },
  { method: "GET", path: "/v1/pages/:id/blocks", desc: "Get page blocks", auth: true },
  { method: "PATCH", path: "/v1/pages/:id/blocks", desc: "Update blocks", auth: true },
  { method: "POST", path: "/v1/databases", desc: "Create database", auth: true },
  { method: "GET", path: "/v1/databases/:id", desc: "Get database schema", auth: true },
  { method: "POST", path: "/v1/databases/:id/query", desc: "Query database", auth: true },
  { method: "POST", path: "/v1/databases/:id/rows", desc: "Create rows", auth: true },
  { method: "PATCH", path: "/v1/databases/:id/rows/:rowId", desc: "Update row", auth: true },
  { method: "DELETE", path: "/v1/databases/:id/rows/:rowId", desc: "Delete row", auth: true },
  { method: "GET", path: "/v1/users/me", desc: "Current user", auth: true },
  { method: "GET", path: "/v1/users/:id", desc: "Get user", auth: true },
  { method: "GET", path: "/v1/search", desc: "Global search", auth: true },
  { method: "POST", path: "/v1/webhooks", desc: "Register webhook", auth: true },
  { method: "GET", path: "/v1/webhooks", desc: "List webhooks", auth: true },
  { method: "DELETE", path: "/v1/webhooks/:id", desc: "Delete webhook", auth: true },
];

const codeExamples = {
  curl: `curl -X GET "https://api.noteflow.io/v1/workspaces" \\
  -H "Authorization: Bearer nf_live_abc123..." \\
  -H "Noteflow-Version: 2025-01-01"`,
  js: `import { Noteflow } from "@noteflow/sdk";

const client = new Noteflow({
  apiKey: "nf_live_abc123...",
});

const workspaces = await client.workspaces.list();
console.log(workspaces);`,
  python: `from noteflow import Noteflow

client = Noteflow(api_key="nf_live_abc123...")

workspaces = client.workspaces.list()
print(workspaces)`,
};

export default function ApiReference() {
  const { dark } = useTheme();
  const [activeTab, setActiveTab] = useState<"curl" | "js" | "python">("curl");
  const [copied, setCopied] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const cardBg = dark ? "#141412" : "#FFFFFF";
  const borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(14,14,12,0.09)";
  const bg = dark ? "#0A0A08" : "#F7F6F2";

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

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
              <div className="w-1.5 h-1.5 rounded-full bg-[#6357E8]" /> REST + GraphQL + Realtime <ChevronRight size={13} />
            </div>
          </FadeUp>

          <div className="mb-8" style={{ lineHeight: 0.92 }}>
            <RevealLine delay={0.1}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95 }}>API</h1>
            </RevealLine>
            <RevealLine delay={0.18}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#6357E8", lineHeight: 0.95, marginTop: "0.06em" }}>Reference</h1>
            </RevealLine>
          </div>

          <FadeUp delay={0.42}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2vw, 1.25rem)", color: sub, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
              Build anything. Complete REST API, GraphQL endpoint, realtime subscriptions, and official SDKs.
            </p>
          </FadeUp>
        </motion.div>
      </section>

      <section style={{ padding: "100px 0", background: bg }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp className="flex items-center justify-center gap-3 mb-12">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Getting started</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>

          <div className="grid lg:grid-cols-3 gap-8">
            <FadeUp delay={0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                style={{ padding: 32, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16 }}
              >
                <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(99,87,232,0.14)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Key size={24} style={{ color: "#6357E8" }} />
                </div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 700, color: fg, marginBottom: 8 }}>Authentication</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.6, marginBottom: 16 }}>Bearer tokens with scoped permissions. Create keys in Settings → API Keys. Rate limited to 100 req/s.</p>
                <code style={{ fontFamily: "'Geist Mono', monospace", fontSize: 13, color: "#6357E8", background: "rgba(99,87,232,0.1)", padding: "2px 8px", borderRadius: 4 }}>Authorization: Bearer nf_live_...</code>
              </motion.div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                style={{ padding: 32, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16 }}
              >
                <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(34,194,125,0.14)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Zap size={24} style={{ color: "#22C27D" }} />
                </div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 700, color: fg, marginBottom: 8 }}>Base URL</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.6, marginBottom: 16 }}>All requests to <code style={{ fontFamily: "'Geist Mono', monospace", color: fg, background: "rgba(99,87,232,0.1)", padding: "2px 8px", borderRadius: 4 }}>https://api.noteflow.io</code>. Versioned via header.</p>
                <code style={{ fontFamily: "'Geist Mono', monospace", fontSize: 13, color: "#22C27D", background: "rgba(34,194,125,0.1)", padding: "2px 8px", borderRadius: 4 }}>Noteflow-Version: 2025-01-01</code>
              </motion.div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                style={{ padding: 32, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16 }}
              >
                <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(245,158,11,0.14)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Shield size={24} style={{ color: "#F59E0B" }} />
                </div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 700, color: fg, marginBottom: 8 }}>Rate limits</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.6, marginBottom: 16 }}>100 req/s per key. Burst to 200. Returns 429 with Retry-After header. Enterprise: custom limits.</p>
                <code style={{ fontFamily: "'Geist Mono', monospace", fontSize: 13, color: "#F59E0B", background: "rgba(245,158,11,0.1)", padding: "2px 8px", borderRadius: 4 }}>X-RateLimit-Remaining: 99</code>
              </motion.div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 0", background: dark ? "#0E0E0C" : "#F7F6F2" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp className="flex items-center justify-center gap-3 mb-12">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Endpoints</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>

          <FadeUp delay={0.1}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, fontSize: 11, color: sub, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>Method</th>
                    <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, fontSize: 11, color: sub, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "'DM Sans', sans-serif" }}>Endpoint</th>
                    <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, fontSize: 11, color: sub, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "'DM Sans', sans-serif" }}>Description</th>
                    <th style={{ textAlign: "center", padding: "12px 16px", fontWeight: 600, fontSize: 11, color: sub, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "'DM Sans', sans-serif" }}>Auth</th>
                  </tr>
                </thead>
                <tbody>
                  {endpoints.map((ep, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${borderColor}` }}>
                      <td style={{ textAlign: "left", padding: "10px 16px", fontFamily: "'Geist Mono', monospace", fontSize: 12 }}>
                        <span style={{ padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: 600, background: ep.method === "GET" ? "rgba(34,194,125,0.15)" : ep.method === "POST" ? "rgba(99,87,232,0.15)" : ep.method === "PATCH" ? "rgba(245,158,11,0.15)" : "rgba(239,68,68,0.15)", color: ep.method === "GET" ? "#22C27D" : ep.method === "POST" ? "#6357E8" : ep.method === "PATCH" ? "#F59E0B" : "#EF4444" }}>{ep.method}</span>
                      </td>
                      <td style={{ textAlign: "left", padding: "10px 16px", fontFamily: "'Geist Mono', monospace", fontSize: 12, color: fg }}><code>{ep.path}</code></td>
                      <td style={{ textAlign: "left", padding: "10px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub }}>{ep.desc}</td>
                      <td style={{ textAlign: "center", padding: "10px 16px" }}>
                        {ep.auth ? (
                          <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, fontWeight: 600, color: "#22C27D", background: "rgba(34,194,125,0.12)", padding: "2px 8px", borderRadius: 9999 }}>Required</span>
                        ) : (
                          <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, fontWeight: 600, color: sub, background: "rgba(138,138,128,0.12)", padding: "2px 8px", borderRadius: 9999 }}>Public</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeUp>
        </div>
      </section>

      <section style={{ padding: "100px 0", background: bg }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp className="flex items-center justify-center gap-3 mb-12">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>SDKs & Examples</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="flex gap-4 mb-6" style={{ flexWrap: "wrap" }}>
              {(["curl", "js", "python"] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => setActiveTab(lang)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: activeTab === lang ? "#6357E8" : "transparent",
                    color: activeTab === lang ? "white" : fg,
                    border: `1px solid ${activeTab === lang ? "#6357E8" : borderColor}`,
                  }}
                >
                  {lang === "js" ? "JavaScript/TS" : lang === "python" ? "Python" : "cURL"}
                </button>
              ))}
            </div>

            <div style={{ position: "relative" }}>
              <div className="flex items-center justify-between mb-2" style={{ padding: "0 12px" }}>
                <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: sub }}>Example request</span>
                <button
                  onClick={() => copyCode(codeExamples[activeTab])}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: copied === codeExamples[activeTab] ? "rgba(34,194,125,0.15)" : "transparent",
                    color: copied === codeExamples[activeTab] ? "#22C27D" : sub,
                    border: `1px solid ${copied === codeExamples[activeTab] ? "#22C27D" : borderColor}`,
                  }}
                >
                  {copied === codeExamples[activeTab] ? <CheckCircle size={12} /> : <Copy size={12} />}
                  {copied === codeExamples[activeTab] ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre style={{ padding: 20, background: "#0E0E0C", borderRadius: 12, overflow: "auto", border: `1px solid ${borderColor}` }}>
                <code style={{ fontFamily: "'Geist Mono', monospace", fontSize: 13, lineHeight: 1.6, color: "#E8E8E0" }}>{codeExamples[activeTab]}</code>
              </pre>
            </div>
          </FadeUp>

          <FadeUp delay={0.2} style={{ marginTop: 48 }}>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: FileCode, title: "TypeScript SDK", desc: "Fully typed, tree-shakeable, React hooks included", link: "https://github.com/noteflow/sdk-js", color: "#3178C6" },
                { icon: Terminal, title: "Python SDK", desc: "Async first, Pydantic models, Jupyter friendly", link: "https://github.com/noteflow/sdk-python", color: "#3776AB" },
                { icon: Globe, title: "GraphQL Explorer", desc: "Interactive schema, auto-complete, persisted queries", link: "https://api.noteflow.io/graphql", color: "#E10098" },
                { icon: ZapIcon, title: "Realtime Subscriptions", desc: "WebSocket + Server-Sent Events, presence, cursors", link: "/docs/realtime", color: "#F59E0B" },
                { icon: Database, title: "Postman Collection", desc: "All endpoints, environments, test scripts", link: "https://github.com/noteflow/postman", color: "#FF6C37" },
                { icon: BookOpen, title: "OpenAPI Spec", desc: "Generate clients in 50+ languages", link: "https://api.noteflow.io/openapi.json", color: "#8A4CF8" },
              ].map((item, i) => (
                <FadeUp key={item.title} delay={i * 0.06}>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="group flex flex-col h-full"
                    style={{ padding: 24, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16, textDecoration: "none" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = item.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${item.color}40`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = borderColor; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: `${item.color}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                      <item.icon size={22} style={{ color: item.color }} />
                    </div>
                    <h4 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg, marginBottom: 6 }}>{item.title}</h4>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.6, flex: 1 }}>{item.desc}</p>
                    <div className="flex items-center gap-2 mt-4" style={{ color: item.color }}>
                      <ExternalLink size={14} /> View docs
                    </div>
                  </a>
                </FadeUp>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <section style={{ padding: "140px 0", background: dark ? "#0E0E0C" : "#F7F6F2", overflow: "hidden", position: "relative" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,0.025)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.025)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative">
          <RevealLine><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: fg, lineHeight: 0.92 }}>Build with</div></RevealLine>
          <RevealLine delay={0.1}><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: "#6357E8", lineHeight: 0.92 }}>our API.</div></RevealLine>
          <FadeUp delay={0.25}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: sub, maxWidth: 440, margin: "28px auto 40px", lineHeight: 1.65 }}>Free tier: 100k requests/month. No credit card.</p></FadeUp>
          <FadeUp delay={0.35} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://github.com/noteflow/sdk-js" target="_blank" rel="noopener noreferrer" className="rounded-full flex items-center gap-2 group transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", background: "#6357E8", color: "white", textDecoration: "none" }}>
              <Github size={15} /> View SDK on GitHub
            </a>
            <Link to="/docs/api" className="rounded-full transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(14,14,12,0.14)"}`, color: fg, textDecoration: "none" }}>
              Read API docs
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