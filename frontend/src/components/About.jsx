import { motion } from "framer-motion";
import { User, Code2, Layers, Radio, Award, ArrowRight } from "lucide-react";

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

const stats = [
  { label: "CGPA", value: "7.92" },
  { label: "Graduation", value: "2027" },
  { label: "Certifications", value: "5+" },
  { label: "NCC Award", value: "Grade A" },
];

const capabilities = [
  {
    icon: Code2,
    title: "Frontend & UI Engineering",
    desc: "Crafting responsive, accessible interfaces with React.js, Tailwind CSS, and modern component architectures.",
    color: "#EDE7FF",
    iconColor: "#9180D8",
  },
  {
    icon: Radio,
    title: "Real-Time & RESTful APIs",
    desc: "Building live, event-driven features with Socket.IO and well-structured REST endpoints using Node & Express.",
    color: "#E5F2FF",
    iconColor: "#5B8DEF",
  },
  {
    icon: Layers,
    title: "Clean Decoupled Systems",
    desc: "Designing maintainable, scalable applications with clear separation of concerns and modular codebases.",
    color: "#E8F8F0",
    iconColor: "#34C77B",
  },
  {
    icon: Award,
    title: "Leadership & Team Execution",
    desc: "NCC Grade-A certified with proven ability to collaborate, communicate, and deliver under structured timelines.",
    color: "#FFF0F4",
    iconColor: "#E06B8A",
  },
];

export default function About({ personal = {} }) {
  return (
    <section id="about" className="relative bg-[#FCFBFF] py-20 sm:py-28">
      {/* ── section header ── */}
      <div className="mx-auto mb-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <motion.span
            variants={slideIn}
            className="mb-3 inline-block rounded-full border border-[#EDE7FF]/60 bg-white px-4 py-1 text-xs font-medium tracking-wide text-[#9180D8] shadow-sm"
          >
            <User className="mr-1.5 inline-block h-3.5 w-3.5 -translate-y-px" />
            Developer Profile
          </motion.span>

          <motion.h2
            variants={slideIn}
            className="mb-3 text-3xl font-extrabold tracking-tight text-[#26324A] sm:text-4xl"
          >
            About{" "}
            <span className="bg-gradient-to-r from-[#9180D8] to-[#5B8DEF] bg-clip-text text-transparent">
              Me
            </span>
          </motion.h2>

          <motion.p
            variants={slideIn}
            className="mx-auto max-w-2xl text-sm text-[#707789] sm:text-base"
          >
            A snapshot of who I am, what I build, and the values I bring to
            every project.
          </motion.p>
        </motion.div>
      </div>

      {/* ── main grid ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* ════════════ LEFT — narrative card ════════════ */}
          <motion.div
            className="lg:col-span-7"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              variants={slideIn}
              className="rounded-3xl border border-[#EDE7FF]/60 bg-white p-6 shadow-sm sm:p-8"
            >
              {/* avatar + name */}
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#9180D8] text-lg font-bold tracking-wide text-white shadow-md shadow-[#9180D8]/20">
                  VN
                </div>
                <div>
                  <h3 className="text-base font-bold tracking-wide text-[#26324A] sm:text-lg">
                    VARIKUNTLA NAGAMOUNIKA
                  </h3>
                  <p className="text-xs text-[#707789] sm:text-sm">
                    Information Technology Undergrad • Web Developer
                  </p>
                </div>
              </div>

              {/* summary callout */}
              <div className="mb-6 rounded-2xl bg-[#EDE7FF]/30 px-5 py-4">
                <p className="text-sm leading-relaxed text-[#707789]">
                  B.Tech Information Technology student graduating in 2027 with
                  hands-on web development experience through an internship and
                  academic projects. Skilled in Python, Java, HTML, CSS,
                  JavaScript, React.js, and MySQL with strong knowledge of OOP,
                  DBMS, and REST APIs. Passionate about building responsive,
                  real-time web applications, problem-solving, and clean software
                  architecture.
                </p>
              </div>

              {/* extended bio */}
              <div className="mb-8 space-y-4 text-sm leading-relaxed text-[#707789]">
                <p>
                  During my internship at{" "}
                  <span className="font-semibold text-[#26324A]">
                    Rinex Technologies
                  </span>
                  , I gained hands-on exposure to production-grade frontend
                  development workflows, collaborating with cross-functional
                  teams to ship responsive UIs and integrate RESTful services.
                </p>
                <p>
                  My academic projects reflect a bias toward real-world
                  problem-solving. The{" "}
                  <span className="font-semibold text-[#26324A]">
                    Real-Time Event Management System
                  </span>{" "}
                  leverages <span className="font-medium">Socket.IO</span> for
                  instant updates across connected clients, while the{" "}
                  <span className="font-semibold text-[#26324A]">
                    Online Shopping System
                  </span>{" "}
                  demonstrates end-to-end CRUD operations with a clean
                  decoupled architecture using React.js, Node.js, and MySQL.
                </p>
                <p>
                  Beyond code, I hold a{" "}
                  <span className="font-semibold text-[#26324A]">
                    Grade-A NCC certification
                  </span>
                  , which instilled discipline, leadership, and the ability to
                  execute under structured timelines—qualities I carry into
                  every sprint and team collaboration.
                </p>
              </div>

              {/* stats row */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-[#EDE7FF]/50 bg-[#FCFBFF] px-4 py-3 text-center"
                  >
                    <p className="text-lg font-bold text-[#26324A]">
                      {s.value}
                    </p>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-[#707789]">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ════════════ RIGHT — capability cards ════════════ */}
          <motion.div
            className="flex flex-col gap-4 lg:col-span-5"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  variants={slideIn}
                  className="group rounded-2xl border border-[#EDE7FF]/60 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ backgroundColor: cap.color }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: cap.iconColor }}
                      />
                    </div>
                    <h4 className="text-sm font-bold text-[#26324A]">
                      {cap.title}
                    </h4>
                  </div>
                  <p className="text-xs leading-relaxed text-[#707789] sm:text-sm">
                    {cap.desc}
                  </p>
                </motion.div>
              );
            })}

            {/* education link */}
            <motion.a
              variants={slideIn}
              href="#education"
              className="group mt-1 inline-flex items-center gap-2 self-start rounded-xl border border-[#EDE7FF]/60 bg-white px-5 py-3 text-sm font-semibold text-[#9180D8] shadow-sm transition-colors hover:bg-[#EDE7FF]/30"
            >
              View Education &amp; Certifications
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
