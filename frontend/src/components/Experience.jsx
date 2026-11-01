import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle2,
  Building2,
  FileText,
  ZoomIn,
  Download,
  X,
  ExternalLink,
  Award
} from 'lucide-react';

const defaultExperience = [
  {
    id: 'rinex-internship',
    role: 'Web Development Intern',
    type: 'Internship',
    company: 'Rinex Technologies',
    location: 'Virtual / Remote',
    duration: 'May 2024 – June 2024',
    achievements: [
      'Built responsive, mobile-first web pages using semantic HTML5, modern CSS3, and JavaScript, improving cross-device compatibility.',
      'Developed reusable UI components to ensure layout consistency across multiple application views.',
      'Collaborated with the team via Git & GitHub for version control, code reviews, and streamlined workflow management.',
      'Applied responsive design techniques ensuring seamless viewing across mobile, tablet, and desktop screens.',
    ],
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript (ES6+)',
      'Git',
      'GitHub',
      'Responsive Design',
    ],
    documents: [
      {
        id: 'rinex-cert',
        title: 'Internship Completion Certificate',
        issuer: 'Rinex Technologies',
        duration: '05 May 2024 – 22 June 2024',
        certificateId: 'WD24-RNIO-5084',
        image: '/images/internships/rinex-internship-certificate.jpeg',
        badge: 'Official Completion'
      },
      {
        id: 'rinex-course',
        title: 'Web Development Course Certificate (Grade A+)',
        issuer: 'Rinex Organization / Skill India',
        duration: '05 May 2024',
        certificateId: 'WD24-RNCO-5084',
        image: '/images/internships/rinex-course-certificate.jpeg',
        badge: 'Grade A+ Distinction'
      }
    ]
  },
];

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

  return (
    <motion.div
      key="doc-lightbox-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#26324A]/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        key="doc-lightbox-content"
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
          aria-label="Close document preview"
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-[#26324A]/70 text-white hover:bg-[#26324A] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Document Image Frame */}
        <div className="bg-[#FCFBFF] p-4 sm:p-6 flex items-center justify-center max-h-[72vh] overflow-hidden">
          <img
            src={doc.image}
            alt={doc.title}
            className="w-full max-h-[68vh] object-contain rounded-xl"
          />
        </div>

        {/* Info & Download Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 bg-white border-t border-[#EDE7FF]/60">
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-[#26324A] truncate">
              {doc.title}
            </h3>
            <p className="text-xs text-[#707789]">
              {doc.issuer} {doc.duration ? `• ${doc.duration}` : ''} {doc.certificateId ? `• ID: ${doc.certificateId}` : ''}
            </p>
          </div>

          <a
            href={doc.image}
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

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Experience({ experience = [] }) {
  const [activeDoc, setActiveDoc] = useState(null);

  // Normalize incoming experience or fall back
  const items = experience.length > 0 ? experience : defaultExperience;

  const handleOpenDoc = useCallback((doc) => {
    setActiveDoc(doc);
  }, []);

  const handleCloseDoc = useCallback(() => {
    setActiveDoc(null);
  }, []);

  return (
    <section
      id="experience"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background:
          'linear-gradient(175deg, rgba(255,240,244,0.15) 0%, #FCFBFF 35%, #FCFBFF 65%, rgba(237,231,255,0.10) 100%)',
      }}
    >
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#FFF0F4]/30 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#EDE7FF]/20 rounded-full blur-3xl translate-y-1/3 translate-x-1/4 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 md:mb-18"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF0F4] text-[#9180D8] text-xs font-semibold tracking-wide uppercase mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            Professional Experience
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#26324A] mb-3">
            Work &amp; Internships
          </h2>
          <p className="text-[#707789] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Practical industry experience with verified internship documentation,
            engineering responsibilities, and skill applications.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="relative"
        >
          {items.map((exp, index) => {
            // Get documents for this internship (from backend or fallback)
            const docs = exp.documents || (exp.company?.includes('Rinex') ? defaultExperience[0].documents : []);

            return (
              <motion.div
                key={exp.id || index}
                variants={itemVariants}
                className="relative pl-8 md:pl-12"
              >
                {/* Timeline vertical line */}
                <div className="absolute left-3 md:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[#9180D8]/40 via-[#EDE7FF]/60 to-transparent" />

                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1.5 top-8 w-6 h-6 md:w-7 md:h-7 rounded-full bg-white border-[3px] border-[#9180D8] flex items-center justify-center z-10 shadow-sm shadow-[#9180D8]/15">
                  <div className="w-2 h-2 rounded-full bg-[#9180D8]" />
                </div>

                {/* Experience Card */}
                <div className="bg-white rounded-2xl border border-[#EDE7FF]/70 p-6 md:p-8 ml-2 md:ml-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                  {/* Header Row */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-[#26324A]">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Building2 className="w-4 h-4 text-[#9180D8]" />
                        <span className="text-[#9180D8] font-semibold text-base">
                          {exp.company}
                        </span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFF0F4] border border-[#FFF0F4]/80 text-[#9180D8] text-xs font-semibold uppercase tracking-wide">
                      <Briefcase className="w-3 h-3" />
                      {exp.type || 'Internship'}
                    </span>
                  </div>

                  {/* Date & Location pills */}
                  <div className="flex flex-wrap gap-2.5 my-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCFBFF] border border-[#EDE7FF]/60 text-[#707789] text-xs font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[#9180D8]" />
                      {exp.duration || exp.period || 'May 2024 – June 2024'}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCFBFF] border border-[#EDE7FF]/60 text-[#707789] text-xs font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#9180D8]" />
                      {exp.location || 'Virtual / Remote'}
                    </span>
                  </div>

                  {/* Responsibilities & Achievements */}
                  <div className="mb-6">
                    <h4 className="text-xs font-bold text-[#26324A] uppercase tracking-wider mb-3">
                      Key Deliverables &amp; Responsibilities
                    </h4>
                    <ul className="space-y-2.5">
                      {(exp.achievements || []).map((achievement, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="text-[#707789] text-xs sm:text-sm leading-relaxed">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technology Stack Tags */}
                  {exp.technologies && (
                    <div className="mb-6 pt-4 border-t border-[#EDE7FF]/50">
                      <h4 className="text-xs font-semibold text-[#707789] uppercase tracking-wider mb-2.5">
                        Technology Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#FCFBFF] border border-[#EDE7FF]/70 text-[#26324A] text-xs font-medium"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#9180D8]" />
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── Official Internship Documents Showcase ── */}
                  {docs && docs.length > 0 && (
                    <div className="pt-6 border-t border-[#EDE7FF]/60">
                      <div className="flex items-center gap-2 mb-4">
                        <FileText className="w-4 h-4 text-[#9180D8]" />
                        <h4 className="text-xs font-bold text-[#26324A] uppercase tracking-wider">
                          Verified Internship Documents
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {docs.map((doc) => (
                          <div
                            key={doc.id}
                            className="group/doc relative flex flex-col rounded-xl border border-[#EDE7FF] bg-[#FCFBFF] p-3 hover:border-[#9180D8]/40 transition-all duration-300 shadow-2xs hover:shadow-xs"
                          >
                            {/* Document Thumbnail */}
                            <div
                              className="relative aspect-[4/3] w-full rounded-lg bg-white overflow-hidden border border-[#EDE7FF]/60 flex items-center justify-center p-2 cursor-pointer"
                              onClick={() => handleOpenDoc(doc)}
                            >
                              <img
                                src={doc.image}
                                alt={doc.title}
                                loading="lazy"
                                className="w-full h-full object-contain transition-transform duration-300 group-hover/doc:scale-103"
                              />

                              {/* Badge */}
                              {doc.badge && (
                                <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-[#9180D8] px-2 py-0.5 text-[10px] font-semibold text-white shadow-xs">
                                  <Award className="w-2.5 h-2.5" />
                                  {doc.badge}
                                </span>
                              )}

                              {/* Hover Overlay */}
                              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#26324A]/10 opacity-0 group-hover/doc:opacity-100 transition-opacity duration-300">
                                <div className="p-1.5 rounded-full bg-white/90 shadow text-[#9180D8]">
                                  <ZoomIn className="w-4 h-4" />
                                </div>
                              </div>
                            </div>

                            {/* Info */}
                            <div className="mt-3 flex flex-1 flex-col justify-between">
                              <div>
                                <h5 className="text-xs font-bold text-[#26324A] leading-snug line-clamp-1">
                                  {doc.title}
                                </h5>
                                <p className="text-[11px] text-[#707789] mt-0.5">
                                  {doc.issuer}
                                </p>
                                {doc.certificateId && (
                                  <p className="text-[10px] font-mono text-[#9180D8] mt-0.5">
                                    ID: {doc.certificateId}
                                  </p>
                                )}
                              </div>

                              <button
                                onClick={() => handleOpenDoc(doc)}
                                className="mt-2.5 inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#EDE7FF]/70 px-3 py-1.5 text-xs font-semibold text-[#9180D8] transition-colors duration-200 hover:bg-[#9180D8] hover:text-white cursor-pointer"
                              >
                                <ZoomIn className="w-3.5 h-3.5" />
                                View Document
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Lightbox Modal for Internship Documents */}
      <AnimatePresence>
        {activeDoc && (
          <DocumentModal document={activeDoc} onClose={handleCloseDoc} />
        )}
      </AnimatePresence>
    </section>
  );
}
