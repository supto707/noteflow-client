import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { User, Bell, Shield, Palette, Globe, CreditCard, LogOut, Check, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { getUserProfile, updateUserProfile } from "../../lib/api";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy & Security", icon: Shield },
  { id: "language", label: "Language & Region", icon: Globe },
  { id: "billing", label: "Billing", icon: CreditCard },
];

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }} className={className}>
      {children}
    </motion.div>
  );
}

export default function Settings() {
  const { dark, toggle } = useTheme();
  const { user, signOut } = useAuth();
  const [active, setActive] = useState("profile");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [themeChoice, setThemeChoice] = useState<"light" | "dark" | "system">(dark ? "dark" : "light");

  useEffect(() => {
    if (!user) return;
    getUserProfile(user.id).then(p => {
      if (p) {
        setName(p.name || "");
        setEmail(p.email || "");
      }
      setLoading(false);
    });
  }, [user]);

  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const card = dark ? "#141412" : "#FFFFFF";
  const panelBg = dark ? "#111110" : "#FAFAF8";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.08)";
  const inputBg = dark ? "#0E0E0C" : "#F7F6F2";
  const hoverBg = dark ? "rgba(255,255,255,0.04)" : "rgba(14,14,12,0.04)";

  async function saveProfile() {
    if (!user) return;
    const { error } = await updateUserProfile(user.id, name);
    if (!error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  function applyTheme(choice: "light" | "dark" | "system") {
    setThemeChoice(choice);
    const shouldBeDark = choice === "dark" || (choice === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (shouldBeDark !== dark) toggle();
  }

  const notifSettings = [
    { label: "Email digest", desc: "Weekly summary of your activity", enabled: true },
    { label: "Collaboration alerts", desc: "When someone edits a shared page", enabled: true },
    { label: "Mentions", desc: "When someone @mentions you", enabled: true },
    { label: "Product updates", desc: "New features and announcements", enabled: false },
    { label: "Marketing emails", desc: "Tips, tutorials, and offers", enabled: false },
  ];
  const [notifs, setNotifs] = useState(notifSettings.map(n => n.enabled));

  return (
    <div className="flex h-full" style={{ fontFamily: "'DM Sans', sans-serif", background: dark ? "#0A0A08" : "#F7F6F2" }}>
      <div className="hidden md:flex flex-col flex-shrink-0 border-r" style={{ width: 220, background: panelBg, borderColor: border, padding: "24px 12px" }}>
        <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, fontWeight: 700, color: fg, padding: "0 8px", marginBottom: 16 }}>Settings</div>
        {sections.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActive(id)}
            className="flex items-center gap-2.5 rounded-lg w-full text-left transition-colors mb-0.5"
            style={{ padding: "8px 10px", background: active === id ? (dark ? "rgba(99,87,232,0.16)" : "rgba(99,87,232,0.09)") : "transparent", border: "none", cursor: "pointer", fontSize: 13, fontWeight: active === id ? 500 : 400, color: active === id ? "#6357E8" : sub }}
            onMouseEnter={e => { if (active !== id) (e.currentTarget as HTMLElement).style.background = hoverBg; }}
            onMouseLeave={e => { if (active !== id) (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
            <Icon size={14} style={{ flexShrink: 0 }} /> {label}
          </button>
        ))}
        <div style={{ marginTop: "auto", paddingTop: 16, borderTop: `1px solid ${border}` }}>
          <button onClick={signOut}
            className="flex items-center gap-2.5 rounded-lg w-full transition-colors"
            style={{ padding: "8px 10px", background: "none", border: "none", color: "#EF4444", fontSize: 13, cursor: "pointer" }}>
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto" style={{ padding: "40px 48px", scrollbarWidth: "none" }}>
        <motion.div key={active} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: EASE }} style={{ maxWidth: 600 }}>

          {active === "profile" && (
            <FadeUp>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: fg, letterSpacing: "-0.025em", marginBottom: 4 }}>Profile</h1>
              <p style={{ fontSize: 14, color: sub, marginBottom: 32 }}>Manage your personal information.</p>

              <div className="flex items-center gap-5 mb-8 pb-8" style={{ borderBottom: `1px solid ${border}` }}>
                <div className="rounded-full flex items-center justify-center text-2xl font-bold" style={{ width: 72, height: 72, background: "#6357E8", color: "white", fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  {name ? name[0] : "U"}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: fg, marginBottom: 4 }}>{name || "User"}</div>
                  <div style={{ fontSize: 13, color: sub, marginBottom: 10 }}>{email}</div>
                  <button style={{ padding: "6px 14px", background: dark ? "rgba(255,255,255,0.08)" : "rgba(14,14,12,0.08)", border: "none", borderRadius: 8, color: fg, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
                    Change photo
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: fg, display: "block", marginBottom: 6 }}>Full name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  style={{ width: "100%", background: inputBg, border: `1px solid ${border}`, borderRadius: 10, padding: "11px 14px", fontSize: 14, color: fg, outline: "none", fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box" }}
                  onFocus={e => (e.target.style.borderColor = "#6357E8")}
                  onBlur={e => (e.target.style.borderColor = border)} />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: fg, display: "block", marginBottom: 6 }}>Email address</label>
                <input type="email" value={email} disabled
                  style={{ width: "100%", background: inputBg, border: `1px solid ${border}`, borderRadius: 10, padding: "11px 14px", fontSize: 14, color: sub, outline: "none", fontFamily: "'DM Sans', sans-serif", boxSizing: "border-box", opacity: 0.7 }} />
              </div>

              <button onClick={saveProfile}
                className="flex items-center gap-2 rounded-xl transition-all duration-200"
                style={{ padding: "11px 24px", background: saved ? "#22C27D" : "#6357E8", border: "none", color: "white", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
                {saved ? <><Check size={14} /> Saved!</> : "Save changes"}
              </button>
            </FadeUp>
          )}

          {active === "appearance" && (
            <FadeUp>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: fg, letterSpacing: "-0.025em", marginBottom: 4 }}>Appearance</h1>
              <p style={{ fontSize: 14, color: sub, marginBottom: 32 }}>Customize how NoteFlow looks for you.</p>

              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: fg, marginBottom: 14 }}>Theme</div>
                <div className="grid grid-cols-3 gap-3">
                  {([
                    { id: "light", label: "Light", icon: Sun },
                    { id: "dark", label: "Dark", icon: Moon },
                    { id: "system", label: "System", icon: Monitor },
                  ] as const).map(({ id, label, icon: Icon }) => (
                    <button key={id} onClick={() => applyTheme(id)}
                      className="rounded-xl border flex flex-col items-center gap-2 transition-all duration-200"
                      style={{ padding: "18px 12px", background: themeChoice === id ? "rgba(99,87,232,0.1)" : card, borderColor: themeChoice === id ? "#6357E8" : border, cursor: "pointer", borderWidth: themeChoice === id ? 2 : 1 }}>
                      <Icon size={20} style={{ color: themeChoice === id ? "#6357E8" : sub }} />
                      <span style={{ fontSize: 13, fontWeight: 500, color: themeChoice === id ? "#6357E8" : fg }}>{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </FadeUp>
          )}

          {active === "notifications" && (
            <FadeUp>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: fg, letterSpacing: "-0.025em", marginBottom: 4 }}>Notifications</h1>
              <p style={{ fontSize: 14, color: sub, marginBottom: 32 }}>Choose what you want to be notified about.</p>
              <div className="flex flex-col" style={{ gap: 0 }}>
                {notifSettings.map((n, i) => (
                  <div key={n.label} className="flex items-center justify-between" style={{ padding: "18px 0", borderBottom: i < notifSettings.length - 1 ? `1px solid ${border}` : "none" }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: fg, marginBottom: 2 }}>{n.label}</div>
                      <div style={{ fontSize: 12, color: sub }}>{n.desc}</div>
                    </div>
                    <button onClick={() => setNotifs(prev => prev.map((v, j) => j === i ? !v : v))}
                      className="rounded-full transition-all duration-200 flex-shrink-0"
                      style={{ width: 44, height: 24, background: notifs[i] ? "#6357E8" : (dark ? "rgba(255,255,255,0.1)" : "rgba(14,14,12,0.15)"), border: "none", cursor: "pointer", position: "relative" }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "white", position: "absolute", top: 3, left: notifs[i] ? 23 : 3, transition: "left 0.2s ease", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                    </button>
                  </div>
                ))}
              </div>
            </FadeUp>
          )}

          {active === "privacy" && (
            <FadeUp>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: fg, letterSpacing: "-0.025em", marginBottom: 4 }}>Privacy & Security</h1>
              <p style={{ fontSize: 14, color: sub, marginBottom: 32 }}>Manage your data and security settings.</p>

              {[
                { title: "Change password", desc: "Update your account password.", btn: "Update", btnColor: "#6357E8" },
                { title: "Two-factor authentication", desc: "Add an extra layer of security with an authenticator app.", btn: "Enable 2FA", btnColor: "#22C27D" },
                { title: "Active sessions", desc: `You are signed in on your current device.`, btn: "Manage sessions", btnColor: fg },
                { title: "Delete account", desc: "Permanently delete your account and all your data. This cannot be undone.", btn: "Delete account", btnColor: "#EF4444" },
              ].map(item => (
                <div key={item.title} className="flex items-start justify-between pb-6 mb-6" style={{ borderBottom: `1px solid ${border}` }}>
                  <div style={{ maxWidth: 360 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: fg, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: sub, lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                  <button style={{ padding: "7px 16px", background: item.btn === "Delete account" ? "rgba(239,68,68,0.1)" : (dark ? "rgba(255,255,255,0.08)" : "rgba(14,14,12,0.07)"), border: "none", borderRadius: 8, color: item.btnColor, fontSize: 13, fontWeight: 500, cursor: "pointer", flexShrink: 0, marginLeft: 16 }}>
                    {item.btn}
                  </button>
                </div>
              ))}
            </FadeUp>
          )}

          {active === "billing" && (
            <FadeUp>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: fg, letterSpacing: "-0.025em", marginBottom: 4 }}>Billing</h1>
              <p style={{ fontSize: 14, color: sub, marginBottom: 32 }}>Your plan and billing information.</p>

              <div className="rounded-2xl border mb-8" style={{ padding: 28, background: card, borderColor: border, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #6357E8, #22C27D)" }} />
                <div className="flex items-start justify-between">
                  <div>
                    <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#22C27D", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Current plan</div>
                    <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "2.5rem", fontWeight: 800, color: fg, letterSpacing: "-0.04em", lineHeight: 1 }}>Free</div>
                    <div style={{ fontSize: 14, color: sub, marginTop: 4 }}>$0 / month · Forever</div>
                  </div>
                  <div className="rounded-full" style={{ padding: "6px 16px", background: "rgba(34,194,125,0.12)", color: "#22C27D", fontSize: 12, fontWeight: 600 }}>
                    ✓ Active
                  </div>
                </div>
              </div>
            </FadeUp>
          )}

          {active === "language" && (
            <FadeUp>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, color: fg, letterSpacing: "-0.025em", marginBottom: 4 }}>Language & Region</h1>
              <p style={{ fontSize: 14, color: sub, marginBottom: 32 }}>Set your language, date format, and timezone.</p>
              {[
                { label: "Language", options: ["English (US)", "English (UK)", "日本語", "Deutsch", "Français", "Español"], current: "English (US)" },
                { label: "Date format", options: ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"], current: "YYYY-MM-DD" },
                { label: "Timezone", options: ["UTC", "America/New_York", "Europe/London", "Asia/Tokyo"], current: "Europe/London" },
              ].map(({ label, options, current }) => (
                <div key={label} style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 13, fontWeight: 500, color: fg, display: "block", marginBottom: 6 }}>{label}</label>
                  <select defaultValue={current}
                    style={{ width: "100%", background: inputBg, border: `1px solid ${border}`, borderRadius: 10, padding: "11px 14px", fontSize: 14, color: fg, outline: "none", fontFamily: "'DM Sans', sans-serif", cursor: "pointer", appearance: "none" }}>
                    {options.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </FadeUp>
          )}
        </motion.div>
      </div>
    </div>
  );
}
