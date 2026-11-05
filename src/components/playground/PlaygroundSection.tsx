import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PLAYGROUND_STICKERS } from '../../data/skills';
import { soundManager } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, Move, RefreshCw, Laugh, Wand2 } from 'lucide-react';

export const PlaygroundSection: React.FC = () => {
  const [stickers, setStickers] = useState(PLAYGROUND_STICKERS);
  const [cheerCount, setCheerCount] = useState<number>(0);

  const handleConfetti = () => {
    soundManager.playCharacterReact('happy');
    setCheerCount((c) => c + 1);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#F47B35', '#F5D77E', '#171717', '#2DA44E']
    });
  };

  const handleResetStickers = () => {
    soundManager.playClick();
    setStickers([...PLAYGROUND_STICKERS]);
  };

  return (
    <section id="playground" className="relative py-24 md:py-36 px-4 sm:px-6 lg:px-8 bg-bg-primary overflow-hidden">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2.5 py-1 rounded bg-ink-primary text-white font-mono text-xs font-bold">
              04 / PLAYGROUND
            </span>
            <span className="font-grotesk text-xs uppercase tracking-wider text-ink-secondary">
              Tactile Experiments & Kinetic Interactions
            </span>
          </div>

          <h2 className="font-grotesk font-black text-4xl sm:text-6xl text-ink-primary tracking-tight leading-[0.95]">
            DIGITAL PLAYGROUND.{' '}
            <span className="block font-editorial italic font-normal text-accent-orange">
              Grab, drag & interact.
            </span>
          </h2>
          <p className="mt-3 font-sans text-sm sm:text-base text-ink-secondary max-w-xl">
            Software is meant to be felt. Drag the stickers anywhere inside the canvas, test the physics springs, or pop a celebration.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleConfetti}
            className="px-4 py-2.5 rounded-2xl bg-accent-yellow border-2 border-ink-primary shadow-brutal-sm font-grotesk text-xs font-bold text-ink-primary hover:bg-accent-orange hover:text-white transition-all flex items-center gap-1.5 active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Celebrate Build ({cheerCount})</span>
          </button>

          <button
            onClick={handleResetStickers}
            className="p-2.5 rounded-2xl bg-white border-2 border-ink-primary shadow-brutal-sm text-ink-primary hover:bg-bg-secondary transition-all active:scale-95"
            title="Reset Sticker Positions"
            aria-label="Reset Sticker Positions"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Drag Canvas Box */}
      <div className="relative max-w-7xl mx-auto min-h-[380px] sm:min-h-[440px] bg-white border-3 border-ink-primary rounded-3xl shadow-brutal-lg overflow-hidden p-6 select-none bg-[radial-gradient(#171717_1.2px,transparent_1.2px)] [background-size:20px_20px] opacity-95">
        
        {/* Helper Hint */}
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 bg-bg-primary/90 border border-borderline rounded-full text-xs font-grotesk text-ink-secondary pointer-events-none">
          <Move className="w-3.5 h-3.5 text-accent-orange animate-pulse" />
          <span>Drag stickers freely inside this interactive canvas</span>
        </div>

        {/* Peeking Navin Easter Egg in Canvas Corner */}
        <div className="absolute bottom-0 right-4 pointer-events-none w-36 sm:w-44 h-auto opacity-90">
          <img
            src="/assets/character/navin-peeking.png"
            alt="Navin peeking at the playground"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Draggable Stickers */}
        <div className="relative w-full h-full min-h-[340px]">
          {stickers.map((stk, index) => {
            const initialOffsets = [
              { x: 30, y: 50 },
              { x: 190, y: 70 },
              { x: 360, y: 40 },
              { x: 80, y: 180 },
              { x: 260, y: 190 },
              { x: 440, y: 170 },
              { x: 150, y: 260 },
              { x: 340, y: 270 },
            ];

            const pos = initialOffsets[index % initialOffsets.length];

            return (
              <motion.div
                key={stk.id}
                drag
                dragConstraints={{ left: 0, top: 0, right: 600, bottom: 260 }}
                dragElastic={0.2}
                whileDrag={{ scale: 1.12, rotate: stk.rotate * 1.5, zIndex: 40 }}
                whileHover={{ scale: 1.05 }}
                onDragStart={() => soundManager.playHover()}
                onDragEnd={() => soundManager.playClick()}
                data-cursor="drag"
                data-cursor-text="Drag ✋"
                initial={{ x: pos.x, y: pos.y, rotate: stk.rotate }}
                className="absolute cursor-grab active:cursor-grabbing px-4 py-2.5 rounded-2xl border-2 border-ink-primary shadow-brutal-sm font-grotesk font-bold text-xs sm:text-sm tracking-wide z-10 flex items-center gap-1.5 transition-shadow hover:shadow-brutal"
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

    </section>
  );
};
