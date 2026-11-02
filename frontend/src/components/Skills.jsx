import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Layout,
  Database,
  Wrench,
  Cpu,
  Sparkles,
  Terminal,
} from 'lucide-react';

const categories = [
  { key: 'all', label: 'All Skills', icon: Sparkles },
  { key: 'web', label: 'Web Development', icon: Layout },
  { key: 'languages', label: 'Languages & DB', icon: Database },
  { key: 'tools', label: 'Developer Tools', icon: Wrench },
  { key: 'core', label: 'Core Concepts', icon: Cpu },
];

const skillGroups = [
  {
    category: 'web',
    title: 'Web Development',
    icon: Layout,
    iconColor: 'text-[#9180D8]',
    bgLight: 'bg-[#EDE7FF]/40',
    skills: [
      { name: 'React.js', level: 'Advanced', tag: 'Frontend Library' },
      { name: 'JavaScript (ES6+)', level: 'Advanced', tag: 'Core Language' },
      { name: 'HTML5 & Semantic Markup', level: 'Expert', tag: 'Structure' },
      { name: 'CSS3 & Responsive Design', level: 'Advanced', tag: 'Styling' },
      { name: 'Tailwind CSS', level: 'Advanced', tag: 'Utility Styling' },
      { name: 'Node.js & Express.js', level: 'Intermediate', tag: 'REST APIs' },
      { name: 'Socket.IO', level: 'Intermediate', tag: 'Real-Time' },
    ],
  },
  {
    category: 'languages',
    title: 'Languages & Databases',
    icon: Database,
    iconColor: 'text-[#0284C7]',
    bgLight: 'bg-[#E5F2FF]/40',
    skills: [
      { name: 'Python', level: 'Intermediate', tag: 'Programming' },
      { name: 'Java (Basic)', level: 'Basic', tag: 'OOP Core' },
      { name: 'MySQL', level: 'Intermediate', tag: 'Relational DB' },
      { name: 'SQL Querying', level: 'Intermediate', tag: 'Data Manipulation' },
    ],
  },
  {
    category: 'tools',
    title: 'Developer Tools & Workflow',
    icon: Terminal,
    iconColor: 'text-[#0D9488]',
    bgLight: 'bg-[#E0F2F1]/40',
    skills: [
      { name: 'Git', level: 'Advanced', tag: 'Version Control' },
      { name: 'GitHub', level: 'Advanced', tag: 'Collaboration' },
      { name: 'Visual Studio Code', level: 'Expert', tag: 'IDE' },
      { name: 'Vite', level: 'Advanced', tag: 'Build Tool' },
      { name: 'Postman', level: 'Intermediate', tag: 'API Testing' },
    ],
  },
  {
    category: 'core',
    title: 'Core Computer Science Concepts',
    icon: Cpu,
    iconColor: 'text-[#D97706]',
    bgLight: 'bg-[#FEF3C7]/40',
    skills: [
      { name: 'Object-Oriented Programming (OOP)', level: 'Strong', tag: 'Design Principles' },
      { name: 'Database Management Systems (DBMS)', level: 'Strong', tag: 'Schema & Queries' },
      { name: 'RESTful API Integration', level: 'Strong', tag: 'Architecture' },
      { name: 'Responsive Web Architecture', level: 'Strong', tag: 'Mobile-First' },
      { name: 'Frontend Component Lifecycle', level: 'Strong', tag: 'State Management' },
    ],
  },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');

  const visibleGroups =
    activeTab === 'all'
      ? skillGroups
      : skillGroups.filter((g) => g.category === activeTab);

  return (
    <section id="skills" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCFBFF] border border-[#EDE7FF] shadow-xs mb-3">
            <Code2 className="w-4 h-4 text-[#9180D8]" />
            <span className="text-xs font-semibold tracking-wider uppercase text-[#9180D8]">
              Technical Proficiencies
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">
            Technical Skills
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed">
            Verified software engineering capabilities, development tools, and foundational concepts.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveTab(cat.key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0F172A] text-white shadow-md'
                    : 'bg-[#FAF9F6] text-[#64748B] border border-[#EDE7FF] hover:bg-[#EDE7FF]/30 hover:text-[#0F172A]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#9180D8]'}`} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Skill Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {visibleGroups.map((group) => {
              const Icon = group.icon;
              return (
                <motion.div
                  key={group.category}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 sm:p-8 rounded-3xl bg-[#FAF9F6] border border-[#EDE7FF] shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-10 h-10 rounded-xl ${group.bgLight} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${group.iconColor}`} />
                      </div>
                      <h3 className="text-lg font-bold text-[#0F172A]">
                        {group.title}
                      </h3>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {group.skills.map((s, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-2xl bg-white border border-[#EDE7FF]/80 flex items-center justify-between shadow-xs hover:border-[#9180D8]/40 transition-colors"
                        >
                          <div className="min-w-0 pr-2">
                            <p className="text-xs sm:text-sm font-bold text-[#0F172A] truncate">
                              {s.name}
                            </p>
                            <p className="text-[10px] text-[#64748B] font-medium">
                              {s.tag}
                            </p>
                          </div>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EDE7FF]/40 text-[#9180D8] shrink-0">
                            {s.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
