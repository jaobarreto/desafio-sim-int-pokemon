"use client";

import { Heart, Zap, Hash, Pencil, Trash2, Shield } from "lucide-react";
import type { Pokemon } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { getTypeColors } from "@/lib/pokemon-types";

interface PokemonCardProps {
  pokemon: Pokemon;
  onEdit: (pokemon: Pokemon) => void;
  onDelete: (pokemon: Pokemon) => void;
}

export function PokemonCard({ pokemon, onEdit, onDelete }: PokemonCardProps) {
  const { user } = useAuth();
  const isOwner = user?.id === pokemon.userId;
  const colors = getTypeColors(pokemon.type);

  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokedexNumber}.png`;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-neon-blue/10 ${colors.bg} ${colors.border}`}
    >
      {/* Scan line overlay */}
      <div className="scan-overlay absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Pokedex number badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-gray-900/80 text-xs font-mono text-gray-400 border border-gray-700/50">
          <Hash className="w-3 h-3" />
          {String(pokemon.pokedexNumber).padStart(3, "0")}
        </span>
      </div>

      {/* Owner actions */}
      <div className="absolute top-3 right-3 z-10 flex gap-1.5">
        {isOwner ? (
          <>
            <button
              onClick={() => onEdit(pokemon)}
              className="p-1.5 rounded-lg bg-gray-900/80 border border-gray-700/50 text-neon-blue hover:bg-neon-blue/20 hover:border-neon-blue/50 transition-all"
              title="Editar Pokémon"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(pokemon)}
              className="p-1.5 rounded-lg bg-gray-900/80 border border-gray-700/50 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 transition-all"
              title="Excluir Pokémon"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </>
        ) : (
          <div
            className="p-1.5 rounded-lg bg-gray-900/80 border border-gray-700/50 text-gray-500 cursor-not-allowed"
            title="Apenas o treinador original pode modificar"
          >
            <Shield className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      {/* Pokemon sprite */}
      <div className="flex justify-center pt-10 pb-2 px-4">
        <div className="relative w-28 h-28">
          <img
            src={spriteUrl}
            alt={pokemon.name}
            className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(56,189,248,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all duration-300"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "";
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      </div>

      {/* Info */}
      <div className="px-4 pb-4">
        <h3 className="text-lg font-bold text-gray-100 capitalize tracking-wide">
          {pokemon.name}
        </h3>

        {/* Type badge */}
        <span
          className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${colors.badge}`}
        >
          {pokemon.type}
        </span>

        {/* Stats */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800/50">
            <Heart className="w-3.5 h-3.5 text-red-400" />
            <span className="text-xs text-gray-400">HP</span>
            <span className="text-sm font-bold text-gray-200 ml-auto">
              {pokemon.hp}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gray-900/50 border border-gray-800/50">
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-xs text-gray-400">LVL</span>
            <span className="text-sm font-bold text-gray-200 ml-auto">
              {pokemon.level}
            </span>
          </div>
        </div>

        {/* Creator info */}
        {pokemon.user && (
          <p className="mt-2 text-[10px] text-gray-500 truncate">
            Treinador: {pokemon.user.name}
          </p>
        )}
      </div>
    </div>
  );
}
