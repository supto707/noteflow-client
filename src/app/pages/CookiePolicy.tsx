import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import {
  PenLine, ArrowRight, ChevronRight, Cookie, Shield, Database, Eye, EyeOff, Check, X, AlertCircle, Info, ExternalLink, Download, Key, Lock, Search, Trash2, History, Share2, Cpu, Server, Wifi, Smartphone, Monitor, Zap, Sparkles, Heart, Coffee, Code, BookOpen, Calendar, MapPin, Briefcase, DollarSign, Award, Star, Send, Copy, Github, Twitter, Globe, Wifi as WifiIcon, Bluetooth, Usb, MonitorSmartphone, HardDrive, Layers, Settings, SlidersHorizontal, ToggleLeft, ToggleRight, User, Hash, Fingerprint
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

const cookieCategories = [
  {
    id: "essential",
    name: "Essential",
    description: "Required for NoteFlow to function. Cannot be disabled.",
    cookies: [
      { name: "nf_session", purpose: "Authentication session", expiry: "30 days", type: "First-party" },
      { name: "nf_csrf", purpose: "CSRF protection", expiry: "Session", type: "First-party" },
      { name: "nf_prefs", purpose: "Theme, language, sidebar state", expiry: "1 year", type: "First-party" },
      { name: "nf_consent", purpose: "Cookie consent preferences", expiry: "1 year", type: "First-party" },
    ]
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Help us understand usage to improve NoteFlow. Opt-out available.",
    cookies: [
      { name: "plausible_session", purpose: "Anonymous page views (Plausible)", expiry: "30 min", type: "First-party" },
      { name: "plausible_visitor", purpose: "Unique visitor count (hashed)", expiry: "1 year", type: "First-party" },
    ]
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Used only if you opt in. For product updates & tips.",
    cookies: [
      { name: "nf_marketing", purpose: "Newsletter signup tracking", expiry: "90 days", type: "First-party" },
    ]
  },
  {
    id: "third-party",
    name: "Third-party",
    description: "Set by subprocessors. Only load when you use related features.",
    cookies: [
      { name: "__stripe_sid", purpose: "Stripe fraud prevention", expiry: "30 min", type: "Stripe" },
      { name: "__stripe_mid", purpose: "Stripe fraud prevention", expiry: "1 year", type: "Stripe" },
      { name: "sentry_*_replay", purpose: "Error replay (opt-in)", expiry: "Session", type: "Sentry" },
    ]
  },
];

export default function CookiePolicy() {
  const { dark } = useTheme();
  const [activeTab, setActiveTab] = useState("essential");
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
              <div className="w-1.5 h-1.5 rounded-full bg-[#6357E8]" /> No tracking. No surprises. <ChevronRight size={13} />
            </div>
          </FadeUp>

          <div className="mb-8" style={{ lineHeight: 0.92 }}>
            <RevealLine delay={0.1}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95 }}>Cookie</h1>
            </RevealLine>
            <RevealLine delay={0.18}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#6357E8", lineHeight: 0.95, marginTop: "0.06em" }}>Policy</h1>
            </RevealLine>
          </div>

          <FadeUp delay={0.42}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2vw, 1.25rem)", color: sub, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
              We use cookies sparingly. Essential only by default. Analytics & marketing = opt-in only. Last updated {lastUpdated}.
            </p>
          </FadeUp>
        </motion.div>
      </section>

      <section style={{ padding: "100px 0", background: bg }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp className="flex items-center justify-center gap-3 mb-12">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Cookie categories</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>

          <div className="flex gap-4 mb-12" style={{ flexWrap: "wrap", justifyContent: "center" }}>
            {cookieCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: activeTab === cat.id ? "#6357E8" : "transparent",
                  color: activeTab === cat.id ? "white" : fg,
                  border: `1px solid ${activeTab === cat.id ? "#6357E8" : borderColor}`,
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <FadeUp delay={0.1}>
            {cookieCategories.filter(c => c.id === activeTab).map(cat => (
              <div key={cat.id} style={{ marginTop: 32 }}>
                <div className="flex items-center gap-3 mb-6">
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "#6357E818", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Cookie size={22} style={{ color: "#6357E8" }} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 24, fontWeight: 800, color: fg }}>{cat.name} cookies</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: sub, marginTop: 4 }}>{cat.description}</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                    <thead>
                      <tr style={{ borderBottom: `1px solid ${borderColor}` }}>
                        <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, fontSize: 11, color: sub, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>Cookie</th>
                        <th style={{ textAlign: "left", padding: "12px 16px", fontWeight: 600, fontSize: 11, color: sub, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "'DM Sans', sans-serif" }}>Purpose</th>
                        <th style={{ textAlign: "center", padding: "12px 16px", fontWeight: 600, fontSize: 11, color: sub, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "'DM Sans', sans-serif" }}>Expiry</th>
                        <th style={{ textAlign: "center", padding: "12px 16px", fontWeight: 600, fontSize: 11, color: sub, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "'DM Sans', sans-serif" }}>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cat.cookies.map((cookie, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${borderColor}` }}>
                          <td style={{ textAlign: "left", padding: "12px 16px", fontFamily: "'Geist Mono', monospace", fontSize: 12, color: fg }}><code>{cookie.name}</code></td>
                          <td style={{ textAlign: "left", padding: "12px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub }}>{cookie.purpose}</td>
                          <td style={{ textAlign: "center", padding: "12px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub }}>{cookie.expiry}</td>
                          <td style={{ textAlign: "center", padding: "12px 16px" }}>
                            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, fontWeight: 600, color: "#6357E8", background: "rgba(99,87,232,0.12)", padding: "2px 8px", borderRadius: 9999 }}>{cookie.type}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>

      <section style={{ padding: "100px 0", background: dark ? "#0E0E0C" : "#F7F6F2" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <FadeUp className="flex items-center justify-center gap-3 mb-12">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Your control</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: ToggleLeft, title: "Banner", desc: "Reopen the cookie banner anytime from Settings → Privacy to change preferences." },
                { icon: Trash2, title: "Delete", desc: "Clear all NoteFlow cookies from your browser dev tools or use our 'Clear data' button." },
                { icon: ToggleRight, title: "Opt-out", desc: "Disable analytics & marketing instantly. Essential cookies remain for security." },
                { icon: Shield, title: "Do Not Track", desc: "We respect DNT header — analytics automatically disabled if enabled in browser." },
                { icon: Globe, title: "Per-site", desc: "Browser extensions (uBlock, Privacy Badger) can block third-party cookies globally." },
                { icon: Settings, title: "Granular", desc: "Future: per-cookie toggles in Settings → Privacy → Cookies." },
              ].map((item, i) => (
                <FadeUp key={item.title} delay={i * 0.06}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    style={{ padding: 24, background: dark ? "#141412" : "#FFFFFF", border: `1px solid ${borderColor}`, borderRadius: 16 }}
                  >
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: "#6357E818", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                      <item.icon size={22} style={{ color: "#6357E8" }} />
                    </div>
                    <h4 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg, marginBottom: 8 }}>{item.title}</h4>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.6 }}>{item.desc}</p>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.2} className="mt-12">
            <div style={{ padding: 32, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16 }}>
              <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 700, color: fg, marginBottom: 16 }}>Manage now</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <button style={{ padding: "14px 28px", borderRadius: 9999, background: "#6357E8", color: "white", border: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Open cookie settings</button>
                <button style={{ padding: "14px 28px", borderRadius: 9999, background: "transparent", color: fg, border: `1px solid ${borderColor}`, fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Reject all non-essential</button>
                <button style={{ padding: "14px 28px", borderRadius: 9999, background: "transparent", color: fg, border: `1px solid ${borderColor}`, fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Accept all</button>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub, marginTop: 16 }}>Preferences saved in <code style={{ fontFamily: "'Geist Mono', monospace", background: "rgba(99,87,232,0.1)", padding: "2px 6px", borderRadius: 4 }}>nf_consent</code> cookie (1 year).</p>
            </div>
          </FadeUp>
        </div>
      </section>

      <section style={{ padding: "100px 0", background: bg }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <FadeUp className="flex items-center justify-center gap-3 mb-12">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Subprocessors</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>

          <FadeUp delay={0.1}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: sub, maxWidth: 700, margin: "0 auto 32px", lineHeight: 1.7 }}>Third parties that may set cookies when you use related features. All under DPAs.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Stripe", cookies: "__stripe_sid, __stripe_mid", purpose: "Payment fraud prevention", link: "https://stripe.com/cookies-policy/legal" },
                { name: "Plausible", cookies: "plausible_session, plausible_visitor", purpose: "Privacy-friendly analytics (no cookies by default)", link: "https://plausible.io/data-policy" },
                { name: "Sentry", cookies: "sentry_*_replay", purpose: "Error session replay (opt-in only)", link: "https://sentry.io/privacy/" },
                { name: "Resend", cookies: "none", purpose: "Transactional email (no cookies)", link: "https://resend.com/privacy" },
              ].map((s, i) => (
                <FadeUp key={s.name} delay={i * 0.06}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    style={{ padding: 24, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16 }}
                  >
                    <h4 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg, marginBottom: 8 }}>{s.name}</h4>
                    <p style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, color: sub, marginBottom: 8 }}>{s.cookies}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.6, marginBottom: 12 }}>{s.purpose}</p>
                    <a href={s.link} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#6357E8", textDecoration: "none" }}>View their cookie policy <ExternalLink size={12} className="inline" /></a>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <section style={{ padding: "140px 0", background: dark ? "#0E0E0C" : "#F7F6F2", overflow: "hidden", position: "relative" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,0.025)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.025)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative">
          <RevealLine><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: fg, lineHeight: 0.92 }}>Questions?</div></RevealLine>
          <RevealLine delay={0.1}><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: "#6357E8", lineHeight: 0.92 }}>Email us.</div></RevealLine>
          <FadeUp delay={0.25}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: sub, maxWidth: 440, margin: "28px auto 40px", lineHeight: 1.65 }}>privacy@noteflow.io</p></FadeUp>
          <FadeUp delay={0.35} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="mailto:privacy@noteflow.io" className="rounded-full flex items-center gap-2 group transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", background: "#6357E8", color: "white", textDecoration: "none" }}>
              <Mail size={15} /> Email privacy team
            </a>
            <Link to="/privacy" className="rounded-full transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(14,14,12,0.14)"}`, color: fg, textDecoration: "none" }}>
              Read Privacy Policy
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