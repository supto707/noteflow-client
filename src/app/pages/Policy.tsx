import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import {
  ArrowRight, ChevronRight, Shield, Cookie, FileText, Lock, Scale, Globe, Clock, Mail, Check, Download
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import Navbar from "../components/Navbar";
import Logo from "../components/Logo";

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

const policies = [
  {
    to: "/privacy",
    icon: Shield,
    color: "#6357E8",
    title: "Privacy Policy",
    desc: "What we collect, why, and how to export or delete everything. Your data stays yours.",
    summary: "Data collection, usage, sharing, retention, GDPR/CCPA rights.",
  },
  {
    to: "/terms",
    icon: Scale,
    color: "#22C27D",
    title: "Terms of Service",
    desc: "The agreement between you and NoteFlow. Fair, readable, no dark patterns.",
    summary: "Accounts, content ownership, acceptable use, liability, termination.",
  },
  {
    to: "/cookie-policy",
    icon: Cookie,
    color: "#F59E0B",
    title: "Cookie Policy",
    desc: "Every cookie we set, its purpose, and expiry — in one honest table.",
    summary: "Essential, analytics, marketing, third-party cookies, opt-out.",
  },
  {
    to: "/security",
    icon: Lock,
    color: "#EC4899",
    title: "Security",
    desc: "How we protect your data: encryption, audits, and how to report issues.",
    summary: "Encryption, SOC 2, pen tests, responsible disclosure, status.",
  },
];

const commitments = [
  { icon: Check, title: "Plain English", desc: "No legalese. Every policy written to be read, not skimmed past." },
  { icon: Download, title: "No lock-in", desc: "Export your data anytime. Deletion honored within 30 days." },
  { icon: Globe, title: "Open policies", desc: "Version history is public. Changes announced 30 days ahead." },
  { icon: Clock, title: "Fast responses", desc: "Privacy requests answered within 30 days (GDPR) / 45 days (CCPA)." },
];

export default function Policy() {
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
      <section ref={containerRef} className="overflow-hidden" style={{ position: "relative", minHeight: "90vh", paddingTop: 140, paddingBottom: 80 }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,0.03)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.03)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px)`, backgroundSize: "72px 72px" }} />
        <div className="absolute pointer-events-none" style={{ top: -80, right: -80, width: 700, height: 700, background: "radial-gradient(circle, rgba(99,87,232,0.14) 0%, transparent 65%)", borderRadius: "50%" }} />
        <div className="absolute pointer-events-none" style={{ bottom: 0, left: -100, width: 500, height: 500, background: "radial-gradient(circle, rgba(99,87,232,0.08) 0%, transparent 65%)", borderRadius: "50%" }} />

        <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <FadeUp delay={0.05} className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border" style={{ padding: "7px 18px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: "#6357E8", background: "rgba(99,87,232,0.08)", borderColor: "rgba(99,87,232,0.22)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#6357E8]" /> All policies, one place <ChevronRight size={13} />
            </div>
          </FadeUp>

          <div className="mb-8" style={{ lineHeight: 0.92 }}>
            <RevealLine delay={0.1}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 9rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95 }}>The</h1>
            </RevealLine>
            <RevealLine delay={0.18}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 9rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#6357E8", lineHeight: 0.95, marginTop: "0.06em" }}>Policies.</h1>
            </RevealLine>
          </div>

          <FadeUp delay={0.35}>
            <p style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", color: sub, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
              Everything that governs your use of NoteFlow — written in plain English, updated {lastUpdated}. No surprises, no dark patterns.
            </p>
          </FadeUp>
        </motion.div>
      </section>

      <section style={{ padding: "100px 0", background: bg }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <FadeUp className="flex items-center justify-center gap-3 mb-12">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>The documents</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-6">
            {policies.map((p, i) => (
              <FadeUp key={p.to} delay={i * 0.07}>
                <Link to={p.to} className="group block transition-all duration-300"
                  style={{ padding: 28, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 18, textDecoration: "none" }}>
                  <div className="flex items-start justify-between mb-5">
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: `${p.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <p.icon size={24} style={{ color: p.color }} />
                    </div>
                    <ArrowRight size={18} style={{ color: sub, transition: "transform 0.3s" }} className="group-hover:translate-x-1" />
                  </div>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 800, color: fg, marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: sub, lineHeight: 1.65, marginBottom: 14 }}>{p.desc}</p>
                  <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: p.color, background: `${p.color}12`, display: "inline-block", padding: "4px 10px", borderRadius: 9999 }}>{p.summary}</p>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 0", background: dark ? "#0E0E0C" : "#F7F6F2" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <FadeUp className="flex items-center justify-center gap-3 mb-12">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Our commitments</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {commitments.map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.06}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }}
                  style={{ padding: 24, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(34,194,125,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <item.icon size={20} style={{ color: "#22C27D" }} />
                  </div>
                  <h4 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, color: fg, marginBottom: 6 }}>{item.title}</h4>
                  <p style={{ fontSize: 13, color: sub, lineHeight: 1.6 }}>{item.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "120px 0", background: bg, overflow: "hidden", position: "relative" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,0.025)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.025)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative">
          <RevealLine><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 800, letterSpacing: "-0.045em", color: fg, lineHeight: 0.92 }}>Questions?</div></RevealLine>
          <RevealLine delay={0.1}><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 800, letterSpacing: "-0.045em", color: "#6357E8", lineHeight: 0.92 }}>Ask us.</div></RevealLine>
          <FadeUp delay={0.25}><p style={{ fontSize: 17, color: sub, maxWidth: 420, margin: "24px auto 36px", lineHeight: 1.65 }}>Privacy questions, data requests, or complaints — a human reads every email.</p></FadeUp>
          <FadeUp delay={0.35} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="mailto:privacy@noteflow.io" className="rounded-full inline-flex items-center gap-2 transition-all duration-300"
              style={{ fontSize: 16, fontWeight: 500, padding: "16px 34px", background: "#6357E8", color: "white", textDecoration: "none" }}>
              <Mail size={15} /> privacy@noteflow.io
            </a>
            <Link to="/cookie" className="rounded-full inline-flex items-center gap-2 transition-all duration-300"
              style={{ fontSize: 16, fontWeight: 500, padding: "16px 34px", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(14,14,12,0.14)"}`, color: fg, textDecoration: "none" }}>
              <Cookie size={15} /> Cookie summary
            </Link>
          </FadeUp>
        </div>
      </section>

      <footer style={{ background: "#0A0A08", padding: "60px 0 30px" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: `1px solid ${borderColor}` }}>
            <div className="flex items-center gap-2.5">
              <Logo size={26} />
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, fontWeight: 700, color: "white" }}>NoteFlow</span>
            </div>
            <div className="flex items-center gap-5">
              <Link to="/privacy" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub, textDecoration: "none" }}>Privacy</Link>
              <Link to="/terms" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub, textDecoration: "none" }}>Terms</Link>
              <Link to="/cookie-policy" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub, textDecoration: "none" }}>Cookies</Link>
              <Link to="/security" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub, textDecoration: "none" }}>Security</Link>
            </div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub }}>© 2025 NoteFlow, Inc.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
