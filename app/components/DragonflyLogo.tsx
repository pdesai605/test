"use client";

interface DragonflyLogoProps {
  className?: string;
  size?: number;
}

export default function DragonflyLogo({
  className = "",
  size = 120,
}: DragonflyLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Dragonfly"
    >
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E7D1A1" />
          <stop offset="50%" stopColor="#C8A96A" />
          <stop offset="100%" stopColor="#A8894A" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#glow)" opacity="0.95">
        {/* Body */}
        <ellipse cx="60" cy="62" rx="3" ry="18" fill="url(#goldGrad)" />
        {/* Head */}
        <circle cx="60" cy="40" r="4" fill="url(#goldGrad)" />
        {/* Upper wings */}
        <path
          d="M60 48 C40 30, 15 35, 8 55 C20 50, 40 52, 60 56 Z"
          fill="url(#goldGrad)"
          opacity="0.85"
        />
        <path
          d="M60 48 C80 30, 105 35, 112 55 C100 50, 80 52, 60 56 Z"
          fill="url(#goldGrad)"
          opacity="0.85"
        />
        {/* Lower wings */}
        <path
          d="M60 58 C42 62, 18 68, 12 82 C28 74, 45 68, 60 66 Z"
          fill="url(#goldGrad)"
          opacity="0.7"
        />
        <path
          d="M60 58 C78 62, 102 68, 108 82 C92 74, 75 68, 60 66 Z"
          fill="url(#goldGrad)"
          opacity="0.7"
        />
        {/* Tail */}
        <path
          d="M60 78 L58 95 M60 78 L60 98 M60 78 L62 95"
          stroke="url(#goldGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
