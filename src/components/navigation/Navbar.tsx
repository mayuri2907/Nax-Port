import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { soundManager } from '../../utils/audio';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { SOCIAL_LINKS } from '../../data/socialLinks';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.getMuted());
  const [currentTime, setCurrentTime] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Live clock for IST (India Standard Time)
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setCurrentTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleToggleSound = () => {
    const nextState = soundManager.toggleMute();
    setIsMuted(nextState);
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Skills', path: '/skills' },
    { label: 'Experiments', path: '/experiments' },
    { label: 'Experience', path: '/experience' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-bg-primary/95 backdrop-blur-md border-b border-borderline shadow-sm'
            : 'py-5 bg-bg-primary/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Brand Name - ALWAYS NAVIGATES TO HOME (/) */}
          <Link
            to="/"
            onClick={() => soundManager.playClick()}
            className="group flex items-center gap-3 select-none"
            aria-label="Navin Chaudhary - Navigate to Home"
          >
            {/* Navin Mini Circular Avatar */}
            <div className="relative w-10 h-10 rounded-full border-2 border-ink-primary overflow-hidden bg-accent-yellow shadow-brutal-sm group-hover:scale-105 transition-transform shrink-0">
              <img
                src="/assets/character/navin-avatar.png"
                alt="Navin Chaudhary avatar"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-grotesk font-extrabold tracking-tight text-ink-primary text-base sm:text-lg leading-none group-hover:text-accent-orange transition-colors">
                NAVIN CHAUDHARY
              </span>
              <span className="font-grotesk text-[10px] uppercase tracking-wider text-ink-secondary flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                <span>Available for work</span>
              </span>
            </div>
          </Link>

          {/* Center Info Pill: Time in India */}
          <div className="hidden xl:flex items-center gap-3 px-3.5 py-1.5 bg-white border border-borderline rounded-full shadow-brutal-sm text-xs font-grotesk">
            <span className="text-ink-secondary">INDIA</span>
            <span className="font-mono font-medium text-ink-primary">{currentTime} IST</span>
            <span className="text-borderline">|</span>
            <span className="text-accent-orange font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Creative Dev
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5">
            <div className="flex items-center gap-1 p-1 bg-white border border-borderline rounded-full shadow-brutal-sm">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => soundManager.playHover()}
                  className={({ isActive }) =>
                    `px-3.5 py-1.5 rounded-full font-grotesk text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-ink-primary text-white shadow-brutal-sm'
                        : 'text-ink-primary hover:bg-bg-secondary hover:text-accent-orange'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Sound Toggle Button */}
            <button
              onClick={handleToggleSound}
              onMouseEnter={() => soundManager.playHover()}
              aria-label={isMuted ? 'Unmute interactive sounds' : 'Mute interactive sounds'}
              className="p-2 rounded-full border-2 border-ink-primary bg-white text-ink-primary shadow-brutal-sm hover:bg-accent-yellow hover:scale-105 transition-all"
              title={isMuted ? 'Turn Sound ON' : 'Turn Sound OFF'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-ink-secondary" /> : <Volume2 className="w-4 h-4 text-ink-primary" />}
            </button>

            {/* Contact CTA Link */}
            <Link
              to="/contact"
              onClick={() => soundManager.playClick()}
              className="group relative px-4 py-2 rounded-full bg-ink-primary text-white font-grotesk text-xs font-bold tracking-wide border-2 border-ink-primary shadow-brutal hover:shadow-brutal-orange hover:bg-accent-orange hover:border-accent-orange transition-all duration-200 flex items-center gap-1"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </nav>

          {/* Mobile Right Controls: Sound & Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={handleToggleSound}
              aria-label="Toggle sound"
              className="p-2 rounded-full border border-ink-primary bg-white text-ink-primary shadow-brutal-sm"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-xl border-2 border-ink-primary bg-white text-ink-primary shadow-brutal-sm active:scale-95"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-30 bg-bg-primary/95 backdrop-blur-lg border-b-2 border-ink-primary shadow-brutal-lg lg:hidden p-6"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => soundManager.playClick()}
                  className={({ isActive }) =>
                    `flex items-center justify-between p-3 rounded-xl border font-grotesk text-base font-bold transition-colors ${
                      isActive
                        ? 'bg-ink-primary text-white border-ink-primary shadow-brutal-sm'
                        : 'bg-white border-borderline text-ink-primary hover:bg-accent-yellow/40'
                    }`
                  }
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-70" />
                </NavLink>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <Link
                  to="/contact"
                  onClick={() => soundManager.playClick()}
                  className="w-full py-3 rounded-xl bg-accent-orange text-white text-center font-grotesk font-bold text-sm shadow-brutal flex items-center justify-center gap-2"
                >
                  <span>Start a Conversation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-center gap-4 pt-2 text-xs font-grotesk text-ink-secondary">
                  <a href={SOCIAL_LINKS.github.url} target="_blank" rel="noreferrer" className="hover:text-ink-primary">
                    GitHub
                  </a>
                  <span>•</span>
                  <a href={SOCIAL_LINKS.whatsapp.url} target="_blank" rel="noreferrer" className="hover:text-accent-green">
                    WhatsApp
                  </a>
                  <span>•</span>
                  <a href={SOCIAL_LINKS.instagram.url} target="_blank" rel="noreferrer" className="hover:text-pink-600">
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
