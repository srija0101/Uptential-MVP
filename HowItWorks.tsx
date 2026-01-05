import React, { useState, useEffect } from 'react';
import { Rocket, Heart, Milestone, Crown, ArrowRight } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage(prev => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stages = [
    {
      icon: <Rocket />,
      title: "The Pitch",
      desc: "Creators launch tokens backed by a verified goal and a detailed social roadmap to prove their vision.",
      color: "from-brand-500"
    },
    {
      icon: <Heart />,
      title: "Early Support",
      desc: "Believers buy HPTs early to fund the creator's journey, gaining a direct stake in their future success.",
      color: "from-indigo-500"
    },
    {
      icon: <Milestone />,
      title: "Real Progress",
      desc: "Capital is released as creators hit verified milestones, ensuring trust and driving value growth.",
      color: "from-emerald-500"
    },
    {
      icon: <Crown />,
      title: "The Upside",
      desc: "As the creator succeeds, early believers share in the massive financial and social rewards of their growth.",
      color: "from-amber-500"
    }
  ];

  return (
    <div className="py-24 space-y-16 animate-in fade-in duration-1000">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-light text-white">How Potential Pays Off</h2>
        <p className="text-slate-400 max-w-2xl mx-auto font-light">The lifecycle of a Human Potential Token, from launch to global impact.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6 relative">
        {/* Connector Line */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-white/5 -translate-y-1/2 z-0"></div>
        
        {stages.map((stage, idx) => (
          <div 
            key={idx} 
            className={`relative z-10 flex flex-col items-center text-center space-y-6 p-8 rounded-[40px] border transition-all duration-700 cursor-pointer ${activeStage === idx ? 'bg-slate-900 border-brand-500/20 scale-105 shadow-2xl' : 'bg-transparent border-transparent opacity-40'}`}
            onClick={() => setActiveStage(idx)}
          >
            <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${stage.color} to-transparent flex items-center justify-center text-white shadow-xl`}>
              {React.cloneElement(stage.icon as React.ReactElement, { size: 32 })}
            </div>
            
            <div className="space-y-3">
              <h3 className="text-white text-xl font-medium">{stage.title}</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed">{stage.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/40 p-10 rounded-[40px] border border-white/5 text-center max-w-3xl mx-auto">
         <div className="flex flex-col md:flex-row justify-center gap-12 items-center">
            <div className="text-center">
               <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-2">Back early</div>
               <div className="text-white text-lg font-light tracking-tight">Low Entry Price</div>
            </div>
            <ArrowRight className="text-slate-700 hidden md:block" size={32} strokeWidth={1} />
            <div className="text-center">
               <div className="text-brand-500 text-[10px] uppercase font-bold tracking-widest mb-2">Success reached</div>
               <div className="text-white text-lg font-light tracking-tight">Exponential Upside</div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default HowItWorks;