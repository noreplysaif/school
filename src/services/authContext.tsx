import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount, UserRole } from '../types';
import { StorageService } from './storage';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

interface AuthContextType {
  user: UserAccount | null;
  role: UserRole | null;
  login: (email: string, password?: string) => boolean;
  switchDemoRole: (role: UserRole) => void;
  logout: () => void;
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => void;
  removeToast: (id: string) => void;
  resetDemoDatabase: () => void;
  isDemoMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('edunexus_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const isDemoMode = true; // Clear indication as requested in Part 1 & Part 7

  useEffect(() => {
    if (user) {
      localStorage.setItem('edunexus_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('edunexus_current_user');
    }
  }, [user]);

  const addToast = (type: 'success' | 'error' | 'info' | 'warning', title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const login = (email: string, _password?: string): boolean => {
    const accounts = StorageService.getDB().userAccounts;
    const target = accounts.find((a) => a.email.toLowerCase() === email.trim().toLowerCase());
    if (target) {
      setUser(target);
      StorageService.logAction(target.name, target.role, 'USER_LOGIN', 'Authentication', `Logged in successfully as ${target.role}`);
      addToast('success', 'Logged in successfully', `Welcome back, ${target.name} (${target.role.replace('_', ' ').toUpperCase()})`);
      return true;
    }
    addToast('error', 'Authentication Failed', 'Invalid email or credentials. Please use demo credentials.');
    return false;
  };

  const switchDemoRole = (role: UserRole) => {
    const accounts = StorageService.getDB().userAccounts;
    const target = accounts.find((a) => a.role === role);
    if (target) {
      setUser(target);
      StorageService.logAction(target.name, target.role, 'ROLE_SWITCH', 'Auth Context', `Switched active role to ${role}`);
      addToast('info', 'Demo Role Activated', `Now viewing as ${target.name} (${role.replace('_', ' ').toUpperCase()})`);
    }
  };

  const logout = () => {
    if (user) {
      StorageService.logAction(user.name, user.role, 'USER_LOGOUT', 'Authentication', 'User logged out');
    }
    setUser(null);
    addToast('info', 'Logged Out', 'You have been logged out securely.');
  };

  const resetDemoDatabase = () => {
    StorageService.resetToSeed();
    addToast('warning', 'Demo Data Reset', 'The demonstration database has been restored to factory seed state.');
    // Keep user state in sync
    if (user) {
      const accounts = StorageService.getDB().userAccounts;
      const refreshed = accounts.find((a) => a.role === user.role);
      if (refreshed) setUser(refreshed);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        login,
        switchDemoRole,
        logout,
        toasts,
        addToast,
        removeToast,
        resetDemoDatabase,
        isDemoMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
