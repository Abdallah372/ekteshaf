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
            <h1 className="text-2xl font-black text-primary tracking-tight leading-none">إيكو سورت <span className="text-secondary text-base">v4.0</span></h1>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">AI Waste Management</span>
          </div>
        </div>

        {/* Global SaaS Actions */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6 text-sm font-bold text-slate-500 border-l border-slate-200 ml-6 pl-6">
            <button className="hover:text-primary transition-colors hover:scale-105 active:scale-95 flex items-center gap-2">
              <LayoutDashboard size={18} /> لوحة التحكم
            </button>
            <button className="hover:text-primary transition-colors hover:scale-105 active:scale-95 flex items-center gap-2">
              <Settings size={18} /> الإعدادات
            </button>
          </div>
          <button className="p-3 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <User size={20} className="text-slate-600" />
          </button>
        </div>

        {/* Brand Mobile Button */}
        <button className="md:hidden p-3 bg-primary text-white rounded-2xl shadow-lg">
          <User size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
