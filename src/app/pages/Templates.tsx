import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import {
  PenLine, ArrowRight, ChevronRight, Search, Filter, FileText, Database, BookOpen, Calendar, Users, LayoutGrid, Table2, Zap, Sparkles, Heart, Tag, Download, ExternalLink, Plus, Star, Clock, MapPin, Briefcase, Coffee, Music, Camera, Gamepad2, Dumbbell, BookOpen as BookOpenIcon, Lightbulb, Target, TrendingUp, Rocket
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import Navbar from "../components/Navbar";

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

const categories = [
  { id: "all", label: "All", count: 24 },
  { id: "work", label: "Work", count: 8, icon: Briefcase },
  { id: "personal", label: "Personal", count: 6, icon: Heart },
  { id: "team", label: "Team", count: 5, icon: Users },
  { id: "learning", label: "Learning", count: 5, icon: BookOpenIcon },
];

const templates = [
  { id: 1, name: "Project Tracker", category: "work", desc: "Kanban + timeline + docs. Ship on time, every time.", icon: LayoutGrid, color: "#6357E8", tags: ["Kanban", "Timeline", "Docs"], downloads: "12.4k", rating: 4.9, author: "NoteFlow Team", featured: true },
  { id: 2, name: "Meeting Notes", category: "work", desc: "Action items, decisions, follow-ups — never lose context.", icon: FileText, color: "#22C27D", tags: ["Meetings", "Actions", "Decisions"], downloads: "8.7k", rating: 4.8, author: "Maya Patel" },
  { id: 3, name: "Sprint Planner", category: "work", desc: "Backlog, sprints, retrospectives. Built for engineering teams.", icon: Target, color: "#F59E0B", tags: ["Sprints", "Retro", "Velocity"], downloads: "6.2k", rating: 4.9, author: "Sam Rivera" },
  { id: 4, name: "Content Calendar", category: "work", desc: "Plan, write, publish. Social, blog, newsletter in one view.", icon: Calendar, color: "#EC4899", tags: ["Content", "Social", "Publishing"], downloads: "5.1k", rating: 4.7, author: "Ravi Desai" },
  { id: 5, name: "Job Tracker", category: "personal", desc: "Applications, interviews, offers. Land your next role.", icon: Briefcase, color: "#6357E8", tags: ["Jobs", "Interviews", "Networking"], downloads: "4.8k", rating: 4.8, author: "Sofia Andersson" },
  { id: 6, name: "Habit Tracker", category: "personal", desc: "Streaks, stats, reminders. Build routines that stick.", icon: TrendingUp, color: "#22C27D", tags: ["Habits", "Streaks", "Stats"], downloads: "9.3k", rating: 4.9, author: "Chris Morgan" },
  { id: 7, name: "Travel Planner", category: "personal", desc: "Flights, stays, activities, budget. Stress-free trips.", icon: MapPin, color: "#F59E0B", tags: ["Travel", "Budget", "Itinerary"], downloads: "3.7k", rating: 4.7, author: "Alex Novak" },
  { id: 8, name: "Recipe Database", category: "personal", desc: "Ingredients, steps, photos, tags. Your digital cookbook.", icon: BookOpenIcon, color: "#EC4899", tags: ["Cooking", "Meal Prep", "Nutrition"], downloads: "2.9k", rating: 4.6, author: "Priya Shah" },
  { id: 9, name: "Team Wiki", category: "team", desc: "Onboarding, processes, RFCs. Single source of truth.", icon: BookOpen, color: "#6357E8", tags: ["Wiki", "Onboarding", "Processes"], downloads: "7.1k", rating: 4.9, author: "NoteFlow Team" },
  { id: 10, name: "Design System", category: "team", desc: "Tokens, components, guidelines. Consistent UI at scale.", icon: Sparkles, color: "#22C27D", tags: ["Design", "Components", "Tokens"], downloads: "4.3k", rating: 4.8, author: "Maya Patel" },
  { id: 11, name: "OKR Tracker", category: "team", desc: "Objectives, key results, progress. Align the whole org.", icon: Target, color: "#F59E0B", tags: ["OKRs", "Goals", "Alignment"], downloads: "3.8k", rating: 4.7, author: "Ada Chen" },
  { id: 12, name: "Retrospective", category: "team", desc: "Start/stop/continue, voting, action items. Better retros.", icon: Users, color: "#EC4899", tags: ["Retro", "Feedback", "Actions"], downloads: "2.6k", rating: 4.6, author: "Ravi Desai" },
  { id: 13, name: "Course Notes", category: "learning", desc: "Lectures, readings, flashcards. Ace every class.", icon: BookOpenIcon, color: "#6357E8", tags: ["Study", "Flashcards", "Exams"], downloads: "5.4k", rating: 4.8, author: "Student Community" },
  { id: 14, name: "Language Learning", category: "learning", desc: "Vocab, grammar, immersion. Spaced repetition built-in.", icon: Lightbulb, color: "#22C27D", tags: ["Languages", "SRS", "Immersion"], downloads: "3.2k", rating: 4.7, author: "Sofia Andersson" },
  { id: 15, name: "Book Notes", category: "learning", desc: "Highlights, summaries, actionable takeaways. Read smarter.", icon: FileText, color: "#F59E0B", tags: ["Reading", "Summaries", "Insights"], downloads: "4.1k", rating: 4.8, author: "Chris Morgan" },
  { id: 16, name: "Research Hub", category: "learning", desc: "Papers, citations, synthesis. Literature reviews made easy.", icon: Database, color: "#EC4899", tags: ["Research", "Citations", "Synthesis"], downloads: "1.9k", rating: 4.5, author: "Priya Shah" },
  { id: 17, name: "Daily Journal", category: "personal", desc: "Morning pages, gratitude, reflection. 5 min a day.", icon: BookOpenIcon, color: "#8B5CF6", tags: ["Journaling", "Mindfulness", "Reflection"], downloads: "6.8k", rating: 4.9, author: "NoteFlow Team" },
  { id: 18, name: "Finance Tracker", category: "personal", desc: "Expenses, budgets, investments. Net worth at a glance.", icon: TrendingUp, color: "#10B981", tags: ["Finance", "Budget", "Investing"], downloads: "4.2k", rating: 4.7, author: "Alex Novak" },
  { id: 19, name: "Workout Log", category: "personal", desc: "Exercises, sets, reps, progress. PRs tracked automatically.", icon: Dumbbell, color: "#EF4444", tags: ["Fitness", "Strength", "Progress"], downloads: "3.5k", rating: 4.8, author: "Sam Rivera" },
  { id: 20, name: "Movie/TV Tracker", category: "personal", desc: "Watchlist, ratings, reviews. Never forget a recommendation.", icon: Camera, color: "#EAB308", tags: ["Movies", "TV", "Reviews"], downloads: "2.8k", rating: 4.6, author: "Community" },
  { id: 21, name: "Game Collection", category: "personal", desc: "Library, backlog, playtime, completion. Gamer's dashboard.", icon: Gamepad2, color: "#8B5CF6", tags: ["Gaming", "Backlog", "Stats"], downloads: "1.7k", rating: 4.5, author: "Community" },
  { id: 22, name: "Music Practice", category: "learning", desc: "Repertoire, technique, progress. Master your instrument.", icon: Music, color: "#EC4899", tags: ["Music", "Practice", "Progress"], downloads: "1.2k", rating: 4.4, author: "Community" },
  { id: 23, name: "Coffee Journal", category: "personal", desc: "Beans, brew methods, ratings, tasting notes. For coffee nerds.", icon: Coffee, color: "#92400E", tags: ["Coffee", "Tasting", "Brewing"], downloads: "980", rating: 4.7, author: "Community" },
  { id: 24, name: "Startup OS", category: "work", desc: "Fundraising, metrics, board docs, hiring. Founder's toolkit.", icon: Rocket, color: "#6357E8", tags: ["Startup", "Fundraising", "Metrics"], downloads: "2.1k", rating: 4.9, author: "Ada Chen" },
];

export default function Templates() {
  const { dark } = useTheme();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const cardBg = dark ? "#141412" : "#FFFFFF";
  const borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(14,14,12,0.09)";
  const bg = dark ? "#0A0A08" : "#F7F6F2";

  const filteredTemplates = templates.filter(t =>
    (activeCategory === "all" || t.category === activeCategory) &&
    (t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.desc.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
              <div className="w-1.5 h-1.5 rounded-full bg-[#6357E8]" /> 24 templates. 100% free. <ChevronRight size={13} />
            </div>
          </FadeUp>

          <div className="mb-8" style={{ lineHeight: 0.92 }}>
            <RevealLine delay={0.1}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95 }}>Templates</h1>
            </RevealLine>
            <RevealLine delay={0.18}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#6357E8", lineHeight: 0.95, marginTop: "0.06em" }}>to start fast</h1>
            </RevealLine>
          </div>

          <FadeUp delay={0.42}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2vw, 1.25rem)", color: sub, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
              Duplicate any template in one click. Customize. Share. Community-powered.
            </p>
          </FadeUp>
        </motion.div>
      </section>

      <section style={{ padding: "60px 0 100px", background: bg }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeUp>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="relative flex-1 max-w-md">
                <Search size={18} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: sub }} />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ width: "100%", padding: "14px 16px 14px 48px", fontSize: 15, fontFamily: "'DM Sans', sans-serif", background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 12, color: fg, outline: "none" }}
                  onFocus={e => e.target.style.borderColor = "#6357E8"}
                  onBlur={e => e.target.style.borderColor = borderColor}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      background: activeCategory === cat.id ? "#6357E8" : "transparent",
                      color: activeCategory === cat.id ? "white" : fg,
                      border: `1px solid ${activeCategory === cat.id ? "#6357E8" : borderColor}`,
                    }}
                  >
                    {cat.icon && <cat.icon size={14} />}
                    {cat.label} <span style={{ opacity: 0.6 }}>({cat.count})</span>
                  </button>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTemplates.map((t, i) => (
                <FadeUp key={t.id} delay={i * 0.04}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    style={{ background: cardBg, border: `1px solid ${t.featured ? "#6357E8" : borderColor}`, borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column" }}
                  >
                    {t.featured && (
                      <div style={{ background: "#6357E8", color: "white", padding: "4px 12px", fontSize: 11, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", textAlign: "center" }}>Featured</div>
                    )}
                    <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1 }}>
                      <div className="flex items-start gap-3 mb-4">
                        <div style={{ width: 56, height: 56, borderRadius: 14, background: `${t.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <t.icon size={24} style={{ color: t.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg, marginBottom: 4 }}>{t.name}</h3>
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub, lineHeight: 1.5 }}>{t.desc}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {t.tags.map(tag => (
                          <span key={tag} style={{ fontSize: 11, fontFamily: "'DM Sans', sans-serif", padding: "3px 8px", borderRadius: 9999, background: `${t.color}18`, color: t.color, fontWeight: 500 }}>{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor, marginTop: "auto" }}>
                        <div className="flex items-center gap-3" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12 }}>
                          <span style={{ color: "#F59E0B" }}>★ {t.rating}</span>
                          <span style={{ color: sub }}>{t.downloads} downloads</span>
                        </div>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: sub }}>by {t.author}</span>
                      </div>
                    </div>
                    <div style={{ padding: "0 24 24", borderTop: `1px solid ${borderColor}`, marginTop: -1 }}>
                      <button className="w-full inline-flex items-center justify-center gap-2 rounded-full"
                        style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, padding: "12px 24px", background: "#6357E8", color: "white", border: "none", cursor: "pointer" }}>
                        <Plus size={15} /> Duplicate to workspace
                      </button>
                    </div>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </FadeUp>

          {filteredTemplates.length === 0 && (
            <FadeUp className="text-center py-20">
              <Search size={48} style={{ color: sub, marginBottom: 16, opacity: 0.5 }} />
              <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 700, color: fg, marginBottom: 8 }}>No templates found</h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: sub }}>Try adjusting your search or filter.</p>
            </FadeUp>
          )}
        </div>
      </section>

      <section style={{ padding: "100px 0", background: dark ? "#0E0E0C" : "#F7F6F2" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <FadeUp className="flex items-center justify-center gap-3 mb-12">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Submit yours</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>
          <RevealLine>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95, marginBottom: "0.12em" }}>Made something useful?</h2>
          </RevealLine>
          <FadeUp delay={0.2}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: sub, maxWidth: 500, margin: "24px auto 32px", lineHeight: 1.6 }}>Share your template with 50k+ users. Get featured. Build your reputation.</p>
          </FadeUp>
          <FadeUp delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://github.com/noteflow/templates" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "14px 32px", background: "#6357E8", color: "white", textDecoration: "none" }}>
              <Github size={16} /> Submit on GitHub
            </a>
            <Link to="/docs/templates" className="inline-flex items-center gap-2 rounded-full"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "14px 32px", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(14,14,12,0.14)"}`, color: fg, textDecoration: "none" }}>
              <FileText size={15} /> Submission guide
            </Link>
          </FadeUp>
        </div>
      </section>

      <footer style={{ background: "#0A0A08", padding: "80px 0 40px" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="rounded-lg bg-[#6357E8] flex items-center justify-center" style={{ width: 34, height: 34 }}><PenLine size={16} className="text-white" /></div>
                <span className="font-bold tracking-tight text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18 }}>NoteFlow</span>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.75, maxWidth: 240 }}>A free workspace for docs, databases, and wikis. Think clearly. Note freely.</p>
            </div>
            {Object.entries({
              Product: ["Features", "Pricing", "Changelog", "Roadmap", "Status"],
              Resources: ["Documentation", "API Reference", "Templates", "Community"],
              Company: ["About", "Blog", "Careers", "Press kit"],
              Legal: ["Privacy", "Terms", "Cookie policy", "Security"],
            }).map(([group, links], gi) => (
              <div key={group}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "white", marginBottom: 16 }}>{group}</div>
                <div className="flex flex-col gap-2.5">
                  {links.map((link, li) => (
                    <a key={link} href={`/${link.toLowerCase().replace(" ", "-")}`} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub, display: "block", textDecoration: "none" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "white")}
                      onMouseLeave={e => (e.currentTarget.style.color = sub)}>
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: `1px solid ${borderColor}` }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub }}>© 2025 NoteFlow, Inc. · Free forever · Made with care</span>
            <div className="flex items-center gap-2" style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: sub }}><div className="w-1.5 h-1.5 rounded-full bg-[#22C27D]" />All systems operational</div>
          </div>
        </div>
      </footer>
    </div>
  );
}