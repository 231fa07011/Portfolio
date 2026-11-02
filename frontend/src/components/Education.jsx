import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Calendar,
  CheckCircle2,
  BookOpen,
  Award,
} from 'lucide-react';
import { fallbackPortfolioData } from '../data/fallbackPortfolio';

const defaultEdu = fallbackPortfolioData.education[0];

const keyCourses = [
  { name: 'OOP (Java & Python)', tag: 'Core CS' },
  { name: 'DBMS (MySQL)', tag: 'Databases' },
  { name: 'Frontend Engineering (React.js)', tag: 'Web' },
  { name: 'RESTful API Engineering (Node/Express)', tag: 'Backend' },
  { name: 'Software Testing (NPTEL)', tag: 'QA' },
  { name: 'Deep Learning (IIT Ropar)', tag: 'AI/ML' },
  { name: 'Computer Networks', tag: 'Systems' },
  { name: 'Data Structures & Algorithms', tag: 'Fundamentals' },
];

export default function Education({ education = [] }) {
  const item = education && education.length > 0 ? education[0] : defaultEdu;

  return (
    <section id="education" className="py-20 md:py-28 bg-[#FAF9F6] dark:bg-[#0B0F19] relative overflow-hidden transition-colors duration-300">
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
            <GraduationCap className="w-4 h-4 text-[#0284C7] dark:text-[#38BDF8]" />
            <span className="text-xs font-semibold tracking-wider uppercase text-[#0284C7] dark:text-[#38BDF8]">
              Academic Background
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight mb-4">
            Education
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] dark:text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            Formal undergraduate engineering curriculum and foundational coursework in Information Technology.
          </p>
        </motion.div>

        {/* Education Timeline Card */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-[#EDE7FF] dark:border-slate-800 p-6 sm:p-10 shadow-xs hover:shadow-md transition-shadow relative"
          >
            {/* Top Bar with Status & CGPA */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-[#EDE7FF] dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#E5F2FF] dark:bg-sky-950/60 flex items-center justify-center text-[#0284C7] dark:text-[#38BDF8]">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC]">
                    {item.degree}
                  </h3>
                  <p className="text-sm font-semibold text-[#0284C7] dark:text-[#38BDF8]">
                    {item.institution}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#E8F8F0] dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                  <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  CGPA {item.cgpa}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#FAF9F6] dark:bg-slate-800 text-[#475569] dark:text-[#CBD5E1] border border-[#EDE7FF] dark:border-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-[#9180D8] dark:text-[#C4B5FD]" />
                  {item.duration}
                </span>
              </div>
            </div>

            {/* Academic Highlights */}
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] dark:text-[#F8FAFC] mb-4">
                Curriculum Highlights & Specialization
              </h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {(item.highlights || defaultEdu.highlights).map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8]">
                    <CheckCircle2 className="w-4 h-4 text-[#9180D8] dark:text-[#C4B5FD] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Relevant Coursework Badges */}
            <div className="pt-6 border-t border-[#EDE7FF] dark:border-slate-800">
              <div className="flex items-center gap-2 mb-3.5">
                <BookOpen className="w-4 h-4 text-[#9180D8] dark:text-[#C4B5FD]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] dark:text-[#F8FAFC]">
                  Verified Academic Coursework
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {keyCourses.map((c, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium bg-[#FCFBFF] dark:bg-slate-800 text-[#0F172A] dark:text-[#E2E8F0] border border-[#EDE7FF] dark:border-slate-700"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9180D8] dark:bg-[#C4B5FD]" />
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
