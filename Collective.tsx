import React from 'react';
import { Card, Button, Badge } from './UIComponents';
import { Users, Layers, ArrowRight, Shield, Globe } from 'lucide-react';

interface CollectiveProps {
    onBack: () => void;
}

const Collective: React.FC<CollectiveProps> = ({ onBack }) => {
  return (
    <div className="max-w-7xl mx-auto space-y-12 py-8 animate-in fade-in duration-700">
        <div className="flex justify-between items-center">
            <button onClick={onBack} className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors text-sm group">
                <ArrowRight size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> Back
            </button>
            <Button variant="glow">Create New Collective</Button>
        </div>

        <div className="text-center space-y-4 py-10">
            <div className="w-16 h-16 bg-brand-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-brand-500/20">
                <Layers className="text-brand-500" size={32} />
            </div>
            <h1 className="text-5xl font-light text-white">Investment <span className="text-brand-500 font-display">Collectives</span></h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Pool capital with friends or like-minded believers to back high-potential individuals with greater impact.
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            {[
                { name: "Deep Tech DAO", members: 420, capital: "$2.4M", focus: "Science & Eng" },
                { name: "Culinary Future", members: 89, capital: "$450k", focus: "Hospitality" },
                { name: "Artist Guild", members: 1200, capital: "$1.1M", focus: "Arts & Music" },
                { name: "Green Energy Fund", members: 305, capital: "$3.2M", focus: "Energy" },
                { name: "Gen Z Founders", members: 66, capital: "$120k", focus: "Startups" },
                { name: "Global Impact", members: 1500, capital: "$5.0M", focus: "Social" },
            ].map((c, i) => (
                <Card key={i} className="group hover:border-brand-500/30 cursor-pointer">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                            <Users size={20} />
                        </div>
                        <Badge color="blue">{c.focus}</Badge>
                    </div>
                    <h3 className="text-xl text-white font-medium mb-2">{c.name}</h3>
                    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/5">
                        <div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest">Capital</div>
                            <div className="text-lg text-white font-mono">{c.capital}</div>
                        </div>
                        <div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest">Members</div>
                            <div className="text-lg text-white font-mono">{c.members}</div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    </div>
  );
};

export default Collective;