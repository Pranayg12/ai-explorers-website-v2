import React, { useRef } from 'react';
import { StudentProject } from '../types';
import { X, Sparkles, User, Award, Code, CheckCircle2, Quote, Music, Radio, Volume2, AlertCircle, ExternalLink, Play, Gamepad2, Video } from 'lucide-react';
import realizationScreenshotImg from '../assets/images/realization_screenshot.png';

function getYouTubeId(url?: string): string {
  if (!url) return '';
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : '';
}

interface ProjectModalProps {
  project: StudentProject | null;
  onClose: () => void;
  isDarkMode: boolean;
  onLaunchGame?: (gameId: string) => void;
  onLaunchEditor?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, isDarkMode, onLaunchGame, onLaunchEditor }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!project) return null;

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    onClose();
  };

  const hasAudioTrack = Boolean(
    project.audioUrl || 
    project.id === 'proj-3' || 
    project.id === 'proj-10' || 
    project.title.toLowerCase().trim() === 'realization' ||
    project.title.toLowerCase().trim() === 'ghost town'
  );

  const isMarioGame = Boolean(
    project.isInteractiveGame || 
    project.id === 'proj-2' || 
    project.title.toLowerCase().includes('mario')
  );

  const isVideoEditor = Boolean(
    project.isInteractiveEditor || 
    project.id === 'proj-6' || 
    project.title.toLowerCase().includes('video editor')
  );

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
              {isMarioGame && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <Gamepad2 className="w-3.5 h-3.5" /> Playable Game
                </span>
              )}
              {isVideoEditor && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 flex items-center gap-1">
                  <Video className="w-3.5 h-3.5" /> Interactive Editor
                </span>
              )}
              {!project.showcaseAvailable && !isMarioGame && !isVideoEditor && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300/60 dark:border-slate-700 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-slate-400" /> Showcase not available
                </span>
              )}
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight">
              {project.title}
            </h3>
          </div>

          <button
            onClick={handleClose}
            className={`p-2 rounded-full border transition-colors ${
              isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Project Cover Picture Preview (if available and not an audio track or live app that has dedicated media showcase) */}
          {project.thumbnailUrl && !hasAudioTrack && !project.liveUrl && (
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 shadow-md flex items-center justify-center p-2">
              <img
                src={project.thumbnailUrl}
                alt={`${project.title} cover`}
                referrerPolicy="no-referrer"
                className="max-h-56 sm:max-h-64 w-auto rounded-xl object-contain mx-auto shadow"
              />
            </div>
          )}

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

          {/* Showcase Section (Playable audio vs Live Web App vs Showcase Not Available) */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider opacity-75 flex items-center gap-1.5">
                {hasAudioTrack ? (
                  <Volume2 className="w-4 h-4 text-amber-500" />
                ) : project.liveUrl ? (
                  <ExternalLink className="w-4 h-4 text-cyan-500" />
                ) : (
                  <Radio className="w-4 h-4 text-slate-400" />
                )}
                Project Showcase Media:
              </h4>
              {hasAudioTrack ? (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available to Play
                </span>
              ) : project.liveUrl ? (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                  Live Web Application Ready
                </span>
              ) : project.youtubeUrl ? (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  YouTube Video
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300/60 dark:border-slate-700">
                  Showcase not available
                </span>
              )}
            </div>

            {hasAudioTrack ? (
              <div className={`p-5 rounded-2xl border transition-all ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-amber-950/30 via-slate-800/80 to-slate-900 border-amber-800/40 shadow-lg' 
                  : 'bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-white border-amber-200/90 shadow-md shadow-amber-100/50'
              }`}>
                {/* Visual Display / Cover of the Song */}
                <div className="mb-4 rounded-xl overflow-hidden border border-amber-300/40 dark:border-amber-700/50 shadow-sm bg-slate-950">
                  <img
                    src={project.thumbnailUrl || realizationScreenshotImg}
                    alt={`${project.title} Display`}
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={project.thumbnailUrl || realizationScreenshotImg} 
                    alt={`${project.title} Icon`} 
                    className="w-14 h-14 rounded-xl object-cover border border-amber-400/50 shadow-md shrink-0 bg-slate-950" 
                  />
                  <div className="min-w-0 flex-1">
                    <h5 className="font-extrabold text-base tracking-tight truncate">
                      {project.title}
                    </h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {project.studentName || "Class Project"} • AI Explorers Music Workshop
                    </p>
                  </div>
                </div>

                <div className="bg-white/90 dark:bg-slate-950/90 rounded-xl p-3 border border-amber-200/60 dark:border-slate-800/80 shadow-inner">
                  <audio 
                    ref={audioRef}
                    controls 
                    className="w-full h-10 outline-none" 
                    src={
                      project.audioUrl || 
                      (project.title.toLowerCase().includes('ghost') 
                        ? '/Laughing_in_the_Light.m4a' 
                        : '/Realization.m4a')
                    }
                    preload="metadata"
                  >
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            ) : project.liveUrl ? (
              <div className={`p-5 rounded-2xl border transition-all ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-cyan-950/30 via-slate-800/80 to-slate-900 border-cyan-800/40 shadow-lg' 
                  : 'bg-gradient-to-br from-cyan-50/90 via-blue-50/40 to-white border-cyan-200/90 shadow-md shadow-cyan-100/50'
              }`}>
                {/* Visual Screenshot of the Live Application */}
                {project.thumbnailUrl && (
                  <div className="mb-4 rounded-xl overflow-hidden border border-cyan-300/40 dark:border-cyan-700/50 shadow-sm bg-slate-950">
                    <img
                      src={project.thumbnailUrl}
                      alt={`${project.title} Screenshot`}
                      className="w-full h-56 sm:h-72 object-cover object-top"
                    />
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h5 className="font-extrabold text-base tracking-tight truncate flex items-center gap-2">
                      <span>{project.title}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-600 dark:text-cyan-400">
                        Interactive Live App
                      </span>
                    </h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {project.studentName || "Student Creator"} • AI Explorers Coding Capstone
                    </p>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 hover:underline block truncate mt-1 font-medium"
                    >
                      {project.liveUrl}
                    </a>
                  </div>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:via-blue-500 hover:to-indigo-500 text-white font-black text-xs tracking-wider uppercase shadow-md shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all flex items-center gap-2 shrink-0 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <span>GO TRY</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ) : project.youtubeUrl ? (
              <div className={`p-5 rounded-2xl border transition-all ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-red-950/30 via-slate-800/80 to-slate-900 border-red-800/40 shadow-lg' 
                  : 'bg-gradient-to-br from-red-50/90 via-rose-50/40 to-white border-red-200/90 shadow-md shadow-red-100/50'
              }`}>
                {/* Embedded Video or YouTube Preview Frame */}
                <div className="mb-4 rounded-xl overflow-hidden border border-red-300/40 dark:border-red-700/50 shadow-sm bg-black aspect-video relative">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(project.youtubeUrl)}?rel=0`}
                    title={project.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h5 className="font-extrabold text-base tracking-tight truncate flex items-center gap-2">
                      <span>{project.title}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-500/20 text-red-600 dark:text-red-400">
                        Animation Short Film
                      </span>
                    </h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {project.studentName || "Created as a class"} • AI Explorers Animation Workshop
                    </p>
                    <a
                      href={project.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono text-red-600 dark:text-red-400 hover:underline block truncate mt-1 font-medium"
                    >
                      {project.youtubeUrl}
                    </a>
                  </div>

                  <a
                    href={project.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs tracking-wider uppercase shadow-md shadow-red-500/25 hover:shadow-red-500/40 transition-all flex items-center gap-2 shrink-0 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Watch on YouTube</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ) : isMarioGame ? (
              <div className={`p-6 rounded-2xl border transition-all ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-red-950/40 via-amber-950/20 to-slate-900 border-amber-600/40 shadow-xl' 
                  : 'bg-gradient-to-br from-red-50 via-amber-50/60 to-white border-amber-300 shadow-lg shadow-amber-100/50'
              }`}>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-red-500/30 shrink-0">
                      <Gamepad2 className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-black text-lg tracking-tight">Super Mario 2D</h5>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 animate-pulse">
                          PLAYABLE GAME
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-md">
                        Interactive 2D platformer! Choose from 6 characters (Mario, Luigi, Toad, Peach, Yoshi, Wario), collect coins and green stars, dodge Goombas, and defeat Bowser!
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleClose();
                      onLaunchGame?.('mario');
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 hover:from-red-500 hover:via-amber-400 hover:to-emerald-500 text-white font-black text-xs tracking-wider uppercase shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all flex items-center justify-center gap-2.5 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shrink-0"
                  >
                    <Gamepad2 className="w-4 h-4" />
                    <span>LAUNCH & PLAY GAME</span>
                  </button>
                </div>
              </div>
            ) : isVideoEditor ? (
              <div className={`p-6 rounded-2xl border transition-all ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-cyan-950/40 via-blue-950/20 to-slate-900 border-cyan-600/40 shadow-xl' 
                  : 'bg-gradient-to-br from-cyan-50 via-blue-50/60 to-white border-cyan-300 shadow-lg shadow-cyan-100/50'
              }`}>
                {project.thumbnailUrl && (
                  <div className="mb-4 rounded-xl overflow-hidden border border-cyan-300/40 dark:border-cyan-700/50 shadow-sm bg-slate-950">
                    <img
                      src={project.thumbnailUrl}
                      alt={`${project.title} Screenshot`}
                      className="w-full h-56 sm:h-72 object-cover object-top"
                    />
                  </div>
                )}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/30 shrink-0">
                      <Video className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-black text-lg tracking-tight">Online Video Editor</h5>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 animate-pulse">
                          INTERACTIVE APP
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-md">
                        Full browser-based video editing workstation! Multi-track timeline, video & audio clips, subtitle styling, procedural synthesizer, and WebM video export.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleClose();
                      onLaunchEditor?.();
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:via-blue-500 hover:to-indigo-500 text-white font-black text-xs tracking-wider uppercase shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2.5 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shrink-0"
                  >
                    <Video className="w-4 h-4" />
                    <span>LAUNCH VIDEO EDITOR</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className={`p-6 rounded-2xl border flex flex-col items-center justify-center text-center transition-all ${
                isDarkMode 
                  ? 'bg-slate-800/30 border-slate-800/80 text-slate-400' 
                  : 'bg-slate-50/80 border-slate-200 text-slate-500'
              }`}>
                <div className="w-12 h-12 rounded-2xl bg-slate-200/60 dark:bg-slate-800/80 flex items-center justify-center mb-2.5">
                  <AlertCircle className="w-6 h-6 text-slate-400 dark:text-slate-500" />
                </div>
                <h5 className="font-bold text-sm text-slate-700 dark:text-slate-300">
                  Showcase not available
                </h5>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
                  Interactive live preview is currently unavailable for this student project.
                </p>
              </div>
            )}
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
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 flex items-center justify-between gap-3">
          {isVideoEditor ? (
            <button
              onClick={() => {
                handleClose();
                onLaunchEditor?.();
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:via-blue-500 hover:to-indigo-500 text-white font-black text-sm tracking-wide shadow-md shadow-cyan-500/25 flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              <Video className="w-4 h-4" />
              <span>LAUNCH VIDEO EDITOR</span>
            </button>
          ) : project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:via-blue-500 hover:to-indigo-500 text-white font-black text-sm tracking-wide shadow-md shadow-blue-500/25 flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              <span>GO TRY</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : project.youtubeUrl ? (
            <a
              href={project.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm tracking-wide shadow-md shadow-red-500/25 flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Watch on YouTube</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : !project.showcaseAvailable ? (
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200/60 dark:bg-slate-800/60 border border-slate-300/40 dark:border-slate-700/50">
              <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
              Showcase not available
            </span>
          ) : <div />}
          <button
            onClick={handleClose}
            className="px-6 py-2.5 rounded-xl bg-slate-600 hover:bg-slate-500 text-white font-bold text-sm shadow-md transition-colors"
          >
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
};
