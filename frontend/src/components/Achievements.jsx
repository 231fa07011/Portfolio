import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Users, Flame, Award, CheckCircle2 } from 'lucide-react';
import { fallbackPortfolioData } from '../data/fallbackPortfolio';

const defaultAchievements = fallbackPortfolioData.achievements;

const achievementVisuals = {
  'ncc-b-cert': {
    icon: Medal,
    badgeBg: 'bg-[#FEF3C7]',
    iconColor: 'text-amber-700',
    borderColor: 'border-[#FEF3C7]',
    tag: 'National Recognition',
  },
  'pr-coordinator': {
    icon: Users,
    badgeBg: 'bg-[#EDE7FF]',
    iconColor: 'text-[#9180D8]',
    borderColor: 'border-[#EDE7FF]',
    tag: 'Campus Leadership',
  },
  'ml-neurothon': {
    icon: Flame,
    badgeBg: 'bg-[#E5F2FF]',
    iconColor: 'text-[#0284C7]',
    borderColor: 'border-[#E5F2FF]',
    tag: 'Technical Hackathon',
  },
};

export default function Achievements({ achievements = [] }) {
  const items = achievements && achievements.length > 0 ? achievements : defaultAchievements;

  return (
    <section id="achievements" className="py-20 md:py-28 bg-[#FAF9F6] relative">
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
            <Trophy className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-700">
              Honors & Leadership
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">
            Key Achievements
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed">
            Distinctions in leadership, university media coordination, and competitive problem solving.
          </p>
        </motion.div>

        {/* Achievement Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, idx) => {
            const visual = achievementVisuals[item.id] || {
              icon: Award,
              badgeBg: 'bg-[#EDE7FF]',
              iconColor: 'text-[#9180D8]',
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
                className={`p-6 sm:p-8 rounded-3xl bg-white border ${visual.borderColor} shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <div className={`w-12 h-12 rounded-2xl ${visual.badgeBg} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${visual.iconColor}`} />
                    </div>
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#FAF9F6] text-[#475569] border border-[#EDE7FF]">
                      {item.year}
                    </span>
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-[#9180D8] mb-1.5 block">
                    {item.subtitle}
                  </span>

                  <h3 className="text-xl font-extrabold text-[#0F172A] mb-3 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#EDE7FF] flex items-center gap-1.5 text-xs font-semibold text-[#0F172A]">
                  <CheckCircle2 className="w-4 h-4 text-[#9180D8]" />
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
