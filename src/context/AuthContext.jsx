import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [session, setSession] = useState(null);
  const [role, setRole]       = useState(null);   // 'student' | 'job_seeker' | 'instructor' | 'admin'
  const [loading, setLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(false);
  const mounted               = useRef(true);

  // Fetch backend role from /api/auth/me whenever we have a token
  const fetchRole = async () => {
    try {
      const data = await apiGetMe();
      const r = data?.user?.role || data?.role || null;
      if (mounted.current) setRole(r);
      return r;
    } catch {
      if (mounted.current) setRole(null);
      return null;
    }
  };

  useEffect(() => {
    mounted.current = true;
    if (!supabase) { setLoading(false); return; }

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!mounted.current) return;
      setSession(session);
      setUser(session?.user ?? null);
      // If token already in localStorage, resolve role immediately
      if (localStorage.getItem('token')) {
        setRoleLoading(true);
        await fetchRole();
        setRoleLoading(false);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted.current) return;
        setSession(session);
        setUser(session?.user ?? null);
        if (event === 'SIGNED_OUT') { setRole(null); localStorage.removeItem('token'); }
      }
    );

    return () => { mounted.current = false; subscription.unsubscribe(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signInWithEmail = async (email, password) => {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    // Get backend JWT + role
    try {
      const res = await apiLogin(email, password);
      if (mounted.current) setRole(res?.user?.role || null);
      return { ...data, backendRole: res?.user?.role };
    } catch {
      return data;
    }
  };

  const signInWithGoogle = async () => {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
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
