import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SOCIAL_LINKS } from '../../data/socialLinks';
import { soundManager } from '../../utils/audio';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, InstagramIcon, LinkedinIcon, WhatsappIcon } from '../common/SocialIcons';

export const FooterSection: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-bg-secondary border-t-3 border-ink-primary pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      
      {/* Peeking Navin Easter Egg Resting on Top Border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[85%] z-20 group">
        <motion.div
          whileHover={{ y: -8 }}
          onClick={() => soundManager.playCharacterReact('happy')}
          className="cursor-pointer relative flex flex-col items-center"
        >
          {/* Comic Callout */}
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-3 py-1 bg-white border border-ink-primary rounded-full text-[10px] font-grotesk font-bold text-ink-primary shadow-brutal-sm mb-1 whitespace-nowrap">
            Thanks for visiting! 👋
          </span>
          <img
            src="/assets/character/navin-peeking.png"
            alt="Navin Chaudhary peeking"
            className="w-36 sm:w-44 h-auto object-contain filter drop-shadow-md"
          />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col justify-between">
        
        {/* Master Branding Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-12 border-b border-borderline">
          
          <div className="md:col-span-6 flex flex-col">
            <Link
              to="/"
              onClick={() => soundManager.playClick()}
              className="font-grotesk font-black text-3xl sm:text-4xl text-ink-primary tracking-tight mb-2 hover:text-accent-orange transition-colors inline-block"
            >
              NAVIN CHAUDHARY
            </Link>
            <p className="font-grotesk text-sm font-semibold text-accent-orange uppercase tracking-wider mb-4">
              "BUILT WITH CURIOSITY & CODE."
            </p>
            <p className="font-sans text-xs sm:text-sm text-ink-secondary max-w-md leading-relaxed">
              Designed with agency-level editorial layout, kinetic interaction systems, and zero-compromise engineering integrity.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col">
            <h4 className="font-grotesk font-bold text-xs uppercase tracking-wider text-ink-muted mb-3">
              Portfolio Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-grotesk font-medium text-ink-secondary">
              <Link to="/" onClick={() => soundManager.playHover()} className="hover:text-ink-primary hover:underline">
                Home
              </Link>
              <Link to="/about" onClick={() => soundManager.playHover()} className="hover:text-ink-primary hover:underline">
                About
              </Link>
              <Link to="/projects" onClick={() => soundManager.playHover()} className="hover:text-ink-primary hover:underline">
                Projects
              </Link>
              <Link to="/skills" onClick={() => soundManager.playHover()} className="hover:text-ink-primary hover:underline">
                Skills
              </Link>
              <Link to="/experiments" onClick={() => soundManager.playHover()} className="hover:text-ink-primary hover:underline">
                Experiments
              </Link>
              <Link to="/experience" onClick={() => soundManager.playHover()} className="hover:text-ink-primary hover:underline">
                Experience
              </Link>
              <Link to="/contact" onClick={() => soundManager.playHover()} className="hover:text-ink-primary hover:underline col-span-2 text-accent-orange font-bold">
                Contact & Inquiries ↗
              </Link>
            </div>
          </div>

          {/* Back to top button */}
          <div className="md:col-span-2 flex md:justify-end">
            <button
              onClick={handleBackToTop}
              className="p-3.5 rounded-2xl bg-white border-2 border-ink-primary shadow-brutal hover:shadow-brutal-orange hover:bg-accent-yellow active:scale-95 transition-all flex items-center gap-2 font-grotesk text-xs font-bold text-ink-primary group"
              title="Scroll back to top"
            >
              <span>Back To Top</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

        </div>

        {/* Social Icons & Dynamic Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-grotesk text-ink-secondary">
          
          <div className="flex items-center gap-4">
            <a
              href={SOCIAL_LINKS.github.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-ink-primary transition-colors flex items-center gap-1"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href={SOCIAL_LINKS.whatsapp.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent-green transition-colors flex items-center gap-1"
            >
              <WhatsappIcon className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <a
              href={SOCIAL_LINKS.instagram.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-600 transition-colors flex items-center gap-1"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Instagram</span>
            </a>

            <a
              href={SOCIAL_LINKS.linkedin.url}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <span>© {currentYear} Navin Chaudhary. All rights reserved.</span>
          </div>

        </div>

      </div>

    </footer>
  );
};
