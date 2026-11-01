import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Layout,
  Database,
  Wrench,
  Cpu,
  HeartHandshake,
  Sparkles,
  Check,
  Terminal,
  Zap,
} from 'lucide-react';

const categories = [
  { key: 'all', label: 'All Capabilities', icon: Sparkles },
  { key: 'web', label: 'Web Development', icon: Layout },
  { key: 'languages', label: 'Languages & DB', icon: Database },
  { key: 'tools', label: 'Developer Tools', icon: Wrench },
  { key: 'core', label: 'Core Concepts', icon: Cpu },
];

const skillData = {
  web: {
    title: 'Web Development',
    icon: Layout,
    iconBg: '#EDE7FF',
    iconColor: '#9180D8',
    dotColor: '#9180D8',
    skills: [
      'HTML5',
      'CSS3 / Tailwind',
      'React.js',
      'Node.js',
      'Express.js',
      'REST APIs',
      'Socket.IO',
    ],
  },
  languages: {
    title: 'Languages & Databases',
    icon: Database,
    iconBg: '#E5F2FF',
    iconColor: '#5B9BD5',
    dotColor: '#5B9BD5',
    skills: ['Python', 'Java', 'JavaScript (ES6+)', 'MySQL'],
  },
  tools: {
    title: 'Developer Tools',
    icon: Terminal,
    iconBg: '#E8F8F0',
    iconColor: '#4DAA7D',
    dotColor: '#4DAA7D',
    skills: ['Git', 'GitHub', 'VS Code', 'Vite', 'Postman'],
  },
  core: {
    title: 'Core Concepts',
    icon: Cpu,
    iconBg: '#FFF1E5',
    iconColor: '#D4915E',
    dotColor: '#D4915E',
    skills: [
      'OOP',
      'DBMS',
      'REST Architecture',
      'Component Lifecycle',
      'Responsive Design',
    ],
    useCheck: true,
  },
  soft: {
    title: 'Soft Skills',
    icon: HeartHandshake,
    iconBg: '#FFF0F4',
    iconColor: '#D88BA0',
    dotColor: '#D88BA0',
    skills: [
      'Technical Communication',
      'Problem Solving',
      'Teamwork',
      'Time Management',
      'Event Coordination',
    ],
  },
};

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    x: 40,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.04,
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const cardHover = {
  rest: { y: 0, boxShadow: '0 1px 3px rgba(145,128,216,0.06)' },
  hover: {
    y: -4,
    boxShadow: '0 8px 30px rgba(145,128,216,0.10)',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

function getVisibleCategories(activeTab) {
  if (activeTab === 'all') {
    return ['web', 'languages', 'tools', 'core', 'soft'];
  }
  return [activeTab];
}

export default function Skills({ skills = {} }) {
  const [activeTab, setActiveTab] = useState('all');

  const visibleKeys = getVisibleCategories(activeTab);

  return (
    <section id="skills" className="relative py-20 md:py-28 bg-[#FCFBFF] overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-0 w-80 h-80 bg-[#EDE7FF]/20 rounded-full blur-3xl -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-64 h-64 bg-[#E5F2FF]/25 rounded-full blur-3xl translate-x-1/3 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EDE7FF] text-[#9180D8] text-xs font-semibold tracking-wide uppercase mb-4">
            <Zap className="w-3.5 h-3.5" />
            Technical Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#26324A] mb-3">
            Skills & Competencies
          </h2>
          <p className="text-[#707789] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            A curated set of technologies, tools, and concepts I work with to
            build modern web applications.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="flex flex-wrap justify-center gap-2 mb-10 md:mb-14"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-250 cursor-pointer
                  ${
                    isActive
                      ? 'bg-[#9180D8] text-white shadow-md shadow-[#9180D8]/20'
                      : 'bg-white text-[#707789] border border-[#EDE7FF]/60 hover:border-[#9180D8]/40 hover:text-[#26324A]'
                  }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`grid gap-6 ${
              visibleKeys.length === 1
                ? 'grid-cols-1 max-w-2xl mx-auto'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {visibleKeys.map((key) => {
              const data = skillData[key];
              if (!data) return null;
              const Icon = data.icon;
              return (
                <motion.div
                  key={key}
                  variants={cardVariants}
                  layout
                  className={
                    visibleKeys.length === 5 && key === 'soft'
                      ? 'md:col-span-2 lg:col-span-1'
                      : ''
                  }
                >
                  <motion.div
                    variants={cardHover}
                    initial="rest"
                    whileHover="hover"
                    className="h-full bg-white rounded-2xl border border-[#EDE7FF]/60 p-6"
                  >
                    {/* Card Header */}
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: data.iconBg }}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: data.iconColor }}
                        />
                      </div>
                      <h3 className="text-base font-bold text-[#26324A]">
                        {data.title}
                      </h3>
                    </div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-2">
                      {data.skills.map((skill, idx) => (
                        <motion.span
                          key={skill}
                          custom={idx}
                          variants={tagVariants}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FCFBFF] border border-[#EDE7FF]/60 text-[#26324A] text-xs sm:text-sm font-medium hover:border-[#9180D8]/30 transition-colors duration-200"
                        >
                          {data.useCheck ? (
                            <Check
                              className="w-3 h-3 flex-shrink-0"
                              style={{ color: data.dotColor }}
                            />
                          ) : (
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ backgroundColor: data.dotColor }}
                            />
                          )}
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
