import { Outlet, Navigate } from "react-router";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import { AuthProvider, useAuth } from "../../context/AuthContext";

function ThemedRoot() {
  const { dark } = useTheme();
  return (
    <div className={dark ? "dark" : ""} style={{ minHeight: "100vh", background: dark ? "#0E0E0C" : "#F7F6F2" }}>
      <Outlet />
    </div>
  );
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ThemedRoot />
      </AuthProvider>
    </ThemeProvider>
  );
}
