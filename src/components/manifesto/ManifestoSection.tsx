import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, Cpu, Layers, Compass } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const ManifestoSection: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Code With Character',
      highlight: 'Delightful & Human',
      description:
        'Software shouldn’t feel like a sterile assembly line. I engineer interfaces with rhythm, fluid physics, and unexpected micro-interactions that make digital experiences truly memorable.',
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
    <section id="manifesto" className="relative py-24 md:py-36 px-4 sm:px-6 lg:px-8 bg-bg-secondary/50 border-t border-b border-borderline overflow-hidden">
      {/* Decorative Index Tag */}
      <div className="max-w-7xl mx-auto mb-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-ink-primary text-white font-mono text-xs font-bold">
            01 / MANIFESTO
          </span>
          <span className="font-grotesk text-xs uppercase tracking-wider text-ink-secondary">
            Philosophy & Engineering Mindset
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1 text-xs font-mono text-ink-muted">
          <Compass className="w-3.5 h-3.5 text-accent-orange animate-spin-slow" />
          <span>LAT: 28.6139° N / LONG: 77.2090° E</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Big Editorial Statement (7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <h2 className="font-grotesk font-black text-3xl sm:text-5xl md:text-6xl text-ink-primary leading-[1.05] tracking-tight mb-8">
            CURIOUS BY NATURE.{' '}
            <span className="block text-accent-orange font-editorial italic font-normal">
              BUILDER BY CHOICE.
            </span>
          </h2>

          <div className="space-y-6 font-sans text-base sm:text-lg text-ink-secondary leading-relaxed">
            <p className="border-l-3 border-accent-orange pl-5 text-ink-primary font-medium text-lg sm:text-xl">
              "The web was born as an experimental canvas. Somewhere along the way, templates made it predictable. My goal is to bring craft, kinetic energy, and bold individuality back to modern software."
            </p>
            
            <p>
              I bridge the gap between creative UI/UX experimentation and full-stack technical engineering. 
              Whether crafting high-performance React frontends, designing real-time CRDT synchronization engines, 
              or engineering Kotlin Android utilities, I treat every codebase as a digital craft.
            </p>

            <p>
              No bloated frameworks where lean TypeScript excels. No fake metrics. Just robust architectures, 
              intuitive interactions, and code that speaks for itself.
            </p>
          </div>

          {/* Signature Tag Sticker */}
          <div className="mt-8 pt-6 flex items-center gap-4">
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

        {/* Right Column: 3 Pillars Grid (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.num}
                whileHover={{ y: -4, transition: { duration: 0.15 } }}
                onMouseEnter={() => soundManager.playHover()}
                className="group relative p-6 bg-white border-2 border-ink-primary shadow-brutal rounded-2xl transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-ink-muted group-hover:text-accent-orange transition-colors">
                    {p.num} // PILLAR
                  </span>
                  <div className="p-2 rounded-xl bg-bg-secondary text-ink-primary group-hover:bg-accent-yellow transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-grotesk font-bold text-lg sm:text-xl text-ink-primary mb-1">
                  {p.title}
                </h3>
                
                <span className="inline-block text-xs font-grotesk font-semibold text-accent-orange mb-3">
                  {p.highlight}
                </span>

                <p className="font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  {p.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

