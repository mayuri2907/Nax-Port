import { useState, useEffect, useRef, useCallback } from 'react';
import { soundManager } from '../utils/audio';

export type RigMood =
  | 'normal'
  | 'curious'
  | 'happy'
  | 'surprised'
  | 'annoyed'
  | 'angry'
  | 'bored'
  | 'sleeping';

export interface RigCharacterState {
  mood: RigMood;
  pupilX: number; // clamped px offset (-6 to 6)
  pupilY: number; // clamped px offset (-4 to 4)
  headRotate: number; // degrees (-4 to 4)
  headX: number; // px (-5 to 5)
  headY: number; // px (-3 to 3)
  isBlinking: boolean;
  eyeLidClosedFraction: number; // 0 (open) to 1 (closed)
  eyebrowLeftOffset: { y: number; rotate: number };
  eyebrowRightOffset: { y: number; rotate: number };
  mouthState: 'neutral' | 'curious' | 'smile' | 'open' | 'annoyed' | 'angry' | 'bored';
  characterRef: React.RefObject<HTMLDivElement | null>;
  speechText: string | null;
  handleCharacterClick: () => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

export function useRiggedCharacter(): RigCharacterState {
  const [mood, setMood] = useState<RigMood>('normal');
  const [pupilX, setPupilX] = useState<number>(0);
  const [pupilY, setPupilY] = useState<number>(0);
  const [headRotate, setHeadRotate] = useState<number>(0);
  const [headX, setHeadX] = useState<number>(0);
  const [headY, setHeadY] = useState<number>(0);
  const [isBlinking, setIsBlinking] = useState<boolean>(false);
  const [speechText, setSpeechText] = useState<string | null>(null);

  const characterRef = useRef<HTMLDivElement | null>(null);
  const clickCountRef = useRef<number>(0);
  const clickDecayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sleepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const speechTimerRef = useRef<NodeJS.Timeout | null>(null);
  const blinkTimerRef = useRef<NodeJS.Timeout | null>(null);
  const mouseHoverRef = useRef<boolean>(false);

  // Show a temporary gentle thought/speech bubble
  const triggerSpeech = useCallback((text: string, durationMs: number = 3200) => {
    if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    setSpeechText(text);
    speechTimerRef.current = setTimeout(() => {
      setSpeechText(null);
    }, durationMs);
  }, []);

  // Automatic Natural Blinking Loop
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const scheduleNextBlink = () => {
      // Blink every 3.2 to 5.8 seconds
      const delay = Math.random() * 2600 + 3200;
      timeout = setTimeout(() => {
        // Only blink if not already sleeping
        setMood((currentMood) => {
          if (currentMood !== 'sleeping') {
            setIsBlinking(true);
            setTimeout(() => {
              setIsBlinking(false);
            }, 140);
          }
          return currentMood;
        });
        scheduleNextBlink();
      }, delay);
    };

    scheduleNextBlink();

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // Inactivity tracking
  const resetInactivity = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current);

    setMood((prev) => {
      if (prev === 'sleeping' || prev === 'bored') {
        return 'normal';
      }
      return prev;
    });

    idleTimerRef.current = setTimeout(() => {
      setMood((prev) => {
        if (prev !== 'angry' && prev !== 'annoyed') {
          triggerSpeech("Still exploring? Feel free to check out the projects below!");
          return 'bored';
        }
        return prev;
      });
    }, 15000);

    sleepTimerRef.current = setTimeout(() => {
      setMood((prev) => {
        if (prev !== 'angry' && prev !== 'annoyed') {
          return 'sleeping';
        }
        return prev;
      });
    }, 30000);
  }, [triggerSpeech]);

  // Handle global mousemove for cursor tracking
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      resetInactivity();

      if (!characterRef.current) return;
      const rect = characterRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.42; // focus on eye level

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Normalization: screen width & height relative
      const screenNormX = deltaX / (window.innerWidth * 0.45);
      const screenNormY = deltaY / (window.innerHeight * 0.45);

      // Clamp pupil travel within realistic iris/eye socket bounds (-6px to 6px, -4px to 4px)
      const targetPupilX = Math.max(-5.5, Math.min(5.5, screenNormX * 5.5));
      const targetPupilY = Math.max(-3.8, Math.min(3.8, screenNormY * 3.8));

      setPupilX(targetPupilX);
      setPupilY(targetPupilY);

      // Subtle 3D perspective head tracking
      const targetHeadRot = Math.max(-4, Math.min(4, screenNormX * 4));
      const targetHeadX = Math.max(-5, Math.min(5, screenNormX * 5));
      const targetHeadY = Math.max(-3, Math.min(3, screenNormY * 3));

      setHeadRotate(targetHeadRot);
      setHeadX(targetHeadX);
      setHeadY(targetHeadY);

      // If in bored or sleeping state, wake back to normal
      setMood((prev) => {
        if (prev === 'sleeping' || prev === 'bored') {
          return 'normal';
        }
        if (mouseHoverRef.current && prev === 'normal') {
          return 'curious';
        }
        return prev;
      });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    resetInactivity();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current);
      if (clickDecayTimerRef.current) clearTimeout(clickDecayTimerRef.current);
      if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    };
  }, [resetInactivity]);

  // Click interaction logic
  const handleCharacterClick = useCallback(() => {
    resetInactivity();
    clickCountRef.current += 1;
    const clicks = clickCountRef.current;

    // Reset decay timer on every click
    if (clickDecayTimerRef.current) clearTimeout(clickDecayTimerRef.current);
    clickDecayTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
      setMood('normal');
    }, 2800);

    if (clicks >= 6) {
      setMood('angry');
      soundManager.playCharacterReact('angry');
      triggerSpeech("Okay, okay! That's enough poking for now! 💢");
    } else if (clicks >= 3) {
      setMood('annoyed');
      soundManager.playCharacterReact('annoyed');
      triggerSpeech("Hey, watch the clicks friend!");
    } else if (clicks === 2) {
      setMood('happy');
      soundManager.playCharacterReact('happy');
      triggerSpeech("Ready to build something creative together? ✨");
    } else {
      setMood('surprised');
      soundManager.playCharacterReact('surprised');
      triggerSpeech("Hey! Welcome to my portfolio.");
      // Return to normal or curious after brief reaction
      setTimeout(() => {
        setMood((current) => (current === 'surprised' ? (mouseHoverRef.current ? 'curious' : 'normal') : current));
      }, 1400);
    }
  }, [resetInactivity, triggerSpeech]);

  const handleMouseEnter = useCallback(() => {
    mouseHoverRef.current = true;
    resetInactivity();
    setMood((prev) => {
      if (prev === 'normal') {
        return 'curious';
      }
      return prev;
    });
  }, [resetInactivity]);

  const handleMouseLeave = useCallback(() => {
    mouseHoverRef.current = false;
    setMood((prev) => {
      if (prev === 'curious') {
        return 'normal';
      }
      return prev;
    });
  }, []);

  // Compute facial geometry offsets based on active mood
  let eyeLidClosedFraction = 0;
  if (mood === 'sleeping') {
    eyeLidClosedFraction = 1; // fully closed
  } else if (isBlinking) {
    eyeLidClosedFraction = 1; // momentary blink
  } else if (mood === 'bored') {
    eyeLidClosedFraction = 0.52; // half lidded drowsy
  } else if (mood === 'annoyed') {
    eyeLidClosedFraction = 0.28; // slightly narrowed
  } else if (mood === 'angry') {
    eyeLidClosedFraction = 0.35; // intensely narrowed
  } else if (mood === 'surprised') {
    eyeLidClosedFraction = 0; // wide open
  }

  // Eyebrow geometry
  let eyebrowLeftOffset = { y: 0, rotate: 0 };
  let eyebrowRightOffset = { y: 0, rotate: 0 };

  if (mood === 'curious') {
    eyebrowLeftOffset = { y: -4, rotate: -4 };
    eyebrowRightOffset = { y: -1, rotate: 2 };
  } else if (mood === 'surprised') {
    eyebrowLeftOffset = { y: -6, rotate: -2 };
    eyebrowRightOffset = { y: -6, rotate: 2 };
  } else if (mood === 'annoyed') {
    eyebrowLeftOffset = { y: 1, rotate: 4 };
    eyebrowRightOffset = { y: 3, rotate: 6 };
  } else if (mood === 'angry') {
    eyebrowLeftOffset = { y: 4, rotate: 10 };
    eyebrowRightOffset = { y: 4, rotate: -10 };
  } else if (mood === 'bored' || mood === 'sleeping') {
    eyebrowLeftOffset = { y: 2, rotate: 0 };
    eyebrowRightOffset = { y: 2, rotate: 0 };
  }

  // Mouth state
  let mouthState: RigCharacterState['mouthState'] = 'neutral';
  if (mood === 'happy') mouthState = 'smile';
  else if (mood === 'surprised') mouthState = 'open';
  else if (mood === 'curious') mouthState = 'curious';
  else if (mood === 'annoyed') mouthState = 'annoyed';
  else if (mood === 'angry') mouthState = 'angry';
  else if (mood === 'bored') mouthState = 'bored';

  return {
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
  };
}
