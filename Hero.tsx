
import React from 'react';
import { Button } from './UIComponents';
import { ArrowRight, Sparkles, Zap, Users } from 'lucide-react';

interface HeroProps {
  onLaunchToken: () => void;
  onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onLaunchToken, onExplore }) => {
  return (
    <div className="relative overflow-hidden rounded-[40px] bg-black border border-white/5 mb-16 shadow-[0_0_80px_-20px_rgba(255,0,128,0.25)]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff008008_1px,transparent_1px),linear-gradient(to_bottom,#ff008008_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-brand-500/10 blur-[130px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="relative z-10 p-10 md:p-24 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-12">
          <div className="space-y-8">
            <h1 className="text-6xl md:text-8xl font-bold text-white leading-[0.9] tracking-tighter">
              Back <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-500 italic pb-2 inline-block drop-shadow-[0_0_20px_rgba(255,0,128,0.3)]">Human Potential.</span>
            </h1>
            
            <p className="text-slate-400 text-xl font-light max-w-2xl leading-relaxed">
              Uptential is the world's first platform where people can turn their potential into a digital token. Enter the financial identity layer for billions of people worldwide, a global system where every individual’s potential, ambition, and progress have economic representation, built on momentum and vision.
            </p>
          </div>

          <div className="flex flex-wrap gap-6">
            <Button variant="glow" onClick={onLaunchToken} className="h-16 px-12 text-base font-bold uppercase tracking-widest bg-brand-500 border-none shadow-[0_0_30px_rgba(255,0,128,0.4)]">
              Issue Your HPT
            </Button>
            <Button variant="outline" onClick={onExplore} className="h-16 px-10 rounded-full text-base font-medium border-white/10 text-slate-300 hover:text-white hover:bg-white/5">
              Explore Markets <ArrowRight size={18} className="ml-2"/>
            </Button>
          </div>
        </div>

        {/* Chic Futuristic Visual Card */}
        <div className="flex-1 w-full max-w-[460px] relative hidden lg:block group perspective-1000">
           <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 p-1 rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] transition-all duration-700 group-hover:scale-[1.05] group-hover:-rotate-1">
              <div className="bg-black/60 rounded-[38px] p-12 border border-white/5 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-500/5 blur-3xl pointer-events-none"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>

                {/* Card Header */}
                <div className="flex justify-between items-start mb-14 relative z-10">
                  <div className="flex gap-6 items-center">
                    <div className="relative">
                      <img src="https://picsum.photos/400/400?random=hero_voss" className="w-16 h-16 rounded-[20px] object-cover border border-brand-500/40 shadow-[0_0_20px_rgba(255,0,128,0.3)]" alt="" />
                      <div className="absolute -top-2 -right-2 bg-brand-500 text-white p-1 rounded-lg">
                        <Zap size={10} fill="currentColor" />
                      </div>
                    </div>
                    <div>
                      <div className="text-white font-bold text-2xl tracking-tight">Kaelen Voss</div>
                      <div className="text-brand-400 text-[10px] font-mono tracking-[0.4em] uppercase font-black">$VOSS</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="bg-brand-500/10 border border-brand-500/30 text-brand-400 px-4 py-2 rounded-xl font-black text-[9px] tracking-widest uppercase flex items-center gap-2">
                       <Sparkles size={12} /> Verified Trajectory
                    </div>
                  </div>
                </div>
                
                {/* Valuation Display */}
                <div className="space-y-2 mb-14 relative z-10">
                   <div className="flex justify-between items-center">
                      <div className="text-[9px] text-slate-500 uppercase tracking-widest font-black">Current Unit Value</div>
                      <div className="text-emerald-400 text-[9px] font-mono font-bold">+142.4%</div>
                   </div>
                   <div className="text-8xl font-light text-white tracking-tighter tabular-nums drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                     $84.9
                   </div>
                </div>

                {/* Market Metrics */}
                <div className="relative z-10">
                   <div className="p-8 bg-gradient-to-br from-white/5 to-transparent rounded-[24px] border border-white/5 flex flex-col items-center justify-center backdrop-blur-md shadow-2xl">
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-black mb-2 flex items-center gap-2">
                        <Users size={12} className="text-brand-500" /> Active Backers
                      </div>
                      <div className="text-white font-mono text-5xl tracking-tighter font-bold drop-shadow-[0_0_15px_rgba(255,0,128,0.3)]">
                        12.4k
                      </div>
                   </div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
