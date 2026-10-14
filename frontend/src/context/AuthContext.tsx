import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { AuthUser } from '../types';
import { supabase, isSupabaseConfigured } from '../services/supabase';
import { api } from '../services/api';

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  isSupabase: boolean;
  openLoginModal: () => void;
  openSignupModal: () => void;
  closeAuthModal: () => void;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, displayName?: string) => Promise<{ success: boolean; error?: string }>;
  loginAsGuest: (customName?: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'visualmind_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  // Sync API credentials when user/token changes
  useEffect(() => {
    if (user) {
      api.setAuth(user.id, token);
    } else {
      api.setAuth(null, null);
    }
  }, [user, token]);

  // Initial load
  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      try {
        if (isSupabaseConfigured && supabase) {
          const { data: { session } } = await supabase.auth.getSession();
          if (mounted && session?.user) {
            const authUser: AuthUser = {
              id: session.user.id,
              email: session.user.email || '',
              displayName: session.user.user_metadata?.display_name || session.user.email?.split('@')[0],
              avatarUrl: session.user.user_metadata?.avatar_url,
              isGuest: false,
            };
            setUser(authUser);
            setToken(session.access_token);
            setIsLoading(false);
            return;
          }

          // Listen for Supabase auth state change
          const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!mounted) return;
            if (session?.user) {
              const authUser: AuthUser = {
                id: session.user.id,
                email: session.user.email || '',
                displayName: session.user.user_metadata?.display_name || session.user.email?.split('@')[0],
                avatarUrl: session.user.user_metadata?.avatar_url,
                isGuest: false,
              };
              setUser(authUser);
              setToken(session.access_token);
            } else {
              setUser(null);
              setToken(null);
            }
          });

          return () => {
            subscription.unsubscribe();
          };
        }

        // Fallback: check localStorage for offline/guest account
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved && mounted) {
          try {
            const parsed = JSON.parse(saved);
            setUser(parsed);
          } catch {
            localStorage.removeItem(LOCAL_STORAGE_KEY);
          }
        }
      } catch (err) {
        console.warn('Auth initialization warning:', err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    initAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const openLoginModal = () => {
    setAuthModalMode('login');
    setIsAuthModalOpen(true);
  };

  const openSignupModal = () => {
    setAuthModalMode('signup');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }

        if (data.user) {
          const authUser: AuthUser = {
            id: data.user.id,
            email: data.user.email || email,
            displayName: data.user.user_metadata?.display_name || email.split('@')[0],
            avatarUrl: data.user.user_metadata?.avatar_url,
            isGuest: false,
          };
          setUser(authUser);
          setToken(data.session?.access_token || null);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(authUser));
          setIsAuthModalOpen(false);
          setIsLoading(false);
          return { success: true };
        }
      }

      // Local / Offline fallback login
      const localUser: AuthUser = {
        id: `local_user_${btoa(email).slice(0, 8)}`,
        email,
        displayName: email.split('@')[0],
        isGuest: false,
      };
      setUser(localUser);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localUser));
      setIsAuthModalOpen(false);
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  const signup = async (email: string, password: string, displayName?: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              display_name: displayName || email.split('@')[0],
            },
          },
        });

        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }

        if (data.user) {
          const authUser: AuthUser = {
            id: data.user.id,
            email: data.user.email || email,
            displayName: displayName || data.user.user_metadata?.display_name || email.split('@')[0],
            isGuest: false,
          };
          setUser(authUser);
          if (data.session) {
            setToken(data.session.access_token);
          }
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(authUser));
          setIsAuthModalOpen(false);
          setIsLoading(false);
          return { success: true };
        }
      }

      // Local / Offline fallback registration
      const localUser: AuthUser = {
        id: `local_user_${btoa(email).slice(0, 8)}`,
        email,
        displayName: displayName || email.split('@')[0],
        isGuest: false,
      };
      setUser(localUser);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localUser));
      setIsAuthModalOpen(false);
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Registration failed' };
    }
  };

  const loginAsGuest = (customName?: string) => {
    const randomId = Math.random().toString(36).substring(2, 9);
    const guestUser: AuthUser = {
      id: `guest_${randomId}`,
      email: `guest_${randomId}@visualmind.local`,
      displayName: customName || `Explorer ${randomId.slice(0, 4)}`,
      isGuest: true,
    };
    setUser(guestUser);
    setToken(null);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(guestUser));
    setIsAuthModalOpen(false);
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.warn('Sign out warning:', err);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      api.setAuth(null, null);
      setIsLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      isAuthModalOpen,
      authModalMode,
      isSupabase: isSupabaseConfigured,
      openLoginModal,
      openSignupModal,
      closeAuthModal,
      login,
      signup,
      loginAsGuest,
      logout,
    }),
    [user, token, isLoading, isAuthModalOpen, authModalMode]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
