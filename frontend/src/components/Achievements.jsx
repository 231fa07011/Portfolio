import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Users, Flame, Award, CheckCircle2 } from 'lucide-react';
import { fallbackPortfolioData } from '../data/fallbackPortfolio';

const defaultAchievements = fallbackPortfolioData.achievements;

const achievementVisuals = {
  'ncc-b-cert': {
    icon: Medal,
    badgeBg: 'bg-[#FEF3C7] dark:bg-amber-950/60',
    iconColor: 'text-amber-700 dark:text-amber-400',
    borderColor: 'border-[#FEF3C7]',
    tag: 'National Recognition',
  },
  'pr-coordinator': {
    icon: Users,
    badgeBg: 'bg-[#EDE7FF] dark:bg-purple-950/60',
    iconColor: 'text-[#9180D8] dark:text-[#C4B5FD]',
    borderColor: 'border-[#EDE7FF]',
    tag: 'Campus Leadership',
  },
  'ml-neurothon': {
    icon: Flame,
    badgeBg: 'bg-[#E5F2FF] dark:bg-sky-950/60',
    iconColor: 'text-[#0284C7] dark:text-[#38BDF8]',
    borderColor: 'border-[#E5F2FF]',
    tag: 'Technical Hackathon',
  },
};

export default function Achievements({ achievements = [] }) {
  const items = achievements && achievements.length > 0 ? achievements : defaultAchievements;

  return (
    <section id="achievements" className="py-20 md:py-28 bg-[#FAF9F6] dark:bg-[#0E1524] relative transition-colors duration-300">
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
            <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-700 dark:text-amber-400">
              Honors & Leadership
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight mb-4">
            Key Achievements
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] dark:text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            Distinctions in leadership, university media coordination, and competitive problem solving.
          </p>
        </motion.div>

        {/* Achievement Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, idx) => {
            const visual = achievementVisuals[item.id] || {
              icon: Award,
              badgeBg: 'bg-[#EDE7FF] dark:bg-purple-950/60',
              iconColor: 'text-[#9180D8] dark:text-[#C4B5FD]',
              borderColor: 'border-[#EDE7FF]',
              tag: 'Achievement',
            };
            const Icon = visual.icon;

            return (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border ${visual.borderColor} dark:border-slate-800 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <div className={`w-12 h-12 rounded-2xl ${visual.badgeBg} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${visual.iconColor}`} />
                    </div>
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#FAF9F6] dark:bg-slate-800 text-[#475569] dark:text-[#CBD5E1] border border-[#EDE7FF] dark:border-slate-700">
                      {item.year}
                    </span>
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-[#9180D8] dark:text-[#C4B5FD] mb-1.5 block">
                    {item.subtitle}
                  </span>

                  <h3 className="text-xl font-extrabold text-[#0F172A] dark:text-[#F8FAFC] mb-3 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#EDE7FF] dark:border-slate-800 flex items-center gap-1.5 text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                  <CheckCircle2 className="w-4 h-4 text-[#9180D8] dark:text-[#C4B5FD]" />
                  <span>{visual.tag}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
