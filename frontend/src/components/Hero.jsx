import { motion } from "framer-motion";
import { FileDown, ArrowRight, Mail, MapPin, GraduationCap, Code2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const slideIn = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero({ personal }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#FCFBFF]"
    >
      {/* ── background blobs ── */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-[#EDE7FF]/50 blur-[100px]" />
        <div className="absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-[#E5F2FF]/60 blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 h-[340px] w-[340px] rounded-full bg-[#FFF0F4]/40 blur-[90px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* ════════════════════ LEFT COLUMN ════════════════════ */}
          <motion.div
            className="lg:col-span-7"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* status pill */}
            <motion.div variants={slideIn} className="mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#EDE7FF]/60 bg-white/80 px-4 py-1.5 text-xs font-medium tracking-wide text-[#707789] shadow-sm backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Available for Opportunities&nbsp;•&nbsp;B.Tech IT 2027
              </span>
            </motion.div>

            {/* portfolio label */}
            <motion.p
              variants={slideIn}
              className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#9180D8]"
            >
              Portfolio
            </motion.p>

            {/* name */}
            <motion.h1 variants={slideIn} className="mb-4">
              <span className="block text-4xl font-extrabold leading-tight tracking-tight text-[#26324A] sm:text-5xl lg:text-6xl">
                VARIKUNTLA
              </span>
              <span className="block bg-gradient-to-r from-[#9180D8] to-[#5B8DEF] bg-clip-text text-4xl font-extrabold leading-tight tracking-tight text-transparent sm:text-5xl lg:text-6xl">
                NAGAMOUNIKA
              </span>
            </motion.h1>

            {/* headline */}
            <motion.p
              variants={slideIn}
              className="mb-4 max-w-xl text-lg font-medium text-[#26324A]/80 sm:text-xl"
            >
              {personal?.headline ||
                "B.Tech Information Technology Student & Aspiring Web Developer"}
            </motion.p>

            {/* summary */}
            <motion.p
              variants={slideIn}
              className="mb-6 max-w-xl text-sm leading-relaxed text-[#707789] sm:text-base"
            >
              B.Tech Information Technology student graduating in 2027 with
              hands-on web development experience through an internship and
              academic projects. Skilled in Python, Java, HTML, CSS, JavaScript,
              React.js, and MySQL with strong knowledge of OOP, DBMS, and REST
              APIs. Passionate about building responsive, real-time web
              applications, problem-solving, and clean software architecture.
            </motion.p>

            {/* info pills */}
            <motion.div
              variants={slideIn}
              className="mb-8 flex flex-wrap items-center gap-3"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EDE7FF]/40 px-3 py-1 text-xs font-medium text-[#26324A]">
                <MapPin className="h-3.5 w-3.5 text-[#9180D8]" />
                Ongole, Andhra Pradesh
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5F2FF]/50 px-3 py-1 text-xs font-medium text-[#26324A]">
                <GraduationCap className="h-3.5 w-3.5 text-[#5B8DEF]" />
                CGPA 7.92/10
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F8F0]/50 px-3 py-1 text-xs font-medium text-[#26324A]">
                <Code2 className="h-3.5 w-3.5 text-emerald-500" />
                React.js • Node • Express
              </span>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              variants={slideIn}
              className="mb-6 flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#9180D8] to-[#5B8DEF] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#9180D8]/20 transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                View Projects
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="/resume.pdf"
                download="VARIKUNTLA_NAGAMOUNIKA_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-xl border border-[#EDE7FF] bg-white px-6 py-2.5 text-sm font-semibold text-[#26324A] shadow-sm transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                <FileDown className="h-4 w-4 text-[#9180D8]" />
                Download Resume
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 text-sm font-semibold text-[#9180D8] transition-colors hover:text-[#7a6bc4]"
              >
                Contact
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>

            {/* social icons */}
            <motion.div
              variants={slideIn}
              className="flex items-center gap-3"
            >
              <a
                href={personal?.social?.github || "https://github.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#EDE7FF]/60 bg-white text-[#707789] shadow-sm transition-colors hover:bg-[#EDE7FF]/40 hover:text-[#26324A]"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href={
                  personal?.social?.linkedin ||
                  "https://linkedin.com"
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#EDE7FF]/60 bg-white text-[#707789] shadow-sm transition-colors hover:bg-[#E5F2FF]/40 hover:text-[#26324A]"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${personal?.email || "nagamounika624@gmail.com"}`}
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#EDE7FF]/60 bg-white text-[#707789] shadow-sm transition-colors hover:bg-[#FFF0F4]/40 hover:text-[#26324A]"
              >
                <Mail className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>

          {/* ════════════════════ RIGHT COLUMN ════════════════════ */}
          <motion.div
            className="flex justify-center lg:col-span-5"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <div className="relative">
              {/* gradient halo */}
              <div className="absolute -inset-6 z-0 rounded-[2rem] bg-gradient-to-br from-[#EDE7FF]/60 via-[#E5F2FF]/40 to-[#EDE7FF]/30 blur-2xl" />

              {/* white frame */}
              <div className="relative z-10 overflow-hidden rounded-3xl border border-[#EDE7FF]/60 bg-white p-2 shadow-lg shadow-[#EDE7FF]/30">
                <div className="group relative overflow-hidden rounded-2xl">
                  <img
                    src="/profile.png"
                    alt="VARIKUNTLA NAGAMOUNIKA"
                    className="h-80 w-64 object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] sm:h-[380px] sm:w-72 md:h-[420px] md:w-80"
                  />

                  {/* frosted bottom bar */}
                  <div className="absolute inset-x-0 bottom-0 bg-white/70 px-5 py-3 backdrop-blur-md">
                    <p className="text-sm font-bold tracking-wide text-[#26324A]">
                      VARIKUNTLA NAGAMOUNIKA
                    </p>
                    <p className="text-xs text-[#707789]">
                      B.Tech Information Technology
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
