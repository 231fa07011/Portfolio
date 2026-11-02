import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  RefreshCw,
  FileDown,
  Sparkles
} from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar({ backendStatus, onRetryBackend }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Progress bar
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));

      // Active section detection
      const sections = navLinks.map(l => l.href.replace('#', ''));
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-lg shadow-sm border-b border-[#EDE7FF]/50 py-2.5'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* Logo / Brand */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#9180D8] to-[#6C83D8] flex items-center justify-center text-white font-bold text-sm shadow-md shadow-[#9180D8]/20 group-hover:scale-105 transition-transform">
                VN
              </div>
              <div>
                <span className="font-bold text-[#26324A] text-sm tracking-tight block">
                  VARIKUNTLA NAGAMOUNIKA
                </span>
                <span className="text-[11px] text-[#9180D8] font-medium tracking-wide flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> IT & Web Developer
                </span>
              </div>
            </a>

            {/* Desktop Nav Items */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all relative ${
                      isActive
                        ? 'text-[#9180D8] bg-[#EDE7FF]/40'
                        : 'text-[#707789] hover:text-[#9180D8] hover:bg-[#EDE7FF]/20'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Backend Status & Resume CTA */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Status Pill */}
              <div
                title={backendStatus.online ? "Connected to Express Backend" : "Backend Offline (Cached data)"}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  backendStatus.online
                    ? 'bg-[#E8F8F0] text-emerald-700 border-emerald-200/60'
                    : 'bg-[#FFF1E5] text-amber-700 border-amber-200/60'
                }`}
              >
                {backendStatus.online ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="hidden md:inline">API Online</span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="hidden md:inline">Standby</span>
                    <button
                      onClick={onRetryBackend}
                      className="ml-1 hover:text-amber-900 focus:outline-none cursor-pointer"
                      title="Retry"
                    >
                      <RefreshCw className="w-3 h-3" />
                    </button>
                  </>
                )}
              </div>

              {/* Resume Button */}
              <a
                href="/resume.pdf"
                download="Varikuntla_Nagamounika_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#9180D8] to-[#6C83D8] text-white shadow-sm shadow-[#9180D8]/20 hover:shadow-md hover:shadow-[#9180D8]/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <FileDown className="w-3.5 h-3.5" />
                Resume
              </a>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-[#707789] hover:text-[#9180D8] hover:bg-[#EDE7FF]/30 focus:outline-none transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white/95 backdrop-blur-lg border-b border-[#EDE7FF]/50 px-6 py-4 space-y-1"
            >
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block py-2 px-3 rounded-xl font-medium transition-colors ${
                      isActive
                        ? 'text-[#9180D8] bg-[#EDE7FF]/30'
                        : 'text-[#26324A] hover:text-[#9180D8] hover:bg-[#EDE7FF]/20'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}

              <div className="pt-3 border-t border-[#EDE7FF]/40 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <span className={`w-2 h-2 rounded-full ${backendStatus.online ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span className="text-[#707789]">
                    {backendStatus.online ? 'API Active' : 'Standby Mode'}
                  </span>
                </div>
                <a
                  href="/resume.pdf"
                  download="Varikuntla_Nagamounika_Resume.pdf"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#9180D8] text-white"
                >
                  <FileDown className="w-3.5 h-3.5" /> Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
