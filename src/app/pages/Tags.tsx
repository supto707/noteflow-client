import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Hash, FileText } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { getUserWorkspace, getPages } from "../../lib/api";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

export default function TagsPage() {
  const { dark } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pages, setPages] = useState<{ tag: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getUserWorkspace(user.id).then(wsId => {
      if (wsId) getPages(wsId).then(data => {
        const tagMap = new Map<string, number>();
        data.forEach(p => {
          if (p.is_published) tagMap.set("Published", (tagMap.get("Published") || 0) + 1);
          else tagMap.set("Draft", (tagMap.get("Draft") || 0) + 1);
        });
        setPages(Array.from(tagMap.entries()).map(([tag, count]) => ({ tag, count })));
        setLoading(false);
      }); else setLoading(false);
    });
  }, [user]);

  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const card = dark ? "#141412" : "#FFFFFF";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.08)";
  const hoverBg = dark ? "rgba(255,255,255,0.035)" : "rgba(14,14,12,0.025)";

  const tagColors = ["#6357E8", "#22C27D", "#F59E0B", "#EC4899", "#3B82F6"];

  return (
    <div style={{ padding: "40px 48px", maxWidth: 900, margin: "0 auto", fontFamily: "'DM Sans', sans-serif" }}>
      <FadeUp delay={0.05}>
        <div className="flex items-center gap-3 mb-2">
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "#EC4899" + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Hash size={17} style={{ color: "#EC4899" }} />
          </div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: fg, letterSpacing: "-0.03em" }}>
            Tags
          </h1>
        </div>
        <p style={{ fontSize: 14, color: sub, marginBottom: 32 }}>Browse pages by tag.</p>
      </FadeUp>

      {loading ? (
        <div style={{ color: sub, fontSize: 14 }}>Loading…</div>
      ) : pages.length === 0 ? (
        <FadeUp delay={0.1}>
          <div className="rounded-2xl border flex flex-col items-center justify-center" style={{ background: card, borderColor: border, padding: "80px 40px" }}>
            <Hash size={40} style={{ color: sub, opacity: 0.3, marginBottom: 16 }} />
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg, marginBottom: 8 }}>No tags yet</div>
            <p style={{ fontSize: 14, color: sub, textAlign: "center" }}>Pages will be grouped by status here.</p>
          </div>
        </FadeUp>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {pages.map(({ tag, count }, i) => (
            <FadeUp key={tag} delay={0.05 + i * 0.06}>
              <motion.div whileHover={{ y: -2 }}
                onClick={() => navigate("/dashboard/notes")}
                className="rounded-xl border cursor-pointer"
                style={{ padding: "20px", background: card, borderColor: border }}>
                <div className="flex items-center gap-3 mb-3">
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: tagColors[i % tagColors.length] + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Hash size={16} style={{ color: tagColors[i % tagColors.length] }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, color: fg }}>{tag}</div>
                    <div style={{ fontSize: 12, color: sub }}>{count} {count === 1 ? "page" : "pages"}</div>
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      )}
    </div>
  );
}
