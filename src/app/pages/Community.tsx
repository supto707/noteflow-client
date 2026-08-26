import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import {
  PenLine, ArrowRight, ChevronRight, MessageSquare, Users, Heart, Github, Twitter, Discord, Star, Award, BookOpen, Zap, Coffee, Code, HelpCircle, Send, Smile, Shield, Globe, LayoutGrid, FileText, Video, Mic, Calendar, MapPin, Pin, Sparkles
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

const stats = [
  { label: "Community members", value: "52,000+", icon: Users, color: "#6357E8" },
  { label: "Templates shared", value: "1,200+", icon: FileText, color: "#22C27D" },
  { label: "Questions answered", value: "48,000+", icon: HelpCircle, color: "#F59E0B" },
  { label: "Countries represented", value: "140+", icon: Globe, color: "#EC4899" },
];

const channels = [
  { name: "Discord", desc: "Real-time chat, #help, #showcase, #random", members: "28,000+", icon: MessageSquare, color: "#5865F2", href: "https://discord.gg/noteflow", cta: "Join Discord" },
  { name: "GitHub Discussions", desc: "Feature requests, bug reports, Q&A", members: "12,000+", icon: Github, color: "#8A4CF8", href: "https://github.com/noteflow/noteflow/discussions", cta: "View discussions" },
  { name: "Forum", desc: "Long-form guides, tutorials, announcements", members: "8,500+", icon: BookOpen, color: "#6357E8", href: "https://community.noteflow.io", cta: "Browse forum" },
  { name: "Twitter/X", desc: "Updates, tips, community highlights", members: "15,000+", icon: Twitter, color: "#1DA1F2", href: "https://twitter.com/noteflow", cta: "Follow us" },
];

const ambassadors = [
  { name: "Sarah Chen", role: "Product Manager @ Linear", location: "San Francisco", avatar: "👩‍💼", bio: "Organizes monthly NoteFlow meetups. Template wizard.", twitter: "sarahchen", github: "sarahchen" },
  { name: "Marcus Johnson", role: "Engineering Lead @ Vercel", location: "New York", avatar: "👨‍💻", bio: "Built the Notion → NoteFlow importer. Open source advocate.", twitter: "marcusj", github: "marcusj" },
  { name: "Elena Rodriguez", role: "Designer @ Figma", location: "London", avatar: "👩‍🎨", bio: "Runs the design system template collection. Design tokens expert.", twitter: "elenadesign", github: "elenarodriguez" },
  { name: "Kenji Tanaka", role: "Student @ Tokyo Tech", location: "Tokyo", avatar: "👨‍🎓", bio: "Translates docs to Japanese. Runs study-group templates.", twitter: "kenji_t", github: "kenjitanaka" },
  { name: "Aisha Patel", role: "Founder @ Startup", location: "Bangalore", avatar: "👩‍💼", bio: "Startup OS template creator. Mentors student ambassadors.", twitter: "aishapatel", github: "aishapatel" },
  { name: "Diego Silva", role: "DevRel @ Railway", location: "São Paulo", avatar: "👨‍💻", bio: "Portuguese community lead. Streams NoteFlow builds weekly.", twitter: "diegosilva", github: "diegosilva" },
];

const events = [
  { title: "Community Call", date: "Every Tuesday, 4pm UTC", desc: "Live demo, Q&A, community spotlights", icon: Video, color: "#6357E8", recurring: true },
  { title: "Office Hours", date: "Wednesdays, 6pm UTC", desc: "Drop in with any question — support team live", icon: HelpCircle, color: "#22C27D", recurring: true },
  { title: "Template Jam", date: "First Saturday monthly", desc: "Build templates together in 2 hours. Prizes!", icon: Sparkles, color: "#F59E0B", recurring: true },
  { title: "NoteFlow Conf 2025", date: "June 15–16, 2025", desc: "Virtual conference: talks, workshops, networking", icon: Calendar, color: "#EC4899", recurring: false },
  { title: "Local Meetups", date: "Monthly in 12 cities", desc: "SF, NYC, London, Berlin, Tokyo, Bangalore + more", icon: MapPin, color: "#8B5CF6", recurring: true },
];

const guidelines = [
  { icon: Heart, title: "Be kind", desc: "We're all here to learn. No gatekeeping, no snark. Assume good intent." },
  { icon: Shield, title: "Stay on topic", desc: "Keep discussions relevant. Use threads. Search before posting." },
  { icon: Star, title: "Share knowledge", desc: "Answer questions. Write guides. Templates are gifts — give freely." },
  { icon: Code, title: "Respect IP", desc: "No pirated content. Credit sources. Original work only in showcases." },
  { icon: Globe, title: "English first", desc: "Main channels are English. Regional channels for other languages." },
  { icon: Coffee, title: "Have fun", desc: "Memes in #random. Celebrate wins. This should feel like home." },
];

export default function Community() {
  const { dark } = useTheme();
  const [activeTab, setActiveTab] = useState<"channels" | "ambassadors" | "events">("channels");
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
              <div className="w-1.5 h-1.5 rounded-full bg-[#6357E8]" /> 52,000+ builders <ChevronRight size={13} />
            </div>
          </FadeUp>

          <div className="mb-8" style={{ lineHeight: 0.92 }}>
            <RevealLine delay={0.1}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95 }}>Community</h1>
            </RevealLine>
            <RevealLine delay={0.18}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#6357E8", lineHeight: 0.95, marginTop: "0.06em" }}>where makers meet</h1>
            </RevealLine>
          </div>

          <FadeUp delay={0.42}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2vw, 1.25rem)", color: sub, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
              Ask questions. Share templates. Find collaborators. Make friends.
            </p>
          </FadeUp>
        </motion.div>
      </section>

      <section style={{ padding: "60px 0 100px", background: bg }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <FadeUp key={s.label} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  style={{ padding: 32, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16, textAlign: "center" }}
                >
                  <div style={{ width: 64, height: 64, borderRadius: 16, background: `${s.color}18`, margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <s.icon size={26} style={{ color: s.color }} />
                  </div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 36, fontWeight: 800, color: fg, lineHeight: 1.1, marginBottom: 4 }}>{s.value}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub }}>{s.label}</div>
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
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Where we hang out</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>

          <div className="flex gap-4 mb-8" style={{ flexWrap: "wrap", justifyContent: "center" }}>
            {["channels", "ambassadors", "events"].map(t => (
              <button
                key={t}
                onClick={() => setActiveTab(t as any)}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: activeTab === t ? "#6357E8" : "transparent",
                  color: activeTab === t ? "white" : fg,
                  border: `1px solid ${activeTab === t ? "#6357E8" : borderColor}`,
                }}
              >
                {t === "channels" && <MessageSquare size={14} className="inline mr-1" />} {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {activeTab === "channels" && (
            <FadeUp>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {channels.map((c, i) => (
                  <FadeUp key={c.name} delay={i * 0.08}>
                    <a href={c.href} target="_blank" rel="noopener noreferrer"
                      style={{ padding: 28, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16, textDecoration: "none", display: "block" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = c.color; e.currentTarget.style.boxShadow = `0 0 0 1px ${c.color}40`; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = borderColor; e.currentTarget.style.boxShadow = "none"; }}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div style={{ width: 56, height: 56, borderRadius: 14, background: `${c.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <c.icon size={24} style={{ color: c.color }} />
                        </div>
                        <div>
                          <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 700, color: fg }}>{c.name}</h3>
                          <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: sub }}>{c.members} members</span>
                        </div>
                      </div>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.6, marginBottom: 16 }}>{c.desc}</p>
                      <div className="inline-flex items-center gap-2" style={{ color: c.color, fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600 }}>
                        {c.cta} <ArrowRight size={14} />
                      </div>
                    </a>
                  </FadeUp>
                ))}
              </div>
            </FadeUp>
          )}

          {activeTab === "ambassadors" && (
            <FadeUp>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ambassadors.map((a, i) => (
                  <FadeUp key={a.name} delay={i * 0.08}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.3 }}
                      style={{ padding: 24, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16 }}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div style={{ width: 56, height: 56, borderRadius: 14, background: "#6357E818", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{a.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg }}>{a.name}</h4>
                            <Pin size={14} style={{ color: sub }} />
                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: sub }}>{a.location}</span>
                          </div>
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: sub }}>{a.role}</p>
                        </div>
                      </div>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub, lineHeight: 1.6, marginBottom: 16 }}>{a.bio}</p>
                      <div className="flex items-center gap-3">
                        <a href={`https://twitter.com/${a.twitter}`} target="_blank" rel="noopener noreferrer" style={{ color: "#1DA1F2" }}><Twitter size={16} /></a>
                        <a href={`https://github.com/${a.github}`} target="_blank" rel="noopener noreferrer" style={{ color: fg }}><Github size={16} /></a>
                      </div>
                    </motion.div>
                  </FadeUp>
                ))}
              </div>
            </FadeUp>
          )}

          {activeTab === "events" && (
            <FadeUp>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((e, i) => (
                  <FadeUp key={e.title} delay={i * 0.08}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                      style={{ padding: 24, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16, borderLeft: `4px solid ${e.color}` }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div style={{ width: 44, height: 44, borderRadius: 10, background: `${e.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <e.icon size={20} style={{ color: e.color }} />
                        </div>
                        <div>
                          <h4 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg }}>{e.title}</h4>
                          <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, fontWeight: 600, color: e.color, background: `${e.color}18`, padding: "2px 8px", borderRadius: 9999 }}>{e.recurring ? "Recurring" : "One-time"}</span>
                        </div>
                      </div>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, marginBottom: 16 }}>{e.date}</p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.6 }}>{e.desc}</p>
                    </motion.div>
                  </FadeUp>
                ))}
              </div>
            </FadeUp>
          )}
        </div>
      </section>

      <section style={{ padding: "100px 0", background: bg }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <FadeUp className="flex items-center justify-center gap-3 mb-12">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Guidelines</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>
          <RevealLine>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95, marginBottom: "0.12em", textAlign: "center" }}>How we keep it awesome</h2>
          </RevealLine>

          <FadeUp delay={0.2}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ marginTop: 32 }}>
              {guidelines.map((g, i) => (
                <FadeUp key={g.title} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    style={{ padding: 28, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16 }}
                  >
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: "#6357E818", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                      <g.icon size={22} style={{ color: "#6357E8" }} />
                    </div>
                    <h4 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg, marginBottom: 8 }}>{g.title}</h4>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.6 }}>{g.desc}</p>
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
          <RevealLine><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: fg, lineHeight: 0.92 }}>Join us.</div></RevealLine>
          <RevealLine delay={0.1}><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: "#6357E8", lineHeight: 0.92 }}>It&apos;s free.</div></RevealLine>
          <FadeUp delay={0.25}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: sub, maxWidth: 440, margin: "28px auto 40px", lineHeight: 1.65 }}>No gatekeeping. No paywalls. Just good people building cool stuff.</p></FadeUp>
          <FadeUp delay={0.35} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://discord.gg/noteflow" target="_blank" rel="noopener noreferrer" className="rounded-full flex items-center gap-2 group transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", background: "#5865F2", color: "white", textDecoration: "none" }}>
              <MessageSquare size={15} /> Join Discord
            </a>
            <a href="https://github.com/noteflow/noteflow/discussions" target="_blank" rel="noopener noreferrer" className="rounded-full transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(14,14,12,0.14)"}`, color: fg, textDecoration: "none" }}>
              <Github size={15} /> GitHub Discussions
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