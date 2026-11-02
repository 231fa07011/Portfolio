import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, X, ZoomIn, Download, CheckCircle2 } from 'lucide-react';
import { fallbackPortfolioData } from '../data/fallbackPortfolio';

const defaultCertifications = fallbackPortfolioData.certifications;

/* ── Certificate Card ───────────────────────────────────────── */
function CertificateCard({ cert, index, onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className="group relative flex flex-col rounded-3xl border border-[#EDE7FF] dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:shadow-xl hover:shadow-[#EDE7FF]/50 dark:hover:shadow-black/50 transition-all duration-300 hover:-translate-y-1.5"
    >
      {/* Certificate Image Frame */}
      <div
        className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950 border border-[#EDE7FF] dark:border-slate-800 mb-4 cursor-pointer"
        onClick={() => onOpen(cert)}
      >
        <img
          src={cert.image}
          alt={cert.title}
          className="h-full w-full object-contain p-2.5 transition-transform duration-500 group-hover:scale-103"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#0F172A]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 text-xs font-bold text-[#0F172A] dark:text-white shadow-md">
            <ZoomIn className="w-4 h-4 text-[#9180D8] dark:text-[#C4B5FD]" />
            Inspect Certificate
          </span>
        </div>
        <div className="absolute top-2.5 left-2.5">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 dark:bg-slate-900/95 backdrop-blur text-[#9180D8] dark:text-[#C4B5FD] border border-[#EDE7FF] dark:border-slate-800 shadow-xs">
            {cert.badge}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-bold text-[#0284C7] dark:text-[#38BDF8] uppercase tracking-wider">
              {cert.issuer}
            </span>
            <span className="text-[11px] text-[#64748B] dark:text-[#94A3B8] font-medium shrink-0">
              {cert.date}
            </span>
          </div>

          <h3 className="text-base font-extrabold text-[#0F172A] dark:text-[#F8FAFC] mb-2 leading-snug group-hover:text-[#9180D8] dark:group-hover:text-[#C4B5FD] transition-colors">
            {cert.title}
          </h3>

          <p className="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed line-clamp-3 mb-4">
            {cert.description}
          </p>
        </div>

        {/* Footer info & view button */}
        <div className="pt-3.5 border-t border-[#EDE7FF] dark:border-slate-800 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-400 bg-[#E8F8F0] dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/60">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            {cert.score}
          </span>

          <button
            onClick={() => onOpen(cert)}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#9180D8] dark:text-[#C4B5FD] hover:text-[#7A6BC4] transition-colors cursor-pointer"
          >
            <span>View</span>
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Lightbox Modal ─────────────────────────────────────────── */
function CertificateModal({ cert, onClose }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (closeBtnRef.current) closeBtnRef.current.focus();

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  if (!cert) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative max-w-4xl w-full max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-[#EDE7FF] dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EDE7FF] dark:border-slate-800 bg-[#FAF9F6] dark:bg-slate-900/80">
          <div className="min-w-0 pr-4">
            <h4 className="text-base sm:text-lg font-extrabold text-[#0F172A] dark:text-[#F8FAFC] truncate">
              {cert.title}
            </h4>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8] font-medium">
              {cert.issuer} • {cert.date} • {cert.score}
            </p>
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-full hover:bg-slate-200/60 dark:hover:bg-slate-800 text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Display */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-slate-50 dark:bg-slate-950 min-h-[350px]">
          <img
            src={cert.image}
            alt={cert.title}
            className="max-h-[72vh] w-auto max-w-full object-contain rounded-xl shadow-lg border border-[#EDE7FF] dark:border-slate-800"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-white dark:bg-slate-900 border-t border-[#EDE7FF] dark:border-slate-800">
          <span className="text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
            Verified Credential: <span className="text-[#9180D8] dark:text-[#C4B5FD]">{cert.badge}</span>
          </span>
          <a
            href={cert.image}
            download={`${cert.id}.jpeg`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#9180D8] to-[#5B8DEF] text-white text-xs font-semibold shadow-sm hover:brightness-105 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            Download Original
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Certifications({ certifications = [] }) {
  const items = certifications && certifications.length > 0 ? certifications : defaultCertifications;
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certifications" className="py-20 md:py-28 bg-white dark:bg-[#0B0F19] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCFBFF] dark:bg-slate-900 border border-[#EDE7FF] dark:border-slate-800 shadow-xs mb-3">
            <Award className="w-4 h-4 text-[#9180D8] dark:text-[#C4B5FD]" />
            <span className="text-xs font-semibold tracking-wider uppercase text-[#9180D8] dark:text-[#C4B5FD]">
              Academic & Technical Credentials
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight mb-4">
            Certifications & Workshops
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] dark:text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            Authentic, verified academic certifications from NPTEL, IIT Ropar, IIT Hyderabad, and Cambridge English.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((cert, index) => (
            <CertificateCard
              key={cert.id}
              cert={cert}
              index={index}
              onOpen={setSelectedCert}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <CertificateModal
            cert={selectedCert}
            onClose={() => setSelectedCert(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
