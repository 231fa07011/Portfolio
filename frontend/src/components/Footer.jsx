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
    <footer className="bg-white border-t border-[#EDE7FF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-10 md:py-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#9180D8] to-[#7b6bc4] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                VN
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#26324A] tracking-wide">
                  VARIKUNTLA NAGAMOUNIKA
                </h3>
                <p className="text-xs text-[#707789]">
                  Full-Stack Developer
                </p>
              </div>
            </div>
            <p className="text-sm text-[#707789] leading-relaxed max-w-xs">
              Crafting elegant, performant web applications with modern
              technologies and a passion for clean architecture.
            </p>
            {info.email && (
              <a
                href={`mailto:${info.email}`}
                className="inline-flex items-center gap-2 text-sm text-[#9180D8] hover:text-[#7b6bc4] transition-colors font-medium"
              >
                <Mail className="w-4 h-4" />
                {info.email}
              </a>
            )}
          </div>

          {/* Architecture Badge */}
          <div className="flex items-start sm:justify-center">
            <div className="p-5 bg-[#FCFBFF] rounded-2xl border border-[#EDE7FF]/60 max-w-xs">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#E8F8F0] flex items-center justify-center">
                  <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" />
                </div>
                <h4 className="text-sm font-bold text-[#26324A]">
                  Zero-Database
                </h4>
              </div>
              <p className="text-xs text-[#707789] leading-relaxed">
                This portfolio runs on a flat-file JSON architecture — no
                database, no data collection. Fast, private, and fully
                transparent.
              </p>
              <div className="flex items-center gap-1.5 mt-3">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-medium text-emerald-600 uppercase tracking-wider">
                  Privacy by Design
                </span>
              </div>
            </div>
          </div>

          {/* Social Links + Back to Top */}
          <div className="flex flex-col items-start lg:items-end gap-5">
            {/* Social Links */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-[#26324A] uppercase tracking-wider">
                Connect
              </p>
              <div className="flex items-center gap-3">
                {info.github && (
                  <a
                    href={info.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className="w-10 h-10 rounded-xl border border-[#EDE7FF]/60 flex items-center justify-center text-[#707789] hover:text-[#9180D8] hover:border-[#9180D8]/40 hover:shadow-sm transition-all duration-300"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                )}
                {info.linkedin && (
                  <a
                    href={info.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="w-10 h-10 rounded-xl border border-[#EDE7FF]/60 flex items-center justify-center text-[#707789] hover:text-[#9180D8] hover:border-[#9180D8]/40 hover:shadow-sm transition-all duration-300"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                )}
                {info.email && (
                  <a
                    href={`mailto:${info.email}`}
                    aria-label="Send email"
                    className="w-10 h-10 rounded-xl border border-[#EDE7FF]/60 flex items-center justify-center text-[#707789] hover:text-[#9180D8] hover:border-[#9180D8]/40 hover:shadow-sm transition-all duration-300"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#9180D8] text-white text-sm font-medium hover:bg-[#7b6bc4] transition-colors shadow-sm"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
              Back to Top
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-5 border-t border-[#EDE7FF]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#707789]">
            © {CURRENT_YEAR} VARIKUNTLA NAGAMOUNIKA. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-[#707789]">
            Designed with
            <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
            soft pastel aesthetics & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
