
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Search,
  Zap,
  Users,
  Info,
  User as UserIcon
} from 'lucide-react';

// Types and Services
import { Token, User, ViewState } from './types';
import { MOCK_TOKENS, MOCK_USER } from './constants';

// Components
import Hero from './components/Hero';
import Trending from './components/Trending';
import Marketplace from './components/Marketplace';
import TokenDetail from './components/TokenDetail';
import Dashboard from './components/Dashboard';
import CreateToken from './components/CreateToken';
import Guide from './components/Guide';
import Community from './components/Community';
import { Button } from './components/UIComponents';

export default function App() {
  const [view, setView] = useState<ViewState>(ViewState.DISCOVER);
  const [tokens, setTokens] = useState<Token[]>(MOCK_TOKENS);
  const [user, setUser] = useState<User>(MOCK_USER);
  const [selectedTokenId, setSelectedTokenId] = useState<string | null>(null);

  const selectedToken = tokens.find(t => t.id === selectedTokenId);

  const handleSelectToken = (token: Token) => {
    setSelectedTokenId(token.id);
    setView(ViewState.TOKEN_DETAIL);
    window.scrollTo(0, 0);
  };

  const handleLaunchToken = (formData: any) => {
    const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=ff0080&color=fff`;
    
    const newToken: Token = {
      id: `t${Date.now()}`,
      creatorName: formData.name,
      ticker: formData.ticker.startsWith('$') ? formData.ticker : `$${formData.ticker}`,
      avatarUrl: formData.avatarUrl || defaultAvatar,
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-neon-lights-34405-preview.mp4',
      socialLink: formData.socialLink,
      ambition: formData.ambition,
      price: 1.00,
      floorPrice: 0.80, 
      supply: formData.supply,
      marketCap: 1.00 * formData.supply,
      holders: 1,
      change24h: 0,
      history: [{ time: 'Now', price: 1.00 }],
      tags: ['New', 'Launch'],
      milestones: [
        { id: 'm-new-1', title: 'Protocol Genesis', description: 'Roadmap certification and smart contract deployment.', status: 'completed', verifiedAt: new Date().toISOString().split('T')[0], impactScore: 10 },
        { id: 'm-new-2', title: 'Capability Audit', description: 'Third party verification of creator roadmap.', status: 'pending', impactScore: 20 }
      ]
    };

    setTokens([newToken, ...tokens]);
    setUser({ ...user, isCreator: true, createdTokenId: newToken.id });
    setSelectedTokenId(newToken.id);
    setView(ViewState.TOKEN_DETAIL);
  };

  const handleTrade = (tokenId: string, amount: number, isBuy: boolean) => {
    const token = tokens.find(t => t.id === tokenId);
    if (!token) return;
    const cost = amount * token.price;

    if (isBuy) {
      if (user.walletBalance < cost) {
        alert("Insufficient balance.");
        return;
      }
      const newPortfolio = [...user.portfolio];
      const existingHolding = newPortfolio.find(p => p.tokenId === tokenId);
      if (existingHolding) existingHolding.amount += amount;
      else newPortfolio.push({ tokenId, amount, avgBuyPrice: token.price });
      setUser({ ...user, walletBalance: user.walletBalance - cost, portfolio: newPortfolio });
      updateTokenPrice(tokenId, token.price * (1 + (amount / 10000)));
    } else {
      const existingHolding = user.portfolio.find(p => p.tokenId === tokenId);
      if (!existingHolding || existingHolding.amount < amount) {
        alert("Insufficient units.");
        return;
      }
      const projectedPrice = token.price * (1 - (amount / 10000));
      if (projectedPrice < token.floorPrice) {
        alert(`Valuation Floor Protection: Liquidation denied.`);
        return;
      }
      existingHolding.amount -= amount;
      setUser({ ...user, walletBalance: user.walletBalance + cost, portfolio: user.portfolio.filter(p => p.amount > 0) });
      updateTokenPrice(tokenId, projectedPrice);
    }
  };

  const updateTokenPrice = (tokenId: string, newPrice: number) => {
    setTokens(prev => prev.map(t => {
      if (t.id === tokenId) {
        const newHistory = [...t.history, { time: new Date().toLocaleTimeString(), price: newPrice }];
        if (newHistory.length > 50) newHistory.shift();
        return { 
          ...t, 
          price: newPrice, 
          change24h: ((newPrice - t.history[0].price) / t.history[0].price) * 100,
          history: newHistory,
          marketCap: newPrice * t.supply
        };
      }
      return t;
    }));
  };

  const navLinks = [
    { label: 'Market', view: ViewState.MARKETPLACE, icon: <Search size={16} /> },
    { label: 'Believers', view: ViewState.COMMUNITY, icon: <Users size={16} /> },
    { label: 'How it Works', view: ViewState.GUIDE, icon: <Info size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-transparent text-slate-200 font-sans">
      <nav className="fixed w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/5 h-20">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => { setView(ViewState.DISCOVER); window.scrollTo(0, 0); }}
          >
            <TrendingUp className="text-brand-500 group-hover:scale-110 transition-transform" size={24} />
            <span className="text-xl font-bold tracking-tighter text-white">Uptential</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => setView(link.view)}
                className={`text-sm font-medium transition-all hover:text-white flex items-center gap-2 ${view === link.view ? 'text-brand-400' : 'text-slate-400'}`}
              >
                {link.icon}
                {link.label}
              </button>
            ))}
          </div>

          <Button 
            variant={view === ViewState.DASHBOARD ? 'pink' : 'outline'}
            onClick={() => setView(ViewState.DASHBOARD)}
            className="flex items-center gap-2 h-10 px-5"
          >
            <UserIcon size={16} /> Profile
          </Button>
        </div>
      </nav>

      <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
        {view === ViewState.DISCOVER && (
          <div className="space-y-24">
            <Hero onLaunchToken={() => setView(ViewState.CREATE_TOKEN)} onExplore={() => setView(ViewState.MARKETPLACE)} />
            <Trending tokens={tokens} onSelectToken={handleSelectToken} onViewMarketplace={() => setView(ViewState.MARKETPLACE)} />
          </div>
        )}
        {view === ViewState.MARKETPLACE && <Marketplace tokens={tokens} onSelectToken={handleSelectToken} />}
        {view === ViewState.TOKEN_DETAIL && selectedToken && (
          <TokenDetail token={selectedToken} user={user} onBack={() => setView(ViewState.MARKETPLACE)} onTrade={handleTrade} />
        )}
        {view === ViewState.DASHBOARD && (
          <Dashboard user={user} tokens={tokens} onNavigateToCreate={() => setView(ViewState.CREATE_TOKEN)} onSelectToken={handleSelectToken} />
        )}
        {view === ViewState.CREATE_TOKEN && <CreateToken onSubmit={handleLaunchToken} onCancel={() => setView(ViewState.DISCOVER)} />}
        {view === ViewState.GUIDE && <Guide onLaunch={() => setView(ViewState.CREATE_TOKEN)} />}
        {view === ViewState.COMMUNITY && <Community tokens={tokens} onSelectToken={handleSelectToken} />}
      </main>

      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-30">
            <TrendingUp size={16} />
            <span className="font-bold tracking-tight text-sm">Uptential</span>
          </div>
          <p className="text-xs text-slate-600 font-light">The World's Human Equity Marketplace.</p>
        </div>
      </footer>
    </div>
  );
}
