import React from 'react';
import { CustomCursor } from './components/cursor/CustomCursor';
import { Navbar } from './components/navigation/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { ManifestoSection } from './components/manifesto/ManifestoSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { PlaygroundSection } from './components/playground/PlaygroundSection';
import { JourneySection } from './components/journey/JourneySection';
import { AboutSection } from './components/about/AboutSection';
import { ContactSection } from './components/contact/ContactSection';
import { FooterSection } from './components/footer/FooterSection';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-bg-primary text-ink-primary font-sans overflow-x-hidden selection:bg-accent-orange selection:text-white">
      {/* Custom Graphic Cursor */}
      <CustomCursor />

      {/* Editorial Sticky Header */}
      <Navbar />

      {/* Main Content Flow */}
      <main className="relative z-10">
        {/* Section 01: Hero */}
        <HeroSection />

        {/* Section 02: Introduction & Manifesto */}
        <ManifestoSection />

        {/* Section 03: Selected Work */}
        <ProjectsSection />

        {/* Section 04: Technical Expertise */}
        <SkillsSection />

        {/* Section 05: Tactile Playground */}
        <PlaygroundSection />

        {/* Section 06: Engineering Journey */}
        <JourneySection />

        {/* Section 07: About Navin */}
        <AboutSection />

        {/* Section 08: Contact & Inquiries */}
        <ContactSection />
      </main>

      {/* Section 09: Editorial Footer */}
      <FooterSection />
    </div>
  );
};

export default App;
