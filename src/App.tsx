import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';

const CinematicIntro = lazy(() =>
  import('./components/intro/CinematicIntro').then((m) => ({ default: m.CinematicIntro }))
);

export const App: React.FC = () => {
  const [introCompleted, setIntroCompleted] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return sessionStorage.getItem('navin_intro_completed') === 'true';
  });

  return (
    <BrowserRouter>
      {/* Cinematic Typographic Intro Sequence (Plays once per browser session) */}
      {!introCompleted && (
        <Suspense fallback={null}>
          <CinematicIntro onComplete={() => setIntroCompleted(true)} />
        </Suspense>
      )}

      {/* The Actual Multi-Page Portfolio (Pre-rendered cleanly underneath) */}
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
