import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderGit2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Maximize2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { fallbackPortfolioData } from '../data/fallbackPortfolio';

const defaultProjects = fallbackPortfolioData.projects;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function Projects({ projects = [] }) {
  const items = projects && projects.length > 0 ? projects : defaultProjects;
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const [modalProject, setModalProject] = useState(null);

  const prev = () =>
    setSpotlightIdx((i) => (i === 0 ? items.length - 1 : i - 1));
  const next = () =>
    setSpotlightIdx((i) => (i === items.length - 1 ? 0 : i + 1));

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' && modalProject) {
        setModalProject(null);
      }
    },
    [modalProject]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const spotlight = items[spotlightIdx] || items[0];

  return (
    <section id="projects" className="py-20 md:py-28 bg-[#FCFBFF] dark:bg-[#0E1524] relative overflow-hidden transition-colors duration-300">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#EDE7FF]/40 dark:bg-[#9180D8]/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E5F2FF]/40 dark:bg-[#38BDF8]/10 rounded-full blur-3xl pointer-events-none translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-[#EDE7FF] dark:border-slate-800 shadow-xs mb-4">
            <FolderGit2 className="w-4 h-4 text-[#9180D8] dark:text-[#C4B5FD]" />
            <span className="text-xs font-semibold tracking-wider uppercase text-[#9180D8] dark:text-[#C4B5FD]">
              Engineering Portfolio
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight mb-4">
            Featured Projects
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] dark:text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            Hands-on web engineering and full-stack solutions built with modern React,
            responsive architectures, and verified deployments.
          </p>
        </motion.div>

        {/* ── Featured Project Spotlight (Editorial Layout) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="relative mb-16"
        >
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-[#EDE7FF] dark:border-slate-800 shadow-lg shadow-[#EDE7FF]/40 dark:shadow-black/40 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={spotlightIdx}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="grid lg:grid-cols-12 gap-0"
              >
                {/* 16:9 Showcase Preview Side */}
                <div className="lg:col-span-7 bg-gradient-to-br from-[#EDE7FF]/30 via-[#E5F2FF]/20 to-[#FFF0F4]/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6 sm:p-8 flex items-center justify-center">
                  <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-md border border-[#EDE7FF]/80 dark:border-slate-800 group">
                    <img
                      src={spotlight.image}
                      alt={spotlight.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-[#0F172A] dark:text-[#F8FAFC] shadow-sm">
                        <Sparkles className="w-3 h-3 text-[#9180D8] dark:text-[#C4B5FD]" />
                        {spotlight.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Details Side */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#9180D8] dark:text-[#C4B5FD]">
                        Project {spotlightIdx + 1} of {items.length}
                      </span>
                      {spotlight.liveUrl && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Live Verified
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] mb-3 leading-snug">
                      {spotlight.title}
                    </h3>
                    <p className="text-sm text-[#475569] dark:text-[#94A3B8] mb-5 leading-relaxed">
                      {spotlight.description}
                    </p>

                    {/* Highlights bullet points */}
                    {spotlight.highlights && spotlight.highlights.length > 0 && (
                      <div className="space-y-2 mb-6">
                        {spotlight.highlights.slice(0, 3).map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-[#64748B] dark:text-[#CBD5E1]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#9180D8] dark:text-[#C4B5FD] shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Technology Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {(spotlight.technologies || []).map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#E5F2FF]/70 dark:bg-sky-950/60 text-[#0F172A] dark:text-[#E2E8F0] border border-[#E5F2FF] dark:border-slate-800"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#EDE7FF] dark:border-slate-800">
                    {spotlight.liveUrl && (
                      <a
                        href={spotlight.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9180D8] to-[#5B8DEF] text-white text-sm font-semibold shadow-md shadow-[#9180D8]/25 hover:brightness-105 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                    {spotlight.githubUrl && (
                      <a
                        href={spotlight.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#EDE7FF] dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0F172A] dark:text-[#F8FAFC] text-sm font-semibold shadow-xs hover:bg-[#EDE7FF]/30 dark:hover:bg-slate-700 transition-colors"
                      >
                        <GithubIcon className="w-4 h-4" />
                        Source Code
                      </a>
                    )}
                    <button
                      onClick={() => setModalProject(spotlight)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#9180D8] dark:text-[#C4B5FD] hover:bg-[#EDE7FF]/40 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <Maximize2 className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Navigation Footer */}
            <div className="flex items-center justify-between px-6 py-3.5 bg-[#FAF9F6] dark:bg-slate-900/90 border-t border-[#EDE7FF] dark:border-slate-800">
              <button
                onClick={prev}
                aria-label="Previous project"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#EDE7FF] dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-[#475569] dark:text-[#CBD5E1] hover:text-[#9180D8] hover:border-[#9180D8]/40 transition-colors cursor-pointer shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="flex items-center gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSpotlightIdx(i)}
                    aria-label={`Go to project ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      i === spotlightIdx
                        ? 'bg-[#9180D8] dark:bg-[#C4B5FD] w-8'
                        : 'bg-[#EDE7FF] dark:bg-slate-700 hover:bg-[#9180D8]/40 w-2.5'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Next project"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#EDE7FF] dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-[#475569] dark:text-[#CBD5E1] hover:text-[#9180D8] hover:border-[#9180D8]/40 transition-colors cursor-pointer shadow-xs"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── All Project Cards Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {items.map((project, idx) => (
            <motion.div
              key={project.id || idx}
              variants={cardVariants}
              className="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-[#EDE7FF] dark:border-slate-800 shadow-xs hover:shadow-xl hover:shadow-[#EDE7FF]/50 dark:hover:shadow-black/50 transition-all duration-300 overflow-hidden hover:-translate-y-1.5"
            >
              {/* Card 16:9 Cover Image */}
              <div
                className="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-950 cursor-pointer"
                onClick={() => setModalProject(project)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white">
                    <Maximize2 className="w-3.5 h-3.5" />
                    Inspect Details
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 dark:bg-slate-900/95 backdrop-blur text-[#0F172A] dark:text-[#F8FAFC] shadow-sm border border-transparent dark:border-slate-800">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC] mb-2 leading-snug group-hover:text-[#9180D8] dark:group-hover:text-[#C4B5FD] transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-xs font-semibold text-[#9180D8] dark:text-[#C4B5FD] mb-3">
                    {project.tagline}
                  </p>
                  <p className="text-sm text-[#475569] dark:text-[#94A3B8] line-clamp-3 mb-5 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {(project.technologies || []).slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 text-[11px] font-semibold rounded-md bg-[#E8F8F0]/80 dark:bg-emerald-950/60 text-[#0F172A] dark:text-emerald-300 border border-[#E8F8F0] dark:border-emerald-800/40"
                      >
                        {t}
                      </span>
                    ))}
                    {(project.technologies || []).length > 4 && (
                      <span className="px-2 py-0.5 text-[11px] font-semibold rounded-md bg-[#EDE7FF]/60 dark:bg-purple-950/60 text-[#9180D8] dark:text-[#C4B5FD]">
                        +{(project.technologies || []).length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="pt-4 border-t border-[#EDE7FF]/70 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setModalProject(project)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0F172A] dark:text-[#E2E8F0] hover:text-[#9180D8] dark:hover:text-[#C4B5FD] transition-colors cursor-pointer"
                  >
                    Details
                    <ArrowRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`GitHub repository for ${project.title}`}
                        className="p-2 rounded-xl border border-[#EDE7FF] dark:border-slate-700 bg-white dark:bg-slate-800 text-[#475569] dark:text-[#CBD5E1] hover:text-[#0F172A] hover:bg-[#EDE7FF]/30 dark:hover:bg-slate-700 transition-colors"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#9180D8] to-[#5B8DEF] text-white text-xs font-semibold shadow-xs hover:brightness-105 transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Full Detail Modal ── */}
      <AnimatePresence>
        {modalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm"
            onClick={() => setModalProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#EDE7FF] dark:border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal 16:9 Cover Banner */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                <img
                  src={modalProject.image}
                  alt={modalProject.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setModalProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur text-[#0F172A] dark:text-white hover:bg-white shadow-md transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/95 dark:bg-slate-900/95 backdrop-blur text-[#0F172A] dark:text-[#F8FAFC] shadow-sm">
                    {modalProject.category}
                  </span>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] mb-2 leading-tight">
                  {modalProject.title}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#9180D8] dark:text-[#C4B5FD] mb-4">
                  {modalProject.tagline}
                </p>
                <p className="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed mb-6">
                  {modalProject.description}
                </p>

                {/* Highlights */}
                {modalProject.highlights && modalProject.highlights.length > 0 && (
                  <div className="mb-6 p-5 rounded-2xl bg-[#FCFBFF] dark:bg-slate-800/60 border border-[#EDE7FF] dark:border-slate-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] dark:text-[#F8FAFC] mb-3">
                      Key Highlights & Contributions
                    </h4>
                    <ul className="space-y-2.5">
                      {modalProject.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#475569] dark:text-[#CBD5E1]">
                          <CheckCircle2 className="w-4 h-4 text-[#9180D8] dark:text-[#C4B5FD] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] dark:text-[#F8FAFC] mb-3">
                    Technologies & Frameworks
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(modalProject.technologies || []).map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[#E5F2FF]/70 dark:bg-sky-950/60 text-[#0F172A] dark:text-[#E2E8F0] border border-[#E5F2FF] dark:border-slate-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-[#EDE7FF] dark:border-slate-800">
                  {modalProject.liveUrl && (
                    <a
                      href={modalProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#9180D8] to-[#5B8DEF] text-white text-sm font-semibold shadow-md shadow-[#9180D8]/20 hover:brightness-105 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open Live Demo
                    </a>
                  )}
                  {modalProject.githubUrl && (
                    <a
                      href={modalProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#EDE7FF] dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0F172A] dark:text-[#F8FAFC] text-sm font-semibold hover:bg-[#EDE7FF]/30 dark:hover:bg-slate-700 transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                      View on GitHub
                    </a>
                  )}
                  <button
                    onClick={() => setModalProject(null)}
                    className="ml-auto px-4 py-2 text-sm font-semibold text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
