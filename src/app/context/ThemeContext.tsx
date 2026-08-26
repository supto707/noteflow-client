import { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

type ThemeCtx = { dark: boolean; toggle: () => void };
const ThemeContext = createContext<ThemeCtx>({ dark: false, toggle: () => {} });

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem("nf-theme") === "dark"; } catch { return false; }
  });

  useEffect(() => {
    try { localStorage.setItem("nf-theme", dark ? "dark" : "light"); } catch {}
    // Add theme transition class to html element for smooth CSS transitions
    const root = document.documentElement;
    root.classList.add("theme-transitioning");
    requestAnimationFrame(() => {
      root.classList.remove("theme-transitioning");
    });
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
export { EASE as themeEase };
