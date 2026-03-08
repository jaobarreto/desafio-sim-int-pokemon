"use client";

import { AlertTriangle, Loader2, X } from "lucide-react";
import type { Pokemon } from "@/types";

interface DeleteModalProps {
  pokemon: Pokemon | null;
  isOpen: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteModal({
  pokemon,
  isOpen,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteModalProps) {
  if (!isOpen || !pokemon) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm glass-panel p-6 animate-slide-up text-center">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-gray-200"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-red-400" />
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-100">Liberar Pokémon?</h3>
        <p className="text-sm text-gray-400 mt-2">
          Tem certeza que deseja liberar{" "}
          <span className="text-gray-200 font-semibold capitalize">
            {pokemon.name}
          </span>
          ? Esta ação não pode ser desfeita.
        </p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-medium transition-colors flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Liberando...
              </>
            ) : (
              "Liberar"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
