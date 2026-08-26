import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import {
  PenLine, ArrowRight, ChevronRight, CheckCircle, AlertCircle, XCircle, Circle, Zap, Database, Globe, Wifi, Server, HardDrive, Cpu, Monitor, Users, Shield, Clock, Github, Twitter, Mail, ExternalLink
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

const services = [
  { name: "API", status: "operational", latency: "42ms", uptime: "99.99%", description: "REST & GraphQL endpoints, webhooks, real-time subscriptions" },
  { name: "Real-time Sync", status: "operational", latency: "18ms", uptime: "99.98%", description: "CRDT-based collaboration, presence, cursors, live updates" },
  { name: "Database", status: "operational", latency: "8ms", uptime: "99.99%", description: "PostgreSQL clusters, automated backups, point-in-time recovery" },
  { name: "File Storage", status: "operational", latency: "23ms", uptime: "99.97%", description: "S3-compatible, CDN delivery, image transformation, virus scan" },
  { name: "Authentication", status: "operational", latency: "12ms", uptime: "99.99%", description: "OAuth, SAML, OIDC, magic links, MFA, session management" },
  { name: "Search", status: "operational", latency: "31ms", uptime: "99.95%", description: "Full-text, filters, faceted search, autocomplete" },
  { name: "Web App", status: "operational", latency: "—", uptime: "99.98%", description: "Global CDN, edge caching, PWA service worker" },
  { name: "Mobile Apps", status: "operational", latency: "—", uptime: "99.99%", description: "iOS, Android, push notifications, offline sync" },
  { name: "Desktop Apps", status: "operational", latency: "—", uptime: "99.99%", description: "macOS, Windows, Linux, auto-updates, native menus" },
];

const incidents = [
  { date: "2025-01-15", time: "14:22 UTC", title: "Elevated API latency in us-east-1", severity: "minor", duration: "23 min", status: "resolved", description: "Network congestion affected 2% of requests. Mitigated by traffic shift." },
  { date: "2025-01-08", time: "03:10 UTC", title: "Real-time sync delays for EU users", severity: "major", duration: "1h 12m", status: "resolved", description: "WebSocket connection pool exhaustion. Scaled horizontally, added monitoring." },
  { date: "2024-12-28", time: "22:45 UTC", title: "Scheduled maintenance: database upgrade", severity: "maintenance", duration: "45 min", status: "completed", description: "PostgreSQL 16 upgrade. Zero data loss. All systems healthy post-maintenance." },
  { date: "2024-12-12", time: "09:30 UTC", title: "File upload failures (intermittent)", severity: "minor", duration: "38 min", status: "resolved", description: "S3 multipart upload timeout. Increased limits, improved retry logic." },
  { date: "2024-11-30", time: "18:15 UTC", title: "Search index degradation", severity: "major", duration: "2h 8m", status: "resolved", description: "Elasticsearch cluster split-brain. Restored from snapshot, added quorum config." },
];

const statusConfig = {
  operational: { label: "Operational", color: "#22C27D", Icon: CheckCircle, bg: "rgba(34,194,125,0.12)" },
  degraded: { label: "Degraded", color: "#F59E0B", Icon: AlertCircle, bg: "rgba(245,158,11,0.12)" },
  outage: { label: "Outage", color: "#EF4444", Icon: XCircle, bg: "rgba(239,68,68,0.12)" },
  maintenance: { label: "Maintenance", color: "#6357E8", Icon: Circle, bg: "rgba(99,87,232,0.12)" },
  minor: { label: "Minor", color: "#F59E0B", Icon: AlertCircle, bg: "rgba(245,158,11,0.12)" },
  major: { label: "Major", color: "#EF4444", Icon: XCircle, bg: "rgba(239,68,68,0.12)" },
};

export default function Status() {
  const { dark } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const cardBg = dark ? "#141412" : "#FFFFFF";
  const borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(14,14,12,0.09)";
  const bg = dark ? "#0A0A08" : "#F7F6F2";

  const allOperational = services.every(s => s.status === "operational");

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
              <div className="w-1.5 h-1.5 rounded-full bg-[#6357E8]" /> Real-time infrastructure health <ChevronRight size={13} />
            </div>
          </FadeUp>

          <div className="mb-8" style={{ lineHeight: 0.92 }}>
            <RevealLine delay={0.1}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95 }}>System</h1>
            </RevealLine>
            <RevealLine delay={0.18}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#6357E8", lineHeight: 0.95, marginTop: "0.06em" }}>Status</h1>
            </RevealLine>
          </div>

          <FadeUp delay={0.42}>
            <div className="inline-flex items-center gap-3" style={{ padding: "16px 32px", borderRadius: 9999, background: allOperational ? "rgba(34,194,125,0.12)" : "rgba(239,68,68,0.12)", border: `1px solid ${allOperational ? "rgba(34,194,125,0.3)" : "rgba(239,68,68,0.3)"}` }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: allOperational ? "#22C27D" : "#EF4444", animation: allOperational ? "pulse 2s infinite" : "none" }} />
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 700, color: allOperational ? "#22C27D" : "#EF4444" }}>
                {allOperational ? "All systems operational" : "Degraded performance"}
              </span>
            </div>
          </FadeUp>
        </motion.div>
      </section>

      <section style={{ padding: "60px 0 100px", background: bg }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <FadeUp key={svc.name} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  style={{ padding: 24, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16 }}
                >
<div className="flex items-center gap-3 mb-4">
                        <div style={{ width: 48, height: 48, borderRadius: 12, background: statusConfig[svc.status as keyof typeof statusConfig].bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {(() => {
                            const Icon = statusConfig[svc.status as keyof typeof statusConfig].Icon;
                            return <Icon size={20} style={{ color: statusConfig[svc.status as keyof typeof statusConfig].color }} />;
                          })()}
                        </div>
                        <div className="flex-1">
                          <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg }}>{svc.name}</h3>
                          <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, fontWeight: 600, color: statusConfig[svc.status as keyof typeof statusConfig].color, background: statusConfig[svc.status as keyof typeof statusConfig].bg, padding: "2px 8px", borderRadius: 9999, textTransform: "uppercase" }}>{statusConfig[svc.status as keyof typeof statusConfig].label}</span>
                        </div>
                      </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub, lineHeight: 1.6, marginBottom: 16 }}>{svc.description}</p>
                  <div className="grid grid-cols-2 gap-3" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
                    <div style={{ padding: "8px", background: dark ? "rgba(255,255,255,0.04)" : "rgba(14,14,12,0.04)", borderRadius: 8 }}>
                      <div style={{ color: sub, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Latency</div>
                      <div style={{ color: fg, fontWeight: 500 }}>{svc.latency}</div>
                    </div>
                    <div style={{ padding: "8px", background: dark ? "rgba(255,255,255,0.04)" : "rgba(14,14,12,0.04)", borderRadius: 8 }}>
                      <div style={{ color: sub, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Uptime (90d)</div>
                      <div style={{ color: fg, fontWeight: 500 }}>{svc.uptime}</div>
                    </div>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 0", background: dark ? "#0E0E0C" : "#F7F6F2" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp className="flex items-center justify-center gap-3 mb-12">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Incident history</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>
          <RevealLine>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95, marginBottom: "0.12em", textAlign: "center" }}>Transparency builds trust</h2>
          </RevealLine>

          <FadeUp delay={0.2}>
            <div className="space-y-4" style={{ marginTop: 32 }}>
              {incidents.map((inc, i) => (
                <FadeUp key={inc.date} delay={i * 0.06}>
                  <motion.div
                    style={{ padding: 24, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16, borderLeft: `4px solid ${statusConfig[inc.severity as keyof typeof statusConfig].color}` }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg }}>{inc.title}</span>
                          <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, fontWeight: 600, color: statusConfig[inc.severity as keyof typeof statusConfig].color, background: statusConfig[inc.severity as keyof typeof statusConfig].bg, padding: "2px 8px", borderRadius: 9999, textTransform: "uppercase" }}>{statusConfig[inc.severity as keyof typeof statusConfig].label}</span>
                          <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, color: sub }}>{inc.date} · {inc.time}</span>
                        </div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub }}>{inc.description}</div>
                      </div>
                      <div className="flex items-center gap-4" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
                        <span style={{ color: sub }}>{inc.duration}</span>
                        <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, fontWeight: 600, color: statusConfig[inc.status as keyof typeof statusConfig]?.color || "#22C27D", background: statusConfig[inc.status as keyof typeof statusConfig]?.bg || "rgba(34,194,125,0.12)", padding: "2px 8px", borderRadius: 9999, textTransform: "uppercase" }}>{inc.status}</span>
                      </div>
                    </div>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <section style={{ padding: "100px 0", background: bg }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <FadeUp className="flex items-center justify-center gap-3 mb-12">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Subscribe to updates</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>
          <RevealLine>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95, marginBottom: "0.12em" }}>Get notified instantly</h2>
          </RevealLine>
          <FadeUp delay={0.2}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: sub, maxWidth: 500, margin: "24px auto 32px", lineHeight: 1.6 }}>Email, Slack, webhook, or RSS — choose how you stay informed.</p>
          </FadeUp>
          <FadeUp delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="mailto:status@noteflow.io?subject=Subscribe%20to%20status%20updates" className="inline-flex items-center gap-2 rounded-full"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "14px 32px", background: "#6357E8", color: "white", textDecoration: "none" }}>
              <Mail size={16} /> Email updates
            </a>
            <a href="https://twitter.com/noteflowstatus" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "14px 32px", border: `1px solid ${borderColor}`, color: fg, textDecoration: "none" }}>
              <Twitter size={16} /> Follow @noteflowstatus
            </a>
            <a href="https://status.noteflow.io/rss" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "14px 32px", border: `1px solid ${borderColor}`, color: fg, textDecoration: "none" }}>
              <ExternalLink size={16} /> RSS feed
            </a>
            <a href="https://status.noteflow.io/webhooks" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "14px 32px", border: `1px solid ${borderColor}`, color: fg, textDecoration: "none" }}>
              <Zap size={16} /> Webhooks
            </a>
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