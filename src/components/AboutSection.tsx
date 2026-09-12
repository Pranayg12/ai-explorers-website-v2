import React from 'react';
import { FOUNDERS_INFO } from '../data/mockData';
import { Target, Compass, HeartHandshake } from 'lucide-react';
import foundersScreenshotImg from '../assets/images/about_founders_screenshot.png';


interface AboutSectionProps {
  isDarkMode: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ isDarkMode }) => {
  return (
    <div className={`py-16 transition-colors duration-300 space-y-20 ${
      isDarkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'
    }`}>
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto px-4 space-y-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>About </span>
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            AI Explorers
          </span>
        </h2>
        <p className={`text-base sm:text-lg leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          AI Explorers was born out of a shared realization by two brothers: technology should expand human imagination and problem solving, not replace human effort.
        </p>
      </div>

      {/* Founder Story Block */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`p-8 sm:p-12 rounded-3xl border shadow-xl transition-all relative overflow-hidden ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="space-y-8">
            
            <div className="space-y-4 max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Founded by Ameya Gupta & Pranay Gupta
              </h2>
              <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {FOUNDERS_INFO.bio}
              </p>
            </div>

            {/* Founders Profiles Cards */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Ameya */}
                <div className={`p-6 rounded-2xl border flex flex-col justify-between ${
                  isDarkMode ? 'bg-slate-800/70 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-blue-500/20 shrink-0">
                        AG
                      </div>
                      <div>
                        <h3 className="font-bold text-lg leading-snug">Ameya Gupta</h3>
                        <p className="text-xs text-blue-500 font-semibold">Co-Founder • High Schooler</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                        Leadership:
                      </h4>
                      <ul className="text-sm opacity-90 space-y-1.5 list-disc list-outside ml-4">
                        <li>Mathnasium Instructor 2+ years</li>
                        <li>Volunteering at various institutions (MeriSTEM, TopSoccer)</li>
                        <li>SAT Bootcamp Tutor</li>
                      </ul>
                    </div>

                    <p className="text-sm opacity-85 leading-relaxed pt-3 border-t border-slate-200/70 dark:border-slate-700/70">
                      <strong>Focus:</strong> AI Coding, Game Design & AI Curriculum Architecture.
                    </p>
                  </div>
                </div>

                {/* Pranay */}
                <div className={`p-6 rounded-2xl border flex flex-col justify-between ${
                  isDarkMode ? 'bg-slate-800/70 border-slate-700' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-600 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-purple-500/20 shrink-0">
                        PG
                      </div>
                      <div>
                        <h3 className="font-bold text-lg leading-snug">Pranay Gupta</h3>
                        <p className="text-xs text-purple-500 font-semibold">Co-Founder • Middle Schooler</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                        Leadership:
                      </h4>
                      <ul className="text-sm opacity-90 space-y-1.5 list-disc list-outside ml-4">
                        <li>Taught AI Explorers classes before</li>
                        <li>Contribution to Project Smile</li>
                      </ul>
                    </div>

                    <p className="text-sm opacity-85 leading-relaxed pt-3 border-t border-slate-200/70 dark:border-slate-700/70">
                      <strong>Focus:</strong> Interactive Projects, Media Generation & AI Animations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Founders Screenshot */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
                <img
                  src={foundersScreenshotImg}
                  alt="AI Explorers Founders - Ameya Gupta and Pranay Gupta"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Mission, Vision, & Values Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Mission */}
          <div className={`p-8 rounded-3xl border ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-lg shadow-slate-100'
          }`}>
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500 w-fit mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Our Mission</h3>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              To equip middle school students with the computational skills, creative confidence, and ethical mindset required to build original AI projects responsibly.
            </p>
          </div>

          {/* Vision */}
          <div className={`p-8 rounded-3xl border ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-lg shadow-slate-100'
          }`}>
            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-500 w-fit mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Our Vision</h3>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              A world where young people view technology not as a black box that controls them, but as an open sketchbook they can program to solve real problems.
            </p>
          </div>

          {/* Values */}
          <div className={`p-8 rounded-3xl border ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-lg shadow-slate-100'
          }`}>
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 w-fit mb-4">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Core Values</h3>
            <ul className={`text-sm space-y-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              <li>• <strong>Ethics First:</strong> Responsible attribution and privacy.</li>
              <li>• <strong>Hands-On:</strong> Learn by making real artifacts.</li>
            </ul>
          </div>

        </div>
      </div>

    </div>
  );
};
