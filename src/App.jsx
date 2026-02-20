import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Analyzer from './components/Analyzer';
import { Recycle, Heart } from 'lucide-react';

const App = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="min-h-screen relative selection:bg-primary selection:text-slate-950">
      <div className="fixed inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="fixed inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/90 to-primary/5 -z-10" />
      
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {!active ? (
          <Hero onStart={() => setActive(true)} />
        ) : (
          <Analyzer />
        )}
      </main>

      <footer className="mt-20 border-t border-white/5 bg-slate-950/40 backdrop-blur-3xl py-16 px-6">
        <div className="max-w-7xl mx-auto">
           <div className="flex flex-col md:flex-row justify-between items-start gap-12 opacity-60 hover:opacity-100 transition-opacity">
              <div className="space-y-4">
                 <div className="flex items-center gap-2">
                    <Recycle size={20} className="text-primary" />
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-white">إكتشاف AI</span>
                 </div>
                 <p className="text-xs font-bold text-slate-500 max-w-xs leading-relaxed">
                    نظام ذكاء اصطناعي وطني متطور لفرز النفايات، صُمم لتعزيز الاستدامة الرقمية في المجتمع المصري.
                 </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16">
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">الباحث</h4>
                    <p className="text-xs font-bold text-slate-100">عبدالله بن محمد العبادي</p>
                    <p className="text-[10px] text-slate-500 font-bold">مدرسة المريناب الثانوية — قرية المريناب</p>
                 </div>
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">الموقع</h4>
                    <p className="text-xs font-bold text-slate-100">جمهورية مصر العربية</p>
                    <p className="text-[10px] text-slate-500 font-bold">قرية الغنيمية — مركز إدفو — محافظة أسوان</p>
                 </div>
              </div>
           </div>

           <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-600">&copy; 2026 إكتشاف AI. جميع الحقوق محفوظة.</span>
              <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-600">
                 صنع بـ <Heart size={10} className="text-primary" /> من أجل بيئة مصرية خضراء
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
