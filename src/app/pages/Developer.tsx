import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import {
  PenLine, ArrowRight, ChevronRight, BookOpen, Mail,
  Github, Linkedin, GraduationCap,
  Star, Languages
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import Navbar from "../components/Navbar";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import trophyLottie from "../../assets/Trophy.lottie";
import developerImg1 from "../../assets/IMG_9466.jpg";
import developerImg3 from "../../assets/IMG_0768.jpg";
import iconGolang from "../../assets/golang.png";
import iconPython from "../../assets/python.png";
import iconJs from "../../assets/js.png";
import iconHtml from "../../assets/html-5.png";
import iconCss from "../../assets/css-3.png";
import iconTailwind from "../../assets/tailwind.png";
import iconBootstrap from "../../assets/icons8-bootstrap-48.png";
import iconNextjs from "../../assets/icons8-nextjs-48.png";
import iconReact from "../../assets/icons8-react-native-48.png";
import iconExpress from "../../assets/icons8-express-js-48.png";
import iconNodejs from "../../assets/icons8-nodejs-48.png";
import iconThreejs from "../../assets/Three.js_Icon.svg";
import iconGit from "../../assets/icons8-git-48.png";
import iconFigma from "../../assets/icons8-figma-48.png";
import iconMongodb from "../../assets/icons8-mongodb-48.png";
import iconSupabase from "../../assets/icons8-supabase-48.png";
import iconFirebase from "../../assets/icons8-firebase-48.png";
import iconInstagram from "../../assets/instagram.png";
import iconX from "../../assets/icons8-x-50.png";
import flagBangladesh from "../../assets/bangladesh.png";
import flagUK from "../../assets/united-kingdom.png";
import flagIndia from "../../assets/india.png";
import flagGerman from "../../assets/german.png";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function RevealLine({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6%" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div initial={{ y: "105%", skewY: 1.5 }} animate={inView ? { y: 0, skewY: 0 } : {}}
        transition={{ duration: 2, delay, ease: EASE }}>
        {children}
      </motion.div>
    </div>
  );
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-4%" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: EASE }} className={className}>
      {children}
    </motion.div>
  );
}

const skills = {
  "Programming Languages": [
    { name: "Golang", icon: iconGolang },
    { name: "Python", icon: iconPython },
    { name: "JavaScript", icon: iconJs },
  ],
  "Frontend & Markup": [
    { name: "HTML/CSS", icon: iconHtml },
    { name: "Tailwind", icon: iconTailwind },
    { name: "Bootstrap", icon: iconBootstrap },
  ],
  "Frameworks & Libraries": [
    { name: "Next.js", icon: iconNextjs },
    { name: "React", icon: iconReact },
    { name: "Express.js", icon: iconExpress },
    { name: "Node.js", icon: iconNodejs },
    { name: "Three.js", icon: iconThreejs },
  ],
  "Tools & Databases": [
    { name: "Git", icon: iconGit },
    { name: "Figma", icon: iconFigma },
    { name: "MongoDB", icon: iconMongodb },
    { name: "Supabase", icon: iconSupabase },
    { name: "Firebase", icon: iconFirebase },
  ],
};

const awards = [
  { title: "Creative Talent Exploration Competition 2024", category: "Mathematics and Computer", position: "1st", region: "Rangpur Division" },
  { title: "ICT Olympiad Bangladesh 2023", category: "Computer", position: "1st", region: "Rangpur Division" },
];

const education = [
  { degree: "Bachelor in Software Engineering", institution: "Daffodil International University", year: "Fall 2026", icon: GraduationCap },
  { degree: "Higher Secondary Certificate", institution: "Kaunia Degree College, Rangpur", gpa: "4.33/5.00", icon: BookOpen },
  { degree: "School Secondary Certificate", institution: "Cantonment Public School & College Lalmonirhat", gpa: "5.00/5.00", icon: BookOpen },
];

const training = [
  "Digital Marketing Specialist (SR-Dream IT)",
  "Graphics Design Fundamentals (Udemy)",
  "JavaScript for Beginners (Udemy)",
  "UI/UX Design (Udemy)",
  "CS50 (Harvard Education)",
  "Python for Beginners (Harvard Education)",
  "C Programming (Class Central)",
  "MERN Stack Web Development (Interactive Cares, Batch-5)",
  "Python Bootcamp 2026 (Code With Harry)",
  "Complete Web Development (Programming Hero, Batch-12)",
];

const languages = [
  { name: "Bengali", level: "Native", flag: flagBangladesh },
  { name: "English", level: "Fluent", flag: flagUK },
  { name: "Hindi", level: "Conversational", flag: flagIndia },
  { name: "German", level: "Beginner", flag: flagGerman },
];

export default function Developer() {
  const { dark } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const cardBg = dark ? "#141412" : "#FFFFFF";
  const borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(14,14,12,0.09)";
  const bg = dark ? "#0A0A08" : "#F7F6F2";

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <section ref={containerRef} className="overflow-hidden" style={{ position: "relative", minHeight: "100vh", paddingTop: 140, paddingBottom: 80 }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,0.03)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.03)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px)`, backgroundSize: "72px 72px" }} />
        <div className="absolute pointer-events-none" style={{ top: -80, right: -80, width: 700, height: 700, background: "radial-gradient(circle, rgba(99,87,232,0.14) 0%, transparent 65%)", borderRadius: "50%" }} />
        <div className="absolute pointer-events-none" style={{ bottom: 0, left: -100, width: 500, height: 500, background: "radial-gradient(circle, rgba(99,87,232,0.08) 0%, transparent 65%)", borderRadius: "50%" }} />

        <motion.div style={{ opacity }} className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <FadeUp delay={0.05} className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border" style={{ padding: "7px 18px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: "#6357E8", background: "rgba(99,87,232,0.08)", borderColor: "rgba(99,87,232,0.22)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#6357E8]" /> Meet the developer <ChevronRight size={13} />
            </div>
          </FadeUp>

          <div className="mb-8" style={{ lineHeight: 0.92 }}>
            <RevealLine delay={0.1}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95 }}>Sadman</h1>
            </RevealLine>
            <RevealLine delay={0.18}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#6357E8", lineHeight: 0.95, marginTop: "0.06em" }}>Arefin Supto</h1>
            </RevealLine>
          </div>

          <FadeUp delay={0.42}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2vw, 1.25rem)", color: sub, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
              Software Engineering student & full-stack developer building NoteFlow.
            </p>
          </FadeUp>
        </motion.div>
      </section>

      <section style={{ padding: "100px 0", background: bg }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div className="relative">
                <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", aspectRatio: "4/5" }}>
                  <img src={developerImg1} alt="Sadman Arefin Supto" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </div>
            </FadeUp>

            <div>
              <FadeUp delay={0.1}>
                <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, letterSpacing: "-0.03em", color: fg, marginBottom: 24 }}>Building the future of note-taking</h2>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: sub, lineHeight: 1.8, marginBottom: 32 }}>
                  I'm Sadman Arefin Supto, a Software Engineering student at Daffodil International University. I'm passionate about creating elegant solutions to complex problems and building tools that make a difference.
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: sub, lineHeight: 1.8, marginBottom: 32 }}>
                  With expertise spanning the MERN stack, Python, and Golang, I bring a versatile approach to software development. My journey includes winning multiple competitions and completing courses from Harvard and top platforms.
                </p>
              </FadeUp>
              <FadeUp delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="https://github.com/supto707" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full transition-all duration-300"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, padding: "14px 28px", background: "#6357E8", color: "white", textDecoration: "none" }}>
                    <Github size={18} /> GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/codewithsupto/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full transition-all duration-300"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, padding: "14px 28px", border: `1px solid ${borderColor}`, color: fg, textDecoration: "none" }}>
                    <Linkedin size={18} /> LinkedIn
                  </a>
                  <a href="mailto:sadmanarafin2@gmail.com" className="inline-flex items-center gap-2 rounded-full transition-all duration-300"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, padding: "14px 28px", border: `1px solid ${borderColor}`, color: fg, textDecoration: "none" }}>
                    <Mail size={18} /> Contact
                  </a>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 0", background: dark ? "#0E0E0C" : "#F7F6F2" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp className="flex items-center justify-center gap-3 mb-16">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Technical Skills</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, items], ci) => (
              <FadeUp key={category} delay={ci * 0.1}>
                <div style={{ padding: 32, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 20 }}>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 700, color: fg, marginBottom: 24 }}>{category}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {items.map(skill => (
                      <motion.div
                        key={skill.name}
                        whileHover={{ y: -4, scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-3 p-3 rounded-xl"
                        style={{ background: dark ? "rgba(255,255,255,0.03)" : "rgba(14,14,12,0.03)" }}
                      >
                        <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <img src={skill.icon} alt={skill.name} style={{ width: 28, height: 28, objectFit: "contain" }} />
                        </div>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: fg }}>{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 0", background: bg }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp className="flex items-center justify-center gap-3 mb-16">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Education & Training</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <FadeUp>
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 700, color: fg, marginBottom: 32 }}>Education</h3>
              </FadeUp>
              <div className="space-y-6">
                {education.map((edu, i) => (
                  <FadeUp key={i} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start gap-4 p-6 rounded-2xl"
                      style={{ background: cardBg, border: `1px solid ${borderColor}` }}
                    >
                      <div style={{ width: 48, height: 48, borderRadius: 14, background: "#6357E818", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <edu.icon size={22} style={{ color: "#6357E8" }} />
                      </div>
                      <div>
                        <h4 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg, marginBottom: 4 }}>{edu.degree}</h4>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, marginBottom: 4 }}>{edu.institution}</p>
                        {edu.gpa && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#22C27D", fontWeight: 500 }}>GPA: {edu.gpa}</p>}
                        {edu.year && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#6357E8", fontWeight: 500 }}>{edu.year}</p>}
                      </div>
                    </motion.div>
                  </FadeUp>
                ))}
              </div>
            </div>

            <div>
              <FadeUp>
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 700, color: fg, marginBottom: 32 }}>Training & Certifications</h3>
              </FadeUp>
              <div className="flex flex-wrap gap-3">
                {training.map((course, i) => (
                  <FadeUp key={i} delay={i * 0.05}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                      style={{ background: cardBg, border: `1px solid ${borderColor}`, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: fg }}
                    >
                      <GraduationCap size={14} style={{ color: "#6357E8" }} />
                      {course}
                    </motion.div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 0", background: dark ? "#0E0E0C" : "#F7F6F2" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp className="flex items-center justify-center gap-3 mb-16">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Awards & Recognition</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-8">
            {awards.map((award, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  style={{ padding: 40, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 24, textAlign: "center" }}
                >
                  <div style={{ width: 120, height: 120, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                    <DotLottieReact src={trophyLottie} autoplay loop style={{ width: 120, height: 120 }} />
                  </div>
                  <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 48, fontWeight: 700, color: "#6357E8", marginBottom: 8 }}>1st</div>
                  <h4 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 700, color: fg, marginBottom: 8 }}>{award.title}</h4>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: sub, marginBottom: 4 }}>Category: {award.category}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#22C27D", fontWeight: 500 }}>{award.region}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 0", background: bg }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", aspectRatio: "3/4" }}>
                <img src={developerImg3} alt="Sadman Arefin Supto" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </FadeUp>

            <div>
              <FadeUp delay={0.1}>
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", color: fg, marginBottom: 24 }}>Languages & Communication</h3>
              </FadeUp>

              <div className="space-y-4 mb-12">
                {languages.map((lang, i) => (
                  <FadeUp key={i} delay={i * 0.1}>
                    <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: cardBg, border: `1px solid ${borderColor}` }}>
                      <span style={{ width: 32, height: 32, borderRadius: "50%", overflow: "hidden", display: "inline-block", flexShrink: 0 }}>
                        <img src={lang.flag} alt={lang.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </span>
                      <div className="flex-1">
                        <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg }}>{lang.name}</div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub }}>{lang.level}</div>
                      </div>
                      <div style={{ width: 80, height: 6, borderRadius: 3, background: dark ? "rgba(255,255,255,0.1)" : "rgba(14,14,12,0.1)", overflow: "hidden" }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: lang.level === "Native" ? "100%" : lang.level === "Fluent" ? "85%" : lang.level === "Conversational" ? "60%" : "30%" }}
                          transition={{ duration: 1, delay: 0.5 }}
                          style={{ height: "100%", background: "#6357E8", borderRadius: 3 }}
                        />
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>

              <FadeUp delay={0.5}>
                <h4 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 700, color: fg, marginBottom: 16 }}>Connect with me</h4>
                <div className="flex flex-wrap gap-4">
                  <a href="https://github.com/supto707" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300"
                    style={{ background: cardBg, border: `1px solid ${borderColor}`, color: fg, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500 }}>
                    <Github size={18} /> GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/codewithsupto/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300"
                    style={{ background: cardBg, border: `1px solid ${borderColor}`, color: fg, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500 }}>
                    <Linkedin size={18} /> LinkedIn
                  </a>
                  <a href="https://www.instagram.com/season4_supto/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300"
                    style={{ background: cardBg, border: `1px solid ${borderColor}`, color: fg, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500 }}>
                    <img src={iconInstagram} alt="Instagram" style={{ width: 18, height: 18 }} /> Instagram
                  </a>
                  <a href="https://x.com/supto041221" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300"
                    style={{ background: cardBg, border: `1px solid ${borderColor}`, color: fg, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500 }}>
                    <img src={iconX} alt="X" style={{ width: 18, height: 18 }} /> X (Twitter)
                  </a>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "140px 0", background: dark ? "#0E0E0C" : "#F7F6F2", overflow: "hidden", position: "relative" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,0.025)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.025)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative">
          <RevealLine><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: fg, lineHeight: 0.92 }}>Let's build</div></RevealLine>
          <RevealLine delay={0.1}><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: "#6357E8", lineHeight: 0.92 }}>something great.</div></RevealLine>
          <FadeUp delay={0.25}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: sub, maxWidth: 440, margin: "28px auto 40px", lineHeight: 1.65 }}>Always open to new opportunities and collaborations.</p></FadeUp>
          <FadeUp delay={0.35} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="mailto:sadmanarafin2@gmail.com" className="rounded-full flex items-center gap-2 group transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", background: "#6357E8", color: "white", textDecoration: "none" }}>
              <Mail size={16} /> Get in touch <ArrowRight size={15} />
            </a>
            <a href="https://github.com/supto707" target="_blank" rel="noopener noreferrer" className="rounded-full transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(14,14,12,0.14)"}`, color: fg, textDecoration: "none" }}>
              View work
            </a>
          </FadeUp>
        </div>
      </section>

      <footer style={{ background: "#0A0A08", padding: "80px 0 40px" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: `1px solid ${borderColor}` }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub }}>© 2025 Sadman Arefin Supto · Building with NoteFlow</span>
            <div className="flex items-center gap-2" style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: sub }}><div className="w-1.5 h-1.5 rounded-full bg-[#22C27D]" />Available for opportunities</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
