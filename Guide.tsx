
import React, { useState, useEffect } from 'react';
import { Card, Button } from './UIComponents';
import { Target, Zap, Rocket, Heart, Milestone, Crown, ArrowRight } from 'lucide-react';

const Guide: React.FC<{ onLaunch: () => void }> = ({ onLaunch }) => {
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
      desc: "Creators launch tokens backed by a verified goal and a detailed roadmap to prove their vision.",
      color: "from-brand-500"
    },
    {
      icon: <Heart />,
      title: "Early Support",
      desc: "Believers buy HPTs early to fund the journey, gaining a direct stake in future successes.",
      color: "from-indigo-500"
    },
    {
      icon: <Milestone />,
      title: "Real Progress",
      desc: "Milestones are verified on-chain, reducing risk and driving organic value growth.",
      color: "from-emerald-500"
    },
    {
      icon: <Crown />,
      title: "The Upside",
      desc: "As success is reached, early believers share in the massive financial rewards of growth.",
      color: "from-amber-500"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-20 py-8 animate-in fade-in duration-700 pb-20 px-4">
      
      <div className="text-center space-y-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-extralight text-white tracking-tight relative z-10 leading-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-500 font-normal drop-shadow-[0_0_25px_rgba(255,0,128,0.5)]">Human Equity</span> Economy.
            </h1>
            <p className="text-lg text-slate-400 max-w-xl mx-auto font-light leading-relaxed relative z-10">
            Uptential turns ambition into a tradable asset. Backing people is the next global market.
            </p>
        </div>
      </div>

      {/* Lifecycle Section */}
      <div className="space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-light text-white uppercase tracking-widest">How Potential Pays Off</h2>
          <p className="text-slate-500 font-light text-sm italic">The lifecycle of a Human Potential Token.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-white/5 -translate-y-1/2 z-0"></div>
          {stages.map((stage, idx) => (
            <div 
              key={idx} 
              className={`relative z-10 flex flex-col items-center text-center space-y-6 p-8 rounded-[32px] border transition-all duration-700 cursor-pointer ${activeStage === idx ? 'bg-slate-900 border-brand-500/20 scale-105 shadow-2xl' : 'bg-transparent border-transparent opacity-40'}`}
              onClick={() => setActiveStage(idx)}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stage.color} to-transparent flex items-center justify-center text-white`}>
                {React.cloneElement(stage.icon as React.ReactElement, { size: 28 })}
              </div>
              <div className="space-y-2">
                <h3 className="text-white text-lg font-medium">{stage.title}</h3>
                <p className="text-slate-400 text-xs font-light leading-relaxed">{stage.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-center pt-10">
        <div className="space-y-6">
           <h2 className="text-3xl text-white font-light">Talent is everywhere.<br/>Capital is not.</h2>
           <div className="space-y-4 text-slate-400 text-base font-light leading-relaxed">
             <p>Traditionally only companies could issue stock. But individuals are the ultimate growth engines of society.</p>
             <p><strong className="text-white font-medium">Uptential</strong> bridges this gap. It allows anyone to issue a <strong className="text-brand-400">Human Potential Token (HPT)</strong>.</p>
           </div>
           <Button variant="glow" onClick={onLaunch} className="h-12 px-8 uppercase font-black tracking-widest text-[10px]">Start Issuing</Button>
        </div>
        
        <Card className="bg-slate-900/90 backdrop-blur-xl border-white/10 p-8 rounded-[32px] space-y-8">
            <h3 className="text-white text-lg font-medium mb-4 border-b border-white/5 pb-2">Verification Systems</h3>
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400"><Target size={18} /></div>
                <div>
                    <div className="text-[9px] text-brand-400 uppercase tracking-widest font-bold">Roadmap Certification</div>
                    <div className="text-white text-xs">Creators verify milestones via protocol oracles.</div>
                </div>
                </div>
                <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400"><Zap size={18} /></div>
                <div>
                    <div className="text-[9px] text-indigo-400 uppercase tracking-widest font-bold">AI Due Diligence</div>
                    <div className="text-white text-xs">Algorithmic risk/reward synthesis for every asset.</div>
                </div>
                </div>
            </div>
        </Card>
      </div>
    </div>
  );
};

export default Guide;
