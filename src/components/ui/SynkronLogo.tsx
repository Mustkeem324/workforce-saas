import React from 'react';

export interface SynkronLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

export const SynkronLogo: React.FC<SynkronLogoProps> = ({
  size = 'md',
  className = '',
  showText = false
}) => {
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const dimMap = {
    sm: 28,
    md: 36,
    lg: 48,
    xl: 64
  };

  const pixelSize = dimMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <div className={`relative ${sizeMap[size]} rounded-xl bg-gradient-to-br from-[var(--ink-900)] via-[var(--ink-950)] to-[#0F172A] border border-[var(--border-accent)] flex items-center justify-center p-1.5 shadow-[var(--shadow-accent-glow)] overflow-hidden group shrink-0`}>
        {/* Glow backdrop pulse */}
        <div className="absolute inset-0 bg-[var(--accent-500)]/15 rounded-xl blur-md group-hover:bg-[var(--accent-500)]/30 transition-all duration-300" />

        {/* Vector SVG Emblem */}
        <svg
          width={pixelSize * 0.75}
          height={pixelSize * 0.75}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          <defs>
            <linearGradient id="logoAccentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF7A67" />
              <stop offset="100%" stopColor="#E05A47" />
            </linearGradient>
            <linearGradient id="logoCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>

          {/* Outer Sync Ring */}
          <circle
            cx="50"
            cy="50"
            r="38"
            stroke="url(#logoAccentGrad)"
            strokeWidth="8"
            strokeDasharray="160 50"
            strokeLinecap="round"
          />

          {/* Inner Node Orbit */}
          <circle
            cx="50"
            cy="50"
            r="24"
            stroke="url(#logoCyanGrad)"
            strokeWidth="6"
            strokeDasharray="90 30"
            strokeLinecap="round"
            transform="rotate(-45 50 50)"
          />

          {/* Center Core */}
          <circle cx="50" cy="50" r="10" fill="url(#logoAccentGrad)" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-black tracking-tight text-[var(--text-primary)] text-sm md:text-base leading-tight">
            Synkron<span className="text-[var(--accent-500)]">AI</span>
          </span>
          <span className="text-[9px] text-[var(--text-tertiary)] font-mono tracking-wider uppercase font-bold">
            Workforce OS
          </span>
        </div>
      )}
    </div>
  );
};
