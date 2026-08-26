import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Plus, ArrowRight, FileText, Database, BookOpen, Clock, Star, TrendingUp, Zap, LayoutGrid } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { getUserProfile, getUserWorkspace, getPages, createPage } from "../../lib/api";
import type { Page } from "../../lib/api";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const quickActions = [
  { label: "New note", icon: FileText, color: "#6357E8", to: "/dashboard/notes" },
  { label: "New database", icon: Database, color: "#22C27D", to: "/dashboard/databases" },
  { label: "New wiki page", icon: BookOpen, color: "#F59E0B", to: "/dashboard/wiki" },
  { label: "Open board", icon: LayoutGrid, color: "#EC4899", to: "/dashboard/databases" },
];

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE }} className={className}>
      {children}
    </motion.div>
  );
}

export default function Dashboard() {
  const { dark } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"recent" | "pinned">("recent");
  const [pages, setPages] = useState<Page[]>([]);
  const [profile, setProfile] = useState({ name: "User" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getUserProfile(user.id).then(p => {
      if (p) setProfile({ name: p.name || "User" });
    });
    getUserWorkspace(user.id).then(wsId => {
      if (wsId) getPages(wsId).then(data => {
        setPages(data);
        setLoading(false);
      });
    });
  }, [user]);

  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const card = dark ? "#141412" : "#FFFFFF";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.08)";

  const displayed = activeTab === "pinned" ? pages.filter(p => p.icon === "⭐") : pages;
  const nameParts = profile.name.split(" ");
  const firstName = nameParts[0] || profile.name;

  async function handleNewPage() {
    if (!user) return;
    const wsId = await getUserWorkspace(user.id);
    if (wsId) {
      const pageId = await createPage(wsId, user.id, "Untitled");
      if (pageId) navigate("/dashboard/notes");
    }
  }

  return (
    <div style={{ padding: "40px 48px", maxWidth: 1100, margin: "0 auto", fontFamily: "'DM Sans', sans-serif" }}>
      <FadeUp delay={0.05}>
        <div style={{ marginBottom: 6 }}>
          <p style={{ fontSize: 13, color: sub, marginBottom: 4, fontFamily: "'Geist Mono', monospace", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: fg, letterSpacing: "-0.035em", lineHeight: 1.1 }}>
            Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"}, {firstName}.
          </h1>
        </div>
      </FadeUp>

      <FadeUp delay={0.12} className="grid grid-cols-3 gap-4 mt-8 mb-8">
        {[
          { label: "Notes this week", value: loading ? "—" : `${pages.length}`, icon: FileText, delta: "All time" },
          { label: "Pages created", value: loading ? "—" : `${pages.length}`, icon: TrendingUp, delta: "All time" },
          { label: "Words written", value: loading ? "—" : "—", icon: Zap, delta: "This month" },
        ].map((s, i) => (
          <div key={s.label} className="rounded-2xl border flex flex-col"
            style={{ padding: "20px 24px", background: card, borderColor: border }}>
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontSize: 12, color: sub }}>{s.label}</span>
              <s.icon size={15} style={{ color: "#6357E8" }} />
            </div>
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "2rem", fontWeight: 800, color: fg, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 4 }}>
              {s.value}
            </div>
            <div style={{ fontSize: 11, color: sub }}>{s.delta}</div>
          </div>
        ))}
      </FadeUp>

      <FadeUp delay={0.18}>
        <div style={{ marginBottom: 8 }}>
          <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 17, fontWeight: 700, color: fg, marginBottom: 14, letterSpacing: "-0.01em" }}>
            Quick start
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickActions.map(({ label, icon: Icon, color, to }) => (
              <motion.button key={label} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                onClick={() => navigate(to)}
                className="flex flex-col items-start rounded-xl border transition-colors"
                style={{ padding: "16px 18px", background: card, borderColor: border, cursor: "pointer" }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: color + "16", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 500, color: fg }}>{label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </FadeUp>

      <FadeUp delay={0.24}>
        <div style={{ marginTop: 32 }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 17, fontWeight: 700, color: fg, letterSpacing: "-0.01em" }}>
                Pages
              </h2>
              <div className="flex gap-1 rounded-lg p-0.5" style={{ background: dark ? "rgba(255,255,255,0.05)" : "rgba(14,14,12,0.06)" }}>
                {(["recent", "pinned"] as const).map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className="rounded-md capitalize transition-all duration-150"
                    style={{ padding: "4px 12px", fontSize: 12, fontWeight: 500, cursor: "pointer", background: activeTab === tab ? card : "transparent", color: activeTab === tab ? fg : sub, border: "none", boxShadow: activeTab === tab ? "0 1px 3px rgba(0,0,0,0.1)" : "none" }}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => navigate("/dashboard/notes")}
              className="flex items-center gap-1.5 transition-colors"
              style={{ background: "none", border: "none", color: "#6357E8", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
              View all <ArrowRight size={13} />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {displayed.slice(0, 6).map((page, i) => (
              <motion.div key={page.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
                whileHover={{ y: -2 }}
                onClick={() => navigate("/dashboard/notes")}
                className="rounded-xl border cursor-pointer group"
                style={{ padding: "20px", background: card, borderColor: border, position: "relative", overflow: "hidden" }}>
                {page.icon === "⭐" && (
                  <Star size={11} style={{ position: "absolute", top: 14, right: 14, color: "#F59E0B", fill: "#F59E0B" }} />
                )}
                <div className="flex items-center gap-2 mb-3">
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#6357E8", flexShrink: 0 }} />
                  <span style={{ fontSize: 11, fontWeight: 500, borderRadius: 4, padding: "2px 8px", background: "rgba(99,87,232,0.1)", color: "#6357E8" }}>
                    {page.is_published ? "Published" : "Draft"}
                  </span>
                  <span style={{ fontSize: 11, color: sub, marginLeft: "auto" }}>
                    {new Date(page.updated_at).toLocaleDateString()}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, fontWeight: 700, color: fg, letterSpacing: "-0.01em", marginBottom: 8, lineHeight: 1.3 }}>
                  {page.title}
                </h3>
              </motion.div>
            ))}

            <motion.button whileHover={{ y: -2 }} onClick={handleNewPage}
              className="rounded-xl border border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors"
              style={{ padding: "20px", background: "transparent", borderColor: dark ? "rgba(255,255,255,0.1)" : "rgba(14,14,12,0.12)", minHeight: 140 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(99,87,232,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Plus size={16} style={{ color: "#6357E8" }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: "#6357E8" }}>New page</span>
            </motion.button>
          </div>
        </div>
      </FadeUp>

      <FadeUp delay={0.3}>
        <div style={{ marginTop: 40, borderTop: `1px solid ${border}`, paddingTop: 32 }}>
          <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 17, fontWeight: 700, color: fg, letterSpacing: "-0.01em", marginBottom: 16 }}>
            Activity
          </h2>
          <div className="flex flex-col gap-3">
            {pages.slice(0, 5).map((page, i) => (
              <div key={page.id} className="flex items-center gap-3">
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#6357E8" + "18", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Clock size={12} style={{ color: "#6357E8" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 13, color: sub }}>{i === 0 ? "Updated " : "Created "}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: fg }}>{page.title}</span>
                </div>
                <span style={{ fontSize: 11, color: sub, flexShrink: 0, fontFamily: "'Geist Mono', monospace" }}>
                  {new Date(page.updated_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </div>
  );
}
