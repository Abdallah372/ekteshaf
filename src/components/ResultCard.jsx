import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Info, CheckCircle2, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

const ResultCard = ({ result }) => {
  if (!result) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="glass-card p-10 h-full flex flex-col relative overflow-hidden bg-white/70"
    >
      {/* Success Animation Background */}
      {!result.lowConfidence && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-accent animate-pulse" />
      )}

      {/* Header Status */}
      <div className="flex items-center justify-between mb-12">
        <div className={`px-5 py-2 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-sm ${result.lowConfidence ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
          {result.lowConfidence ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
          {result.lowConfidence ? 'تحليل منخفض الدقة' : 'تم التحليل بنجاح'}
        </div>
        <div className="text-slate-300">
           <Zap size={24} />
        </div>
      </div>

      {/* Identity Section */}
      <div className="space-y-4 mb-12">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Material Classification</p>
          <h2 className="text-6xl font-black text-primary tracking-tight leading-none">{result.arabic}</h2>
        </div>
        <p className="text-xl font-bold text-slate-400/60 uppercase tracking-widest leading-none">{result.name}</p>
      </div>

      {/* Confidence Score 12px Gradient Bar */}
      <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 shadow-inner mb-10">
        <div className="flex justify-between items-end mb-4">
           <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">نسبة الثقة</span>
              <span className="text-4xl font-black text-primary">{result.confidence}%</span>
           </div>
           <ShieldCheck className="text-secondary" size={28} />
        </div>
        
        <div className="confidence-bar">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${result.confidence}%` }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className="confidence-progress shadow-lg shadow-emerald-200/50"
          />
        </div>

        {result.lowConfidence && (
          <div className="mt-6 flex gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100/50">
             <Info className="text-amber-600 shrink-0" size={18} />
             <p className="text-xs font-bold text-amber-800 leading-relaxed">
                درجة التأكد منخفضة. يرجى تجربة التصوير في إضاءة أفضل للحصول على نتيجة أكثر دقة.
             </p>
          </div>
        )}
      </div>

      {/* Actionable Insights */}
      <div className="grid gap-6 flex-grow">
        <div className="glass-panel p-6 bg-white/40 border-white hover:bg-white transition-all group">
          <div className="flex items-start gap-5">
             <div className="w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center shrink-0 shadow-xl group-hover:scale-110 transition-transform">
                <Info size={28} />
             </div>
             <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">التوصية الذكية</span>
                <p className="text-slate-800 font-bold leading-relaxed">{result.disposal}</p>
             </div>
          </div>
        </div>

        <div className="glass-panel p-6 bg-white/40 border-white hover:bg-white transition-all group">
          <div className="flex items-start gap-5">
             <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                <Leaf size={28} />
             </div>
             <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">الأثر البيئي المقدر</span>
                <p className="text-slate-800 font-bold leading-relaxed italic">"{result.tip}"</p>
                {result.impact > 0 && (
                   <span className="inline-block mt-2 text-[10px] font-black text-secondary px-3 py-1 bg-secondary/10 rounded-full italic">
                     حققت توفير {result.impact} كجم من CO₂
                   </span>
                )}
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
