"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { API_URL } from "@/config/api";

const VALID_TYPES = ["artist", "collective", "equipment"] as const;
type ProfileType = typeof VALID_TYPES[number];

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
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const rawType = searchParams.get("type");
  const type: ProfileType | null = VALID_TYPES.includes(rawType as ProfileType)
    ? (rawType as ProfileType)
    : null;

  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!id || !type) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_URL}/api/${type}s/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (err) {
        console.error("Erro ao buscar perfil:", err);
      }
    };

    fetchProfile();
  }, [id, type]);

  if (!type) {
    return <p className="p-6 text-red-600">Tipo de perfil inválido.</p>;
  }

  if (!profile) {
    return <p className="p-6">Carregando...</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-6 mb-6">
        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          {profile.profilePicture ? (
            <Image
              src={profile.profilePicture}
              alt={profile.name}
              fill
              sizes="128px"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl font-bold">
              {profile.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold">{profile.name}</h1>
          {profile.category && (
            <p className="text-gray-600">Categoria: {profile.category}</p>
          )}
          {profile.age && (
            <p className="text-gray-600">Idade: {profile.age}</p>
          )}
          {profile.gender && (
            <p className="text-gray-600">Identidade de gênero: {profile.gender}</p>
          )}
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
