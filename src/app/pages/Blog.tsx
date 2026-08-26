import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import {
  PenLine, ArrowRight, ChevronRight, Calendar, Clock, Tag, User, BookOpen, Github, Twitter, ExternalLink, Share2, ArrowLeft, Search, Filter, Zap, Sparkles, Heart, Coffee, Code, Database, FileText, LayoutGrid, Calendar as CalIcon
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

const posts = [
  { slug: "introducing-noteflow-2", title: "Introducing NoteFlow 2.0", excerpt: "Real-time collaboration, offline-first mobile apps, command palette everywhere, and a brand new formula engine.", date: "2025-01-15", readTime: "8 min", category: "Product", author: "Ada Chen", tags: ["Launch", "Collaboration", "Mobile"], featured: true, cover: "gradient" },
  { slug: "local-first-architecture", title: "Why We Built Local-First", excerpt: "The technical deep-dive into our CRDT implementation, conflict resolution, and why the cloud is optional.", date: "2025-01-08", readTime: "12 min", category: "Engineering", author: "Linus Torres", tags: ["Architecture", "CRDT", "Offline"], featured: false },
  { slug: "templates-that-scale", title: "Templates That Scale", excerpt: "How we designed the template system to handle everything from personal journals to enterprise wikis.", date: "2025-01-02", readTime: "6 min", category: "Design", author: "Maya Patel", tags: ["Design", "Templates", "Systems"], featured: false },
  { slug: "api-v2-graphql", title: "API v2: GraphQL + Realtime", excerpt: "Subscriptions, persisted queries, and a typed schema. Everything you need to build custom integrations.", date: "2024-12-28", readTime: "10 min", category: "Engineering", author: "Sam Rivera", tags: ["API", "GraphQL", "Realtime"], featured: false },
  { slug: "community-templates-2024", title: "Best Community Templates of 2024", excerpt: "From startup OS to PhD thesis managers — the templates that saved teams thousands of hours.", date: "2024-12-20", readTime: "7 min", category: "Community", author: "Sofia Andersson", tags: ["Community", "Templates", "Roundup"], featured: false },
  { slug: "building-with-webhooks", title: "Automate Everything with Webhooks", excerpt: "Real-world examples: sync to GitHub, trigger CI/CD, post to Slack, update CRM — all from NoteFlow.", date: "2024-12-12", readTime: "9 min", category: "Tutorial", author: "Ravi Desai", tags: ["Webhooks", "Automation", "Integration"], featured: false },
  { slug: "offline-mobile-deep-dive", title: "Offline-First Mobile: A Deep Dive", excerpt: "SQLite on device, background sync, conflict-free merges. How the iOS/Android apps stay fast without WiFi.", date: "2024-12-05", readTime: "11 min", category: "Engineering", author: "Alex Novak", tags: ["Mobile", "Offline", "SQLite"], featured: false },
  { slug: "design-system-tokens", title: "Design Tokens in Practice", excerpt: "How we manage 200+ design tokens across web, iOS, Android, and desktop — without losing our minds.", date: "2024-11-28", readTime: "8 min", category: "Design", author: "Jordan Kim", tags: ["Design", "Tokens", "Systems"], featured: false },
  { slug: "year-in-review-2024", title: "NoteFlow 2024: Year in Review", excerpt: "50k users, 2M pages, 500 templates, 12 languages. The numbers behind our first year.", date: "2024-12-31", readTime: "5 min", category: "Company", author: "Ada Chen", tags: ["Year in Review", "Metrics", "Community"], featured: false },
];

const categories = ["All", "Product", "Engineering", "Design", "Community", "Tutorial", "Company"];

export default function Blog() {
  const { dark } = useTheme();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const cardBg = dark ? "#141412" : "#FFFFFF";
  const borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(14,14,12,0.09)";
  const bg = dark ? "#0A0A08" : "#F7F6F2";

  const filteredPosts = posts.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
              <div className="w-1.5 h-1.5 rounded-full bg-[#6357E8]" /> Latest posts, deep dives & behind-the-scenes <ChevronRight size={13} />
            </div>
          </FadeUp>

          <div className="mb-8" style={{ lineHeight: 0.92 }}>
            <RevealLine delay={0.1}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95 }}>Blog</h1>
            </RevealLine>
            <RevealLine delay={0.18}>
              <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#6357E8", lineHeight: 0.95, marginTop: "0.06em" }}>Notes from the team</h1>
            </RevealLine>
          </div>

          <FadeUp delay={0.42}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2vw, 1.25rem)", color: sub, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
              Product updates, engineering deep-dives, design thinking, and community stories.
            </p>
          </FadeUp>
        </motion.div>
      </section>

      <section style={{ padding: "60px 0 100px", background: bg }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
            <FadeUp>
              <div className="relative" style={{ maxWidth: 400 }}>
                <Search size={18} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: sub }} />
                <input
                  type="search"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px 14px 14px 48px",
                    fontSize: 15,
                    fontFamily: "'DM Sans', sans-serif",
                    background: cardBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: 12,
                    color: fg,
                    outline: "none"
                  }}
                />
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div className="flex flex-wrap gap-2" style={{ justifyContent: "flex-end" }}>
                {categories.map((cat, i) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      background: activeCategory === cat ? "#6357E8" : "transparent",
                      color: activeCategory === cat ? "white" : fg,
                      border: `1px solid ${activeCategory === cat ? "#6357E8" : borderColor}`,
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.2}>
            <div className="grid lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, i) => (
                <FadeUp key={post.slug} delay={i * 0.06}>
                  <Link to={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.01 }}
                      transition={{ duration: 0.3 }}
                      style={{ padding: 24, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16, height: "100%", display: "flex", flexDirection: "column" }}
                    >
                      {post.featured && (
                        <div className="mb-4" style={{ height: 120, borderRadius: 12, background: "linear-gradient(135deg, #6357E8 0%, #22C27D 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <div className="text-center p-6">
                            <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 28, fontWeight: 800, color: "white" }}>Featured</div>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 4 }}>Major release</div>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-3 mb-3">
                        <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, fontWeight: 600, color: "#6357E8", background: "rgba(99,87,232,0.12)", padding: "2px 8px", borderRadius: 9999, textTransform: "uppercase" }}>{post.category}</span>
                        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: sub }}>{post.readTime}</span>
                      </div>
                      <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 22, fontWeight: 800, color: fg, lineHeight: 1.2, marginBottom: 12 }}>{post.title}</h3>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: sub, lineHeight: 1.6, marginBottom: 16, flex: 1 }}>{post.excerpt}</p>
                      <div className="flex items-center gap-3 mb-4">
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#6357E818", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, color: "#6357E8" }}>{post.author.charAt(0)}</div>
                        <div>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: fg }}>{post.author}</div>
                          <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: sub }}>{formatDate(post.date)}</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {post.tags.slice(0, 3).map(tag => (
                          <span key={tag} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: sub, background: dark ? "rgba(255,255,255,0.06)" : "rgba(14,14,12,0.06)", padding: "3px 10px", borderRadius: 9999 }}>{tag}</span>
                        ))}
                      </div>
                    </motion.div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </FadeUp>

          {filteredPosts.length === 0 && (
            <FadeUp>
              <div style={{ textAlign: "center", padding: 60, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16 }}>
                <Search size={48} style={{ color: sub, marginBottom: 16 }} />
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 700, color: fg, marginBottom: 8 }}>No posts found</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: sub }}>Try a different search or category.</p>
              </div>
            </FadeUp>
          )}

          <FadeUp delay={0.3} className="text-center mt-16">
            <Link to="/blog/archive" className="inline-flex items-center gap-2 rounded-full"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "14px 32px", border: `1px solid ${borderColor}`, color: fg, textDecoration: "none" }}>
              View all posts <ArrowRight size={15} />
            </Link>
          </FadeUp>
        </div>
      </section>

      <section style={{ padding: "100px 0", background: dark ? "#0E0E0C" : "#F7F6F2" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <FadeUp className="flex items-center justify-center gap-3 mb-12">
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Newsletter</span>
            <div className="h-px bg-[#6357E8]" style={{ width: 28 }} />
          </FadeUp>
          <RevealLine>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 7vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95, marginBottom: "0.12em" }}>Weekly digest, zero spam</h2>
          </RevealLine>
          <FadeUp delay={0.2}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: sub, maxWidth: 500, margin: "24px auto 32px", lineHeight: 1.6 }}>Top posts, community highlights, templates of the week, and a personal note from the team. Every Sunday.</p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <form className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto" style={{ gap: 12 }}>
              <input type="email" placeholder="you@example.com" required
                style={{ flex: 1, padding: "16px 20px", fontSize: 16, fontFamily: "'DM Sans', sans-serif", background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 12, color: fg, outline: "none" }} />
              <button type="submit" className="inline-flex items-center gap-2 rounded-full"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 32px", background: "#6357E8", color: "white", border: "none", cursor: "pointer" }}>
                Subscribe <ArrowRight size={15} />
              </button>
            </form>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub, marginTop: 12 }}>No spam. Unsubscribe anytime. <a href="/privacy" style={{ color: "#6357E8" }}>Privacy policy</a>.</p>
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

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}