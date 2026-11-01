import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, X, ZoomIn, Download, CheckCircle2, ImageOff } from 'lucide-react';

/* ── Verified Genuine Certifications & Workshops (Only Academic / Workshops) ── */
const defaultCertifications = [
  {
    id: 'software-testing',
    title: 'Software Testing',
    issuer: 'NPTEL (IIT Madras / IIIT Bangalore)',
    date: 'Jul–Oct 2025',
    score: '53% Consolidated',
    image: '/images/certificates/software-testing-nptel.jpeg',
    type: 'image',
    badge: 'NPTEL Certified',
    description:
      'Rigorous NPTEL coursework covering test methodologies, test-case design, black-box & white-box verification, unit testing, and software quality assurance.',
  },
  {
    id: 'online-comm',
    title: 'Online Communication in the Digital Age',
    issuer: 'NPTEL (IIT Roorkee)',
    date: 'Jan–Apr 2026',
    score: '67% Consolidated (Elite)',
    image: '/images/certificates/online-communication-nptel.jpeg',
    type: 'image',
    badge: 'NPTEL Elite',
    description:
      'Elite certification on professional digital etiquette, cross-functional collaboration, technical presentations, and modern workplace communication.',
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning',
    issuer: 'IIT Ropar (NPTEL)',
    date: 'Jan–Apr 2026',
    score: '69% Consolidated (Elite)',
    image: '/images/certificates/deep-learning-iit-ropar.jpeg',
    type: 'image',
    badge: 'IIT Ropar Elite',
    description:
      'Elite certification in neural networks, backpropagation algorithms, CNNs, computer vision architectures, and deep learning engineering.',
  },
  {
    id: 'generative-ai',
    title: 'Generative AI Workshop',
    issuer: 'IIT Hyderabad (Elan & nVision, IncuXai)',
    date: '2026',
    score: 'Workshop Completion',
    image: '/images/certificates/generative-ai-workshop.jpeg',
    type: 'image',
    badge: 'IIT Hyderabad',
    description:
      'Hands-on workshop on Large Language Models, prompt engineering, generative architectures, and practical AI application prototyping.',
  },
  {
    id: 'cambridge-pet',
    title: 'Cambridge English – Preliminary (PET)',
    issuer: 'Cambridge English Language Assessment',
    date: 'Certified',
    score: 'Level B1 (Entry 2) • Score 124',
    image: '/images/certificates/cambridge-english-pet.jpeg',
    type: 'image',
    badge: 'Cambridge CEFR',
    description:
      'International CEFR B1 qualification validating English proficiency across speaking, listening, reading, and structured writing.',
  },
];

/* ── Certificate Card ───────────────────────────────────────── */
function CertificateCard({ cert, index, onOpen }) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="group relative flex flex-col rounded-2xl border border-[#EDE7FF]/70 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image Preview Container */}
      <div
        className="relative overflow-hidden rounded-t-2xl bg-[#FCFBFF] p-3 cursor-pointer"
        onClick={() => !imageError && onOpen(cert)}
      >
        <div className="relative aspect-[4/3] w-full rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden border border-[#EDE7FF]/40">
          {!imageError && cert.image ? (
            <img
              src={cert.image}
              alt={`${cert.title} Certificate`}
              loading="lazy"
              onError={() => setImageError(true)}
              className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-4">
              <ImageOff className="w-8 h-8 text-[#707789]/50 mb-2" />
              <span className="text-xs text-[#707789] font-medium">
                Certificate image unavailable
              </span>
            </div>
          )}

          {/* Badge */}
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-[#9180D8]/95 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm backdrop-blur-sm">
            <Award className="w-3 h-3" />
            {cert.badge}
          </span>

          {/* Zoom Overlay on Hover */}
          {!imageError && cert.image && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#26324A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="p-2 rounded-full bg-white/90 shadow-md text-[#9180D8]">
                <ZoomIn className="w-5 h-5" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Certificate Details */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-[#26324A] leading-snug">
            {cert.title}
          </h3>
        </div>

        <p className="text-xs font-semibold text-[#9180D8]">
          {cert.issuer}
        </p>

        {cert.score && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
            <span>{cert.score} • {cert.date}</span>
          </div>
        )}

        <p className="mt-1 text-xs text-[#707789] leading-relaxed line-clamp-3">
          {cert.description}
        </p>

        {/* View Certificate Button */}
        {!imageError && cert.image ? (
          <button
            onClick={() => onOpen(cert)}
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-[#EDE7FF]/60 px-4 py-2 text-xs font-semibold text-[#9180D8] transition-colors duration-200 hover:bg-[#9180D8] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9180D8]/50 cursor-pointer"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            View Certificate
          </button>
        ) : (
          <span className="mt-3 text-center text-xs text-[#707789]/60 italic py-2">
            Certificate image unavailable
          </span>
        )}
      </div>
    </motion.div>
  );
}

/* ── Lightbox Modal ─────────────────────────────────────────── */
function LightboxModal({ cert, onClose }) {
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

  return (
    <motion.div
      key="lightbox-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#26324A]/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        key="lightbox-content"
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl overflow-hidden border border-[#EDE7FF]/60"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Close certificate preview"
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-[#26324A]/70 text-white hover:bg-[#26324A] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Image Frame */}
        <div className="bg-[#FCFBFF] p-4 sm:p-6 flex items-center justify-center max-h-[72vh] overflow-hidden">
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full max-h-[68vh] object-contain rounded-xl"
          />
        </div>

        {/* Info & Download Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 bg-white border-t border-[#EDE7FF]/60">
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-[#26324A] truncate">
              {cert.title}
            </h3>
            <p className="text-xs text-[#707789]">
              {cert.issuer} {cert.date ? `• ${cert.date}` : ''}
            </p>
          </div>

          <a
            href={cert.image}
            download
            className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-[#EDE7FF] px-4 py-2 text-xs font-semibold text-[#9180D8] transition-colors duration-200 hover:bg-[#9180D8] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9180D8]/50"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Certifications Component ───────────────────────────── */
export default function Certifications({ certifications = [] }) {
  const [activeCert, setActiveCert] = useState(null);

  // Filter out any internship or work-related documents that might come from older API payloads
  const filteredCerts = (certifications.length > 0 ? certifications : defaultCertifications).filter(
    (c) =>
      !c.id?.includes('internship') &&
      !c.title?.toLowerCase().includes('internship') &&
      !c.issuer?.toLowerCase().includes('rinex')
  );

  const certsToDisplay = filteredCerts.length > 0 ? filteredCerts : defaultCertifications;

  const handleOpen = useCallback((cert) => {
    setActiveCert(cert);
  }, []);

  const handleClose = useCallback(() => {
    setActiveCert(null);
  }, []);

  return (
    <section
      id="certifications"
      className="relative py-20 sm:py-28 bg-[#EDE7FF]/20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-14 text-center"
        >
          {/* Pill */}
          <span className="inline-flex items-center gap-2 rounded-full bg-[#EDE7FF] px-5 py-2 text-sm font-semibold text-[#9180D8] mb-5">
            <Award className="w-4 h-4" />
            Certifications &amp; Continuous Learning
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#26324A] leading-tight">
            Certificates &amp;{' '}
            <span className="bg-gradient-to-r from-[#9180D8] to-[#B8ACF6] bg-clip-text text-transparent">
              Workshops
            </span>
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-[#707789] leading-relaxed">
            Professional learning, technical certifications, and workshops that
            support my growth in technology.
          </p>
        </motion.div>

        {/* ── Card Grid (3-column on desktop, 2-column on tablet, 1-column on mobile) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {certsToDisplay.map((cert, idx) => (
            <CertificateCard
              key={cert.id || idx}
              cert={cert}
              index={idx}
              onOpen={handleOpen}
            />
          ))}
        </div>
      </div>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {activeCert && (
          <LightboxModal cert={activeCert} onClose={handleClose} />
        )}
      </AnimatePresence>
    </section>
  );
}
