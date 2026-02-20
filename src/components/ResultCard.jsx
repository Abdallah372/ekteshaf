import React from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf, Info, LayoutGrid, CupSoda, FileText, Container, FlaskConical, Shirt, Footprints, Package, Apple, Battery, HelpCircle 
} from 'lucide-react';

const CategoryIcons = {
  CupSoda, FileText, Container, FlaskConical, Shirt, Footprints, Package, Apple, Battery, HelpCircle
};

const ResultCard = ({ result }) => {
  if (!result) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-10 h-full flex flex-col relative overflow-hidden bg-slate-900/40 border-white/5"
    >
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/50 via-primary to-transparent" />

      <div className="space-y-2 mb-10 text-right">
        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">نتيجة التحليل</span>
        <div className="flex items-center justify-end gap-3">
            <h2 className="text-7xl font-black text-white leading-none tracking-tighter">{result.arabic}</h2>
            {(() => {
                const Icon = CategoryIcons[result.icon] || LayoutGrid;
                return <Icon size={48} className="text-primary" />;
            })()}
        </div>
        <p className="text-lg font-bold text-slate-500 uppercase tracking-widest">{result.name}</p>
      </div>

      <div className="bg-slate-950/30 p-8 rounded-3xl border border-white/5 mb-8">
        <div className="flex flex-col text-right mb-4">
           <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">درجة الثقة</span>
           <span className="text-6xl font-black text-white tracking-tighter tabular-nums">
             {result.confidence}<span className="text-2xl text-primary opacity-40">%</span>
           </span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${result.confidence}%` }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-full bg-primary shadow-[0_0_20px_rgba(74,222,128,0.4)]"
          />
        </div>
      </div>

      <div className="flex-grow space-y-4">
        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex gap-5 items-start">
           <div className="p-2 bg-primary/10 rounded-lg text-primary mt-1">
              <Info size={16} />
           </div>
           <p className="text-xs font-medium text-slate-300 leading-relaxed">{result.disposal}</p>
        </div>
        <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 flex gap-5 items-start">
           <div className="p-2 bg-primary/20 rounded-lg text-primary mt-1">
              <Leaf size={16} />
           </div>
           <p className="text-xs font-bold text-primary leading-relaxed antialiased">
             "{result.tip}"
           </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
