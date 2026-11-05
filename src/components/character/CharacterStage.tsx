import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCharacterEngine, CharacterMood, CHARACTER_SPRITES } from '../../hooks/useCharacterEngine';
import { Sparkles, Heart, Zap, Coffee, Volume2, AlertCircle } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface CharacterStageProps {
  size?: 'hero' | 'compact' | 'mini';
  showControls?: boolean;
}

export const CharacterStage: React.FC<CharacterStageProps> = ({
  size = 'hero',
  showControls = true
}) => {
  const {
    mood,
    setCustomMood,
    dialogue,
    clickCount,
    eyeOffset,
    headTilt,
    characterRef,
    handleCharacterClick,
    handleMouseEnter,
    handleMouseLeave
  } = useCharacterEngine();

  const isHero = size === 'hero';
  const isCompact = size === 'compact';

  const moodsList: { id: CharacterMood; label: string; emoji: string }[] = [
    { id: 'idle', label: 'Idle', emoji: '☕' },
    { id: 'looking', label: 'Looking', emoji: '👀' },
    { id: 'curious', label: 'Curious', emoji: '🤔' },
    { id: 'happy', label: 'Happy', emoji: '✨' },
    { id: 'focused', label: 'Focused', emoji: '🕶️' },
    { id: 'wink', label: 'Wink', emoji: '😉' },
    { id: 'surprised', label: 'Surprised', emoji: '😲' },
    { id: 'annoyed', label: 'Annoyed', emoji: '😑' },
    { id: 'angry', label: 'Angry', emoji: '💢' },
    { id: 'bored', label: 'Bored', emoji: '😴' },
  ];

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Dynamic Comic Speech Bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={dialogue}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative mb-3 z-20 max-w-xs md:max-w-sm px-4 py-2.5 bg-white text-ink-primary border-2 border-ink-primary shadow-brutal rounded-2xl text-xs md:text-sm font-grotesk font-medium text-center"
        >
          {/* Bubble Tail */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-ink-primary transform rotate-45" />

          {/* Dialogue Content */}
          <div className="relative z-10 flex items-center justify-center gap-1.5">
            {mood === 'angry' && <span className="text-red-500 font-bold">💢</span>}
            {mood === 'happy' && <Sparkles className="w-3.5 h-3.5 text-accent-orange inline-block" />}
            {mood === 'focused' && <Zap className="w-3.5 h-3.5 text-amber-500 inline-block" />}
            <span>{dialogue}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Main Interactive Character Stage */}
      <div
        ref={characterRef}
        data-cursor="character"
        data-cursor-text="Poke Navin 👉"
        onClick={handleCharacterClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative cursor-pointer transition-transform duration-150 active:scale-95 group ${
          isHero ? 'w-64 h-64 md:w-80 md:h-80' : isCompact ? 'w-48 h-48' : 'w-36 h-36'
        }`}
        style={{
          perspective: 800,
        }}
      >
        {/* Animated Background Aura */}
        <div
          className={`absolute inset-0 rounded-3xl bg-accent-yellow/40 filter blur-xl transition-all duration-300 ${
            mood === 'angry'
              ? 'bg-red-400/40'
              : mood === 'happy'
              ? 'bg-accent-orange/30'
              : 'bg-accent-yellow/40'
          }`}
        />

        {/* Framing Card with Brutalist Shadow */}
        <motion.div
          className="relative w-full h-full rounded-3xl bg-white border-3 border-ink-primary shadow-brutal-lg overflow-hidden flex items-center justify-center bg-gradient-to-b from-[#FFFDF9] to-[#F2EDE2]"
          animate={{
            rotateX: headTilt.rotateX,
            rotateY: headTilt.rotateY,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 200, mass: 0.2 }}
        >
          {/* Subtle Grid Lines inside card */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#171717_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Character Sprite Image */}
          <motion.div
            className="relative w-4/5 h-4/5 flex items-center justify-center"
            animate={{
              y: mood === 'bored' || mood === 'sleeping' ? 4 : [0, -3, 0],
            }}
            transition={{
              duration: mood === 'bored' ? 4 : 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <img
              src={CHARACTER_SPRITES[mood] || CHARACTER_SPRITES.idle}
              alt={`Navin Chaudhary - ${mood} expression`}
              className="w-full h-full object-contain filter drop-shadow-md transition-all duration-200"
              draggable={false}
            />

            {/* Dynamic Eye Pupil Overlay in Looking/Idle State */}
            {(mood === 'idle' || mood === 'looking') && (
              <motion.div
                className="absolute pointer-events-none inset-0 flex items-center justify-center"
                animate={{
                  x: eyeOffset.x * 0.75,
                  y: eyeOffset.y * 0.75,
                }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              >
                {/* Visual indicator of gaze */}
                <div className="w-1.5 h-1.5 rounded-full bg-accent-orange/0" />
              </motion.div>
            )}

            {/* Emotion Floating Badges (Anime style) */}
            {mood === 'angry' && (
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: [1, 1.25, 1], rotate: [0, 10, -5, 0] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                className="absolute top-2 right-4 text-2xl font-bold text-red-500"
              >
                💢
              </motion.div>
            )}

            {mood === 'surprised' && (
              <motion.div
                initial={{ scale: 0, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                className="absolute top-2 right-6 text-2xl font-bold text-accent-orange"
              >
                ❗
              </motion.div>
            )}

            {mood === 'confused' && (
              <motion.div
                initial={{ scale: 0, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                className="absolute top-2 right-6 text-2xl font-bold text-amber-500"
              >
                ❓
              </motion.div>
            )}

            {(mood === 'bored' || mood === 'sleeping') && (
              <motion.div
                animate={{ y: [-5, -25], opacity: [0, 1, 0], x: [0, 10] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                className="absolute top-3 right-6 text-sm font-bold text-ink-secondary"
              >
                z z Z
              </motion.div>
            )}
          </motion.div>

          {/* Interactive Poke Counter Indicator */}
          {clickCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-3 left-3 px-2 py-0.5 bg-ink-primary text-white rounded-full text-[10px] font-grotesk font-semibold tracking-wider flex items-center gap-1 shadow-brutal-sm"
            >
              <span>{clickCount >= 6 ? 'RAGE!' : clickCount >= 3 ? 'ANNOYED' : 'POKED'}</span>
              <span className="text-accent-orange font-bold">x{clickCount}</span>
            </motion.div>
          )}

          {/* Character Label Tag */}
          <div className="absolute bottom-2.5 right-3 px-2 py-0.5 bg-bg-primary/90 border border-ink-primary/20 rounded-md text-[10px] font-grotesk font-medium text-ink-secondary flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
            <span>Interactive Avatar</span>
          </div>
        </motion.div>
      </div>

      {/* Mood Selector Strip */}
      {showControls && (
        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="text-[11px] font-grotesk uppercase tracking-wider text-ink-secondary flex items-center gap-1.5">
            <span>Live Expression Engine</span>
            <span className="text-accent-orange">•</span>
            <span className="italic">Click character or switch mood</span>
          </div>

          <div className="flex flex-wrap justify-center gap-1.5 max-w-sm md:max-w-md p-1.5 bg-white/70 backdrop-blur-sm border border-borderline rounded-2xl shadow-brutal-sm">
            {moodsList.map((m) => {
              const active = mood === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setCustomMood(m.id);
                    soundManager.playClick();
                  }}
                  className={`px-2.5 py-1 text-xs rounded-xl font-grotesk font-medium transition-all duration-150 flex items-center gap-1 ${
                    active
                      ? 'bg-ink-primary text-white shadow-brutal-sm scale-105'
                      : 'bg-bg-secondary/60 text-ink-primary hover:bg-bg-secondary hover:scale-102'
                  }`}
                  aria-label={`Switch character mood to ${m.label}`}
                >
                  <span>{m.emoji}</span>
                  <span className="hidden sm:inline">{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
