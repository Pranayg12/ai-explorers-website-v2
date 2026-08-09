import React from 'react';
import { WHY_US_FEATURES } from '../data/mockData';
import { Palette, Rocket, ShieldCheck, Users, Cpu, Sparkles } from 'lucide-react';

interface WhyUsSectionProps {
  isDarkMode: boolean;
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({ isDarkMode }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Palette': return <Palette className="w-6 h-6 text-white" />;
      case 'Rocket': return <Rocket className="w-6 h-6 text-white" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-white" />;
      case 'Users': return <Users className="w-6 h-6 text-white" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-white" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-white" />;
      default: return <Sparkles className="w-6 h-6 text-white" />;
    }
  };

  return (
    <section className={`py-20 transition-colors duration-300 relative ${
      isDarkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Explorers?
            </span>
          </h2>
          <p className={`text-base sm:text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            We bridge the gap between curiosity and computational mastery with age-appropriate tools, ethical boundaries, and student-to-student mentorship.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_US_FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl group relative overflow-hidden ${
                isDarkMode
                  ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:shadow-blue-900/10'
                  : 'bg-slate-50/80 border-slate-200/80 hover:bg-white hover:border-slate-300 hover:shadow-slate-200/50'
              }`}
            >
              {/* Corner Ambient Glow */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${feature.color} opacity-10 rounded-bl-full group-hover:scale-125 transition-transform duration-500`} />

              {/* Icon Circle */}
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${feature.color} flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {getIcon(feature.icon)}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3 tracking-tight">
                {feature.title}
              </h3>

              {/* Description */}
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {feature.desc}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
