import React, { useState } from 'react';
import { STUDENT_PROJECTS } from '../data/mockData';
import { StudentProject } from '../types';
import { ProjectModal } from './ProjectModal';
import { Sparkles, Eye, Filter, Music, ExternalLink, AlertCircle, Play, Gamepad2, Video } from 'lucide-react';

interface ShowcaseSectionProps {
  isDarkMode: boolean;
  onLaunchGame?: (gameId: string) => void;
  onLaunchEditor?: () => void;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ isDarkMode, onLaunchGame, onLaunchEditor }) => {
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
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${proj.badgeColor}`}>
                      {proj.category}
                    </span>
                    {proj.audioUrl && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">
                        <Music className="w-3 h-3" /> Audio Track
                      </span>
                    )}
                    {proj.youtubeUrl && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 flex items-center gap-1">
                        <Play className="w-3 h-3 fill-current text-red-500" /> YouTube Video
                      </span>
                    )}
                    {(proj.isInteractiveGame || proj.id === 'proj-2') && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <Gamepad2 className="w-3 h-3" /> Playable Game
                      </span>
                    )}
                    {!proj.showcaseAvailable && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300/60 dark:border-slate-700 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-slate-400" /> Showcase not available
                      </span>
                    )}
                  </div>
                  {proj.featured && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-900 flex items-center gap-1 shadow-sm">
                      <Sparkles className="w-3 h-3" /> Featured
                    </span>
                  )}
                </div>

                {/* Card Visual Display */}
                {proj.thumbnailUrl ? (
                  <div className="px-6 pt-3">
                    <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950/80 shadow-sm">
                      <img
                        src={proj.thumbnailUrl}
                        alt={`${proj.title} display`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {proj.audioUrl && (
                        <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/80 text-amber-300 text-[10px] font-bold backdrop-blur-sm flex items-center gap-1.5 shadow border border-amber-500/30">
                          <Music className="w-3 h-3 text-amber-400" /> Playable Track
                        </div>
                      )}
                      {proj.liveUrl && (
                        <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/85 text-cyan-300 text-[10px] font-bold backdrop-blur-sm flex items-center gap-1.5 shadow border border-cyan-500/40">
                          <ExternalLink className="w-3 h-3 text-cyan-400" /> Live Web App
                        </div>
                      )}
                      {proj.youtubeUrl && (
                        <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/85 text-red-300 text-[10px] font-bold backdrop-blur-sm flex items-center gap-1.5 shadow border border-red-500/40">
                          <Play className="w-3 h-3 text-red-500 fill-current" /> YouTube Video
                        </div>
                      )}
                      {(proj.isInteractiveGame || proj.id === 'proj-2') && (
                        <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/85 text-emerald-300 text-[10px] font-bold backdrop-blur-sm flex items-center gap-1.5 shadow border border-emerald-500/40">
                          <Gamepad2 className="w-3.5 h-3.5 text-emerald-400" /> Playable 2D Game
                        </div>
                      )}
                      {(proj.isInteractiveEditor || proj.id === 'proj-6') && (
                        <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/85 text-cyan-300 text-[10px] font-bold backdrop-blur-sm flex items-center gap-1.5 shadow border border-cyan-500/40">
                          <Video className="w-3.5 h-3.5 text-cyan-400" /> Interactive Video Editor
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="px-6 pt-3">
                    <div className={`relative w-full h-44 rounded-2xl border flex flex-col items-center justify-center text-center p-4 transition-colors ${
                      isDarkMode 
                        ? 'bg-slate-800/40 border-slate-800 text-slate-400' 
                        : 'bg-slate-100/70 border-slate-200 text-slate-500'
                    }`}>
                      <div className="w-12 h-12 rounded-2xl bg-slate-200/70 dark:bg-slate-800 flex items-center justify-center mb-2.5">
                        <AlertCircle className="w-6 h-6 text-slate-400" />
                      </div>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Showcase not available
                      </span>
                      <span className="text-[11px] opacity-70 mt-1">
                        Interactive live preview unavailable
                      </span>
                    </div>
                  </div>
                )}

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

              {/* Bottom action buttons */}
              <div className="p-6 pt-0 space-y-2.5">
                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-black tracking-wide uppercase transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:via-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <span>GO TRY</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {proj.youtubeUrl && (
                  <a
                    href={proj.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-black tracking-wide uppercase transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:to-rose-500 text-white shadow-md shadow-red-500/25 hover:shadow-red-500/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Watch on YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {(proj.isInteractiveGame || proj.id === 'proj-2') && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onLaunchGame?.('mario');
                    }}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-black tracking-wide uppercase transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 hover:from-red-500 hover:via-amber-400 hover:to-emerald-500 text-white shadow-md shadow-red-500/25 hover:shadow-red-500/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <Gamepad2 className="w-4 h-4" />
                    <span>PLAY SUPER MARIO 2D</span>
                  </button>
                )}
                {(proj.isInteractiveEditor || proj.id === 'proj-6') && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onLaunchEditor?.();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-black tracking-wide uppercase transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:via-blue-500 hover:to-indigo-500 text-white shadow-md shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <Video className="w-4 h-4" />
                    <span>LAUNCH VIDEO EDITOR</span>
                  </button>
                )}
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
                  <span>{proj.showcaseAvailable ? 'View Full Showcase Details' : 'Showcase Not Available • View Details'}</span>
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
          onLaunchGame={onLaunchGame}
          onLaunchEditor={onLaunchEditor}
        />

      </div>
    </section>
  );
};
