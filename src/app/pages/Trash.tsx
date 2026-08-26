import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Trash2, RotateCcw, FileText, Clock } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { getUserWorkspace, getTrashedPages, restorePage, deletePagePermanently } from "../../lib/api";
import type { Page } from "../../lib/api";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

export default function TrashPage() {
  const { dark } = useTheme();
  const { user } = useAuth();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getUserWorkspace(user.id).then(wsId => {
      if (wsId) getTrashedPages(wsId).then(data => {
        setPages(data);
        setLoading(false);
      }); else setLoading(false);
    });
  }, [user]);

  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const card = dark ? "#141412" : "#FFFFFF";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.08)";
  const hoverBg = dark ? "rgba(255,255,255,0.035)" : "rgba(14,14,12,0.025)";

  async function handleRestore(pageId: string) {
    await restorePage(pageId);
    setPages(prev => prev.filter(p => p.id !== pageId));
  }

  async function handleDelete(pageId: string) {
    await deletePagePermanently(pageId);
    setPages(prev => prev.filter(p => p.id !== pageId));
  }

  return (
    <div style={{ padding: "40px 48px", maxWidth: 900, margin: "0 auto", fontFamily: "'DM Sans', sans-serif" }}>
      <FadeUp delay={0.05}>
        <div className="flex items-center gap-3 mb-2">
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "#EF4444" + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Trash2 size={17} style={{ color: "#EF4444" }} />
          </div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: fg, letterSpacing: "-0.03em" }}>
            Trash
          </h1>
        </div>
        <p style={{ fontSize: 14, color: sub, marginBottom: 32 }}>Deleted pages. Restore them within 30 days.</p>
      </FadeUp>

      {loading ? (
        <div style={{ color: sub, fontSize: 14 }}>Loading…</div>
      ) : pages.length === 0 ? (
        <FadeUp delay={0.1}>
          <div className="rounded-2xl border flex flex-col items-center justify-center" style={{ background: card, borderColor: border, padding: "80px 40px" }}>
            <Trash2 size={40} style={{ color: sub, opacity: 0.3, marginBottom: 16 }} />
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg, marginBottom: 8 }}>Trash is empty</div>
            <p style={{ fontSize: 14, color: sub, textAlign: "center" }}>Deleted pages will appear here.</p>
          </div>
        </FadeUp>
      ) : (
        <div className="flex flex-col gap-2">
          {pages.map((page, i) => (
            <FadeUp key={page.id} delay={0.05 + i * 0.04}>
              <div className="rounded-xl border flex items-center" style={{ padding: "14px 18px", background: card, borderColor: border }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#EF4444" + "14", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginRight: 14 }}>
                  <FileText size={14} style={{ color: "#EF4444" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: fg, marginBottom: 2 }}>{page.title}</div>
                  <div style={{ fontSize: 12, color: sub }}>Deleted · {new Date(page.updated_at).toLocaleDateString()}</div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => handleRestore(page.id)}
                    className="flex items-center gap-1.5 rounded-lg transition-colors"
                    style={{ padding: "7px 14px", background: dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.06)", border: "none", color: "#22C27D", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
                    <RotateCcw size={12} /> Restore
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(page.id)}
                    className="flex items-center gap-1.5 rounded-lg transition-colors"
                    style={{ padding: "7px 14px", background: "rgba(239,68,68,0.1)", border: "none", color: "#EF4444", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
                    <Trash2 size={12} /> Delete
                  </motion.button>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      )}
    </div>
  );
}
