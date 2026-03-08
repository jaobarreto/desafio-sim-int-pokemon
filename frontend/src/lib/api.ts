import axios from "axios";
import type {
  AuthResponse,
  CreatePokemonPayload,
  LoginPayload,
  Pokemon,
  RegisterPayload,
  UpdatePokemonPayload,
} from "@/types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Auth
export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  return data;
}

export async function register(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/auth/register", payload);
  return data;
}

// Pokemons
export async function getPokemons(): Promise<Pokemon[]> {
  const { data } = await api.get<Pokemon[]>("/pokemons");
  return data;
}

export async function getPokemon(id: string): Promise<Pokemon> {
  const { data } = await api.get<Pokemon>(`/pokemons/${id}`);
  return data;
}

export async function createPokemon(
  payload: CreatePokemonPayload,
): Promise<Pokemon> {
  const { data } = await api.post<Pokemon>("/pokemons", payload);
  return data;
}

export async function updatePokemon(
  id: string,
  payload: UpdatePokemonPayload,
): Promise<Pokemon> {
  const { data } = await api.patch<Pokemon>(`/pokemons/${id}`, payload);
  return data;
}

export async function deletePokemon(id: string): Promise<void> {
  await api.delete(`/pokemons/${id}`);
}

export default api;
