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
    <div className="relative flex flex-col items-center select-none">
      
      {/* Speech / Dialogue Bubble (Appears only on user interaction or state change) */}
      <AnimatePresence>
        {speechMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-14 z-30 px-4 py-2 bg-white text-ink-primary border-2 border-ink-primary shadow-brutal rounded-2xl text-xs md:text-sm font-grotesk font-semibold text-center max-w-xs pointer-events-none"
          >
            <div className="flex items-center justify-center gap-1.5">
              {expression === 'angry' && <span className="text-red-500 font-bold">💢</span>}
              {expression === 'happy' && <Sparkles className="w-3.5 h-3.5 text-accent-orange" />}
              <span>{speechMessage}</span>
            </div>
            {/* Pointer arrow tail */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-r-2 border-b-2 border-ink-primary transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Single Continuous Rigged Character Canvas */}
      <div
        ref={containerRef}
        onClick={handleCharacterClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-cursor="hover"
        className="relative w-80 h-[330px] sm:w-96 sm:h-[395px] md:w-[440px] md:h-[430px] lg:w-[480px] lg:h-[470px] cursor-pointer group"
        style={{
          perspective: 1000,
        }}
      >
        <svg
          viewBox="0 0 1024 935"
          className="w-full h-full filter drop-shadow-2xl overflow-visible"
        >
          <defs>
            {/* Left Eye Socket Opening ClipPath */}
            <clipPath id="socketClipLeft">
              <path d="M 408 337 Q 440 326 472 337 Q 440 346 408 337 Z" />
            </clipPath>

            {/* Right Eye Socket Opening ClipPath */}
            <clipPath id="socketClipRight">
              <path d="M 552 337 Q 582 326 612 337 Q 582 346 552 337 Z" />
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
            {/* BASE OFFICIAL ILLUSTRATION (Pristine authentic artwork with clean sclera) */}
            <image
              href="/assets/character/navin-base-sclera.png"
              x="0"
              y="0"
              width="1024"
              height="935"
              preserveAspectRatio="xMidYMid meet"
            />

            {/* ========================================== */}
            {/* HEAD GROUP (Real-Time 3D Cursor Perspective) */}
            {/* ========================================== */}
            <motion.g
              animate={{
                rotateX: headRotateX,
                rotateY: headRotateY,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 24,
                mass: 0.2,
              }}
              style={{
                transformOrigin: '512px 420px',
              }}
            >
              {/* ------------------------------------------ */}
              {/* LEFT EYE PUPIL (Smooth Real-Time Tracking) */}
              {/* ------------------------------------------ */}
              <g clipPath="url(#socketClipLeft)">
                <motion.g
                  animate={{
                    x: pupilX,
                    y: pupilY,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 450,
                    damping: 28,
                    mass: 0.12,
                  }}
                >
                  <image
                    href="/assets/character/navin-iris-left-clean.png"
                    x="430"
                    y="328"
                    width="22"
                    height="16"
                  />
                </motion.g>

                {/* Left Eyelid Drop Curtain (ONLY VISIBLE ON BLINK/SLEEP/BORED) */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: isEyelidClosed ? 1 : isBored ? 0.75 : 0,
                    y: isEyelidClosed ? 0 : isBored ? -6 : -25,
                  }}
                  transition={{
                    duration: isBlinking ? 0.08 : 0.2,
                    ease: 'easeInOut',
                  }}
                >
                  <path
                    d="M 400 315 L 480 315 L 480 348 L 400 348 Z"
                    fill="#E5A885"
                  />
                  {/* Closed Eyelash Line */}
                  <path
                    d="M 406 338 Q 440 343 474 338"
                    stroke="#140E0D"
                    strokeWidth="4.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </motion.g>
              </g>

              {/* Left Eyelash Upper Contour (Crisp & Dark) */}
              <path
                d="M 406 338 Q 440 326 473 337"
                stroke="#140E0D"
                strokeWidth="4.2"
                strokeLinecap="round"
                fill="none"
              />

              {/* ------------------------------------------ */}
              {/* RIGHT EYE PUPIL (Smooth Real-Time Tracking)*/}
              {/* ------------------------------------------ */}
              <g clipPath="url(#socketClipRight)">
                <motion.g
                  animate={{
                    x: pupilX,
                    y: pupilY,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 450,
                    damping: 28,
                    mass: 0.12,
                  }}
                >
                  <image
                    href="/assets/character/navin-iris-right-clean.png"
                    x="570"
                    y="328"
                    width="22"
                    height="16"
                  />
                </motion.g>

                {/* Right Eyelid Drop Curtain (ONLY VISIBLE ON BLINK/SLEEP/BORED) */}
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: isEyelidClosed ? 1 : isBored ? 0.75 : 0,
                    y: isEyelidClosed ? 0 : isBored ? -6 : -25,
                  }}
                  transition={{
                    duration: isBlinking ? 0.08 : 0.2,
                    ease: 'easeInOut',
                  }}
                >
                  <path
                    d="M 545 315 L 625 315 L 625 348 L 545 348 Z"
                    fill="#E5A885"
                  />
                  {/* Closed Eyelash Line */}
                  <path
                    d="M 550 338 Q 582 343 614 338"
                    stroke="#140E0D"
                    strokeWidth="4.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </motion.g>
              </g>

              {/* Right Eyelash Upper Contour (Crisp & Dark) */}
              <path
                d="M 551 337 Q 582 326 613 338"
                stroke="#140E0D"
                strokeWidth="4.2"
                strokeLinecap="round"
                fill="none"
              />

              {/* ------------------------------------------ */}
              {/* ANIME EMOTION ACCENTS (Playful & Reactive) */}
              {/* ------------------------------------------ */}
              {/* Angry Vein Mark (Only when poked 6+ times) */}
              {expression === 'angry' && (
                <motion.g
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.25, 1], rotate: [0, 8, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6 }}
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

              {/* Surprised Exclamation Accent */}
              {expression === 'surprised' && (
                <motion.g
                  initial={{ scale: 0, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  transform="translate(690, 240)"
                >
                  <text
                    x="0"
                    y="0"
                    fontSize="42"
                    fontWeight="900"
                    fill="#F47B35"
                    fontFamily="'Space Grotesk', sans-serif"
                  >
                    !
                  </text>
                </motion.g>
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
                    fontSize="26"
                    fontWeight="bold"
                    fill="#77736C"
                    fontFamily="'Space Grotesk', sans-serif"
                  >
                    z z Z
                  </text>
                </motion.g>
              )}
            </motion.g>
          </motion.g>
        </svg>
      </div>

    </div>
  );
};
