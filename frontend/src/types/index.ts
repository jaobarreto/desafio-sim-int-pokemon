export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Pokemon {
  id: string;
  name: string;
  type: string;
  level: number;
  hp: number;
  pokedexNumber: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface CreatePokemonPayload {
  name: string;
  type: string;
  level: number;
  hp: number;
  pokedexNumber: number;
}

export interface UpdatePokemonPayload {
  name?: string;
  type?: string;
  level?: number;
  hp?: number;
  pokedexNumber?: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}
