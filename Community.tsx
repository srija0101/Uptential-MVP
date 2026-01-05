
import React, { useState } from 'react';
import { Card, Button, Badge } from './UIComponents';
import { MessageSquare, Heart, Users, Share2, Star, Search, ArrowRight } from 'lucide-react';
import { Token } from '../types';

interface CommunityProps {
  tokens: Token[];
  onSelectToken: (token: Token) => void;
}

const Community: React.FC<CommunityProps> = ({ tokens, onSelectToken }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const searchResults = searchTerm.length > 0 
    ? tokens.filter(t => 
        t.ticker.toLowerCase().includes(searchTerm.toLowerCase()) || 
        t.creatorName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="max-w-7xl mx-auto space-y-12 py-12 animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="text-center space-y-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-extralight text-white tracking-tight relative z-10 leading-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-brand-500 font-normal drop-shadow-[0_0_25px_rgba(255,0,128,0.5)]">Believer</span> Network.
            </h1>
            <p className="text-slate-400 max-w-xl mx-auto text-xl font-light leading-relaxed relative z-10">
            Connect with visionaries and early backers. Discuss ideas, share due diligence, and join investment collectives.
            </p>
        </div>

        {/* Search Bar for Discussions */}
        <div className="max-w-xl mx-auto relative z-20">
            <div className="relative group">
                <div className="absolute inset-0 bg-brand-500/5 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center bg-slate-900 border border-white/10 rounded-full px-6 py-4 shadow-xl">
                    <Search className="text-slate-500 mr-3" size={20} />
                    <input 
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for a ticker (e.g. $ALEX) to join the discussion..."
                        className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none"
                    />
                </div>
            </div>

            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-30">
                    {searchResults.map(token => (
                        <div 
                            key={token.id}
                            onClick={() => onSelectToken(token)}
                            className="flex items-center gap-4 p-4 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5 last:border-0"
                        >
                            <img src={token.avatarUrl} className="w-10 h-10 rounded-full" alt="" />
                            <div className="flex-1">
                                <div className="text-white font-medium text-left">{token.creatorName} <span className="text-slate-500 font-mono text-xs ml-2">{token.ticker}</span></div>
                                <div className="text-xs text-brand-400 text-left">{(token as any).discussion?.length || 0} active discussions</div>
                            </div>
                            <ArrowRight size={16} className="text-slate-600" />
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>

      {/* Feed */}
      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Main Feed */}
        <div className="md:col-span-2 space-y-6">
           <h3 className="text-white text-lg font-light flex items-center gap-2">
             <MessageSquare size={18} className="text-brand-500"/> Recent Discussions
           </h3>
           
           {[
             { user: 'Sarah J.', action: 'started a discussion on', target: '$ALEX', title: 'Why neural interfaces are the next trillon dollar market', likes: 234, comments: 45 },
             { user: 'Marcus C.', action: 'shared an analysis on', target: '$CHEF', title: 'The unit economics of fusion dining in 2025', likes: 189, comments: 22 },
             { user: 'Elena V.', action: 'posted an update for', target: '$OPERA', title: 'Backstage at Vienna: My preparation routine', likes: 542, comments: 89 }
           ].map((post, i) => (
             <Card key={i} className="group hover:bg-slate-900/60 transition-colors cursor-pointer">
               <div className="flex justify-between items-start mb-4">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center text-sm font-bold text-brand-300">
                      {post.user.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm text-slate-400">
                        <span className="text-white font-medium">{post.user}</span> {post.action} <span className="text-brand-400 font-mono">{post.target}</span>
                      </div>
                      <div className="text-xs text-slate-600">2 hours ago</div>
                    </div>
                 </div>
                 <Badge color="pink">Hot</Badge>
               </div>
               
               <h4 className="text-xl text-white font-light mb-4 group-hover:text-brand-200 transition-colors">{post.title}</h4>
               
               <div className="flex items-center gap-6 text-slate-500 text-sm">
                 <span className="flex items-center gap-2 hover:text-brand-400 transition-colors"><Heart size={16} /> {post.likes}</span>
                 <span className="flex items-center gap-2 hover:text-white transition-colors"><MessageSquare size={16} /> {post.comments}</span>
                 <span className="flex items-center gap-2 hover:text-white transition-colors"><Share2 size={16} /> Share</span>
               </div>
             </Card>
           ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
           <div className="space-y-4">
              <h3 className="text-white text-lg font-light flex items-center gap-2">
                <Star size={18} className="text-brand-500"/> Top Backers
              </h3>
              <div className="space-y-3">
                 {[1, 2, 3, 4, 5].map((i) => (
                   <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                         <div className="text-slate-600 font-mono text-xs">0{i}</div>
                         <img src={`https://picsum.photos/50/50?random=${i+100}`} className="w-8 h-8 rounded-full grayscale" />
                         <div className="text-sm text-slate-300">Investor_{i}99</div>
                      </div>
                      <div className="text-emerald-400 text-xs font-mono">+{(150 - i * 10)}%</div>
                   </div>
                 ))}
              </div>
           </div>

           <Card className="bg-slate-950/80 border border-white/5 overflow-hidden">
               <div className="flex items-center gap-2 mb-4">
                   <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></div>
                   <h3 className="text-white text-sm font-medium uppercase tracking-widest">Live Market Pulse</h3>
               </div>
               
               <div className="space-y-4 relative">
                   <div className="absolute left-1.5 top-1 bottom-1 w-px bg-gradient-to-b from-brand-500/50 to-transparent"></div>
                   
                   {[
                       { text: "Whale bought $5k of $ALEX", time: "2m ago" },
                       { text: "New Milestone: $CHEF Lease Signed", time: "5m ago" },
                       { text: "$TECHV Index rebalanced", time: "12m ago" },
                       { text: "150 new users joined", time: "1h ago" }
                   ].map((item, i) => (
                       <div key={i} className="flex items-start gap-3 pl-1">
                           <div className="w-3 h-3 rounded-full bg-slate-900 border border-brand-500/50 mt-1 relative z-10"></div>
                           <div>
                               <p className="text-sm text-slate-300 leading-tight">{item.text}</p>
                               <span className="text-[10px] text-slate-600">{item.time}</span>
                           </div>
                       </div>
                   ))}
               </div>
           </Card>
        </div>

      </div>
    </div>
  );
};

export default Community;
