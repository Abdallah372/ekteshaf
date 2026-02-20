import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, PlayCircle, Info } from 'lucide-react';

const Hero = ({ onStart }) => {
  return (
    <section className="relative pt-24 pb-32 overflow-hidden px-6">
      {/* SaaS Decorative Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] -mr-64 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] -ml-40 -mb-20" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary font-bold text-[10px] uppercase tracking-widest mb-10 border border-primary/20"
        >
          <Sparkles size={12} /> Gen-Z AI Sustainability
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="space-y-6"
        >
          <h1 className="text-7xl lg:text-9xl font-black text-white leading-tight tracking-tighter">
            الفرز بذكاء <br />
            <span className="gradient-text">إكتشاف AI</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-400 font-medium max-w-2xl mx-auto">
            مستقبل الاستدامة يبدأ هنا. صور، حلل، وساهم بلمسة واحدة.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <button 
            onClick={onStart}
            className="btn-primary"
          >
            ابدأ الآن <Brain size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
