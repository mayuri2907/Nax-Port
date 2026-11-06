import { useState, useEffect, useRef, useCallback } from 'react';
import { soundManager } from '../utils/audio';

export type CharacterVideoState =
  | 'idle'
  | 'looking'
  | 'curious'
  | 'happy'
  | 'playful'
  | 'surprised'
  | 'annoyed'
  | 'angry';

export interface VideoSegment {
  start: number;
  end: number;
  loop?: boolean;
  holdAtEnd?: boolean;
  returnToIdleAfterMs?: number;
  playbackRate?: number;
}

// Precise segment boundaries matching the 10.027s 24fps character video
export const VIDEO_SEGMENTS: Record<CharacterVideoState, VideoSegment> = {
  idle: {
    start: 0.0,
    end: 1.4,
    loop: true,
    playbackRate: 1.0,
  },
  looking: {
    start: 1.45,
    end: 2.75,
    holdAtEnd: true,
    returnToIdleAfterMs: 2500,
    playbackRate: 1.1,
  },
  curious: {
    start: 2.8,
    end: 3.8,
    holdAtEnd: true,
    returnToIdleAfterMs: 2800,
    playbackRate: 1.0,
  },
  happy: {
    // Warm friendly smile
    start: 3.85,
    end: 4.8,
    holdAtEnd: true,
    returnToIdleAfterMs: 3200,
    playbackRate: 1.0,
  },
  playful: {
    // Sunglasses action
    start: 4.85,
    end: 5.8,
    holdAtEnd: true,
    returnToIdleAfterMs: 3800,
    playbackRate: 1.0,
  },
  surprised: {
    // Raised hand, wide eyes gasp
    start: 5.85,
    end: 6.8,
    holdAtEnd: true,
    returnToIdleAfterMs: 3000,
    playbackRate: 1.0,
  },
  annoyed: {
    // Irritated grimace with tick mark
    start: 7.6,
    end: 8.6,
    holdAtEnd: true,
    returnToIdleAfterMs: 3400,
    playbackRate: 1.0,
  },
  angry: {
    // Pulsing red anime vein, frustrated sigh
    start: 8.65,
    end: 9.95,
    holdAtEnd: true,
    returnToIdleAfterMs: 4000,
    playbackRate: 1.0,
  },
};

export const DIALOGUE_MAP: Record<CharacterVideoState, string[]> = {
  idle: [
    "Not just writing code. I build experiences.",
    "Hey! Welcome to my personal digital space.",
    "Turning ideas into kinetic digital reality."
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
    "Clean code, seamless animations, zero compromise.",
    "Turning complex systems into clean software."
  ],
  playful: [
    "Not just writing code. I build experiences. 😎",
    "Sunglasses on, compiler running smoothly.",
    "Style meets scalable software architecture."
  ],
  surprised: [
    "Whoa! That caught my attention!",
    "You clicked! Nice reflex.",
    "Ready to dive into my projects?"
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
  ]
};

export interface UseVideoCharacterControllerReturn {
  activeState: CharacterVideoState;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  speechMessage: string | null;
  headRotateX: number;
  headRotateY: number;
  isVideoReady: boolean;
  handleCharacterClick: () => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

export function useVideoCharacterController(): UseVideoCharacterControllerReturn {
  const [activeState, setActiveState] = useState<CharacterVideoState>('idle');
  const [speechMessage, setSpeechMessage] = useState<string | null>(null);
  const [headRotateX, setHeadRotateX] = useState<number>(0);
  const [headRotateY, setHeadRotateY] = useState<number>(0);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeStateRef = useRef<CharacterVideoState>('idle');
  const currentSegmentRef = useRef<VideoSegment>(VIDEO_SEGMENTS.idle);
  const isSeekingRef = useRef<boolean>(false);

  const clickCountRef = useRef<number>(0);
  const clickDecayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const returnToIdleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const speechTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastMouseMoveTimeRef = useRef<number>(Date.now());
  const rafIdRef = useRef<number | null>(null);
  const isHoveredRef = useRef<boolean>(false);

  // Trigger dialogue speech bubble
  const triggerSpeech = useCallback((text: string, durationMs: number = 3200) => {
    if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    setSpeechMessage(text);
    speechTimerRef.current = setTimeout(() => {
      setSpeechMessage(null);
    }, durationMs);
  }, []);

  // Return to idle transition helper
  const scheduleReturnToIdle = useCallback((delayMs: number = 2500) => {
    if (returnToIdleTimerRef.current) clearTimeout(returnToIdleTimerRef.current);
    returnToIdleTimerRef.current = setTimeout(() => {
      // Don't interrupt if currently in an active clicked state with pending clicks
      if (clickCountRef.current > 0) return;
      playSegment('idle');
    }, delayMs);
  }, []);

  // Core segment player: seeks cleanly to segment start and controls boundary
  const playSegment = useCallback((stateName: CharacterVideoState) => {
    const video = videoRef.current;
    if (!video) return;

    // Prevent re-triggering the same segment if already playing
    if (activeStateRef.current === stateName && !video.paused) {
      return;
    }

    if (returnToIdleTimerRef.current) clearTimeout(returnToIdleTimerRef.current);

    activeStateRef.current = stateName;
    setActiveState(stateName);

    const seg = VIDEO_SEGMENTS[stateName];
    currentSegmentRef.current = seg;

    video.playbackRate = seg.playbackRate || 1.0;

    isSeekingRef.current = true;
    video.currentTime = seg.start;

    const onSeeked = () => {
      isSeekingRef.current = false;
      video.removeEventListener('seeked', onSeeked);
      video.play().catch(() => {});
    };
    video.addEventListener('seeked', onSeeked, { once: true });
  }, []);

  // Frame monitoring loop to enforce segment boundaries
  useEffect(() => {
    const checkFrame = () => {
      const video = videoRef.current;
      if (video && !isSeekingRef.current) {
        const seg = currentSegmentRef.current;
        const ct = video.currentTime;

        // If reached or passed segment end
        if (ct >= seg.end - 0.04) {
          if (seg.loop) {
            // Loop back to segment start seamlessly
            video.currentTime = seg.start;
            video.play().catch(() => {});
          } else if (seg.holdAtEnd) {
            // Hold on the peak expression frame and schedule return
            video.pause();
            video.currentTime = seg.end - 0.02;
            scheduleReturnToIdle(seg.returnToIdleAfterMs || 2500);
          }
        }
      }
      rafIdRef.current = requestAnimationFrame(checkFrame);
    };

    rafIdRef.current = requestAnimationFrame(checkFrame);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [scheduleReturnToIdle]);

  // Handle video ready state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => {
      setIsVideoReady(true);
      if (activeStateRef.current === 'idle') {
        playSegment('idle');
      }
    };

    video.addEventListener('canplay', onCanPlay);
    if (video.readyState >= 3) {
      onCanPlay();
    }

    return () => {
      video.removeEventListener('canplay', onCanPlay);
    };
  }, [playSegment]);

  // Click interaction state machine with escalation
  const handleCharacterClick = useCallback(() => {
    clickCountRef.current += 1;
    const clicks = clickCountRef.current;

    // Reset decay timer on every click
    if (clickDecayTimerRef.current) clearTimeout(clickDecayTimerRef.current);
    clickDecayTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
      playSegment('idle');
    }, 3800);

    if (clicks >= 6) {
      // Escalated anger (repeated poking)
      playSegment('angry');
      soundManager.playCharacterReact('angry');
      triggerSpeech(DIALOGUE_MAP.angry[Math.floor(Math.random() * DIALOGUE_MAP.angry.length)], 3800);
    } else if (clicks >= 3) {
      // Annoyed / irritated
      playSegment('annoyed');
      soundManager.playCharacterReact('annoyed');
      triggerSpeech(DIALOGUE_MAP.annoyed[Math.floor(Math.random() * DIALOGUE_MAP.annoyed.length)], 3200);
    } else if (clicks === 2) {
      // Surprised reaction
      playSegment('surprised');
      soundManager.playCharacterReact('surprised');
      triggerSpeech(DIALOGUE_MAP.surprised[Math.floor(Math.random() * DIALOGUE_MAP.surprised.length)], 3000);
    } else {
      // First click: Playful sunglasses action!
      playSegment('playful');
      soundManager.playClick();
      triggerSpeech(DIALOGUE_MAP.playful[0], 3600);
    }
  }, [playSegment, triggerSpeech]);

  // Hover interaction
  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
    // Only switch to happy if not in an angry or annoyed escalation
    if (clickCountRef.current === 0 && activeStateRef.current !== 'playful' && activeStateRef.current !== 'surprised') {
      playSegment('happy');
      soundManager.playCharacterReact('happy');
      triggerSpeech(DIALOGUE_MAP.happy[0], 2800);
    }
  }, [playSegment, triggerSpeech]);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    if (clickCountRef.current === 0) {
      scheduleReturnToIdle(1800);
    }
  }, [scheduleReturnToIdle]);

  // Global mousemove tracking for 3D perspective tilt & looking reaction
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      lastMouseMoveTimeRef.current = Date.now();

      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width * 0.5;
      const centerY = rect.top + rect.height * 0.38;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const reachX = Math.min(window.innerWidth * 0.45, 500);
      const reachY = Math.min(window.innerHeight * 0.45, 400);

      const normX = Math.max(-1, Math.min(1, deltaX / reachX));
      const normY = Math.max(-1, Math.min(1, deltaY / reachY));

      // Subtle 3D perspective tilt on the character container (-5.5deg to +5.5deg)
      setHeadRotateY(normX * 5.5);
      setHeadRotateX(-normY * 3.5);

      // If idle and user moves cursor significantly around character, trigger looking animation
      const distance = Math.hypot(deltaX, deltaY);
      if (
        activeStateRef.current === 'idle' &&
        clickCountRef.current === 0 &&
        !isHoveredRef.current &&
        distance < 550 &&
        distance > 60
      ) {
        playSegment('looking');
      }
    };

    const onMouseLeaveWindow = () => {
      setHeadRotateX(0);
      setHeadRotateY(0);
      if (clickCountRef.current === 0) {
        playSegment('idle');
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeaveWindow);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeaveWindow);
      if (clickDecayTimerRef.current) clearTimeout(clickDecayTimerRef.current);
      if (returnToIdleTimerRef.current) clearTimeout(returnToIdleTimerRef.current);
      if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    };
  }, [playSegment]);

  return {
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
  };
}
