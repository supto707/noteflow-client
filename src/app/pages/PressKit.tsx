import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import {
  PenLine, ArrowRight, ChevronRight, Download, FileText, Image, Twitter, Github, Mail, Globe, Users, Star, Sparkles, Shield, Zap, Heart, Copy, ExternalLink, Check
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

const pressAssets = [
  { name: "Logo (SVG)", desc: "Primary logo, horizontal & icon versions", size: "24 KB", format: "SVG", icon: PenLine },
  { name: "Logo (PNG)", desc: "High-res PNG with transparent background", size: "180 KB", format: "PNG", icon: Image },
  { name: "Logo (Dark mode)", desc: "Optimized for dark backgrounds", size: "176 KB", format: "PNG", icon: Image },
  { name: "App screenshots", desc: "Desktop, mobile, tablet — 4K resolution", size: "12 MB", format: "ZIP", icon: Download },
  { name: "Product video (MP4)", desc: "60s demo, no audio, 1080p", size: "45 MB", format: "MP4", icon: FileText },
  { name: "Brand guidelines", desc: "Colors, typography, spacing, do's & don'ts", size: "2.1 MB", format: "PDF", icon: FileText },
  { name: "Founder photos", desc: "Ada & Linus — portrait & candid", size: "8 MB", format: "ZIP", icon: Image },
  { name: "Team photo", desc: "Full team, high-res", size: "15 MB", format: "ZIP", icon: Users },
  { name: "Office photos", desc: "SF HQ, remote workspace collage", size: "22 MB", format: "ZIP", icon: Image },
];

const facts = [
  { label: "Founded", value: "January 2024" },
  { label: "Headquarters", value: "San Francisco, CA" },
  { label: "Team size", value: "10 (6 countries)" },
  { label: "Funding", value: "Bootstrapped — $0 raised" },
  { label: "Users", value: "52,000+" },
  { label: "Pages created", value: "2.1M+" },
  { label: "Templates", value: "1,200+" },
  { label: "Languages", value: "12" },
  { label: "Platforms", value: "Web, iOS, Android, macOS, Windows, Linux" },
];

const logos = [
  { name: "Primary (color)", file: "noteflow-logo-color.svg", preview: "linear-gradient(90deg, #6357E8, #22C27D)" },
  { name: "Primary (dark)", file: "noteflow-logo-dark.svg", preview: "#E8E8E0" },
  { name: "Primary (light)", file: "noteflow-logo-light.svg", preview: "#0E0E0C" },
  { name: "Icon only", file: "noteflow-icon.svg", preview: "linear-gradient(135deg, #6357E8, #22C27D)" },
  { name: "Icon (mono)", file: "noteflow-icon-mono.svg", preview: "#8A8A80" },
];

const colors = [
  { name: "Primary", hex: "#6357E8", rgb: "99, 87, 232", usage: "Primary actions, links, brand" },
  { name: "Success", hex: "#22C27D", rgb: "34, 194, 125", usage: "Confirmations, online status" },
  { name: "Warning", hex: "#F59E0B", rgb: "245, 158, 11", usage: "Alerts, pending states" },
  { name: "Error", hex: "#EF4444", rgb: "239, 68, 68", usage: "Errors, destructive actions" },
  { name: "Dark", hex: "#0E0E0C", rgb: "14, 14, 12", usage: "Dark mode background" },
  { name: "Surface", hex: "#141412", rgb: "20, 20, 18", usage: "Cards, modals (dark)" },
  { name: "Light", hex: "#F7F6F2", rgb: "247, 246, 242", usage: "Light mode background" },
  { name: "Surface Light", hex: "#FFFFFF", rgb: "255, 255, 255", usage: "Cards, modals (light)" },
];

const typography = [
  { name: "Display", font: "'Bricolage Grotesque', sans-serif", sizes: "96/80/64/48/36/28/24/20px", weight: "800", usage: "Hero headlines, major sections" },
  { name: "Heading", font: "'Bricolage Grotesque', sans-serif", sizes: "24/20/18/16px", weight: "700", usage: "Section titles, card headers" },
  { name: "Body", font: "'DM Sans', sans-serif", sizes: "16/15/14/13/12px", weight: "400/500/600", usage: "UI text, paragraphs, labels" },
  { name: "Mono", font: "'Geist Mono', monospace", sizes: "13/12/11/10px", weight: "400/500/600", usage: "Code, data, labels, tags" },
];

const contacts = [
  { name: "Ada Chen", role: "Co-founder & CEO", email: "ada@noteflow.io", twitter: "@adachen", topics: "Partnerships, investment, strategy" },
  { name: "Linus Torres", role: "Co-founder & CTO", email: "linus@noteflow.io", twitter: "@linustorres", topics: "Technical, architecture, integrations" },
  { name: "Maya Patel", role: "Head of Design", email: "maya@noteflow.io", twitter: "@mayapatel", topics: "Design, brand, UX" },
  { name: "Ravi Desai", role: "Developer Advocate", email: "ravi@noteflow.io", twitter: "@ravidesai", topics: "Community, SDKs, content" },
  { name: "Press", role: "General inquiries", email: "press@noteflow.io", twitter: "@noteflow", topics: "Media, interviews, assets" },
];

const guidelines = [
  "Do use the primary color logo on light backgrounds",
  "Do use the dark mode logo on dark backgrounds",
  "Do maintain clear space = logo height on all sides",
  "Don't stretch, rotate, or recolor the logo",
  "Don't place logo on busy/low-contrast backgrounds",
  "Don't use the icon without 'NoteFlow' wordmark on first reference",
  "Don't create custom lockups or animations without approval",
  "Attribute as 'NoteFlow' (camel case, no space)",
];

export default function PressKit() {
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
              <div className="w-1.5 h-1.5 rounded-full bg-[#6357E8]" /> Assets, facts & brand guidelines <ChevronRight size={13} />
            </div>
          </FadeUp>

          <div className="mb-8" style={{ lineHeight: 0.92 }}>
            <RevealLine delay={0.1}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95 }}>Press</h1>
            </RevealLine>
            <RevealLine delay={0.18}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#6357E8", lineHeight: 0.95, marginTop: "0.06em" }}>Kit</h1>
            </RevealLine>
          </div>

          <FadeUp delay={0.42}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2vw, 1.25rem)", color: sub, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
              Everything you need to write about NoteFlow. Assets are CC0 — use freely with attribution.
            </p>
          </FadeUp>
        </motion.div>
      </section>

      <section style={{ padding: "100px 0", background: bg }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp className="flex items-center justify-center gap-3 mb-12">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Quick facts</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {facts.map((f, i) => (
                <FadeUp key={f.label} delay={i * 0.06}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    style={{ padding: 28, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16 }}
                  >
                    <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, fontWeight: 600, color: "#6357E8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{f.label}</div>
                    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 24, fontWeight: 800, color: fg }}>{f.value}</div>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <section style={{ padding: "100px 0", background: dark ? "#0E0E0C" : "#F7F6F2" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp className="flex items-center justify-center gap-3 mb-12">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Download assets</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pressAssets.map((asset, i) => (
                <FadeUp key={asset.name} delay={i * 0.06}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    style={{ padding: 24, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16, display: "flex", alignItems: "flex-start", gap: 16 }}
                  >
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: "#6357E818", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <asset.icon size={24} style={{ color: "#6357E8" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, color: fg, marginBottom: 4 }}>{asset.name}</h4>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub, lineHeight: 1.5, marginBottom: 12 }}>{asset.desc}</p>
                      <div className="flex items-center gap-4" style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: sub }}>
                        <span>{asset.format}</span>
                        <span>{asset.size}</span>
                      </div>
                    </div>
                    <a href={`/press/${asset.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`} className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: "#6357E8", textDecoration: "none" }}>
                      <Download size={14} /> Download
                    </a>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.2} className="text-center mt-12">
            <a href="/press/all-assets.zip" className="inline-flex items-center gap-2 rounded-full"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "14px 32px", background: "#6357E8", color: "white", textDecoration: "none" }}>
              <Download size={16} /> Download all (ZIP, 128 MB)
            </a>
          </FadeUp>
        </div>
      </section>

      <section style={{ padding: "100px 0", background: bg }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp className="flex items-center justify-center gap-3 mb-12">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Brand identity</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>

          <div className="grid lg:grid-cols-2 gap-12">
            <FadeUp>
              <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 800, color: fg, marginBottom: 24 }}>Logos</h3>
              <div className="grid gap-4">
                {logos.map((logo, i) => (
                  <FadeUp key={logo.file} delay={i * 0.06}>
                    <div style={{ padding: 20, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div className="flex items-center gap-4">
                        <div style={{ width: 60, height: 60, borderRadius: 12, background: logo.preview, display: "flex", alignItems: "center", justifyContent: "center", color: logo.preview.includes("linear-gradient") ? "white" : logo.preview === "#0E0E0C" ? "white" : "#0E0E0C", fontWeight: 700, fontFamily: "'Bricolage Grotesque', sans-serif" }}>NF</div>
                        <div>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: fg }}>{logo.name}</div>
                          <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, color: sub }}>{logo.file}</div>
                        </div>
                      </div>
                      <a href={`/press/${logo.file}`} className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: "#6357E8", textDecoration: "none" }}>
                        <Download size={14} /> SVG
                      </a>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 800, color: fg, marginBottom: 24 }}>Colors</h3>
              <div className="grid gap-3">
                {colors.map((c, i) => (
                  <FadeUp key={c.name} delay={i * 0.04}>
                    <div style={{ padding: 16, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                      <div className="flex items-center gap-4">
                        <div style={{ width: 48, height: 48, borderRadius: 10, background: c.hex, boxShadow: "0 0 0 1px rgba(0,0,0,0.1)" }} />
                        <div>
                          <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, color: fg }}>{c.name}</div>
                          <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, color: sub }}>{c.hex} · rgb({c.rgb})</div>
                        </div>
                      </div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub, maxWidth: 300 }}>{c.usage}</div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 800, color: fg, marginBottom: 24 }}>Typography</h3>
              <div className="space-y-3">
                {typography.map((t, i) => (
                  <FadeUp key={t.name} delay={i * 0.04}>
                    <div style={{ padding: 20, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 12 }}>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg }}>{t.name}</div>
                          <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: sub }}>{t.font}</div>
                        </div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub }}>{t.usage}</div>
                      </div>
                      <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, color: sub }}>Sizes: {t.sizes} · Weight: {t.weight}</div>
                    </div>
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
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Logo usage guidelines</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>

          <FadeUp delay={0.1}>
            <div style={{ maxWidth: 700, margin: "0 auto", padding: 32, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16 }}>
              <ul className="space-y-3" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.7 }}>
                {guidelines.map((g, i) => (
                  <FadeUp key={i} delay={i * 0.04}>
                    <li className="flex items-start gap-3" style={{ color: g.startsWith("Do") ? "#22C27D" : "#EF4444" }}>
                      <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{g.startsWith("Do") ? "✓" : "✗"}</span>
                      <span style={{ color: fg }}>{g}</span>
                    </li>
                  </FadeUp>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </section>

      <section style={{ padding: "100px 0", background: bg }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <FadeUp className="flex items-center justify-center gap-3 mb-12">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Press contacts</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contacts.map((c, i) => (
                <FadeUp key={c.name} delay={i * 0.06}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    style={{ padding: 24, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16 }}
                  >
                    <div className="mb-4">
                      <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg }}>{c.name}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub, marginTop: 2 }}>{c.role}</div>
                    </div>
                    <a href={`mailto:${c.email}`} className="inline-flex items-center gap-2 text-sm font-medium mb-4" style={{ color: "#6357E8", textDecoration: "none" }}>
                      <Mail size={14} /> {c.email}
                    </a>
                    <a href={`https://twitter.com/${c.twitter.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium mb-4" style={{ color: "#1DA1F2", textDecoration: "none" }}>
                      <Twitter size={14} /> {c.twitter}
                    </a>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub, paddingTop: 12, borderTop: `1px solid ${borderColor}` }}>
                      <span style={{ fontWeight: 600, color: fg }}>Topics:</span> {c.topics}
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
          <RevealLine><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: fg, lineHeight: 0.92 }}>Need more?</div></RevealLine>
          <RevealLine delay={0.1}><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: "#6357E8", lineHeight: 0.92 }}>Email us.</div></RevealLine>
          <FadeUp delay={0.25}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: sub, maxWidth: 440, margin: "28px auto 40px", lineHeight: 1.65 }}>Custom assets, interviews, data — we're happy to help.</p></FadeUp>
          <FadeUp delay={0.35} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="mailto:press@noteflow.io" className="rounded-full flex items-center gap-2 group transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", background: "#6357E8", color: "white", textDecoration: "none" }}>
              <Mail size={15} /> press@noteflow.io
            </a>
            <a href="https://twitter.com/noteflow" target="_blank" rel="noopener noreferrer" className="rounded-full transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(14,14,12,0.14)"}`, color: fg, textDecoration: "none" }}>
              <Twitter size={15} /> @noteflow
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