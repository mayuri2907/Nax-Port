import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { SKILLS, SKILL_CATEGORIES } from '../data/skills';
import { soundManager } from '../utils/audio';
import { Wrench, Star, Sparkles, ArrowRight, Code2 } from 'lucide-react';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredSkills = activeCategory === 'All'
    ? SKILLS
    : SKILLS.filter((s) => s.category === activeCategory);

  return (
    <PageTransition>
      <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Editorial Index Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-borderline">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-ink-primary text-white font-mono text-xs font-bold">
              PAGE / SKILLS
            </span>
            <span className="font-grotesk text-xs uppercase tracking-wider text-ink-secondary">
              Verified Technical Stack & Competencies
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-accent-yellow/40 border border-ink-primary/20 rounded-full font-grotesk text-xs text-ink-primary font-medium">
            <Sparkles className="w-3.5 h-3.5 text-accent-orange" />
            <span>Zero fake percentage bars — real engineering tools</span>
          </div>
        </div>

        {/* Master Heading & Vignette */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <h1 className="font-grotesk font-black text-4xl sm:text-6xl md:text-7xl text-ink-primary leading-[0.98] tracking-tight mb-4">
              TECHNICAL EXPERTISE.{' '}
              <span className="block font-editorial italic font-normal text-accent-orange">
                Engineered for speed & scale.
              </span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-ink-secondary max-w-xl">
              Languages, runtimes, distributed protocols, and AI integration pipelines used daily across full-stack and mobile environments.
            </p>
          </div>

          {/* Deep Work Character Vignette */}
          <div className="lg:col-span-4 flex items-center justify-start lg:justify-end">
            <div className="p-3.5 bg-white border-2 border-ink-primary rounded-2xl shadow-brutal-sm flex items-center gap-3">
              <div className="w-16 h-14 rounded-xl overflow-hidden bg-ink-primary/5 flex items-center justify-center shrink-0 border border-ink-primary/20">
                <img
                  src="/assets/character/navin-coding.png"
                  alt="Navin coding at workstation"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-grotesk font-bold text-xs text-ink-primary flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                  Engineering Flow
                </span>
                <span className="text-[11px] font-sans text-ink-secondary">
                  TypeScript, Kotlin & LLMs
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundManager.playClick();
                setActiveCategory(cat);
              }}
              className={`px-4 py-2 rounded-full font-grotesk text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-ink-primary text-white shadow-brutal-sm scale-102'
                  : 'bg-white text-ink-secondary border border-borderline hover:text-ink-primary hover:bg-bg-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Interactive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mb-16">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
              onMouseEnter={() => soundManager.playHover()}
              className="group relative p-4 sm:p-5 bg-white border-2 border-ink-primary rounded-2xl shadow-brutal-sm hover:shadow-brutal hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted">
                    {skill.category}
                  </span>
                  {skill.isFavorite && (
                    <Star className="w-3.5 h-3.5 text-accent-orange fill-accent-orange" />
                  )}
                </div>

                <h3 className="font-grotesk font-bold text-base sm:text-lg text-ink-primary group-hover:text-accent-orange transition-colors">
                  {skill.name}
                </h3>
              </div>

              <div className="mt-3 pt-2.5 border-t border-borderline">
                <p className="text-[11px] font-sans text-ink-secondary line-clamp-2 leading-tight">
                  {skill.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Applied In Projects Callout Banner */}
        <div className="p-8 bg-white border-2 border-ink-primary rounded-3xl shadow-brutal flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-accent-yellow border-2 border-ink-primary flex items-center justify-center shrink-0">
              <Wrench className="w-7 h-7 text-ink-primary" />
            </div>
            <div>
              <h4 className="font-grotesk font-bold text-lg text-ink-primary">
                Want to see these skills in actual production architectures?
              </h4>
              <p className="font-sans text-sm text-ink-secondary max-w-xl">
                Inspect AI SkillPath, NexusSync, PocketExpense, and Jarvis to see how these libraries and distributed patterns are applied.
              </p>
            </div>
          </div>

          <Link
            to="/projects"
            onClick={() => soundManager.playClick()}
            className="px-6 py-3 rounded-2xl bg-ink-primary text-white font-grotesk text-xs sm:text-sm font-bold shadow-brutal hover:bg-accent-orange transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <span>See Applied Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </PageTransition>
  );
};
