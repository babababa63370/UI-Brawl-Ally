import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type DiscordUser = {
  id: string;
  username: string;
  displayName: string;
  avatar: string | null;
  email: string | null;
};

type AuthState =
  | { status: "loading" }
  | { status: "authenticated"; user: DiscordUser }
  | { status: "unauthenticated" };

const AuthContext = createContext<{
  auth: AuthState;
  logout: () => Promise<void>;
  loginUrl: string;
}>({
  auth: { status: "loading" },
  logout: async () => {},
  loginUrl: "/api/auth/discord",
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({ status: "loading" });

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setAuth({ status: "authenticated", user: data.user });
        } else {
          setAuth({ status: "unauthenticated" });
        }
      })
      .catch(() => setAuth({ status: "unauthenticated" }));
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setAuth({ status: "unauthenticated" });
  };

  return (
    <AuthContext.Provider value={{ auth, logout, loginUrl: "/api/auth/discord" }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
