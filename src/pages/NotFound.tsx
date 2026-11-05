import React from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { soundManager } from '../utils/audio';
import { ArrowLeft, Compass, Terminal } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <PageTransition>
      <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center flex flex-col items-center">
        
        <div className="w-16 h-16 rounded-3xl bg-accent-yellow border-2 border-ink-primary shadow-brutal flex items-center justify-center mb-6">
          <Compass className="w-8 h-8 text-ink-primary animate-spin-slow" />
        </div>

        <span className="px-3 py-1 bg-ink-primary text-white font-mono text-xs font-bold rounded-md mb-4 shadow-brutal-sm">
          ERROR 404
        </span>

        <h1 className="font-grotesk font-black text-4xl sm:text-6xl text-ink-primary tracking-tight mb-4">
          LOST IN THE CODEBASE.
        </h1>

        <p className="font-sans text-base sm:text-lg text-ink-secondary max-w-md mb-8">
          The digital route you requested does not exist or has been refactored into a cleaner architecture.
        </p>

        <Link
          to="/"
          onClick={() => soundManager.playClick()}
          className="px-6 py-3.5 rounded-2xl bg-ink-primary text-white font-grotesk text-sm font-bold shadow-brutal hover:bg-accent-orange transition-all flex items-center gap-2 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Home Page</span>
        </Link>

      </div>
    </PageTransition>
  );
};
