/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageTab } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { WhyUsSection } from './components/WhyUsSection';
import { ProgramsSection } from './components/ProgramsSection';
import { CurriculumSection } from './components/CurriculumSection';
import { ShowcaseSection } from './components/ShowcaseSection';
import { ParentSection } from './components/ParentSection';
import { FAQSection } from './components/FAQSection';
import { AboutSection } from './components/AboutSection';
import { StatisticsSection } from './components/StatisticsSection';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [, setSelectedProgram] = useState<string>('');

  // Handle Dark Mode document class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleJoinClick = () => {
    setActiveTab('programs');
    const el = document.getElementById('programs');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectProgram = (programId: string) => {
    setSelectedProgram(programId);
    setActiveTab('programs');
    const el = document.getElementById('programs');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Sticky Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onJoinClick={handleJoinClick}
      />

      {/* Main Single-Page Content with Smooth Scroll Anchors */}
      <main className="flex-1">
        <div id="home" className="scroll-mt-24">
          <HeroSection
            setActiveTab={setActiveTab}
            isDarkMode={isDarkMode}
            onJoinClick={handleJoinClick}
          />
        </div>
        <div id="about" className="scroll-mt-24">
          <AboutSection isDarkMode={isDarkMode} />
        </div>
        <div id="impact" className="scroll-mt-24">
          <StatisticsSection isDarkMode={isDarkMode} />
        </div>
        <div id="why-us" className="scroll-mt-24">
          <WhyUsSection isDarkMode={isDarkMode} />
        </div>
        <div id="programs" className="scroll-mt-24">
          <ProgramsSection isDarkMode={isDarkMode} onSelectProgram={handleSelectProgram} />
        </div>
        <div id="curriculum" className="scroll-mt-24">
          <CurriculumSection isDarkMode={isDarkMode} />
        </div>
        <div id="gallery" className="scroll-mt-24">
          <ShowcaseSection isDarkMode={isDarkMode} />
        </div>
        <div id="testimonials" className="scroll-mt-24">
          <ParentSection isDarkMode={isDarkMode} />
        </div>
        <div id="faq" className="scroll-mt-24">
          <FAQSection isDarkMode={isDarkMode} />
        </div>
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        onJoinClick={handleJoinClick}
      />

    </div>
  );
}
