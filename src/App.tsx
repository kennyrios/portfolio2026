/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RealProject } from './types/portfolio';
import { AmbientDarkAtmosphere } from './components/AmbientDarkAtmosphere';
import { Navigation } from './components/Navigation';
import { IntroScrollHero } from './components/IntroScrollHero';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { RealProjectModal } from './components/RealProjectModal';
import { LenisProvider, useLenis } from './context/LenisContext';
import { SectionParallaxBridge } from './components/SectionParallaxBridge';
import { SmoothWaveHorizon } from './components/TornPaperHorizon';

function PortfolioApp() {
  const [selectedProject, setSelectedProject] = useState<RealProject | null>(null);
  const { scrollTo } = useLenis();

  const handleScrollToContact = () => {
    scrollTo('#contact', { offset: -40, duration: 1.4 });
  };

  const handleScrollToWorks = () => {
    scrollTo('#works', { offset: -40, duration: 1.2 });
  };

  const handleScrollDownFromIntro = () => {
    scrollTo('#hero-content', { offset: 0, duration: 1.2 });
  };

  return (
    <div className="relative min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-white/20 selection:text-white">
      {/* Mathis Biabiany Style Ambient Lighting & Grain Atmosphere */}
      <AmbientDarkAtmosphere />

      {/* Floating Dark Glass Navigation Bar */}
      <Navigation
        onContactClick={handleScrollToContact}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Section 1: Monogram Intro Section with Parallax Pinning */}
        <div className="relative h-[200vh]">
          <div className="sticky top-0 h-screen w-full overflow-hidden z-10">
            <IntroScrollHero onScrollDown={handleScrollDownFromIntro} />
          </div>
        </div>

        {/* Section 2: Hero Section overlapping Section 1 with Smooth Curved Wave Horizon (Straight edge-to-edge, zero rounded corners) */}
        <div
          id="hero-content"
          className="relative z-20 shadow-[0_-30px_90px_rgba(0,0,0,0.95),0_-10px_30px_rgba(0,0,0,0.8)]"
          style={{ marginTop: '-100vh' }}
        >
          {/* Animated 100% Solid Opaque Smooth-Curved Wave Horizon across full viewport width */}
          <SmoothWaveHorizon />

          <Hero
            onExploreWorks={handleScrollToWorks}
            onContactClick={handleScrollToContact}
          />
        </div>

        {/* Subsequent Portfolio Flow with Solid Dark Stacking */}
        <div className="relative z-20 bg-[#09090b]">
          {/* Parallax Bridge: Hero → Works */}
          <SectionParallaxBridge
            sectionIndex="01 // 03"
            fromLabel="OVERVIEW & IMPACT"
            toLabel="SELECTED WORKS"
            marqueePrimary={['SELECTED WORKS']}
            accent="amber"
          />

          {/* Mathis Biabiany Card Presentation & Projects Showcase */}
          <ProjectsSection onSelectProject={setSelectedProject} />

          {/* Parallax Bridge: Works → About */}
          <SectionParallaxBridge
            sectionIndex="02 // 03"
            fromLabel="FEATURED PORTFOLIO"
            toLabel="PHILOSOPHY & CAPABILITIES"
            marqueePrimary={[
              'ARCHITECTURAL PHILOSOPHY',
              'SCALABLE ECOSYSTEMS',
              'FULL-CYCLE UI/UX',
              'MAPBOX GL INTERACTION',
              'MODULAR CMS',
            ]}
            marqueeSecondary={[
              'WCAG AA COMPLIANT',
              'HEADLESS WORDPRESS',
              'FIGMA TO PRODUCTION',
              'CALGARY HEADQUARTERS',
            ]}
            accent="cyan"
          />

          {/* About, Core Philosophy & Technical Capabilities Matrix */}
          <AboutSection />

          {/* Parallax Bridge: About → Contact */}
          <SectionParallaxBridge
            sectionIndex="03 // 03"
            fromLabel="TECHNICAL MATRIX"
            toLabel="DIRECT INQUIRIES"
            marqueePrimary={[
              'LET’S BUILD SOMETHING EXCEPTIONAL',
              'SENIOR ARCHITECTURE',
              'CONTRACT ENGAGEMENTS',
              'CALGARY & REMOTE',
            ]}
            marqueeSecondary={[
              'KENNYRGRAFICO@GMAIL.COM',
              'AVAILABLE FOR SELECTED CLIENTS',
              'ESTABLISHED 2016',
            ]}
            accent="emerald"
          />

          {/* Contact & Inquiries */}
          <ContactSection />
        </div>
      </main>

      {/* Dark Luxury Footer */}
      <Footer />

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
