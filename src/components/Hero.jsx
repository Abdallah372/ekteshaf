import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, PlayCircle, Info } from 'lucide-react';

const Hero = ({ onStart }) => {
  return (
    <section className="relative pt-24 pb-32 overflow-hidden px-6">
      {/* SaaS Decorative Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] -mr-64 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] -ml-40 -mb-20" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-3 px-6 py-2 glass-card rounded-full text-secondary font-bold text-sm mb-12 shadow-sm border-white/60"
        >
          <Sparkles size={16} /> ثورة الذكاء الاصطناعي في الاستدامة
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
           className="space-y-8"
        >
          <h1 className="text-6xl lg:text-8xl font-black text-primary leading-[1.05] tracking-tight">
            منصة <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">EcoSort AI</span>
            <br /> مستقبل إدارة النفايات
          </h1>
          <p className="text-xl lg:text-2xl text-slate-500 leading-relaxed max-w-3xl mx-auto font-medium">
            حوّل هاتفك إلى خبير بيئي ذكي. نستخدم تقنيات الرؤية الحاسوبية المتقدمة لفرز النفايات بدقة متناهية، لنبني معاً مستقبلاً أكثر اخضراراً.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16"
        >
          <button 
            onClick={onStart}
            className="btn-primary"
          >
            <Brain size={24} className="animate-pulse" /> ابدأ التحليل الآن
          </button>
          
          <button className="btn-secondary">
             كيف يعمل؟ <PlayCircle size={22} className="text-secondary" />
          </button>
        </motion.div>

        {/* SaaS Trust Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-24 pt-10 border-t border-slate-200/40 flex flex-wrap justify-center gap-12 grayscale opacity-50"
        >
           <div className="flex items-center gap-3 font-black text-slate-900 tracking-tighter">
              <div className="w-8 h-8 bg-slate-900 rounded-lg" /> AI ENGINE v4.0
           </div>
           <div className="flex items-center gap-3 font-black text-slate-900 tracking-tighter">
              <div className="w-8 h-8 border-2 border-slate-900 rounded-full" /> DAAWAH COMPOSER
           </div>
           <div className="flex items-center gap-3 font-black text-slate-900 tracking-tighter">
              <Sparkles size={24} /> PREMIUM SAAS
           </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
