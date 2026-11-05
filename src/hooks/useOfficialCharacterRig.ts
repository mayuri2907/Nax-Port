import { useState, useEffect, useRef, useCallback } from 'react';
import { soundManager } from '../utils/audio';

export type CharacterExpression =
  | 'idle'
  | 'looking'
  | 'curious'
  | 'happy'
  | 'surprised'
  | 'thinking'
  | 'annoyed'
  | 'angry'
  | 'bored'
  | 'sleeping';

export interface OfficialCharacterRigState {
  expression: CharacterExpression;
  pupilX: number; // SVG px offset (-8.5 to 8.5)
  pupilY: number; // SVG px offset (-2.8 to 2.8)
  headRotateX: number; // 3D tilt degrees (-4.5 to 4.5)
  headRotateY: number; // 3D tilt degrees (-6.5 to 6.5)
  isBlinking: boolean;
  isSleeping: boolean;
  isBored: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  speechMessage: string | null;
  handleCharacterClick: () => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

export const DIALOGUE_MAP: Record<CharacterExpression, string[]> = {
  idle: [
    "Hey! Welcome to my creative portfolio.",
    "Not just writing code. I build experiences.",
    "Turning ideas into digital reality."
  ],
  looking: [
    "I see where you're pointing!",
    "Exploring the work? Feel free to look around.",
    "Watching that cursor glide..."
  ],
  curious: [
    "Interested in my tech stack or projects?",
    "Need an innovative web or mobile architecture?",
    "Taking a closer look?"
  ],
  happy: [
    "Glad you're here! Let's build something epic! ✨",
    "Turning complex systems into clean software.",
    "Clean code, seamless animations, zero compromise."
  ],
  surprised: [
    "Whoa! That caught my attention!",
    "You clicked! Nice reflex.",
    "Ready to explore the portfolio?"
  ],
  thinking: [
    "Hmm... optimizing algorithms and latencies...",
    "Designing scalable state pipelines...",
    "What shall we build next?"
  ],
  annoyed: [
    "Hey, easy on the mouse button! ☕",
    "Poking developers usually requires coffee first.",
    "Careful, you might trigger a stack overflow!"
  ],
  angry: [
    "Okay, that's enough poking for now! 💢",
    "Patience buffer temporarily exceeded!",
    "Time out! Let me get back to coding."
  ],
  bored: [
    "Still there? *yawns*",
    "Quiet around here... check out the projects page!",
    "Need inspiration? Explore AI SkillPath."
  ],
  sleeping: [
    "Zzz... Recompiling dreams in TypeScript...",
    "Zzz... Move your mouse to wake me up...",
    "System in low-power sleep mode..."
  ]
};

export function useOfficialCharacterRig(): OfficialCharacterRigState {
  const [expression, setExpression] = useState<CharacterExpression>('idle');
  const [pupilX, setPupilX] = useState<number>(0);
  const [pupilY, setPupilY] = useState<number>(0);
  const [headRotateX, setHeadRotateX] = useState<number>(0);
  const [headRotateY, setHeadRotateY] = useState<number>(0);
  const [isBlinking, setIsBlinking] = useState<boolean>(false);
  const [speechMessage, setSpeechMessage] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const clickCountRef = useRef<number>(0);
  const clickDecayRef = useRef<NodeJS.Timeout | null>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const sleepTimerRef = useRef<NodeJS.Timeout | null>(null);
  const speechTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef<boolean>(false);

  // Trigger speech bubble
  const triggerSpeech = useCallback((text: string, durationMs: number = 3200) => {
    if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    setSpeechMessage(text);
    speechTimerRef.current = setTimeout(() => {
      setSpeechMessage(null);
    }, durationMs);
  }, []);

  // Natural Random Blinking (120ms blink every 3.2s to 5.8s)
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const scheduleBlink = () => {
      const delay = Math.random() * 2600 + 3200;
      timer = setTimeout(() => {
        setExpression((curr) => {
          if (curr !== 'sleeping') {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 130);
          }
          return curr;
        });
        scheduleBlink();
      }, delay);
    };

    scheduleBlink();
    return () => clearTimeout(timer);
  }, []);

  // Listen for intro completion to trigger welcoming reaction
  useEffect(() => {
    const onIntroFinish = () => {
      setExpression('happy');
      soundManager.playCharacterReact('happy');
      triggerSpeech("Hey! Welcome to my world. Let's build something epic! ✨", 3800);
      setTimeout(() => {
        setExpression((curr) => (curr === 'happy' ? 'idle' : curr));
      }, 2800);
    };

    window.addEventListener('navin-intro-finish', onIntroFinish);
    return () => {
      window.removeEventListener('navin-intro-finish', onIntroFinish);
    };
  }, [triggerSpeech]);

  // Inactivity tracking
  const resetInactivity = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current);

    setExpression((prev) => {
      if (prev === 'sleeping' || prev === 'bored') {
        return 'idle';
      }
      return prev;
    });

    idleTimerRef.current = setTimeout(() => {
      setExpression((prev) => {
        if (prev !== 'angry' && prev !== 'annoyed') {
          triggerSpeech(DIALOGUE_MAP.bored[Math.floor(Math.random() * DIALOGUE_MAP.bored.length)]);
          return 'bored';
        }
        return prev;
      });
    }, 16000);

    sleepTimerRef.current = setTimeout(() => {
      setExpression((prev) => {
        if (prev !== 'angry' && prev !== 'annoyed') {
          return 'sleeping';
        }
        return prev;
      });
    }, 34000);
  }, [triggerSpeech]);

  // Real-Time Mouse Tracking
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      resetInactivity();

      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width * 0.5;
      const centerY = rect.top + rect.height * 0.36; // eye level

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Normalization relative to responsive interaction radius
      const reachX = Math.min(window.innerWidth * 0.4, 450);
      const reachY = Math.min(window.innerHeight * 0.4, 350);

      const normX = Math.max(-1, Math.min(1, deltaX / reachX));
      const normY = Math.max(-1, Math.min(1, deltaY / reachY));

      // Pupil travel in SVG units (-4.2px to +4.2px X, -1.8px to +1.8px Y)
      const targetPupilX = normX * 4.2;
      const targetPupilY = normY * 1.8;

      setPupilX(targetPupilX);
      setPupilY(targetPupilY);

      // 3D perspective head rotation on container (-7.5deg to +7.5deg)
      const targetRotY = normX * 7.5;
      const targetRotX = -normY * 5.0;

      setHeadRotateY(targetRotY);
      setHeadRotateX(targetRotX);

      setExpression((prev) => {
        if (prev === 'sleeping' || prev === 'bored') {
          return 'idle';
        }
        if (isHoveredRef.current && prev === 'idle') {
          return 'curious';
        }
        if (prev === 'idle') {
          return 'looking';
        }
        return prev;
      });
    };

    const onMouseLeaveWindow = () => {
      setPupilX(0);
      setPupilY(0);
      setHeadRotateX(0);
      setHeadRotateY(0);
      setExpression((prev) => (prev === 'looking' ? 'idle' : prev));
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeaveWindow);
    resetInactivity();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeaveWindow);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (sleepTimerRef.current) clearTimeout(sleepTimerRef.current);
      if (clickDecayRef.current) clearTimeout(clickDecayRef.current);
      if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    };
  }, [resetInactivity]);

  // Click interaction logic
  const handleCharacterClick = useCallback(() => {
    resetInactivity();
    clickCountRef.current += 1;
    const clicks = clickCountRef.current;

    if (clickDecayRef.current) clearTimeout(clickDecayRef.current);
    clickDecayRef.current = setTimeout(() => {
      clickCountRef.current = 0;
      setExpression('idle');
    }, 3200);

    if (clicks >= 6) {
      setExpression('angry');
      soundManager.playCharacterReact('angry');
      triggerSpeech(DIALOGUE_MAP.angry[Math.floor(Math.random() * DIALOGUE_MAP.angry.length)]);
    } else if (clicks >= 3) {
      setExpression('annoyed');
      soundManager.playCharacterReact('annoyed');
      triggerSpeech(DIALOGUE_MAP.annoyed[Math.floor(Math.random() * DIALOGUE_MAP.annoyed.length)]);
    } else if (clicks === 2) {
      setExpression('happy');
      soundManager.playCharacterReact('happy');
      triggerSpeech(DIALOGUE_MAP.happy[Math.floor(Math.random() * DIALOGUE_MAP.happy.length)]);
    } else {
      setExpression('surprised');
      soundManager.playCharacterReact('surprised');
      triggerSpeech(DIALOGUE_MAP.surprised[Math.floor(Math.random() * DIALOGUE_MAP.surprised.length)]);
      setTimeout(() => {
        setExpression((curr) => (curr === 'surprised' ? (isHoveredRef.current ? 'curious' : 'idle') : curr));
      }, 1800);
    }
  }, [resetInactivity, triggerSpeech]);

  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
    resetInactivity();
    setExpression((prev) => {
      if (prev === 'idle' || prev === 'looking') {
        return 'curious';
      }
      return prev;
    });
  }, [resetInactivity]);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    setExpression((prev) => {
      if (prev === 'curious' || prev === 'looking') {
        return 'idle';
      }
      return prev;
    });
  }, []);

  return {
    expression,
    pupilX,
    pupilY,
    headRotateX,
    headRotateY,
    isBlinking,
    isSleeping: expression === 'sleeping',
    isBored: expression === 'bored',
    containerRef,
    speechMessage,
    handleCharacterClick,
    handleMouseEnter,
    handleMouseLeave
  };
}
