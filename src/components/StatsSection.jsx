import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Target, Leaf } from 'lucide-react';

const StatsSection = ({ stats }) => {
  const cards = [
    {
      title: "إجمالي التحليلات",
      value: stats.totalItems,
      label: "عنصر تم فرزه",
      icon: <BarChart3 className="text-blue-500" size={24} />,
      color: "from-blue-50 to-white"
    },
    {
      title: "نسبة الدقة",
      value: `${stats.accuracy}%`,
      label: "دقة نموذج الـ AI",
      icon: <Target className="text-secondary" size={24} />,
      color: "from-emerald-50 to-white"
    },
    {
      title: "الأثر البيئي",
      value: `${stats.totalImpact.toFixed(1)}`,
      label: "كجم من CO₂ تم توفيره",
      icon: <Leaf className="text-cyan-500" size={24} />,
      color: "from-cyan-50 to-white"
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-12">
      {cards.map((card, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className={`glass-card p-8 bg-gradient-to-br ${card.color} border-white/60 relative overflow-hidden group hover:scale-[1.02] transition-all`}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/40 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110" />
          <div className="relative z-10 flex items-start justify-between">
            <div className="space-y-4">
              <span className="text-sm font-bold text-slate-400 block">{card.title}</span>
              <div className="space-y-1">
                <h4 className="text-4xl font-black text-slate-900">{card.value}</h4>
                <p className="text-xs font-bold text-slate-500">{card.label}</p>
              </div>
            </div>
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
              {card.icon}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsSection;
