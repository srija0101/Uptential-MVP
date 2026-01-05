
import React, { useState } from 'react';
import { Token, User, AmbitionAnalysis } from '../types';
import { Card, Button, Badge } from './UIComponents';
import { ArrowLeft, TrendingUp, ShieldCheck, BrainCircuit, Play, Activity, Lock, CheckCircle, ChevronRight, Target, UserCheck, Sparkles } from 'lucide-react';
import PriceChart from './PriceChart';
import { analyzeAmbition } from '../services/geminiService';

interface TokenDetailProps {
  token: Token;
  user: User;
  onBack: () => void;
  onTrade: (tokenId: string, amount: number, isBuy: boolean) => void;
}

const TokenDetail: React.FC<TokenDetailProps> = ({ token, user, onBack, onTrade }) => {
  const [tradeAmount, setTradeAmount] = useState<number>(1);
  const [analysis, setAnalysis] = useState<AmbitionAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzingText, setIsAnalyzingText] = useState("");

  const owned = user.portfolio.find(p => p.tokenId === token.id)?.amount || 0;
  const cost = tradeAmount * token.price;

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    const steps = ["Syncing protocol...", "Validating trajectory...", "Synthesizing market fit...", "Compiling Thesis..."];
    let step = 0;
    const interval = setInterval(() => {
      if (step < steps.length - 1) {
        step++;
        setIsAnalyzingText(steps[step]);
      }
    }, 400);

    const res = await analyzeAmbition(token.creatorName, token.ambition, "");
    setAnalysis(res);
    setTimeout(() => {
      clearInterval(interval);
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4 animate-in fade-in duration-300 relative px-4">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group mb-4">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Market
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-6">
          <div className="relative shrink-0">
            <img src={token.avatarUrl} className="w-20 h-20 rounded-[1.5rem] border border-white/10 shadow-xl object-cover" alt="" />
            <div className="absolute -bottom-1 -right-1 bg-brand-500 p-1.5 rounded-xl border-4 border-black">
               <ShieldCheck size={14} className="text-white" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-white tracking-tight">{token.creatorName}</h1>
              {token.socialLink && (
                  <a href={token.socialLink} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-white/5 rounded-lg text-slate-400 hover:text-brand-400 transition-all border border-white/5">
                      <UserCheck size={12} />
                  </a>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Badge color="pink">{token.ticker}</Badge>
              <div className="flex gap-2">
                {token.tags.slice(0, 2).map(t => <span key={t} className="text-[9px] text-slate-600 uppercase tracking-widest font-black">{t}</span>)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8 bg-white/5 backdrop-blur-xl px-8 py-3 rounded-2xl border border-white/10">
          <div className="text-center">
            <div className="text-[9px] text-slate-500 uppercase tracking-widest font-black mb-0.5">Market Cap</div>
            <div className="text-xl text-white font-mono font-bold">${(token.marketCap / 1000).toFixed(1)}k</div>
          </div>
          <div className="text-center border-l border-white/10 pl-8">
            <div className="text-[9px] text-slate-500 uppercase tracking-widest font-black mb-0.5">Backers</div>
            <div className="text-xl text-white font-mono font-bold">{token.holders}</div>
          </div>
        </div>
      </div>

      {/* TRADE BOX */}
      <Card className="p-6 bg-slate-900/60 backdrop-blur-3xl border-brand-500/20 shadow-xl rounded-[28px] overflow-visible">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-8 flex-1">
               <div className="text-center md:text-left min-w-[220px]">
                  <div className="text-[9px] text-brand-400 uppercase tracking-widest font-black mb-1 flex items-center justify-center md:justify-start gap-2">
                    <Activity size={10} className="animate-pulse" /> Trajectory Price
                  </div>
                  <div className="flex items-center gap-3">
                     <span className="text-white font-mono text-4xl tracking-tighter font-bold tabular-nums leading-none">${token.price.toFixed(1)}</span>
                     <div className={`text-[10px] font-black font-mono flex items-center gap-0.5 px-1.5 py-0.5 rounded-md ${token.change24h >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-brand-500/10 text-brand-400'}`}>
                        {token.change24h > 0 ? '+' : ''}{token.change24h.toFixed(1)}%
                     </div>
                  </div>
               </div>

               <div className="hidden xl:block w-px h-12 bg-white/10"></div>

               <div className="space-y-2 w-full md:w-56">
                  <div className="flex justify-between text-[9px] uppercase tracking-widest font-black text-slate-500">
                    <span>Backing Units</span>
                    <span className="text-brand-400 font-mono text-[9px]">Bal: ${user.walletBalance.toLocaleString()}</span>
                  </div>
                  <div className="relative">
                    <input 
                        type="number"
                        value={tradeAmount}
                        onChange={(e) => setTradeAmount(Math.max(1, parseInt(e.target.value) || 0))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 px-5 text-white font-mono text-xl focus:border-brand-500 focus:outline-none transition-all"
                    />
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-4 w-full xl:w-auto shrink-0 justify-end">
               <div className="text-right hidden sm:block mr-4">
                  <div className="text-[9px] text-slate-600 uppercase font-black tracking-widest mb-0.5">Execution Total</div>
                  <div className="text-white font-mono text-xl tracking-tighter font-bold tabular-nums leading-none">${cost.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</div>
               </div>
               <div className="flex gap-2 shrink-0">
                  <Button variant="glow" className="h-12 px-10 uppercase font-black tracking-widest text-[10px] bg-brand-500 border-none" onClick={() => onTrade(token.id, tradeAmount, true)}>Acquire</Button>
                  <Button variant="outline" className="h-12 px-8 uppercase font-black tracking-widest text-[10px] border-white/10 hover:border-brand-500/50" onClick={() => onTrade(token.id, tradeAmount, false)}>Liquidate</Button>
               </div>
            </div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between border-t border-white/5 pt-4 gap-3">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                 <Lock size={12} className="text-brand-500" />
                 <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Floor: <span className="text-white">${token.floorPrice.toFixed(1)}</span></span>
              </div>
              <div className="flex items-center gap-2">
                 <ShieldCheck size={12} className="text-brand-500" />
                 <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Protocol Verified</span>
              </div>
           </div>
           <div className="text-[9px] text-brand-500 font-black uppercase tracking-widest">
              Owned Units: {owned} {token.ticker}
           </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8 pb-12">
        <div className="lg:col-span-2 space-y-10">
          <Card className="p-8 h-[380px] relative bg-slate-950/20 border-white/5 overflow-hidden rounded-[28px]">
            <div className="flex justify-between items-center mb-6 relative z-10">
               <h3 className="text-lg text-white font-light flex items-center gap-3">
                 <TrendingUp size={18} className="text-brand-500" /> Valuation Path
               </h3>
            </div>
            <div className="h-60 mt-4 relative z-10">
               <PriceChart data={token.history} color="#ff0080" height={240} />
            </div>
          </Card>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <Card className="p-2 bg-slate-900 border-white/10 relative overflow-hidden h-[450px] lg:w-1/3 rounded-[28px] shrink-0">
               <video src={token.videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover rounded-[24px] opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
               <div className="absolute inset-x-4 bottom-4 p-5 bg-black/80 backdrop-blur-3xl rounded-[20px] border border-white/5">
                  <div className="space-y-0.5 text-center">
                      <div className="text-white font-bold text-lg tracking-tight">Mission</div>
                      <div className="text-[8px] text-brand-400 uppercase font-black flex items-center justify-center gap-2 tracking-widest">
                         <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse"></div> Verified
                      </div>
                  </div>
               </div>
            </Card>

            <section className="space-y-6 flex-1 lg:w-2/3">
              <h3 className="text-2xl text-white font-light flex items-center gap-3 border-b border-white/5 pb-4">
                 <Target className="text-brand-500" size={24} /> Verified Roadmap
              </h3>
              <div className="relative space-y-4">
                  {token.milestones.map((milestone) => (
                      <div key={milestone.id} className={`flex gap-5 p-5 rounded-[24px] border transition-all ${milestone.status === 'completed' ? 'bg-brand-500/5 border-brand-500/10' : 'bg-slate-900/10 border-white/5 opacity-60'}`}>
                          <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 ${milestone.status === 'completed' ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-600'}`}>
                             {milestone.status === 'completed' ? <CheckCircle size={20} /> : <Lock size={20} />}
                          </div>
                          <div className="flex-1 space-y-1">
                              <h4 className="text-white font-bold text-base tracking-tight">{milestone.title}</h4>
                              <p className="text-xs text-slate-400 font-light leading-relaxed">"{milestone.description}"</p>
                          </div>
                      </div>
                  ))}
              </div>
            </section>
          </div>
        </div>

        <div className="space-y-10">
           <Card className="p-8 bg-slate-950/40 border border-white/5 space-y-6 relative rounded-[28px]">
              <h3 className="text-lg text-white font-light flex items-center gap-3 border-b border-white/5 pb-4">
                  <BrainCircuit className="text-brand-500" /> AI Thesis
              </h3>

              {!analysis && !isAnalyzing ? (
                 <div className="text-center py-4 space-y-6">
                    <p className="text-slate-500 text-xs italic font-light leading-relaxed">"Engage AI synthesis to determine the immeasurable value of this creator's ambition."</p>
                    <Button variant="outline" className="w-full h-11 uppercase font-black tracking-widest text-[9px] border-white/10 hover:border-brand-500/30" onClick={runAnalysis}>Generate Thesis</Button>
                 </div>
              ) : isAnalyzing ? (
                 <div className="py-10 flex flex-col items-center justify-center space-y-6">
                    <div className="w-10 h-10 border-2 border-brand-500/10 border-t-brand-500 rounded-full animate-spin"></div>
                    <p className="text-brand-500 font-mono text-[9px] animate-pulse uppercase tracking-widest font-black">{isAnalyzingText}</p>
                 </div>
              ) : (
                 <div className="space-y-6 animate-in fade-in duration-500">
                    <div className="p-6 bg-brand-500/5 border border-brand-500/10 rounded-[20px]">
                       <p className="text-slate-300 italic text-sm leading-relaxed font-light">"{analysis.summary}"</p>
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-[10px] text-slate-600 uppercase font-black tracking-widest">Bull Case Scenario</h4>
                       <p className="text-xs text-white leading-relaxed font-medium">"{analysis.bullCase}"</p>
                    </div>
                 </div>
              )}
           </Card>

           <Card className="p-8 bg-slate-950/20 border-white/5 rounded-[28px]">
              <h4 className="text-[9px] text-slate-600 uppercase font-black mb-6 flex items-center gap-2 tracking-widest">
                  <Sparkles size={14} className="text-brand-500"/> Core Ambition
              </h4>
              <p className="text-white font-light leading-relaxed text-lg italic tracking-tight">"{token.ambition}"</p>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default TokenDetail;
