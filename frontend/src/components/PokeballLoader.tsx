"use client";

export function PokeballLoader({ size = 48 }: { size?: number }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="animate-pokeball-bounce"
      >
        {/* Top half - red */}
        <path
          d="M 5 50 A 45 45 0 0 1 95 50"
          fill="#dc2626"
          stroke="#1e293b"
          strokeWidth="4"
        />
        {/* Bottom half - white */}
        <path
          d="M 5 50 A 45 45 0 0 0 95 50"
          fill="#f8fafc"
          stroke="#1e293b"
          strokeWidth="4"
        />
        {/* Center band */}
        <rect x="3" y="46" width="94" height="8" fill="#1e293b" rx="1" />
        {/* Center button */}
        <circle cx="50" cy="50" r="12" fill="#f8fafc" stroke="#1e293b" strokeWidth="4" />
        <circle cx="50" cy="50" r="6" fill="#38bdf8" className="animate-pulse-glow" />
      </svg>
      <span className="text-neon-blue text-sm font-medium tracking-wider animate-pulse">
        Carregando...
      </span>
    </div>
  );
}
