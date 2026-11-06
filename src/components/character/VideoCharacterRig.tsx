import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideoCharacterController } from '../../hooks/useVideoCharacterController';
import { Sparkles } from 'lucide-react';

export const VideoCharacterRig: React.FC = () => {
  const {
    activeState,
    videoRef,
    containerRef,
    speechMessage,
    headRotateX,
    headRotateY,
    isVideoReady,
    handleCharacterClick,
    handleMouseEnter,
    handleMouseLeave,
  } = useVideoCharacterController();

  return (
    <div className="relative flex flex-col items-center select-none overflow-visible">
      {/* Speech / Dialogue Bubble (Floating above Navin) */}
      <AnimatePresence>
        {speechMessage && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 420, damping: 25 }}
            className="absolute -top-16 sm:-top-20 z-40 px-4 py-2.5 bg-white text-ink-primary border-2 border-ink-primary shadow-brutal rounded-2xl text-xs md:text-sm font-grotesk font-bold text-center max-w-xs pointer-events-none"
          >
            <div className="flex items-center justify-center gap-1.5">
              {activeState === 'angry' && <span className="text-red-500 font-bold">💢</span>}
              {activeState === 'annoyed' && <span>💧</span>}
              {activeState === 'happy' && <Sparkles className="w-3.5 h-3.5 text-accent-orange" />}
              {activeState === 'playful' && <span>🕶️</span>}
              {activeState === 'surprised' && <span className="text-accent-orange font-black">!</span>}
              <span>{speechMessage}</span>
            </div>
            {/* Pointer arrow tail */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-r-2 border-b-2 border-ink-primary transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Continuous Video Character Canvas with 3D Tilt */}
      <motion.div
        ref={containerRef}
        onClick={handleCharacterClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-cursor="hover"
        animate={{
          rotateX: headRotateX,
          rotateY: headRotateY,
          x: activeState === 'angry' ? [-2, 2, -2, 2, 0] : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 22,
          mass: 0.15,
        }}
        style={{
          perspective: 1200,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-72 sm:w-88 md:w-[420px] lg:w-[460px] aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer group border-2 border-ink-primary/10 shadow-brutal hover:shadow-brutal-orange transition-shadow duration-300 bg-[#F6F2EA]"
      >
        {/* HTML5 Continuous Character Video */}
        <video
          ref={videoRef}
          src="/assets/character/navin-character.mp4"
          poster="/assets/character/navin-official.png"
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isVideoReady ? 1 : 0.95,
          }}
        />

        {/* Soft Ambient Radial Vignette for Editorial Depth */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-bg-primary/20 via-transparent to-transparent" />
      </motion.div>
    </div>
  );
};
