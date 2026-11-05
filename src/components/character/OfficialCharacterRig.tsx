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
    eyelidClosedFraction,
    browLeft,
    browRight,
    mouthState,
    containerRef,
    speechMessage,
    handleCharacterClick,
    handleMouseEnter,
    handleMouseLeave
  } = useOfficialCharacterRig();

  // Dynamic SVG Mouth Path Morph for Expressions
  const getMouthD = () => {
    switch (mouthState) {
      case 'smile':
        return 'M 476 462 Q 514 484 552 462 Q 514 476 476 462 Z';
      case 'open':
        return 'M 498 456 Q 514 452 530 456 Q 530 478 514 478 Q 498 478 498 456 Z';
      case 'curious':
        return 'M 478 464 Q 516 464 550 458';
      case 'annoyed':
        return 'M 480 467 Q 514 463 548 467';
      case 'angry':
        return 'M 476 470 Q 514 460 552 470';
      case 'bored':
        return 'M 482 464 Q 514 466 546 463';
      default: // neutral resting mouth
        return 'M 478 463 Q 514 466 550 463';
    }
  };

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
      >
        <svg
          viewBox="0 0 1024 935"
          className="w-full h-full filter drop-shadow-2xl overflow-visible"
        >
          <defs>
            {/* Left Eye Opening Contour ClipPath */}
            <clipPath id="officialLeftEyeClip">
              <path d="M 406 338 Q 438 327 472 338 Q 440 347 406 338 Z" />
            </clipPath>

            {/* Right Eye Opening Contour ClipPath */}
            <clipPath id="officialRightEyeClip">
              <path d="M 552 338 Q 584 327 618 338 Q 586 347 552 338 Z" />
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
              duration: expression === 'sleeping' ? 4.8 : 3.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* BASE OFFICIAL ILLUSTRATION (Pristine authentic artwork) */}
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
              {/* LEFT EYE SOCKET INTERIOR                   */}
              {/* ------------------------------------------ */}
              <g clipPath="url(#officialLeftEyeClip)">
                {/* Clean Sclera Base Fill */}
                <rect x="398" y="320" width="80" height="32" fill="#FAF6F2" />
                
                {/* Upper eyelid soft realistic shadow */}
                <path
                  d="M 406 338 Q 438 327 472 338 L 472 331 L 406 331 Z"
                  fill="#CFBEB4"
                  opacity="0.65"
                />

                {/* LEFT PUPIL (Real-Time Physics Cursor Tracking) */}
                <motion.g
                  animate={{
                    x: pupilX,
                    y: pupilY,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 420,
                    damping: 26,
                    mass: 0.15,
                  }}
                >
                  <image
                    href="/assets/character/navin-pupil-sprite.png"
                    x="427"
                    y="323"
                    width="28"
                    height="28"
                  />
                </motion.g>

                {/* LEFT UPPER EYELID DROP CURTAIN (Blinking, Drowsy, Sleep) */}
                <motion.path
                  d="M 395 310 L 480 310 L 480 348 L 395 348 Z"
                  fill="#E5A885"
                  animate={{
                    y: eyelidClosedFraction * 24 - 24,
                  }}
                  transition={{
                    duration: isBlinking ? 0.08 : 0.22,
                    ease: 'easeInOut',
                  }}
                />
              </g>

              {/* Left Eyelash Definition Line */}
              <path
                d="M 405 338 Q 438 326 473 337"
                stroke="#140E0D"
                strokeWidth="4.2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 416 328 Q 438 324 462 328"
                stroke="#98674E"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />

              {/* ------------------------------------------ */}
              {/* RIGHT EYE SOCKET INTERIOR                  */}
              {/* ------------------------------------------ */}
              <g clipPath="url(#officialRightEyeClip)">
                {/* Clean Sclera Base Fill */}
                <rect x="545" y="320" width="80" height="32" fill="#FAF6F2" />

                {/* Upper eyelid soft shadow */}
                <path
                  d="M 552 338 Q 584 327 618 338 L 618 331 L 552 331 Z"
                  fill="#CFBEB4"
                  opacity="0.65"
                />

                {/* RIGHT PUPIL (Real-Time Physics Cursor Tracking) */}
                <motion.g
                  animate={{
                    x: pupilX,
                    y: pupilY,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 420,
                    damping: 26,
                    mass: 0.15,
                  }}
                >
                  <image
                    href="/assets/character/navin-pupil-sprite.png"
                    x="569"
                    y="323"
                    width="28"
                    height="28"
                  />
                </motion.g>

                {/* RIGHT UPPER EYELID DROP CURTAIN */}
                <motion.path
                  d="M 545 310 L 630 310 L 630 348 L 545 348 Z"
                  fill="#E5A885"
                  animate={{
                    y: eyelidClosedFraction * 24 - 24,
                  }}
                  transition={{
                    duration: isBlinking ? 0.08 : 0.22,
                    ease: 'easeInOut',
                  }}
                />
              </g>

              {/* Right Eyelash Definition Line */}
              <path
                d="M 551 337 Q 584 326 619 338"
                stroke="#140E0D"
                strokeWidth="4.2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 562 328 Q 584 324 608 328"
                stroke="#98674E"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />

              {/* ------------------------------------------ */}
              {/* LEFT EYEBROW (Dynamic Morph & Tilt)        */}
              {/* ------------------------------------------ */}
              <motion.g
                animate={{
                  y: browLeft.y,
                  rotate: browLeft.rotate,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 320,
                  damping: 20,
                }}
                style={{
                  transformOrigin: '436px 306px',
                }}
              >
                <image
                  href="/assets/character/navin-brow-left-clean.png"
                  x="378"
                  y="284"
                  width="116"
                  height="44"
                />
              </motion.g>

              {/* ------------------------------------------ */}
              {/* RIGHT EYEBROW (Dynamic Morph & Tilt)       */}
              {/* ------------------------------------------ */}
              <motion.g
                animate={{
                  y: browRight.y,
                  rotate: browRight.rotate,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 320,
                  damping: 20,
                }}
                style={{
                  transformOrigin: '584px 306px',
                }}
              >
                <image
                  href="/assets/character/navin-brow-right-clean.png"
                  x="526"
                  y="284"
                  width="116"
                  height="44"
                />
              </motion.g>

              {/* ------------------------------------------ */}
              {/* DYNAMIC MOUTH MORPH OVERLAY                */}
              {/* ------------------------------------------ */}
              <motion.path
                d={getMouthD()}
                fill={mouthState === 'smile' ? '#9E3224' : mouthState === 'open' ? '#3B1510' : 'none'}
                stroke="#171717"
                strokeWidth={mouthState === 'open' ? '3.5' : '3.8'}
                strokeLinecap="round"
                strokeLinejoin="round"
                transition={{ duration: 0.18, ease: 'easeOut' }}
              />

              {/* Anime Emotion Accents (Angry Vein Mark) */}
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
              {(expression === 'bored' || expression === 'sleeping') && (
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
