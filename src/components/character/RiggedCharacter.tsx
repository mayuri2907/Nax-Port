import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRiggedCharacter } from '../../hooks/useRiggedCharacter';
import { Sparkles } from 'lucide-react';

export const RiggedCharacter: React.FC = () => {
  const {
    mood,
    pupilX,
    pupilY,
    headRotate,
    headX,
    headY,
    isBlinking,
    eyeLidClosedFraction,
    eyebrowLeftOffset,
    eyebrowRightOffset,
    mouthState,
    characterRef,
    speechText,
    handleCharacterClick,
    handleMouseEnter,
    handleMouseLeave
  } = useRiggedCharacter();

  // Dynamic SVG Mouth Path
  const getMouthD = () => {
    switch (mouthState) {
      case 'smile':
        return 'M 164 282 Q 180 298 196 282 Q 180 292 164 282 Z';
      case 'open':
        return 'M 172 278 Q 180 275 188 278 Q 188 292 180 292 Q 172 292 172 278 Z';
      case 'curious':
        return 'M 165 284 Q 182 284 196 280';
      case 'annoyed':
        return 'M 166 286 Q 180 283 194 286';
      case 'angry':
        return 'M 164 288 Q 180 281 196 288';
      case 'bored':
        return 'M 168 284 Q 180 285 192 283';
      default: // neutral
        return 'M 166 283 Q 180 286 194 283';
    }
  };

  return (
    <div className="relative flex flex-col items-center select-none">
      
      {/* Speech / Dialogue Bubble (Appears only on interaction/state) */}
      <AnimatePresence>
        {speechText && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-14 z-30 px-4 py-2 bg-white text-ink-primary border-2 border-ink-primary shadow-brutal rounded-2xl text-xs md:text-sm font-grotesk font-semibold text-center max-w-xs pointer-events-none"
          >
            <div className="flex items-center justify-center gap-1.5">
              {mood === 'angry' && <span className="text-red-500 font-bold">💢</span>}
              {mood === 'happy' && <Sparkles className="w-3.5 h-3.5 text-accent-orange" />}
              <span>{speechText}</span>
            </div>
            {/* Pointer arrow tail */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-r-2 border-b-2 border-ink-primary transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Single Continuous Rigged Character Canvas */}
      <div
        ref={characterRef}
        onClick={handleCharacterClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-cursor="hover"
        className="relative w-72 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[420px] cursor-pointer group"
      >
        <svg
          viewBox="0 0 360 420"
          className="w-full h-full filter drop-shadow-xl overflow-visible"
        >
          <defs>
            {/* Skin Tone Gradients */}
            <radialGradient id="faceSkinGrad" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#ECC2A3" />
              <stop offset="65%" stopColor="#E2AA87" />
              <stop offset="100%" stopColor="#CF9472" />
            </radialGradient>

            <linearGradient id="neckGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C38765" />
              <stop offset="100%" stopColor="#DA9F7C" />
            </linearGradient>

            {/* Hair Gradients */}
            <linearGradient id="hairGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#302624" />
              <stop offset="45%" stopColor="#1E1716" />
              <stop offset="100%" stopColor="#140E0D" />
            </linearGradient>

            {/* Eye Sclera Clip Paths */}
            <clipPath id="leftEyeClip">
              <path d="M 124 196 Q 142 182 160 196 Q 142 208 124 196 Z" />
            </clipPath>

            <clipPath id="rightEyeClip">
              <path d="M 200 196 Q 218 182 236 196 Q 218 208 200 196 Z" />
            </clipPath>

            {/* Soft Shadow Filter */}
            <filter id="softGaze" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#171717" floodOpacity="0.2" />
            </filter>
          </defs>

          {/* ========================================== */}
          {/* LAYER 1: BODY & CLOTHING (Subtle Breathing) */}
          {/* ========================================== */}
          <motion.g
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              duration: mood === 'sleeping' ? 4.8 : 3.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* White/Cream Shirt Shoulders & Torso */}
            <path
              d="M 60 420 L 72 370 Q 95 338 135 330 L 150 375 L 210 375 L 225 330 Q 265 338 288 370 L 300 420 Z"
              fill="#FBF8F2"
              stroke="#171717"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Collar Left Lapel */}
            <path
              d="M 135 330 L 160 376 L 140 382 L 120 342 Z"
              fill="#F4EDE1"
              stroke="#171717"
              strokeWidth="3"
              strokeLinejoin="round"
            />

            {/* Collar Right Lapel */}
            <path
              d="M 225 330 L 200 376 L 220 382 L 240 342 Z"
              fill="#F4EDE1"
              stroke="#171717"
              strokeWidth="3"
              strokeLinejoin="round"
            />

            {/* Shirt Placket & Creases */}
            <path
              d="M 180 376 L 180 420"
              stroke="#171717"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 115 365 Q 128 385 130 420"
              stroke="#E8DCBE"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 245 365 Q 232 385 230 420"
              stroke="#E8DCBE"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </motion.g>

          {/* ========================================== */}
          {/* LAYER 2: HEAD & FACE (Perspective Tracking) */}
          {/* ========================================== */}
          <motion.g
            animate={{
              rotate: headRotate,
              x: headX,
              y: headY,
            }}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 24,
            }}
            style={{ transformOrigin: '180px 240px' }}
          >
            {/* Neck */}
            <path
              d="M 152 280 L 152 342 Q 180 354 208 342 L 208 280 Z"
              fill="url(#neckGrad)"
              stroke="#171717"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Neck Shadow under chin */}
            <path
              d="M 152 280 Q 180 300 208 280 Q 180 290 152 280 Z"
              fill="#B57654"
            />

            {/* Back Hair Volume */}
            <path
              d="M 102 210 Q 86 160 114 116 Q 148 68 212 68 Q 276 68 304 116 Q 324 160 308 210 L 290 250 Q 284 275 270 290 L 254 270 L 260 210 L 100 210 Z"
              fill="url(#hairGrad)"
            />

            {/* Left Ear */}
            <path
              d="M 106 185 Q 94 205 106 226 Q 112 215 112 195 Z"
              fill="#E2AA87"
              stroke="#171717"
              strokeWidth="3"
            />
            {/* Ear Cartilage crease */}
            <path d="M 104 200 Q 100 210 106 216" stroke="#C98E6E" strokeWidth="2" fill="none" />
            {/* Metallic Stud Earring (Left Ear Lobe) */}
            <circle cx="106" cy="223" r="2.8" fill="#F5D77E" stroke="#171717" strokeWidth="1.2" />

            {/* Right Ear */}
            <path
              d="M 254 185 Q 266 205 254 226 Q 248 215 248 195 Z"
              fill="#E2AA87"
              stroke="#171717"
              strokeWidth="3"
            />
            <path d="M 256 200 Q 260 210 254 216" stroke="#C98E6E" strokeWidth="2" fill="none" />

            {/* Face / Jaw Base */}
            <path
              d="M 110 160 Q 110 240 134 274 Q 158 304 180 304 Q 202 304 226 274 Q 250 240 250 160 Q 180 150 110 160 Z"
              fill="url(#faceSkinGrad)"
              stroke="#171717"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Stubble & Goatee Shading on Chin and Jaw */}
            <path
              d="M 144 278 Q 180 306 216 278 Q 204 300 180 300 Q 156 300 144 278 Z"
              fill="#342825"
              opacity="0.32"
            />
            <path
              d="M 172 292 Q 180 295 188 292 Q 180 301 172 292 Z"
              fill="#221A18"
              opacity="0.6"
            />

            {/* Mustache */}
            <path
              d="M 166 272 Q 174 268 180 270 Q 186 268 194 272 Q 186 275 180 273 Q 174 275 166 272 Z"
              fill="#221A18"
            />

            {/* Nose */}
            <path
              d="M 178 222 L 175 250 L 185 250"
              stroke="#B87B5B"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <circle cx="173" cy="251" r="1.5" fill="#A86E4F" />

            {/* ========================================== */}
            {/* EYES LAYER: Sclera + Independent Pupil Rig */}
            {/* ========================================== */}
            {/* Left Eye Sclera */}
            <path
              d="M 124 196 Q 142 182 160 196 Q 142 208 124 196 Z"
              fill="#FFFDFB"
              stroke="#171717"
              strokeWidth="3"
            />
            {/* Left Pupil (Real-time tracking inside clipPath) */}
            <g clipPath="url(#leftEyeClip)">
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
                {/* Iris */}
                <circle cx="142" cy="196" r="7.5" fill="#422C24" />
                <circle cx="142" cy="196" r="6" fill="#241611" />
                {/* Inner Pupil */}
                <circle cx="142" cy="196" r="3.2" fill="#0C0807" />
                {/* Catchlight Reflection Glints */}
                <circle cx="140" cy="193" r="1.8" fill="#FFFFFF" />
                <circle cx="144" cy="198" r="0.8" fill="#FFFFFF" opacity="0.8" />
              </motion.g>

              {/* Left Eyelid Drop / Blink Curtain */}
              <motion.path
                d="M 120 180 L 164 180 L 164 212 L 120 212 Z"
                fill="#DE9F7B"
                stroke="#171717"
                strokeWidth="2"
                animate={{
                  y: eyeLidClosedFraction * 20 - 20,
                }}
                transition={{
                  duration: isBlinking ? 0.08 : 0.2,
                  ease: 'easeInOut',
                }}
              />
            </g>

            {/* Left Upper Eyelash Line */}
            <path
              d="M 122 196 Q 142 180 162 195"
              stroke="#171717"
              strokeWidth="3.8"
              strokeLinecap="round"
              fill="none"
            />
            {/* Eyelid crease */}
            <path
              d="M 128 186 Q 142 180 156 186"
              stroke="#C08465"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />

            {/* Right Eye Sclera */}
            <path
              d="M 200 196 Q 218 182 236 196 Q 218 208 200 196 Z"
              fill="#FFFDFB"
              stroke="#171717"
              strokeWidth="3"
            />
            {/* Right Pupil (Real-time tracking inside clipPath) */}
            <g clipPath="url(#rightEyeClip)">
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
                {/* Iris */}
                <circle cx="218" cy="196" r="7.5" fill="#422C24" />
                <circle cx="218" cy="196" r="6" fill="#241611" />
                {/* Inner Pupil */}
                <circle cx="218" cy="196" r="3.2" fill="#0C0807" />
                {/* Catchlight Reflection Glints */}
                <circle cx="216" cy="193" r="1.8" fill="#FFFFFF" />
                <circle cx="220" cy="198" r="0.8" fill="#FFFFFF" opacity="0.8" />
              </motion.g>

              {/* Right Eyelid Drop / Blink Curtain */}
              <motion.path
                d="M 196 180 L 240 180 L 240 212 L 196 212 Z"
                fill="#DE9F7B"
                stroke="#171717"
                strokeWidth="2"
                animate={{
                  y: eyeLidClosedFraction * 20 - 20,
                }}
                transition={{
                  duration: isBlinking ? 0.08 : 0.2,
                  ease: 'easeInOut',
                }}
              />
            </g>

            {/* Right Upper Eyelash Line */}
            <path
              d="M 198 195 Q 218 180 238 196"
              stroke="#171717"
              strokeWidth="3.8"
              strokeLinecap="round"
              fill="none"
            />
            {/* Eyelid crease */}
            <path
              d="M 204 186 Q 218 180 232 186"
              stroke="#C08465"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />

            {/* ========================================== */}
            {/* EYEBROWS LAYER: Morphing Expressions */}
            {/* ========================================== */}
            {/* Left Eyebrow */}
            <motion.g
              animate={{
                y: eyebrowLeftOffset.y,
                rotate: eyebrowLeftOffset.rotate,
              }}
              transition={{ type: 'spring', stiffness: 320, damping: 20 }}
              style={{ transformOrigin: '142px 174px' }}
            >
              <path
                d="M 122 178 Q 140 166 160 174 Q 144 170 126 180 Z"
                fill="#1C1514"
                stroke="#1C1514"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </motion.g>

            {/* Right Eyebrow */}
            <motion.g
              animate={{
                y: eyebrowRightOffset.y,
                rotate: eyebrowRightOffset.rotate,
              }}
              transition={{ type: 'spring', stiffness: 320, damping: 20 }}
              style={{ transformOrigin: '218px 174px' }}
            >
              <path
                d="M 200 174 Q 220 166 238 178 Q 234 180 216 170 Z"
                fill="#1C1514"
                stroke="#1C1514"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </motion.g>

            {/* ========================================== */}
            {/* MOUTH LAYER: Animated Morphing Path */}
            {/* ========================================== */}
            <motion.path
              d={getMouthD()}
              fill={mouthState === 'smile' ? '#9E3224' : mouthState === 'open' ? '#3B1510' : 'none'}
              stroke="#171717"
              strokeWidth={mouthState === 'open' ? '3' : '3.2'}
              strokeLinecap="round"
              strokeLinejoin="round"
              transition={{ duration: 0.18, ease: 'easeOut' }}
            />

            {/* ========================================== */}
            {/* FRONT HAIR: Voluminous Anime Locks & Bangs */}
            {/* ========================================== */}
            {/* Left Side Hair Lock */}
            <path
              d="M 110 150 Q 94 130 102 105 Q 120 130 114 165 Z"
              fill="url(#hairGrad)"
              stroke="#171717"
              strokeWidth="2"
            />
            {/* Forehead Layered Bangs (Faithful to reference hairstyle) */}
            <path
              d="M 106 130 Q 128 86 180 82 Q 232 86 254 130 Q 236 122 220 144 Q 212 118 188 142 Q 178 116 160 148 Q 146 120 126 146 Q 116 132 106 130 Z"
              fill="url(#hairGrad)"
              stroke="#171717"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            {/* Hair Top Spikes & Volume */}
            <path
              d="M 130 90 Q 144 56 168 64 Q 186 48 206 58 Q 226 52 242 76 Q 262 74 270 94 Q 284 116 276 138 Q 288 126 280 156"
              fill="none"
              stroke="#171717"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Subtle Hair Highlights */}
            <path
              d="M 148 78 Q 165 68 185 74"
              stroke="#4D3B36"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 200 70 Q 218 64 235 74"
              stroke="#4D3B36"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />

            {/* Anime Emotion Overlay Marks (Only when angry or surprised) */}
            {mood === 'angry' && (
              <motion.g
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.25, 1], rotate: [0, 8, -6, 0] }}
                transition={{ repeat: Infinity, duration: 0.6 }}
                transform="translate(252, 130)"
              >
                <path
                  d="M -6 -12 L -6 12 M -12 -6 L 12 -6 M 6 -12 L 6 12 M -12 6 L 12 6"
                  stroke="#E63946"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </motion.g>
            )}

            {mood === 'surprised' && (
              <motion.g
                initial={{ scale: 0, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                transform="translate(254, 130)"
              >
                <text
                  x="0"
                  y="0"
                  fontSize="28"
                  fontWeight="bold"
                  fill="#F47B35"
                  fontFamily="'Space Grotesk', sans-serif"
                >
                  !
                </text>
              </motion.g>
            )}
          </motion.g>
        </svg>
      </div>

    </div>
  );
};
