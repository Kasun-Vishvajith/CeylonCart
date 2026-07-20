'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'ceyloncart_auth';

const ACCOUNTS = {
  'admin@ceyloncart.lk': { password: 'admin123', role: 'admin' },
  'demo@ceyloncart.lk': { password: 'demo123', role: 'user' }
};

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ loggedIn: false, email: null, role: null });
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setAuth(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  const login = (email, password) => {
    const account = ACCOUNTS[email];
    if (account && account.password === password) {
      const state = { loggedIn: true, email, role: account.role };
      setAuth(state);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password.' };
  };

  const logout = () => {
    const state = { loggedIn: false, email: null, role: null };
    setAuth(state);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, hydrated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
