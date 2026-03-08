"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  LogOut,
  Search,
  RefreshCw,
  Database,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/Toast";
import { PokeballLoader } from "@/components/PokeballLoader";
import { PokemonCard } from "@/components/PokemonCard";
import { PokemonForm } from "@/components/PokemonForm";
import { DeleteModal } from "@/components/DeleteModal";
import * as api from "@/lib/api";
import type { Pokemon, CreatePokemonPayload, UpdatePokemonPayload } from "@/types";
import { AxiosError } from "axios";

export default function DashboardPage() {
  const { user, isLoading: authLoading, logout } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoadingPokemons, setIsLoadingPokemons] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Form modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPokemon, setEditingPokemon] = useState<Pokemon | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete modal state
  const [deletingPokemon, setDeletingPokemon] = useState<Pokemon | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [authLoading, user, router]);

  // Fetch pokemons
  const fetchPokemons = useCallback(async () => {
    try {
      setIsLoadingPokemons(true);
      const data = await api.getPokemons();
      setPokemons(data);
    } catch {
      toast("Erro ao carregar Pokémons", "error");
    } finally {
      setIsLoadingPokemons(false);
    }
  }, [toast]);

  useEffect(() => {
    if (user) fetchPokemons();
  }, [user, fetchPokemons]);

  // Create / Update
  async function handleFormSubmit(data: CreatePokemonPayload) {
    setIsSubmitting(true);
    try {
      if (editingPokemon) {
        const payload: UpdatePokemonPayload = data;
        await api.updatePokemon(editingPokemon.id, payload);
        toast(`${data.name} foi atualizado com sucesso!`, "success");
      } else {
        await api.createPokemon(data);
        toast(`${data.name} foi registrado na Pokédex!`, "success");
      }
      setIsFormOpen(false);
      setEditingPokemon(null);
      fetchPokemons();
    } catch (err) {
      const msg =
        err instanceof AxiosError
          ? err.response?.data?.message || "Erro ao salvar Pokémon"
          : "Erro ao salvar Pokémon";
      toast(msg, "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Delete
  async function handleDelete() {
    if (!deletingPokemon) return;
    setIsDeleting(true);
    try {
      await api.deletePokemon(deletingPokemon.id);
      toast(`${deletingPokemon.name} foi liberado!`, "success");
      setDeletingPokemon(null);
      fetchPokemons();
    } catch (err) {
      const msg =
        err instanceof AxiosError
          ? err.response?.data?.message || "Erro ao excluir Pokémon"
          : "Erro ao excluir Pokémon";
      toast(msg, "error");
    } finally {
      setIsDeleting(false);
    }
  }

  function openCreate() {
    setEditingPokemon(null);
    setIsFormOpen(true);
  }

  function openEdit(pokemon: Pokemon) {
    setEditingPokemon(pokemon);
    setIsFormOpen(true);
  }

  function openDelete(pokemon: Pokemon) {
    setDeletingPokemon(pokemon);
  }

  // Filter
  const filtered = pokemons.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(p.pokedexNumber).includes(searchQuery)
  );

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <PokeballLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 relative">
      {/* Background textures */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pokedex-red/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl" />
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-gray-950/80 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-pokedex-red flex items-center justify-center shadow-lg shadow-pokedex-red/20">
              <svg width="20" height="20" viewBox="0 0 100 100">
                <path d="M 5 50 A 45 45 0 0 1 95 50" fill="#fff" />
                <path d="M 5 50 A 45 45 0 0 0 95 50" fill="#f1f5f9" />
                <rect x="3" y="46" width="94" height="8" fill="#991b1b" rx="1" />
                <circle cx="50" cy="50" r="10" fill="#f1f5f9" stroke="#991b1b" strokeWidth="3" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-100 leading-tight">
                PokéDex Admin
              </h1>
              <p className="text-xs text-gray-500">Centro Pokémon</p>
            </div>
          </div>

          {/* User info + logout */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-200">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <button
              onClick={logout}
              className="p-2.5 rounded-xl border border-gray-700/50 bg-gray-900/50 text-gray-400 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 transition-all"
              title="Sair"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nome, tipo ou número..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-900/80 border border-gray-700/50 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/30 transition-all"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={fetchPokemons}
              className="p-2.5 rounded-xl border border-gray-700/50 bg-gray-900/50 text-gray-400 hover:text-neon-blue hover:border-neon-blue/30 transition-all"
              title="Atualizar lista"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={openCreate}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pokedex-red hover:bg-pokedex-dark-red text-white font-semibold text-sm tracking-wide transition-colors shadow-lg shadow-pokedex-red/20"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Registrar Pokémon</span>
              <span className="sm:hidden">Novo</span>
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex items-center gap-2 mb-4 text-xs text-gray-500">
          <Database className="w-3.5 h-3.5" />
          <span>
            {filtered.length} Pokémon{filtered.length !== 1 ? "s" : ""}{" "}
            {searchQuery ? "encontrado(s)" : "registrado(s)"}
          </span>
        </div>

        {/* Grid / Loading / Empty */}
        {isLoadingPokemons ? (
          <div className="flex justify-center py-20">
            <PokeballLoader size={56} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-800/50 border border-gray-700/30 flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-300">
              {searchQuery
                ? "Nenhum Pokémon encontrado"
                : "A Pokédex está vazia"}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {searchQuery
                ? "Tente buscar com outros termos"
                : "Registre o primeiro Pokémon para começar!"}
            </p>
            {!searchQuery && (
              <button
                onClick={openCreate}
                className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-pokedex-red hover:bg-pokedex-dark-red text-white font-semibold text-sm transition-colors"
              >
                <Plus className="w-4 h-4" />
                Registrar Pokémon
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onEdit={openEdit}
                onDelete={openDelete}
              />
            ))}
          </div>
        )}
      </main>

      {/* Floating action button (mobile) */}
      <button
        onClick={openCreate}
        className="sm:hidden fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full bg-pokedex-red hover:bg-pokedex-dark-red text-white shadow-xl shadow-pokedex-red/30 flex items-center justify-center transition-colors"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Modals */}
      <PokemonForm
        pokemon={editingPokemon}
        isOpen={isFormOpen}
        isSubmitting={isSubmitting}
        onClose={() => {
          setIsFormOpen(false);
          setEditingPokemon(null);
        }}
        onSubmit={handleFormSubmit}
      />
      <DeleteModal
        pokemon={deletingPokemon}
        isOpen={!!deletingPokemon}
        isDeleting={isDeleting}
        onClose={() => setDeletingPokemon(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
