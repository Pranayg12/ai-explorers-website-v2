import React, { useState } from 'react';
import { CURRICULUM_STEPS } from '../data/mockData';
import { 
  Brain, 
  Terminal, 
  Image, 
  Film, 
  Music, 
  Code, 
  Gamepad2, 
  Trophy, 
  Sparkles, 
  Star,
  ArrowDown, 
  CheckCircle,
  Wrench
} from 'lucide-react';

interface CurriculumSectionProps {
  isDarkMode: boolean;
}

export const CurriculumSection: React.FC<CurriculumSectionProps> = ({ isDarkMode }) => {
  const [selectedStep, setSelectedStep] = useState<number>(1);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain className="w-5 h-5" />;
      case 'Terminal': return <Terminal className="w-5 h-5" />;
      case 'Image': return <Image className="w-5 h-5" />;
      case 'Film': return <Film className="w-5 h-5" />;
      case 'Music': return <Music className="w-5 h-5" />;
      case 'Code': return <Code className="w-5 h-5" />;
      case 'Gamepad2': return <Gamepad2 className="w-5 h-5" />;
      case 'Trophy': return <Trophy className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const activeStepData = CURRICULUM_STEPS.find(s => s.stepNumber === selectedStep) || CURRICULUM_STEPS[0];

  return (
    <section className={`py-20 transition-colors duration-300 relative ${
      isDarkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Curriculum{' '}
            <span className="bg-gradient-to-r from-teal-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Timeline Roadmap
            </span>
          </h2>
          <p className={`text-base sm:text-lg ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Click through our 7 progressive learning modules to explore how students build from AI fundamentals to a capstone portfolio project.
          </p>
        </div>

        {/* Timeline Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Timeline Nodes List */}
          <div className="lg:col-span-6 space-y-3">
            {CURRICULUM_STEPS.map((step) => {
              const isSelected = selectedStep === step.stepNumber;
              return (
                <div key={step.stepNumber} className="relative">
                  <button
                    onClick={() => setSelectedStep(step.stepNumber)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between gap-4 group ${
                      isSelected
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-500 shadow-lg shadow-indigo-500/20 scale-[1.02]'
                        : isDarkMode
                          ? 'bg-slate-900/80 border-slate-800 hover:bg-slate-800/80 text-slate-200'
                          : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-transform ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-blue-500/10 text-blue-500 group-hover:scale-110'
                      }`}>
                        {getIcon(step.iconName)}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 opacity-75'
                          }`}>
                            Step {step.stepNumber}
                          </span>
                          <h3 className="font-bold text-sm sm:text-base">
                            {step.title}
                          </h3>
                        </div>
                        <p className={`text-xs mt-0.5 line-clamp-1 ${
                          isSelected ? 'text-white/80' : isDarkMode ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          {step.shortDesc}
                        </p>
                      </div>
                    </div>

                    <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isSelected ? 'bg-white text-indigo-600' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                    }`}>
                      {isSelected ? '✓' : step.stepNumber}
                    </div>
                  </button>

                  {/* Down Connector Arrow for timeline */}
                  {step.stepNumber < CURRICULUM_STEPS.length && (
                    <div className="flex justify-center my-1 opacity-30">
                      <ArrowDown className="w-4 h-4 text-slate-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Interactive Step Details Card */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className={`p-8 rounded-3xl border shadow-xl transition-all duration-300 relative overflow-hidden ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 shadow-blue-950/30'
                : 'bg-slate-50 border-slate-200 shadow-slate-100'
            }`}>
              
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 via-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
                    {getIcon(activeStepData.iconName)}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-teal-500 uppercase tracking-wider">
                      MODULE 0{activeStepData.stepNumber} OF 0{CURRICULUM_STEPS.length}
                    </span>
                    <h3 className="text-2xl font-extrabold tracking-tight">
                      {activeStepData.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Detailed Outcome */}
              <div className="py-6 space-y-6">
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    Learning Objective & Skills Acquired
                  </h4>
                  <p className={`text-sm sm:text-base leading-relaxed ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-700'
                  }`}>
                    {activeStepData.detailedOutcome}
                  </p>
                </div>

                {/* Tools Introduced */}
                {activeStepData.toolsUsed && activeStepData.toolsUsed.length > 0 && (
                  <div>
                    <h4 className={`text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5 ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      <Wrench className="w-4 h-4 text-blue-500" />
                      Tools & Environments
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeStepData.toolsUsed.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-xl text-xs font-mono font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Note / Sample Project Callout */}
                {activeStepData.sampleProject && activeStepData.sampleProject.trim() !== '' && (
                  <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
                    isDarkMode ? 'bg-slate-800/80 border-slate-700 text-amber-300' : 'bg-amber-50/80 border-amber-200/80 text-amber-900'
                  }`}>
                    <Star className="w-5 h-5 text-amber-500 fill-amber-400 shrink-0" />
                    <span className="text-sm font-semibold">{activeStepData.sampleProject}</span>
                  </div>
                )}

              </div>

              {/* Bottom Nav indicators */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <button
                  disabled={selectedStep === 1}
                  onClick={() => setSelectedStep(s => Math.max(1, s - 1))}
                  className="hover:text-blue-500 disabled:opacity-30 disabled:hover:text-slate-400 font-semibold"
                >
                  ← Previous Module
                </button>
                <span className="font-mono">Step {selectedStep} / {CURRICULUM_STEPS.length}</span>
                <button
                  disabled={selectedStep === CURRICULUM_STEPS.length}
                  onClick={() => setSelectedStep(s => Math.min(CURRICULUM_STEPS.length, s + 1))}
                  className="hover:text-blue-500 disabled:opacity-30 disabled:hover:text-slate-400 font-semibold"
                >
                  Next Module →
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
