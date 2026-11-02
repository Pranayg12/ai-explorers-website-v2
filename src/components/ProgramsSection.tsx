import React from 'react';
import { PROGRAMS } from '../data/mockData';
import { Sun, Calendar, Building2, CheckCircle2, Clock, Users } from 'lucide-react';

interface ProgramsSectionProps {
  isDarkMode: boolean;
  onSelectProgram?: (programId: string) => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ isDarkMode }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun': return <Sun className="w-7 h-7 text-white" />;
      case 'Calendar': return <Calendar className="w-7 h-7 text-white" />;
      case 'Building2': return <Building2 className="w-7 h-7 text-white" />;
      default: return <Sun className="w-7 h-7 text-white" />;
    }
  };

  return (
    <section className={`py-20 transition-colors duration-300 relative ${
      isDarkMode ? 'bg-slate-900/40 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Our Learning{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Programs
            </span>
          </h2>
          <p className={`text-base sm:text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Designed for rising middle schoolers to explore generative models, coding logic, and digital media in small collaborative cohorts.
          </p>
        </div>

        {/* Programs Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {PROGRAMS.map((prog) => (
            <div
              key={prog.id}
              className={`rounded-3xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl overflow-hidden group ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  : 'bg-white border-slate-200 shadow-lg shadow-slate-100 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Header Banner */}
                <div className={`p-8 bg-gradient-to-r ${prog.gradient} text-white relative overflow-hidden`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-md">
                      {getIcon(prog.iconName)}
                    </div>
                    {prog.badge ? (
                      <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-white text-slate-900 shadow-sm">
                        {prog.badge}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="text-2xl font-extrabold tracking-tight mb-1">
                    {prog.title}
                  </h3>
                  <p className="text-xs font-medium text-white/80">
                    {prog.subtitle}
                  </p>
                </div>

                {/* Content Body */}
                <div className="p-8 space-y-6">
                  <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {prog.description}
                  </p>

                  {/* Program Metadata Pills */}
                  <div className={`p-4 rounded-2xl border space-y-2.5 text-xs font-medium ${
                    isDarkMode ? 'bg-slate-800/60 border-slate-700/60 text-slate-300' : 'bg-slate-50 border-slate-200/80 text-slate-700'
                  }`}>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-blue-500 shrink-0" />
                      <span><strong>Duration:</strong> {prog.duration}</span>
                    </div>
                    {prog.schedule ? (
                      <div className="flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 text-purple-500 shrink-0" />
                        <span><strong>Schedule:</strong> {prog.schedule}</span>
                      </div>
                    ) : null}
                    <div className="flex items-center gap-2.5">
                      <Users className="w-4 h-4 text-teal-500 shrink-0" />
                      <span><strong>Target:</strong> {prog.targetAudience}</span>
                    </div>
                  </div>

                  {/* Syllabus Highlights List */}
                  {prog.highlights && prog.highlights.length > 0 && (
                    <div className="space-y-2.5 pt-2">
                      <p className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Program Highlights:
                      </p>
                      {prog.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
