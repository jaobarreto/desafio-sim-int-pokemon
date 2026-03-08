"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Loader2 } from "lucide-react";
import type { Pokemon } from "@/types";

const pokemonSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  type: z.string().min(1, "Tipo é obrigatório"),
  level: z.number().int().min(1, "Mínimo 1").max(100, "Máximo 100"),
  hp: z.number().int().min(1, "Mínimo 1"),
  pokedexNumber: z.number().int().min(1, "Mínimo 1"),
});

type PokemonFormData = z.infer<typeof pokemonSchema>;

interface PokemonFormProps {
  pokemon?: Pokemon | null;
  isOpen: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (data: PokemonFormData) => void;
}

const typeOptions = [
  "Normal", "Fogo", "Água", "Grama", "Elétrico", "Gelo",
  "Lutador", "Veneno", "Terra", "Voador", "Psíquico", "Inseto",
  "Pedra", "Fantasma", "Dragão", "Noturno", "Aço", "Fada",
];

export function PokemonForm({
  pokemon,
  isOpen,
  isSubmitting,
  onClose,
  onSubmit,
}: PokemonFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PokemonFormData>({
    resolver: zodResolver(pokemonSchema),
  });

  useEffect(() => {
    if (isOpen) {
      if (pokemon) {
        reset({
          name: pokemon.name,
          type: pokemon.type,
          level: pokemon.level,
          hp: pokemon.hp,
          pokedexNumber: pokemon.pokedexNumber,
        });
      } else {
        reset({ name: "", type: "", level: 1, hp: 50, pokedexNumber: 1 });
      }
    }
  }, [isOpen, pokemon, reset]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md glass-panel p-6 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-100">
              {pokemon ? "Editar Pokémon" : "Registrar Novo Pokémon"}
            </h2>
            <p className="text-sm text-gray-400 mt-0.5">
              {pokemon
                ? "Atualize os dados do Pokémon"
                : "Adicione um novo Pokémon à Pokédex"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Nome do Pokémon
            </label>
            <input
              {...register("name")}
              placeholder="Ex: Pikachu"
              className="w-full px-3 py-2.5 rounded-xl bg-gray-900/80 border border-gray-700/50 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/30 transition-all"
            />
            {errors.name && (
              <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Tipo
            </label>
            <select
              {...register("type")}
              className="w-full px-3 py-2.5 rounded-xl bg-gray-900/80 border border-gray-700/50 text-gray-100 focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/30 transition-all"
            >
              <option value="">Selecione o tipo</option>
              {typeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="text-xs text-red-400 mt-1">{errors.type.message}</p>
            )}
          </div>

          {/* Level & HP */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Nível
              </label>
              <input
                {...register("level", { valueAsNumber: true })}
                type="number"
                min={1}
                max={100}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-900/80 border border-gray-700/50 text-gray-100 focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/30 transition-all"
              />
              {errors.level && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.level.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                HP
              </label>
              <input
                {...register("hp", { valueAsNumber: true })}
                type="number"
                min={1}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-900/80 border border-gray-700/50 text-gray-100 focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/30 transition-all"
              />
              {errors.hp && (
                <p className="text-xs text-red-400 mt-1">{errors.hp.message}</p>
              )}
            </div>
          </div>

          {/* Pokedex Number */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Número da Pokédex
            </label>
            <input
              {...register("pokedexNumber", { valueAsNumber: true })}
              type="number"
              min={1}
              className="w-full px-3 py-2.5 rounded-xl bg-gray-900/80 border border-gray-700/50 text-gray-100 focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/30 transition-all"
            />
            {errors.pokedexNumber && (
              <p className="text-xs text-red-400 mt-1">
                {errors.pokedexNumber.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-pokedex-red hover:bg-pokedex-dark-red disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold tracking-wide transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Salvando...
              </>
            ) : (
              pokemon ? "Salvar Alterações" : "Registrar Pokémon"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
