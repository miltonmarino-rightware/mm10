import React, { createContext, useContext, useState, useCallback } from 'react';
import type { PlatformUser } from '@/types/platform';

interface AuthContextType {
  user: PlatformUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<PlatformUser | null>(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email: string, _password: string) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const isAdmin = email.toLowerCase().includes('admin') || email.toLowerCase().includes('tarik');
    setUser({
      id: isAdmin ? 'admin-1' : 'client-1',
      name: isAdmin ? 'Tarik' : email.split('@')[0],
      email,
      role: isAdmin ? 'admin' : 'client',
    });
    setLoading(false);
  }, []);

  const register = useCallback(async (name: string, email: string, _password: string) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setUser({ id: 'client-new', name, email, role: 'client' });
    setLoading(false);
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const resetPassword = useCallback(async (_email: string) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
