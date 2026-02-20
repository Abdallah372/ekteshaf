import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Recycle } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', sync);
    return () => window.removeEventListener('scroll', sync);
  }, []);

  return (
    <nav className={`glass-nav transition-all duration-300 ${scrolled ? 'py-3 shadow-2xl' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="p-2.5 bg-primary/10 rounded-2xl text-primary border border-primary/20"
          >
            <Recycle size={22} strokeWidth={2.5} />
          </motion.div>
          <div className="flex flex-col text-right">
            <h1 className="text-xl font-black text-white tracking-tighter">إكتشاف <span className="text-primary tracking-normal">AI</span></h1>
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">ذكاء رقمي</span>
          </div>
        </div>

        <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full font-bold text-[9px] text-slate-400 uppercase tracking-widest">
           إصدار الإنتاج v6.0
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
