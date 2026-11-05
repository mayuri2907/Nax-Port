import React from 'react';
import { Outlet } from 'react-router-dom';
import { CustomCursor } from '../components/cursor/CustomCursor';
import { ScrollToTop } from '../components/common/ScrollToTop';
import { Navbar } from '../components/navigation/Navbar';
import { FooterSection } from '../components/footer/FooterSection';

export const MainLayout: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-bg-primary text-ink-primary font-sans overflow-x-hidden selection:bg-accent-orange selection:text-white flex flex-col justify-between">
      {/* Scroll restoration helper */}
      <ScrollToTop />

      {/* Global custom cursor */}
      <CustomCursor />

      {/* Shared sticky navbar */}
      <Navbar />

      {/* Routed Page Content */}
      <main className="relative z-10 flex-grow pt-20 md:pt-24">
        <Outlet />
      </main>

      {/* Shared footer */}
      <FooterSection />
    </div>
  );
};
