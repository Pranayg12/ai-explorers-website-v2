import React from 'react';
import { StudentProject } from '../types';
import { X, Sparkles, User, Award, Code, CheckCircle2, Quote } from 'lucide-react';

interface ProjectModalProps {
  project: StudentProject | null;
  onClose: () => void;
  isDarkMode: boolean;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, isDarkMode }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden max-h-[90vh] flex flex-col ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${project.badgeColor}`}>
                {project.category}
              </span>
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight">
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-full border transition-colors ${
              isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Project Summary Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-purple-900/40 border border-indigo-500/20 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-mono border border-indigo-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                {project.studentGrade === 'Class Project' || project.studentName === 'Created as a class' ? 'Class AI Project' : 'Student AI Project'}
              </span>
              <span className="text-xs font-medium text-slate-400">
                Tools: <span className="text-indigo-300 font-mono">{project.tools.join(', ')}</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              {project.description}
            </p>
          </div>

          {/* Student Meta Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
              isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-500">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs opacity-60">Creator</p>
                <p className="font-bold text-sm">{project.studentName || "Created by a student"}</p>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
              isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-500">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs opacity-60">Category</p>
                <p className="font-bold text-sm">{project.category}</p>
              </div>
            </div>
          </div>

          {/* Full Content Breakdown */}
          {project.fullContent && (
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              
              {project.fullContent.promptUsed && (
                <div className={`p-4 rounded-2xl border font-mono text-xs space-y-1 ${
                  isDarkMode ? 'bg-slate-950 border-slate-800 text-blue-300' : 'bg-slate-900 text-blue-200'
                }`}>
                  <span className="text-[10px] text-amber-400 font-bold uppercase block">PROMPT USED BY STUDENT:</span>
                  <p>"{project.fullContent.promptUsed}"</p>
                </div>
              )}

              {project.fullContent.keyFeatures && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider mb-2 opacity-70">
                    Key Features Built:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.fullContent.keyFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.fullContent.teacherNotes && (
                <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
                  isDarkMode ? 'bg-indigo-950/40 border-indigo-900 text-indigo-200' : 'bg-indigo-50 border-indigo-200 text-indigo-900'
                }`}>
                  <Quote className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-bold uppercase block text-indigo-500">INSTRUCTOR NOTE (AMEYA & PRANAY):</span>
                    <p className="text-xs italic mt-0.5">{project.fullContent.teacherNotes}</p>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Tools Used Pills */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-2 opacity-70 flex items-center gap-1.5">
              <Code className="w-4 h-4 text-blue-500" />
              AI Tools Employed:
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl text-xs font-mono font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md"
          >
            Close Preview
          </button>
        </div>

      </div>
    </div>
  );
};
