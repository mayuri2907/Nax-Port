import React from 'react';
import { motion } from 'framer-motion';
import { CharacterStage } from '../character/CharacterStage';
import { SOCIAL_LINKS } from '../../data/socialLinks';
import { ArrowDown, ArrowUpRight, Sparkles, Code2, Terminal, Mail } from 'lucide-react';
import { GithubIcon, InstagramIcon, LinkedinIcon, WhatsappIcon } from '../common/SocialIcons';
import { soundManager } from '../../utils/audio';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 px-4 sm:px-6 lg:px-8 flex flex-col justify-between overflow-hidden">
      {/* Background Subtle Editorial Grid / Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(#171717_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      {/* Floating Decorative Hand-Drawn / Sticker Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: -8 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="absolute top-24 left-8 md:left-24 hidden md:flex items-center gap-1.5 px-3 py-1 bg-accent-yellow border-2 border-ink-primary shadow-brutal-sm rounded-md font-grotesk font-bold text-xs -rotate-6 select-none"
      >
        <Sparkles className="w-3.5 h-3.5 text-ink-primary" />
        <span>CREATIVE DEVELOPER</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: 12 }}
        animate={{ opacity: 1, scale: 1, rotate: 6 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="absolute top-28 right-12 md:right-32 hidden lg:flex items-center gap-1.5 px-3 py-1 bg-white border-2 border-ink-primary shadow-brutal-sm rounded-md font-grotesk font-bold text-xs select-none"
      >
        <span className="w-2 h-2 rounded-full bg-accent-orange animate-ping" />
        <span>AVAILABLE FOR PROJECTS</span>
      </motion.div>

      {/* Main Hero Container */}
      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Expressive Typography & Pitch (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-start z-10">
          
          {/* Identity Tag & Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-grotesk font-extrabold text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-ink-primary leading-[0.98] mb-6"
          >
            NOT JUST <br className="hidden sm:inline" />
            <span className="relative inline-block">
              <span className="relative z-10 text-ink-primary">WRITING CODE.</span>
              {/* Marker underline highlight */}
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute left-0 bottom-1 sm:bottom-2 h-3 sm:h-5 bg-accent-yellow/80 -z-10 rounded-sm -rotate-1"
              />
            </span>
            <br />
            <span className="text-accent-orange">I BUILD</span>{' '}
            <span className="font-editorial italic font-normal text-ink-primary">experiences.</span>
          </motion.h1>

          {/* Supporting Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-sans text-base sm:text-lg lg:text-xl text-ink-secondary max-w-xl mb-8 leading-relaxed"
          >
            Creative development, intelligent solutions, and digital experiences built with purpose.
            Bridging technical precision, dynamic motion, and human personality.
          </motion.p>

          {/* CTAs and Interaction Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <a
              href="#projects"
              onClick={() => soundManager.playClick()}
              data-cursor="hover"
              className="px-6 py-3.5 rounded-2xl bg-ink-primary text-white font-grotesk text-sm sm:text-base font-bold tracking-wide border-2 border-ink-primary shadow-brutal hover:shadow-brutal-orange hover:bg-accent-orange hover:border-accent-orange transition-all duration-200 flex items-center gap-2 group"
            >
              <span>View Selected Work</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a>

            <a
              href="#contact"
              onClick={() => soundManager.playClick()}
              data-cursor="hover"
              className="px-6 py-3.5 rounded-2xl bg-white text-ink-primary font-grotesk text-sm sm:text-base font-bold tracking-wide border-2 border-ink-primary shadow-brutal hover:bg-accent-yellow transition-all duration-200 flex items-center gap-2 group"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

          {/* Verified Social Links Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-3"
          >
            <span className="text-xs font-grotesk uppercase tracking-wider text-ink-muted">Connect:</span>
            
            {/* WhatsApp */}
            <a
              href={SOCIAL_LINKS.whatsapp.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundManager.playClick()}
              aria-label={SOCIAL_LINKS.whatsapp.ariaLabel}
              className="p-2.5 rounded-xl bg-white border border-borderline text-ink-primary hover:border-accent-green hover:text-accent-green hover:shadow-brutal-sm transition-all"
              title="Chat on WhatsApp (+91 8155952384)"
            >
              <WhatsappIcon className="w-4 h-4" />
            </a>

            {/* GitHub */}
            <a
              href={SOCIAL_LINKS.github.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundManager.playClick()}
              aria-label={SOCIAL_LINKS.github.ariaLabel}
              className="p-2.5 rounded-xl bg-white border border-borderline text-ink-primary hover:border-ink-primary hover:shadow-brutal-sm transition-all"
              title="GitHub (@Nax46)"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            {/* Instagram */}
            <a
              href={SOCIAL_LINKS.instagram.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundManager.playClick()}
              aria-label={SOCIAL_LINKS.instagram.ariaLabel}
              className="p-2.5 rounded-xl bg-white border border-borderline text-ink-primary hover:border-pink-500 hover:text-pink-600 hover:shadow-brutal-sm transition-all"
              title="Instagram (@astralxxixnax)"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            {/* LinkedIn */}
            <a
              href={SOCIAL_LINKS.linkedin.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundManager.playClick()}
              aria-label={SOCIAL_LINKS.linkedin.ariaLabel}
              className="p-2.5 rounded-xl bg-white border border-borderline text-ink-primary hover:border-blue-600 hover:text-blue-600 hover:shadow-brutal-sm transition-all"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            {/* Email */}
            <a
              href={SOCIAL_LINKS.email.url}
              onClick={() => soundManager.playClick()}
              aria-label={SOCIAL_LINKS.email.ariaLabel}
              className="p-2.5 rounded-xl bg-white border border-borderline text-ink-primary hover:border-accent-orange hover:text-accent-orange hover:shadow-brutal-sm transition-all"
              title="Send an Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Right Column: Custom Anime Character Interaction Stage (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          
          {/* Hand-drawn Arrow Callout */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="hidden sm:flex items-center gap-2 mb-2 font-grotesk text-xs font-bold text-accent-orange uppercase tracking-wider"
          >
            <span>👉 Move cursor or poke Navin!</span>
          </motion.div>

          {/* Interactive Character Stage with Eye Tracking & Mood Engine */}
          <CharacterStage size="hero" showControls={true} />

          {/* Handwritten Tag underneath */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs font-mono text-ink-secondary">NAVIN_CHAUDHARY.avatar_v2</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
            <span className="text-xs font-mono text-ink-secondary">60 FPS Real-time</span>
          </div>
        </div>
      </div>

      {/* Bottom Ticker / Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="max-w-7xl mx-auto w-full mt-12 pt-6 border-t border-borderline flex flex-wrap items-center justify-between gap-4 text-xs font-grotesk text-ink-secondary"
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-accent-orange" />
            <span className="text-ink-primary font-bold">Stack:</span>
            <span>React, TypeScript, Kotlin, Python, Node.js</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Code2 className="w-3.5 h-3.5 text-accent-green" />
            <span className="text-ink-primary font-bold">Focus:</span>
            <span>Distributed Systems & Interactive AI</span>
          </div>
        </div>

        <a
          href="#manifesto"
          onClick={() => soundManager.playHover()}
          className="flex items-center gap-1 text-ink-primary hover:text-accent-orange font-medium transition-colors"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};
