import { useState, useEffect, useRef, useCallback } from 'react';
import { soundManager } from '../utils/audio';

export type CharacterVideoState =
  | 'idle'
  | 'welcome'
  | 'looking'
  | 'curious'
  | 'happy'
  | 'playful'
  | 'surprised'
  | 'bored'
  | 'annoyed'
  | 'angry';

export interface VideoSegment {
  start: number;
  end: number;
  playbackRate?: number;
  nextState: CharacterVideoState;
  priority: number;
}

// Frame-accurate timeline segments for the 10.027s 24fps character video
export const VIDEO_SEGMENTS: Record<CharacterVideoState, VideoSegment> = {
  idle: {
    start: 0.0,
    end: 1.42,
    playbackRate: 1.0,
    nextState: 'idle',
    priority: 1, // lowest
  },
  welcome: {
    start: 3.85,
    end: 4.8,
    playbackRate: 1.0,
    nextState: 'idle',
    priority: 2,
  },
  looking: {
    start: 1.45,
    end: 2.75,
    playbackRate: 1.05,
    nextState: 'idle',
    priority: 3,
  },
  curious: {
    start: 2.75,
    end: 3.85,
    playbackRate: 1.0,
    nextState: 'idle',
    priority: 4,
  },
  happy: {
    start: 3.85,
    end: 4.8,
    playbackRate: 1.0,
    nextState: 'idle',
    priority: 5,
  },
  bored: {
    start: 6.8,
    end: 7.7,
    playbackRate: 1.0,
    nextState: 'idle',
    priority: 2,
  },
  playful: {
    // First click: Wears and adjusts sunglasses
    start: 4.85,
    end: 5.82,
    playbackRate: 1.0,
    nextState: 'happy', // Auto-transitions smoothly to happy smile
    priority: 6,
  },
  surprised: {
    // Second click: Hand raised, wide-eye gasp
    start: 5.85,
    end: 6.8,
    playbackRate: 1.0,
    nextState: 'curious', // Auto-transitions to curious glance
    priority: 7,
  },
  annoyed: {
    // 3-5 clicks: Irritated grimace with tick mark
    start: 7.75,
    end: 8.75,
    playbackRate: 1.0,
    nextState: 'idle', // Auto-transitions back to idle
    priority: 8,
  },
  angry: {
    // 6+ clicks: Pulsing red anime vein, exasperation
    start: 8.75,
    end: 9.98,
    playbackRate: 1.0,
    nextState: 'annoyed', // Cools down to annoyed then idle
    priority: 9,
  },
};

export const DIALOGUE_MAP: Record<CharacterVideoState, string[]> = {
  idle: [
    "Not just writing code. I build experiences.",
    "Hey! Welcome to my personal digital space.",
    "Turning ideas into kinetic digital reality."
  ],
  welcome: [
    "Welcome! Glad you're here. Let's explore!",
    "Hey there! Ready to discover my latest work?"
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
  bored: [
    "Still exploring? Feel free to check out my work!",
    "Taking a breather? The projects section has cool stuff!"
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

export type VideoSlot = 'A' | 'B';

export interface UseVideoCharacterControllerReturn {
  activeState: CharacterVideoState;
  activeSlot: VideoSlot;
  videoARef: React.RefObject<HTMLVideoElement | null>;
  videoBRef: React.RefObject<HTMLVideoElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  speechMessage: string | null;
  isVideoReady: boolean;
  handleCharacterClick: () => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

export function useVideoCharacterController(): UseVideoCharacterControllerReturn {
  const [activeState, setActiveState] = useState<CharacterVideoState>('idle');
  const [activeSlot, setActiveSlot] = useState<VideoSlot>('A');
  const [speechMessage, setSpeechMessage] = useState<string | null>(null);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);

  // Video element refs for dual-video crossfade
  const videoARef = useRef<HTMLVideoElement | null>(null);
  const videoBRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // High-frequency animation state kept in refs to avoid React re-render overhead
  const activeSlotRef = useRef<VideoSlot>('A');
  const activeStateRef = useRef<CharacterVideoState>('idle');
  const currentSegmentRef = useRef<VideoSegment>(VIDEO_SEGMENTS.idle);
  const isSegmentEndingRef = useRef<boolean>(false);
  const idleCycleCountRef = useRef<number>(0);

  // Interaction tracking refs
  const clickCountRef = useRef<number>(0);
  const clickDecayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const speechTimerRef = useRef<NodeJS.Timeout | null>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef<boolean>(false);

  // Cursor tracking refs
  const pointerPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastPointerTimeRef = useRef<number>(Date.now());
  const cursorSpeedRef = useRef<number>(0);
  const prevDistanceRef = useRef<number>(1000);

  // 3D Tilt orientation (lerped in RAF)
  const currentTiltRef = useRef<{ rotateX: number; rotateY: number }>({ rotateX: 0, rotateY: 0 });
  const targetTiltRef = useRef<{ rotateX: number; rotateY: number }>({ rotateX: 0, rotateY: 0 });
  const rafIdRef = useRef<number | null>(null);

  // Trigger floating speech dialogue
  const triggerSpeech = useCallback((text: string, durationMs: number = 3200) => {
    if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    setSpeechMessage(text);
    speechTimerRef.current = setTimeout(() => {
      setSpeechMessage(null);
    }, durationMs);
  }, []);

  // Determine the next state automatically when a segment reaches its end
  const getNextAutoState = useCallback((currentState: CharacterVideoState): CharacterVideoState => {
    // If still hovering over character and not in angry state
    if (isHoveredRef.current && clickCountRef.current === 0) {
      return 'happy';
    }

    // Progression graph based on current state
    switch (currentState) {
      case 'angry':
        // Cools down into annoyed
        return 'annoyed';

      case 'annoyed':
        // Cools down into idle
        return 'idle';

      case 'playful':
        // Sunglasses action finishes -> transitions to happy smile
        return 'happy';

      case 'surprised':
        // Gasp finishes -> transitions to curious look
        return 'curious';

      case 'curious':
        return 'idle';

      case 'looking':
        // If cursor is still actively moving, continue looking; otherwise return to idle
        if (cursorSpeedRef.current > 0.25 && clickCountRef.current === 0) {
          return 'looking';
        }
        return 'idle';

      case 'happy':
        return isHoveredRef.current ? 'happy' : 'idle';

      case 'welcome':
        return 'idle';

      case 'bored':
        return 'idle';

      case 'idle': {
        // Continuous natural idle variations:
        // Normally loop idle (0.0 - 1.4s), but every 4th cycle insert a natural glance or soft smile
        idleCycleCountRef.current += 1;
        if (idleCycleCountRef.current % 4 === 0) {
          return 'curious';
        }
        return 'idle';
      }

      default:
        return 'idle';
    }
  }, []);

  // Core dual-video crossfade transition function:
  // Prepares the standby video at target start and crossfades without ANY visible pause or black frame
  const transitionTo = useCallback((newState: CharacterVideoState, force: boolean = false) => {
    const targetSeg = VIDEO_SEGMENTS[newState];
    const currentSeg = currentSegmentRef.current;

    // Unless forced (segment ending), lower-priority states cannot interrupt high-priority click interactions
    if (!force && targetSeg.priority < currentSeg.priority && !isSegmentEndingRef.current) {
      return;
    }

    // Avoid redundant re-triggers of the exact same state if already in progress and not completing
    if (activeStateRef.current === newState && !isSegmentEndingRef.current) {
      return;
    }

    const currentSlot = activeSlotRef.current;
    const nextSlot: VideoSlot = currentSlot === 'A' ? 'B' : 'A';
    const currentVideo = currentSlot === 'A' ? videoARef.current : videoBRef.current;
    const nextVideo = nextSlot === 'A' ? videoARef.current : videoBRef.current;

    if (!nextVideo) return;

    activeStateRef.current = newState;
    setActiveState(newState);
    currentSegmentRef.current = targetSeg;
    isSegmentEndingRef.current = false;

    // Configure the standby video
    nextVideo.playbackRate = targetSeg.playbackRate || 1.0;
    nextVideo.currentTime = targetSeg.start;

    // Start playback on next video and crossfade
    const playPromise = nextVideo.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Switch active slot for smooth CSS opacity crossfade
          activeSlotRef.current = nextSlot;
          setActiveSlot(nextSlot);

          // Once next video is visibly active and crossfading, pause the inactive video after 240ms
          setTimeout(() => {
            if (activeSlotRef.current === nextSlot && currentVideo && !currentVideo.paused) {
              currentVideo.pause();
            }
          }, 240);
        })
        .catch(() => {
          // Autoplay fallback (browser interaction pending)
        });
    }
  }, []);

  // Primary animation loop: checks segment boundaries and applies 60fps 3D tilt
  useEffect(() => {
    const loop = () => {
      const currentSlot = activeSlotRef.current;
      const activeVideo = currentSlot === 'A' ? videoARef.current : videoBRef.current;

      // 1. Continuous playback check: if within 0.08s of segment end, advance to next state
      if (activeVideo && !activeVideo.paused && !document.hidden) {
        const ct = activeVideo.currentTime;
        const seg = currentSegmentRef.current;

        if (ct >= seg.end - 0.08) {
          isSegmentEndingRef.current = true;
          const nextState = getNextAutoState(activeStateRef.current);
          transitionTo(nextState, true);
        }
      }

      // 2. Smooth 3D tilt interpolation on container (independent of React state)
      currentTiltRef.current.rotateX +=
        (targetTiltRef.current.rotateX - currentTiltRef.current.rotateX) * 0.12;
      currentTiltRef.current.rotateY +=
        (targetTiltRef.current.rotateY - currentTiltRef.current.rotateY) * 0.12;

      if (containerRef.current) {
        const rx = currentTiltRef.current.rotateX.toFixed(2);
        const ry = currentTiltRef.current.rotateY.toFixed(2);
        containerRef.current.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [getNextAutoState, transitionTo]);

  // Initial setup: start video playback cleanly
  useEffect(() => {
    const vidA = videoARef.current;
    const vidB = videoBRef.current;
    if (!vidA) return;

    let started = false;
    const startInitialPlayback = () => {
      if (started) return;
      started = true;
      setIsVideoReady(true);
      activeStateRef.current = 'welcome';
      setActiveState('welcome');
      currentSegmentRef.current = VIDEO_SEGMENTS.welcome;
      vidA.currentTime = VIDEO_SEGMENTS.welcome.start;
      vidA.play().catch(() => {});
    };

    vidA.addEventListener('canplay', startInitialPlayback, { once: true });
    if (vidA.readyState >= 3) {
      startInitialPlayback();
    }

    // Preload both videos
    if (vidB && vidB.readyState < 3) {
      vidB.load();
    }

    return () => {
      vidA.removeEventListener('canplay', startInitialPlayback);
    };
  }, []);

  // Global cursor tracking across the ENTIRE viewport
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      const now = performance.now();
      const dt = Math.max(1, now - lastPointerTimeRef.current);
      lastPointerTimeRef.current = now;

      const clientX = e.clientX;
      const clientY = e.clientY;

      const prevX = pointerPosRef.current.x;
      const prevY = pointerPosRef.current.y;
      pointerPosRef.current = { x: clientX, y: clientY };

      // Calculate cursor velocity
      const distMoved = Math.hypot(clientX - prevX, clientY - prevY);
      const speed = distMoved / dt;
      cursorSpeedRef.current = speed;

      // Reset inactivity timer
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = setTimeout(() => {
        if (clickCountRef.current === 0 && activeStateRef.current === 'idle') {
          transitionTo('bored', false);
          triggerSpeech(DIALOGUE_MAP.bored[0], 3000);
        }
      }, 14000);

      // Viewport-relative angles for 3D parallax head tracking
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const charCenterX = rect.left + rect.width * 0.5;
        const charCenterY = rect.top + rect.height * 0.38; // Eye level

        const deltaX = clientX - charCenterX;
        const deltaY = clientY - charCenterY;
        const distance = Math.hypot(deltaX, deltaY);

        // Normalize across viewport
        const reachX = Math.max(300, window.innerWidth * 0.48);
        const reachY = Math.max(250, window.innerHeight * 0.48);
        const normX = Math.max(-1, Math.min(1, deltaX / reachX));
        const normY = Math.max(-1, Math.min(1, deltaY / reachY));

        // 3D tilt target orientation
        targetTiltRef.current = {
          rotateY: normX * 8.5,
          rotateX: -normY * 6.0,
        };

        // Approaching detection
        const prevDistance = prevDistanceRef.current;
        prevDistanceRef.current = distance;
        const isApproaching = prevDistance > 320 && distance < 220 && distance > 50;

        // Expression evaluation based on priority (if no click interaction is ongoing)
        if (clickCountRef.current === 0) {
          if (isHoveredRef.current) {
            if (activeStateRef.current !== 'happy') {
              transitionTo('happy');
            }
          } else if (isApproaching) {
            if (activeStateRef.current === 'idle' || activeStateRef.current === 'looking') {
              transitionTo('curious');
            }
          } else if (speed > 0.28 && distance > 80) {
            // When cursor moves across other sections, trigger looking reaction
            if (activeStateRef.current === 'idle') {
              transitionTo('looking');
            }
          }
        }
      }
    };

    const onPointerLeaveWindow = () => {
      targetTiltRef.current = { rotateX: 0, rotateY: 0 };
      if (clickCountRef.current === 0) {
        transitionTo('idle');
      }
    };

    // Tab visibility handling (pause/resume without freezing)
    const onVisibilityChange = () => {
      if (document.hidden) {
        if (videoARef.current) videoARef.current.pause();
        if (videoBRef.current) videoBRef.current.pause();
      } else {
        const activeVid = activeSlotRef.current === 'A' ? videoARef.current : videoBRef.current;
        if (activeVid) {
          activeVid.play().catch(() => {});
        }
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeaveWindow);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeaveWindow);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (clickDecayTimerRef.current) clearTimeout(clickDecayTimerRef.current);
      if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [transitionTo, triggerSpeech]);

  // Click interaction with escalation: Playful -> Surprised -> Annoyed -> Angry -> Return to Idle
  const handleCharacterClick = useCallback(() => {
    clickCountRef.current += 1;
    const clicks = clickCountRef.current;

    // Reset decay timer: after 3.8s of no clicks, counter resets
    if (clickDecayTimerRef.current) clearTimeout(clickDecayTimerRef.current);
    clickDecayTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 3800);

    if (clicks >= 6) {
      // 6+ clicks: Angry vein pulse
      transitionTo('angry', true);
      soundManager.playCharacterReact('angry');
      triggerSpeech(DIALOGUE_MAP.angry[Math.floor(Math.random() * DIALOGUE_MAP.angry.length)], 3800);
    } else if (clicks >= 3) {
      // 3-5 clicks: Annoyed grimace
      transitionTo('annoyed', true);
      soundManager.playCharacterReact('annoyed');
      triggerSpeech(DIALOGUE_MAP.annoyed[Math.floor(Math.random() * DIALOGUE_MAP.annoyed.length)], 3200);
    } else if (clicks === 2) {
      // 2nd click: Surprised gasp
      transitionTo('surprised', true);
      soundManager.playCharacterReact('surprised');
      triggerSpeech(DIALOGUE_MAP.surprised[Math.floor(Math.random() * DIALOGUE_MAP.surprised.length)], 3000);
    } else {
      // 1st click: Playful sunglasses action!
      transitionTo('playful', true);
      soundManager.playClick();
      triggerSpeech(DIALOGUE_MAP.playful[0], 3600);
    }
  }, [transitionTo, triggerSpeech]);

  // Hover interactions
  const handleMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
    if (clickCountRef.current === 0) {
      transitionTo('happy');
      soundManager.playCharacterReact('happy');
      triggerSpeech(DIALOGUE_MAP.happy[0], 2800);
    }
  }, [transitionTo, triggerSpeech]);

  const handleMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
  }, []);

  return {
    activeState,
    activeSlot,
    videoARef,
    videoBRef,
    containerRef,
    speechMessage,
    isVideoReady,
    handleCharacterClick,
    handleMouseEnter,
    handleMouseLeave,
  };
}
