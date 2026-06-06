import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

// ─────────────────────────────────────────────────────
//  Mock user — replace with real JWT / session logic
//  TODO: Connect with backend auth for email/password login
// ─────────────────────────────────────────────────────
const MOCK_USER = {
  id: "u_001",
  name: "Salma Ahmed",
  role: "student",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Salma",
  level: 12,
  xp: 820,
  xpMax: 1200,
  verified: true,
  hasPaid: false,
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("ct_auth_user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
    }
    setLoading(false);
  }, []);

  function persistUser(userData) {
    setUser(userData);
    localStorage.setItem("ct_auth_user", JSON.stringify(userData));
  }

  async function signInWithEmail(email, password) {
    if (!supabase) {
      const mock = { ...MOCK_USER, email, role: "student" };
      persistUser(mock);
      return { user: mock };
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    const signedUser = data?.user;
    if (!signedUser) throw new Error("Unable to sign in with email");
    const userPayload = {
      id: signedUser.id,
      email: signedUser.email,
      role: signedUser.user_metadata?.role || "student",
      avatar: signedUser.user_metadata?.avatar || MOCK_USER.avatar,
      hasPaid: signedUser.user_metadata?.hasPaid ?? false,
    };
    persistUser(userPayload);
    return { user: userPayload };
  }

  async function signInWithGoogle() {
    if (!supabase) throw new Error("Auth service not configured");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) throw error;
  }

  function markPaid() {
    if (!user) return;
    const updated = { ...user, hasPaid: true };
    persistUser(updated);
  }

  async function signOut() {
    if (supabase) {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    }
    setUser(null);
    localStorage.removeItem("ct_auth_user");
  }

  function getDashboardPath() {
    if (!user) return "/";
    if (user.role === "admin") return "/admin";
    if (user.role === "instructor") return "/instructor/dashboard";
    return "/dashboard/dashboard";
  }

  const authState = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    role: user?.role ?? null,
    hasPaid: user?.hasPaid ?? false,
    roleLoading: false,
    signInWithEmail,
    signInWithGoogle,
    signOut,
    markPaid,
    getDashboardPath,
  };

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
