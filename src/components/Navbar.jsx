import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Recycle, LayoutDashboard, Settings, User } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`glass-nav transition-all duration-300 ${isScrolled ? 'py-4 shadow-xl' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.6 }}
            className="p-3 bg-primary rounded-2xl text-white shadow-2xl shadow-primary/30"
          >
            <Recycle size={24} strokeWidth={2.5} />
          </motion.div>
          <div className="flex flex-col text-right">
            <h1 className="text-2xl font-black text-white tracking-tight leading-none">إكتشاف <span className="text-primary text-base">AI</span></h1>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Minimalist Intelligence</span>
          </div>
        </div>

        {/* Action */}
        <button className="px-5 py-2 bg-white/5 border border-white/10 rounded-xl font-bold text-[10px] hover:bg-white/10 transition-all text-slate-300">
          دخول
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
