import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOfficialCharacterRig } from '../../hooks/useOfficialCharacterRig';
import { Sparkles } from 'lucide-react';

export const OfficialCharacterRig: React.FC = () => {
  const {
    expression,
    pupilX,
    pupilY,
    headRotateX,
    headRotateY,
    isBlinking,
    isSleeping,
    isBored,
    containerRef,
    speechMessage,
    handleCharacterClick,
    handleMouseEnter,
    handleMouseLeave
  } = useOfficialCharacterRig();

  const isEyelidClosed = isBlinking || isSleeping;

  return (
    <div className="relative flex flex-col items-center select-none overflow-visible">
      
      {/* Speech / Dialogue Bubble (Appears above character on interaction) */}
      <AnimatePresence>
        {speechMessage && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 420, damping: 26 }}
            className="absolute -top-14 sm:-top-16 z-40 px-4 py-2 bg-white text-ink-primary border-2 border-ink-primary shadow-brutal rounded-2xl text-xs md:text-sm font-grotesk font-bold text-center max-w-xs pointer-events-none"
          >
            <div className="flex items-center justify-center gap-1.5">
              {expression === 'angry' && <span className="text-red-500 font-bold">💢</span>}
              {expression === 'annoyed' && <span>💧</span>}
              {expression === 'happy' && <Sparkles className="w-3.5 h-3.5 text-accent-orange" />}
              <span>{speechMessage}</span>
            </div>
            {/* Pointer arrow tail */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-r-2 border-b-2 border-ink-primary transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Single Continuous Rigged Character Canvas with 3D Tilt */}
      <motion.div
        ref={containerRef}
        onClick={handleCharacterClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-cursor="hover"
        animate={{
          rotateX: headRotateX,
          rotateY: headRotateY,
          x: expression === 'angry' ? [-2, 2, -2, 2, 0] : 0,
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
        className="relative w-80 h-[330px] sm:w-96 sm:h-[395px] md:w-[440px] md:h-[430px] lg:w-[480px] lg:h-[470px] cursor-pointer group"
      >
        <svg
          viewBox="0 0 1024 935"
          className="w-full h-full filter drop-shadow-2xl overflow-visible"
        >
          <defs>
            {/* Left Eye Socket Opening ClipPath - Anatomically mapped to sclera boundary */}
            <clipPath id="socketClipLeft">
              <path d="M 412 334 C 424 327, 456 327, 468 335 C 456 342, 424 342, 412 334 Z" />
            </clipPath>

            {/* Right Eye Socket Opening ClipPath - Anatomically mapped to sclera boundary */}
            <clipPath id="socketClipRight">
              <path d="M 556 334 C 568 327, 598 327, 610 335 C 598 340, 568 340, 556 334 Z" />
            </clipPath>
          </defs>

          {/* ========================================== */}
          {/* BODY & CHEST LAYER (Gentle Natural Breathing) */}
          {/* ========================================== */}
          <motion.g
            animate={{
              y: [0, -2.5, 0],
            }}
            transition={{
              duration: isSleeping ? 4.8 : 3.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* BASE OFFICIAL ILLUSTRATION (Pristine original artwork) */}
            <image
              href="/assets/character/navin-official.png"
              x="0"
              y="0"
              width="1024"
              height="935"
              preserveAspectRatio="xMidYMid meet"
            />

            {/* ========================================== */}
            {/* REAL-TIME EYE TRACKING & EXPRESSIONS */}
            {/* ========================================== */}

            {/* ------------------------------------------ */}
            {/* LEFT EYE PUPIL (Smooth Real-Time Tracking) */}
            {/* ------------------------------------------ */}
            <g clipPath="url(#socketClipLeft)">
              {/* Dynamic pupil core & specular catchlight tracking across iris */}
              <motion.g
                animate={{
                  x: pupilX,
                  y: pupilY,
                  scale: expression === 'surprised' ? 1.15 : 1.0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 420,
                  damping: 24,
                  mass: 0.1,
                }}
              >
                {/* Deep dark pupil center that tracks cursor */}
                <ellipse cx="442" cy="334" rx="7" ry="6" fill="#120A07" opacity="0.45" />
                {/* Specular catchlight reflections following gaze */}
                <circle cx="436" cy="331" r="2.8" fill="#FFFFFF" opacity="0.95" />
                <circle cx="448" cy="332" r="1.8" fill="#FFFFFF" opacity="0.9" />
              </motion.g>

              {/* Left Eyelid Drop Curtain (Natural skin closure, NO harsh synthetic black lines) */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isEyelidClosed
                    ? 1
                    : expression === 'happy'
                    ? 0.95
                    : expression === 'angry'
                    ? 0.7
                    : expression === 'annoyed'
                    ? 0.55
                    : isBored
                    ? 0.55
                    : 0,
                  y: isEyelidClosed
                    ? 0
                    : expression === 'happy'
                    ? -2
                    : expression === 'angry'
                    ? -7
                    : expression === 'annoyed'
                    ? -9
                    : isBored
                    ? -9
                    : -24,
                }}
                transition={{
                  duration: isBlinking ? 0.08 : 0.2,
                  ease: 'easeInOut',
                }}
              >
                <path
                  d="M 405 320 L 475 320 L 475 344 L 405 344 Z"
                  fill="#DFAC8D"
                />
                {/* Soft natural closed lash crease (visible ONLY during complete blink or happy smile) */}
                {(isEyelidClosed || expression === 'happy') && (
                  <path
                    d={
                      expression === 'happy'
                        ? 'M 414 338 Q 440 334 466 338' // Happy anime crescent smile
                        : 'M 416 337 Q 440 341 464 337' // Closed relaxing eyelid
                    }
                    stroke="#342018"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    fill="none"
                    opacity={0.85}
                  />
                )}
              </motion.g>
            </g>

            {/* ------------------------------------------ */}
            {/* RIGHT EYE PUPIL (Smooth Real-Time Tracking)*/}
            {/* ------------------------------------------ */}
            <g clipPath="url(#socketClipRight)">
              {/* Dynamic pupil core & specular catchlight tracking across iris */}
              <motion.g
                animate={{
                  x: pupilX,
                  y: pupilY,
                  scale: expression === 'surprised' ? 1.15 : 1.0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 420,
                  damping: 24,
                  mass: 0.1,
                }}
              >
                {/* Deep dark pupil center that tracks cursor */}
                <ellipse cx="584" cy="334" rx="7" ry="6" fill="#120A07" opacity="0.45" />
                {/* Specular catchlight reflections following gaze */}
                <circle cx="578" cy="331" r="2.8" fill="#FFFFFF" opacity="0.95" />
                <circle cx="590" cy="332" r="1.8" fill="#FFFFFF" opacity="0.9" />
              </motion.g>

              {/* Right Eyelid Drop Curtain (Natural skin closure, NO harsh synthetic black lines) */}
              <motion.g
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isEyelidClosed
                    ? 1
                    : expression === 'happy'
                    ? 0.95
                    : expression === 'angry'
                    ? 0.7
                    : expression === 'annoyed'
                    ? 0.55
                    : isBored
                    ? 0.55
                    : 0,
                  y: isEyelidClosed
                    ? 0
                    : expression === 'happy'
                    ? -2
                    : expression === 'angry'
                    ? -7
                    : expression === 'annoyed'
                    ? -9
                    : isBored
                    ? -9
                    : -24,
                }}
                transition={{
                  duration: isBlinking ? 0.08 : 0.2,
                  ease: 'easeInOut',
                }}
              >
                <path
                  d="M 550 320 L 620 320 L 620 344 L 550 344 Z"
                  fill="#DFAC8D"
                />
                {(isEyelidClosed || expression === 'happy') && (
                  <path
                    d={
                      expression === 'happy'
                        ? 'M 556 338 Q 582 334 608 338' // Happy anime crescent smile
                        : 'M 558 337 Q 582 340 606 337' // Closed relaxing eyelid
                    }
                    stroke="#342018"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    fill="none"
                    opacity={0.85}
                  />
                )}
              </motion.g>
            </g>

            {/* ------------------------------------------ */}
            {/* ANIME EMOTION ACCENTS (Playful & Reactive) */}
            {/* ------------------------------------------ */}
            
            {/* Angry Vein Mark (6+ clicks) */}
            {expression === 'angry' && (
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.25, 1], rotate: [0, 8, -6, 0] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
                transform="translate(685, 230)"
              >
                <path
                  d="M -9 -18 L -9 18 M -18 -9 L 18 -9 M 9 -18 L 9 18 M -18 9 L 18 9"
                  stroke="#E63946"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
              </motion.g>
            )}

            {/* Annoyed Anime Sweat Drop (3+ clicks) */}
            {expression === 'annoyed' && (
              <motion.g
                initial={{ scale: 0, y: -10 }}
                animate={{ scale: [1, 1.15, 1], y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                transform="translate(680, 220)"
              >
                <path
                  d="M 0 -18 C -10 -4, -12 8, 0 16 C 12 8, 10 -4, 0 -18 Z"
                  fill="#38BDF8"
                  stroke="#0284C7"
                  strokeWidth="2.5"
                />
                <ellipse cx="-3" cy="6" rx="2.5" ry="4" fill="white" opacity="0.8" />
              </motion.g>
            )}

            {/* Surprised Exclamation Accent */}
            {expression === 'surprised' && (
              <motion.g
                initial={{ scale: 0, y: 15 }}
                animate={{ scale: [1, 1.2, 1], y: [0, -6, 0] }}
                transition={{ duration: 0.4 }}
                transform="translate(685, 240)"
              >
                <text
                  x="0"
                  y="0"
                  fontSize="46"
                  fontWeight="900"
                  fill="#F47B35"
                  fontFamily="'Space Grotesk', sans-serif"
                >
                  !
                </text>
              </motion.g>
            )}

            {/* Happy Sparkle Stars (2 clicks) */}
            {expression === 'happy' && (
              <>
                <motion.g
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: [1, 1.3, 1], rotate: [0, 45, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  transform="translate(340, 250)"
                >
                  <polygon
                    points="0,-16 4,-4 16,0 4,4 0,16 -4,4 -16,0 -4,-4"
                    fill="#FBBF24"
                    stroke="#D97706"
                    strokeWidth="1.5"
                  />
                </motion.g>
                <motion.g
                  initial={{ scale: 0, rotate: 30 }}
                  animate={{ scale: [1, 1.3, 1], rotate: [0, -45, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                  transform="translate(685, 245)"
                >
                  <polygon
                    points="0,-16 4,-4 16,0 4,4 0,16 -4,4 -16,0 -4,-4"
                    fill="#FBBF24"
                    stroke="#D97706"
                    strokeWidth="1.5"
                  />
                </motion.g>
              </>
            )}

            {/* Sleeping / Bored Zzz Accent */}
            {(isBored || isSleeping) && (
              <motion.g
                animate={{ y: [-5, -35], opacity: [0, 1, 0], x: [0, 14] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                transform="translate(685, 230)"
              >
                <text
                  x="0"
                  y="0"
                  fontSize="28"
                  fontWeight="bold"
                  fill="#77736C"
                  fontFamily="'Space Grotesk', sans-serif"
                >
                  z z Z
                </text>
              </motion.g>
            )}
          </motion.g>
        </svg>
      </motion.div>

    </div>
  );
};
