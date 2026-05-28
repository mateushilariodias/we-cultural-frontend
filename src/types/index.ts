export interface Artist {
  _id: string;
  id?: string;
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

export interface Collective {
  _id: string;
  name: string;
  profilePicture?: string;
  categories?: string[];
  phone?: string;
  socialLink?: string;
}

export interface Equipment {
  _id: string;
  name: string;
  logo?: string;
  category?: string[];
  cidade?: string;
  bairro?: string;
  email?: string;
  phone?: string;
}

export interface AuthContextType {
  artist: Artist | null;
  loading: boolean;
  login: (token: string, artistData?: Partial<Artist>) => void;
  logout: () => void;
  refreshArtist: () => Promise<void>;
}
