import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import type { PlatformUser, ProfileRow, SubscriptionRow, Feature } from '@/types/platform';
import { hasAccess as hasAccessFn, isAdmin as isAdminFn } from '@/lib/access';

interface AuthContextType {
  user: PlatformUser | null;
  session: Session | null;
  loading: boolean;
  initializing: boolean;
  isAdmin: boolean;
  hasAccess: (feature: Feature) => boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

function authErrorDetails(error: unknown) {
  if (!error || typeof error !== 'object') return { name: null, message: String(error), status: null, code: null };
  const err = error as { name?: string; message?: string; status?: number; code?: string };
  return {
    name: err.name ?? null,
    message: err.message ?? null,
    status: err.status ?? null,
    code: err.code ?? null,
  };
}

function authResponseDetails(data: { user?: { id?: string; email?: string } | null; session?: Session | null } | null) {
  return {
    user: data?.user ? { id: data.user.id ?? null, email: data.user.email ?? null } : null,
    session: data?.session ? { user_id: data.session.user?.id ?? null, expires_at: data.session.expires_at ?? null } : null,
  };
}

function logAuthDiagnostic(label: string, error: unknown, data: { user?: { id?: string; email?: string } | null; session?: Session | null } | null = null) {
  if (!import.meta.env.DEV) return;
  console.error(`[Auth] ${label}`, {
    error: authErrorDetails(error),
    data: authResponseDetails(data),
  });
}

function exactAuthError(error: unknown, fallback: string) {
  const details = authErrorDetails(error);
  const prefix = [details.name, details.status ? `status ${details.status}` : null, details.code ? `code ${details.code}` : null]
    .filter(Boolean)
    .join(' · ');
  const exact = new Error(`${prefix ? `${prefix}: ` : ''}${details.message ?? fallback}`);
  exact.name = details.name ?? 'AuthError';
  Object.assign(exact, { status: details.status, code: details.code });
  return exact;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

async function loadUserData(userId: string, email: string): Promise<PlatformUser> {
  // Resilient hydration: never throw, fall back to safe defaults so the app can render.
  let profile: ProfileRow | null = null;
  let subscriptions: SubscriptionRow[] = [];

  try {
    const { data, error } = await supabase
      .from('profiles').select('*').eq('id', userId).maybeSingle();
    if (error) console.warn('[Auth] profile fetch error', error.message);
    profile = (data as ProfileRow | null) ?? null;
  } catch (e) {
    console.warn('[Auth] profile fetch threw', e);
  }

  try {
    const { data, error } = await supabase
      .from('subscriptions').select('*').eq('user_id', userId);
    if (error) console.warn('[Auth] subscriptions fetch error', error.message);
    subscriptions = ((data ?? []) as SubscriptionRow[]);
  } catch (e) {
    console.warn('[Auth] subscriptions fetch threw', e);
  }

  return {
    id: userId,
    email: profile?.email ?? email,
    name: profile?.full_name ?? email.split('@')[0] ?? 'Membro',
    role: (profile?.role as PlatformUser['role']) ?? 'student',
    avatar: profile?.avatar_url ?? undefined,
    profile,
    subscriptions,
  };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<PlatformUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  const hydrateUser = useCallback(async (s: Session | null) => {
    if (!s?.user) { setUser(null); return; }
    try {
      const data = await loadUserData(s.user.id, s.user.email ?? '');
      setUser(data);
    } catch (err) {
      console.error('[Auth] hydrate failed', err);
      setUser(null);
    }
  }, []);

  const refresh = useCallback(async () => {
    const { data: { session: s } } = await supabase.auth.getSession();
    setSession(s);
    await hydrateUser(s);
  }, [hydrateUser]);

  // Subscribe to realtime changes on subscriptions/profile of current user
  useEffect(() => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }
    if (!user?.id) return;

    const channel = supabase
      .channel(`user-access:${user.id}`)
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'subscriptions', filter: `user_id=eq.${user.id}` },
        () => { refresh(); })
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'profiles', filter: `id=eq.${user.id}` },
        () => { refresh(); })
      .subscribe();

    channelRef.current = channel;
    return () => { supabase.removeChannel(channel); channelRef.current = null; };
  }, [user?.id, refresh]);

  useEffect(() => {
    // Register listener FIRST, then load session
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      // defer to avoid deadlocks inside the callback
      setTimeout(() => { hydrateUser(s); }, 0);
    });

    supabase.auth.getSession().then(async ({ data: { session: s } }) => {
      setSession(s);
      await hydrateUser(s);
      setInitializing(false);
    });

    return () => { subscription.unsubscribe(); };
  }, [hydrateUser]);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        logAuthDiagnostic('signInWithPassword failed', error, data);
        throw exactAuthError(error, 'Falha ao iniciar sessão.');
      }
    } finally { setLoading(false); }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email, password,
        options: {
          emailRedirectTo: `${window.location.origin}/app`,
          data: { full_name: name },
        },
      });
      if (error) {
        logAuthDiagnostic('signUp failed', error, data);
        throw exactAuthError(error, 'Falha ao criar conta.');
      }
      // If email confirmation is required, Supabase returns a user but no session.
      if (data?.user && !data.session) {
        if (import.meta.env.DEV) console.info('[Auth] signUp requires confirmation', authResponseDetails(data));
        // Surface a soft signal via a thrown "info" — caught by UI to show success message instead of error.
        const info: any = new Error('CONFIRMATION_REQUIRED');
        info.code = 'CONFIRMATION_REQUIRED';
        throw info;
      }
    } finally { setLoading(false); }
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null); setSession(null);
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) throw error;
    } finally { setLoading(false); }
  }, []);

  const updatePassword = useCallback(async (newPassword: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
    } finally { setLoading(false); }
  }, []);

  const value: AuthContextType = {
    user, session, loading, initializing,
    isAdmin: isAdminFn(user),
    hasAccess: (feature) => hasAccessFn(user, feature),
    login, register, logout, resetPassword, updatePassword, refresh,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
