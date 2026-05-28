"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { API_ENDPOINTS } from "@/config/api";
import type { Artist, AuthContextType } from "@/types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Migrates the old "authToken" key (pre-refactor) to "token" — runs once per session.
function migrateTokenKey(): string | null {
  const current = localStorage.getItem("token");
  if (current) return current;

  const legacy = localStorage.getItem("authToken");
  if (legacy) {
    localStorage.setItem("token", legacy);
    localStorage.removeItem("authToken");
    return legacy;
  }

  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [artist, setArtist] = useState<Artist | null>(null);
  // Only start in loading state when there's a token to validate.
  // This prevents a loading flash for unauthenticated users.
  const [loading, setLoading] = useState(() => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("token") || !!localStorage.getItem("authToken");
  });

  const fetchArtistProfile = async (token: string) => {
    try {
      const res = await fetch(API_ENDPOINTS.me, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setArtist(data);
        localStorage.setItem("artistData", JSON.stringify(data));
      } else {
        const cached = localStorage.getItem("artistData");
        if (cached) {
          setArtist(JSON.parse(cached));
        } else {
          localStorage.removeItem("token");
          setArtist(null);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
      const cached = localStorage.getItem("artistData");
      if (cached) {
        setArtist(JSON.parse(cached));
      } else {
        localStorage.removeItem("token");
        setArtist(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshArtist = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      await fetchArtistProfile(token);
    }
  };

  useEffect(() => {
    const token = migrateTokenKey();

    if (token) {
      const cached = localStorage.getItem("artistData");
      if (cached) {
        setArtist(JSON.parse(cached));
        setLoading(false);
      }
      fetchArtistProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token: string, artistData?: Partial<Artist>) => {
    localStorage.setItem("token", token);
    if (artistData) {
      localStorage.setItem("artistData", JSON.stringify(artistData));
      setArtist(artistData as Artist);
      setLoading(false);
    } else {
      setLoading(true);
      fetchArtistProfile(token);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("artistData");
    setArtist(null);
  };

  return (
    <AuthContext.Provider value={{ artist, loading, login, logout, refreshArtist }}>
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
