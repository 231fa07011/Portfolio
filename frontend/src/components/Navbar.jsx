import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  RefreshCw,
  FileDown,
  Sparkles,
  Sun,
  Moon,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

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
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Progress bar
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));

      // Active section detection
      const sections = navLinks.map((l) => l.href.replace('#', ''));
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) current = id;
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
            ? 'bg-white/90 dark:bg-[#0B0F19]/90 backdrop-blur-lg shadow-xs border-b border-[#EDE7FF]/60 dark:border-slate-800/80 py-2.5'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo / Brand */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#9180D8] to-[#5B8DEF] flex items-center justify-center text-white font-black text-sm shadow-md shadow-[#9180D8]/20 group-hover:scale-105 transition-transform">
                VN
              </div>
              <div>
                <span className="font-extrabold text-[#0F172A] dark:text-[#F8FAFC] text-sm tracking-tight block">
                  VARIKUNTLA NAGAMOUNIKA
                </span>
                <span className="text-[11px] text-[#9180D8] dark:text-[#C4B5FD] font-semibold tracking-wide flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> B.Tech IT & Web Developer
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
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all relative ${
                      isActive
                        ? 'text-[#9180D8] dark:text-[#C4B5FD] bg-[#EDE7FF]/60 dark:bg-[#9180D8]/20'
                        : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#9180D8] dark:hover:text-[#C4B5FD] hover:bg-[#EDE7FF]/20 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Right Tools: Dark/Light Toggle + Status + Resume CTA */}
            <div className="hidden sm:flex items-center gap-2.5">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                className="p-2 rounded-xl border border-[#EDE7FF] dark:border-slate-800 bg-white dark:bg-slate-800/80 text-[#64748B] dark:text-[#F1F5F9] hover:text-[#9180D8] dark:hover:text-[#C4B5FD] shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-[#9180D8]" />
                )}
              </button>

              {/* Status Pill */}
              <div
                title={
                  backendStatus.online
                    ? 'Connected to Production REST API'
                    : 'Backend Offline (Cached data)'
                }
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  backendStatus.online
                    ? 'bg-[#E8F8F0] dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/40'
                    : 'bg-[#FFF1E5] dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/40'
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
                      className="ml-1 hover:text-amber-900 dark:hover:text-amber-200 focus:outline-none cursor-pointer"
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
                download="VARIKUNTLA_NAGAMOUNIKA_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#9180D8] to-[#5B8DEF] text-white shadow-sm shadow-[#9180D8]/20 hover:shadow-md hover:brightness-105 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <FileDown className="w-3.5 h-3.5" />
                Resume
              </a>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                className="p-2 rounded-xl border border-[#EDE7FF] dark:border-slate-800 bg-white dark:bg-slate-800/80 text-[#64748B] dark:text-[#F1F5F9] shadow-xs cursor-pointer"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-[#9180D8]" />
                )}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl border border-[#EDE7FF] dark:border-slate-800 bg-white dark:bg-slate-800 text-[#64748B] dark:text-[#F1F5F9] hover:text-[#9180D8] transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden border-b border-[#EDE7FF] dark:border-slate-800 bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-lg px-4 pt-3 pb-6 shadow-xl"
            >
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="px-3.5 py-2 rounded-xl text-sm font-semibold text-[#334155] dark:text-[#E2E8F0] hover:bg-[#EDE7FF]/40 dark:hover:bg-slate-800/60 hover:text-[#9180D8] transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-4 border-t border-[#EDE7FF] dark:border-slate-800 mt-2 flex items-center justify-between gap-3">
                  <a
                    href="/resume.pdf"
                    download="VARIKUNTLA_NAGAMOUNIKA_Resume.pdf"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#9180D8] to-[#5B8DEF] text-white shadow-sm"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    Download Resume
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
