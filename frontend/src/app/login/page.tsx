"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Loader2, Mail, Lock, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/Toast";
import { AxiosError } from "axios";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    setIsSubmitting(true);
    try {
      await login(data.email, data.password);
      toast("Bem-vindo de volta, Treinador!", "success");
    } catch (err) {
      const msg =
        err instanceof AxiosError
          ? err.response?.data?.message || "Credenciais inválidas"
          : "Erro ao fazer login";
      toast(msg, "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-pokedex-red/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-neon-blue/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-pokedex-red/20 border-2 border-pokedex-red/40 mb-4">
            <Zap className="w-10 h-10 text-pokedex-red" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-100 tracking-tight">
            Centro Pokémon
          </h1>
          <p className="text-gray-400 mt-1">
            Acesse a Pokédex Administrativa
          </p>
        </div>

        {/* Form card */}
        <div className="glass-panel p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Email do Treinador
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="treinador@pokemon.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-900/80 border border-gray-700/50 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/30 transition-all"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-900/80 border border-gray-700/50 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/30 transition-all"
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-400 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-pokedex-red hover:bg-pokedex-dark-red disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 shadow-lg shadow-pokedex-red/20"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar na Pokédex"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Novo treinador?{" "}
              <Link
                href="/register"
                className="text-neon-blue hover:text-neon-cyan font-medium transition-colors"
              >
                Registre-se aqui
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
