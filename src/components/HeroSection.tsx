import React from 'react';
import { PageTab } from '../types';
import { FloatingAIGraphics } from './FloatingAIGraphics';
import { 
  ArrowRight, 
  Sparkles, 
  Code, 
  Music, 
  Palette, 
  Gamepad2, 
  Video, 
  Users, 
  ShieldCheck, 
  Award 
} from 'lucide-react';

interface HeroSectionProps {
  setActiveTab: (tab: PageTab) => void;
  isDarkMode: boolean;
  onJoinClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  setActiveTab,
  isDarkMode,
  onJoinClick
}) => {
  return (
    <section className={`relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Background Floating Graphics */}
      <FloatingAIGraphics isDarkMode={isDarkMode} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          
          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.2]">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                AI Explorers + Suvidha International
              </span>
            </h1>
          </div>

          {/* Subheadline */}
          <p className={`text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto font-normal ${
            isDarkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            AI Explorers teaches middle school students how to create <span className="font-semibold text-blue-500">animations</span>, <span className="font-semibold text-purple-500">games</span>, <span className="font-semibold text-pink-500">music</span>, <span className="font-semibold text-indigo-500">videos</span>, <span className="font-semibold text-teal-500">coding projects</span>, and <span className="font-semibold text-amber-500">avatars</span> using today's most exciting AI tools in a safe, creative, and collaborative environment.
          </p>

          {/* Call To Action Buttons */}
          <div className="flex items-center justify-center pt-2">
            <a
              href="https://forms.gle/L2bLtb6KMcynLJZf8"
              target="_blank"
              rel="noopener noreferrer"
              id="hero-enroll-now-btn"
              className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-base sm:text-lg shadow-xl shadow-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/40 transition-all duration-300 flex items-center justify-center gap-3 transform active:scale-95 group hover:-translate-y-0.5"
            >
              <Sparkles className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
              <span>Enroll Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </a>
          </div>

          {/* Trust Markers */}
          <div className="pt-6 border-t border-slate-200/20 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-center">
            <div className="flex items-center justify-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>100% Student-Led</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-500" />
              <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Kid-Safe Tools</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Award className="w-4 h-4 text-purple-500" />
              <span className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Zero Coding Req.</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
