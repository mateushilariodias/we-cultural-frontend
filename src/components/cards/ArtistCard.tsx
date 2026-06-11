import Image from "next/image";
import Link from "next/link";
import type { Artist } from "@/types";

export default function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Link
      href={`/artista/${artist._id}`}
      className="bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:border-[#1e3a8a] transition-all duration-200 overflow-hidden group"
    >
      <div className="relative h-44 bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] overflow-hidden">
        {artist.profilePicture ? (
          <Image
            src={artist.profilePicture}
            alt={artist.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-white text-3xl font-bold">
              {artist.name.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide">
          Artista
        </span>
        <h2 className="text-lg font-bold text-[#1e3a8a] mt-2 mb-2 group-hover:text-[#F59E0B] transition-colors leading-tight">
          {artist.name}
        </h2>
        {artist.categories && artist.categories.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {artist.categories.slice(0, 3).map((cat) => (
              <span
                key={cat}
                className="text-xs bg-[#1e3a8a]/10 text-[#1e3a8a] px-2 py-0.5 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
        )}
        <p className="mt-3 text-sm text-[#1e3a8a] font-semibold group-hover:text-[#F59E0B] transition-colors">
          Ver perfil →
        </p>
      </div>
    </Link>
  );
}
