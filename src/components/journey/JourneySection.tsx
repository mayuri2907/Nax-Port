import React from 'react';
import { motion } from 'framer-motion';
import { JOURNEY_MILESTONES } from '../../data/journey';
import { soundManager } from '../../utils/audio';
import { Milestone, Flag, Sparkles, CheckCircle2 } from 'lucide-react';

export const JourneySection: React.FC = () => {
  return (
    <section id="journey" className="relative py-24 md:py-36 px-4 sm:px-6 lg:px-8 bg-bg-secondary/30 border-t border-borderline overflow-hidden">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2.5 py-1 rounded bg-ink-primary text-white font-mono text-xs font-bold">
            05 / JOURNEY
          </span>
          <span className="font-grotesk text-xs uppercase tracking-wider text-ink-secondary">
            Engineering Milestones & Proven Evolution
          </span>
        </div>

        <h2 className="font-grotesk font-black text-4xl sm:text-6xl text-ink-primary tracking-tight leading-[0.95]">
          ENGINEERING JOURNEY.{' '}
          <span className="block font-editorial italic font-normal text-accent-orange">
            Building in the open.
          </span>
        </h2>
        <p className="mt-4 font-sans text-base text-ink-secondary max-w-xl">
          A continuous record of practical full-stack builds, distributed algorithms, mobile architecture experiments, and generative AI systems.
        </p>
      </div>

      {/* Editorial Timeline */}
      <div className="max-w-4xl mx-auto relative">
        {/* Central Vertical Spine Line */}
        <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-borderline-dark/20 hidden sm:block" />

        <div className="space-y-12">
          {JOURNEY_MILESTONES.map((milestone, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                  <div className="p-6 bg-white border-2 border-ink-primary rounded-3xl shadow-brutal hover:shadow-brutal-lg transition-all duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-md bg-accent-yellow border border-ink-primary/20 font-mono text-[11px] font-bold text-ink-primary">
                        {milestone.phase}
                      </span>
                      <span className="font-mono text-xs font-semibold text-ink-muted">
                        {milestone.year}
                      </span>
                    </div>

                    <h3 className="font-grotesk font-bold text-lg sm:text-xl text-ink-primary mb-1">
                      {milestone.title}
                    </h3>
                    <p className="font-grotesk text-xs sm:text-sm font-semibold text-accent-orange mb-3">
                      {milestone.subtitle}
                    </p>

                    <p className="font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed mb-4">
                      {milestone.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-borderline">
                      {milestone.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-bg-secondary text-ink-primary rounded font-mono text-[10px] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Empty opposite column for balanced spacing on desktop */}
                <div className="hidden sm:block w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>

    </section>
  );
};

