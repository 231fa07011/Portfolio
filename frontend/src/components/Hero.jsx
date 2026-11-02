import React from 'react';
import { motion } from 'framer-motion';
import {
  FileDown,
  ArrowRight,
  Mail,
  MapPin,
  GraduationCap,
  Code2,
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
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Hero({ personal = {} }) {
  const verifiedGithub = 'https://github.com/231fa07011';
  const verifiedLinkedin =
    'https://www.linkedin.com/in/nagamounika-varikuntla-894658283/';
  const email = personal?.email || 'nagamounika624@gmail.com';

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#FAF9F6] pt-24 pb-16 lg:py-28"
    >
      {/* ── Background Accent Blobs (Warm Ivory & Soft Pastels) ── */}
      <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-[500px] w-[500px] rounded-full bg-[#EDE7FF]/50 blur-[110px]" />
        <div className="absolute top-1/4 right-0 h-[450px] w-[450px] rounded-full bg-[#E5F2FF]/60 blur-[120px]" />
        <div className="absolute -bottom-20 left-1/3 h-[380px] w-[380px] rounded-full bg-[#E0F2F1]/50 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ════════════════════ LEFT COLUMN ════════════════════ */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start text-left"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Status pill */}
            <motion.div variants={slideIn} className="mb-5">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-[#EDE7FF] bg-white/95 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#334155] shadow-sm backdrop-blur">
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
              className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#9180D8]"
            >
              Software Engineering • Web Development Portfolio
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={slideIn}
              className="mb-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0F172A]"
            >
              VARIKUNTLA NAGAMOUNIKA
            </motion.h1>

            {/* Headline */}
            <motion.p
              variants={slideIn}
              className="mb-5 text-lg sm:text-xl font-semibold text-[#334155]"
            >
              B.Tech Information Technology Student & Aspiring Full-Stack Developer
            </motion.p>

            {/* Concise Professional Bio */}
            <motion.p
              variants={slideIn}
              className="mb-8 max-w-2xl text-sm sm:text-base leading-relaxed text-[#475569]"
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
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0F172A] border border-[#EDE7FF] shadow-xs">
                <MapPin className="h-3.5 w-3.5 text-[#9180D8]" />
                Ongole, Andhra Pradesh
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0F172A] border border-[#E5F2FF] shadow-xs">
                <GraduationCap className="h-3.5 w-3.5 text-[#0284C7]" />
                CGPA 7.92 / 10
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0F172A] border border-[#E0F2F1] shadow-xs">
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
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#9180D8] via-[#7B6BC4] to-[#5B8DEF] px-6 py-3 text-sm font-bold text-white shadow-md shadow-[#9180D8]/25 transition-transform hover:scale-[1.03] active:scale-[0.98]"
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
                className="inline-flex items-center gap-2 rounded-xl border border-[#EDE7FF] bg-white px-6 py-3 text-sm font-bold text-[#0F172A] shadow-sm transition-transform hover:bg-[#EDE7FF]/30 hover:scale-[1.03] active:scale-[0.98]"
              >
                <FileDown className="h-4 w-4 text-[#9180D8]" />
                Download Resume
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-bold text-[#9180D8] hover:text-[#7A6BC4] transition-colors"
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
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#EDE7FF] bg-white text-[#475569] shadow-xs transition-colors hover:bg-[#EDE7FF]/40 hover:text-[#0F172A]"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href={verifiedLinkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#EDE7FF] bg-white text-[#475569] shadow-xs transition-colors hover:bg-[#E5F2FF]/50 hover:text-[#0284C7]"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${email}`}
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#EDE7FF] bg-white text-[#475569] shadow-xs transition-colors hover:bg-[#FFF0F4]/60 hover:text-[#E11D48]"
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
              <div className="absolute -inset-6 z-0 rounded-[2.5rem] bg-gradient-to-tr from-[#EDE7FF]/80 via-[#E5F2FF]/60 to-[#E0F2F1]/50 blur-2xl" />

              {/* White framed card */}
              <div className="relative z-10 overflow-hidden rounded-[2rem] border border-[#EDE7FF] bg-white p-3 shadow-xl shadow-[#EDE7FF]/50">
                <div className="group relative overflow-hidden rounded-2xl">
                  <img
                    src="/profile.png"
                    alt="VARIKUNTLA NAGAMOUNIKA"
                    className="h-80 w-64 object-cover sm:h-[400px] sm:w-72 md:h-[460px] md:w-80 transition-transform duration-500 ease-out group-hover:scale-102"
                    loading="eager"
                  />

                  {/* Frosted identity banner */}
                  <div className="absolute inset-x-0 bottom-0 bg-white/85 px-5 py-3.5 backdrop-blur-md border-t border-[#EDE7FF]/60">
                    <p className="text-sm font-extrabold tracking-wide text-[#0F172A]">
                      VARIKUNTLA NAGAMOUNIKA
                    </p>
                    <p className="text-xs font-semibold text-[#64748B]">
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
