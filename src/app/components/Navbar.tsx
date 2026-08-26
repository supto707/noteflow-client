import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { PenLine, Sun, Moon, Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const dropdownGroups = [
  {
    label: "Product",
    links: [
      { label: "Features", to: "/features", desc: "Everything NoteFlow can do" },
      { label: "Pricing", to: "/pricing", desc: "Free forever — no tricks" },
      { label: "Changelog", to: "/changelog", desc: "What shipped this month" },
      { label: "Roadmap", to: "/roadmap", desc: "What we're building next" },
      { label: "Status", to: "/status", desc: "Real-time system health" },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "Docs", to: "/docs", desc: "Guides, tutorials, references" },
      { label: "API Reference", to: "/api-reference", desc: "REST, GraphQL, realtime" },
      { label: "Templates", to: "/templates", desc: "Ready-to-use starter layouts" },
      { label: "Community", to: "/community", desc: "Events, forums, discussions" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About", to: "/about", desc: "Our team and mission" },
      { label: "Developer", to: "/developer", desc: "Meet the creator of NoteFlow" },
      { label: "Blog", to: "/blog", desc: "Deep dives and updates" },
      { label: "Careers", to: "/careers", desc: "Join the team" },
      { label: "Press Kit", to: "/press-kit", desc: "Logos, assets, brand guide" },
    ],
  },
  {
    label: "Legal",
    links: [
      { label: "Privacy", to: "/privacy", desc: "How we handle your data" },
      { label: "Terms", to: "/terms", desc: "Terms of service" },
      { label: "Cookie Policy", to: "/cookie-policy", desc: "Cookie usage explained" },
      { label: "Security", to: "/security", desc: "How we keep you safe" },
    ],
  },
];

export default function Navbar() {
  const { dark, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const positionDropdown = (label: string) => {
    const trigger = triggerRefs.current.get(label);
    if (trigger) {
      const rect = trigger.getBoundingClientRect();
      setDropdownLeft(rect.left + rect.width / 2);
    }
  };

  const open = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    positionDropdown(label);
    setOpenGroup(label);
  };

  const close = () => {
    timeoutRef.current = setTimeout(() => setOpenGroup(null), 100);
  };

  const closeAll = () => {
    setOpenGroup(null);
    setMobileOpen(false);
  };

  const bg = dark ? "rgba(10,10,8,0.92)" : "rgba(247,246,242,0.92)";
  const borderColor = dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.08)";
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const fg2 = dark ? "#8A8A80" : "#6E6E68";
  const dropdownBg = dark ? "#141412" : "#FFFFFF";
  const hoverBg = dark ? "rgba(255,255,255,0.05)" : "rgba(14,14,12,0.04)";

  return (
    <header ref={navRef} className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{ background: scrolled ? bg : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: `1px solid ${scrolled ? borderColor : "transparent"}` }}>
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between" style={{ height: 68 }}>
        <Link to="/" onClick={closeAll} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div className="rounded-lg bg-[#6357E8] flex items-center justify-center" style={{ width: 34, height: 34 }}><PenLine size={16} className="text-white" /></div>
          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg }}>NoteFlow</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {dropdownGroups.map(group => (
            <div key={group.label} className="relative"
              onMouseEnter={() => open(group.label)}
              onMouseLeave={close}>
              <button
                ref={el => { if (el) triggerRefs.current.set(group.label, el); }}
                className="flex items-center gap-1 transition-colors duration-200"
                onClick={() => {
                  const next = openGroup === group.label ? null : group.label;
                  if (next) positionDropdown(next);
                  setOpenGroup(next);
                }}
                style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
                  color: openGroup === group.label ? fg : fg2,
                  background: "none", border: "none", cursor: "pointer",
                  padding: "8px 12px", borderRadius: 8,
                }}>
                {group.label}
                <ChevronDown size={13} style={{ transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1)", transform: openGroup === group.label ? "rotate(180deg)" : "rotate(0deg)" }} />
              </button>
            </div>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button onClick={toggle} className="rounded-full border flex items-center justify-center transition-all hover:scale-110"
            style={{ width: 38, height: 38, borderColor: dark ? "rgba(255,255,255,0.1)" : "rgba(14,14,12,0.12)", color: fg2, background: "transparent", cursor: "pointer" }}>
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <Link to="/login" onClick={closeAll} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500, color: fg2, textDecoration: "none" }}>Sign in</Link>
          <Link to="/signup" onClick={closeAll}
            className="rounded-full flex items-center gap-1.5 group transition-all duration-300"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, padding: "10px 22px", background: "#6357E8", color: "white", textDecoration: "none" }}>
            Get started free <ArrowRight size={13} />
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggle} style={{ color: fg2, background: "transparent", border: "none", cursor: "pointer" }}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
          <button onClick={() => { setMobileOpen(!mobileOpen); setOpenGroup(null); }} style={{ color: fg, background: "transparent", border: "none", cursor: "pointer" }}>{mobileOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </nav>

      <AnimatePresence>
        {openGroup && (() => {
          const group = dropdownGroups.find(g => g.label === openGroup);
          if (!group) return null;
          return (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: -4, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => open(group.label)}
              onMouseLeave={close}
              className="hidden lg:block absolute"
              style={{
                top: 68,
                left: dropdownLeft,
                transform: "translateX(-50%)",
                background: dropdownBg,
                borderBottom: `1px solid ${borderColor}`,
                boxShadow: dark
                  ? "0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)"
                  : "0 4px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
                borderRadius: 12,
                overflow: "hidden",
              }}>
              <div className="py-2 px-2" style={{ minWidth: 280 }}>
                {group.links.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] }}>
                    <Link to={link.to} onClick={closeAll}
                      className="flex flex-col rounded-lg transition-colors duration-150"
                      style={{ padding: "10px 14px", textDecoration: "none", background: "transparent" }}
                      onMouseEnter={e => (e.currentTarget.style.background = hoverBg)}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, color: fg, lineHeight: 1.4 }}>{link.label}</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: fg2, lineHeight: 1.4, marginTop: 2 }}>{link.desc}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {mobileOpen && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t overflow-y-auto"
          style={{ background: dark ? "#0A0A08" : "#F7F6F2", borderColor, maxHeight: "calc(100vh - 68px)" }}>
          <div className="px-6 py-6 flex flex-col gap-6">
            {dropdownGroups.map(group => (
              <div key={group.label}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, color: fg2, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{group.label}</div>
                <div className="flex flex-col gap-1">
                  {group.links.map(link => (
                    <Link key={link.to} to={link.to} onClick={closeAll}
                      style={{ fontSize: 15, fontWeight: 500, color: fg, textDecoration: "none", padding: "8px 0" }}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${borderColor}`, paddingTop: 16 }}>
              <Link to="/signup" onClick={closeAll} style={{ borderRadius: 99, background: "#6357E8", color: "white", textAlign: "center", padding: "12px", fontWeight: 500, textDecoration: "none", display: "block" }}>Get started free</Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
