import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Analyzer from './components/Analyzer';
import StatsSection from './components/StatsSection';
import statsService from './services/statsService';
import { Recycle, Globe, ShieldCheck, Mail } from 'lucide-react';

function App() {
  const [view, setView] = useState('hero'); // 'hero' or 'platform'
  const [stats, setStats] = useState(statsService.getStats());

  useEffect(() => {
    // Stats update listener for dashboard
    const i = setInterval(() => setStats(statsService.getStats()), 2000);
    return () => clearInterval(i);
  }, []);

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

      {/* Global SaaS Footer */}
      <footer className="mt-40 border-t border-slate-200/60 bg-white/40 backdrop-blur-3xl pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-16">
          <div className="lg:col-span-2 space-y-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary text-white rounded-2xl shadow-xl">
                <Recycle size={32} />
              </div>
              <span className="text-4xl font-black text-primary tracking-tighter">إيكو سورت <span className="text-secondary text-2xl">AI</span></span>
            </div>
            <p className="text-xl text-slate-500 leading-relaxed font-medium max-w-lg pr-4 border-r-4 border-secondary/20">
              نحن لا نكتفي بفرز النفايات، بل نبني ثقافة تقنية جديدة للحفاظ على مقدرات كوكبنا باستخدام أقوى خوارزميات الذكاء الاصطناعي.
            </p>
          </div>

          <div className="space-y-8 pr-4">
            <h5 className="text-primary font-black uppercase text-xs tracking-widest">الروابط السريعة</h5>
            <ul className="space-y-4 text-slate-500 font-bold">
              <li className="hover:text-primary transition-colors cursor-pointer">عن المشروع</li>
              <li className="hover:text-primary transition-colors cursor-pointer">التقنيات المستخدمة</li>
              <li className="hover:text-primary transition-colors cursor-pointer">المجتمع البيئي</li>
            </ul>
          </div>

          <div className="space-y-8 pr-4">
            <h5 className="text-primary font-black uppercase text-xs tracking-widest">تحت إشراف</h5>
            <div className="space-y-3">
              <p className="text-2xl font-black text-primary leading-tight">عبدالله بن محمد العبادي</p>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                 مبادرة الاستدامة الذكية <br /> 2026 Innovation Hub
              </p>
              <div className="flex gap-4 pt-4">
                 <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white transition-all">
                    <Globe size={20} />
                 </div>
                 <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white transition-all">
                    <Mail size={20} />
                 </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-slate-200/40 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900">EcoSort Global Initiative &copy; 2026</span>
           <div className="flex gap-10">
              <span className="text-[9px] font-bold">Privacy Policy</span>
              <span className="text-[9px] font-bold">Terms of Service</span>
           </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
