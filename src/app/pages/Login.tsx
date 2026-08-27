import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import Logo from "../components/Logo";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Login() {
  const { dark } = useTheme();
  const { signIn, signInWithGoogle, signInWithGithub } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState("");
  const [error, setError] = useState("");

  const bg = dark ? "#0A0A08" : "#F7F6F2";
  const card = dark ? "#141412" : "#FFFFFF";
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(14,14,12,0.1)";
  const inputBg = dark ? "#0E0E0C" : "#F7F6F2";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      navigate("/dashboard");
    }
  }

  async function handleOAuth(provider: "google" | "github") {
    setError("");
    setOauthLoading(provider);
    const { error } = provider === "google" ? await signInWithGoogle() : await signInWithGithub();
    setOauthLoading("");
    if (error) {
      setError(error.message);
    } else {
      navigate("/dashboard");
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: bg, display: "flex", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Left brand panel */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="hidden lg:flex flex-col justify-between"
        style={{ width: 480, background: "#6357E8", padding: "48px 52px", flexShrink: 0, position: "relative", overflow: "hidden" }}
      >
        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }} />
        <div className="absolute -bottom-20 -right-20 rounded-full pointer-events-none" style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 65%)" }} />

        <div className="relative flex items-center gap-3">
          <Logo size={40} rounded="xl" />
          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 700, color: "white" }}>NoteFlow</span>
        </div>

        {/* Desktop back button - below logo */}
        <div className="mt-6">
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "color 0.2s", fontFamily: "'DM Sans', sans-serif" }} onMouseEnter={e => e.currentTarget.style.color = "white"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}>
            <ArrowLeft size={15} /> Back to NoteFlow
          </Link>
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
          >
            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(2.2rem, 3.5vw, 3rem)", fontWeight: 800, color: "white", lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 20 }}>
              Everything you think.<br />Nothing you don&apos;t.
            </div>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: 320 }}>
              Join over 2.4 million people who use NoteFlow to capture ideas, build wikis, and manage projects — free forever.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
            className="mt-10 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", padding: "20px 24px", backdropFilter: "blur(12px)" }}
          >
            <div className="flex items-center gap-3 mb-3">
              {["#FFB347", "#87CEEB", "#98D8A8"].map((c, i) => (
                <div key={i} className="rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ width: 28, height: 28, background: c, color: "#0E0E0C", marginLeft: i > 0 ? -8 : 0, border: "2px solid rgba(255,255,255,0.3)" }}>
                  {["A", "M", "R"][i]}
                </div>
              ))}
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginLeft: 4 }}>+2,400 joined today</span>
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", fontStyle: "italic" }}>
              "Replaced Notion, Bear, and my chaotic Finder folders in one afternoon."
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right form */}
      <div className="flex-1 flex flex-col items-center justify-center" style={{ padding: "48px 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          style={{ width: "100%", maxWidth: 400 }}
        >
{/* Mobile logo */}
        <div className="lg:hidden flex items-center justify-between mb-10">
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 8, color: sub, fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "color 0.2s", fontFamily: "'DM Sans', sans-serif" }} onMouseEnter={e => e.currentTarget.style.color = fg} onMouseLeave={e => e.currentTarget.style.color = sub}>
            <ArrowLeft size={15} /> Back to NoteFlow
          </Link>
          <Logo size={32} />
          <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg }}>NoteFlow</span>
        </div>

          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, color: fg, letterSpacing: "-0.03em", marginBottom: 6 }}>
            Welcome back
          </h1>
          <p style={{ fontSize: 15, color: sub, marginBottom: 36 }}>
            Don&apos;t have an account?{" "}
            <Link to="/signup" style={{ color: "#6357E8", fontWeight: 500 }}>Sign up free</Link>
          </p>

          {/* OAuth buttons */}
          <div className="flex flex-col gap-3 mb-6">
            {[
              { label: "Continue with Google", icon: "G", provider: "google" as const },
              { label: "Continue with GitHub", icon: "⌥", provider: "github" as const },
            ].map(({ label, icon, provider }) => (
              <button key={label} type="button" disabled={oauthLoading !== ""} onClick={() => handleOAuth(provider)}
                className="flex items-center justify-center gap-3 rounded-xl border transition-all duration-200 hover:border-[#6357E8]/40"
                style={{ width: "100%", padding: "13px 20px", background: card, border: `1px solid ${border}`, color: fg, fontSize: 14, fontWeight: 500, cursor: oauthLoading ? "wait" : "pointer", opacity: oauthLoading === provider || !oauthLoading ? 1 : 0.6 }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{icon}</span> {oauthLoading === provider ? "Connecting…" : label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div style={{ flex: 1, height: 1, background: border }} />
            <span style={{ fontSize: 12, color: sub }}>or continue with email</span>
            <div style={{ flex: 1, height: 1, background: border }} />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label style={{ fontSize: 13, fontWeight: 500, color: fg, display: "block", marginBottom: 6 }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{ width: "100%", background: inputBg, border: `1px solid ${border}`, borderRadius: 12, padding: "12px 16px", fontSize: 14, color: fg, outline: "none", fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box" }}
                onFocus={e => (e.target.style.borderColor = "#6357E8")}
                onBlur={e => (e.target.style.borderColor = border)}
              />
            </div>
            <div>
              <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: fg }}>Password</label>
                <a href="#" style={{ fontSize: 12, color: "#6357E8" }}>Forgot password?</a>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{ width: "100%", background: inputBg, border: `1px solid ${border}`, borderRadius: 12, padding: "12px 44px 12px 16px", fontSize: 14, color: fg, outline: "none", fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box" }}
                  onFocus={e => (e.target.style.borderColor = "#6357E8")}
                  onBlur={e => (e.target.style.borderColor = border)}
                />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: sub, cursor: "pointer", padding: 0 }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ fontSize: 13, color: "#EF4444", background: "rgba(239,68,68,0.1)", borderRadius: 8, padding: "10px 14px" }}>
                {error}
              </div>
            )}
            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200"
              style={{ width: "100%", padding: "14px", background: "#6357E8", color: "white", fontSize: 15, border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.75 : 1, marginTop: 4 }}
            >
              {loading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                  style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%" }} />
              ) : (<>Sign in <ArrowRight size={15} /></>)}
            </motion.button>
          </form>

          <p style={{ fontSize: 12, color: sub, textAlign: "center", marginTop: 24, lineHeight: 1.6 }}>
            By continuing you agree to our{" "}
            <a href="#" style={{ color: "#6357E8" }}>Terms</a> and{" "}
            <a href="#" style={{ color: "#6357E8" }}>Privacy Policy</a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
