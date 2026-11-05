import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';

// Lazy-loaded pages for optimal performance & code splitting
const Home = lazy(() => import('../pages/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('../pages/About').then(m => ({ default: m.About })));
const Projects = lazy(() => import('../pages/Projects').then(m => ({ default: m.Projects })));
const Skills = lazy(() => import('../pages/Skills').then(m => ({ default: m.Skills })));
const Experiments = lazy(() => import('../pages/Experiments').then(m => ({ default: m.Experiments })));
const Experience = lazy(() => import('../pages/Experience').then(m => ({ default: m.Experience })));
const Contact = lazy(() => import('../pages/Contact').then(m => ({ default: m.Contact })));
const NotFound = lazy(() => import('../pages/NotFound').then(m => ({ default: m.NotFound })));

const PageLoader: React.FC = () => (
  <div className="w-full min-h-[60vh] flex flex-col items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-ink-primary border-t-accent-orange animate-spin mb-3" />
    <span className="font-grotesk text-xs uppercase tracking-wider text-ink-muted">Loading page...</span>
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="skills" element={<Skills />} />
          <Route path="experiments" element={<Experiments />} />
          <Route path="experience" element={<Experience />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
