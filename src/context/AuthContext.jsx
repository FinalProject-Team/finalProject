import { createContext, useContext, useState, useEffect } from "react";

// ─────────────────────────────────────────────────────
//  Mock user — replace with real JWT / session logic
//  TODO: Connect to backend  POST /api/auth/login
// ─────────────────────────────────────────────────────
const MOCK_USER = {
  id: "u_001",
  name: "Salma Ahmed",
  role: "Frontend Developer",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Salma",
  level: 12,
  xp: 820,
  xpMax: 1200,
  verified: true,
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // TODO: Replace with real token validation on mount
  useEffect(() => {
    const stored = localStorage.getItem("ct_auth_user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
    } else {
      // Auto-login with mock user for development
      setUser(MOCK_USER);
      localStorage.setItem("ct_auth_user", JSON.stringify(MOCK_USER));
    }
    setLoading(false);
  }, []);

  function login(userData) {
    // TODO: Call POST /api/auth/login and store JWT
    const u = userData || MOCK_USER;
    setUser(u);
    localStorage.setItem("ct_auth_user", JSON.stringify(u));
  }

  function logout() {
    // TODO: Call POST /api/auth/logout
    setUser(null);
    localStorage.removeItem("ct_auth_user");
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
