import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import {
  PenLine, ArrowRight, ChevronRight, Briefcase, Heart, Users, Zap, Coffee, Shield, Globe, Home, BookOpen, Code, Calendar, CheckCircle, Star, Send, MapPin, Clock, DollarSign, Award, Sparkles
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

const benefits = [
  { icon: Heart, title: "People first", desc: "No crunch. 4-day weeks in summer. Mental health days, no questions asked. Sustainable pace = better work." },
  { icon: Zap, title: "Speed as culture", desc: "Deploy on day one. Tiny teams, zero bureaucracy. You own features end-to-end." },
  { icon: Coffee, title: "Remote-first, truly", desc: "Async by default. Meetings optional. Offices in SF, NYC, London — or your couch. $3k home office stipend." },
  { icon: Globe, title: "Global team", desc: "10 people, 6 countries, 8 time zones. We hire the best, wherever they are." },
  { icon: Code, title: "Open source DNA", desc: "Core is MIT. Public roadmap. Contribute back to the ecosystem you use." },
  { icon: Star, title: "Equity for everyone", desc: "Not just founders. Every team member gets meaningful ownership. We win together." },
];

const values = [
  { title: "Users > metrics", desc: "We'd rather have 10k happy users than 100k frustrated ones. No dark patterns. Ever." },
  { title: "Craft compounds", desc: "The 1% details — spring animations, empty states, keyboard shortcuts — make the 99% feel effortless." },
  { title: "Default to trust", desc: "No approval chains. No surveillance. Hire adults, treat them like adults." },
  { title: "Learn in public", desc: "Blog our failures. Open source our tools. Share what we learn. The community makes us better." },
];

const roles = [
  { title: "Senior Full-Stack Engineer", type: "Engineering", location: "Remote (Americas/EU)", salary: "$160k–$220k + equity", desc: "React, TypeScript, Node, PostgreSQL. Own features from design to deploy. Love DX and performance.", tags: ["React", "TypeScript", "Node", "PostgreSQL"], featured: true },
  { title: "Mobile Engineer (iOS/Android)", type: "Engineering", location: "Remote (Worldwide)", salary: "$150k–$210k + equity", desc: "Swift, Kotlin, React Native. Offline-first, SQLite, background sync. Native feel, shared core.", tags: ["Swift", "Kotlin", "React Native", "SQLite"], featured: false },
  { title: "Product Designer", type: "Design", location: "Remote (US/EU)", salary: "$140k–$190k + equity", desc: "End-to-end: research → prototype → handoff. Systems thinker. Figma power user. Ships pixels that work.", tags: ["Figma", "Design Systems", "Prototyping"], featured: false },
  { title: "Developer Advocate", type: "Community", location: "Remote (Americas)", salary: "$130k–$180k + equity", desc: "Write, speak, stream, build. SDKs, templates, integrations. You're the bridge between us and developers.", tags: ["Writing", "Speaking", "TypeScript", "Community"], featured: false },
  { title: "Founding Account Executive", type: "Growth", location: "Remote (US)", salary: "$120k–$180k OTE + equity", desc: "First sales hire. Self-serve → enterprise. Product-led growth mindset. Technical credibility required.", tags: ["SaaS Sales", "PLG", "Enterprise"], featured: false },
  { title: "General Application", type: "Any", location: "Remote (Worldwide)", salary: "Competitive + equity", desc: "Don't see your role? We're always looking for exceptional people. Pitch us what you'd build.", tags: ["Open"], featured: false },
];

const process = [
  { step: "01", title: "Apply", desc: "Send your profile + a short note on why NoteFlow. We read every application personally." },
  { step: "02", title: "Chat", desc: "30-min video call with a team member. Mutual vibe check. No whiteboard puzzles." },
  { step: "03", title: "Paid project", desc: "Real work, real pay ($500). 1-2 weeks, async, on your schedule. See how we collaborate." },
  { step: "04", title: "Team meet", desc: "Chat with 2-3 future teammates. Ask anything. We want you to be sure too." },
  { step: "05", title: "Offer", desc: "Transparent compensation. Equity breakdown. Decision within 48 hours." },
];

export default function Careers() {
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
              <div className="w-1.5 h-1.5 rounded-full bg-[#6357E8]" /> Small team. Big impact. <ChevronRight size={13} />
            </div>
          </FadeUp>

          <div className="mb-8" style={{ lineHeight: 0.92 }}>
            <RevealLine delay={0.1}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95 }}>Join the</h1>
            </RevealLine>
            <RevealLine delay={0.18}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#6357E8", lineHeight: 0.95, marginTop: "0.06em" }}>team</h1>
            </RevealLine>
            <RevealLine delay={0.26}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#22C27D", lineHeight: 0.95, marginTop: "0.06em" }}>building free forever</h1>
            </RevealLine>
          </div>

          <FadeUp delay={0.42}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2vw, 1.25rem)", color: sub, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
              Ten people. Zero investors. One mission. Come build the tool you wish existed.
            </p>
          </FadeUp>
        </motion.div>
      </section>

      <section style={{ padding: "100px 0", background: bg }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp className="flex items-center justify-center gap-3 mb-16">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Why NoteFlow</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((b, i) => (
                <FadeUp key={b.title} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    style={{ padding: 32, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16 }}
                  >
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: "#6357E818", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                      <b.icon size={24} style={{ color: "#6357E8" }} />
                    </div>
                    <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 700, color: fg, marginBottom: 8 }}>{b.title}</h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.7 }}>{b.desc}</p>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </FadeUp>

          <div style={{ marginTop: 60 }}>
            <FadeUp className="flex items-center justify-center gap-3 mb-12">
              <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
              <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Our values</span>
              <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((v, i) => (
                  <FadeUp key={v.title} delay={i * 0.08}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                      style={{ padding: 28, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16 }}
                    >
                      <h4 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg, marginBottom: 8 }}>{v.title}</h4>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.7 }}>{v.desc}</p>
                    </motion.div>
                  </FadeUp>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 0", background: dark ? "#0E0E0C" : "#F7F6F2" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp className="flex items-center justify-center gap-3 mb-12">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Open roles</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>
          <RevealLine>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95, marginBottom: "0.12em", textAlign: "center" }}>Small team. Outsized impact.</h2>
          </RevealLine>

          <FadeUp delay={0.2}>
            <div className="grid lg:grid-cols-2 gap-6" style={{ marginTop: 32 }}>
              {roles.map((role, i) => (
                <FadeUp key={role.title} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    style={{ padding: role.featured ? 32 : 28, background: role.featured ? "rgba(99,87,232,0.06)" : cardBg, border: role.featured ? "1px solid #6357E8" : `1px solid ${borderColor}`, borderRadius: 20, position: "relative" }}
                  >
                    {role.featured && (
                      <div style={{ position: "absolute", top: -12, left: 24, background: "#6357E8", color: "white", padding: "4px 12px", borderRadius: 9999, fontSize: 11, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>
                        <Star size={10} className="inline mr-1" /> We're hiring for this
                      </div>
                    )}
                    <div className="flex items-start gap-3 mb-4">
                      <div style={{ width: 48, height: 48, borderRadius: 12, background: "#6357E818", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Briefcase size={22} style={{ color: "#6357E8" }} />
                      </div>
                      <div className="flex-1">
                        <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 800, color: fg, marginBottom: 4 }}>{role.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, fontWeight: 600, color: "#6357E8", background: "rgba(99,87,232,0.12)", padding: "2px 8px", borderRadius: 9999, textTransform: "uppercase" }}>{role.type}</span>
                          <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, color: sub, background: "rgba(138,138,128,0.12)", padding: "2px 8px", borderRadius: 9999 }}>{role.location}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: sub, lineHeight: 1.6, marginBottom: 16 }}>{role.desc}</div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {role.tags.map((tag, ti) => (
                        <span key={tag} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: sub, background: dark ? "rgba(255,255,255,0.06)" : "rgba(14,14,12,0.06)", padding: "3px 10px", borderRadius: 9999 }}>{tag}</span>
                      ))}
                    </div>
                    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, color: "#6357E8" }}>{role.salary}</div>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.3} className="text-center mt-12">
            <Link to="/careers#apply" className="inline-flex items-center gap-2 rounded-full"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "14px 32px", background: "#6357E8", color: "white", textDecoration: "none" }}>
              View all roles <ArrowRight size={15} />
            </Link>
          </FadeUp>
        </div>
      </section>

      <section style={{ padding: "100px 0", background: bg }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <FadeUp className="flex items-center justify-center gap-3 mb-12">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Hiring process</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>
          <RevealLine>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95, marginBottom: "0.12em", textAlign: "center" }}>Respectful. Transparent. Fast.</h2>
          </RevealLine>

          <FadeUp delay={0.2}>
            <div className="space-y-6" style={{ marginTop: 48 }}>
              {process.map((p, i) => (
                <FadeUp key={p.step} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.3 }}
                    style={{ display: "flex", gap: 24, padding: 24, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16 }}
                  >
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: "#6357E818", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 800, color: "#6357E8" }}>{p.step}</span>
                    </div>
                    <div className="flex-1">
                      <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 700, color: fg, marginBottom: 8 }}>{p.title}</h3>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: sub, lineHeight: 1.7 }}>{p.desc}</p>
                    </div>
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
          <RevealLine><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: fg, lineHeight: 0.92 }}>Your turn.</div></RevealLine>
          <RevealLine delay={0.1}><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: "#6357E8", lineHeight: 0.92 }}>Build with us.</div></RevealLine>
          <FadeUp delay={0.25}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: sub, maxWidth: 440, margin: "28px auto 40px", lineHeight: 1.65 }}>No cover letters. No LeetCode. Just your best work.</p></FadeUp>
          <FadeUp delay={0.35} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="mailto:jobs@noteflow.io?subject=Application:%20[Role]%20-%20[Your%20Name]" className="rounded-full flex items-center gap-2 group transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", background: "#6357E8", color: "white", textDecoration: "none" }}>
              Email jobs@noteflow.io <ArrowRight size={15} />
            </a>
            <Link to="/about" className="rounded-full transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(14,14,12,0.14)"}`, color: fg, textDecoration: "none" }}>
              Meet the team first
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