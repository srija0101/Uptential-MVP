
import React, { useState } from 'react';
import { User, Token } from '../types';
import { Card, Button } from './UIComponents';
import { Wallet, PieChart, TrendingUp, CreditCard, Coins, Zap, Activity, User as UserIcon } from 'lucide-react';

interface DashboardProps {
  user: User;
  tokens: Token[];
  onNavigateToCreate: () => void;
  onSelectToken: (token: Token) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, tokens, onNavigateToCreate, onSelectToken }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'settings'>('overview');

  const totalPortfolioValue = user.portfolio.reduce((acc, item) => {
    const token = tokens.find(t => t.id === item.tokenId);
    return acc + (token ? token.price * item.amount : 0);
  }, 0);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 px-4 max-w-5xl mx-auto">
      <div className="flex border-b border-white/5 mb-6">
         <button onClick={() => setActiveTab('overview')} className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 ${activeTab === 'overview' ? 'border-brand-500 text-white' : 'border-transparent text-slate-500 hover:text-white'}`}>Portfolio</button>
         <button onClick={() => setActiveTab('settings')} className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 ${activeTab === 'settings' ? 'border-brand-500 text-white' : 'border-transparent text-slate-500 hover:text-white'}`}>Payment Settings</button>
      </div>

      {activeTab === 'overview' && (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="md:col-span-2 bg-slate-900/40 border-white/5 p-10 rounded-[32px]">
                  <div className="flex flex-col md:flex-row items-center justify-between h-full gap-8">
                      <div className="text-center md:text-left space-y-4">
                          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center justify-center md:justify-start gap-2">
                              <Wallet size={14} /> Protocol Assets
                          </p>
                          <h2 className="text-5xl font-light text-white tracking-tighter tabular-nums">${(totalPortfolioValue + user.walletBalance).toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
                          <div className="flex gap-8 justify-center md:justify-start">
                              <div>
                                  <p className="text-slate-600 text-[9px] uppercase font-black tracking-widest">Liquid</p>
                                  <p className="text-white font-mono text-lg tracking-tighter tabular-nums">${user.walletBalance.toFixed(2)}</p>
                              </div>
                              <div>
                                  <p className="text-slate-600 text-[9px] uppercase font-black tracking-widest">HPT Equity</p>
                                  <p className="text-brand-400 font-mono text-lg tracking-tighter tabular-nums">${totalPortfolioValue.toFixed(2)}</p>
                              </div>
                          </div>
                      </div>
                      <div className="flex flex-col gap-3 w-full md:w-auto">
                          <Button variant="glow" className="h-11 px-8 text-[10px] font-black uppercase tracking-widest">Deposit</Button>
                          <Button variant="outline" className="h-11 px-8 border-white/5 text-[10px] font-black uppercase tracking-widest">Withdraw</Button>
                      </div>
                  </div>
                </Card>

                <Card className="flex flex-col justify-center items-center text-center p-8 bg-brand-500/5 border-brand-500/10 rounded-[32px] group">
                    <Zap size={24} className="text-brand-500 mb-6 group-hover:scale-110 transition-transform" fill="currentColor" />
                    <h3 className="text-white font-light text-xl tracking-tight mb-2">Tokenize Potential</h3>
                    <p className="text-slate-500 text-[9px] mb-8 uppercase tracking-widest">Issue your human potential tokens</p>
                    <Button variant="glow" onClick={onNavigateToCreate} className="w-full h-11 text-[10px] font-black uppercase tracking-widest">Apply Now</Button>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-white text-lg font-light tracking-tight flex items-center gap-3">
                        <PieChart size={18} className="text-slate-500" /> Holdings
                    </h3>
                    <div className="space-y-3">
                        {user.portfolio.map((item) => {
                            const token = tokens.find(t => t.id === item.tokenId);
                            if (!token) return null;
                            const gain = ((token.price - item.avgBuyPrice) / item.avgBuyPrice) * 100;
                            return (
                                <div key={item.tokenId} onClick={() => onSelectToken(token)} className="flex items-center justify-between p-5 bg-slate-950/40 border border-white/5 rounded-[24px] hover:border-brand-500/20 cursor-pointer transition-all">
                                    <div className="flex items-center gap-4">
                                        <img src={token.avatarUrl} className="w-10 h-10 rounded-xl object-cover" alt="" />
                                        <div>
                                            <h4 className="text-white font-medium text-sm tracking-tight">{token.creatorName}</h4>
                                            <div className="flex items-center gap-3">
                                                <span className="text-brand-500 font-mono text-[9px] uppercase tracking-widest font-black">{token.ticker}</span>
                                                <span className="text-slate-600 text-[10px]">{item.amount.toLocaleString()} Units</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-white font-mono text-lg tabular-nums">${(item.amount * token.price).toLocaleString()}</p>
                                        <div className={`text-[9px] font-black flex items-center justify-end gap-1 ${gain >= 0 ? 'text-emerald-400' : 'text-brand-400'}`}>
                                            {gain > 0 ? '+' : ''}{gain.toFixed(1)}%
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-white text-lg font-light tracking-tight">Identity</h3>
                    <Card className="bg-slate-950/40 border border-white/5 p-8 flex flex-col items-center text-center rounded-[32px]">
                        <UserIcon size={32} className="text-slate-700 mb-6" />
                        <p className="text-slate-500 text-xs mb-8 italic uppercase tracking-widest">Observer Mode</p>
                        <Button variant="outline" onClick={onNavigateToCreate} className="w-full h-11 text-[10px] font-black uppercase tracking-widest border-white/5">Mint Creator ID</Button>
                    </Card>
                </div>
            </div>
        </>
      )}

      {activeTab === 'settings' && (
         <div className="max-w-2xl mx-auto space-y-6 py-8">
            <h3 className="text-white text-xl font-light tracking-tight mb-6">Payment Configuration</h3>
            <Card className="border-white/5 bg-slate-950/40 flex items-center justify-between p-6 rounded-[24px]">
                <div className="flex items-center gap-5">
                    <div className="w-12 h-8 bg-[#1434CB] rounded flex items-center justify-center text-white text-[8px] font-black italic">VISA</div>
                    <div>
                        <h4 className="text-white font-medium text-base">•••• 4242</h4>
                        <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mt-0.5">Primary Source</p>
                    </div>
                </div>
                <Button variant="outline" className="text-[9px] font-black tracking-widest h-8 px-4 border-white/5">Manage</Button>
            </Card>
            <Card className="border-brand-500/20 bg-brand-500/5 flex items-center justify-between p-6 rounded-[24px]">
                <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8E32FF] to-[#00FFA3] flex items-center justify-center shadow-lg"><Zap size={18} className="text-white" fill="currentColor" /></div>
                    <div>
                        <h4 className="text-white font-medium text-base">HPT Wallet</h4>
                        <p className="text-[9px] text-brand-400 font-black uppercase tracking-widest mt-0.5">Active Sync</p>
                    </div>
                </div>
                <Button variant="outline" className="text-[9px] font-black tracking-widest h-8 px-4 border-brand-500/20 text-brand-400">Sync</Button>
            </Card>
         </div>
      )}
    </div>
  );
};

export default Dashboard;
