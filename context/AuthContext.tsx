import React, { createContext, ReactNode, useContext, useState } from 'react';

type AuthState = { email: string | null; login: (email: string) => void };
const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState<string | null>(null);
  const login = (value: string) => setEmail(() => value.trim());
  return <AuthContext.Provider value={{ email, login }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) throw new Error('useAuth должен вызываться внутри AuthProvider');
  return context;
}
