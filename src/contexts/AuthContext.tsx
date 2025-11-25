"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { API_ENDPOINTS } from "@/config/api";

interface Artist {
  _id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  profilePicture?: string;
  categories?: string[];
  lgbtqiapn?: boolean;
  black?: boolean;
  indigenous?: boolean;
  pcd?: boolean;
  portfolioLink?: string;
  resumeLink?: string;
  socialLink?: string;
  birthDate?: string;
}

interface AuthContextType {
  artist: Artist | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
  refreshArtist: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchArtistProfile = async (token: string) => {
    try {
      const res = await fetch(`${API_ENDPOINTS.getEndpoint('/api/auth/me')}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setArtist(data);
      } else {
        localStorage.removeItem("token");
        setArtist(null);
      }
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
      localStorage.removeItem("token");
      setArtist(null);
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
    const token = localStorage.getItem("token");
    if (token) {
      fetchArtistProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    fetchArtistProfile(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
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