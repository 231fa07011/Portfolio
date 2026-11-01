import { motion } from 'framer-motion';
import {
  GraduationCap,
  MapPin,
  Calendar,
  CheckCircle2,
  BookOpen,
  School,
} from 'lucide-react';

const defaultEducation = [
  {
    degree: 'B.Tech in Information Technology',
    institution: "Vignan's Foundation for Science, Technology & Research",
    location: 'Guntur, AP',
    duration: 'July 2023 – May 2027',
    cgpa: '7.92 / 10',
    status: 'Currently Pursuing (3rd Year)',
    highlights: [
      'Strong foundation in Data Structures & Algorithms',
      'Completed Software Testing certification via NPTEL',
      'Deep Learning coursework from IIT Ropar',
      'Hands-on projects in full-stack web development',
      'Active participation in technical events & hackathons',
    ],
  },
];

const keyCourses = [
  { name: 'OOP (Java & Python)', color: '#EDE7FF' },
  { name: 'DBMS (MySQL)', color: '#E5F2FF' },
  { name: 'Frontend Engineering (React.js)', color: '#FFF0F4' },
  { name: 'RESTful APIs (Node/Express)', color: '#E8F8F0' },
  { name: 'Software Testing (NPTEL)', color: '#FFF1E5' },
  { name: 'Deep Learning (IIT Ropar)', color: '#EDE7FF' },
  { name: 'Computer Networks', color: '#E5F2FF' },
  { name: 'DSA', color: '#E8F8F0' },
];

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

const cardHover = {
  rest: { y: 0, boxShadow: '0 1px 3px rgba(145,128,216,0.06)' },
  hover: {
    y: -4,
    boxShadow: '0 8px 30px rgba(145,128,216,0.10)',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export default function Education({ education = defaultEducation }) {
  const edu = education.length > 0 ? education : defaultEducation;
  const item = edu[0];

  return (
    <section
      id="education"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background:
          'linear-gradient(175deg, rgba(229,242,255,0.20) 0%, #FCFBFF 40%, #FCFBFF 60%, rgba(237,231,255,0.12) 100%)',
      }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#E5F2FF]/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#EDE7FF]/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14 md:mb-18"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E5F2FF] text-[#9180D8] text-xs font-semibold tracking-wide uppercase mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            Academic Qualifications
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#26324A] mb-3">
            Formal Education
          </h2>
          <p className="text-[#707789] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Building a solid academic foundation in Information Technology with
            hands-on project experience.
          </p>
        </motion.div>

        {/* Two-column grid */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7"
        >
          {/* Left: University Degree Card */}
          <motion.div variants={itemVariants} className="lg:col-span-7">
            <motion.div
              variants={cardHover}
              initial="rest"
              whileHover="hover"
              className="h-full bg-white rounded-2xl border border-[#E5F2FF]/60 p-6 md:p-8"
            >
              {/* Card header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#E5F2FF] flex items-center justify-center">
                  <School className="w-6 h-6 text-[#9180D8]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-[#9180D8] uppercase tracking-wide">
                      Bachelor of Technology
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFF1E5] text-[#26324A] text-[11px] font-medium">
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F8F0] text-[#26324A] text-sm font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      CGPA: {item.cgpa}
                    </span>
                  </div>
                </div>
              </div>

              {/* Degree and institution */}
              <div className="mb-5">
                <h3 className="text-xl md:text-2xl font-bold text-[#26324A] mb-1.5">
                  {item.degree}
                </h3>
                <p className="text-[#9180D8] font-medium text-sm md:text-base">
                  {item.institution}
                </p>
              </div>

              {/* Location & Duration pills */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FCFBFF] border border-[#E5F2FF]/60 text-[#707789] text-xs font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#9180D8]" />
                  {item.location}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FCFBFF] border border-[#E5F2FF]/60 text-[#707789] text-xs font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#9180D8]" />
                  {item.duration}
                </span>
              </div>

              {/* Curriculum highlights */}
              <div>
                <h4 className="text-sm font-semibold text-[#26324A] uppercase tracking-wide mb-3">
                  Curriculum Highlights
                </h4>
                <ul className="space-y-2.5">
                  {item.highlights.map((highlight, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.3 + idx * 0.08,
                        duration: 0.4,
                        ease: 'easeOut',
                      }}
                      className="flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-[#707789] text-sm leading-relaxed">
                        {highlight}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Key Coursework Card */}
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <motion.div
              variants={cardHover}
              initial="rest"
              whileHover="hover"
              className="h-full bg-white rounded-2xl border border-[#E5F2FF]/60 p-6 md:p-8"
            >
              {/* Card header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#EDE7FF] flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-[#9180D8]" />
                </div>
                <h3 className="text-lg font-bold text-[#26324A]">
                  Key Coursework
                </h3>
              </div>

              {/* 2-column grid of courses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {keyCourses.map((course, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.2 + idx * 0.06,
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group relative flex items-center gap-2.5 px-3.5 py-3 rounded-xl border border-[#EDE7FF]/40 bg-[#FCFBFF] hover:border-[#9180D8]/30 transition-colors duration-200"
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: course.color }}
                    />
                    <span className="text-[#26324A] text-xs sm:text-sm font-medium leading-snug">
                      {course.name}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Footer note */}
              <div className="mt-6 pt-5 border-t border-[#EDE7FF]/40">
                <div className="flex items-start gap-2.5">
                  <GraduationCap className="w-4 h-4 text-[#9180D8] mt-0.5 flex-shrink-0" />
                  <p className="text-[#707789] text-xs leading-relaxed">
                    Coursework combines university curriculum with self-paced
                    certifications from platforms like NPTEL and SWAYAM to
                    strengthen both theoretical and practical skills.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
