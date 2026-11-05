import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SKILLS, SKILL_CATEGORIES } from '../../data/skills';
import { soundManager } from '../../utils/audio';
import { Terminal, Layers, Star, Sparkles, Code2, Wrench } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredSkills = activeCategory === 'All'
    ? SKILLS
    : SKILLS.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-24 md:py-36 px-4 sm:px-6 lg:px-8 bg-bg-secondary/40 border-t border-borderline overflow-hidden">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2.5 py-1 rounded bg-ink-primary text-white font-mono text-xs font-bold">
            03 / EXPERTISE
          </span>
          <span className="font-grotesk text-xs uppercase tracking-wider text-ink-secondary">
            Verified Technical Stack & Competencies
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h2 className="font-grotesk font-black text-4xl sm:text-6xl text-ink-primary tracking-tight leading-[0.95]">
              ENGINEERING TOOLS.{' '}
              <span className="block font-editorial italic font-normal text-accent-orange">
                Crafted for scale & speed.
              </span>
            </h2>
            <p className="mt-4 font-sans text-base text-ink-secondary max-w-xl">
              I don't believe in arbitrary percentage bars. These are the tools, languages, and distributed architectures I use daily to solve problems, write tests, and deploy reliable systems.
            </p>
          </div>

          {/* Deep Work Character Vignette */}
          <div className="lg:col-span-4 flex items-center justify-end">
            <div className="p-3 bg-white border-2 border-ink-primary rounded-2xl shadow-brutal-sm flex items-center gap-3">
              <div className="w-16 h-12 rounded-lg overflow-hidden bg-ink-primary/5 flex items-center justify-center">
                <img
                  src="/assets/character/navin-coding.png"
                  alt="Navin coding in deep flow"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-grotesk font-bold text-xs text-ink-primary flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                  Deep Engineering Mode
                </span>
                <span className="text-[11px] font-sans text-ink-secondary">
                  Writing clean TypeScript & Kotlin
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap gap-2">
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundManager.playClick();
                setActiveCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-full font-grotesk text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-ink-primary text-white shadow-brutal-sm scale-102'
                  : 'bg-white text-ink-secondary border border-borderline hover:text-ink-primary hover:bg-bg-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Interactive Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.02 }}
            onMouseEnter={() => soundManager.playHover()}
            className="group relative p-4 bg-white border-2 border-ink-primary rounded-2xl shadow-brutal-sm hover:shadow-brutal hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted">
                  {skill.category}
                </span>
                {skill.isFavorite && (
                  <Star className="w-3 h-3 text-accent-orange fill-accent-orange" />
                )}
              </div>

              <h3 className="font-grotesk font-bold text-base sm:text-lg text-ink-primary group-hover:text-accent-orange transition-colors">
                {skill.name}
              </h3>
            </div>

            <div className="mt-3 pt-2 border-t border-borderline">
              <p className="text-[11px] font-sans text-ink-secondary line-clamp-2 leading-tight">
                {skill.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stack Summary Banner */}
      <div className="max-w-7xl mx-auto mt-12 p-6 bg-white border-2 border-ink-primary rounded-3xl shadow-brutal flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-accent-yellow border-2 border-ink-primary flex items-center justify-center shrink-0">
            <Wrench className="w-6 h-6 text-ink-primary" />
          </div>
          <div>
            <h4 className="font-grotesk font-bold text-base text-ink-primary">
              Always expanding the engineering frontier
            </h4>
            <p className="font-sans text-xs sm:text-sm text-ink-secondary">
              Continuously benchmarking distributed protocols, Gemini API reasoning chains, and cross-platform native abstractions.
            </p>
          </div>
        </div>

        <a
          href="#projects"
          onClick={() => soundManager.playClick()}
          className="px-5 py-2.5 rounded-xl bg-ink-primary text-white font-grotesk text-xs font-bold shadow-brutal-sm hover:bg-accent-orange transition-colors whitespace-nowrap"
        >
          See Applied In Projects ↗
        </a>
      </div>

    </section>
  );
};

