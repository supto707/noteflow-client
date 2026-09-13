import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import {
  ArrowRight, ChevronRight, Shield, Check, X, Eye, EyeOff, Trash2, Clock, FileText, ExternalLink, Mail, Cookie as CookieIcon
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

const essentials = [
  { name: "nf_session", purpose: "Keeps you signed in", expiry: "30 days" },
  { name: "nf_csrf", purpose: "Protects forms from attacks", expiry: "Session" },
  { name: "nf_prefs", purpose: "Remembers theme & layout", expiry: "1 year" },
  { name: "nf_consent", purpose: "Stores your cookie choice", expiry: "1 year" },
];

export default function Cookie() {
  const { dark } = useTheme();
  const [consent, setConsent] = useState<"unset" | "accepted" | "rejected">("unset");
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

        <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <FadeUp delay={0.05} className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border" style={{ padding: "7px 18px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: "#6357E8", background: "rgba(99,87,232,0.08)", borderColor: "rgba(99,87,232,0.22)" }}>
              <CookieIcon size={13} /> The short version <ChevronRight size={13} />
            </div>
          </FadeUp>

          <div className="mb-8" style={{ lineHeight: 0.92 }}>
            <RevealLine delay={0.1}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 7rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95 }}>Cookies,</h1>
            </RevealLine>
            <RevealLine delay={0.18}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 7rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#6357E8", lineHeight: 0.95, marginTop: "0.06em" }}>briefly.</h1>
            </RevealLine>
          </div>

          <FadeUp delay={0.35}>
            <p style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", color: sub, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
              We set four essential cookies to keep you signed in and remember your preferences. Everything else is opt-in. Last updated {lastUpdated}.
            </p>
          </FadeUp>

          <FadeUp delay={0.45} className="mt-10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/cookie-policy" className="rounded-full inline-flex items-center gap-2 transition-all duration-300"
                style={{ fontSize: 15, fontWeight: 500, padding: "14px 30px", background: "#6357E8", color: "white", textDecoration: "none" }}>
                Full cookie policy <ArrowRight size={15} />
              </Link>
              <Link to="/policy" className="rounded-full transition-all duration-300"
                style={{ fontSize: 15, fontWeight: 500, padding: "14px 30px", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(14,14,12,0.14)"}`, color: fg, textDecoration: "none" }}>
                All policies
              </Link>
            </div>
          </FadeUp>
        </motion.div>
      </section>

      <section style={{ padding: "100px 0", background: bg }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <FadeUp className="flex items-center justify-center gap-3 mb-12">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>What we set</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="grid sm:grid-cols-2 gap-6">
              {essentials.map((c, i) => (
                <FadeUp key={c.name} delay={i * 0.06}>
                  <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }}
                    style={{ padding: 24, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16 }}>
                    <div className="flex items-center justify-between mb-3">
                      <code style={{ fontFamily: "'Geist Mono', monospace", fontSize: 13, color: "#6357E8", background: "rgba(99,87,232,0.1)", padding: "3px 10px", borderRadius: 6 }}>{c.name}</code>
                      <span className="inline-flex items-center gap-1" style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: sub }}>
                        <Clock size={11} /> {c.expiry}
                      </span>
                    </div>
                    <p style={{ fontSize: 14, color: sub, lineHeight: 1.6 }}>{c.purpose}</p>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.15} className="mt-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: Check, label: "No ad cookies", desc: "Zero advertising or tracking pixels. Ever." },
                { icon: Check, label: "No fingerprinting", desc: "We don't profile your device or behavior." },
                { icon: X, label: "No third-party selling", desc: "Your data is never sold or shared for ads." },
                { icon: Shield, label: "Do Not Track respected", desc: "DNT enabled = analytics off, automatically." },
              ].map((item, i) => (
                <FadeUp key={item.label} delay={i * 0.05}>
                  <div className="flex items-start gap-4" style={{ padding: 20, background: dark ? "#0E0E0C" : "#F7F6F2", border: `1px solid ${borderColor}`, borderRadius: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(34,194,125,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <item.icon size={18} style={{ color: "#22C27D" }} />
                    </div>
                    <div>
                      <h4 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, color: fg, marginBottom: 4 }}>{item.label}</h4>
                      <p style={{ fontSize: 13, color: sub, lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <section style={{ padding: "100px 0", background: dark ? "#0E0E0C" : "#F7F6F2" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <FadeUp className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Your choice</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>

          <FadeUp delay={0.1}>
            <div style={{ padding: 32, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16 }}>
              <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 800, color: fg, marginBottom: 8 }}>Set your preference</h3>
              <p style={{ fontSize: 14, color: sub, marginBottom: 24, lineHeight: 1.6 }}>
                {consent === "unset"
                  ? "Essential cookies are always on (they keep you signed in). Analytics and marketing are optional — your call."
                  : consent === "accepted"
                    ? "Thanks! Analytics and marketing cookies are enabled. You can change this anytime."
                    : "Done. Only essential cookies are active. You can change this anytime."}
              </p>
              {consent === "unset" ? (
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <button onClick={() => setConsent("accepted")}
                    className="inline-flex items-center justify-center gap-2"
                    style={{ padding: "13px 26px", borderRadius: 9999, background: "#6357E8", color: "white", border: "none", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                    <Eye size={15} /> Accept all
                  </button>
                  <button onClick={() => setConsent("rejected")}
                    className="inline-flex items-center justify-center gap-2"
                    style={{ padding: "13px 26px", borderRadius: 9999, background: "transparent", color: fg, border: `1px solid ${borderColor}`, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                    <EyeOff size={15} /> Essential only
                  </button>
                </div>
              ) : (
                <button onClick={() => setConsent("unset")}
                  style={{ padding: "12px 24px", borderRadius: 9999, background: "transparent", color: "#6357E8", border: "1px solid rgba(99,87,232,0.4)", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                  Change my choice
                </button>
              )}
              <p style={{ fontSize: 12, color: sub, marginTop: 16 }}>
                Delete cookies anytime via your browser settings <Trash2 size={12} className="inline" /> — no lock-in.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      <section style={{ padding: "120px 0", background: bg, overflow: "hidden", position: "relative" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,0.025)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.025)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative">
          <RevealLine><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 800, letterSpacing: "-0.045em", color: fg, lineHeight: 0.92 }}>Want the details?</div></RevealLine>
          <FadeUp delay={0.25}><p style={{ fontSize: 17, color: sub, maxWidth: 420, margin: "24px auto 36px", lineHeight: 1.65 }}>The full policy lists every cookie, expiry, and subprocessor — in plain tables.</p></FadeUp>
          <FadeUp delay={0.35} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/cookie-policy" className="rounded-full inline-flex items-center gap-2 transition-all duration-300"
              style={{ fontSize: 16, fontWeight: 500, padding: "16px 34px", background: "#6357E8", color: "white", textDecoration: "none" }}>
              <FileText size={15} /> Read full policy <ExternalLink size={13} />
            </Link>
            <a href="mailto:privacy@noteflow.io" className="rounded-full inline-flex items-center gap-2 transition-all duration-300"
              style={{ fontSize: 16, fontWeight: 500, padding: "16px 34px", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(14,14,12,0.14)"}`, color: fg, textDecoration: "none" }}>
              <Mail size={15} /> Email us
            </a>
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
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub }}>© 2025 NoteFlow, Inc. · Free forever · Made with care</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
