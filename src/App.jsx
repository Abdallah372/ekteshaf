import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Analyzer from './components/Analyzer';
import { Recycle } from 'lucide-react';

function App() {
  const [view, setView] = useState('hero'); // 'hero' or 'platform'

  return (
    <div className="min-h-screen text-right" dir="rtl">
      <Navbar />

      <AnimatePresence mode="wait">
        {view === 'hero' ? (
          <motion.div
            key="h"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6 }}
          >
            <Hero onStart={() => setView('platform')} />
          </motion.div>
        ) : (
          <motion.div
            key="p"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-6xl mx-auto px-6 pb-24 pt-12"
          >
            {/* Minimal Platform Header */}
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-5xl font-black text-white leading-tight glow-primary">مركز التحليل الذكي</h2>
              <p className="text-slate-400 font-bold max-w-xl mx-auto text-lg">أداة احترافية للفرز الفوري المدعوم بـ AI</p>
            </div>

            {/* Core Interaction Node */}
            <Analyzer />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global SaaS Footer - Minimalist */}
      <footer className="mt-20 border-t border-white/5 bg-slate-950/40 backdrop-blur-3xl py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
           <div className="flex items-center gap-2">
              <Recycle size={18} className="text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-100">إكتشاف AI &copy; 2026</span>
           </div>
           <div className="text-[10px] font-bold text-slate-100">بإشراف عبدالله بن محمد العبادي</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
