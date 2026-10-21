/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useCallback } from 'react';

export type CardVariant = 'white' | 'pastel-blue' | 'pastel-lavender' | 'pastel-peach' | 'accent-purple';

interface InteractiveCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: CardVariant;
  accent?: string; // backwards compatibility
  className?: string;
  tiltIntensity?: number;
  glow?: boolean;
  clickable?: boolean;
  noTilt?: boolean;
}

const VARIANT_CONFIGS: Record<
  CardVariant,
  {
    bgClass: string;
    borderClass: string;
    shadowHover: string;
    spotlight: string;
    textColor: string;
  }
> = {
  white: {
    bgClass: 'bg-white/80 backdrop-blur-md',
    borderClass: 'border-white/90 hover:border-white',
    shadowHover: 'hover:shadow-[0_18px_40px_-6px_rgba(44,32,79,0.12)]',
    spotlight: 'rgba(255, 255, 255, 0.45)',
    textColor: 'text-[#30313D]',
  },
  'pastel-blue': {
    bgClass: 'bg-[#C6DDF5]/90 backdrop-blur-md',
    borderClass: 'border-white/70 hover:border-white',
    shadowHover: 'hover:shadow-[0_18px_40px_-6px_rgba(106,168,228,0.25)]',
    spotlight: 'rgba(255, 255, 255, 0.5)',
    textColor: 'text-[#1E2838]',
  },
  'pastel-lavender': {
    bgClass: 'bg-[#E7E6FA]/90 backdrop-blur-md',
    borderClass: 'border-white/75 hover:border-white',
    shadowHover: 'hover:shadow-[0_18px_40px_-6px_rgba(169,138,218,0.25)]',
    spotlight: 'rgba(255, 255, 255, 0.5)',
    textColor: 'text-[#2D2347]',
  },
  'pastel-peach': {
    bgClass: 'bg-[#FFD4C5]/90 backdrop-blur-md',
    borderClass: 'border-white/75 hover:border-white',
    shadowHover: 'hover:shadow-[0_18px_40px_-6px_rgba(235,137,110,0.25)]',
    spotlight: 'rgba(255, 255, 255, 0.5)',
    textColor: 'text-[#3F221B]',
  },
  'accent-purple': {
    bgClass: 'bg-[#2C204F] text-white',
    borderClass: 'border-[#44366F]',
    shadowHover: 'hover:shadow-[0_18px_40px_-6px_rgba(44,32,79,0.35)]',
    spotlight: 'rgba(255, 255, 255, 0.12)',
    textColor: 'text-white',
  },
};

export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  variant = 'white',
  accent, // Map legacy accents to variants
  className = '',
  tiltIntensity = 4,
  glow = true,
  clickable = false,
  noTilt = false,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // Map legacy accent names if passed
  let resolvedVariant: CardVariant = variant;
  if (accent === 'indigo' || accent === 'purple') resolvedVariant = 'pastel-lavender';
  else if (accent === 'cyan' || accent === 'blue') resolvedVariant = 'pastel-blue';
  else if (accent === 'amber') resolvedVariant = 'pastel-peach';
  else if (accent === 'emerald') resolvedVariant = 'white';

  const config = VARIANT_CONFIGS[resolvedVariant] || VARIANT_CONFIGS.white;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPct = (x / rect.width) * 100;
      const yPct = (y / rect.height) * 100;

      setMousePos({ x: xPct, y: yPct });

      if (!noTilt) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateY = ((x - centerX) / centerX) * tiltIntensity;
        const rotateX = -((y - centerY) / centerY) * tiltIntensity;

        card.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`);
        card.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`);
      }
    },
    [noTilt, tiltIntensity]
  );

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const card = cardRef.current;
    if (card) {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    }
  };

  return (
    <div
      style={{ perspective: '1000px' }}
      className={`relative ${clickable ? 'cursor-pointer' : ''}`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            isHovered && !noTilt
              ? 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateY(-3px)'
              : 'rotateX(0deg) rotateY(0deg) translateY(0px)',
          transition: isHovered
            ? 'transform 0.12s ease-out, box-shadow 0.25s ease'
            : 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease',
          transformStyle: 'preserve-3d',
        }}
        className={`group relative overflow-hidden rounded-3xl border shadow-diffused transition-all duration-300 ${
          config.bgClass
        } ${config.borderClass} ${config.shadowHover} ${className}`}
        {...props}
      >
        {/* Dynamic Light Sheen on Hover */}
        {glow && (
          <div
            className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(420px circle at ${mousePos.x}% ${mousePos.y}%, ${config.spotlight}, transparent 70%)`,
            }}
          />
        )}

        {/* Content Container */}
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
};
