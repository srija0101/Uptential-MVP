
import React, { useState } from 'react';
import { Token } from '../types';
import { Card, Badge, Button } from './UIComponents';
import { Search, Layers, User, TrendingUp, Sparkles, Lock } from 'lucide-react';
import { MOCK_INDEXES } from '../constants';

interface MarketplaceProps {
  tokens: Token[];
  onSelectToken: (token: Token) => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({ tokens, onSelectToken }) => {
  const [viewMode, setViewMode] = useState<'individuals' | 'indexes'>('individuals');
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTokens = tokens.filter(t => 
    t.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.ambition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-12 py-12 animate-in fade-in duration-700">
      
      <div className="text-center space-y-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-extralight text-white tracking-tight relative z-10 leading-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-500 font-normal drop-shadow-[0_0_25px_rgba(255,0,128,0.5)]">Potential</span> Market.
            </h1>
            <p className="text-slate-400 max-w-xl mx-auto text-xl font-light leading-relaxed relative z-10">
            Support the trajectories of verified human ambition.
            </p>
        </div>

        <div className="max-w-xl mx-auto relative z-20">
            <div className="relative group">
                <div className="absolute inset-0 bg-brand-500/5 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-full px-6 py-4 shadow-2xl">
                    <Search className="text-slate-500 mr-3" size={20} />
                    <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for a trajectory..."
                        className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none"
                    />
                </div>
            </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8 py-8">
         <div className="bg-slate-900/50 p-2 rounded-full border border-white/10 flex backdrop-blur-sm">
            <button 
                onClick={() => setViewMode('individuals')}
                className={`flex items-center gap-2 px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'individuals' ? 'bg-white text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
                <User size={14} /> Individual
            </button>
            <button 
                onClick={() => setViewMode('indexes')}
                className={`flex items-center gap-2 px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'indexes' ? 'bg-brand-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
                <Layers size={14} /> Indexes
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(viewMode === 'individuals' ? filteredTokens : MOCK_INDEXES).map((item: any) => (
          <Card 
            key={item.id} 
            className="cursor-pointer group bg-slate-950/40 hover:bg-black/60 border-slate-800/60 hover:border-brand-500/40 transition-all duration-300 relative overflow-hidden h-[380px] flex flex-col p-8 rounded-[32px]"
            onClick={() => viewMode === 'individuals' && onSelectToken(item)}
          >
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                    <div className="relative shrink-0">
                        <img 
                          src={item.avatarUrl || `https://ui-avatars.com/api/?name=${item.name}&background=333&color=fff`} 
                          className="w-14 h-14 rounded-[18px] border border-slate-800 object-cover group-hover:scale-105 transition-transform duration-500" 
                          alt="" 
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-brand-500 rounded-full flex items-center justify-center border-2 border-black">
                            <Sparkles size={10} className="text-white" />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg group-hover:text-brand-400 transition-colors tracking-tight truncate max-w-[120px]">{item.creatorName || item.name}</h3>
                        <span className="text-[9px] text-slate-500 font-mono tracking-[0.2em] uppercase">{item.ticker}</span>
                    </div>
                </div>
                <div className={`text-[10px] font-black font-mono flex items-center gap-1 px-2.5 py-1 rounded-lg ${item.change24h >= 0 ? 'text-emerald-400 bg-emerald-500/10' : 'text-brand-400 bg-brand-500/10'}`}>
                    {item.change24h > 0 ? '+' : ''}{item.change24h.toFixed(1)}%
                </div>
            </div>
            
            <div className="relative mb-6 flex-1">
               <p className="text-slate-300 text-base font-light leading-snug line-clamp-2 italic">
                  "{item.ambition || item.description}"
               </p>
               <div className="absolute -left-4 top-0 bottom-0 w-1 bg-brand-500/20 rounded-full group-hover:bg-brand-500/60 transition-colors"></div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5 mt-auto">
                <div className="flex justify-between items-end">
                    <div>
                        <div className="text-[9px] text-slate-600 uppercase tracking-widest font-black mb-1">Unit Value</div>
                        <div className="text-2xl text-white font-mono tracking-tighter tabular-nums leading-none">${item.price.toFixed(1)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] text-slate-700 uppercase font-black tracking-widest mb-1">Safety Lock</div>
                      <div className="text-sm text-brand-500 font-mono flex items-center justify-end gap-1 font-bold">
                          <Lock size={12} />
                          ${item.floorPrice?.toFixed(1) || '---'}
                      </div>
                    </div>
                </div>
                <Button variant="glow" className="w-full h-12 text-xs font-black uppercase tracking-widest group-hover:scale-[1.02] transition-transform bg-brand-500 border-none shadow-[0_0_20px_rgba(255,0,128,0.3)]">Back Talent</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
