import React, { useState } from 'react';
import { PROGRAMS } from '../data/mockData';
import { Sun, Calendar, Building2, Video, CheckCircle2, Clock, Users, ExternalLink, QrCode, Copy, Check, Play, Lock } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface ProgramsSectionProps {
  isDarkMode: boolean;
  onSelectProgram?: (programId: string) => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ isDarkMode }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun': return <Sun className="w-7 h-7 text-white" />;
      case 'Calendar': return <Calendar className="w-7 h-7 text-white" />;
      case 'Building2': return <Building2 className="w-7 h-7 text-white" />;
      case 'Video': return <Video className="w-7 h-7 text-white" />;
      default: return <Sun className="w-7 h-7 text-white" />;
    }
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PROGRAMS.map((prog) => (
            <div
              key={prog.id}
              className={`rounded-3xl border flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden group ${
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
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-white text-slate-900 shadow-sm">
                      {prog.badge}
                    </span>
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
                  <div className={`p-4 rounded-2xl border space-y-2 text-xs font-medium ${
                    isDarkMode ? 'bg-slate-800/60 border-slate-700/60 text-slate-300' : 'bg-slate-50 border-slate-200/80 text-slate-700'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span><strong>Duration:</strong> {prog.duration}</span>
                    </div>
                    {prog.schedule ? (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        <span><strong>Schedule:</strong> {prog.schedule}</span>
                      </div>
                    ) : null}
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-teal-500" />
                      <span><strong>Target:</strong> {prog.targetAudience}</span>
                    </div>
                  </div>

                  {/* Syllabus Highlights List */}
                  {prog.highlights && prog.highlights.length > 0 && (
                    <div className="space-y-2.5">
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

                  {/* Video Items Section for Online Masterclasses */}
                  {prog.videoItems && prog.videoItems.length > 0 && (
                    <div className="space-y-6 pt-1">
                      {prog.videoItems.map((vItem) => (
                        <div key={vItem.id} className="space-y-2.5">
                          {/* Header and status badge */}
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                              {vItem.header}
                            </span>
                            {vItem.status === 'available' ? (
                              <span className="text-[11px] font-semibold text-red-500 dark:text-red-400 flex items-center gap-1">
                                <Play className="w-3 h-3 fill-current" /> Video Recording
                              </span>
                            ) : (
                              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                <Lock className="w-3 h-3 text-slate-400" /> Coming Soon
                              </span>
                            )}
                          </div>

                          {/* Video Banner Thumbnail */}
                          {vItem.status === 'available' && vItem.videoUrl ? (
                            <a
                              href={vItem.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="relative block group/video rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700/80 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500"
                              title={`Watch ${vItem.header} on YouTube`}
                            >
                              <div className="relative w-full aspect-[16/9] bg-slate-950 overflow-hidden flex items-center justify-center">
                                <img
                                  src={vItem.thumbnailUrl}
                                  alt={vItem.header}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover group-hover/video:scale-105 transition-transform duration-300"
                                  onError={(e) => {
                                    if (vItem.videoUrl && !e.currentTarget.dataset.fallback) {
                                      e.currentTarget.dataset.fallback = "true";
                                      e.currentTarget.src = "https://img.youtube.com/vi/heaTgXNPrdA/maxresdefault.jpg";
                                    }
                                  }}
                                />
                                {/* Play overlay */}
                                <div className="absolute inset-0 bg-black/25 group-hover/video:bg-black/10 transition-colors flex items-center justify-center">
                                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-red-600/95 text-white flex items-center justify-center shadow-lg group-hover/video:scale-110 group-hover/video:bg-red-500 transition-all duration-300">
                                    <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
                                  </div>
                                </div>
                                <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded bg-black/80 text-white text-[9px] font-bold tracking-wide flex items-center gap-1 backdrop-blur-sm">
                                  YouTube
                                </span>
                              </div>
                            </a>
                          ) : (
                            <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700/80 shadow-sm cursor-default select-none group/locked">
                              <div className="relative w-full aspect-[2.4/1] bg-slate-950 overflow-hidden flex items-center justify-center">
                                <img
                                  src={vItem.thumbnailUrl}
                                  alt={vItem.header}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover grayscale-[25%] opacity-85"
                                />
                                {/* Lock overlay */}
                                <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
                                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900/90 text-slate-200 border border-slate-700/90 flex items-center justify-center shadow-md">
                                    <Lock className="w-5 h-5 text-slate-300" />
                                  </div>
                                </div>
                                <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded bg-slate-900/90 text-slate-300 border border-slate-700 text-[9px] font-bold tracking-wide flex items-center gap-1 backdrop-blur-sm">
                                  <Lock className="w-2.5 h-2.5" /> In Production
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Action button corresponding to this video item */}
                          {vItem.status === 'available' && vItem.videoUrl ? (
                            <a
                              href={vItem.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm text-white shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 group text-center ${
                                vItem.actionText === 'GO TRY'
                                  ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:via-blue-500 hover:to-indigo-500'
                                  : 'bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:to-pink-500'
                              }`}
                            >
                              {vItem.actionText !== 'GO TRY' && <Play className="w-3.5 h-3.5 fill-current" />}
                              <span>{vItem.actionText || 'Watch on YouTube'}</span>
                              <ExternalLink className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                          ) : (
                            <button
                              disabled
                              className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 ${
                                isDarkMode
                                  ? 'bg-slate-800/80 text-slate-400 border border-slate-700/80'
                                  : 'bg-slate-200/80 text-slate-500 border border-slate-300/80'
                              }`}
                            >
                              <Lock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                              <span>Coming Soon</span>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* QR Code Section for Programs with Signup Link */}
                  {prog.signupUrl && prog.showQrCode !== false && (
                    <div className={`p-4 rounded-2xl border text-center space-y-3 ${
                      isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-gradient-to-b from-blue-50/50 to-indigo-50/50 border-blue-100'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                          <QrCode className="w-4 h-4" /> Scan QR to Register
                        </span>
                        <button
                          onClick={() => handleCopyLink(prog.signupUrl!)}
                          className="text-[11px] font-medium text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors"
                        >
                          {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                          <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                        </button>
                      </div>

                      <div className="flex justify-center p-3 bg-white rounded-xl shadow-sm border border-slate-200/80 inline-block mx-auto">
                        <QRCodeSVG 
                          value={prog.signupUrl} 
                          size={140}
                          level="H"
                          includeMargin={true}
                        />
                      </div>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Scan with your phone or click the button below to register directly on Google Forms.
                      </p>
                    </div>
                  )}

                </div>
              </div>

              {/* Action Button Footer (for non-videoItems programs) */}
              {!prog.videoItems && (
                <div className="p-8 pt-0 space-y-3">
                  {prog.signupUrl ? (
                    <a
                      href={prog.signupUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-md hover:shadow-xl shadow-indigo-500/25 transition-all duration-300 flex items-center justify-center gap-2 group text-center"
                    >
                      <span>Sign up at {prog.signupUrl}</span>
                      <ExternalLink className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  ) : prog.signupText ? (
                    <div
                      className={`w-full py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm text-center transition-all duration-300 flex items-center justify-center gap-2 leading-snug ${
                        isDarkMode
                          ? 'bg-slate-800/90 text-indigo-300 border border-slate-700/80'
                          : 'bg-indigo-50 text-indigo-900 border border-indigo-200/80 shadow-sm'
                      }`}
                    >
                      <span>{prog.signupText}</span>
                    </div>
                  ) : (
                    <button
                      disabled
                      className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 ${
                        isDarkMode
                          ? 'bg-slate-800/80 text-slate-400 border border-slate-700/80'
                          : 'bg-slate-200/80 text-slate-500 border border-slate-300/80'
                      }`}
                    >
                      <span>Coming Soon</span>
                    </button>
                  )}
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
