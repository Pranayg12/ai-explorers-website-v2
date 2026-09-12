/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { StatisticsSection } from "./components/StatisticsSection";
import { WhyUsSection } from "./components/WhyUsSection";
import { ProgramsSection } from "./components/ProgramsSection";
import { CurriculumSection } from "./components/CurriculumSection";
import { ShowcaseSection } from "./components/ShowcaseSection";
import { ParentSection } from "./components/ParentSection";
import { FAQSection } from "./components/FAQSection";
import { Footer } from "./components/Footer";
import { SuperMarioGameModal } from "./components/SuperMarioGameModal";
import { OnlineVideoEditorModal } from "./components/OnlineVideoEditorModal";
import { PageTab } from "./types";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("ai_explorers_theme");
    return saved !== null ? saved === "dark" : true;
  });

  const [activeTab, setActiveTab] = useState<PageTab>("home");
  
  // Interactive Modal States
  const [activeGameModal, setActiveGameModal] = useState<string | null>(null);
  const [activeVideoEditorModal, setActiveVideoEditorModal] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("ai_explorers_theme", isDarkMode ? "dark" : "light");
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleJoinClick = () => {
    const programsSection = document.getElementById("programs");
    if (programsSection) {
      programsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      isDarkMode ? "bg-slate-950 text-slate-100" : "bg-white text-slate-900"
    }`}>
      {/* Sticky Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        onJoinClick={handleJoinClick}
      />

      {/* Main Page Layout Sections */}
      <main>
        <div id="home">
          <HeroSection
            setActiveTab={setActiveTab}
            isDarkMode={isDarkMode}
            onJoinClick={handleJoinClick}
          />
        </div>

        <div id="about">
          <AboutSection isDarkMode={isDarkMode} />
        </div>

        <div id="impact">
          <StatisticsSection isDarkMode={isDarkMode} />
        </div>

        <div id="why-us">
          <WhyUsSection isDarkMode={isDarkMode} />
        </div>

        <div id="programs">
          <ProgramsSection isDarkMode={isDarkMode} />
        </div>

        <div id="curriculum">
          <CurriculumSection isDarkMode={isDarkMode} />
        </div>

        {/* Student Showcase with Super Mario 2D and Online Video Editor */}
        <div id="gallery">
          <ShowcaseSection
            isDarkMode={isDarkMode}
            onLaunchGame={(gameId) => setActiveGameModal(gameId)}
            onLaunchEditor={() => setActiveVideoEditorModal(true)}
          />
        </div>

        <div id="testimonials">
          <ParentSection isDarkMode={isDarkMode} />
        </div>

        <div id="faq">
          <FAQSection isDarkMode={isDarkMode} />
        </div>
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        onJoinClick={handleJoinClick}
      />

      {/* Super Mario 2D Interactive Game Modal */}
      {activeGameModal === "mario" && (
        <SuperMarioGameModal onClose={() => setActiveGameModal(null)} />
      )}

      {/* Online Video Editor Interactive Modal Popup */}
      {activeVideoEditorModal && (
        <OnlineVideoEditorModal
          onClose={() => setActiveVideoEditorModal(false)}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
}
