import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { PLAYGROUND_STICKERS } from '../data/skills';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Move, RefreshCw, Volume2, Wand2, Terminal } from 'lucide-react';

export const Experiments: React.FC = () => {
  const [stickers, setStickers] = useState(PLAYGROUND_STICKERS);
  const [cheerCount, setCheerCount] = useState<number>(0);
  const [activeFrequency, setActiveFrequency] = useState<number | null>(null);

  const handleConfetti = () => {
    soundManager.playCharacterReact('happy');
    setCheerCount((c) => c + 1);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.65 },
      colors: ['#F47B35', '#F5D77E', '#171717', '#2DA44E']
    });
  };

  const handleResetStickers = () => {
    soundManager.playClick();
    setStickers([...PLAYGROUND_STICKERS]);
  };

  const soundFrequencies = [
    { label: 'C5 (523Hz)', freq: 523, wave: 'sine' as OscillatorType },
    { label: 'D5 (587Hz)', freq: 587, wave: 'sine' as OscillatorType },
    { label: 'E5 (659Hz)', freq: 659, wave: 'sine' as OscillatorType },
    { label: 'G5 (784Hz)', freq: 784, wave: 'sine' as OscillatorType },
    { label: 'A5 (880Hz)', freq: 880, wave: 'sine' as OscillatorType },
    { label: 'Bass Click', freq: 160, wave: 'triangle' as OscillatorType },
  ];

  const playCustomFreq = (freq: number, wave: OscillatorType) => {
    setActiveFrequency(freq);
    soundManager.playBlip(freq, wave, 0.12);
    setTimeout(() => setActiveFrequency(null), 200);
  };

  return (
    <PageTransition>
      <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Editorial Index Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-borderline">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-ink-primary text-white font-mono text-xs font-bold">
              PAGE / EXPERIMENTS
            </span>
            <span className="font-grotesk text-xs uppercase tracking-wider text-ink-secondary">
              Digital Playground & Creative Code Sandbox
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-accent-yellow/40 border border-ink-primary/20 rounded-full font-grotesk text-xs text-ink-primary font-medium">
            <Wand2 className="w-3.5 h-3.5 text-accent-orange" />
            <span>Interactive sandbox with physics & Web Audio</span>
          </div>
        </div>

        {/* Master Heading & Controls */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-grotesk font-black text-4xl sm:text-6xl md:text-7xl text-ink-primary leading-[0.98] tracking-tight mb-4">
              PLAYGROUND.{' '}
              <span className="block font-editorial italic font-normal text-accent-orange">
                Grab, drag & interact.
              </span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-ink-secondary max-w-xl">
              Software is meant to be felt. Drag the stickers anywhere inside the canvas, test the physics springs, or pop a celebration.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleConfetti}
              className="px-5 py-3 rounded-2xl bg-accent-yellow border-2 border-ink-primary shadow-brutal-sm font-grotesk text-xs sm:text-sm font-bold text-ink-primary hover:bg-accent-orange hover:text-white transition-all flex items-center gap-2 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Celebrate Build ({cheerCount})</span>
            </button>

            <button
              onClick={handleResetStickers}
              className="p-3 rounded-2xl bg-white border-2 border-ink-primary shadow-brutal-sm text-ink-primary hover:bg-bg-secondary transition-all active:scale-95"
              title="Reset Sticker Positions"
              aria-label="Reset Sticker Positions"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Drag Canvas Box */}
        <div className="relative min-h-[440px] sm:min-h-[500px] bg-white border-3 border-ink-primary rounded-3xl shadow-brutal-lg overflow-hidden p-6 select-none bg-[radial-gradient(#171717_1.2px,transparent_1.2px)] [background-size:20px_20px] mb-16">
          
          {/* Helper Hint */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3.5 py-1.5 bg-bg-primary/90 border border-borderline rounded-full text-xs font-grotesk text-ink-secondary pointer-events-none z-20">
            <Move className="w-3.5 h-3.5 text-accent-orange animate-pulse" />
            <span>Drag stickers freely inside this interactive canvas</span>
          </div>

          {/* Peeking Navin Easter Egg in Canvas Corner */}
          <div className="absolute bottom-0 right-4 pointer-events-none w-36 sm:w-52 h-auto opacity-95 z-0">
            <img
              src="/assets/character/navin-peeking.png"
              alt="Navin peeking at the playground"
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Draggable Stickers */}
          <div className="relative w-full h-full min-h-[400px]">
            {stickers.map((stk, index) => {
              const initialOffsets = [
                { x: 30, y: 60 },
                { x: 220, y: 80 },
                { x: 420, y: 50 },
                { x: 620, y: 90 },
                { x: 90, y: 200 },
                { x: 310, y: 220 },
                { x: 540, y: 190 },
                { x: 180, y: 320 },
              ];

              const pos = initialOffsets[index % initialOffsets.length];

              return (
                <motion.div
                  key={stk.id}
                  drag
                  dragConstraints={{ left: 0, top: 0, right: 680, bottom: 320 }}
                  dragElastic={0.2}
                  whileDrag={{ scale: 1.12, rotate: stk.rotate * 1.5, zIndex: 40 }}
                  whileHover={{ scale: 1.05 }}
                  onDragStart={() => soundManager.playHover()}
                  onDragEnd={() => soundManager.playClick()}
                  data-cursor="drag"
                  data-cursor-text="Drag ✋"
                  initial={{ x: pos.x, y: pos.y, rotate: stk.rotate }}
                  className="absolute cursor-grab active:cursor-grabbing px-5 py-3 rounded-2xl border-2 border-ink-primary shadow-brutal-sm font-grotesk font-bold text-sm tracking-wide z-10 flex items-center gap-2 transition-shadow hover:shadow-brutal"
                  style={{
                    backgroundColor: stk.color,
                    color: stk.text,
                  }}
                >
                  <span>{stk.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Experiment 2: Procedural Web Audio Synthesizer */}
        <div className="p-8 bg-white border-2 border-ink-primary rounded-3xl shadow-brutal">
          <div className="flex items-center gap-2 mb-2">
            <Volume2 className="w-5 h-5 text-accent-orange" />
            <span className="font-mono text-xs font-bold text-ink-muted uppercase">Interactive Audio Module</span>
          </div>
          <h3 className="font-grotesk font-black text-2xl sm:text-3xl text-ink-primary mb-2">
            Procedural Web Audio Engine
          </h3>
          <p className="font-sans text-sm text-ink-secondary mb-6 max-w-xl">
            Zero external sound files. Click the keys below to synthesize pure harmonic sine and triangle waves in real time via the browser's native AudioContext.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {soundFrequencies.map((s) => (
              <button
                key={s.label}
                onClick={() => playCustomFreq(s.freq, s.wave)}
                className={`p-4 rounded-2xl border-2 border-ink-primary text-center font-grotesk font-bold text-xs transition-all ${
                  activeFrequency === s.freq
                    ? 'bg-accent-orange text-white scale-105 shadow-brutal-sm'
                    : 'bg-bg-primary text-ink-primary shadow-brutal-sm hover:bg-accent-yellow active:scale-95'
                }`}
              >
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </PageTransition>
  );
};

