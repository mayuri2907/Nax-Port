import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { JOURNEY_MILESTONES } from '../data/journey';
import { soundManager } from '../utils/audio';
import { Compass, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <PageTransition>
      <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Editorial Index Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-borderline">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-ink-primary text-white font-mono text-xs font-bold">
              PAGE / EXPERIENCE
            </span>
            <span className="font-grotesk text-xs uppercase tracking-wider text-ink-secondary">
              Verified Technical Milestones & Engineering Evolution
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-xs font-mono text-ink-muted">
            <Compass className="w-3.5 h-3.5 text-accent-orange animate-spin-slow" />
            <span>PRACTICAL BUILDS • OPEN-SOURCE TRACK RECORD</span>
          </div>
        </div>

        {/* Master Heading */}
        <div className="mb-16">
          <h1 className="font-grotesk font-black text-4xl sm:text-6xl md:text-7xl text-ink-primary leading-[0.98] tracking-tight mb-4">
            ENGINEERING JOURNEY.{' '}
            <span className="block font-editorial italic font-normal text-accent-orange">
              Proven development milestones.
            </span>
          </h1>
          <p className="font-sans text-base sm:text-lg text-ink-secondary max-w-2xl leading-relaxed">
            A verified chronological record of practical full-stack platforms, distributed concurrency engines, mobile architecture utilities, and autonomous agent prototypes.
          </p>
        </div>

        {/* Editorial Timeline */}
        <div className="max-w-4xl mx-auto relative mb-20">
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-borderline-dark/20 hidden sm:block" />

          <div className="space-y-12">
            {JOURNEY_MILESTONES.map((milestone, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.1 }}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`relative flex flex-col sm:flex-row items-center gap-8 ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Center Node Dot */}
                  <div className="absolute left-4 sm:left-1/2 top-8 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-3 border-ink-primary shadow-brutal-sm flex items-center justify-center z-10 hidden sm:flex">
                    <div className="w-2 h-2 rounded-full bg-accent-orange" />
                  </div>

                  {/* Content Card (Half Width) */}
                  <div className="w-full sm:w-1/2 pl-0 sm:px-6">
                    <div className="p-6 sm:p-8 bg-white border-2 border-ink-primary rounded-3xl shadow-brutal hover:shadow-brutal-lg transition-all duration-200">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 rounded-md bg-accent-yellow border border-ink-primary/20 font-mono text-[11px] font-bold text-ink-primary">
                          {milestone.phase}
                        </span>
                        <span className="font-mono text-xs font-semibold text-ink-muted">
                          {milestone.year}
                        </span>
                      </div>

                      <h2 className="font-grotesk font-bold text-xl text-ink-primary mb-1">
                        {milestone.title}
                      </h2>
                      <p className="font-grotesk text-xs sm:text-sm font-semibold text-accent-orange mb-3">
                        {milestone.subtitle}
                      </p>

                      <p className="font-sans text-sm text-ink-secondary leading-relaxed mb-4">
                        {milestone.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-borderline">
                        {milestone.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 bg-bg-secondary text-ink-primary rounded font-mono text-[11px] font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation Strip */}
        <div className="pt-8 border-t border-borderline flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/projects"
            onClick={() => soundManager.playHover()}
            className="flex items-center gap-2 text-ink-primary font-grotesk text-sm font-bold hover:text-accent-orange transition-colors"
          >
            <span>See Project Implementations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/contact"
            onClick={() => soundManager.playClick()}
            className="px-6 py-3 rounded-2xl bg-ink-primary text-white font-grotesk text-xs font-bold shadow-brutal hover:bg-accent-orange transition-colors"
          >
            Connect With Navin ↗
          </Link>
        </div>

      </div>
    </PageTransition>
  );
};

