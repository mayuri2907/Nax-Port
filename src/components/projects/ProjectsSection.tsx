import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, Project } from '../../data/projects';
import { soundManager } from '../../utils/audio';
import { ArrowUpRight, ExternalLink, Sparkles, X, CheckCircle2, Layers, Cpu, Code2 } from 'lucide-react';
import { GithubIcon } from '../common/SocialIcons';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = ['All', 'AI & Full-Stack', 'Distributed Systems', 'Android & Mobile', 'AI & Automation'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  const handleOpenProject = (project: Project) => {
    soundManager.playClick();
    setActiveProject(project);
  };

  const handleCloseProject = () => {
    soundManager.playClick();
    setActiveProject(null);
  };

  return (
    <section id="projects" className="relative py-24 md:py-36 px-4 sm:px-6 lg:px-8 bg-bg-primary overflow-hidden">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-ink-primary text-white font-mono text-xs font-bold">
              02 / SELECTED WORK
            </span>
            <span className="font-grotesk text-xs uppercase tracking-wider text-ink-secondary">
              Engineered Systems & Applications
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-accent-yellow/40 border border-ink-primary/20 rounded-full font-grotesk text-xs text-ink-primary font-medium">
            <Sparkles className="w-3.5 h-3.5 text-accent-orange" />
            <span>Click any project for technical breakdown</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="font-grotesk font-black text-4xl sm:text-6xl text-ink-primary tracking-tight leading-[0.95]">
            PROVEN WORK.{' '}
            <span className="block font-editorial italic font-normal text-accent-orange">
              Tangible impact.
            </span>
          </h2>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1.5 bg-bg-secondary border border-borderline rounded-2xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 rounded-xl font-grotesk text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-ink-primary text-white shadow-brutal-sm'
                    : 'text-ink-secondary hover:text-ink-primary hover:bg-white/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid: Editorial Asymmetric Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {filteredProjects.map((project, index) => {
          return (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              data-cursor="project"
              data-cursor-text="View Details ↗"
              onClick={() => handleOpenProject(project)}
              className="group relative cursor-pointer bg-white border-2 border-ink-primary rounded-3xl p-6 sm:p-8 shadow-brutal hover:shadow-brutal-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Project Top Bar */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-bg-secondary border border-borderline font-mono text-xs font-bold text-ink-primary">
                    {project.badge}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-ink-muted">{project.year}</span>
                    <div className="w-8 h-8 rounded-full border border-ink-primary bg-bg-primary flex items-center justify-center group-hover:bg-accent-orange group-hover:text-white transition-colors">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-grotesk font-extrabold text-2xl sm:text-3xl text-ink-primary mb-2 group-hover:text-accent-orange transition-colors">
                  {project.title}
                </h3>
                <p className="font-grotesk text-xs sm:text-sm font-medium text-ink-secondary mb-4">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="font-sans text-sm text-ink-secondary leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Architectural Metrics Bar */}
                {project.metrics && (
                  <div className="grid grid-cols-3 gap-2 py-3 px-4 bg-bg-primary/80 border border-borderline rounded-2xl mb-6">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="font-grotesk font-bold text-sm sm:text-base text-ink-primary">
                          {m.value}
                        </span>
                        <span className="text-[10px] font-sans text-ink-muted truncate">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Project Footer: Tech Stack Tags & Links */}
              <div className="pt-4 border-t border-borderline flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 bg-bg-secondary text-ink-primary rounded-md font-grotesk text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-2 py-0.5 text-xs font-grotesk text-ink-muted">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => soundManager.playClick()}
                    aria-label={`View ${project.title} source code on GitHub`}
                    className="p-2 rounded-xl bg-bg-secondary text-ink-primary hover:bg-ink-primary hover:text-white transition-colors"
                    title="View GitHub Repository"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Project Detail Modal / Drawer */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseProject}
              className="absolute inset-0 bg-ink-primary/60 backdrop-blur-sm"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-bg-primary border-3 border-ink-primary rounded-3xl shadow-brutal-lg overflow-y-auto z-10 p-6 sm:p-8"
            >
              {/* Top Close Button */}
              <div className="flex items-center justify-between pb-4 border-b border-borderline mb-6">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-md bg-ink-primary text-white font-mono text-xs font-bold">
                    {activeProject.category}
                  </span>
                  <span className="font-mono text-xs text-ink-muted">Released {activeProject.year}</span>
                </div>

                <button
                  onClick={handleCloseProject}
                  aria-label="Close project modal"
                  className="p-2 rounded-xl border border-ink-primary bg-white text-ink-primary shadow-brutal-sm hover:bg-accent-yellow active:scale-95 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-grotesk font-extrabold text-3xl sm:text-4xl text-ink-primary mb-2">
                {activeProject.title}
              </h3>
              <p className="font-grotesk text-base font-medium text-accent-orange mb-6">
                {activeProject.subtitle}
              </p>

              {/* Challenge & Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-white border border-borderline rounded-2xl">
                  <h4 className="font-grotesk font-bold text-xs uppercase tracking-wider text-ink-muted mb-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    Engineering Challenge
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed">
                    {activeProject.challenge}
                  </p>
                </div>

                <div className="p-4 bg-white border border-borderline rounded-2xl">
                  <h4 className="font-grotesk font-bold text-xs uppercase tracking-wider text-ink-muted mb-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent-green" />
                    Architectural Solution
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed">
                    {activeProject.solution}
                  </p>
                </div>
              </div>

              {/* Key Features List */}
              <div className="mb-6">
                <h4 className="font-grotesk font-bold text-sm uppercase tracking-wider text-ink-primary mb-3">
                  Core Technical Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeProject.keyFeatures.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 bg-white/70 border border-borderline rounded-xl text-xs sm:text-sm text-ink-secondary"
                    >
                      <CheckCircle2 className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack List */}
              <div className="mb-8">
                <h4 className="font-grotesk font-bold text-xs uppercase tracking-wider text-ink-muted mb-2">
                  Full Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-ink-primary text-white rounded-lg font-grotesk text-xs font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-borderline">
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="px-6 py-3 rounded-2xl bg-ink-primary text-white font-grotesk text-sm font-bold shadow-brutal hover:bg-accent-orange transition-colors flex items-center gap-2"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Inspect Code on GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={handleCloseProject}
                  className="px-5 py-3 rounded-2xl bg-white border border-borderline font-grotesk text-sm font-semibold text-ink-secondary hover:text-ink-primary transition-colors"
                >
                  Back to Projects
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
