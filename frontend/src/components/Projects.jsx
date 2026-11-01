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
} from 'lucide-react';
import { GithubIcon } from './Icons';

const fallbackProjects = [
  {
    title: 'Real-Time College Fest & Concert Updates',
    category: 'Full-Stack & Real-Time',
    image: '/images/project-fest.svg',
    description:
      'A dynamic platform delivering live updates for college fests and concerts, featuring real-time notifications, event schedules, and interactive dashboards for organizers and attendees.',
    highlights: [
      'Real-time WebSocket-based live updates',
      'Admin dashboard for event management',
      'Push notifications for schedule changes',
      'Interactive event timeline & maps',
    ],
    tech: ['React.js', 'Node.js', 'Socket.IO', 'Express.js', 'Tailwind CSS'],
    github: '#',
    live: '#',
  },
  {
    title: 'Online Shopping System',
    category: 'E-Commerce',
    image: '/images/project-shopping.svg',
    description:
      'A full-featured e-commerce application with product browsing, cart management, secure checkout flow, and order tracking — built with a focus on responsive design and smooth UX.',
    highlights: [
      'Product catalog with filters & search',
      'Shopping cart with persistent state',
      'Secure checkout & payment integration',
      'Order history & tracking dashboard',
    ],
    tech: ['React.js', 'JavaScript (ES6)', 'HTML5', 'CSS3', 'State Management'],
    github: '#',
    live: '#',
  },
  {
    title: 'Full-Stack Portfolio Engine (No Database)',
    category: 'Decoupled Architecture',
    image: '/images/project-portfolio.svg',
    description:
      'A modern portfolio engine powered entirely by flat-file JSON configuration — no database required. Features a decoupled React frontend with a lightweight Express API backend.',
    highlights: [
      'Zero-database architecture with JSON config',
      'Decoupled React + Express architecture',
      'Dynamic content loading via REST API',
      'Framer Motion animations throughout',
    ],
    tech: ['React', 'Express', 'Tailwind CSS', 'Framer Motion', 'JSON'],
    github: '#',
    live: '#',
  },
];

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
  const items = projects.length > 0 ? projects : fallbackProjects;
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

  const spotlight = items[spotlightIdx];

  return (
    <section id="projects" className="py-20 md:py-28 bg-[#FCFBFF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EDE7FF]/40 border border-[#EDE7FF]/60 mb-4">
            <FolderGit2 className="w-4 h-4 text-[#9180D8]" />
            <span className="text-sm font-medium text-[#9180D8]">
              Portfolio
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#26324A] mb-3">
            Featured Projects
          </h2>
          <p className="text-[#707789] max-w-xl mx-auto">
            A curated selection of projects showcasing full-stack development,
            real-time systems, and modern UI/UX design.
          </p>
        </motion.div>

        {/* Spotlight Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="relative mb-16"
        >
          <div className="bg-white rounded-3xl border border-[#EDE7FF]/60 shadow-md overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={spotlightIdx}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="grid md:grid-cols-2 gap-0"
              >
                {/* Image Side */}
                <div className="relative bg-gradient-to-br from-[#EDE7FF]/30 via-[#E5F2FF]/20 to-[#FFF0F4]/20 p-8 md:p-12 flex items-center justify-center min-h-[260px] md:min-h-[340px]">
                  <img
                    src={spotlight.image}
                    alt={spotlight.title}
                    className="w-full max-w-[280px] h-auto object-contain drop-shadow-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[#9180D8]/10 text-[#9180D8] border border-[#9180D8]/20">
                      {spotlight.category}
                    </span>
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#26324A] mb-4 leading-tight">
                    {spotlight.title}
                  </h3>
                  <p className="text-[#707789] mb-6 leading-relaxed">
                    {spotlight.description}
                  </p>

                  {(spotlight.technologies || spotlight.tech) && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(spotlight.technologies || spotlight.tech).map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-[#E5F2FF]/60 text-[#26324A] border border-[#E5F2FF]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setModalProject(spotlight)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#9180D8] text-white text-sm font-medium hover:bg-[#7b6bc4] transition-colors shadow-sm"
                    >
                      <Maximize2 className="w-4 h-4" />
                      View Details
                    </button>
                    {spotlight.github && spotlight.github !== '#' && (
                      <a
                        href={spotlight.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#EDE7FF]/60 text-[#707789] text-sm font-medium hover:border-[#9180D8]/40 hover:text-[#9180D8] transition-colors"
                      >
                        <GithubIcon className="w-4 h-4" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Controls */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-[#EDE7FF]/40">
              <button
                onClick={prev}
                aria-label="Previous project"
                className="p-2 rounded-xl border border-[#EDE7FF]/60 text-[#707789] hover:text-[#9180D8] hover:border-[#9180D8]/40 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSpotlightIdx(i)}
                    aria-label={`Go to project ${i + 1}`}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === spotlightIdx
                        ? 'bg-[#9180D8] w-7'
                        : 'bg-[#EDE7FF] hover:bg-[#9180D8]/40'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Next project"
                className="p-2 rounded-xl border border-[#EDE7FF]/60 text-[#707789] hover:text-[#9180D8] hover:border-[#9180D8]/40 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Project Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((project, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="group bg-white rounded-2xl border border-[#EDE7FF]/60 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => setModalProject(project)}
            >
              {/* Card Image */}
              <div className="relative bg-gradient-to-br from-[#EDE7FF]/20 via-[#E5F2FF]/15 to-[#FFF0F4]/15 p-6 flex items-center justify-center h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full max-w-[160px] h-auto object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-1.5 rounded-lg bg-white/80 backdrop-blur-sm border border-[#EDE7FF]/40">
                    <Maximize2 className="w-3.5 h-3.5 text-[#9180D8]" />
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5">
                <span className="inline-block px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-[#9180D8]/8 text-[#9180D8] border border-[#9180D8]/15 mb-3">
                  {project.category}
                </span>
                <h4 className="text-lg font-bold text-[#26324A] mb-2 leading-snug group-hover:text-[#9180D8] transition-colors">
                  {project.title}
                </h4>
                <p className="text-sm text-[#707789] line-clamp-2 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {(project.technologies || project.tech) && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(project.technologies || project.tech).slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-[#E8F8F0]/60 text-[#26324A] border border-[#E8F8F0]"
                      >
                        {t}
                      </span>
                    ))}
                    {(project.technologies || project.tech).length > 3 && (
                      <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-[#FFF1E5]/60 text-[#707789]">
                        +{(project.technologies || project.tech).length - 3}
                      </span>
                    )}
                  </div>
                )}

                <div className="flex items-center text-sm text-[#9180D8] font-medium group-hover:gap-2 transition-all">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {modalProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26324A]/40 backdrop-blur-sm"
            onClick={() => setModalProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-white rounded-3xl shadow-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-[#EDE7FF]/60"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Image */}
              <div className="relative bg-gradient-to-br from-[#EDE7FF]/30 via-[#E5F2FF]/20 to-[#FFF0F4]/20 p-10 flex items-center justify-center min-h-[200px]">
                <img
                  src={modalProject.image}
                  alt={modalProject.title}
                  className="w-full max-w-[220px] h-auto object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <button
                  onClick={() => setModalProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-white/80 backdrop-blur-sm border border-[#EDE7FF]/60 text-[#707789] hover:text-[#9180D8] transition-colors"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <span className="absolute top-4 left-4 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[#9180D8]/10 text-[#9180D8] border border-[#9180D8]/20">
                  {modalProject.category}
                </span>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#26324A] mb-3">
                  {modalProject.title}
                </h3>
                <p className="text-[#707789] mb-6 leading-relaxed">
                  {modalProject.description}
                </p>

                {/* Highlights */}
                {modalProject.highlights && modalProject.highlights.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-[#26324A] uppercase tracking-wider mb-3">
                      Key Highlights
                    </h4>
                    <ul className="space-y-2">
                      {modalProject.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#9180D8] mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-[#707789]">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack */}
                {(modalProject.technologies || modalProject.tech) && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-[#26324A] uppercase tracking-wider mb-3">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(modalProject.technologies || modalProject.tech).map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1.5 text-xs font-medium rounded-full bg-[#E5F2FF]/50 text-[#26324A] border border-[#E5F2FF]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#EDE7FF]/40">
                  {modalProject.github && modalProject.github !== '#' && (
                    <a
                      href={modalProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#EDE7FF]/60 text-[#26324A] text-sm font-medium hover:border-[#9180D8]/40 hover:text-[#9180D8] transition-colors"
                    >
                      <GithubIcon className="w-4 h-4" />
                      View Source
                    </a>
                  )}
                  {modalProject.live && modalProject.live !== '#' && (
                    <a
                      href={modalProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#9180D8] text-white text-sm font-medium hover:bg-[#7b6bc4] transition-colors shadow-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
