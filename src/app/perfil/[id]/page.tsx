"use client";

import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

interface Profile {
  name: string;
  profilePicture?: string;
  category?: string;
  age?: number;
  gender?: string;
  lgbtqiapn?: boolean;
  black?: boolean;
  indigenous?: boolean;
  pcd?: boolean;
  description?: string;
}

export default function ProfilePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!id || !type) return;

    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/${type}s/${id}`);
        setProfile(data);
      } catch (err) {
        console.error("Erro ao buscar perfil:", err);
      }
    };

    fetchProfile();
  }, [id, type]);

  if (!profile) return <p className="p-6">Carregando...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-6 mb-6">
        <img
          src={profile.profilePicture || "/default-avatar.png"}
          alt={profile.name}
          className="w-32 h-32 rounded-full object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold">{profile.name}</h1>
          {profile.category && <p className="text-gray-600">Categoria: {profile.category}</p>}
          {profile.age && <p className="text-gray-600">Idade: {profile.age}</p>}
          {profile.gender && <p className="text-gray-600">Identidade de gênero: {profile.gender}</p>}
        </div>
      </div>

      {profile.description && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Sobre</h2>
          <p className="text-gray-700">{profile.description}</p>
        </div>
      )}
    </div>
  );
}