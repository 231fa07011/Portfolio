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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative max-w-3xl w-full max-h-[92vh] flex flex-col rounded-3xl bg-white shadow-2xl border border-[#EDE7FF] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EDE7FF] bg-[#FAF9F6]">
          <div className="min-w-0 pr-4">
            <h4 className="text-sm sm:text-base font-extrabold text-[#0F172A] truncate">
              {doc.title}
            </h4>
            <p className="text-xs text-[#64748B] font-medium">
              {doc.issuer} • {doc.duration}
            </p>
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close document lightbox"
            className="p-2 rounded-full hover:bg-slate-200/60 text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image preview: object-contain preserves the whole certificate without cropping */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-slate-50 min-h-[300px]">
          <img
            src={doc.image}
            alt={doc.title}
            className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-md border border-[#EDE7FF]"
          />
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-white border-t border-[#EDE7FF]">
          <span className="text-xs font-semibold text-[#0F172A]">
            Credential ID: <span className="text-[#9180D8] font-mono">{doc.certificateId}</span>
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
    <section id="experience" className="py-20 md:py-28 bg-[#FAF9F6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#EDE7FF] shadow-xs mb-3">
            <Briefcase className="w-4 h-4 text-[#0D9488]" />
            <span className="text-xs font-semibold tracking-wider uppercase text-[#0D9488]">
              Industry Experience
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">
            Work & Internships
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed">
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
            className="bg-white rounded-3xl border border-[#EDE7FF] p-6 sm:p-10 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-[#EDE7FF]">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#E0F2F1] flex items-center justify-center text-[#0D9488]">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-semibold text-[#0D9488]">
                    {exp.company} • <span className="text-[#64748B] font-normal">{exp.type}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#FAF9F6] text-[#475569] border border-[#EDE7FF]">
                  <Calendar className="w-3.5 h-3.5 text-[#9180D8]" />
                  {exp.period || exp.duration}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#E8F8F0] text-emerald-800 border border-emerald-200">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  {exp.location}
                </span>
              </div>
            </div>

            {/* Achievements Bullet Points */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] mb-4">
                Key Responsibilities & Deliverables
              </h4>
              <div className="space-y-3">
                {(exp.achievements || []).map((a, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#475569]">
                    <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] mb-3">
                Technologies & Workflow
              </h4>
              <div className="flex flex-wrap gap-2">
                {(exp.technologies || []).map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-xl text-xs font-semibold bg-[#FAF9F6] text-[#0F172A] border border-[#EDE7FF]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Verified Internship Documents Showcase */}
            {exp.documents && exp.documents.length > 0 && (
              <div className="pt-6 border-t border-[#EDE7FF]">
                <div className="flex items-center gap-2 mb-4">
                  <FileCheck className="w-4 h-4 text-[#0D9488]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                    Verified Internship Documents & Credentials
                  </h4>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {exp.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="group p-4 rounded-2xl bg-[#FCFBFF] border border-[#EDE7FF] hover:border-[#0D9488]/40 transition-all flex flex-col justify-between"
                    >
                      <div
                        className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white border border-[#EDE7FF] mb-3 cursor-pointer"
                        onClick={() => setActiveDoc(doc)}
                      >
                        <img
                          src={doc.image}
                          alt={doc.title}
                          className="w-full h-full object-contain p-2"
                        />
                        <div className="absolute inset-0 bg-[#0F172A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-xs font-bold text-[#0F172A] shadow-md">
                            <ZoomIn className="w-3.5 h-3.5 text-[#0D9488]" />
                            View Document
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-xs font-bold text-[#0F172A] leading-snug">
                            {doc.title}
                          </p>
                          <p className="text-[11px] text-[#64748B] mt-0.5">
                            {doc.issuer} • {doc.duration}
                          </p>
                        </div>
                        <button
                          onClick={() => setActiveDoc(doc)}
                          className="p-1.5 rounded-lg border border-[#EDE7FF] bg-white text-[#0D9488] hover:bg-[#E0F2F1] transition-colors cursor-pointer shrink-0"
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
