import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursorTracking } from '../../hooks/useCursorTracking';

export const CustomCursor: React.FC = () => {
  const { position, variant, cursorText, isClicked, isVisible, isTouchDevice } = useCursorTracking();

  if (isTouchDevice || !isVisible) {
    return null;
  }

  // Determine cursor styles based on variant
  const isProject = variant === 'project';
  const isCharacter = variant === 'character';
  const isHover = variant === 'hover';
  const isDrag = variant === 'drag';

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Follower Ring / Pill */}
      <motion.div
        className={`fixed left-0 top-0 flex items-center justify-center font-grotesk font-semibold text-xs transition-colors duration-200 ${
          isProject
            ? 'h-10 px-4 bg-ink-primary text-white border border-accent-orange shadow-brutal-sm rounded-full'
            : isCharacter
            ? 'h-9 px-3 bg-accent-orange text-white rounded-full shadow-brutal-sm'
            : isDrag
            ? 'h-9 px-3 bg-accent-yellow text-ink-primary rounded-full shadow-brutal-sm'
            : isHover
            ? 'w-12 h-12 rounded-full border-2 border-accent-orange bg-accent-orange/15'
            : 'w-8 h-8 rounded-full border border-ink-primary/40 bg-ink-primary/5'
        }`}
        animate={{
          x: position.x,
          y: position.y,
          translateX: isProject || isCharacter || isDrag ? '-50%' : '-50%',
          translateY: isProject || isCharacter || isDrag ? '-50%' : '-50%',
          scale: isClicked ? 0.88 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 380,
          mass: 0.25,
        }}
      >
        <AnimatePresence mode="wait">
          {(isProject || isCharacter || isDrag || cursorText) && (
            <motion.span
              key={cursorText || variant}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="whitespace-nowrap tracking-wider uppercase text-[10px]"
            >
              {cursorText || (isProject ? 'View Project ↗' : isCharacter ? 'Poke Navin 👉' : isDrag ? 'Drag Me ✋' : '')}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Tiny Core Pointer Dot */}
      {!isProject && !isCharacter && !isDrag && (
        <motion.div
          className={`fixed left-0 top-0 rounded-full ${
            isHover ? 'w-2 h-2 bg-accent-orange' : 'w-2 h-2 bg-ink-primary'
          }`}
          animate={{
            x: position.x - 4,
            y: position.y - 4,
            scale: isClicked ? 1.6 : 1,
          }}
          transition={{
            type: 'spring',
            damping: 40,
            stiffness: 600,
            mass: 0.1,
          }}
        />
      )}

      {/* Click Ripple Effect */}
      {isClicked && (
        <motion.div
          className="fixed left-0 top-0 rounded-full border border-accent-orange"
          initial={{ x: position.x - 15, y: position.y - 15, width: 30, height: 30, opacity: 0.8, scale: 0.5 }}
          animate={{ width: 60, height: 60, opacity: 0, scale: 1.5, x: position.x - 30, y: position.y - 30 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      )}
    </div>
  );
};
