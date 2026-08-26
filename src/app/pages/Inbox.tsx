import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Inbox, FileText, Clock, User } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { getInboxPages } from "../../lib/api";
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

export default function InboxPage() {
  const { dark } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getInboxPages(user.id).then(data => {
      setPages(data);
      setLoading(false);
    });
  }, [user]);

  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const card = dark ? "#141412" : "#FFFFFF";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.08)";
  const hoverBg = dark ? "rgba(255,255,255,0.035)" : "rgba(14,14,12,0.025)";

  return (
    <div style={{ padding: "40px 48px", maxWidth: 900, margin: "0 auto", fontFamily: "'DM Sans', sans-serif" }}>
      <FadeUp delay={0.05}>
        <div className="flex items-center gap-3 mb-2">
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "#6357E8" + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Inbox size={17} style={{ color: "#6357E8" }} />
          </div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, color: fg, letterSpacing: "-0.03em" }}>
            Inbox
          </h1>
        </div>
        <p style={{ fontSize: 14, color: sub, marginBottom: 32 }}>Pages shared with you.</p>
      </FadeUp>

      {loading ? (
        <div style={{ color: sub, fontSize: 14 }}>Loading…</div>
      ) : pages.length === 0 ? (
        <FadeUp delay={0.1}>
          <div className="rounded-2xl border flex flex-col items-center justify-center" style={{ background: card, borderColor: border, padding: "80px 40px" }}>
            <Inbox size={40} style={{ color: sub, opacity: 0.3, marginBottom: 16 }} />
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg, marginBottom: 8 }}>All caught up</div>
            <p style={{ fontSize: 14, color: sub, textAlign: "center" }}>No pages have been shared with you yet.</p>
          </div>
        </FadeUp>
      ) : (
        <div className="flex flex-col gap-2">
          {pages.map((page, i) => (
            <FadeUp key={page.id} delay={0.05 + i * 0.04}>
              <motion.div whileHover={{ y: -1 }}
                onClick={() => navigate("/dashboard/notes")}
                className="rounded-xl border cursor-pointer"
                style={{ padding: "16px 20px", background: card, borderColor: border }}
                onMouseEnter={e => (e.currentTarget.style.background = hoverBg)}
                onMouseLeave={e => (e.currentTarget.style.background = card)}>
                <div className="flex items-start gap-3">
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "#6357E8" + "16", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <FileText size={14} style={{ color: "#6357E8" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: fg, marginBottom: 4 }}>{page.title}</div>
                    <div className="flex items-center gap-3" style={{ fontSize: 12, color: sub }}>
                      <span className="flex items-center gap-1"><Clock size={11} /> {new Date(page.updated_at).toLocaleDateString()}</span>
                    </div>
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
