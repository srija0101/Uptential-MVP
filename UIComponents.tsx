
import React from 'react';

export const Card: React.FC<{ children: React.ReactNode, className?: string, onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <div onClick={onClick} className={`bg-slate-900/30 backdrop-blur-xl border border-white/5 rounded-3xl p-6 hover:border-brand-500/20 hover:bg-slate-900/50 transition-all duration-500 shadow-xl ${className}`}>
    {children}
  </div>
);

export const Button: React.FC<{ 
  children: React.ReactNode, 
  variant?: 'primary' | 'secondary' | 'outline' | 'glow' | 'ghost' | 'pink', 
  onClick?: () => void,
  className?: string,
  disabled?: boolean,
  type?: "button" | "submit" | "reset"
}> = ({ children, variant = 'primary', onClick, className = '', disabled = false, type = "button" }) => {
  const base = "px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 tracking-wide border-none";
  const variants = {
    primary: "bg-white text-black hover:bg-slate-200 disabled:bg-neutral-800 disabled:text-neutral-500",
    glow: "bg-brand-500 hover:bg-brand-400 text-white shadow-[0_0_25px_-5px_rgba(255,0,128,0.6)] hover:shadow-[0_0_35px_-5px_rgba(255,0,128,0.8)]",
    pink: "bg-brand-500 hover:bg-brand-400 text-white",
    secondary: "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700",
    outline: "border border-white/10 hover:border-brand-500/50 text-slate-300 hover:text-white bg-transparent backdrop-blur-sm !border-solid",
    ghost: "bg-transparent hover:bg-white/5 text-slate-400 hover:text-white",
  };
  
  return (
    <button 
      type={type}
      onClick={onClick} 
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed shadow-none' : ''}`}
    >
      {children}
    </button>
  );
};

export const Badge: React.FC<{ children: React.ReactNode, color?: 'green' | 'blue' | 'pink' }> = ({ children, color = 'pink' }) => {
  const colors = {
    blue: "bg-brand-500/10 text-brand-400 border-brand-500/20",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    pink: "bg-brand-500/10 text-brand-400 border-brand-500/20"
  };
  
  return (
    <span className={`text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full border ${colors[color]}`}>
      {children}
    </span>
  );
};
