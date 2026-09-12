import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getSupabase, hasSupabaseConfig } from "../lib/supabaseClient";
import { audioSynthEngine } from "../components/AudioSynthEngine";

export interface UserSession {
  id: string;
  email: string;
  createdAt?: string;
}

interface AuthContextType {
  user: UserSession | null;
  isLoading: boolean;
  isMock: boolean;
  hasConfig: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string) => Promise<{ success: boolean; error?: string; info?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMock, setIsMock] = useState<boolean>(!hasSupabaseConfig);

  const supabase = getSupabase();

  useEffect(() => {
    let authSubscription: { unsubscribe: () => void } | null = null;

    async function initAuth() {
      setIsLoading(true);
      if (supabase) {
        try {
          // 1. Fetch current active session from real Supabase
          const { data: { session }, error } = await supabase.auth.getSession();
          if (error) throw error;

          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || "",
              createdAt: session.user.created_at,
            });
            setIsMock(false);
          } else {
            setUser(null);
          }

          // 2. Set up live auth listener
          const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
              setUser({
                id: session.user.id,
                email: session.user.email || "",
                createdAt: session.user.created_at,
              });
              setIsMock(false);
            } else {
              setUser(null);
            }
          });
          authSubscription = subscription;
        } catch (err: any) {
          console.error("Supabase init error (using mock session fallback):", err);
          setupMockAuth();
        } finally {
          setIsLoading(false);
        }
      } else {
        setupMockAuth();
        setIsLoading(false);
      }
    }

    function setupMockAuth() {
      setIsMock(true);
      const stored = localStorage.getItem("sandbox_user_session");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
          return;
        } catch {
          localStorage.removeItem("sandbox_user_session");
        }
      }
      const defaultGuest: UserSession = {
        id: "guest-explorer",
        email: "student_explorer@aiexplorers.org",
        createdAt: new Date().toISOString()
      };
      localStorage.setItem("sandbox_user_session", JSON.stringify(defaultGuest));
      setUser(defaultGuest);
    }

    initAuth();

    return () => {
      if (authSubscription) {
        authSubscription.unsubscribe();
      }
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    audioSynthEngine.playUIBeep();
    if (!hasSupabaseConfig || isMock || !supabase) {
      // MOCK FLOW
      const accountsRaw = localStorage.getItem("sandbox_accounts");
      const accounts: Record<string, string> = accountsRaw ? JSON.parse(accountsRaw) : {};
      
      const normalizedEmail = email.trim().toLowerCase();
      if (!accounts[normalizedEmail] || accounts[normalizedEmail] !== password) {
        return { success: false, error: "Invalid email or password in Sandbox Mode." };
      }

      const mockSessionUser = {
        id: `mock-user-${Math.random().toString(36).substr(2, 9)}`,
        email: normalizedEmail,
        createdAt: new Date().toISOString(),
      };
      
      localStorage.setItem("sandbox_user_session", JSON.stringify(mockSessionUser));
      setUser(mockSessionUser);
      return { success: true };
    }

    // REAL SUPABASE FLOW
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || "",
          createdAt: data.user.created_at,
        });
        return { success: true };
      }
      return { success: false, error: "Authentication failed. User session empty." };
    } catch (err: any) {
      return { success: false, error: err.message || "An unexpected error occurred." };
    }
  };

  const signUp = async (email: string, password: string) => {
    audioSynthEngine.playUIBeep();
    if (!hasSupabaseConfig || isMock || !supabase) {
      // MOCK FLOW
      const normalizedEmail = email.trim().toLowerCase();
      if (password.length < 6) {
        return { success: false, error: "Password must be at least 6 characters." };
      }

      const accountsRaw = localStorage.getItem("sandbox_accounts");
      const accounts: Record<string, string> = accountsRaw ? JSON.parse(accountsRaw) : {};

      if (accounts[normalizedEmail]) {
        return { success: false, error: "User already registered in Sandbox Mode." };
      }

      accounts[normalizedEmail] = password;
      localStorage.setItem("sandbox_accounts", JSON.stringify(accounts));

      const mockSessionUser = {
        id: `mock-user-${Math.random().toString(36).substr(2, 9)}`,
        email: normalizedEmail,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem("sandbox_user_session", JSON.stringify(mockSessionUser));
      setUser(mockSessionUser);
      return { success: true };
    }

    // REAL SUPABASE FLOW
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      // Check if user has confirmation pending (Supabase defaults to sending confirmation email)
      if (data.user) {
        const isConfirmRequired = data.session === null;
        if (isConfirmRequired) {
          return {
            success: true,
            info: "Registration successful! Please check your email inbox to confirm your Supabase account address.",
          };
        }

        setUser({
          id: data.user.id,
          email: data.user.email || "",
          createdAt: data.user.created_at,
        });
        return { success: true };
      }
      return { success: false, error: "Registration failed. Please try again." };
    } catch (err: any) {
      return { success: false, error: err.message || "An unexpected error occurred during signup." };
    }
  };

  const signOut = async () => {
    audioSynthEngine.playUISplitCue();
    if (!hasSupabaseConfig || isMock || !supabase) {
      localStorage.removeItem("sandbox_user_session");
      setUser(null);
      return;
    }

    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Supabase signOut error", err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isMock, hasConfig: hasSupabaseConfig, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
