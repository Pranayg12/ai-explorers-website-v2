import React from 'react';
import { AnimatedCounter } from './AnimatedCounter';
import { STATISTICS } from '../data/mockData';
import { FolderCheck, Cpu, Sparkles, UserCheck } from 'lucide-react';

interface StatisticsSectionProps {
  isDarkMode: boolean;
}

export const StatisticsSection: React.FC<StatisticsSectionProps> = ({ isDarkMode }) => {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0: return <FolderCheck className="w-6 h-6 text-blue-500" />;
      case 1: return <Cpu className="w-6 h-6 text-purple-500" />;
      case 2: return <Sparkles className="w-6 h-6 text-pink-500" />;
      case 3: return <UserCheck className="w-6 h-6 text-teal-500" />;
      default: return <Sparkles className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <section className={`py-16 border-y transition-colors duration-300 relative z-10 ${
      isDarkMode 
        ? 'bg-slate-900/60 border-slate-800' 
        : 'bg-gradient-to-r from-blue-50/50 via-indigo-50/30 to-purple-50/50 border-slate-200/80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Impact
          </h2>
          <p className={`text-sm sm:text-base ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Tangible outcomes from our interactive workshops and summer cohorts.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {STATISTICS.map((stat, idx) => (
            <div 
              key={idx}
              className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-slate-900/80 border-slate-800 shadow-md shadow-black/20' 
                  : 'bg-white/80 border-slate-200/80 shadow-md shadow-slate-100'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800">
                  {getIcon(idx)}
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  Proven
                </span>
              </div>

              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                <AnimatedCounter targetValue={stat.value} suffix={stat.suffix} />
              </div>

              <h3 className={`text-sm sm:text-base font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {stat.label}
              </h3>

              <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
