import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { CharacterStage } from '../components/character/CharacterStage';
import { PROJECTS } from '../data/projects';
import { SOCIAL_LINKS } from '../data/socialLinks';
import { soundManager } from '../utils/audio';
import { ArrowDown, ArrowUpRight, Sparkles, Terminal, Code2, ArrowRight, Layers, Cpu } from 'lucide-react';
import { WhatsappIcon, GithubIcon, InstagramIcon, LinkedinIcon } from '../components/common/SocialIcons';

export const Home: React.FC = () => {
  const featuredProjects = PROJECTS.slice(0, 2);

  return (
    <PageTransition>
      <div className="relative overflow-hidden">
        
        {/* ========================================== */}
        {/* HERO SECTION                               */}
        {/* ========================================== */}
        <section className="relative min-h-[calc(100vh-120px)] pt-8 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
          {/* Subtle background radial pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#171717_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          {/* Floating Pill Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="absolute top-8 left-8 md:left-24 hidden md:flex items-center gap-1.5 px-3 py-1 bg-accent-yellow border-2 border-ink-primary shadow-brutal-sm rounded-md font-grotesk font-bold text-xs select-none"
          >
            <Sparkles className="w-3.5 h-3.5 text-ink-primary" />
            <span>CREATIVE DEVELOPER</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 8 }}
            animate={{ opacity: 1, scale: 1, rotate: 6 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="absolute top-12 right-12 md:right-32 hidden lg:flex items-center gap-1.5 px-3 py-1 bg-white border-2 border-ink-primary shadow-brutal-sm rounded-md font-grotesk font-bold text-xs select-none"
          >
            <span className="w-2 h-2 rounded-full bg-accent-orange animate-ping" />
            <span>OPEN FOR INNOVATIVE WORK</span>
          </motion.div>

          <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Expressive Typography & Pitch (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-start z-10">
              
              {/* Identity Tag */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-wrap items-center gap-2 mb-4"
              >
                <div className="px-3 py-1 bg-ink-primary text-white font-grotesk text-xs uppercase tracking-widest font-bold rounded-md shadow-brutal-sm">
                  Navin Chaudhary
                </div>
                <div className="px-3 py-1 bg-bg-secondary border border-borderline font-grotesk text-xs text-ink-secondary rounded-md">
                  Software Developer • AI Enthusiast • Digital Builder
                </div>
              </motion.div>

              {/* Master Headline: Large Editorial Typography */}
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-grotesk font-extrabold text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-ink-primary leading-[0.98] mb-6"
              >
                NOT JUST <br className="hidden sm:inline" />
                <span className="relative inline-block">
                  <span className="relative z-10 text-ink-primary">WRITING CODE.</span>
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="absolute left-0 bottom-1 sm:bottom-2 h-3 sm:h-5 bg-accent-yellow/80 -z-10 rounded-sm -rotate-1"
                  />
                </span>
                <br />
                <span className="text-accent-orange">I BUILD</span>{' '}
                <span className="font-editorial italic font-normal text-ink-primary">experiences.</span>
              </motion.h1>

              {/* Supporting Statement */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="font-sans text-base sm:text-lg lg:text-xl text-ink-secondary max-w-xl mb-8 leading-relaxed"
              >
                Creative development, intelligent solutions, and digital experiences built with purpose.
                Turning complex full-stack logic and distributed systems into kinetic, memorable digital craft.
              </motion.p>

              {/* Page Navigation CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 mb-10"
              >
                <Link
                  to="/projects"
                  onClick={() => soundManager.playClick()}
                  className="px-6 py-3.5 rounded-2xl bg-ink-primary text-white font-grotesk text-sm sm:text-base font-bold tracking-wide border-2 border-ink-primary shadow-brutal hover:shadow-brutal-orange hover:bg-accent-orange hover:border-accent-orange transition-all duration-200 flex items-center gap-2 group"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/contact"
                  onClick={() => soundManager.playClick()}
                  className="px-6 py-3.5 rounded-2xl bg-white text-ink-primary font-grotesk text-sm sm:text-base font-bold tracking-wide border-2 border-ink-primary shadow-brutal hover:bg-accent-yellow transition-all duration-200 flex items-center gap-2 group"
                >
                  <span>Let's Talk</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </motion.div>

              {/* Verified Social Links Row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="flex items-center gap-3"
              >
                <span className="text-xs font-grotesk uppercase tracking-wider text-ink-muted">Connect:</span>
                
                <a
                  href={SOCIAL_LINKS.whatsapp.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="p-2.5 rounded-xl bg-white border border-borderline text-ink-primary hover:border-accent-green hover:text-accent-green hover:shadow-brutal-sm transition-all"
                  title="WhatsApp (+91 8155952384)"
                >
                  <WhatsappIcon className="w-4 h-4" />
                </a>

                <a
                  href={SOCIAL_LINKS.github.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="p-2.5 rounded-xl bg-white border border-borderline text-ink-primary hover:border-ink-primary hover:shadow-brutal-sm transition-all"
                  title="GitHub (@Nax46)"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>

                <a
                  href={SOCIAL_LINKS.instagram.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="p-2.5 rounded-xl bg-white border border-borderline text-ink-primary hover:border-pink-500 hover:text-pink-600 hover:shadow-brutal-sm transition-all"
                  title="Instagram (@astralxxixnax)"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>

                <a
                  href={SOCIAL_LINKS.linkedin.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="p-2.5 rounded-xl bg-white border border-borderline text-ink-primary hover:border-blue-600 hover:text-blue-600 hover:shadow-brutal-sm transition-all"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </motion.div>
            </div>

            {/* Right Column: Real-Time Animated Character Rig (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative overflow-visible">
              <CharacterStage />
            </div>

          </div>

          {/* Quick Technical Overview Ticker */}
          <div className="max-w-7xl mx-auto w-full mt-12 pt-6 border-t border-borderline flex flex-wrap items-center justify-between gap-4 text-xs font-grotesk text-ink-secondary">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-accent-orange" />
                <span className="text-ink-primary font-bold">Primary Stack:</span>
                <span>React, TypeScript, Kotlin, Python, Node.js</span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-accent-green" />
                <span className="text-ink-primary font-bold">Focus:</span>
                <span>Distributed Systems & Interactive AI</span>
              </div>
            </div>

            <Link
              to="/about"
              onClick={() => soundManager.playHover()}
              className="flex items-center gap-1 text-ink-primary hover:text-accent-orange font-medium transition-colors"
            >
              <span>Learn more about Navin</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* ========================================== */}
        {/* FEATURED WORK PREVIEW SECTION              */}
        {/* ========================================== */}
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-bg-secondary/40 border-t border-borderline">
          <div className="max-w-7xl mx-auto mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <span className="px-2.5 py-1 rounded bg-ink-primary text-white font-mono text-xs font-bold block w-fit mb-3">
                FEATURED WORK
              </span>
              <h2 className="font-grotesk font-black text-3xl sm:text-5xl text-ink-primary tracking-tight">
                SELECTED BUILDS.{' '}
                <span className="font-editorial italic font-normal text-accent-orange">
                  Engineered with depth.
                </span>
              </h2>
            </div>

            <Link
              to="/projects"
              onClick={() => soundManager.playClick()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border-2 border-ink-primary shadow-brutal font-grotesk text-xs font-bold text-ink-primary hover:bg-accent-yellow transition-all w-fit"
            >
              <span>View All 4 Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 2 Featured Project Cards */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((p) => (
              <div
                key={p.id}
                className="p-6 sm:p-8 bg-white border-2 border-ink-primary rounded-3xl shadow-brutal flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full bg-bg-secondary font-mono text-xs font-bold text-ink-primary">
                      {p.badge}
                    </span>
                    <span className="font-mono text-xs text-ink-muted">{p.year}</span>
                  </div>

                  <h3 className="font-grotesk font-extrabold text-2xl sm:text-3xl text-ink-primary mb-2">
                    {p.title}
                  </h3>
                  <p className="font-grotesk text-xs sm:text-sm font-medium text-accent-orange mb-3">
                    {p.subtitle}
                  </p>
                  <p className="font-sans text-sm text-ink-secondary leading-relaxed mb-6">
                    {p.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-borderline flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {p.techStack.slice(0, 3).map((t) => (
                      <span key={t} className="px-2.5 py-0.5 bg-bg-secondary text-ink-primary rounded text-xs font-mono">
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/projects"
                    onClick={() => soundManager.playClick()}
                    className="text-xs font-grotesk font-bold text-ink-primary hover:text-accent-orange flex items-center gap-1 transition-colors"
                  >
                    <span>Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================== */}
        {/* QUICK CTA CALLOUT                          */}
        {/* ========================================== */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-ink-primary text-white text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <h3 className="font-grotesk font-black text-2xl sm:text-4xl mb-4">
              HAVE A VISION FOR A DIGITAL PRODUCT?
            </h3>
            <p className="font-sans text-sm sm:text-base text-zinc-300 mb-8 max-w-xl">
              Let's connect and discuss building a high-performance system, intuitive interface, or experimental application.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                onClick={() => soundManager.playClick()}
                className="px-6 py-3 rounded-2xl bg-accent-orange text-white font-grotesk text-sm font-bold shadow-brutal hover:bg-white hover:text-ink-primary transition-all flex items-center gap-2"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/skills"
                onClick={() => soundManager.playHover()}
                className="px-6 py-3 rounded-2xl bg-transparent border border-zinc-600 text-white font-grotesk text-sm font-semibold hover:border-white transition-all"
              >
                Inspect Technical Stack ↗
              </Link>
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

