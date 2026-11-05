import { useState, useEffect, useRef, useCallback } from 'react';
import { soundManager } from '../utils/audio';

export type CharacterMood =
  | 'idle'
  | 'looking'
  | 'curious'
  | 'happy'
  | 'surprised'
  | 'confused'
  | 'focused'
  | 'annoyed'
  | 'angry'
  | 'bored'
  | 'sleeping'
  | 'wink';

export interface CharacterDialogue {
  mood: CharacterMood;
  text: string;
  badge?: string;
}

export const MOOD_DIALOGUES: Record<CharacterMood, string[]> = {
  idle: [
    "Hey! I'm Navin. Welcome to my creative space.",
    "Not just writing code. I build experiences.",
    "Curious by nature, builder by choice."
  ],
  looking: [
    "I see where you're pointing!",
    "Exploring the work? Go ahead, look around.",
    "Watching that cursor glide..."
  ],
  curious: [
    "Ooh, what are you interested in?",
    "Need an innovative web or mobile architecture?",
    "Checking out my stack?"
  ],
  happy: [
    "Glad you're here! Let's build something epic.",
    "Turning ideas into digital reality.",
    "High five! ✨"
  ],
  surprised: [
    "Whoa! That caught me by surprise!",
    "You clicked me! Nice reflex.",
    "Boom! What's next?"
  ],
  wink: [
    "Gotcha! Ready to collaborate?",
    "Clean code, seamless animations, zero compromise.",
    "Let's make something people talk about."
  ],
  confused: [
    "Wait... did you miss a semicolon?",
    "Hmm, what shall we explore next?",
    "Trying to break the layout? It's solid."
  ],
  focused: [
    "Deep focus mode: ON. 100% engineering flow.",
    "Refactoring pipelines and optimizing latencies.",
    "Building scalable solutions."
  ],
  annoyed: [
    "Hey, that's quite a few clicks!",
    "Poking developers usually requires coffee first.",
    "Easy on the mouse button, friend!"
  ],
  angry: [
    "Okay, that's enough poking! 💢",
    "404: Patience temporarily exhausted!",
    "Alright, time out! Let me breathe."
  ],
  bored: [
    "Still there? *yawns*",
    "Quiet around here... scroll down to see the projects!",
    "Need inspiration? Check the AI SkillPath project below."
  ],
  sleeping: [
    "Zzz... Recompiling dreams in TypeScript...",
    "Zzz... Wake me when you're ready to build...",
    "System in sleep mode. Move your mouse to wake!"
  ]
};

export const CHARACTER_SPRITES: Record<CharacterMood, string> = {
  idle: '/assets/character/navin-idle.png',
  looking: '/assets/character/navin-looking.png',
  curious: '/assets/character/navin-curious.png',
  happy: '/assets/character/navin-happy.png',
  surprised: '/assets/character/navin-surprised.png',
  confused: '/assets/character/navin-confused.png',
  focused: '/assets/character/navin-focused.png',
  annoyed: '/assets/character/navin-annoyed.png',
  angry: '/assets/character/navin-angry.png',
  bored: '/assets/character/navin-bored.png',
  sleeping: '/assets/character/navin-bored.png',
  wink: '/assets/character/navin-wink.png'
};

export function useCharacterEngine() {
  const [mood, setMood] = useState<CharacterMood>('idle');
  const [manualOverride, setManualOverride] = useState<boolean>(false);
  const [dialogue, setDialogue] = useState<string>(MOOD_DIALOGUES.idle[0]);
  const [clickCount, setClickCount] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [eyeOffset, setEyeOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [headTilt, setHeadTilt] = useState<{ rotateX: number; rotateY: number }>({ rotateX: 0, rotateY: 0 });

  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sleepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const moodResetTimerRef = useRef<NodeJS.Timeout | null>(null);
  const characterRef = useRef<HTMLDivElement | null>(null);

  // Helper to pick random dialogue for a mood
  const pickDialogue = useCallback((targetMood: CharacterMood) => {
    const list = MOOD_DIALOGUES[targetMood] || MOOD_DIALOGUES.idle;
    const index = Math.floor(Math.random() * list.length);
    setDialogue(list[index]);
  }, []);

  // Update mood with sound and dialogue
  const changeMood = useCallback((newMood: CharacterMood, playSound: boolean = true) => {
    setMood(newMood);
    pickDialogue(newMood);
    if (playSound) {
      soundManager.playCharacterReact(newMood);
    }
  }, [pickDialogue]);

  // Reset inactivity timers
  const resetInactivityTimers = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current);

    // If asleep or bored, wake up to idle
    setMood((prev) => {
      if (prev === 'sleeping' || prev === 'bored') {
        pickDialogue('idle');
        return 'idle';
      }
      return prev;
    });

    idleTimerRef.current = setTimeout(() => {
      setMood((prev) => {
        if (prev !== 'angry' && prev !== 'annoyed') {
          pickDialogue('bored');
          return 'bored';
        }
        return prev;
      });
    }, 14000);

    sleepTimerRef.current = setTimeout(() => {
      setMood((prev) => {
        if (prev !== 'angry' && prev !== 'annoyed') {
          pickDialogue('sleeping');
          return 'sleeping';
        }
        return prev;
      });
    }, 28000);
  }, [pickDialogue]);

  // Click reaction logic with thresholds
  const handleCharacterClick = useCallback(() => {
    setManualOverride(false);
    resetInactivityTimers();

    setClickCount((prev) => {
      const next = prev + 1;

      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
      // Decay click counter after 2.5s of no clicks
      clickTimerRef.current = setTimeout(() => {
        setClickCount(0);
        changeMood('idle', false);
      }, 2500);

      if (next >= 6) {
        changeMood('angry');
      } else if (next >= 3) {
        changeMood('annoyed');
      } else if (next === 2) {
        changeMood('wink');
      } else {
        changeMood('surprised');
      }

      return next;
    });
  }, [changeMood, resetInactivityTimers]);

  // Handle direct hover on character
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    resetInactivityTimers();
    if (clickCount === 0 && !manualOverride) {
      changeMood('curious');
    }
  }, [changeMood, clickCount, manualOverride, resetInactivityTimers]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (!manualOverride && clickCount === 0) {
      if (moodResetTimerRef.current) clearTimeout(moodResetTimerRef.current);
      moodResetTimerRef.current = setTimeout(() => {
        setMood((prev) => {
          if (prev === 'curious' || prev === 'happy' || prev === 'looking') {
            pickDialogue('idle');
            return 'idle';
          }
          return prev;
        });
      }, 800);
    }
  }, [clickCount, manualOverride, pickDialogue]);

  // Global mouse tracking for eye pupil and head tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      resetInactivityTimers();

      if (!characterRef.current) return;
      const rect = characterRef.current.getBoundingClientRect();
      const charCenterX = rect.left + rect.width / 2;
      const charCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - charCenterX;
      const deltaY = e.clientY - charCenterY;

      // Eye offset bounds clamped between -10px and +10px
      const clampedX = Math.max(-10, Math.min(10, deltaX / 28));
      const clampedY = Math.max(-8, Math.min(8, deltaY / 28));
      setEyeOffset({ x: clampedX, y: clampedY });

      // Subtle 3D head tilt clamped between -6deg and +6deg
      const rotY = Math.max(-7, Math.min(7, deltaX / 65));
      const rotX = Math.max(-6, Math.min(6, -deltaY / 65));
      setHeadTilt({ rotateX: rotX, rotateY: rotY });

      // If in idle state and cursor is reasonably active, switch to 'looking'
      if (!manualOverride && clickCount === 0) {
        setMood((prev) => {
          if (prev === 'idle' || prev === 'bored' || prev === 'sleeping') {
            return 'looking';
          }
          return prev;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    resetInactivityTimers();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current);
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
      if (moodResetTimerRef.current) clearTimeout(moodResetTimerRef.current);
    };
  }, [clickCount, manualOverride, resetInactivityTimers]);

  // Set mood manually (for interactive mood selector)
  const setCustomMood = useCallback((newMood: CharacterMood) => {
    setManualOverride(true);
    changeMood(newMood);
  }, [changeMood]);

  return {
    mood,
    setCustomMood,
    dialogue,
    clickCount,
    isHovered,
    eyeOffset,
    headTilt,
    characterRef,
    handleCharacterClick,
    handleMouseEnter,
    handleMouseLeave
  };
}

