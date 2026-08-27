import { useState, useEffect, useRef } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Home, FileText, Database, BookOpen, Settings,
  Search, Sun, Moon, ChevronRight, Plus, Menu, X,
  Inbox, Star, Trash2, Hash, Clock, LogOut
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { getUserProfile, getUserWorkspace, getPages, createPage } from "../../lib/api";
import Logo from "../components/Logo";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const navItems = [
  { label: "Home", icon: Home, to: "/dashboard" },
  { label: "Notes", icon: FileText, to: "/dashboard/notes" },
  { label: "Databases", icon: Database, to: "/dashboard/databases" },
  { label: "Wiki", icon: BookOpen, to: "/dashboard/wiki" },
];

const secondaryItems = [
  { label: "Inbox", icon: Inbox, badge: 0, to: "/dashboard/inbox" },
  { label: "Favorites", icon: Star, to: "/dashboard/favorites" },
  { label: "Recent", icon: Clock, to: "/dashboard/recent" },
  { label: "Tags", icon: Hash, to: "/dashboard/tags" },
  { label: "Trash", icon: Trash2, to: "/dashboard/trash" },
];

export default function DashboardLayout() {
  const { dark, toggle } = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profile, setProfile] = useState({ name: "User", email: "", avatar_url: null as string | null });
  const [recentPages, setRecentPages] = useState<{ title: string; tag: string; color: string }[]>([]);
  const location = useLocation();
  const wsIdRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    getUserProfile(user.id).then(p => {
      if (!cancelled && p) setProfile({ name: p.name || "User", email: p.email, avatar_url: p.avatar_url });
    });

    async function loadRecent() {
      const wsId = wsIdRef.current;
      if (!wsId) return;
      const pages = await getPages(wsId);
      if (cancelled) return;
      setRecentPages(pages.slice(0, 5).map(p => ({ title: p.title, tag: p.is_published ? "Published" : "Draft", color: "#6357E8" })));
    }

    getUserWorkspace(user.id).then(wsId => {
      if (cancelled) return;
      wsIdRef.current = wsId;
      loadRecent();
    });

    const interval = setInterval(loadRecent, 4000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [user, location.pathname]);

  const bg = dark ? "#0A0A08" : "#F7F6F2";
  const sidebarBg = dark ? "#0E0E0C" : "#FFFFFF";
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#8A8A80";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.08)";
  const hoverBg = dark ? "rgba(255,255,255,0.05)" : "rgba(14,14,12,0.05)";
  const activeBg = dark ? "rgba(99,87,232,0.16)" : "rgba(99,87,232,0.1)";

  const SIDEBAR_W = collapsed ? 64 : 240;

  const SidebarContent = () => (
    <div className="flex flex-col h-full" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Logo + collapse */}
      <div className="flex items-center justify-between" style={{ padding: collapsed ? "18px 16px" : "18px 16px 18px 20px", marginBottom: 4 }}>
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <Logo size={30} />
            <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, color: fg }}>NoteFlow</span>
          </div>
        )}
        {collapsed && (
          <div className="mx-auto">
            <Logo size={30} />
          </div>
        )}
        {!collapsed && (
          <button onClick={() => setCollapsed(true)}
            style={{ background: "none", border: "none", color: sub, cursor: "pointer", padding: 4, borderRadius: 6 }}>
            <Menu size={15} />
          </button>
        )}
      </div>

      {/* Search */}
      {!collapsed ? (
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 rounded-lg mx-3 mb-4 transition-colors"
          style={{ padding: "8px 12px", background: dark ? "rgba(255,255,255,0.05)" : "rgba(14,14,12,0.05)", border: `1px solid ${border}`, cursor: "pointer", color: sub, fontSize: 13 }}
        >
          <Search size={13} />
          <span>Search…</span>
          <span className="ml-auto rounded" style={{ fontSize: 11, padding: "1px 6px", background: border, color: sub, fontFamily: "'Geist Mono', monospace" }}>⌘K</span>
        </button>
      ) : (
        <button onClick={() => setSearchOpen(true)} className="flex justify-center mx-auto mb-4 rounded-lg transition-colors"
          style={{ padding: 9, background: "none", border: "none", color: sub, cursor: "pointer" }}>
          <Search size={16} />
        </button>
      )}

      {/* New page */}
      {!collapsed && (
        <button onClick={async () => {
          if (!user) { alert("Please log in first"); return; }
          const wsId = await getUserWorkspace(user.id);
          if (!wsId) { alert("No workspace found for your account"); return; }
          const pageId = await createPage(wsId, user.id, "Untitled");
          if (pageId) navigate("/dashboard/notes"); else alert("Failed to create page — check console for details");
        }}
          className="flex items-center gap-2 rounded-lg mx-3 mb-4 transition-all duration-200 hover:bg-[#6357E8]"
          style={{ padding: "9px 12px", background: "#6357E8", border: "none", cursor: "pointer", color: "white", fontSize: 13, fontWeight: 500 }}>
          <Plus size={14} /> New page
        </button>
      )}
      {collapsed && (
        <button onClick={async () => {
          if (!user) { alert("Please log in first"); return; }
          const wsId = await getUserWorkspace(user.id);
          if (!wsId) { alert("No workspace found for your account"); return; }
          const pageId = await createPage(wsId, user.id, "Untitled");
          if (pageId) navigate("/dashboard/notes"); else alert("Failed to create page — check console for details");
        }}
          className="flex justify-center mx-auto mb-4 rounded-lg"
          style={{ padding: 9, background: "#6357E8", border: "none", cursor: "pointer", color: "white" }}>
          <Plus size={16} />
        </button>
      )}

      {/* Main nav */}
      <nav className="flex flex-col gap-0.5 px-2 mb-6">
        {navItems.map(({ label, icon: Icon, to }) => (
          <NavLink key={to} to={to} end={to === "/dashboard"}
            style={({ isActive }) => ({
              display: "flex", alignItems: "center", gap: 10, padding: collapsed ? "9px 0" : "9px 12px",
              borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: isActive ? 500 : 400,
              color: isActive ? "#6357E8" : sub, background: isActive ? activeBg : "transparent",
              transition: "all 0.15s", justifyContent: collapsed ? "center" : "flex-start",
            })}
            onMouseEnter={e => { if (!(e.currentTarget as HTMLElement).classList.contains("active")) (e.currentTarget as HTMLElement).style.background = hoverBg; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; if (!el.getAttribute("aria-current")) el.style.background = "transparent"; }}
          >
            <Icon size={16} style={{ flexShrink: 0 }} />
            {!collapsed && label}
          </NavLink>
        ))}
      </nav>

      {!collapsed && (
        <>
          <div style={{ fontSize: 10, fontWeight: 600, color: sub, padding: "0 20px", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Geist Mono', monospace" }}>
            Library
          </div>
          <nav className="flex flex-col gap-0.5 px-2 mb-6">
            {secondaryItems.map(({ label, icon: Icon, to }) => (
              <NavLink key={label} to={to}
                className="flex items-center gap-2.5 rounded-lg transition-colors"
                style={({ isActive }) => ({
                  padding: "8px 12px", background: isActive ? activeBg : "none", border: "none",
                  color: isActive ? "#6357E8" : sub, fontSize: 13, cursor: "pointer", textAlign: "left" as const,
                  textDecoration: "none",
                })}
                onMouseEnter={e => { if (!(e.currentTarget as HTMLElement).getAttribute("aria-current")) (e.currentTarget as HTMLElement).style.background = hoverBg; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; if (!el.getAttribute("aria-current")) el.style.background = "none"; }}
              >
                <Icon size={14} style={{ flexShrink: 0 }} />
                {label}
              </NavLink>
            ))}
          </nav>

          <div style={{ fontSize: 10, fontWeight: 600, color: sub, padding: "0 20px", marginBottom: 6, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Geist Mono', monospace" }}>
            Recent
          </div>
          <div className="flex flex-col gap-0.5 px-2">
            {recentPages.map(p => (
              <button key={p.title}
                className="flex items-center gap-2 rounded-lg text-left transition-colors"
                style={{ padding: "7px 12px", background: "none", border: "none", color: sub, fontSize: 12, cursor: "pointer" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = hoverBg)}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "none")}
              >
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
                <span className="truncate">{p.title}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Bottom user */}
      <div className="mt-auto" style={{ borderTop: `1px solid ${border}`, padding: collapsed ? "12px 8px" : "12px 16px" }}>
        <div className="flex items-center gap-3">
          <div className="rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{ width: 32, height: 32, background: "#6357E8", color: "white" }}>
            {profile.name[0] || "U"}
          </div>
          {!collapsed && (
            <>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: fg, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{profile.name}</div>
                <div style={{ fontSize: 11, color: sub, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{profile.email}</div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={toggle} style={{ background: "none", border: "none", color: sub, cursor: "pointer", padding: 4, borderRadius: 6 }}>
                  {dark ? <Sun size={14} /> : <Moon size={14} />}
                </button>
                <NavLink to="/dashboard/settings" style={{ color: sub, display: "flex", padding: 4, borderRadius: 6 }}>
                  <Settings size={14} />
                </NavLink>
                <button onClick={signOut} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", padding: 4, borderRadius: 6 }}>
                  <LogOut size={14} />
                </button>
              </div>
            </>
          )}
        </div>
        {collapsed && (
          <div className="flex flex-col items-center gap-1 mt-2">
            <button onClick={toggle} style={{ background: "none", border: "none", color: sub, cursor: "pointer", padding: 4 }}>
              {dark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button onClick={signOut} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", padding: 4 }}>
              <LogOut size={14} />
            </button>
            <button onClick={() => setCollapsed(false)} style={{ background: "none", border: "none", color: sub, cursor: "pointer", padding: 4 }}>
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: bg, fontFamily: "'DM Sans', sans-serif" }}>
      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: SIDEBAR_W }}
        transition={{ duration: 0.3, ease: EASE }}
        className="hidden md:flex flex-col flex-shrink-0"
        style={{ background: sidebarBg, borderRight: `1px solid ${border}`, overflow: "hidden" }}
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)} className="md:hidden fixed inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }} />
            <motion.aside initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="md:hidden fixed left-0 top-0 bottom-0 z-50 flex flex-col"
              style={{ width: 260, background: sidebarBg, borderRight: `1px solid ${border}` }}>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <div className="md:hidden flex items-center gap-3 px-4" style={{ height: 56, borderBottom: `1px solid ${border}`, background: sidebarBg }}>
          <button onClick={() => setMobileOpen(true)} style={{ background: "none", border: "none", color: sub, cursor: "pointer", padding: 4 }}>
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-[#6357E8] flex items-center justify-center" style={{ width: 26, height: 26 }}>
              <PenLine size={12} className="text-white" />
            </div>
            <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, color: fg }}>NoteFlow</span>
          </div>
          <button onClick={toggle} className="ml-auto" style={{ background: "none", border: "none", color: sub, cursor: "pointer" }}>
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>

      {/* Search modal */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)} className="fixed inset-0 z-50"
              style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }} />
            <motion.div initial={{ opacity: 0, scale: 0.96, y: -16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: -16 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="fixed z-50 rounded-2xl shadow-2xl overflow-hidden"
              style={{ top: "12vh", left: "50%", transform: "translateX(-50%)", width: "min(600px, 90vw)", background: sidebarBg, border: `1px solid ${border}` }}>
              <div className="flex items-center gap-3" style={{ padding: "16px 20px", borderBottom: `1px solid ${border}` }}>
                <Search size={16} style={{ color: sub, flexShrink: 0 }} />
                <input autoFocus value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search notes, pages, databases…"
                  style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 15, color: fg, fontFamily: "'DM Sans', sans-serif" }} />
                <button onClick={() => setSearchOpen(false)} style={{ background: "none", border: "none", color: sub, cursor: "pointer", padding: 2 }}>
                  <X size={16} />
                </button>
              </div>
              <div style={{ padding: "8px 0", maxHeight: 360, overflowY: "auto" }}>
                <div style={{ padding: "6px 20px 4px", fontSize: 10, color: sub, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Geist Mono', monospace" }}>Recent</div>
                {recentPages.map(p => (
                  <button key={p.title} onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-3 w-full transition-colors"
                    style={{ padding: "10px 20px", background: "none", border: "none", color: fg, fontSize: 14, cursor: "pointer", textAlign: "left" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = hoverBg)}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "none")}
                  >
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
                    {p.title}
                    <span className="ml-auto rounded" style={{ fontSize: 11, padding: "2px 8px", background: p.color + "18", color: p.color }}>{p.tag}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
