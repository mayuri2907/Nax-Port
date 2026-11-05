import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { SOCIAL_LINKS } from '../data/socialLinks';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, Copy, Check, Mail, MessageCircle } from 'lucide-react';
import { WhatsappIcon, GithubIcon, InstagramIcon, LinkedinIcon } from '../components/common/SocialIcons';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [fieldFocus, setFieldFocus] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundManager.playClick();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      soundManager.playCharacterReact('happy');

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F47B35', '#F5D77E', '#2DA44E']
      });

      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.open(`mailto:navinchaudhary.dev@gmail.com?subject=${subject}&body=${body}`, '_blank');
    }, 800);
  };

  const handleCopyEmail = () => {
    soundManager.playClick();
    navigator.clipboard.writeText('navinchaudhary.dev@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <PageTransition>
      <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Editorial Index Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-borderline">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-ink-primary text-white font-mono text-xs font-bold">
              PAGE / CONTACT
            </span>
            <span className="font-grotesk text-xs uppercase tracking-wider text-ink-secondary">
              Direct Channels & Collaboration Inquiries
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-accent-green/15 text-accent-green rounded-full text-xs font-grotesk font-semibold">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            <span>Currently Available For New Work</span>
          </div>
        </div>

        {/* Master Heading */}
        <div className="mb-14">
          <h1 className="font-grotesk font-black text-4xl sm:text-6xl md:text-7xl text-ink-primary leading-[0.98] tracking-tight mb-4">
            HAVE AN IDEA?{' '}
            <span className="block font-editorial italic font-normal text-accent-orange">
              Let's build something.
            </span>
          </h1>
          <p className="font-sans text-base sm:text-lg text-ink-secondary max-w-2xl leading-relaxed">
            Whether you have a breakthrough product concept, want to engineer an intelligent system, or simply want to chat about code and architecture.
          </p>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Left Column: Direct Channels & Verified Badges (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* WhatsApp Direct */}
            <div className="p-6 sm:p-8 bg-white border-2 border-ink-primary rounded-3xl shadow-brutal flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-accent-green/15 text-accent-green font-mono text-xs font-bold rounded-full flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                    Instant Direct Chat
                  </span>
                  <WhatsappIcon className="w-5 h-5 text-accent-green" />
                </div>

                <h3 className="font-grotesk font-bold text-xl text-ink-primary mb-1">
                  WhatsApp Direct
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ink-secondary mb-5">
                  Fastest way to get in touch for direct conversations, quick inquiries, and discussions.
                </p>
              </div>

              <a
                href={SOCIAL_LINKS.whatsapp.url}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundManager.playClick()}
                className="w-full py-3.5 px-4 bg-accent-green text-white font-grotesk font-bold text-sm rounded-2xl shadow-brutal-sm hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <WhatsappIcon className="w-4 h-4" />
                <span>Chat on WhatsApp (+91 8155952384)</span>
              </a>
            </div>

            {/* Email Card with One-Click Copy */}
            <div className="p-6 sm:p-8 bg-white border-2 border-ink-primary rounded-3xl shadow-brutal flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-accent-orange/15 text-accent-orange font-mono text-xs font-bold rounded-full">
                    Primary Email
                  </span>
                  <Mail className="w-5 h-5 text-accent-orange" />
                </div>

                <h3 className="font-grotesk font-bold text-base sm:text-lg text-ink-primary font-mono select-all">
                  navinchaudhary.dev@gmail.com
                </h3>
                <p className="font-sans text-xs sm:text-sm text-ink-secondary mt-1 mb-5">
                  For project proposals, technical collaborations, and detailed briefs.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleCopyEmail}
                  className="flex-1 py-3 px-3 bg-bg-secondary border border-ink-primary/20 text-ink-primary font-grotesk font-semibold text-xs rounded-xl hover:bg-accent-yellow transition-all flex items-center justify-center gap-1.5"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-accent-green" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied!' : 'Copy Address'}</span>
                </button>

                <a
                  href={SOCIAL_LINKS.email.url}
                  onClick={() => soundManager.playClick()}
                  className="py-3 px-4 bg-ink-primary text-white font-grotesk font-semibold text-xs rounded-xl hover:bg-accent-orange transition-all flex items-center justify-center"
                >
                  Send Direct Mail
                </a>
              </div>
            </div>

            {/* Social Profiles Grid */}
            <div className="grid grid-cols-3 gap-3">
              <a
                href={SOCIAL_LINKS.github.url}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundManager.playClick()}
                className="p-4 bg-white border-2 border-ink-primary rounded-2xl shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all flex flex-col items-center justify-center gap-1.5 text-center"
              >
                <GithubIcon className="w-5 h-5 text-ink-primary" />
                <span className="font-grotesk font-bold text-xs text-ink-primary">GitHub</span>
                <span className="text-[10px] font-mono text-ink-muted">@Nax46</span>
              </a>

              <a
                href={SOCIAL_LINKS.instagram.url}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundManager.playClick()}
                className="p-4 bg-white border-2 border-ink-primary rounded-2xl shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all flex flex-col items-center justify-center gap-1.5 text-center"
              >
                <InstagramIcon className="w-5 h-5 text-pink-600" />
                <span className="font-grotesk font-bold text-xs text-ink-primary">Instagram</span>
                <span className="text-[10px] font-mono text-ink-muted">@astralxxixnax</span>
              </a>

              <a
                href={SOCIAL_LINKS.linkedin.url}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundManager.playClick()}
                className="p-4 bg-white border-2 border-ink-primary rounded-2xl shadow-brutal-sm hover:shadow-brutal hover:-translate-y-0.5 transition-all flex flex-col items-center justify-center gap-1.5 text-center"
              >
                <LinkedinIcon className="w-5 h-5 text-blue-600" />
                <span className="font-grotesk font-bold text-xs text-ink-primary">LinkedIn</span>
                <span className="text-[10px] font-mono text-ink-muted">Navin C.</span>
              </a>
            </div>

          </div>

          {/* Right Column: Functional Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border-3 border-ink-primary rounded-3xl p-6 sm:p-10 shadow-brutal-lg">
            
            {/* Status Hint */}
            <div className="flex items-center gap-3 p-3.5 bg-bg-primary border border-borderline rounded-2xl mb-8">
              <div className="w-10 h-10 rounded-full border border-ink-primary overflow-hidden shrink-0 bg-accent-yellow">
                <img
                  src="/assets/character/navin-avatar.png"
                  alt="Navin Chaudhary avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs font-grotesk text-ink-secondary">
                <span className="font-bold text-ink-primary block">
                  {isSubmitted
                    ? "Awesome! Message dispatched. I'll get back to you shortly!"
                    : fieldFocus === 'message'
                    ? 'Drafting project brief or inquiry...'
                    : fieldFocus === 'email'
                    ? 'Great, drop your best email address!'
                    : 'Send a message directly to Navin Chaudhary.'}
                </span>
              </div>
            </div>

            {isSubmitted ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-accent-green/20 text-accent-green flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-grotesk font-extrabold text-2xl text-ink-primary mb-2">
                  Message Prepared & Dispatched!
                </h3>
                <p className="font-sans text-sm text-ink-secondary max-w-md mb-6">
                  Your email client has been launched with your message. You can also chat immediately via WhatsApp.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-xl bg-ink-primary text-white font-grotesk text-xs font-bold shadow-brutal-sm hover:bg-accent-orange transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-grotesk font-bold text-xs uppercase tracking-wider text-ink-primary mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Alex Mercer"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => {
                      setFieldFocus('name');
                      soundManager.playHover();
                    }}
                    onBlur={() => setFieldFocus('')}
                    className="w-full px-4 py-3 bg-bg-primary border-2 border-ink-primary rounded-2xl font-sans text-sm text-ink-primary placeholder:text-ink-muted focus:outline-none focus:border-accent-orange transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-grotesk font-bold text-xs uppercase tracking-wider text-ink-primary mb-2">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => {
                      setFieldFocus('email');
                      soundManager.playHover();
                    }}
                    onBlur={() => setFieldFocus('')}
                    className="w-full px-4 py-3 bg-bg-primary border-2 border-ink-primary rounded-2xl font-sans text-sm text-ink-primary placeholder:text-ink-muted focus:outline-none focus:border-accent-orange transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-grotesk font-bold text-xs uppercase tracking-wider text-ink-primary mb-2">
                    Project Brief or Inquiry *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell me about what you'd like to build, timeline, or engineering goals..."
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => {
                      setFieldFocus('message');
                      soundManager.playHover();
                    }}
                    onBlur={() => setFieldFocus('')}
                    className="w-full px-4 py-3 bg-bg-primary border-2 border-ink-primary rounded-2xl font-sans text-sm text-ink-primary placeholder:text-ink-muted focus:outline-none focus:border-accent-orange transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-ink-primary text-white font-grotesk font-bold text-sm sm:text-base tracking-wide border-2 border-ink-primary shadow-brutal hover:shadow-brutal-orange hover:bg-accent-orange hover:border-accent-orange transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Sending Message...' : 'Send Message To Navin'}</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </PageTransition>
  );
};
