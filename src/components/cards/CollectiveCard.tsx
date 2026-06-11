import Image from "next/image";
import Link from "next/link";
import type { Collective } from "@/types";

export default function CollectiveCard({ collective }: { collective: Collective }) {
  return (
    <Link
      href={`/coletivo/${collective._id}`}
      className="bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:border-[#7c3aed] transition-all duration-200 overflow-hidden group"
    >
      <div className="relative h-44 bg-gradient-to-br from-[#7c3aed] to-[#4c1d95] overflow-hidden">
        {collective.profilePicture ? (
          <Image
            src={collective.profilePicture}
            alt={collective.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-white text-3xl font-bold">
              {collective.name.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide">
          Coletivo
        </span>
        <h2 className="text-lg font-bold text-[#7c3aed] mt-2 mb-2 group-hover:text-[#F59E0B] transition-colors leading-tight">
          {collective.name}
        </h2>
        {collective.categories && collective.categories.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {collective.categories.slice(0, 3).map((cat) => (
              <span
                key={cat}
                className="text-xs bg-[#7c3aed]/10 text-[#7c3aed] px-2 py-0.5 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
        )}
        <p className="mt-3 text-sm text-[#7c3aed] font-semibold group-hover:text-[#F59E0B] transition-colors">
          Ver perfil →
        </p>
      </div>
    </Link>
  );
}
