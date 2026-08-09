import React from 'react';
import { Sparkles, Cpu, Palette } from 'lucide-react';

export const FloatingAIGraphics: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      
      {/* Radial Gradient Glows */}
      <div className={`absolute top-10 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 ${
        isDarkMode ? 'bg-blue-600' : 'bg-blue-400'
      } animate-pulse`} style={{ animationDuration: '6s' }} />

      <div className={`absolute top-40 right-10 w-80 h-80 rounded-full blur-3xl opacity-20 ${
        isDarkMode ? 'bg-purple-600' : 'bg-purple-400'
      } animate-pulse`} style={{ animationDuration: '8s' }} />

      <div className={`absolute bottom-10 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-15 ${
        isDarkMode ? 'bg-teal-500' : 'bg-teal-300'
      }`} />

      {/* Scattered Ambient Icons */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-blue-500/30 dark:text-blue-400/20 animate-spin" style={{ animationDuration: '25s' }}>
        <Sparkles className="w-12 h-12" />
      </div>

      <div className="absolute top-24 right-1/3 text-purple-500/20 dark:text-purple-400/20">
        <Palette className="w-8 h-8" />
      </div>

      <div className="absolute bottom-1/4 right-1/4 text-teal-500/30 dark:text-teal-400/20">
        <Cpu className="w-10 h-10" />
      </div>

    </div>
  );
};

