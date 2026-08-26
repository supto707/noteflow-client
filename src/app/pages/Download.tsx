import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import {
  PenLine, ArrowRight, ChevronRight, Check, Download, Monitor, Smartphone, Tablet, HardDrive, Github, ExternalLink, Hash, Terminal, Apple, Monitor as WindowsIcon, Cpu as LinuxIcon, Bot
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

const platforms = [
  { name: "macOS", icon: Apple, color: "#8A8A80", desc: "Native app with menu bar, shortcuts, and Spotlight search", size: "142 MB", version: "1.0.0", min: "macOS 12+", badge: "Apple Silicon ready" },
  { name: "Windows", icon: WindowsIcon, color: "#0078D4", desc: "Native app with system tray, global shortcuts, and Jump Lists", size: "118 MB", version: "1.0.0", min: "Windows 10/11", badge: "ARM64 supported" },
  { name: "Linux", icon: LinuxIcon, color: "#F59E0B", desc: "AppImage, .deb, .rpm, Flatpak, Snap — pick your flavor", size: "135 MB", version: "1.0.0", min: "glibc 2.31+", badge: "Wayland & X11" },
  { name: "iOS / iPadOS", icon: Smartphone, color: "#0E0E0C", desc: "Full offline sync, Apple Pencil support, widgets, Shortcuts", size: "89 MB", version: "1.0.0", min: "iOS 16+", badge: "Universal purchase" },
  { name: "Android", icon: Bot, color: "#3DDC84", desc: "Material You theming, offline-first, split-screen, widgets", size: "94 MB", version: "1.0.0", min: "Android 10+", badge: "Play Store & F-Droid" },
  { name: "Web", icon: Monitor, color: "#6357E8", desc: "Runs in any browser — no install needed. PWA installable.", size: "—", version: "1.0.0", min: "Modern browser", badge: "Works offline" },
];

const checksums = {
  "macOS (Apple Silicon)": "sha256:3f2e1a4d8b7c9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4",
  "macOS (Intel)": "sha256:4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b",
  "Windows (x64)": "sha256:5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c",
  "Windows (ARM64)": "sha256:6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d",
  "Linux (AppImage)": "sha256:7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e",
  "Linux (.deb)": "sha256:8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f",
  "Linux (.rpm)": "sha256:9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a",
};

export default function Download() {
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
              <div className="w-1.5 h-1.5 rounded-full bg-[#6357E8]" /> Native apps for every platform <ChevronRight size={13} />
            </div>
          </FadeUp>

          <div className="mb-8" style={{ lineHeight: 0.92 }}>
            <RevealLine delay={0.1}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95 }}>Download</h1>
            </RevealLine>
            <RevealLine delay={0.18}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#6357E8", lineHeight: 0.95, marginTop: "0.06em" }}>NoteFlow</h1>
            </RevealLine>
          </div>

          <FadeUp delay={0.42}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2vw, 1.25rem)", color: sub, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
              One codebase. Every platform. Native performance. Zero compromise.
            </p>
          </FadeUp>
        </motion.div>
      </section>

      <section style={{ padding: "100px 0", background: bg }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {platforms.map((p, i) => (
              <FadeUp key={p.name} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  style={{ padding: 32, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 20, display: "flex", flexDirection: "column", height: "100%" }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div style={{ width: 64, height: 64, borderRadius: 16, background: `${p.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <p.icon size={28} style={{ color: p.color }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 800, color: fg }}>{p.name}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, marginTop: 2 }}>{p.badge}</div>
                    </div>
                  </div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: sub, lineHeight: 1.6, marginBottom: 16, flex: 1 }}>{p.desc}</p>
                  <div className="grid grid-cols-2 gap-3 mb-6" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
                    <div style={{ padding: "10px", background: dark ? "rgba(255,255,255,0.04)" : "rgba(14,14,12,0.04)", borderRadius: 8 }}>
                      <div style={{ color: sub, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Size</div>
                      <div style={{ color: fg, fontWeight: 500 }}>{p.size}</div>
                    </div>
                    <div style={{ padding: "10px", background: dark ? "rgba(255,255,255,0.04)" : "rgba(14,14,12,0.04)", borderRadius: 8 }}>
                      <div style={{ color: sub, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Version</div>
                      <div style={{ color: fg, fontWeight: 500 }}>{p.version}</div>
                    </div>
                    <div style={{ padding: "10px", background: dark ? "rgba(255,255,255,0.04)" : "rgba(14,14,12,0.04)", borderRadius: 8 }}>
                      <div style={{ color: sub, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Requires</div>
                      <div style={{ color: fg, fontWeight: 500 }}>{p.min}</div>
                    </div>
                    <div style={{ padding: "10px", background: dark ? "rgba(255,255,255,0.04)" : "rgba(14,14,12,0.04)", borderRadius: 8 }}>
                      <div style={{ color: sub, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>License</div>
                      <div style={{ color: fg, fontWeight: 500 }}>MIT</div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                    <a href={`/download/${p.name.toLowerCase().replace("/", "-")}`} className="inline-flex items-center justify-center gap-2 rounded-full flex-1 group transition-all duration-300"
                      style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, padding: "14px 24px", background: "#6357E8", color: "white", textDecoration: "none" }}>
                      <Download size={16} /> Download
                      </a>
                    <a href={`https://github.com/noteflow/releases/tag/${p.name.toLowerCase().replace("/", "-")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full"
                      style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, padding: "14px 24px", border: `1px solid ${borderColor}`, color: fg, textDecoration: "none" }}>
                      <Github size={16} /> GitHub
                    </a>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>

          <div style={{ marginTop: 60, padding: 32, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16 }}>
            <div className="flex items-center justify-between mb-6">
              <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 700, color: fg }}>Verify your download</h3>
              <a href="https://github.com/noteflow/noteflow/blob/main/SHA256SUMS" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#6357E8", display: "flex", alignItems: "center", gap: 4 }}>
                <ExternalLink size={13} /> Full checksums
              </a>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3" style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12 }}>
              {Object.entries(checksums).map(([platform, hash]) => (
                <div key={platform} style={{ padding: "12px", background: dark ? "rgba(255,255,255,0.04)" : "rgba(14,14,12,0.04)", borderRadius: 8, overflow: "hidden" }}>
                  <div style={{ color: sub, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{platform}</div>
                  <div style={{ color: fg, wordBreak: "break-all" }}>{hash}</div>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 16, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub }}>All releases are signed with our GPG key (available on <a href="https://keys.openpgp.org" target="_blank" rel="noopener noreferrer" style={{ color: "#6357E8" }}>keys.openpgp.org</a>). Verify with: <code style={{ fontFamily: "'Geist Mono', monospace", background: dark ? "rgba(255,255,255,0.08)" : "rgba(14,14,12,0.08)", padding: "2px 6px", borderRadius: 4 }}>gpg --verify Noteflow-1.0.0.dmg.sig</code></p>
          </div>

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <FadeUp>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: sub, marginBottom: 16 }}>Prefer the command line? Install via package managers:</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4" style={{ fontFamily: "'Geist Mono', monospace", fontSize: 14 }}>
                <code style={{ padding: "12px 16px", background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 8, color: fg }}>brew install noteflow</code>
                <code style={{ padding: "12px 16px", background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 8, color: fg }}>winget install Noteflow</code>
                <code style={{ padding: "12px 16px", background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 8, color: fg }}>scoop install noteflow</code>
                <code style={{ padding: "12px 16px", background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 8, color: fg }}>flatpak install flathub io.noteflow.App</code>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section style={{ padding: "140px 0", background: dark ? "#0E0E0C" : "#F7F6F2", overflow: "hidden", position: "relative" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,0.025)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.025)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative">
          <RevealLine><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: fg, lineHeight: 0.92 }}>Start today.</div></RevealLine>
          <RevealLine delay={0.1}><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: "#6357E8", lineHeight: 0.92 }}>It&apos;s free.</div></RevealLine>
          <FadeUp delay={0.25}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: sub, maxWidth: 440, margin: "28px auto 40px", lineHeight: 1.65 }}>No credit card. No trial. Just a better place to think and work.</p></FadeUp>
          <FadeUp delay={0.35} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/signup" className="rounded-full flex items-center gap-2 group transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", background: "#6357E8", color: "white", textDecoration: "none" }}>
              Create your free account <ArrowRight size={15} />
            </Link>
            <a href="#" className="rounded-full transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(14,14,12,0.14)"}`, color: fg, textDecoration: "none" }}>
              Read the docs
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