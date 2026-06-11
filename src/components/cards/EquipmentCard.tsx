import Image from "next/image";
import Link from "next/link";
import type { Equipment } from "@/types";

export default function EquipmentCard({ equipment }: { equipment: Equipment }) {
  return (
    <Link
      href={`/espaco/${equipment._id}`}
      className="bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:border-[#059669] transition-all duration-200 overflow-hidden group"
    >
      <div className="relative h-44 bg-gradient-to-br from-[#059669] to-[#064e3b] overflow-hidden">
        {equipment.logo ? (
          <Image
            src={equipment.logo}
            alt={equipment.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-white text-3xl font-bold">
              {equipment.name.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide">
          Espaço Cultural
        </span>
        <h2 className="text-lg font-bold text-[#059669] mt-2 mb-2 group-hover:text-[#F59E0B] transition-colors leading-tight">
          {equipment.name}
        </h2>
        {equipment.category && equipment.category.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {equipment.category.slice(0, 3).map((cat) => (
              <span
                key={cat}
                className="text-xs bg-[#059669]/10 text-[#059669] px-2 py-0.5 rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
        )}
        {(equipment.cidade || equipment.bairro) && (
          <p className="text-xs text-gray-500 mt-2">
            📍 {[equipment.bairro, equipment.cidade].filter(Boolean).join(", ")}
          </p>
        )}
        <p className="mt-3 text-sm text-[#059669] font-semibold group-hover:text-[#F59E0B] transition-colors">
          Ver perfil →
        </p>
      </div>
    </Link>
  );
}
