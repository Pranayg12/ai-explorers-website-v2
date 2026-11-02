/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { StatisticsSection } from "./components/StatisticsSection";
import { WhyUsSection } from "./components/WhyUsSection";
import { ClassExperienceSection } from "./components/ClassExperienceSection";
import { ProgramsSection } from "./components/ProgramsSection";
import { ParentSection } from "./components/ParentSection";
import { FAQSection } from "./components/FAQSection";
import { Footer } from "./components/Footer";
import { PageTab } from "./types";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("ai_explorers_theme");
    return saved !== null ? saved === "dark" : true;
  });

  const [activeTab, setActiveTab] = useState<PageTab>("home");

  useEffect(() => {
    localStorage.setItem("ai_explorers_theme", isDarkMode ? "dark" : "light");
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleJoinClick = () => {
    window.open("https://forms.gle/L2bLtb6KMcynLJZf8", "_blank", "noopener,noreferrer");
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

        <div id="impact">
          <StatisticsSection isDarkMode={isDarkMode} />
        </div>

        <div id="why-us">
          <WhyUsSection isDarkMode={isDarkMode} />
        </div>

        {/* Take a look into our class - Curriculum Roadmap format */}
        <div id="our-class">
          <ClassExperienceSection isDarkMode={isDarkMode} />
        </div>

        <div id="programs">
          <ProgramsSection isDarkMode={isDarkMode} />
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
    </div>
  );
}
