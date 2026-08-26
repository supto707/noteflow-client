import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import {
  PenLine, ArrowRight, ChevronRight, Mail, Shield, Database, Users, Globe, FileText, Clock, Check, X, AlertCircle, Info, ExternalLink, Download, Key, Lock, Search, Eye, EyeOff, Trash2, History, Share2, Cpu, Server, Wifi, Smartphone, Monitor, Zap, Sparkles, Heart, Coffee, Code, BookOpen, Calendar, MapPin, Briefcase, DollarSign, Award, Star, Send, Copy, Github, Twitter
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

const lastUpdated = "January 15, 2025";

const sections = [
  { id: "summary", title: "TL;DR", icon: Info, content: (
    <>
      <p><strong>Your data is yours.</strong> We don't sell it. We don't mine it for ads. We don't train AI on it without your explicit consent.</p>
      <p>We collect only what's needed to run NoteFlow: account info, your content, usage data for performance, and crash reports. All encrypted. All deletable.</p>
      <p>You own everything you create. Export anytime. Delete anytime. No lock-in.</p>
    </>
  )},
  { id: "collect", title: "What we collect", icon: Database, content: (
    <>
      <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, marginTop: 24, marginBottom: 12 }}>Account & profile</h3>
      <ul style={{ marginBottom: 16, paddingLeft: 20 }}>
        <li>Email, name, avatar (if you provide)</li>
        <li>Authentication tokens, password hash (bcrypt)</li>
        <li>Preferences: theme, language, shortcuts</li>
      </ul>
      <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, marginTop: 24, marginBottom: 12 }}>Your content</h3>
      <ul style={{ marginBottom: 16, paddingLeft: 20 }}>
        <li>Pages, databases, blocks, comments</li>
        <li>File uploads, embeds, links</li>
        <li>Workspace membership, permissions</li>
      </ul>
      <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, marginTop: 24, marginBottom: 12 }}>Usage & analytics</h3>
      <ul style={{ marginBottom: 16, paddingLeft: 20 }}>
        <li>Feature adoption (anonymous, aggregated)</li>
        <li>Performance metrics: latency, errors, crash reports</li>
        <li>Device/browser info for compatibility</li>
      </ul>
      <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, marginTop: 24, marginBottom: 12 }}>What we DON'T collect</h3>
      <ul style={{ marginBottom: 16, paddingLeft: 20 }}>
        <li>Keystrokes, clipboard, screen recordings</li>
        <li>Location (beyond coarse IP geo)</li>
        <li>Contacts, calendar, other app data</li>
        <li>Content for ad targeting or AI training (opt-in only)</li>
      </ul>
    </>
  )},
  { id: "use", title: "How we use it", icon: Cpu, content: (
    <>
      <ul style={{ paddingLeft: 20 }}>
        <li><strong>Provide the service:</strong> Sync, collaborate, search, backup, notify.</li>
        <li><strong>Improve NoteFlow:</strong> Fix bugs, optimize performance, prioritize features.</li>
        <li><strong>Security:</strong> Detect abuse, fraud, unauthorized access.</li>
        <li><strong>Communicate:</strong> Transactional emails (billing, security, updates). Marketing only if you opt in.</li>
        <li><strong>Legal:</strong> Comply with law, enforce terms, protect rights.</li>
      </ul>
      <p style={{ marginTop: 16 }}>We never sell your data. No third-party ad networks. No data brokers.</p>
    </>
  )},
  { id: "sharing", title: "Sharing & disclosure", icon: Share2, content: (
    <>
      <p>We share data only in these cases:</p>
      <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
        <li><strong>With your consent:</strong> Public publishing, workspace invites, integrations you enable.</li>
        <li><strong>Subprocessors:</strong> Infrastructure (AWS, Cloudflare), email (Resend), payments (Stripe), analytics (Plausible — privacy-friendly, no cookies). All under DPAs.</li>
        <li><strong>Legal requests:</strong> Valid court order, subpoena, or government request. We notify you unless legally prohibited.</li>
        <li><strong>Business transfers:</strong> Merger, acquisition, bankruptcy. You'll be notified; your rights unchanged.</li>
      </ul>
      <p>Full subprocessors list: <a href="/subprocessors" style={{ color: "#6357E8" }}>noteflow.io/subprocessors</a></p>
    </>
  )},
  { id: "security", title: "Security", icon: Shield, content: (
    <>
      <ul style={{ paddingLeft: 20 }}>
        <li><strong>Encryption:</strong> TLS 1.3 in transit. AES-256 at rest. Database encryption. File storage encrypted.</li>
        <li><strong>Auth:</strong> bcrypt (cost 12), TOTP, WebAuthn, SAML/OIDC (Enterprise). Session rotation, device management.</li>
        <li><strong>Infrastructure:</strong> SOC 2 Type II, ISO 27001. VPC isolation. WAF, DDoS protection. Pen tests annually.</li>
        <li><strong>Access:</strong> Least privilege. Zero-trust. Audit logs. No backdoors.</li>
        <li><strong>Incident response:</strong> 24/7 monitoring. <a href="/security" style={{ color: "#6357E8" }}>Security page</a> for reporting.</li>
      </ul>
    </>
  )},
  { id: "retention", title: "Retention & deletion", icon: Trash2, content: (
    <>
      <ul style={{ paddingLeft: 20 }}>
        <li><strong>Active accounts:</strong> Data kept while account exists.</li>
        <li><strong>Deletion request:</strong> Full purge within 30 days. Backups expired in 90 days.</li>
        <li><strong>Inactive free accounts:</strong> After 2 years of no login, we email 3× over 6 months before deletion.</li>
        <li><strong>Paid accounts:</strong> Kept until subscription ends + 30 days grace.</li>
        <li><strong>Legal holds:</strong> Preserved only as required by law.</li>
      </ul>
      <p style={{ marginTop: 16 }}>Request deletion: <a href="mailto:privacy@noteflow.io" style={{ color: "#6357E8" }}>privacy@noteflow.io</a> or Settings → Danger Zone.</p>
    </>
  )},
  { id: "rights", title: "Your rights (GDPR, CCPA)", icon: Check, content: (
    <>
      <p>You have the right to:</p>
      <ul style={{ paddingLeft: 20 }}>
        <li><strong>Access:</strong> Get a copy of all data we hold (Settings → Export).</li>
        <li><strong>Rectify:</strong> Edit profile, content, preferences anytime.</li>
        <li><strong>Erase:</strong> Delete account or specific data.</li>
        <li><strong>Restrict:</strong> Pause processing (e.g., disable analytics).</li>
        <li><strong>Portability:</strong> Machine-readable export (JSON, Markdown, CSV).</li>
        <li><strong>Object:</strong> Opt out of analytics, marketing, profiling.</li>
        <li><strong>Complain:</strong> Contact our DPO or your local authority.</li>
      </ul>
      <p style={{ marginTop: 16 }}>DPO: <a href="mailto:dpo@noteflow.io" style={{ color: "#6357E8" }}>dpo@noteflow.io</a></p>
    </>
  )},
  { id: "international", title: "International transfers", icon: Globe, content: (
    <>
      <p>NoteFlow runs on AWS (US, EU, APAC). Your data stays in the region you choose (or closest to you).</p>
      <ul style={{ paddingLeft: 20, marginTop: 16 }}>
        <li><strong>EU/UK:</strong> Frankfurt, London, Paris. Standard Contractual Clauses + UK Addendum.</li>
        <li><strong>US:</strong> Virginia, Oregon. EU-US Data Privacy Framework certified.</li>
        <li><strong>Enterprise:</strong> Dedicated region, data residency guarantees.</li>
      </ul>
    </>
  )},
  { id: "cookies", title: "Cookies & tracking", icon: Eye, content: (
    <>
      <p>We use minimal, privacy-friendly cookies:</p>
      <ul style={{ paddingLeft: 20, marginTop: 16 }}>
        <li><strong>Essential (always on):</strong> Session, auth, CSRF, preferences. No consent needed.</li>
        <li><strong>Analytics (opt-in):</strong> Plausible — lightweight, no cookies, no personal data. <a href="/cookie-policy" style={{ color: "#6357E8" }}>Full cookie policy</a>.</li>
        <li><strong>No:</strong> Advertising, fingerprinting, third-party trackers, session replay.</li>
      </ul>
    </>
  )},
  { id: "children", title: "Children's privacy", icon: AlertCircle, content: (
    <p>NoteFlow is not directed at children under 13 (or 16 in EU). We don't knowingly collect their data. If you believe we have, contact <a href="mailto:privacy@noteflow.io" style={{ color: "#6357E8" }}>privacy@noteflow.io</a>.</p>
  )},
  { id: "changes", title: "Changes to this policy", icon: History, content: (
    <p>We'll notify you of material changes via email and in-app banner 30 days before they take effect. Continued use = acceptance. Version history on <a href="https://github.com/noteflow/policies" target="_blank" rel="noopener noreferrer" style={{ color: "#6357E8" }}>GitHub</a>.</p>
  )},
  { id: "contact", title: "Contact us", icon: Mail, content: (
    <>
      <p>Questions, requests, complaints:</p>
      <ul style={{ paddingLeft: 20, marginTop: 16 }}>
        <li>Email: <a href="mailto:privacy@noteflow.io" style={{ color: "#6357E8" }}>privacy@noteflow.io</a></li>
        <li>DPO: <a href="mailto:dpo@noteflow.io" style={{ color: "#6357E8" }}>dpo@noteflow.io</a></li>
        <li>Post: NoteFlow, Inc., 548 Market St #12345, San Francisco, CA 94104, USA</li>
      </ul>
      <p style={{ marginTop: 16 }}>We respond within 30 days (GDPR) / 45 days (CCPA).</p>
    </>
  )},
];

export default function Privacy() {
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
              <div className="w-1.5 h-1.5 rounded-full bg-[#6357E8]" /> Plain English. No legalese. <ChevronRight size={13} />
            </div>
          </FadeUp>

          <div className="mb-8" style={{ lineHeight: 0.92 }}>
            <RevealLine delay={0.1}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95 }}>Privacy</h1>
            </RevealLine>
            <RevealLine delay={0.18}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#6357E8", lineHeight: 0.95, marginTop: "0.06em" }}>Policy</h1>
            </RevealLine>
          </div>

          <FadeUp delay={0.42}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2vw, 1.25rem)", color: sub, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
              Last updated {lastUpdated}. Your data. Your rights. Your control.
            </p>
          </FadeUp>
        </motion.div>
      </section>

      <section style={{ padding: "100px 0", background: bg }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-4 gap-8">
            <FadeUp className="lg:col-span-1">
              <nav style={{ position: "sticky", top: 100 }}>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, fontWeight: 600, color: "#6357E8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Sections</div>
                <ul className="space-y-2">
                  {sections.map((s, i) => (
                    <FadeUp key={s.id} delay={i * 0.04}>
                      <a href={`#${s.id}`} style={{ display: "block", padding: "10px 12px", borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, textDecoration: "none", transition: "all 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.color = fg; e.currentTarget.style.background = dark ? "rgba(255,255,255,0.04)" : "rgba(14,14,12,0.04)"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = sub; e.currentTarget.style.background = "transparent"; }}>
                        {s.title}
                      </a>
                    </FadeUp>
                  ))}
                </ul>
              </nav>
            </FadeUp>

            <FadeUp delay={0.1} className="lg:col-span-3">
              <div className="space-y-20">
                {sections.map((s, i) => (
                  <FadeUp key={s.id} delay={i * 0.05}>
                    <div id={s.id} style={{ marginBottom: 48 }}>
                      <div className="flex items-center gap-3 mb-6">
                        <div style={{ width: 48, height: 48, borderRadius: 12, background: "#6357E818", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <s.icon size={22} style={{ color: "#6357E8" }} />
                        </div>
                        <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 800, color: fg }}>{s.title}</h2>
                      </div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: sub, lineHeight: 1.8 }}>{s.content}</div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section style={{ padding: "140px 0", background: dark ? "#0E0E0C" : "#F7F6F2", overflow: "hidden", position: "relative" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,0.025)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.025)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative">
          <RevealLine><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: fg, lineHeight: 0.92 }}>Questions?</div></RevealLine>
          <RevealLine delay={0.1}><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: "#6357E8", lineHeight: 0.92 }}>Email us.</div></RevealLine>
          <FadeUp delay={0.25}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: sub, maxWidth: 440, margin: "28px auto 40px", lineHeight: 1.65 }}>dpo@noteflow.io · privacy@noteflow.io</p></FadeUp>
          <FadeUp delay={0.35} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="mailto:privacy@noteflow.io" className="rounded-full flex items-center gap-2 group transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", background: "#6357E8", color: "white", textDecoration: "none" }}>
              <Mail size={15} /> Email privacy team
            </a>
            <Link to="/terms" className="rounded-full transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(14,14,12,0.14)"}`, color: fg, textDecoration: "none" }}>
              Read Terms of Service
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