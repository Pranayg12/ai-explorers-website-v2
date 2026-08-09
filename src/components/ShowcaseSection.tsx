import React, { useState } from 'react';
import { STUDENT_PROJECTS } from '../data/mockData';
import { StudentProject } from '../types';
import { ProjectModal } from './ProjectModal';
import { Sparkles, Eye, Filter } from 'lucide-react';

interface ShowcaseSectionProps {
  isDarkMode: boolean;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ isDarkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<StudentProject | null>(null);

  const categories = ['All', 'Animation', 'Games', 'Music', 'Coding'];

  const filteredProjects = selectedCategory === 'All'
    ? STUDENT_PROJECTS
    : STUDENT_PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <section className={`py-20 transition-colors duration-300 relative ${
      isDarkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Showcase Gallery
            </span>
          </h2>
          <p className={`text-base sm:text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Explore original animations, games, audio tracks, and interactive tools built by our middle school explorers during AI Explorers programs.
          </p>
        </div>

        {/* Filter Category Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 scale-105'
                    : isDarkMode
                      ? 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
                      : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                }`}
              >
                {cat === 'All' && <Filter className="w-3.5 h-3.5" />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setActiveProject(proj)}
              className={`rounded-3xl border overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group flex flex-col justify-between ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:shadow-purple-950/20'
                  : 'bg-slate-50/80 border-slate-200 hover:bg-white hover:border-slate-300 hover:shadow-slate-200/60'
              }`}
            >
              <div>
                {/* Clean Category & Status Header Bar */}
                <div className={`p-5 pb-0 flex items-center justify-between`}>
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold ${proj.badgeColor}`}>
                    {proj.category}
                  </span>
                  {proj.featured && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-900 flex items-center gap-1 shadow-sm">
                      <Sparkles className="w-3 h-3" /> Featured
                    </span>
                  )}
                </div>

                {/* Card Info */}
                <div className="p-6 pt-4 space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <span>{proj.studentName || 'Created by a student'}</span>
                    <span className="text-blue-500 font-semibold">AI Explorers Creation</span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight group-hover:text-blue-500 transition-colors">
                    {proj.title}
                  </h3>

                  <p className={`text-xs sm:text-sm line-clamp-2 leading-relaxed ${
                    isDarkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {proj.description}
                  </p>

                  {/* Tools used */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.tools.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                </div>
              </div>

              {/* Bottom inspect button */}
              <div className="p-6 pt-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveProject(proj);
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 border ${
                    isDarkMode
                      ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                      : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-100 shadow-sm'
                  }`}
                >
                  <Eye className="w-4 h-4 text-blue-500" />
                  <span>View Full Showcase Details</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Modal */}
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          isDarkMode={isDarkMode}
        />

      </div>
    </section>
  );
};
