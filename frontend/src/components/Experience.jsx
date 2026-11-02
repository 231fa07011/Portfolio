import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  ZoomIn,
  Download,
  X,
  FileCheck,
} from 'lucide-react';
import { fallbackPortfolioData } from '../data/fallbackPortfolio';

const defaultExperience = fallbackPortfolioData.experience;

/* ── Document Lightbox Modal ────────────────────────────────── */
function DocumentModal({ document: doc, onClose }) {
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

  if (!doc) return null;

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
        className="relative max-w-3xl w-full max-h-[92vh] flex flex-col rounded-3xl bg-white dark:bg-slate-900 shadow-2xl border border-[#EDE7FF] dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EDE7FF] dark:border-slate-800 bg-[#FAF9F6] dark:bg-slate-900/80">
          <div className="min-w-0 pr-4">
            <h4 className="text-sm sm:text-base font-extrabold text-[#0F172A] dark:text-[#F8FAFC] truncate">
              {doc.title}
            </h4>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8] font-medium">
              {doc.issuer} • {doc.duration}
            </p>
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close document lightbox"
            className="p-2 rounded-full hover:bg-slate-200/60 dark:hover:bg-slate-800 text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image preview */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-slate-50 dark:bg-slate-950 min-h-[300px]">
          <img
            src={doc.image}
            alt={doc.title}
            className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-md border border-[#EDE7FF] dark:border-slate-800"
          />
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-white dark:bg-slate-900 border-t border-[#EDE7FF] dark:border-slate-800">
          <span className="text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
            Credential ID: <span className="text-[#9180D8] dark:text-[#C4B5FD] font-mono">{doc.certificateId}</span>
          </span>
          <a
            href={doc.image}
            download={`${doc.id}.jpeg`}
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

export default function Experience({ experience = [] }) {
  const items = experience && experience.length > 0 ? experience : defaultExperience;
  const exp = items[0];
  const [activeDoc, setActiveDoc] = useState(null);

  return (
    <section id="experience" className="py-20 md:py-28 bg-[#FAF9F6] dark:bg-[#0B0F19] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-[#EDE7FF] dark:border-slate-800 shadow-xs mb-3">
            <Briefcase className="w-4 h-4 text-[#0D9488] dark:text-[#2DD4BF]" />
            <span className="text-xs font-semibold tracking-wider uppercase text-[#0D9488] dark:text-[#2DD4BF]">
              Industry Experience
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight mb-4">
            Work & Internships
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] dark:text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            Practical industry exposure and frontend engineering contributions at Rinex Technologies.
          </p>
        </motion.div>

        {/* Main Experience Card */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-[#EDE7FF] dark:border-slate-800 p-6 sm:p-10 shadow-xs hover:shadow-md transition-shadow"
          >
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-[#EDE7FF] dark:border-slate-800">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#E0F2F1] dark:bg-teal-950/60 flex items-center justify-center text-[#0D9488] dark:text-[#2DD4BF]">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC]">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-semibold text-[#0D9488] dark:text-[#2DD4BF]">
                    {exp.company} • <span className="text-[#64748B] dark:text-[#94A3B8] font-normal">{exp.type}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#FAF9F6] dark:bg-slate-800 text-[#475569] dark:text-[#CBD5E1] border border-[#EDE7FF] dark:border-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-[#9180D8] dark:text-[#C4B5FD]" />
                  {exp.period || exp.duration}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#E8F8F0] dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  {exp.location}
                </span>
              </div>
            </div>

            {/* Achievements Bullet Points */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] dark:text-[#F8FAFC] mb-4">
                Key Responsibilities & Deliverables
              </h4>
              <div className="space-y-3">
                {(exp.achievements || []).map((a, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">
                    <CheckCircle2 className="w-4 h-4 text-[#0D9488] dark:text-[#2DD4BF] shrink-0 mt-0.5" />
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] dark:text-[#F8FAFC] mb-3">
                Technologies & Workflow
              </h4>
              <div className="flex flex-wrap gap-2">
                {(exp.technologies || []).map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-xl text-xs font-semibold bg-[#FAF9F6] dark:bg-slate-800 text-[#0F172A] dark:text-[#E2E8F0] border border-[#EDE7FF] dark:border-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Verified Internship Documents Showcase */}
            {exp.documents && exp.documents.length > 0 && (
              <div className="pt-6 border-t border-[#EDE7FF] dark:border-slate-800">
                <div className="flex items-center gap-2 mb-4">
                  <FileCheck className="w-4 h-4 text-[#0D9488] dark:text-[#2DD4BF]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] dark:text-[#F8FAFC]">
                    Verified Internship Documents & Credentials
                  </h4>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {exp.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="group p-4 rounded-2xl bg-[#FCFBFF] dark:bg-slate-800/60 border border-[#EDE7FF] dark:border-slate-700 hover:border-[#0D9488]/40 transition-all flex flex-col justify-between"
                    >
                      <div
                        className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-[#EDE7FF] dark:border-slate-700 mb-3 cursor-pointer"
                        onClick={() => setActiveDoc(doc)}
                      >
                        <img
                          src={doc.image}
                          alt={doc.title}
                          className="w-full h-full object-contain p-2"
                        />
                        <div className="absolute inset-0 bg-[#0F172A]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-xs font-bold text-[#0F172A] dark:text-white shadow-md">
                            <ZoomIn className="w-3.5 h-3.5 text-[#0D9488] dark:text-[#2DD4BF]" />
                            View Document
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-xs font-bold text-[#0F172A] dark:text-[#F8FAFC] leading-snug">
                            {doc.title}
                          </p>
                          <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                            {doc.issuer} • {doc.duration}
                          </p>
                        </div>
                        <button
                          onClick={() => setActiveDoc(doc)}
                          className="p-1.5 rounded-lg border border-[#EDE7FF] dark:border-slate-700 bg-white dark:bg-slate-800 text-[#0D9488] dark:text-[#2DD4BF] hover:bg-[#E0F2F1] dark:hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
                          title="Open in Lightbox"
                        >
                          <ZoomIn className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeDoc && (
          <DocumentModal document={activeDoc} onClose={() => setActiveDoc(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
