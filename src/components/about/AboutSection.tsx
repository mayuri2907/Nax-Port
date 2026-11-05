import React from 'react';
import { motion } from 'framer-motion';
import { Headphones, Coffee, Code2, Sparkles, Heart, Compass } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-24 md:py-36 px-4 sm:px-6 lg:px-8 bg-bg-primary overflow-hidden">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2.5 py-1 rounded bg-ink-primary text-white font-mono text-xs font-bold">
            06 / ABOUT ME
          </span>
          <span className="font-grotesk text-xs uppercase tracking-wider text-ink-secondary">
            The Person Behind The Terminal
          </span>
        </div>

        <h2 className="font-grotesk font-black text-4xl sm:text-6xl text-ink-primary tracking-tight leading-[0.95]">
          ENGINEER. CREATIVE.{' '}
          <span className="block font-editorial italic font-normal text-accent-orange">
            Perpetual learner.
          </span>
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Visual Storytelling & Poses (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Illustration Card 1: Music & Creative Flow */}
          <motion.div
            whileHover={{ y: -4 }}
            onMouseEnter={() => soundManager.playHover()}
            className="p-6 bg-white border-2 border-ink-primary rounded-3xl shadow-brutal flex items-center gap-5"
          >
            <div className="w-28 h-24 rounded-2xl overflow-hidden bg-bg-secondary shrink-0 border border-ink-primary/20">
              <img
                src="/assets/character/navin-vibing.png"
                alt="Navin Chaudhary relaxing with headphones"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-mono text-xs text-accent-orange font-bold uppercase tracking-wider block mb-1">
                Music & Flow State
              </span>
              <h4 className="font-grotesk font-bold text-base text-ink-primary mb-1">
                Soundtracks & Synapses
              </h4>
              <p className="font-sans text-xs text-ink-secondary">
                Good software has a rhythm. Most of my cleanest architectures come alive with synthwave and lo-fi beats in my headphones.
              </p>
            </div>
          </motion.div>

          {/* Illustration Card 2: Deep Coding */}
          <motion.div
            whileHover={{ y: -4 }}
            onMouseEnter={() => soundManager.playHover()}
            className="p-6 bg-accent-yellow/20 border-2 border-ink-primary rounded-3xl shadow-brutal flex items-center gap-5"
          >
            <div className="w-28 h-24 rounded-2xl overflow-hidden bg-white shrink-0 border border-ink-primary/20">
              <img
                src="/assets/character/navin-coding.png"
                alt="Navin coding at workstation"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-mono text-xs text-ink-primary font-bold uppercase tracking-wider block mb-1">
                Craft & Endurance
              </span>
              <h4 className="font-grotesk font-bold text-base text-ink-primary mb-1">
                Zero Shortcut Mentality
              </h4>
              <p className="font-sans text-xs text-ink-secondary">
                I take pride in solving edge cases that others ignore: race conditions, offline sync, memory leaks, and accessible design.
              </p>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Editorial Bio (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-6 font-sans text-base sm:text-lg text-ink-secondary leading-relaxed">
          <p className="font-grotesk text-xl sm:text-2xl font-bold text-ink-primary leading-snug">
            "I build digital tools for the joy of bringing complex logic to life in ways that feel effortless to the human on the other side."
          </p>

          <p>
            My journey into software development started with unyielding curiosity: how do distributed networks 
            reconcile truth? How can an AI assistant comprehend intent beyond static keywords? How can a web page 
            feel as tactile as a physical notebook?
          </p>

          <p>
            Today, I work across the full engineering spectrum: designing intuitive frontends with React, TypeScript, 
            and fluid motion; architecting backend microservices and databases; building native Android apps with Kotlin; 
            and exploring multimodal intelligence via Gemini and LLM orchestration.
          </p>

          {/* Quick Facts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
            <div className="p-3 bg-white border border-borderline rounded-2xl">
              <span className="text-[11px] font-mono text-ink-muted uppercase block">Core Mindset</span>
              <span className="font-grotesk font-bold text-sm text-ink-primary">Curious & Relentless</span>
            </div>

            <div className="p-3 bg-white border border-borderline rounded-2xl">
              <span className="text-[11px] font-mono text-ink-muted uppercase block">Preferred Stack</span>
              <span className="font-grotesk font-bold text-sm text-ink-primary">TypeScript + Kotlin</span>
            </div>

            <div className="p-3 bg-white border border-borderline rounded-2xl">
              <span className="text-[11px] font-mono text-ink-muted uppercase block">Fuel</span>
              <span className="font-grotesk font-bold text-sm text-ink-primary">Hot Coffee & Audio</span>
            </div>
          </div>

          <div className="pt-4">
            <a
              href="#contact"
              onClick={() => soundManager.playClick()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-ink-primary text-white font-grotesk text-sm font-bold shadow-brutal hover:bg-accent-orange transition-colors"
            >
              <span>Get In Touch With Navin</span>
              <Sparkles className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>

    </section>
  );
};

