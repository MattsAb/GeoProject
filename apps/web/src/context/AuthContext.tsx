import type { User } from '@geoapp/types';
import { createContext, useContext, useState, useEffect } from 'react';
import { getMe } from '../services/auth.api';

type AuthContextType = {
  user: User | null;
  setUser: (user: User) => void; 
  isAuthenticated: boolean;
  loginUser: (token: string, user: User) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('idToken');
    if (token) {
      getMe().then((res) => {
        if (res.success && res.data) setUser(res.data);
        else localStorage.removeItem('idToken');
      });
    } else {setIsLoading(false)}
  }, []);

  const loginUser = (token: string, userData: User) => {
    localStorage.setItem('idToken', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('idToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated: !!user, loginUser, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}