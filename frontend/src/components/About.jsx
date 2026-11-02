import React from 'react';
import { motion } from 'framer-motion';
import { User, Code2, Radio, Layers, Award } from 'lucide-react';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const slideIn = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const stats = [
  { label: 'Academic CGPA', value: '7.92 / 10', detail: "Vignan's Foundation" },
  { label: 'Expected Graduation', value: 'May 2027', detail: 'B.Tech IT (4th Year)' },
  { label: 'Verified Certifications', value: '5 Certs', detail: 'NPTEL, IIT Ropar & Cambridge' },
  { label: 'Leadership Credential', value: 'Grade A', detail: 'NCC B Certificate' },
];

const capabilities = [
  {
    icon: Code2,
    title: 'Frontend & UI Engineering',
    desc: 'Crafting responsive, accessible web interfaces with React.js, Tailwind CSS, semantic HTML5, and modern component lifecycles.',
    badgeBg: 'bg-[#EDE7FF] dark:bg-purple-950/60',
    iconColor: 'text-[#9180D8] dark:text-[#C4B5FD]',
    borderColor: 'border-[#EDE7FF]',
  },
  {
    icon: Radio,
    title: 'REST APIs & Real-Time Web',
    desc: 'Engineering event-driven features with Socket.IO and architecting modular RESTful endpoints in Node.js and Express.',
    badgeBg: 'bg-[#E5F2FF] dark:bg-sky-950/60',
    iconColor: 'text-[#0284C7] dark:text-[#38BDF8]',
    borderColor: 'border-[#E5F2FF]',
  },
  {
    icon: Layers,
    title: 'Clean Architecture & Databases',
    desc: 'Writing structured, maintainable code with strong OOP fundamentals, relational database design with MySQL, and decoupled architectures.',
    badgeBg: 'bg-[#E0F2F1] dark:bg-teal-950/60',
    iconColor: 'text-[#0D9488] dark:text-[#2DD4BF]',
    borderColor: 'border-[#E0F2F1]',
  },
  {
    icon: Award,
    title: 'Leadership & Collaborative Drive',
    desc: 'Demonstrated team discipline, communication, and event execution through NCC leadership and university cultural fest coordination.',
    badgeBg: 'bg-[#FFF0F4] dark:bg-rose-950/60',
    iconColor: 'text-[#E11D48] dark:text-[#FB7185]',
    borderColor: 'border-[#FFF0F4]',
  },
];

export default function About() {
  return (
    <section id="about" className="relative bg-white dark:bg-[#0E1524] py-20 sm:py-28 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.div variants={slideIn} className="inline-block mb-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#EDE7FF] dark:border-slate-800 bg-[#FCFBFF] dark:bg-slate-900 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#9180D8] dark:text-[#C4B5FD] shadow-xs">
              <User className="h-3.5 w-3.5" />
              Developer Profile
            </span>
          </motion.div>

          <motion.h2
            variants={slideIn}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight mb-4"
          >
            About Me
          </motion.h2>

          <motion.p
            variants={slideIn}
            className="text-base sm:text-lg text-[#64748B] dark:text-[#94A3B8] max-w-2xl mx-auto leading-relaxed"
          >
            A dedicated Information Technology student with a strong passion for
            problem solving, modern web technologies, and scalable software systems.
          </motion.p>
        </motion.div>

        {/* Narrative & Stats Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <motion.div
            className="lg:col-span-7 space-y-4 text-base text-[#475569] dark:text-[#CBD5E1] leading-relaxed"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p>
              I am currently pursuing my <strong>B.Tech in Information Technology</strong> (4th Year) at{' '}
              <strong className="text-[#0F172A] dark:text-white">
                Vignan's Foundation for Science, Technology & Research, Guntur
              </strong>{' '}
              (CGPA 7.92/10, class of 2027). My technical journey is anchored in computer science
              foundations, algorithms, relational database management, and full-stack web engineering.
            </p>
            <p>
              During my web development internship at <strong className="text-[#0F172A] dark:text-white">Rinex Technologies</strong>,
              I built reusable frontend components, implemented responsive designs for mobile and desktop screens,
              and collaborated effectively through Git version control.
            </p>
            <p>
              Beyond the classroom, I have earned rigorous NPTEL certifications in Software Testing and Deep Learning
              (IIT Ropar, Elite), demonstrated teamwork as a Digital Media Coordinator for Vignan Mahotsav 2025,
              and developed discipline through NCC training where I achieved Grade A in the NCC B Certificate.
            </p>
          </motion.div>

          {/* Key Stat Cards */}
          <motion.div
            className="lg:col-span-5 grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {stats.map((s, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#FCFBFF] dark:bg-slate-900 border border-[#EDE7FF] dark:border-slate-800 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
                    {s.value}
                  </p>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#9180D8] dark:text-[#C4B5FD] mt-1">
                    {s.label}
                  </p>
                </div>
                <p className="text-[11px] text-[#64748B] dark:text-[#94A3B8] mt-3 font-medium">
                  {s.detail}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 4 Core Competency Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((c, idx) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-6 rounded-3xl bg-[#FAF9F6] dark:bg-slate-900 border ${c.borderColor} dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${c.badgeBg} flex items-center justify-center mb-5`}>
                    <Icon className={`w-6 h-6 ${c.iconColor}`} />
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A] dark:text-[#F8FAFC] mb-2 leading-snug">
                    {c.title}
                  </h3>
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
