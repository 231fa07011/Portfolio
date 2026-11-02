import React from 'react';
import { ArrowUp, Mail, Heart, ShieldCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

const fallbackPersonal = {
  name: 'VARIKUNTLA NAGAMOUNIKA',
  email: 'nagamounika624@gmail.com',
  github: 'https://github.com/231fa07011',
  linkedin: 'https://www.linkedin.com/in/nagamounika-varikuntla-894658283/',
};

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer({ personal = {} }) {
  const info = { ...fallbackPersonal, ...personal };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-[#080C14] border-t border-[#EDE7FF] dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#9180D8] to-[#5B8DEF] flex items-center justify-center text-white font-black text-sm shadow-sm">
                VN
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-wide">
                  VARIKUNTLA NAGAMOUNIKA
                </h3>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                  B.Tech IT • Web Developer
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed max-w-xs">
              Crafting responsive, performant web applications with modern
              technologies, clean code, and zero-database architectures.
            </p>
            {info.email && (
              <a
                href={`mailto:${info.email}`}
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#9180D8] dark:text-[#C4B5FD] hover:underline font-semibold"
              >
                <Mail className="w-4 h-4" />
                {info.email}
              </a>
            )}
          </div>

          {/* Architecture Badge */}
          <div className="flex items-start sm:justify-center">
            <div className="p-5 bg-[#FAF9F6] dark:bg-slate-900 rounded-2xl border border-[#EDE7FF] dark:border-slate-800 max-w-xs shadow-xs">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#E8F8F0] dark:bg-emerald-950/60 flex items-center justify-center">
                  <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h4 className="text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider">
                  Zero-Database Engine
                </h4>
              </div>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                Runs on a validated flat-file JSON architecture & Vercel serverless REST API.
                Fast, private, and resilient against downtime.
              </p>
              <div className="flex items-center gap-1.5 mt-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  Production Online
                </span>
              </div>
            </div>
          </div>

          {/* Social Links + Back to Top */}
          <div className="flex flex-col items-start lg:items-end gap-5">
            <div className="space-y-3">
              <p className="text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC] uppercase tracking-wider">
                Connect & Follow
              </p>
              <div className="flex items-center gap-3">
                {info.github && (
                  <a
                    href={info.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className="w-10 h-10 rounded-xl border border-[#EDE7FF] dark:border-slate-800 bg-white dark:bg-slate-800/80 flex items-center justify-center text-[#64748B] dark:text-[#94A3B8] hover:text-[#9180D8] dark:hover:text-[#C4B5FD] hover:shadow-xs transition-all"
                  >
                    <GithubIcon className="w-4.5 h-4.5" />
                  </a>
                )}
                {info.linkedin && (
                  <a
                    href={info.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="w-10 h-10 rounded-xl border border-[#EDE7FF] dark:border-slate-800 bg-white dark:bg-slate-800/80 flex items-center justify-center text-[#64748B] dark:text-[#94A3B8] hover:text-[#0284C7] dark:hover:text-[#38BDF8] hover:shadow-xs transition-all"
                  >
                    <LinkedinIcon className="w-4.5 h-4.5" />
                  </a>
                )}
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#9180D8] to-[#5B8DEF] text-white text-xs font-bold shadow-sm hover:brightness-105 transition-all cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
              Back to Top
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-[#EDE7FF]/60 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">
            © {CURRENT_YEAR} VARIKUNTLA NAGAMOUNIKA. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-[#64748B] dark:text-[#94A3B8]">
            Built with React.js, Tailwind CSS, Vite & Framer Motion
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
