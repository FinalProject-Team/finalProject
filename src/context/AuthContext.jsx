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

function buildUserPayload(signedUser) {
  if (!signedUser) return null;
  return {
    id: signedUser.id,
    email: signedUser.email,
    role: signedUser.user_metadata?.role || "student",
    avatar: signedUser.user_metadata?.avatar || MOCK_USER.avatar,
    hasPaid: signedUser.user_metadata?.hasPaid ?? false,
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function persistUser(userData) {
    setUser(userData);
    if (userData) {
      localStorage.setItem("ct_auth_user", JSON.stringify(userData));
    } else {
      localStorage.removeItem("ct_auth_user");
    }
  }

  useEffect(() => {
    let mounted = true;
    const restoreSession = async () => {
      if (!supabase) {
        const stored = localStorage.getItem("ct_auth_user");
        if (stored) {
          try { if (mounted) setUser(JSON.parse(stored)); } catch { }
        }
        if (mounted) setLoading(false);
        return;
      }

      const { data } = await supabase.auth.getSession();
      const signedUser = data?.session?.user;
      if (signedUser) {
        const payload = buildUserPayload(signedUser);
        persistUser(payload);
      } else {
        const stored = localStorage.getItem("ct_auth_user");
        if (stored) {
          try { if (mounted) setUser(JSON.parse(stored)); } catch { }
        }
      }
      if (mounted) setLoading(false);
    };

    restoreSession();

    const authListener = supabase?.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        const signedUser = session?.user;
        if (signedUser) {
          const payload = buildUserPayload(signedUser);
          persistUser(payload);
        }
      }

      if (event === 'SIGNED_OUT') {
        persistUser(null);
      }
    });

    const subscription = authListener?.data?.subscription ?? authListener?.subscription ?? authListener;

    return () => {
      mounted = false;
      if (subscription?.unsubscribe) {
        subscription.unsubscribe();
      } else if (typeof subscription === 'function') {
        subscription();
      }
    };
  }, []);

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
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) throw error;
    return data;
  }

  async function markPaid() {
    if (!user) return;
    const updated = { ...user, hasPaid: true };
    persistUser(updated);

    if (supabase) {
      const { error } = await supabase.auth.updateUser({ data: { hasPaid: true } });
      if (error) {
        console.warn('Unable to persist payment flag to Supabase:', error.message);
      }
    }
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
