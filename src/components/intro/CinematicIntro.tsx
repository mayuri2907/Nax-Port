import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { soundManager } from '../../utils/audio';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const curtainRef = useRef<HTMLDivElement | null>(null);
  const skipBtnRef = useRef<HTMLButtonElement | null>(null);

  // Scene references
  const scene1Ref = useRef<HTMLDivElement | null>(null);
  const scene2Ref = useRef<HTMLDivElement | null>(null);
  const scene3Ref = useRef<HTMLDivElement | null>(null);
  const scene4Ref = useRef<HTMLDivElement | null>(null);
  const enterBtnRef = useRef<HTMLButtonElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sessionStorage.setItem('navin_intro_completed', 'true');
      onComplete();
      return;
    }

    // Preload critical hero assets during intro
    const preloads = [
      '/assets/character/navin-official.png',
      '/assets/character/navin-character.mp4',
      '/assets/character/navin-avatar.png'
    ];
    preloads.forEach((src) => {
      if (src.endsWith('.mp4')) {
        const vid = document.createElement('video');
        vid.src = src;
        vid.preload = 'auto';
      } else {
        const img = new Image();
        img.src = src;
      }
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          finishIntro();
        }
      });
      timelineRef.current = tl;

      // Animate progress bar (0 to 100% over 5.2s)
      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          width: '100%',
          duration: 5.2,
          ease: 'power1.inOut'
        });
      }

      // Counter animation
      const countObj = { val: 0 };
      gsap.to(countObj, {
        val: 100,
        duration: 5.2,
        ease: 'power1.inOut',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.innerText = `${Math.floor(countObj.val).toString().padStart(3, '0')}%`;
          }
        }
      });

      // ==========================================
      // SCENE 1: Brand & Personal Digital Space (0.0s - 1.3s)
      // ==========================================
      tl.set(scene1Ref.current, { autoAlpha: 1, display: 'flex' })
        .fromTo(
          scene1Ref.current?.querySelectorAll('.s1-anim') || [],
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out' }
        )
        .fromTo(
          scene1Ref.current?.querySelector('.s1-line') || [],
          { width: 0 },
          { width: '48px', duration: 0.45, ease: 'power2.out' },
          '-=0.2'
        )
        .to(scene1Ref.current, {
          y: -15,
          autoAlpha: 0,
          duration: 0.35,
          ease: 'power2.in',
          delay: 0.45
        })
        .set(scene1Ref.current, { display: 'none' });

      // ==========================================
      // SCENE 2: The Manifesto Line (1.3s - 2.6s)
      // ==========================================
      tl.set(scene2Ref.current, { autoAlpha: 1, display: 'flex' })
        .fromTo(
          scene2Ref.current?.querySelectorAll('.s2-word') || [],
          { y: 35, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power4.out',
            onStart: () => soundManager.playHover()
          }
        )
        .to(scene2Ref.current, {
          y: -15,
          autoAlpha: 0,
          duration: 0.35,
          ease: 'power2.in',
          delay: 0.55
        })
        .set(scene2Ref.current, { display: 'none' });

      // ==========================================
      // SCENE 3: Ideas. Code. Creativity (2.6s - 3.8s)
      // ==========================================
      tl.set(scene3Ref.current, { autoAlpha: 1, display: 'flex' })
        .fromTo(
          scene3Ref.current?.querySelectorAll('.s3-anim') || [],
          { x: -25, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.5, stagger: 0.12, ease: 'power3.out' }
        )
        .to(scene3Ref.current, {
          y: -15,
          autoAlpha: 0,
          duration: 0.35,
          ease: 'power2.in',
          delay: 0.45
        })
        .set(scene3Ref.current, { display: 'none' });

      // ==========================================
      // SCENE 4: Welcome & Enter CTA (3.8s - 5.2s)
      // ==========================================
      tl.set(scene4Ref.current, { autoAlpha: 1, display: 'flex' })
        .fromTo(
          scene4Ref.current?.querySelectorAll('.s4-anim') || [],
          { y: 25, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.55,
            stagger: 0.15,
            ease: 'power3.out'
          }
        )
        // Brief pause on final scene before auto-transitioning
        .to({}, { duration: 0.9 });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [onComplete]);

  // Smooth cinematic curtain transition to homepage
  const finishIntro = () => {
    if (isFinishing) return;
    setIsFinishing(true);

    soundManager.playClick();
    sessionStorage.setItem('navin_intro_completed', 'true');

    // Notify character rig to wake up with welcome reaction
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('navin-intro-finish'));
    }

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Cinematic full-screen curtain lift
    if (curtainRef.current) {
      gsap.to(curtainRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.85,
        ease: 'power4.inOut',
        onComplete: () => {
          onComplete();
        }
      });
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    finishIntro();
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden pointer-events-auto select-none"
    >
      {/* Full-Screen Transition Curtain Container */}
      <div
        ref={curtainRef}
        className="relative w-full h-full bg-[#F7F3EA] text-[#171717] font-grotesk flex flex-col justify-between p-6 sm:p-12 md:p-16 shadow-2xl"
        style={{
          clipPath: 'inset(0 0 0% 0)',
        }}
      >
        {/* Subtle Background Pattern & Paper Grain */}
        <div className="absolute inset-0 bg-[radial-gradient(#171717_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-yellow/20 rounded-full filter blur-[120px] pointer-events-none" />

        {/* Top Header Bar */}
        <div className="relative z-10 flex items-center justify-between w-full border-b border-borderline pb-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-orange animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-ink-primary">
              NAVIN CHAUDHARY // CINEMATIC PROLOGUE
            </span>
          </div>

          <div className="flex items-center gap-6">
            {/* Progress counter */}
            <span ref={counterRef} className="font-mono text-xs font-medium text-ink-muted hidden sm:inline">
              000%
            </span>

            {/* Skip Intro Button */}
            <button
              ref={skipBtnRef}
              onClick={handleSkip}
              className="px-3.5 py-1.5 rounded-full bg-white border border-ink-primary shadow-brutal-sm text-xs font-grotesk font-bold text-ink-primary hover:bg-accent-yellow active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span>Skip Intro</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center Typography Stage */}
        <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center max-w-4xl mx-auto w-full min-h-[300px]">
          
          {/* ========================================== */}
          {/* SCENE 1: Identity                          */}
          {/* ========================================== */}
          <div
            ref={scene1Ref}
            className="flex-col items-center justify-center gap-3"
            style={{ display: 'none', opacity: 0 }}
          >
            <span className="s1-anim text-xs sm:text-sm font-mono uppercase tracking-[0.35em] text-accent-orange font-bold">
              Personal Digital Space
            </span>
            <h1 className="s1-anim font-grotesk font-black text-4xl sm:text-7xl lg:text-8xl tracking-tight text-ink-primary">
              NAVIN CHAUDHARY®
            </h1>
            <div className="s1-line h-1 bg-accent-orange rounded-full mt-2" />
          </div>

          {/* ========================================== */}
          {/* SCENE 2: The Core Tagline                  */}
          {/* ========================================== */}
          <div
            ref={scene2Ref}
            className="flex-col items-center justify-center text-center"
            style={{ display: 'none', opacity: 0 }}
          >
            <h2 className="font-grotesk font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.08] text-ink-primary">
              <span className="inline-block overflow-hidden mr-3">
                <span className="s2-word inline-block">I</span>
              </span>
              <span className="inline-block overflow-hidden mr-3">
                <span className="s2-word inline-block">DON'T</span>
              </span>
              <span className="inline-block overflow-hidden mr-3">
                <span className="s2-word inline-block">JUST</span>
              </span>
              <span className="inline-block overflow-hidden mr-3">
                <span className="s2-word inline-block">WRITE</span>
              </span>
              <span className="inline-block overflow-hidden">
                <span className="s2-word inline-block">CODE.</span>
              </span>
              <br />
              <span className="inline-block overflow-hidden mr-3">
                <span className="s2-word inline-block text-accent-orange">I</span>
              </span>
              <span className="inline-block overflow-hidden mr-3">
                <span className="s2-word inline-block text-accent-orange">BUILD</span>
              </span>
              <span className="inline-block overflow-hidden">
                <span className="s2-word inline-block font-editorial italic font-normal text-ink-primary underline decoration-accent-orange/60">
                  experiences.
                </span>
              </span>
            </h2>
          </div>

          {/* ========================================== */}
          {/* SCENE 3: Ideas. Code. Creativity           */}
          {/* ========================================== */}
          <div
            ref={scene3Ref}
            className="flex-col items-center justify-center gap-4"
            style={{ display: 'none', opacity: 0 }}
          >
            <h2 className="s3-anim font-grotesk font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-ink-primary">
              IDEAS. CODE. CREATIVITY.
            </h2>
            <p className="s3-anim font-mono text-xs sm:text-sm uppercase tracking-widest text-ink-secondary">
              WEB DEVELOPMENT · SOFTWARE ARCHITECTURE · AI
            </p>
          </div>

          {/* ========================================== */}
          {/* SCENE 4: Welcome & Enter Callout           */}
          {/* ========================================== */}
          <div
            ref={scene4Ref}
            className="flex-col items-center justify-center gap-6"
            style={{ display: 'none', opacity: 0 }}
          >
            <div className="s4-anim flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent-orange" />
              <span className="font-mono text-xs uppercase tracking-widest text-ink-muted">
                Portfolio Experience Ready
              </span>
            </div>

            <h2 className="s4-anim font-grotesk font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-ink-primary">
              WELCOME TO MY WORLD.
            </h2>

            <button
              ref={enterBtnRef}
              onClick={handleSkip}
              className="s4-anim group relative mt-4 px-8 py-4 rounded-2xl bg-ink-primary text-white font-grotesk font-bold text-sm sm:text-base tracking-wide border-2 border-ink-primary shadow-brutal hover:bg-accent-orange hover:border-accent-orange transition-all duration-200 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>ENTER NAVIN'S WORLD</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

        </div>

        {/* Bottom Progress Bar */}
        <div className="relative z-10 w-full pt-4 border-t border-borderline flex flex-col gap-2">
          <div className="w-full h-1 bg-borderline rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-accent-orange rounded-full w-0"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-ink-muted">
            <span>EXPERIENCE DIRECTED FOR NAVIN CHAUDHARY</span>
            <span>AUTOPLAYING SEQUENCE (4.8S)</span>
          </div>
        </div>

      </div>
    </div>
  );
};

