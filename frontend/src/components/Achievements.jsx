import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Users, Flame } from 'lucide-react';

const fallbackAchievements = [
  {
    icon: Medal,
    title: "NCC B Certificate – Grade 'A'",
    subtitle: 'National Cadet Corps',
    year: '2024',
    description:
      'Earned the prestigious NCC B Certificate with Grade A, demonstrating exemplary discipline, leadership, and dedication through rigorous training camps, drills, and community service activities.',
    bg: 'bg-[#FFF1E5]/30',
    iconBg: 'bg-[#FFF1E5]',
    iconColor: 'text-orange-500',
    borderColor: 'border-[#FFF1E5]/60',
  },
  {
    icon: Users,
    title: 'PR & Digital Media Coordinator',
    subtitle: 'Vignan Mahotsav 2025',
    year: '2025',
    description:
      'Led the public relations and digital media strategy for the flagship university fest, managing social media campaigns, press releases, and digital outreach that significantly boosted event visibility.',
    bg: 'bg-[#EDE7FF]/30',
    iconBg: 'bg-[#EDE7FF]',
    iconColor: 'text-[#9180D8]',
    borderColor: 'border-[#EDE7FF]/60',
  },
  {
    icon: Flame,
    title: 'ML Neurothon 2026 Participant',
    subtitle: 'Machine Learning Competition',
    year: '2026',
    description:
      'Participated in the ML Neurothon 2026, tackling real-world machine learning challenges through intensive problem-solving sessions, model building, and collaborative data-driven innovation.',
    bg: 'bg-[#E5F2FF]/30',
    iconBg: 'bg-[#E5F2FF]',
    iconColor: 'text-blue-500',
    borderColor: 'border-[#E5F2FF]/60',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function Achievements({ achievements = [] }) {
  const items = achievements.length > 0 ? achievements : fallbackAchievements;

  return (
    <section id="achievements" className="py-20 md:py-28 bg-[#FCFBFF]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF1E5]/50 border border-[#FFF1E5]/70 mb-4">
            <Trophy className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-600">
              Recognition
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#26324A] mb-3">
            Achievements & Activities
          </h2>
          <p className="text-[#707789] max-w-xl mx-auto">
            Milestones that reflect leadership, commitment, and continuous
            learning beyond the classroom.
          </p>
        </motion.div>

        {/* Achievement Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((item, idx) => {
            const IconComp = item.icon || Trophy;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className={`group relative bg-white rounded-2xl border ${
                  item.borderColor || 'border-[#EDE7FF]/60'
                } shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden`}
              >
                {/* Subtle background tint */}
                <div
                  className={`absolute inset-0 ${
                    item.bg || 'bg-[#EDE7FF]/30'
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div className="relative p-6 md:p-7">
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${
                      item.iconBg || 'bg-[#EDE7FF]'
                    } mb-5`}
                  >
                    <IconComp
                      className={`w-6 h-6 ${
                        item.iconColor || 'text-[#9180D8]'
                      }`}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#26324A] mb-2 leading-snug">
                    {item.title}
                  </h3>

                  {/* Subtitle Badge */}
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-[#9180D8]/8 text-[#9180D8] border border-[#9180D8]/15 mb-4">
                    {item.subtitle}
                  </span>

                  {/* Description */}
                  <p className="text-sm text-[#707789] leading-relaxed mb-5">
                    {item.description}
                  </p>

                  {/* Year Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#EDE7FF]/30">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#9180D8]" />
                      <span className="text-xs font-semibold text-[#9180D8]">
                        {item.year}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#707789]">
                      <Trophy className="w-3 h-3" />
                      <span>Achievement</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
