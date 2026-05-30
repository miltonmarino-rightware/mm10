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
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } finally { setLoading(false); }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: {
          emailRedirectTo: `${window.location.origin}/app`,
          data: { full_name: name },
        },
      });
      if (error) throw error;
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
