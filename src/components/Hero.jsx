import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles } from 'lucide-react';

const Hero = ({ onStart }) => {
  return (
    <section className="relative pt-24 pb-32 overflow-hidden px-6">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -mr-64 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -ml-40 -mb-20" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-12 border border-white/10"
        >
          <Sparkles size={12} className="text-primary" /> استدامة برؤية تقنية
        </motion.div>

        <div className="space-y-8">
          <h1 className="text-5xl sm:text-7xl lg:text-[10rem] font-black text-white leading-[0.85] tracking-tighter antialiased">
            الفرز بذكاء <br />
            <span className="gradient-text">إكتشاف AI</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            مستقبل الاستدامة يبدأ هنا. محرك رؤية حاسوبية فائقة السرعة لتحليل النفايات والمساهمة في بيئة أنظف بلمسة واحدة.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <button 
            onClick={onStart}
            className="btn-primary"
          >
            إطلاق النظام <Brain size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
