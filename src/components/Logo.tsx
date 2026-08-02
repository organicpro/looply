import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export function Logo({ className = '', size = 38, showText = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* 3D "y" Logo Icon from exact reference */}
      <div className="relative group cursor-pointer shrink-0" style={{ width: size, height: size }}>
        <img 
          src="/y_logo_icon.png" 
          alt="Looply logo" 
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex items-center gap-2">
          <span className="font-display font-black text-xl tracking-tight text-white drop-shadow-sm">
            Y<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400">viral</span>
          </span>
          <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-gradient-to-r from-cyan-500/20 to-pink-500/20 text-cyan-300 border border-cyan-400/30">
            PRO
          </span>
        </div>
      )}
    </div>
  );
}


