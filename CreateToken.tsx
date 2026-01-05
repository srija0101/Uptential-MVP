
import React, { useState, useRef } from 'react';
import { Card, Button } from './UIComponents';
import { Sparkles, ArrowRight, Upload, X, Shield, FileText, CheckCircle, Lock, User, Target, Globe } from 'lucide-react';
import { refineAmbition } from '../services/geminiService';

interface CreateTokenProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const CreateToken: React.FC<CreateTokenProps> = ({ onSubmit, onCancel }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const idInputRef = useRef<HTMLInputElement>(null);
  const proofInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    ticker: '$',
    ambition: '',
    supply: 100000,
    avatarUrl: '' as string | null,
    kycFile: '' as string | null,
    proofFile: '' as string | null,
    socialLink: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, avatarUrl: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'kycFile' | 'proofFile') => {
      const file = e.target.files?.[0];
      if (file) setFormData(prev => ({ ...prev, [field]: file.name }));
  };

  const clearImage = () => {
    setFormData(prev => ({ ...prev, avatarUrl: null }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRefineAmbition = async () => {
    if (!formData.ambition) return;
    setLoading(true);
    const refined = await refineAmbition(formData.ambition);
    setFormData(prev => ({ ...prev, ambition: refined }));
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 px-4">
      <div className="text-center mb-12 space-y-3">
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Launch Your <span className="text-brand-500 italic">HPT</span></h2>
        <p className="text-slate-400 text-base font-light italic">Financialize your future roadmap.</p>
      </div>

      <div className="flex justify-between items-center mb-12 px-10 relative">
         <div className="absolute left-16 right-16 top-7 h-px bg-white/5 -z-10"></div>
         {[1, 2, 3].map(i => (
             <div key={i} className="flex flex-col items-center gap-3 relative">
                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black transition-all ${step >= i ? 'bg-brand-500 text-white shadow-lg' : 'bg-slate-900 text-slate-700 border border-white/5'}`}>
                     {step > i ? <CheckCircle size={20} /> : i === 1 ? <User size={20}/> : i === 2 ? <Target size={20} /> : <Shield size={20} />}
                 </div>
                 <span className={`text-[8px] uppercase tracking-widest font-black ${step >= i ? 'text-white' : 'text-slate-700'}`}>
                    {i === 1 ? 'Identity' : i === 2 ? 'Trajectory' : 'Verification'}
                 </span>
             </div>
         ))}
      </div>

      <Card className="bg-black/40 backdrop-blur-3xl border-white/10 p-10 rounded-[40px]">
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-8">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="flex justify-center">
                <div className={`relative w-32 h-32 rounded-3xl flex items-center justify-center border-2 border-dashed ${formData.avatarUrl ? 'border-brand-500' : 'border-slate-800 hover:border-brand-500/50 hover:bg-slate-900'}`} onClick={() => !formData.avatarUrl && fileInputRef.current?.click()}>
                  {formData.avatarUrl ? (
                    <>
                      <img src={formData.avatarUrl} alt="Preview" className="w-full h-full object-cover rounded-3xl" />
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 rounded-3xl text-white" onClick={(e) => { e.stopPropagation(); clearImage(); }}><X size={24} /></div>
                    </>
                  ) : (
                    <div className="text-center p-4">
                      <Upload className="mx-auto text-slate-700 mb-1" size={24} />
                      <span className="text-[8px] text-slate-700 uppercase font-black">Avatar</span>
                    </div>
                  )}
                </div>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-[9px] uppercase font-black text-slate-600 tracking-widest mb-2">Creator Name</label>
                  <input required name="name" value={formData.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:border-brand-500 focus:outline-none" placeholder="Alex Chen" />
                </div>
                <div>
                  <label className="block text-[9px] uppercase font-black text-slate-600 tracking-widest mb-2">Ticker Symbol</label>
                  <input required name="ticker" value={formData.ticker} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:border-brand-500 focus:outline-none font-mono" placeholder="$ALEX" />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button onClick={() => setStep(2)} type="button" className="h-12 px-10 text-[10px] uppercase font-black tracking-widest">Next Step <ArrowRight size={14} className="ml-2" /></Button>
              </div>
            </div>
          )}

          {step === 2 && (
             <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
               <div>
                 <label className="block text-[9px] uppercase font-black text-brand-500 tracking-widest mb-4">Core Ambition</label>
                 <textarea required name="ambition" value={formData.ambition} onChange={handleChange} rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-6 text-white focus:border-brand-500 focus:outline-none text-lg font-light italic" placeholder="My mission is to..." />
                 <button type="button" onClick={handleRefineAmbition} disabled={loading || !formData.ambition} className="mt-3 text-[9px] font-black uppercase tracking-widest flex items-center gap-1 text-brand-400 transition-all"><Sparkles size={12} /> {loading ? 'Analyzing...' : 'Refine with AI'}</button>
               </div>
               <div>
                  <label className="block text-[9px] uppercase font-black text-slate-600 tracking-widest mb-2">Supply Level</label>
                  <select name="supply" value={formData.supply} onChange={(e) => setFormData({...formData, supply: parseInt(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white focus:border-brand-500 focus:outline-none appearance-none font-bold">
                    <option value={10000}>Scarcity (10k HPT)</option>
                    <option value={100000}>Growth (100k HPT)</option>
                  </select>
               </div>
               <div className="flex justify-between pt-2 gap-4">
                 <Button variant="outline" onClick={() => setStep(1)} className="h-12 px-8 text-[10px] font-black uppercase tracking-widest">Back</Button>
                 <Button onClick={() => setStep(3)} type="button" className="h-12 px-10 text-[10px] uppercase font-black tracking-widest flex-1">Verification <ArrowRight size={14} /></Button>
               </div>
             </div>
          )}

          {step === 3 && (
             <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                 <div className="bg-brand-500/5 border border-brand-500/10 p-6 rounded-2xl flex items-start gap-4">
                    <Shield className="text-brand-500 shrink-0" size={20} />
                    <p className="text-xs text-slate-500 leading-relaxed italic">Identity confirmation via verified social link required for protocol trust.</p>
                 </div>
                 <div className="space-y-6">
                    <div>
                        <label className="block text-[9px] uppercase font-black text-slate-600 tracking-widest mb-2">Social Proof (LinkedIn / Portfolio)</label>
                        <div className="relative">
                            <input required name="socialLink" value={formData.socialLink} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-12 py-3 text-white focus:border-brand-500 focus:outline-none" placeholder="https://..." />
                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div onClick={() => idInputRef.current?.click()} className={`h-20 border-2 border-dashed rounded-2xl flex items-center justify-center cursor-pointer ${formData.kycFile ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-white/5'}`}>
                            {formData.kycFile ? <CheckCircle size={20} className="text-emerald-500" /> : <Lock size={20} className="text-slate-800" />}
                            <input type="file" ref={idInputRef} className="hidden" onChange={(e) => handleDocUpload(e, 'kycFile')} />
                        </div>
                        <div onClick={() => proofInputRef.current?.click()} className={`h-20 border-2 border-dashed rounded-2xl flex items-center justify-center cursor-pointer ${formData.proofFile ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-white/5'}`}>
                            {formData.proofFile ? <CheckCircle size={20} className="text-emerald-500" /> : <FileText size={20} className="text-slate-800" />}
                            <input type="file" ref={proofInputRef} className="hidden" onChange={(e) => handleDocUpload(e, 'proofFile')} />
                        </div>
                    </div>
                 </div>
                 <div className="flex justify-between pt-4 gap-4">
                    <Button variant="outline" onClick={() => setStep(2)} className="h-12 px-8 text-[10px] uppercase font-black tracking-widest">Back</Button>
                    <Button type="submit" variant="glow" disabled={!formData.kycFile || !formData.proofFile || !formData.socialLink} className="h-12 px-10 text-[10px] uppercase font-black tracking-widest flex-1 shadow-2xl">Launch Potential Token 🚀</Button>
                 </div>
             </div>
          )}
        </form>
      </Card>
    </div>
  );
};

export default CreateToken;
