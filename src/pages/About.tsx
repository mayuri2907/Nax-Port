import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { soundManager } from '../utils/audio';
import { Sparkles, Terminal, Cpu, Layers, Compass, Headphones, Coffee, ArrowRight, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Code With Character',
      highlight: 'Delightful & Human',
      description:
        'Software shouldn’t feel like a sterile machine. I engineer interfaces with rhythm, fluid physics, and intentional micro-interactions that make digital experiences truly memorable.',
      icon: Sparkles,
      accent: '#F47B35'
    },
    {
      num: '02',
      title: 'Architectural Rigor',
      highlight: 'Zero-Lock Distributed Systems',
      description:
        'From CRDT-backed real-time collaboration engines to offline-first Android SQLite heuristics, I build resilient systems where edge cases, latency, and data integrity are solved by design.',
      icon: Cpu,
      accent: '#171717'
    },
    {
      num: '03',
      title: 'Intelligent Autonomy',
      highlight: 'LLMs With Purpose',
      description:
        'Harnessing AI not for generic novelty, but to build adaptive platforms: dynamic career path synthesis, voice-activated system agents, and context-aware intelligence that solves real bottlenecks.',
      icon: Layers,
      accent: '#F5D77E'
    }
  ];

  return (
    <PageTransition>
      <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Editorial Index Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-borderline">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-ink-primary text-white font-mono text-xs font-bold">
              PAGE / ABOUT
            </span>
            <span className="font-grotesk text-xs uppercase tracking-wider text-ink-secondary">
              Navin Chaudhary — Biography & Engineering Philosophy
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-xs font-mono text-ink-muted">
            <Compass className="w-3.5 h-3.5 text-accent-orange animate-spin-slow" />
            <span>CREATIVE DEVELOPER • DIGITAL BUILDER</span>
          </div>
        </div>

        {/* Master Heading */}
        <div className="mb-16">
          <h1 className="font-grotesk font-black text-4xl sm:text-6xl md:text-7xl text-ink-primary leading-[0.98] tracking-tight mb-6">
            CURIOUS BY NATURE.{' '}
            <span className="block text-accent-orange font-editorial italic font-normal">
              BUILDER BY CHOICE.
            </span>
          </h1>
          <p className="font-sans text-lg sm:text-xl text-ink-secondary max-w-2xl leading-relaxed">
            I bridge the gap between creative visual experimentation and deep full-stack architecture. 
            Every codebase is treated as a digital craft where performance, ergonomics, and aesthetic pleasure coexist.
          </p>
        </div>

        {/* Main Grid: Story + Vignettes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Left: Deep Story (7 cols) */}
          <div className="lg:col-span-7 space-y-6 font-sans text-base sm:text-lg text-ink-secondary leading-relaxed">
            <div className="p-6 bg-white border-2 border-ink-primary rounded-3xl shadow-brutal">
              <h3 className="font-grotesk font-bold text-xl text-ink-primary mb-3">
                The Mindset Behind The Code
              </h3>
              <p className="text-ink-primary font-medium text-lg mb-4">
                "The web was born as an experimental canvas. Somewhere along the way, corporate templates made it predictable. My goal is to bring craft, kinetic energy, and bold individuality back to modern software."
              </p>
              <p className="text-sm sm:text-base text-ink-secondary">
                Whether designing low-latency synchronization engines with Conflict-Free Replicated Data Types (CRDTs), 
                crafting offline-first mobile applications in Kotlin and Jetpack Compose, or deploying LLM prompt pipelines with the Gemini API, 
                I focus on delivering solutions that solve real engineering bottlenecks.
              </p>
            </div>

            <div className="p-6 bg-bg-secondary/40 border border-borderline rounded-3xl space-y-4">
              <h4 className="font-grotesk font-bold text-base text-ink-primary uppercase tracking-wider">
                My Core Approach to Development
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                  <span>Type safety with TypeScript & Kotlin</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                  <span>Zero-lock distributed concurrency</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                  <span>Purpose-driven AI integration</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                  <span>Accessible, fluid 60 FPS motion</span>
                </div>
              </div>
            </div>

            {/* Signature Sticker */}
            <div className="pt-4 flex items-center gap-4">
              <div className="w-36 h-20 bg-white border-2 border-ink-primary shadow-brutal-sm rounded-lg p-2 flex flex-col justify-between -rotate-2">
                <span className="text-[10px] font-mono uppercase text-ink-muted">Verified Signature</span>
                <img
                  src="/assets/character/navin-tag.png"
                  alt="Navin Chaudhary signature tag"
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="text-xs font-grotesk text-ink-secondary">
                <span className="font-bold text-ink-primary block text-sm">Navin Chaudhary</span>
                <span>Creative Developer & Software Engineer</span>
              </div>
            </div>
          </div>

          {/* Right: Character Vignettes & Lifestyle (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Music & Flow State */}
            <div className="p-6 bg-white border-2 border-ink-primary rounded-3xl shadow-brutal flex items-center gap-5">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-bg-secondary shrink-0 border border-ink-primary/20">
                <img
                  src="/assets/character/navin-vibing.png"
                  alt="Navin Chaudhary relaxing with headphones"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-mono text-xs text-accent-orange font-bold uppercase tracking-wider block mb-1">
                  Creative Flow
                </span>
                <h4 className="font-grotesk font-bold text-base text-ink-primary mb-1">
                  Soundtracks & Synapses
                </h4>
                <p className="font-sans text-xs text-ink-secondary">
                  Most of my cleanest architectures come alive with synthwave and lo-fi beats in my headphones.
                </p>
              </div>
            </div>

            {/* Deep Work */}
            <div className="p-6 bg-accent-yellow/20 border-2 border-ink-primary rounded-3xl shadow-brutal flex items-center gap-5">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white shrink-0 border border-ink-primary/20">
                <img
                  src="/assets/character/navin-coding.png"
                  alt="Navin coding at workstation"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-mono text-xs text-ink-primary font-bold uppercase tracking-wider block mb-1">
                  Craft & Persistence
                </span>
                <h4 className="font-grotesk font-bold text-base text-ink-primary mb-1">
                  No Shortcut Mentality
                </h4>
                <p className="font-sans text-xs text-ink-secondary">
                  Solving edge cases: race conditions, offline queues, memory leaks, and accessible design.
                </p>
              </div>
            </div>

            {/* Quick Facts Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-4 bg-white border border-borderline rounded-2xl">
                <span className="text-[11px] font-mono text-ink-muted uppercase block">Core Mindset</span>
                <span className="font-grotesk font-bold text-sm text-ink-primary">Curious & Relentless</span>
              </div>
              <div className="p-4 bg-white border border-borderline rounded-2xl">
                <span className="text-[11px] font-mono text-ink-muted uppercase block">Fuel</span>
                <span className="font-grotesk font-bold text-sm text-ink-primary">Hot Coffee & Code</span>
              </div>
            </div>

          </div>

        </div>

        {/* 3 Pillars Section */}
        <div className="mb-20">
          <div className="mb-8">
            <span className="px-2.5 py-1 rounded bg-accent-yellow border border-ink-primary/20 font-mono text-xs font-bold text-ink-primary">
              CORE PILLARS
            </span>
            <h3 className="font-grotesk font-black text-2xl sm:text-4xl text-ink-primary mt-2">
              What Drives Every Architecture I Build
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.num}
                  className="p-6 bg-white border-2 border-ink-primary shadow-brutal rounded-3xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-ink-muted">
                        {p.num} // PILLAR
                      </span>
                      <div className="p-2.5 rounded-xl bg-bg-secondary text-ink-primary">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h4 className="font-grotesk font-bold text-xl text-ink-primary mb-1">
                      {p.title}
                    </h4>
                    <span className="inline-block text-xs font-grotesk font-semibold text-accent-orange mb-3">
                      {p.highlight}
                    </span>
                    <p className="font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Page Navigation Strip */}
        <div className="pt-8 border-t border-borderline flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/experience"
            onClick={() => soundManager.playHover()}
            className="flex items-center gap-2 text-ink-primary font-grotesk text-sm font-bold hover:text-accent-orange transition-colors"
          >
            <span>Explore Engineering Milestones</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/projects"
            onClick={() => soundManager.playClick()}
            className="px-6 py-3 rounded-2xl bg-ink-primary text-white font-grotesk text-xs font-bold shadow-brutal hover:bg-accent-orange transition-colors"
          >
            See Applied Projects ↗
          </Link>
        </div>

      </div>
    </PageTransition>
  );
};

