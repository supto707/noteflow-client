import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import {
  PenLine, ArrowRight, ChevronRight, Shield, Lock, CheckCircle, AlertCircle, XCircle, Info, FileText, ExternalLink, Download, Key, Search, Eye, EyeOff, Trash2, History, Share2, Cpu, Server, Wifi, Smartphone, Monitor, Zap, Sparkles, Heart, Coffee, Code, BookOpen, Calendar, MapPin, Briefcase, DollarSign, Award, Star, Send, Copy, Github, Twitter, Globe, Wifi as WifiIcon, Bluetooth, Usb, MonitorSmartphone, HardDrive, Layers, Settings, SlidersHorizontal, ToggleLeft, ToggleRight, User, Hash, Fingerprint, Bug, BadgePercent, ClipboardCheck, BarChart, Network, Database, Laptop, Smartphone as PhoneIcon, Globe as GlobeIcon, Cloud, Command, Terminal, Key as KeyIcon, Unlock, Scan, Bell, AlertTriangle, RotateCcw, RefreshCw, Lock as LockIcon, Unlock as UnlockIcon, ShieldCheck, ShieldAlert, ShieldOff, Hash as HashIcon, FileCheck, FileAlert, FileWarning, FileCheck2, FileMinus, FilePlus, FileText as FileTextIcon, FileCode, FileJson, FileSpreadsheet, FileImage, FileVideo, FileAudio, FileArchive, FileSignature, FileLock, FileUnlock, FileKey, FileQuestion, FileCheck as FileCheckIcon
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

const badges = [
  { name: "SOC 2 Type II", desc: "Annual audit. Security, availability, confidentiality.", issuer: "AICPA", color: "#6357E8" },
  { name: "ISO 27001", desc: "Information security management system certified.", issuer: "BSI", color: "#22C27D" },
  { name: "GDPR Compliant", desc: "EU data protection regulation. DPA available.", issuer: "EU", color: "#F59E0B" },
  { name: "CCPA Ready", desc: "California Consumer Privacy Act compliance.", issuer: "CA", color: "#EC4899" },
  { name: "HIPAA Eligible", desc: "BAA available on Enterprise. Healthcare workloads.", issuer: "HHS", color: "#8B5CF6" },
  { name: "Pen Tested", desc: "Annual third-party penetration testing. Bug bounty.", issuer: "HackerOne", color: "#EF4444" },
];

const features = [
  { icon: LockIcon, title: "Encryption everywhere", desc: "TLS 1.3 in transit. AES-256 at rest. Per-workspace keys. Database encryption. File storage encrypted. Key rotation quarterly." },
  { icon: KeyIcon, title: "Auth that works", desc: "bcrypt (cost 12) + Argon2. TOTP, WebAuthn (YubiKey, Touch ID), magic links, SAML/OIDC SSO (Enterprise). Session rotation, device management, brute-force protection." },
  { icon: Network, title: "Network security", desc: "VPC isolation. WAF + DDoS (Cloudflare). Private subnets. No public DB access. Egress filtering. mTLS between services. Zero-trust networking." },
  { icon: Database, title: "Data protection", desc: "PostgreSQL with row-level security. Automated backups (point-in-time recovery). Cross-region replication. Encrypted snapshots. 90-day backup retention." },
  { icon: Code, title: "Secure development", desc: "SAST/DAST in CI. Dependency scanning (Dependabot + Snyk). SBOM generation. Signed releases. Reproducible builds. No secrets in code." },
  { icon: Bug, title: "Vulnerability management", desc: "Bug bounty on HackerOne ($10k max). 24h SLA for critical. Coordinated disclosure. Public security.txt. Annual pen test by Cure53." },
  { icon: BadgePercent, title: "Compliance & audits", desc: "SOC 2 Type II (annual). ISO 27001. GDPR, CCPA, HIPAA eligible. Vendor risk assessments. DPA on request. Subprocessor list public." },
  { icon: RotateCcw, title: "Incident response", desc: "24/7 on-call. Runbooks for top 20 scenarios. Public status page. Postmortems published. Customer notification within 72h (GDPR)." },
  { icon: Cloud, title: "Infrastructure", desc: "AWS (US/EU/APAC) + Cloudflare. Immutable infrastructure (Terraform). GitOps (ArgoCD). Chaos engineering quarterly. Multi-AZ, multi-region." },
];

const enterprise = [
  { title: "SAML / OIDC SSO", desc: "Okta, Entra ID, Google, JumpCloud, custom. JIT provisioning (SCIM). Attribute mapping. Session control." },
  { title: "SCIM Provisioning", desc: "Automated user/group sync. Okta, Entra ID, Rippling, Workday. Deprovision on offboard." },
  { title: "Audit Logs", desc: "Immutable event stream. 1+ year retention. SIEM export (Splunk, Datadog, Sentinel). Real-time webhooks." },
  { title: "Data Residency", desc: "Choose region: US, EU, APAC. Dedicated tenancy option. No cross-region replication unless enabled." },
  { title: "Dedicated Support", desc: "Named CSM. 4h SLA. Slack connect. Quarterly business reviews. Custom onboarding." },
  { title: "Custom Contracts", desc: "MSA, DPA, BAA, NDA. Redlines welcome. Liability caps negotiable. Payment terms: Net 30/60." },
];

export default function Security() {
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
              <div className="w-1.5 h-1.5 rounded-full bg-[#6357E8]" /> SOC 2 • ISO 27001 • GDPR • Encrypted end-to-end <ChevronRight size={13} />
            </div>
          </FadeUp>

          <div className="mb-8" style={{ lineHeight: 0.92 }}>
            <RevealLine delay={0.1}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95 }}>Security</h1>
            </RevealLine>
            <RevealLine delay={0.18}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#6357E8", lineHeight: 0.95, marginTop: "0.06em" }}>by design</h1>
            </RevealLine>
          </div>

          <FadeUp delay={0.42}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2vw, 1.25rem)", color: sub, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
              Not a checkbox exercise. Security is how we build. Every layer. Every day.
            </p>
          </FadeUp>
        </motion.div>
      </section>

      <section style={{ padding: "60px 0 100px", background: bg }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp className="flex items-center justify-center gap-3 mb-16">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Certifications & Standards</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {badges.map((b, i) => (
                <FadeUp key={b.name} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    style={{ padding: 28, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16, borderLeft: `4px solid ${b.color}` }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div style={{ width: 48, height: 48, borderRadius: 12, background: `${b.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <ShieldCheck size={22} style={{ color: b.color }} />
                      </div>
                      <div>
                        <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg }}>{b.name}</h3>
                        <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: sub }}>{b.issuer}</span>
                      </div>
                    </div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.6 }}>{b.desc}</p>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <section style={{ padding: "100px 0", background: dark ? "#0E0E0C" : "#F7F6F2" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp className="flex items-center justify-center gap-3 mb-16">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Security features</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>
          <RevealLine>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95, marginBottom: "0.12em", textAlign: "center" }}>Built in, not bolted on</h2>
          </RevealLine>

          <FadeUp delay={0.2}>
            <div className="grid lg:grid-cols-3 gap-6" style={{ marginTop: 32 }}>
              {features.map((f, i) => (
                <FadeUp key={f.title} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    style={{ padding: 28, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16 }}
                  >
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: "#6357E818", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                      <f.icon size={24} style={{ color: "#6357E8" }} />
                    </div>
                    <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg, marginBottom: 8 }}>{f.title}</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.6 }}>{f.desc}</p>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <section style={{ padding: "100px 0", background: bg }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp className="flex items-center justify-center gap-3 mb-16">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Enterprise ready</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>
          <RevealLine>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95, marginBottom: "0.12em", textAlign: "center" }}>Features for teams that need more control</h2>
          </RevealLine>

          <FadeUp delay={0.2}>
            <div className="grid lg:grid-cols-2 gap-6" style={{ marginTop: 32 }}>
              {enterprise.map((e, i) => (
                <FadeUp key={e.title} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    style={{ padding: 28, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16 }}
                  >
                    <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg, marginBottom: 8 }}>{e.title}</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.6 }}>{e.desc}</p>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.3} className="text-center mt-12">
            <a href="mailto:enterprise@noteflow.io" className="inline-flex items-center gap-2 rounded-full"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "14px 32px", background: "#6357E8", color: "white", textDecoration: "none" }}>
              <Mail size={15} /> Contact enterprise sales
            </a>
          </FadeUp>
        </div>
      </section>

      <section style={{ padding: "100px 0", background: dark ? "#0E0E0C" : "#F7F6F2" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <FadeUp className="flex items-center justify-center gap-3 mb-12">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Responsible disclosure</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>
          <RevealLine>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95, marginBottom: "0.12em", textAlign: "center" }}>Found something? Tell us.</h2>
          </RevealLine>

          <FadeUp delay={0.2}>
            <div className="grid md:grid-cols-2 gap-8" style={{ marginTop: 32 }}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                style={{ padding: 28, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16, borderLeft: "4px solid #6357E8" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "#6357E818", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ShieldCheck size={22} style={{ color: "#6357E8" }} />
                  </div>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 700, color: fg }}>Report a vulnerability</h3>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: sub, lineHeight: 1.7, marginBottom: 16 }}>
                  Email <a href="mailto:security@noteflow.io" style={{ color: "#6357E8" }}>security@noteflow.io</a> or submit via <a href="https://hackerone.com/noteflow" target="_blank" rel="noopener noreferrer" style={{ color: "#6357E8" }}>HackerOne</a>.
                </p>
                <ul style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.8, paddingLeft: 20 }}>
                  <li>Include steps to reproduce, impact, and any PoC.</li>
                  <li>We triage within 24h. Critical: 4h.</li>
                  <li>Coordinated disclosure: we'll agree on timeline.</li>
                  <li>Bounty: up to $10,000 for critical RCE/auth bypass.</li>
                </ul>
              </motion.div>

              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                style={{ padding: 28, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16, borderLeft: "4px solid #22C27D" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "#22C27D18", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ShieldCheck size={22} style={{ color: "#22C27D" }} />
                  </div>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 700, color: fg }}>Our commitments</h3>
                </div>
                <ul style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.8, paddingLeft: 20 }}>
                  <li>No legal action for good-faith research.</li>
                  <li>Safe harbor for testing on staging env.</li>
                  <li>Credit in Hall of Fame (with permission).</li>
                  <li>Swag for valid reports (hoodie, stickers).</li>
                  <li>Transparency: we publish summary post-fix.</li>
                </ul>
              </motion.div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section style={{ padding: "140px 0", background: dark ? "#0E0E0C" : "#F7F6F2", overflow: "hidden", position: "relative" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,0.025)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.025)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative">
          <RevealLine><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: fg, lineHeight: 0.92 }}>Trust earned.</div></RevealLine>
          <RevealLine delay={0.1}><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: "#6357E8", lineHeight: 0.92 }}>Daily.</div></RevealLine>
          <FadeUp delay={0.25}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: sub, maxWidth: 440, margin: "28px auto 40px", lineHeight: 1.65 }}>SOC 2. ISO 27001. Encrypted. Audited. Transparent.</p></FadeUp>
          <FadeUp delay={0.35} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="mailto:security@noteflow.io" className="rounded-full flex items-center gap-2 group transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", background: "#6357E8", color: "white", textDecoration: "none" }}>
              <Mail size={15} /> security@noteflow.io
            </a>
            <a href="https://hackerone.com/noteflow" target="_blank" rel="noopener noreferrer" className="rounded-full transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(14,14,12,0.14)"}`, color: fg, textDecoration: "none" }}>
              <Bug size={15} /> Bug bounty
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