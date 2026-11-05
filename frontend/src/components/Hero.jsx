import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileDown,
  ArrowRight,
  Mail,
  MapPin,
  GraduationCap,
  Code2,
  Video,
  VideoOff,
  Sparkles,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { trackEvent } from '../utils/analytics';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const slideIn = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const INTERESTS = [
  'Web Development',
  'React.js',
  'Python',
  'Software Engineering',
];

export default function Hero({ personal = {} }) {
  const verifiedGithub = 'https://github.com/231fa07011';
  const verifiedLinkedin =
    'https://www.linkedin.com/in/nagamounika-varikuntla-894658283/';
  const email = personal?.email || 'nagamounika624@gmail.com';

  const [activeInterestIdx, setActiveInterestIdx] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef(null);

  // Cycle interests every 2.8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveInterestIdx((prev) => (prev + 1) % INTERESTS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
      trackEvent('hero_video_pause', {
        event_category: 'hero_video',
        event_label: 'Paused',
      });
    } else {
      videoRef.current.play();
      setIsVideoPlaying(true);
      trackEvent('hero_video_play', {
        event_category: 'hero_video',
        event_label: 'Resumed',
      });
    }
  };

  return (
    <section
      id="hero"
      aria-label="Introduction and Hero"
      className="relative min-h-[94vh] flex items-center overflow-hidden pt-24 pb-16 lg:py-28 transition-colors duration-300"
    >
      {/* ── Cinematic Stock Video Background with Poster Fallback ── */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-slate-900">
        <video
          ref={videoRef}
          src="/media/hero-background.mp4"
          poster="/media/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover object-center transition-opacity duration-700 opacity-60 dark:opacity-40"
        />

        {/* Ambient Overlay to guarantee WCAG text contrast in both Light & Dark modes */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F6]/95 via-[#FAF9F6]/88 to-[#FAF9F6]/75 dark:from-[#0B0F19]/95 dark:via-[#0B0F19]/90 dark:to-[#0B0F19]/80 backdrop-blur-[1px]" />
        
        {/* Soft Decorative Color Glimmers */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-[#EDE7FF]/40 dark:bg-[#9180D8]/15 blur-[120px]" />
          <div className="absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-[#E5F2FF]/50 dark:bg-[#38BDF8]/15 blur-[120px]" />
          <div className="absolute -bottom-20 left-1/3 h-[360px] w-[360px] rounded-full bg-[#E0F2F1]/40 dark:bg-[#0D9488]/15 blur-[110px]" />
        </div>
      </div>

      {/* Video Control Pill (Top Right of Hero) */}
      <div className="absolute top-28 right-4 sm:right-8 z-20">
        <button
          onClick={toggleVideo}
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-3 py-1 text-[11px] font-semibold text-slate-700 dark:text-slate-300 shadow-sm backdrop-blur-md hover:bg-white dark:hover:bg-slate-800 transition-all hover:scale-105 active:scale-95"
          title={isVideoPlaying ? 'Pause Background Video' : 'Play Background Video'}
          aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
        >
          {isVideoPlaying ? (
            <>
              <Video className="h-3 w-3 text-emerald-500 animate-pulse" />
              <span>Cinematic Video Active</span>
            </>
          ) : (
            <>
              <VideoOff className="h-3 w-3 text-slate-400" />
              <span>Video Paused</span>
            </>
          )}
        </button>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ════════════════════ LEFT COLUMN: BIO & ACTIONS ════════════════════ */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start text-left"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Status pill */}
            <motion.div variants={slideIn} className="mb-5">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-[#EDE7FF] dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#334155] dark:text-[#E2E8F0] shadow-xs backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                Available for Software & Web Opportunities • B.Tech IT 2027
              </span>
            </motion.div>

            {/* Subtitle / Role Tag */}
            <motion.p
              variants={slideIn}
              className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#9180D8] dark:text-[#C4B5FD] flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#9180D8]" />
              Software Engineering • Web Development Portfolio
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={slideIn}
              className="mb-3 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0F172A] dark:text-[#F8FAFC]"
            >
              VARIKUNTLA NAGAMOUNIKA
            </motion.h1>

            {/* Title with Animated Rotating Interest Text */}
            <motion.div
              variants={slideIn}
              className="mb-5 flex flex-wrap items-center gap-2 text-lg sm:text-xl font-bold text-[#334155] dark:text-[#CBD5E1]"
            >
              <span>Information Technology Student &</span>
              <span className="relative inline-flex items-center overflow-hidden py-0.5">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={INTERRESTS_KEY(activeInterestIdx)}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="inline-block rounded-lg bg-gradient-to-r from-[#9180D8] via-[#7B6BC4] to-[#5B8DEF] bg-clip-text text-transparent underline decoration-[#9180D8]/40 decoration-wavy"
                  >
                    {INTERESTS[activeInterestIdx]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>

            {/* Concise Professional Bio */}
            <motion.p
              variants={slideIn}
              className="mb-7 max-w-2xl text-sm sm:text-base leading-relaxed text-[#475569] dark:text-[#94A3B8]"
            >
              Information Technology student at Vignan's Foundation (CGPA 7.92/10,
              graduating in 2027) with hands-on web development experience through an
              internship at Rinex Technologies and practical software projects.
              Proficient in Python, Java, React.js, JavaScript, HTML, CSS, and MySQL with
              strong fundamentals in OOP, DBMS, and REST APIs. Driven to build responsive,
              reliable web solutions with clean code and modern architectures.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              variants={slideIn}
              className="mb-8 flex flex-wrap items-center gap-2.5"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 dark:bg-slate-800/90 px-3.5 py-1.5 text-xs font-semibold text-[#0F172A] dark:text-[#F1F5F9] border border-[#EDE7FF] dark:border-slate-700 shadow-xs backdrop-blur-xs">
                <MapPin className="h-3.5 w-3.5 text-[#9180D8]" />
                Ongole, Andhra Pradesh
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 dark:bg-slate-800/90 px-3.5 py-1.5 text-xs font-semibold text-[#0F172A] dark:text-[#F1F5F9] border border-[#E5F2FF] dark:border-slate-700 shadow-xs backdrop-blur-xs">
                <GraduationCap className="h-3.5 w-3.5 text-[#0284C7]" />
                CGPA 7.92 / 10
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 dark:bg-slate-800/90 px-3.5 py-1.5 text-xs font-semibold text-[#0F172A] dark:text-[#F1F5F9] border border-[#E0F2F1] dark:border-slate-700 shadow-xs backdrop-blur-xs">
                <Code2 className="h-3.5 w-3.5 text-[#0D9488]" />
                React.js • Node • MySQL • Python
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={slideIn}
              className="mb-8 flex flex-wrap items-center gap-3.5"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#9180D8] via-[#7B6BC4] to-[#5B8DEF] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[#9180D8]/25 hover:brightness-105 transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                View Projects
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="/resume.pdf"
                download="VARIKUNTLA_NAGAMOUNIKA_Resume.pdf"
                onClick={() =>
                  trackEvent('download_resume', {
                    event_category: 'engagement',
                    event_label: 'Hero Resume Button',
                  })
                }
                className="inline-flex items-center gap-2 rounded-xl border border-[#EDE7FF] dark:border-slate-700 bg-white/95 dark:bg-slate-800/95 px-6 py-3 text-sm font-bold text-[#0F172A] dark:text-[#F8FAFC] shadow-xs backdrop-blur-xs transition-transform hover:bg-[#EDE7FF]/30 dark:hover:bg-slate-700 hover:scale-[1.03] active:scale-[0.98]"
              >
                <FileDown className="h-4 w-4 text-[#9180D8] dark:text-[#C4B5FD]" />
                Download Resume
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-bold text-[#9180D8] dark:text-[#C4B5FD] hover:text-[#7A6BC4] transition-colors"
              >
                Contact Me
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={slideIn} className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] mr-1">
                Connect:
              </span>
              <a
                href={verifiedGithub}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#EDE7FF] dark:border-slate-800 bg-white/90 dark:bg-slate-800/80 text-[#475569] dark:text-[#94A3B8] shadow-xs backdrop-blur-xs transition-colors hover:bg-[#EDE7FF]/40 dark:hover:bg-slate-700 hover:text-[#0F172A] dark:hover:text-white"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href={verifiedLinkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#EDE7FF] dark:border-slate-800 bg-white/90 dark:bg-slate-800/80 text-[#475569] dark:text-[#94A3B8] shadow-xs backdrop-blur-xs transition-colors hover:bg-[#E5F2FF]/50 dark:hover:bg-slate-700 hover:text-[#0284C7] dark:hover:text-cyan-400"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${email}`}
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#EDE7FF] dark:border-slate-800 bg-white/90 dark:bg-slate-800/80 text-[#475569] dark:text-[#94A3B8] shadow-xs backdrop-blur-xs transition-colors hover:bg-[#FFF0F4]/60 dark:hover:bg-slate-700 hover:text-[#E11D48]"
              >
                <Mail className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>

          {/* ════════════════════ RIGHT COLUMN: ENLARGED PROFILE ════════════════════ */}
          <motion.div
            className="flex justify-center lg:col-span-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="relative">
              {/* Soft ambient aura */}
              <div className="absolute -inset-6 z-0 rounded-[2.5rem] bg-gradient-to-tr from-[#EDE7FF]/80 via-[#E5F2FF]/60 to-[#E0F2F1]/50 dark:from-[#9180D8]/20 dark:via-[#38BDF8]/15 dark:to-[#0D9488]/15 blur-2xl" />

              {/* Framed card */}
              <div className="relative z-10 overflow-hidden rounded-[2rem] border border-[#EDE7FF] dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-3 shadow-2xl shadow-[#EDE7FF]/50 dark:shadow-black/50 backdrop-blur-sm">
                <div className="group relative overflow-hidden rounded-2xl">
                  <img
                    src="/profile.png"
                    alt="VARIKUNTLA NAGAMOUNIKA"
                    className="h-80 w-64 object-cover sm:h-[400px] sm:w-72 md:h-[460px] md:w-80 transition-transform duration-500 ease-out group-hover:scale-102"
                    loading="eager"
                  />

                  {/* Frosted identity banner */}
                  <div className="absolute inset-x-0 bottom-0 bg-white/85 dark:bg-slate-900/90 px-5 py-3.5 backdrop-blur-md border-t border-[#EDE7FF]/60 dark:border-slate-800">
                    <p className="text-sm font-extrabold tracking-wide text-[#0F172A] dark:text-[#F8FAFC]">
                      VARIKUNTLA NAGAMOUNIKA
                    </p>
                    <p className="text-xs font-semibold text-[#64748B] dark:text-[#94A3B8]">
                      B.Tech in Information Technology (2023–2027)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function INTERRESTS_KEY(idx) {
  return `interest-${idx}`;
}
