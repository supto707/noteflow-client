import { motion } from "motion/react";
import { Construction } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Wiki() {
  const { dark } = useTheme();

  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.08)";

  return (
    <div className="flex h-screen items-center justify-center" style={{ fontFamily: "'DM Sans', sans-serif", background: dark ? "#141412" : "#FFFFFF" }}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="flex flex-col items-center text-center"
        style={{ padding: "48px 56px", borderRadius: 16, border: `1px solid ${border}`, background: dark ? "#111110" : "#FAFAF8", maxWidth: 420 }}>
        <div className="flex items-center justify-center mb-5"
          style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(99,87,232,0.12)", color: "#6357E8" }}>
          <Construction size={26} />
        </div>
        <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 24, fontWeight: 800, color: fg, letterSpacing: "-0.02em", marginBottom: 8 }}>
          Wiki is under construction
        </h1>
        <p style={{ fontSize: 14, color: sub, lineHeight: 1.7 }}>
          We're building something great here. Check back soon.
        </p>
      </motion.div>
    </div>
  );
}
