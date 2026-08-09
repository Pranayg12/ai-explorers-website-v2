import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Quote } from 'lucide-react';

interface ParentSectionProps {
  isDarkMode: boolean;
}

export const ParentSection: React.FC<ParentSectionProps> = ({ isDarkMode }) => {
  return (
    <section className={`py-16 transition-colors duration-300 relative ${
      isDarkMode ? 'bg-slate-900/50 text-white' : 'bg-gradient-to-b from-slate-50 to-blue-50/40 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Parent Testimony
          </h2>
          <p className={`text-sm sm:text-base ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Hear directly from families whose children attended our camps and creator labs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className={`p-8 rounded-3xl border flex flex-col justify-between transition-all duration-300 ${
                isDarkMode
                  ? 'bg-slate-900/90 border-slate-800'
                  : 'bg-white border-slate-200/80 shadow-lg shadow-slate-100'
              }`}
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-blue-500/20" />

                <p className={`text-sm italic leading-relaxed ${
                  isDarkMode ? 'text-slate-200' : 'text-slate-700'
                }`}>
                  "{test.quote}"
                </p>
              </div>

              {/* Author Metadata */}
              <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${test.avatarBg} text-white font-bold flex items-center justify-center text-sm shadow-md`}>
                  {test.parentName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm">
                    {test.parentName}
                  </h4>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {test.studentDetail}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

