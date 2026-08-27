import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Eye, EyeOff, ArrowRight, Check, ArrowLeft } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import Logo from "../components/Logo";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const perks = [
  "Unlimited notes and pages",
  "All views — board, table, calendar",
  "Real-time collaboration",
  "Free forever, no credit card",
];

export default function Signup() {
  const { dark } = useTheme();
  const { signUp, signInWithGoogle, signInWithGithub } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
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
    setError("");
    if (step === 1) { setStep(2); return; }
    setLoading(true);
    const { error } = await signUp(email, password, name);
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
      {/* Left panel */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="hidden lg:flex flex-col justify-between"
        style={{ width: 480, background: "#0E0E0C", padding: "48px 52px", flexShrink: 0, position: "relative", overflow: "hidden" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }} />
        <div className="absolute top-0 right-0 pointer-events-none" style={{ width: 300, height: 300, background: "radial-gradient(circle, rgba(99,87,232,0.2) 0%, transparent 65%)" }} />

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
          <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 800, color: "white", lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 32 }}>
            Your second brain,<br />
            <span style={{ color: "#6357E8" }}>free forever.</span>
          </div>

          <div className="flex flex-col gap-4">
            {perks.map((p, i) => (
              <motion.div key={p} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease: EASE }}
                className="flex items-center gap-3">
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(99,87,232,0.25)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Check size={11} style={{ color: "#6357E8" }} />
                </div>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{p}</span>
              </motion.div>
            ))}
          </div>
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

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2].map(s => (
              <div key={s} style={{ height: 3, borderRadius: 99, flex: 1, background: s <= step ? "#6357E8" : border, transition: "background 0.3s" }} />
            ))}
          </div>

          <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, color: fg, letterSpacing: "-0.03em", marginBottom: 6 }}>
            {step === 1 ? "Create your account" : "Set a password"}
          </h1>
          <p style={{ fontSize: 15, color: sub, marginBottom: 32 }}>
            {step === 1 ? (
              <>Already have an account? <Link to="/login" style={{ color: "#6357E8", fontWeight: 500 }}>Sign in</Link></>
            ) : (
              "Almost there. Choose a secure password."
            )}
          </p>

          {step === 1 && (
            <div className="flex flex-col gap-3 mb-6">
              {[
                { label: "Continue with Google", icon: "G", provider: "google" as const },
                { label: "Continue with GitHub", icon: "⌥", provider: "github" as const },
              ].map(({ label, icon, provider }) => (
                <button key={label} type="button" disabled={oauthLoading !== ""} onClick={() => handleOAuth(provider)}
                  className="flex items-center justify-center gap-3 rounded-xl border transition-all duration-200"
                  style={{ width: "100%", padding: "13px 20px", background: card, border: `1px solid ${border}`, color: fg, fontSize: 14, fontWeight: 500, cursor: oauthLoading ? "wait" : "pointer", opacity: oauthLoading === provider || !oauthLoading ? 1 : 0.6 }}>
                  <span style={{ fontWeight: 700, fontSize: 15 }}>{icon}</span> {oauthLoading === provider ? "Connecting…" : label}
                </button>
              ))}
              <div className="flex items-center gap-3">
                <div style={{ flex: 1, height: 1, background: border }} />
                <span style={{ fontSize: 12, color: sub }}>or with email</span>
                <div style={{ flex: 1, height: 1, background: border }} />
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {step === 1 ? (
              <>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: fg, display: "block", marginBottom: 6 }}>Full name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ada Lovelace" required
                    style={{ width: "100%", background: inputBg, border: `1px solid ${border}`, borderRadius: 12, padding: "12px 16px", fontSize: 14, color: fg, outline: "none", fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box" }}
                    onFocus={e => (e.target.style.borderColor = "#6357E8")}
                    onBlur={e => (e.target.style.borderColor = border)} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: fg, display: "block", marginBottom: 6 }}>Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required
                    style={{ width: "100%", background: inputBg, border: `1px solid ${border}`, borderRadius: 12, padding: "12px 16px", fontSize: 14, color: fg, outline: "none", fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box" }}
                    onFocus={e => (e.target.style.borderColor = "#6357E8")}
                    onBlur={e => (e.target.style.borderColor = border)} />
                </div>
              </>
            ) : (
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: fg, display: "block", marginBottom: 6 }}>Password</label>
                <div style={{ position: "relative" }}>
                  <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters" required minLength={8}
                    style={{ width: "100%", background: inputBg, border: `1px solid ${border}`, borderRadius: 12, padding: "12px 44px 12px 16px", fontSize: 14, color: fg, outline: "none", fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box" }}
                    onFocus={e => (e.target.style.borderColor = "#6357E8")}
                    onBlur={e => (e.target.style.borderColor = border)} />
                  <button type="button" onClick={() => setShowPw(v => !v)}
                    style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: sub, cursor: "pointer", padding: 0 }}>
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {/* Strength bar */}
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4].map(n => (
                    <div key={n} style={{ flex: 1, height: 3, borderRadius: 99, background: password.length >= n * 2 ? (password.length >= 8 ? "#22C27D" : "#F59E0B") : border, transition: "background 0.3s" }} />
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div style={{ fontSize: 13, color: "#EF4444", background: "rgba(239,68,68,0.1)", borderRadius: 8, padding: "10px 14px" }}>
                {error}
              </div>
            )}
            <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 rounded-xl font-semibold"
              style={{ width: "100%", padding: "14px", background: "#6357E8", color: "white", fontSize: 15, border: "none", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.75 : 1, marginTop: 4 }}>
              {loading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                  style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%" }} />
              ) : (
                <>{step === 1 ? "Continue" : "Create account"} <ArrowRight size={15} /></>
              )}
            </motion.button>

            {step === 2 && (
              <button type="button" onClick={() => setStep(1)}
                style={{ background: "none", border: "none", color: sub, fontSize: 14, cursor: "pointer", padding: 0, textAlign: "center" }}>
                ← Back
              </button>
            )}
          </form>

          <p style={{ fontSize: 12, color: sub, textAlign: "center", marginTop: 24, lineHeight: 1.6 }}>
            By signing up you agree to our{" "}
            <a href="#" style={{ color: "#6357E8" }}>Terms</a> and{" "}
            <a href="#" style={{ color: "#6357E8" }}>Privacy Policy</a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
