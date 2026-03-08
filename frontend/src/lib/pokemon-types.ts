const typeColors: Record<
  string,
  { bg: string; text: string; border: string; badge: string }
> = {
  normal: {
    bg: "bg-stone-800/50",
    text: "text-stone-300",
    border: "border-stone-600/30",
    badge: "bg-stone-700 text-stone-200",
  },
  fogo: {
    bg: "bg-orange-950/50",
    text: "text-orange-300",
    border: "border-orange-600/30",
    badge: "bg-orange-700 text-orange-100",
  },
  fire: {
    bg: "bg-orange-950/50",
    text: "text-orange-300",
    border: "border-orange-600/30",
    badge: "bg-orange-700 text-orange-100",
  },
  água: {
    bg: "bg-blue-950/50",
    text: "text-blue-300",
    border: "border-blue-600/30",
    badge: "bg-blue-700 text-blue-100",
  },
  water: {
    bg: "bg-blue-950/50",
    text: "text-blue-300",
    border: "border-blue-600/30",
    badge: "bg-blue-700 text-blue-100",
  },
  grama: {
    bg: "bg-green-950/50",
    text: "text-green-300",
    border: "border-green-600/30",
    badge: "bg-green-700 text-green-100",
  },
  grass: {
    bg: "bg-green-950/50",
    text: "text-green-300",
    border: "border-green-600/30",
    badge: "bg-green-700 text-green-100",
  },
  elétrico: {
    bg: "bg-yellow-950/50",
    text: "text-yellow-300",
    border: "border-yellow-600/30",
    badge: "bg-yellow-700 text-yellow-100",
  },
  electric: {
    bg: "bg-yellow-950/50",
    text: "text-yellow-300",
    border: "border-yellow-600/30",
    badge: "bg-yellow-700 text-yellow-100",
  },
  gelo: {
    bg: "bg-cyan-950/50",
    text: "text-cyan-300",
    border: "border-cyan-600/30",
    badge: "bg-cyan-700 text-cyan-100",
  },
  ice: {
    bg: "bg-cyan-950/50",
    text: "text-cyan-300",
    border: "border-cyan-600/30",
    badge: "bg-cyan-700 text-cyan-100",
  },
  lutador: {
    bg: "bg-red-950/50",
    text: "text-red-300",
    border: "border-red-600/30",
    badge: "bg-red-800 text-red-100",
  },
  fighting: {
    bg: "bg-red-950/50",
    text: "text-red-300",
    border: "border-red-600/30",
    badge: "bg-red-800 text-red-100",
  },
  veneno: {
    bg: "bg-purple-950/50",
    text: "text-purple-300",
    border: "border-purple-600/30",
    badge: "bg-purple-700 text-purple-100",
  },
  poison: {
    bg: "bg-purple-950/50",
    text: "text-purple-300",
    border: "border-purple-600/30",
    badge: "bg-purple-700 text-purple-100",
  },
  terra: {
    bg: "bg-amber-950/50",
    text: "text-amber-300",
    border: "border-amber-600/30",
    badge: "bg-amber-800 text-amber-100",
  },
  ground: {
    bg: "bg-amber-950/50",
    text: "text-amber-300",
    border: "border-amber-600/30",
    badge: "bg-amber-800 text-amber-100",
  },
  voador: {
    bg: "bg-indigo-950/50",
    text: "text-indigo-300",
    border: "border-indigo-600/30",
    badge: "bg-indigo-700 text-indigo-100",
  },
  flying: {
    bg: "bg-indigo-950/50",
    text: "text-indigo-300",
    border: "border-indigo-600/30",
    badge: "bg-indigo-700 text-indigo-100",
  },
  psíquico: {
    bg: "bg-pink-950/50",
    text: "text-pink-300",
    border: "border-pink-600/30",
    badge: "bg-pink-700 text-pink-100",
  },
  psychic: {
    bg: "bg-pink-950/50",
    text: "text-pink-300",
    border: "border-pink-600/30",
    badge: "bg-pink-700 text-pink-100",
  },
  inseto: {
    bg: "bg-lime-950/50",
    text: "text-lime-300",
    border: "border-lime-600/30",
    badge: "bg-lime-700 text-lime-100",
  },
  bug: {
    bg: "bg-lime-950/50",
    text: "text-lime-300",
    border: "border-lime-600/30",
    badge: "bg-lime-700 text-lime-100",
  },
  pedra: {
    bg: "bg-stone-900/50",
    text: "text-stone-300",
    border: "border-stone-500/30",
    badge: "bg-stone-600 text-stone-100",
  },
  rock: {
    bg: "bg-stone-900/50",
    text: "text-stone-300",
    border: "border-stone-500/30",
    badge: "bg-stone-600 text-stone-100",
  },
  fantasma: {
    bg: "bg-violet-950/50",
    text: "text-violet-300",
    border: "border-violet-600/30",
    badge: "bg-violet-700 text-violet-100",
  },
  ghost: {
    bg: "bg-violet-950/50",
    text: "text-violet-300",
    border: "border-violet-600/30",
    badge: "bg-violet-700 text-violet-100",
  },
  dragão: {
    bg: "bg-indigo-950/60",
    text: "text-indigo-200",
    border: "border-indigo-500/30",
    badge: "bg-indigo-600 text-indigo-100",
  },
  dragon: {
    bg: "bg-indigo-950/60",
    text: "text-indigo-200",
    border: "border-indigo-500/30",
    badge: "bg-indigo-600 text-indigo-100",
  },
  noturno: {
    bg: "bg-gray-900/60",
    text: "text-gray-300",
    border: "border-gray-600/30",
    badge: "bg-gray-700 text-gray-200",
  },
  dark: {
    bg: "bg-gray-900/60",
    text: "text-gray-300",
    border: "border-gray-600/30",
    badge: "bg-gray-700 text-gray-200",
  },
  aço: {
    bg: "bg-slate-800/50",
    text: "text-slate-300",
    border: "border-slate-500/30",
    badge: "bg-slate-600 text-slate-100",
  },
  steel: {
    bg: "bg-slate-800/50",
    text: "text-slate-300",
    border: "border-slate-500/30",
    badge: "bg-slate-600 text-slate-100",
  },
  fada: {
    bg: "bg-pink-950/40",
    text: "text-pink-200",
    border: "border-pink-500/30",
    badge: "bg-pink-600 text-pink-100",
  },
  fairy: {
    bg: "bg-pink-950/40",
    text: "text-pink-200",
    border: "border-pink-500/30",
    badge: "bg-pink-600 text-pink-100",
  },
};

const defaultColor = {
  bg: "bg-gray-800/50",
  text: "text-gray-300",
  border: "border-gray-600/30",
  badge: "bg-gray-700 text-gray-200",
};

export function getTypeColors(type: string) {
  return typeColors[type.toLowerCase()] ?? defaultColor;
}
