import React, { useMemo } from 'react';
import { RESOURCE_ITEMS } from '../data/mockData';
import { 
  Play, 
  ExternalLink, 
  Youtube,
  ArrowUpRight,
  Wrench,
  Video,
  Mic,
  Music,
  Code2,
  Bot,
  FileText,
  Download,
  ShieldCheck,
  Sparkles,
  Users,
  CheckCircle2
} from 'lucide-react';

interface ResourceLibrarySectionProps {
  isDarkMode: boolean;
}

export const ResourceLibrarySection: React.FC<ResourceLibrarySectionProps> = ({ isDarkMode }) => {
  // Find the featured "How to Make AI Animations" tutorial
  const featuredTutorial = useMemo(() => {
    return RESOURCE_ITEMS.find((r) => r.id === 'how-to-make-ai-animations');
  }, []);

  // Filter out the 3 PDF guides
  const pdfGuides = useMemo(() => {
    return RESOURCE_ITEMS.filter((r) => r.format === 'PDF');
  }, []);

  // Filter out the 5 tools
  const tools = useMemo(() => {
    return RESOURCE_ITEMS.filter((r) => r.format === 'Tool');
  }, []);

  const getToolIcon = (id: string) => {
    switch (id) {
      case 'tool-kie-ai':
        return <Video className="w-5 h-5 text-indigo-500" />;
      case 'tool-elevenlabs':
        return <Mic className="w-5 h-5 text-emerald-500" />;
      case 'tool-suno':
        return <Music className="w-5 h-5 text-amber-500" />;
      case 'tool-google-ai-studio':
        return <Code2 className="w-5 h-5 text-blue-500" />;
      case 'tool-heygen':
        return <Bot className="w-5 h-5 text-purple-500" />;
      default:
        return <Wrench className="w-5 h-5 text-blue-500" />;
    }
  };

  const getPdfIcon = (id: string) => {
    switch (id) {
      case 'pdf-ethical-ai-principles':
        return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
      case 'pdf-prompt-cheat-code':
        return <Sparkles className="w-5 h-5 text-indigo-500" />;
      case 'pdf-supporting-ai-explorers':
        return <Users className="w-5 h-5 text-purple-500" />;
      default:
        return <FileText className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <section 
      id="resources"
      className={`py-20 transition-colors duration-300 relative ${
        isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            AI Resource{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Library
            </span>
          </h2>
          <p className={`text-base sm:text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Explore our video tutorial masterclass, official student PDF guides, and recommended AI creation tools.
          </p>
        </div>

        {/* Featured Video Tutorial Spotlight */}
        {featuredTutorial && (
          <div className="mb-14">
            <div className={`rounded-3xl border overflow-hidden p-6 sm:p-8 transition-all duration-300 shadow-xl ${
              isDarkMode 
                ? 'bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border-slate-800 shadow-black/40' 
                : 'bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40 border-slate-200 shadow-slate-200/50'
            }`}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Video Preview / Link to YouTube */}
                <div className="lg:col-span-7">
                  <a
                    href={featuredTutorial.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative rounded-2xl overflow-hidden group shadow-lg border border-slate-200/80 dark:border-slate-800"
                    title="Watch How to Make AI Animations on YouTube"
                  >
                    <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden flex items-center justify-center">
                      {featuredTutorial.thumbnailUrl ? (
                        <img
                          src={featuredTutorial.thumbnailUrl}
                          alt={featuredTutorial.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-red-950 to-slate-950 flex items-center justify-center text-slate-400">
                          <Youtube className="w-16 h-16 text-red-500" />
                        </div>
                      )}

                      {/* Dark gradient overlay */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors duration-300" />

                      {/* Big YouTube Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300">
                          <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1" />
                        </div>
                      </div>

                      {/* YouTube Badge pill */}
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/85 text-white text-xs font-bold flex items-center gap-1.5 backdrop-blur-md">
                        <Youtube className="w-4 h-4 text-red-500" />
                        <span>Watch on YouTube</span>
                      </div>
                    </div>
                  </a>
                </div>

                {/* Video Info & CTA */}
                <div className="lg:col-span-5 space-y-5">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-red-600 text-white shadow-sm flex items-center gap-1.5">
                      <Youtube className="w-3.5 h-3.5" />
                      Featured Tutorial
                    </span>
                    <span className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Free Video Recording
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {featuredTutorial.title}
                  </h3>

                  <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {featuredTutorial.summary}
                  </p>

                  {/* Highlights/Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {featuredTutorial.tags?.map((tag, idx) => (
                      <span 
                        key={idx}
                        className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${
                          isDarkMode 
                            ? 'bg-slate-800/80 border-slate-700 text-slate-300' 
                            : 'bg-white border-slate-200 text-slate-700 shadow-sm'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA Watch Button */}
                  <div className="pt-2">
                    <a
                      href={featuredTutorial.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-bold text-sm shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/35 transition-all duration-300 group transform active:scale-95"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Watch Full Tutorial on YouTube</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* PDF Resources Section Heading */}
        {pdfGuides.length > 0 && (
          <div className="mb-14">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold bg-blue-500/10 text-blue-500 border border-blue-500/20 uppercase tracking-wide">
                    Free Student Handouts
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Official PDF Guides & Learning Handouts
                </h3>
                <p className={`text-xs sm:text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Downloadable reference cheat sheets, ethics guidelines, and facilitation guides for students, parents, and mentors.
                </p>
              </div>
              <span className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {pdfGuides.length} PDF Resources
              </span>
            </div>

            {/* 3 PDF Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pdfGuides.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-2xl border flex flex-col justify-between p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group ${
                    isDarkMode
                      ? 'bg-slate-900 border-slate-800 hover:border-indigo-500/40 hover:shadow-indigo-900/10'
                      : 'bg-white border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-slate-200'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Top Row: Icon & File Metadata */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2.5 rounded-xl border ${
                          isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                        }`}>
                          {getPdfIcon(item.id)}
                        </div>
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20">
                          PDF • {item.fileSize || 'Guide'}
                        </span>
                      </div>

                      {item.badge && (
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          isDarkMode 
                            ? 'bg-indigo-900/40 text-indigo-300 border border-indigo-800/60' 
                            : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <div>
                      <h4 className="text-xl font-bold tracking-tight group-hover:text-indigo-500 transition-colors leading-snug">
                        {item.title}
                      </h4>
                    </div>

                    {/* Summary */}
                    <p className={`text-xs sm:text-sm leading-relaxed ${
                      isDarkMode ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {item.summary}
                    </p>

                    {/* Key Takeaways / Bullet Points Preview */}
                    {item.bulletPoints && item.bulletPoints.length > 0 && (
                      <div className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                        isDarkMode 
                          ? 'bg-slate-950/60 border-slate-800 text-slate-300' 
                          : 'bg-slate-50/80 border-slate-200 text-slate-700'
                      }`}>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                          Key Principles & Takeaways
                        </div>
                        {item.bulletPoints.map((point, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-[11px] leading-tight">
                            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                              isDarkMode 
                                ? 'bg-slate-800 text-slate-400' 
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Dual Action Buttons: View in New Tab & Download */}
                  <div className="pt-6 mt-5 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                        isDarkMode
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                      }`}
                    >
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      <span>View PDF</span>
                    </a>

                    <a
                      href={item.downloadUrl || item.url}
                      download
                      className="py-2.5 px-3 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5 shrink-0" />
                      <span>Download</span>
                    </a>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tools Section Heading */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Recommended AI Creation Tools
            </h3>
            <p className={`text-xs sm:text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Direct access to top AI platforms for student creators and builders.
            </p>
          </div>
          <span className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {tools.length} Curated Tools
          </span>
        </div>

        {/* 5 Tools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl border flex flex-col justify-between p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800 hover:border-blue-500/40 hover:shadow-blue-900/10'
                  : 'bg-white border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-slate-200'
              }`}
            >
              <div className="space-y-4">
                
                {/* Card Top: Icon & Badge */}
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl border ${
                    isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                  }`}>
                    {getToolIcon(item.id)}
                  </div>

                  {item.badge && (
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      isDarkMode 
                        ? 'bg-blue-900/40 text-blue-300 border border-blue-800/60' 
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Title */}
                <div>
                  <h4 className="text-xl font-bold tracking-tight group-hover:text-blue-500 transition-colors">
                    {item.title}
                  </h4>
                  <p className={`text-xs font-mono mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {item.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                  </p>
                </div>

                {/* Summary */}
                <p className={`text-xs sm:text-sm leading-relaxed ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {item.summary}
                </p>

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`text-[10px] px-2 py-0.5 rounded-md font-medium ${
                          isDarkMode 
                            ? 'bg-slate-800 text-slate-400' 
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Button Link */}
              <div className="pt-6 mt-5 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 group/btn ${
                    isDarkMode
                      ? 'bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white border border-slate-700'
                      : 'bg-slate-100 hover:bg-blue-600 text-slate-800 hover:text-white border border-slate-200'
                  }`}
                >
                  <span>{item.linkText || 'Open Tool'}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
