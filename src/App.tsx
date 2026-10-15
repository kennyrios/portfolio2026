/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { RealProject, PlainBrushColorKey } from './types/portfolio';
import { ThickPlainBrushScrollCanvas } from './components/ThickPlainBrushScrollCanvas';
import { PlainColorBar } from './components/PlainColorBar';
import { Navigation } from './components/Navigation';
import { IntroScrollHero } from './components/IntroScrollHero';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { RealProjectModal } from './components/RealProjectModal';
import { LenisProvider, useLenis } from './context/LenisContext';

function PortfolioApp() {
  const [brushColor, setBrushColor] = useState<PlainBrushColorKey>('sunlight');
  const [selectedProject, setSelectedProject] = useState<RealProject | null>(null);
  const { scrollTo } = useLenis();

  // Dynamically adapt the plain brush color across sections as you scroll
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPos = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? scrollPos / docHeight : 0;

          let targetColor: PlainBrushColorKey = 'sunlight';
          if (progress < 0.28) {
            targetColor = 'sunlight'; // Intro & Hero: Soft Sunlight Pale Yellow
          } else if (progress < 0.65) {
            targetColor = 'peach'; // Works: Soft Pale Peach
          } else if (progress < 0.85) {
            targetColor = 'mint'; // About & Services: Soft Mint / Sage
          } else {
            targetColor = 'lavender'; // Contact: Soft Pale Lavender
          }

          setBrushColor((prev) => (prev !== targetColor ? targetColor : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToContact = () => {
    scrollTo('#contact', { offset: -30, duration: 1.4 });
  };

  const handleScrollToWorks = () => {
    scrollTo('#works', { offset: -30, duration: 1.2 });
  };

  const handleScrollDownFromIntro = () => {
    scrollTo('#hero-content', { offset: -20, duration: 1.2 });
  };

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 font-sans selection:bg-amber-200/50 selection:text-zinc-950">
      {/* Thick Plain Light Color Brush Canvas (Fluid Kinematics, No 3D, No Stella on scroll back) */}
      <ThickPlainBrushScrollCanvas colorKey={brushColor} />

      {/* Top Navigation Bar with authentic Kenny Rios SVG Monogram Logo */}
      <Navigation onContactClick={handleScrollToContact} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Creative Logo Intro Scroll Animation */}
        <IntroScrollHero onScrollDown={handleScrollDownFromIntro} />

        <div id="hero-content">
          <Hero
            onExploreWorks={handleScrollToWorks}
            onContactClick={handleScrollToContact}
          />
        </div>

        <ProjectsSection onSelectProject={setSelectedProject} />

        <AboutSection />

        <ContactSection />
      </main>

      {/* Clean Light Footer */}
      <Footer />

      {/* Plain Color Switcher Bar */}
      <PlainColorBar
        currentColor={brushColor}
        onColorChange={setBrushColor}
      />

      {/* Case Study Fullscreen Lightbox / Modal */}
      <RealProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LenisProvider>
      <PortfolioApp />
    </LenisProvider>
  );
}
