import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Clock, FileText } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { getUserWorkspace, getRecentActivity } from "../../lib/api";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

export default function RecentPage() {
  const { dark } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState<{ id: string; title: string; updated_at: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getUserWorkspace(user.id).then(wsId => {
      if (wsId) getRecentActivity(wsId).then(data => {
        setItems(data);
        setLoading(false);
      }); else setLoading(false);
    });
  }, [user]);

  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const card = dark ? "#141412" : "#FFFFFF";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.08)";
  const hoverBg = dark ? "rgba(255,255,255,0.035)" : "rgba(14,14,12,0.025)";

  function timeAgo(date: string) {
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  }

  return (
    <div style={{ padding: "40px 48px", maxWidth: 900, margin: "0 auto", fontFamily: "'DM Sans', sans-serif" }}>
      <FadeUp delay={0.05}>
        <div className="flex items-center gap-3 mb-2">
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "#22C27D" + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Clock size={17} style={{ color: "#22C27D" }} />
          </div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: fg, letterSpacing: "-0.03em" }}>
            Recent
          </h1>
        </div>
        <p style={{ fontSize: 14, color: sub, marginBottom: 32 }}>Recently updated pages.</p>
      </FadeUp>

      {loading ? (
        <div style={{ color: sub, fontSize: 14 }}>Loading…</div>
      ) : items.length === 0 ? (
        <FadeUp delay={0.1}>
          <div className="rounded-2xl border flex flex-col items-center justify-center" style={{ background: card, borderColor: border, padding: "80px 40px" }}>
            <Clock size={40} style={{ color: sub, opacity: 0.3, marginBottom: 16 }} />
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg, marginBottom: 8 }}>No recent activity</div>
            <p style={{ fontSize: 14, color: sub, textAlign: "center" }}>Pages you view or edit will appear here.</p>
          </div>
        </FadeUp>
      ) : (
        <div className="flex flex-col gap-1">
          {items.map((item, i) => (
            <FadeUp key={item.id} delay={0.05 + i * 0.03}>
              <motion.div whileHover={{ x: 3 }}
                onClick={() => navigate("/dashboard/notes")}
                className="flex items-center gap-3 rounded-xl cursor-pointer"
                style={{ padding: "12px 16px" }}
                onMouseEnter={e => (e.currentTarget.style.background = hoverBg)}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "#6357E8" + "16", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <FileText size={13} style={{ color: "#6357E8" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: fg }}>{item.title}</span>
                </div>
                <span style={{ fontSize: 12, color: sub, flexShrink: 0, fontFamily: "'Geist Mono', monospace" }}>
                  {timeAgo(item.updated_at)}
                </span>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      )}
    </div>
  );
}
