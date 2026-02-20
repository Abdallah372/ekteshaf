import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Info, CheckCircle2, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

const ResultCard = ({ result }) => {
  if (!result) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-10 h-full flex flex-col relative overflow-hidden bg-slate-900/60"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary animate-pulse" />

      {/* Identity */}
      <div className="space-y-2 mb-10 text-right">
        <span className="text-[10px] font-black text-primary uppercase tracking-widest">التصنيف الذكي</span>
        <h2 className="text-7xl font-black text-white leading-none tracking-tighter">{result.arabic}</h2>
        <p className="text-lg font-bold text-slate-500 uppercase tracking-widest leading-none">{result.name}</p>
      </div>

      {/* Confidence */}
      <div className="bg-slate-950/50 p-6 rounded-3xl border border-white/5 mb-8">
        <div className="flex justify-between items-end mb-4">
           <div className="flex flex-col text-right w-full">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">دقة المحرك</span>
              <span className="text-5xl font-black text-white glow-primary tracking-tighter">{result.confidence}%</span>
           </div>
        </div>
        <div className="confidence-bar">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${result.confidence}%` }}
            transition={{ duration: 1, ease: "circOut" }}
            className="confidence-progress"
          />
        </div>
      </div>

      {/* Insights */}
      <div className="space-y-4">
        <div className="p-5 bg-white/5 rounded-2xl border border-white/5 flex gap-4 items-center">
           <Info className="text-primary" size={20} />
           <p className="text-xs font-bold text-slate-300 leading-relaxed">{result.disposal}</p>
        </div>
        <div className="p-5 bg-primary/5 rounded-2xl border border-primary/10 flex gap-4 items-center">
           <Leaf className="text-primary" size={20} />
           <p className="text-xs font-bold text-primary italic">"{result.tip}"</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
