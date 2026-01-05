
import React from 'react';
import { Token } from '../types';
import { Card, Button } from './UIComponents';
import { TrendingUp, Zap, ArrowRight } from 'lucide-react';

interface TrendingProps {
  tokens: Token[];
  onSelectToken: (token: Token) => void;
  onViewMarketplace: () => void;
}

const Trending: React.FC<TrendingProps> = ({ tokens, onSelectToken, onViewMarketplace }) => {
  const trendingTokens = [...tokens]
    .sort((a, b) => b.change24h - a.change24h)
    .slice(0, 3);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="flex justify-between items-end border-b border-white/5 pb-6">
        <div>
           <h2 className="text-3xl font-light text-white tracking-tight flex items-center gap-3">
             <Zap className="text-brand-500" fill="currentColor" size={24} /> 
             Trending Potential
           </h2>
           <p className="text-slate-400 text-sm mt-2">
             The most active and rising ambitions this week.
           </p>
        </div>
        <Button variant="ghost" onClick={onViewMarketplace} className="text-xs">
           View All Markets <ArrowRight size={14} />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {trendingTokens.map((token, index) => (
          <Card 
            key={token.id} 
            className="cursor-pointer group hover:bg-slate-900/60 border-slate-800/60 hover:border-brand-500/30 transition-all duration-300 relative overflow-hidden"
            onClick={() => onSelectToken(token)}
          >
            <div className="absolute -top-3 -left-3 w-16 h-16 bg-gradient-to-br from-brand-500/20 to-transparent rounded-full blur-xl group-hover:bg-brand-500/30 transition-all"></div>
            <div className="absolute top-4 right-4 text-[40px] font-bold text-white/5 font-display select-none">
              0{index + 1}
            </div>

            <div className="flex flex-col h-full justify-between relative z-10">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="relative">
                      <img 
                        src={token.avatarUrl} 
                        alt={token.creatorName} 
                        className="w-14 h-14 rounded-full border border-slate-800 group-hover:border-brand-500 transition-colors object-cover" 
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-white text-lg leading-tight group-hover:text-brand-400 transition-colors">{token.creatorName}</h3>
                      <span className="text-xs text-slate-500 tracking-wider font-mono">{token.ticker}</span>
                    </div>
                </div>

                <div>
                   <p className="text-slate-400 text-sm font-light leading-relaxed line-clamp-3">
                     "{token.ambition}"
                   </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5">
                 <div className="flex items-end justify-between">
                    <div>
                       <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Current Price</div>
                       <div className="text-xl text-white font-mono">${token.price.toFixed(1)}</div>
                    </div>
                    <div className="text-right">
                       <div className={`text-sm font-medium flex items-center gap-1 ${token.change24h >= 0 ? 'text-emerald-400' : 'text-brand-400'}`}>
                         {token.change24h > 0 ? '+' : ''}{token.change24h.toFixed(1)}%
                         <TrendingUp size={14} />
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Trending;
