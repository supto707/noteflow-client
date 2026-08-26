import { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import {
  PenLine, ArrowRight, Check, Menu, X, ChevronRight,
  Sun, Moon, FileText, Database, BookOpen, Globe,
  Layers, Table2, LayoutGrid, Calendar, Link2, Download, Search
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import Navbar from "../components/Navbar";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Animation helpers ────────────────────────────────────────────────────────

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

function SlideIn({ children, delay = 0, from = "left", className = "" }: { children: React.ReactNode; delay?: number; from?: "left" | "right"; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-4%" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: from === "left" ? -60 : 60 }} animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 2, delay, ease: EASE }} className={className}>
      {children}
    </motion.div>
  );
}

// ─── App Mockup ───────────────────────────────────────────────────────────────

function AppMockup({ dark = false, scale = 1 }: { dark?: boolean; scale?: number }) {
  const bg = dark ? "#1A1A18" : "#FFFFFF";
  const sidebar = dark ? "#141412" : "#F7F6F2";
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(14,14,12,0.08)";
  const textColor = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = "#8A8A80";
  
  const [activeView, setActiveView] = useState<"notes" | "board" | "table" | "calendar">("notes");
  const [hoveredNote, setHoveredNote] = useState<string | null>(null);
  const [activeNote, setActiveNote] = useState<string>("Q4 Strategy");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const notes = [
    { id: "1", title: "Q4 Strategy", tag: "Work", preview: "Outline key objectives for the upcoming quarter...", active: true },
    { id: "2", title: "Book Notes — Deep Work", tag: "Reading", preview: "Cal Newport on deliberate practice and focus..." },
    { id: "3", title: "Travel: Kyoto 2025", tag: "Personal", preview: "Arashiyama bamboo grove, first thing morning..." },
    { id: "4", title: "Product Roadmap v3", tag: "Work", preview: "Core features for the March release, sorted by..." },
    { id: "5", title: "Meeting Notes — Design Review", tag: "Work", preview: "Feedback on new dashboard mockups..." },
    { id: "6", title: "Recipe: Sourdough Starter", tag: "Personal", preview: "Day 3: bubbles forming, feeding schedule..." },
    { id: "7", title: "Research: AI Agents", tag: "Reading", preview: "LangChain, AutoGPT, and the future of automation..." },
    { id: "8", title: "Gym Progress Log", tag: "Personal", preview: "Week 12: PR on deadlift 315lbs..." },
  ];
  
  const tagColors: Record<string, string> = { Work: "#6357E8", Reading: "#22C27D", Personal: "#F59E0B" };
  
  const viewTabs = [
    { id: "notes", label: "Notes", icon: FileText },
    { id: "board", label: "Board", icon: LayoutGrid },
    { id: "table", label: "Table", icon: Table2 },
    { id: "calendar", label: "Calendar", icon: Calendar },
  ];

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ 
      width: 1000 * scale, 
      height: 560 * scale, 
      fontFamily: "'DM Sans', sans-serif", 
      fontSize: 13 * scale, 
      background: bg, 
      border: `1px solid ${border}`,
      transition: "box-shadow 0.3s ease, transform 0.3s ease",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0,0,0,0.05)"
    }}
    onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 35px 60px -12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(99,87,232,0.1)"}
    onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0,0,0,0.05)"}
    >
      {/* Header */}
      <div className="flex items-center gap-4 border-b" style={{ height: 48 * scale, padding: `0 ${20 * scale}px`, background: sidebar, borderColor: border }}>
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-[#6357E8] flex items-center justify-center" style={{ width: 28 * scale, height: 28 * scale }}>
            <PenLine size={14 * scale} className="text-white" />
          </div>
          <div style={{ fontSize: 13 * scale, fontWeight: 600, color: textColor }}>NoteFlow</div>
        </div>
        <div className="flex-1 flex justify-center">
          <div style={{ fontSize: 12 * scale, color: sub, fontWeight: 500 }}>Q4 Strategy — Workspace</div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{ 
              width: 36 * scale, height: 36 * scale, border: "none", background: "transparent", 
              borderRadius: 10 * scale, cursor: "pointer", color: sub,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.2s, color 0.2s"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"; e.currentTarget.style.color = textColor; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = sub; }}
            title="Toggle sidebar"
          >
            <Menu size={18 * scale} />
          </button>
        </div>
</div>
       
      <div className="flex" style={{ height: `calc(100% - ${48 * scale}px)` }}>
        {/* Left Sidebar */}
        <motion.div
          className="flex flex-col border-r"
          style={{ 
            width: sidebarCollapsed ? 60 * scale : 220 * scale, 
            padding: `${12 * scale}px ${10 * scale}px`, 
            background: sidebar, 
            borderColor: border,
            transition: "width 0.3s ease",
            overflow: "hidden"
          }}
          animate={{ width: sidebarCollapsed ? 60 * scale : 220 * scale }}
        >
          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ fontWeight: 600, fontSize: 13 * scale, color: textColor, marginBottom: 12 * scale }}>My Notes</div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: "100%",
                      padding: `${8 * scale}px ${12 * scale}px ${8 * scale}px ${36 * scale}px`,
                      fontSize: 12 * scale,
                      background: bg,
                      border: `1px solid ${border}`,
                      borderRadius: 8 * scale,
                      color: textColor,
                      outline: "none",
                      fontFamily: "'DM Sans', sans-serif"
                    }}
                  />
                  <Search size={14 * scale} style={{ position: "absolute", left: 10 * scale, top: "50%", transform: "translateY(-50%)", color: sub }} />
                </div>
              </div>
              
              <nav style={{ display: "flex", flexDirection: "column", gap: 2 * scale }}>
                {["All Notes", "Favorites", "Recent", "Trash"].map((item, i) => (
                  <button
                    key={item}
                    onClick={() => {}}
                    style={{
                      padding: `${8 * scale}px ${10 * scale}px`,
                      fontSize: 12 * scale,
                      borderRadius: 8 * scale,
                      background: i === 0 ? "#6357E8" : "transparent",
                      color: i === 0 ? "white" : sub,
                      display: "flex",
                      alignItems: "center",
                      gap: 8 * scale,
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500,
                      transition: "all 0.2s",
                      width: "100%",
                      textAlign: "left"
                    }}
                    onMouseEnter={(e) => { 
                      if (i !== 0) { e.currentTarget.style.background = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"; e.currentTarget.style.color = textColor; } 
                    }}
                    onMouseLeave={(e) => { if (i !== 0) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = sub; } }}
                  >
                    <div style={{ width: 5 * scale, height: 5 * scale, borderRadius: "50%", background: i === 0 ? "rgba(255,255,255,0.6)" : sub, opacity: 0.6 }} />
                    <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item}</span>
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
          
          {sidebarCollapsed && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 * scale, alignItems: "center", marginTop: 20 * scale }}>
              {["All Notes", "Favorites", "Recent", "Trash"].map((item, i) => (
                <button
                  key={item}
                  style={{
                    padding: 10 * scale,
                    borderRadius: 8 * scale,
                    background: i === 0 ? "#6357E8" : "transparent",
                    color: i === 0 ? "white" : sub,
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  onMouseEnter={(e) => { if (i !== 0) { e.currentTarget.style.background = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)"; e.currentTarget.style.color = textColor; } }}
                  onMouseLeave={(e) => { if (i !== 0) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = sub; } }}
                  title={item}
                >
                  <FileText size={18 * scale} />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Middle Panel - Notes List */}
        <div className="border-r overflow-hidden flex flex-col" style={{ width: 240 * scale, borderColor: border }}>
          <div className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: border, background: sidebar }}>
            <span style={{ fontSize: 11 * scale, fontWeight: 600, color: textColor, textTransform: "uppercase", letterSpacing: 0.5 }}>Notes ({filteredNotes.length})</span>
            <button style={{ padding: "4px 8px", fontSize: 10 * scale, background: "#6357E8", color: "white", border: "none", borderRadius: 4, cursor: "pointer", fontWeight: 500 }}>+ New</button>
          </div>
          
          <div className="overflow-y-auto flex-1" style={{ padding: `${4 * scale}px` }}>
            {filteredNotes.map(note => {
              const isActive = activeNote === note.title;
              const isHovered = hoveredNote === note.id;
              return (
                <motion.div
                  key={note.id}
                  layout
                  className="border-b cursor-pointer"
                  style={{ 
                    padding: `${10 * scale}px`, 
                    borderColor: border, 
                    background: isActive ? "rgba(99,87,232,0.08)" : isHovered ? (dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)") : bg,
                    borderRadius: 8 * scale,
                    marginBottom: 4 * scale,
                    transition: "all 0.2s ease"
                  }}
                  whileHover={{ x: 4, background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}
                  onClick={() => setActiveNote(note.title)}
                  onMouseEnter={() => setHoveredNote(note.id)}
                  onMouseLeave={() => setHoveredNote(null)}
                >
                  <div style={{ fontSize: 12 * scale, fontWeight: 600, color: textColor, lineHeight: 1.3, marginBottom: 4 * scale, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {note.title}
                    {isActive && <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ marginLeft: 6 * scale, color: "#6357E8" }}>●</motion.span>}
                  </div>
                  <div style={{ fontSize: 10 * scale, color: sub, lineHeight: 1.4, marginBottom: 6 * scale, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{note.preview}</div>
                  <span style={{ fontSize: 9 * scale, borderRadius: 4 * scale, padding: `${2 * scale}px ${6 * scale}px`, background: (tagColors[note.tag] || "#8A8A80") + "18", color: tagColors[note.tag] || "#8A8A80", fontWeight: 500 }}>{note.tag}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Panel - Editor / Board / Table / Calendar */}
        <div className="flex-1 overflow-hidden flex flex-col" style={{ padding: `${16 * scale}px`, background: bg }}>
          {/* View Tabs */}
          <div className="flex items-center gap-1 mb-4" style={{ padding: "0 4px" }}>
            {viewTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as typeof activeView)}
                style={{
                  padding: `${8 * scale}px ${14 * scale}px`,
                  fontSize: 12 * scale,
                  fontWeight: 500,
                  fontFamily: "'DM Sans', sans-serif",
                  color: activeView === tab.id ? "#6357E8" : sub,
                  background: activeView === tab.id ? (dark ? "rgba(99,87,232,0.1)" : "rgba(99,87,232,0.08)") : "transparent",
                  border: "none",
                  borderRadius: 8 * scale,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6 * scale,
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => { if (activeView !== tab.id) { e.currentTarget.style.background = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)"; e.currentTarget.style.color = textColor; } }}
                onMouseLeave={(e) => { if (activeView !== tab.id) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = sub; } }}
              >
                <tab.icon size={14 * scale} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content based on active view */}
          <div className="flex-1 overflow-auto" style={{ background: bg, borderRadius: 12 * scale, border: `1px solid ${border}` }}>
            {activeView === "notes" && (
              <EditorView 
                dark={dark} 
                scale={scale} 
                activeNote={activeNote}
                notes={notes}
                textColor={textColor}
                sub={sub}
                border={border}
                sidebar={sidebar}
                bg={bg}
              />
            )}
            
            {activeView === "board" && (
              <BoardView dark={dark} scale={scale} textColor={textColor} sub={sub} border={border} bg={bg} />
            )}
            
            {activeView === "table" && (
              <TableView dark={dark} scale={scale} textColor={textColor} sub={sub} border={border} bg={bg} />
            )}
            
            {activeView === "calendar" && (
              <CalendarView dark={dark} scale={scale} textColor={textColor} sub={sub} border={border} bg={bg} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Editor View Component
function EditorView({ dark, scale, activeNote, notes, textColor, sub, border, sidebar, bg }: any) {
  const note = notes.find(n => n.title === activeNote) || notes[0];
  const tagColors: Record<string, string> = { Work: "#6357E8", Reading: "#22C27D", Personal: "#F59E0B" };
  
  const content = {
    "Q4 Strategy": [
      { type: "heading", text: "Q4 Strategy" },
      { type: "text", text: "Outline key objectives for the upcoming quarter. Focus on three core pillars." },
      { type: "heading", text: "Key Initiatives" },
      { type: "bullet", text: "Launch V2 of the mobile app by end of October" },
      { type: "bullet", text: "Reduce churn by 12% through onboarding improvements" },
      { type: "bullet", text: "Expand enterprise sales team by 5 reps" },
      { type: "bullet", text: "Ship new database formula engine" },
      { type: "heading", text: "Success Metrics" },
      { type: "bullet", text: "Monthly active users: 50k → 75k" },
      { type: "bullet", text: "Net revenue retention: >110%" },
      { type: "bullet", text: "NPS score: >50" },
    ],
    "Book Notes — Deep Work": [
      { type: "heading", text: "Deep Work — Cal Newport" },
      { type: "text", text: "Key concepts and actionable takeaways for applying deep work principles." },
      { type: "heading", text: "Core Rules" },
      { type: "bullet", text: "Work deeply — schedule blocks of uninterrupted focus time" },
      { type: "bullet", text: "Embrace boredom — train your mind to resist distraction" },
      { type: "bullet", text: "Quit social media — evaluate tools by their impact on goals" },
      { type: "bullet", text: "Drain the shallows — minimize shallow work obligations" },
    ],
    "Travel: Kyoto 2025": [
      { type: "heading", text: "Kyoto Trip Planning" },
      { type: "text", text: "April 15-22, 2025 — Solo trip to explore temples, gardens, and food." },
      { type: "heading", text: "Must Visit" },
      { type: "bullet", text: "Fushimi Inari — early morning before crowds" },
      { type: "bullet", text: "Kinkaku-ji (Golden Pavilion)" },
      { type: "bullet", text: "Arashiyama Bamboo Grove" },
      { type: "bullet", text: "Gion district for traditional tea ceremony" },
      { type: "heading", text: "Food" },
      { type: "bullet", text: "Nishiki Market — street food breakfast" },
      { type: "bullet", text: "Kaiseki dinner at Gion Karyo" },
    ],
    "Product Roadmap v3": [
      { type: "heading", text: "Product Roadmap v3.0" },
      { type: "text", text: "Core features for the March release, sorted by priority and team capacity." },
      { type: "heading", text: "Q1 Deliverables" },
      { type: "bullet", text: "New formula engine for databases" },
      { type: "bullet", text: "Real-time collaboration cursors" },
      { type: "bullet", text: "Mobile app offline sync" },
      { type: "bullet", text: "Command palette (⌘K) everywhere" },
      { type: "heading", text: "Q2 Exploration" },
      { type: "bullet", text: "AI-powered writing assistant" },
      { type: "bullet", text: "Custom automation workflows" },
      { type: "bullet", text: "Plugin marketplace beta" },
    ]
  }[note.title] || content["Q4 Strategy"];

  return (
    <div style={{ padding: `${20 * scale}px ${22 * scale}px`, height: "100%", overflow: "auto" }}>
      <div style={{ 
        fontSize: 18 * scale, 
        fontWeight: 700, 
        color: textColor, 
        marginBottom: 4 * scale, 
        fontFamily: "'Bricolage Grotesque', sans-serif",
        display: "flex",
        alignItems: "center",
        gap: 10 * scale
      }}>
        <span>{note.title}</span>
        <span style={{ fontSize: 10 * scale, borderRadius: 4 * scale, padding: `${2 * scale}px ${6 * scale}px`, background: (tagColors[note.tag] || "#8A8A80") + "18", color: tagColors[note.tag] || "#8A8A80", fontWeight: 500 }}>{note.tag}</span>
      </div>
      <div style={{ display: "flex", gap: 8 * scale, marginBottom: 16 * scale, color: sub, fontSize: 11 * scale }}>
        <span>Updated 2 hours ago</span>
        <span>•</span>
        <span>By you</span>
        <span>•</span>
        <span>Last edited by you</span>
      </div>
      
      <div style={{ lineHeight: 1.7 }}>
        {content.map((block, i) => (
          <div key={i} style={{ 
            fontSize: block.type === "heading" ? 16 * scale : block.type === "text" ? 13 * scale : 12 * scale,
            fontWeight: block.type === "heading" ? 700 : 400,
            color: block.type === "heading" ? textColor : block.type === "text" ? sub : dark ? "#A0A098" : "#3A3A38",
            lineHeight: block.type === "heading" ? 1.3 : 1.7,
            marginBottom: block.type === "heading" ? 10 * scale : block.type === "text" ? 8 * scale : 4 * scale,
            marginTop: block.type === "heading" && i > 0 ? 16 * scale : 0,
            fontFamily: block.type === "heading" ? "'Bricolage Grotesque', sans-serif" : "'DM Sans', sans-serif",
            paddingLeft: block.type === "bullet" ? 16 * scale : 0,
            position: "relative"
          }}>
            {block.type === "bullet" && (
              <motion.span 
                style={{ position: "absolute", left: 0, top: 2 * scale, width: 6 * scale, height: 6 * scale, borderRadius: "50%", background: "#6357E8" }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
              />
            )}
            {block.text}
            {block.type === "text" && <motion.div style={{ display: "inline-block", width: 2 * scale, height: 14 * scale, background: "#6357E8", marginLeft: 4 * scale }} animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.1, repeat: Infinity }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

// Board View (Kanban)
function BoardView({ dark, scale, textColor, sub, border, bg }: any) {
  const columns = [
    { id: "backlog", title: "Backlog", color: "#8A8A80", items: ["Research competitors", "Design system audit", "API documentation"] },
    { id: "todo", title: "To Do", color: "#6357E8", items: ["New formula engine", "Mobile offline sync", "Command palette"] },
    { id: "in-progress", title: "In Progress", color: "#F59E0B", items: ["Real-time cursors", "Auth v2 migration"] },
    { id: "review", title: "Review", color: "#22C27D", items: ["Landing page redesign", "Onboarding flow"] },
    { id: "done", title: "Done", color: "#10B981", items: ["Dark mode toggle", "Keyboard shortcuts", "Export to PDF"] },
  ];

  return (
    <div style={{ display: "flex", gap: 12 * scale, height: "100%", padding: 12 * scale, overflowX: "auto" }}>
      {columns.map((col, ci) => (
        <div key={col.id} style={{ 
          flex: "0 0 220px", 
          background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)", 
          borderRadius: 12 * scale, 
          padding: 12 * scale,
          display: "flex",
          flexDirection: "column",
          minHeight: "100%"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 * scale }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 * scale }}>
              <div style={{ width: 8 * scale, height: 8 * scale, borderRadius: "50%", background: col.color }} />
              <span style={{ fontWeight: 600, fontSize: 12 * scale, color: textColor }}>{col.title}</span>
              <span style={{ fontSize: 11 * scale, color: sub, background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)", padding: "2px 8px", borderRadius: 10 * scale }}>{col.items.length}</span>
            </div>
            <button style={{ padding: "4px 8px", fontSize: 10 * scale, background: "transparent", border: `1px solid ${border}`, borderRadius: 6 * scale, color: sub, cursor: "pointer" }}>+</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 * scale, flex: 1, overflowY: "auto" }}>
            {col.items.map((item, ii) => (
              <motion.div
                key={item}
                layout
                style={{ 
                  padding: 10 * scale, 
                  background: bg, 
                  border: `1px solid ${border}`, 
                  borderRadius: 8 * scale, 
                  fontSize: 12 * scale,
                  color: textColor,
                  cursor: "grab",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
                }}
                whileHover={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)", y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div style={{ fontWeight: 500, marginBottom: 4 * scale }}>{item}</div>
                <div style={{ display: "flex", gap: 6 * scale, fontSize: 10 * scale }}>
                  <span style={{ color: "#6357E8", background: "rgba(99,87,232,0.1)", padding: "2px 6px", borderRadius: 4 * scale }}>Task</span>
                  <span style={{ color: sub }}>#123</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Table View
function TableView({ dark, scale, textColor, sub, border, bg }: any) {
  const rows = [
    { name: "Q4 Strategy", status: "In Progress", assignee: "You", due: "Oct 15", tags: ["Work", "Strategy"] },
    { name: "Deep Work Notes", status: "Done", assignee: "You", due: "Sep 28", tags: ["Reading"] },
    { name: "Kyoto Trip", status: "Planning", assignee: "You", due: "Apr 15", tags: ["Personal"] },
    { name: "Roadmap v3", status: "In Progress", assignee: "Team", due: "Mar 1", tags: ["Work", "Product"] },
    { name: "Design Review", status: "Review", assignee: "Sarah", due: "Oct 5", tags: ["Work", "Design"] },
    { name: "Sourdough Starter", status: "Active", assignee: "You", due: "Daily", tags: ["Personal"] },
    { name: "AI Agents Research", status: "Backlog", assignee: "You", due: "TBD", tags: ["Reading"] },
    { name: "Gym Log", status: "Active", assignee: "You", due: "Weekly", tags: ["Personal"] },
  ];

  const statusColors: Record<string, string> = { 
    "In Progress": "#6357E8", 
    "Done": "#10B981", 
    "Planning": "#F59E0B", 
    "Review": "#22C27D", 
    "Active": "#8B5CF6", 
    "Backlog": "#8A8A80" 
  };

  return (
    <div style={{ height: "100%", overflow: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 * scale }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${border}` }}>
            {["Name", "Status", "Assignee", "Due Date", "Tags"].map((header, i) => (
              <th key={header} style={{ 
                textAlign: "left", 
                padding: `${10 * scale}px ${12 * scale}px`, 
                fontWeight: 600, 
                fontSize: 11 * scale, 
                color: sub, 
                textTransform: "uppercase",
                letterSpacing: 0.5,
                fontFamily: "'DM Sans', sans-serif",
                whiteSpace: "nowrap"
              }}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <motion.tr key={row.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <td style={{ padding: `${10 * scale}px ${12 * scale}px`, borderBottom: `1px solid ${border}`, color: textColor, fontWeight: 500 }}>{row.name}</td>
              <td style={{ padding: `${10 * scale}px ${12 * scale}px`, borderBottom: `1px solid ${border}` }}>
                <span style={{ 
                  padding: `${4 * scale}px ${8 * scale}px`, 
                  borderRadius: 9999, 
                  fontSize: 10 * scale, 
                  fontWeight: 500,
                  background: (statusColors[row.status] || "#8A8A80") + "20",
                  color: statusColors[row.status] || "#8A8A80"
                }}>{row.status}</span>
              </td>
              <td style={{ padding: `${10 * scale}px ${12 * scale}px`, borderBottom: `1px solid ${border}`, color: sub, fontSize: 12 * scale }}>{row.assignee}</td>
              <td style={{ padding: `${10 * scale}px ${12 * scale}px`, borderBottom: `1px solid ${border}`, color: sub, fontSize: 12 * scale }}>{row.due}</td>
              <td style={{ padding: `${10 * scale}px ${12 * scale}px`, borderBottom: `1px solid ${border}` }}>
                <div style={{ display: "flex", gap: 4 * scale, flexWrap: "wrap" }}>
                  {row.tags.map((tag, ti) => (
                    <span key={tag} style={{ 
                      fontSize: 9 * scale, 
                      borderRadius: 4 * scale, 
                      padding: `${2 * scale}px ${6 * scale}px`, 
                      background: (tag === "Work" ? "#6357E8" : tag === "Reading" ? "#22C27D" : "#F59E0B") + "18", 
                      color: tag === "Work" ? "#6357E8" : tag === "Reading" ? "#22C27D" : "#F59E0B", 
                      fontWeight: 500 
                    }}>{tag}</span>
                  ))}
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Calendar View
function CalendarView({ dark, scale, textColor, sub, border, bg }: any) {
  const events = [
    { day: 1, title: "Team Standup", time: "9:00 AM", color: "#6357E8" },
    { day: 3, title: "Design Review", time: "2:00 PM", color: "#F59E0B" },
    { day: 5, title: "Sprint Planning", time: "10:00 AM", color: "#6357E8" },
    { day: 8, title: "Client Call", time: "3:00 PM", color: "#22C27D" },
    { day: 12, title: "Launch Q4 Strategy", time: "All Day", color: "#EC4899" },
    { day: 15, title: "Kyoto Trip Start", time: "All Day", color: "#F59E0B" },
    { day: 18, title: "Product Demo", time: "11:00 AM", color: "#6357E8" },
    { day: 22, title: "Retrospective", time: "4:00 PM", color: "#22C27D" },
    { day: 25, title: "Board Meeting", time: "9:00 AM", color: "#EC4899" },
    { day: 28, title: "Ship v3.0", time: "All Day", color: "#10B981" },
  ];

  const daysInMonth = 30;
  const firstDayOfWeek = 3; // Wednesday

  return (
    <div style={{ height: "100%", padding: 12 * scale, display: "flex", flexDirection: "column" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 * scale, marginBottom: 8 * scale }}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
          <div key={d} style={{ textAlign: "center", padding: `${8 * scale}px`, fontSize: 11 * scale, fontWeight: 600, color: sub, textTransform: "uppercase", letterSpacing: 0.5 }}>{d}</div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 * scale, flex: 1 }}>
        {Array.from({ length: 42 }).map((_, i) => {
          const dayNum = i - firstDayOfWeek + 1;
          const isCurrentMonth = dayNum >= 1 && dayNum <= daysInMonth;
          const dayEvents = events.filter(e => e.day === dayNum);
          const isToday = dayNum === new Date().getDate();
          
          return (
            <motion.div
              key={i}
              style={{ 
                minHeight: 80 * scale, 
                background: isCurrentMonth ? (isToday ? (dark ? "rgba(99,87,232,0.12)" : "rgba(99,87,232,0.08)") : bg) : "transparent",
                border: `1px solid ${isCurrentMonth ? border : "transparent"}`,
                borderRadius: 8 * scale,
                padding: 6 * scale,
                display: "flex",
                flexDirection: "column",
                opacity: isCurrentMonth ? 1 : 0.3
              }}
              whileHover={{ zIndex: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ 
                textAlign: "right", 
                fontSize: 11 * scale, 
                fontWeight: isToday ? 700 : 400, 
                color: isToday ? "#6357E8" : (isCurrentMonth ? textColor : sub),
                marginBottom: 4 * scale
              }}>
                {isCurrentMonth ? dayNum : ""}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 * scale, flex: 1, overflow: "hidden" }}>
                {dayEvents.slice(0, 3).map((event, ei) => (
                  <div key={ei} style={{ 
                    padding: `${4 * scale}px ${6 * scale}px`, 
                    borderRadius: 4 * scale, 
                    fontSize: 9 * scale, 
                    fontWeight: 500,
                    background: event.color + "20",
                    color: event.color,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    cursor: "pointer",
                    transition: "transform 0.15s"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  title={`${event.title} - ${event.time}`}
                  >
                    {event.time !== "All Day" && <span style={{ fontSize: 8 * scale, opacity: 0.7, marginRight: 4 * scale }}>{event.time}</span>}
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div style={{ 
                    padding: `${2 * scale}px ${6 * scale}px`, 
                    fontSize: 9 * scale, 
                    color: sub, 
                    textAlign: "center",
                    background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                    borderRadius: 4 * scale
                  }}>
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function Hero() {
  const { dark } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const mockupScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";

return (
    <section ref={containerRef} className="overflow-hidden" style={{ position: "relative", minHeight: "100vh", paddingTop: 140, paddingBottom: 80 }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,0.03)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.03)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px)`, backgroundSize: "72px 72px", zIndex: 1 }} />
      <div className="absolute pointer-events-none" style={{ top: -80, right: -80, width: 700, height: 700, background: "radial-gradient(circle, rgba(99,87,232,0.14) 0%, transparent 65%)", borderRadius: "50%", zIndex: 1 }} />
      <div className="absolute pointer-events-none" style={{ bottom: 0, left: -100, width: 500, height: 500, background: "radial-gradient(circle, rgba(99,87,232,0.08) 0%, transparent 65%)", borderRadius: "50%", zIndex: 1 }} />

      <motion.div style={{ opacity, position: 'relative', zIndex: 10 }} className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeUp delay={0.05} className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border" style={{ padding: "7px 18px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: "#6357E8", background: "rgba(99,87,232,0.08)", borderColor: "rgba(99,87,232,0.22)" }}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#6357E8]" /> Free forever — no credit card needed <ChevronRight size={13} />
          </div>
        </FadeUp>

        <div className="text-center mb-8" style={{ lineHeight: 0.92 }}>
          <RevealLine delay={0.1}>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95 }}>Think clearly.</h1>
          </RevealLine>
          <RevealLine delay={0.18}>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#6357E8", lineHeight: 0.95, marginTop: "0.06em" }}>Note freely.</h1>
          </RevealLine>
        </div>

        <FadeUp delay={0.42} className="text-center mb-12">
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2vw, 1.25rem)", color: sub, maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
            A distraction-free workspace for docs, notes, databases, and wikis. One tool. Everything you need. Forever free.
          </p>
        </FadeUp>

        <FadeUp delay={0.54} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20">
          <Link to="/signup" className="rounded-full flex items-center gap-2 group transition-all duration-300 hover:gap-3"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "15px 30px", background: "#6357E8", color: "white", textDecoration: "none" }}>
            Get NoteFlow free <ArrowRight size={16} />
          </Link>
          <Link to="/docs" className="rounded-full flex items-center gap-2 transition-all duration-300"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "15px 30px", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(14,14,12,0.14)"}`, color: fg, textDecoration: "none" }}>
            <FileText size={15} /> Read the docs
          </Link>
        </FadeUp>

        <div className="flex justify-center">
          <motion.div style={{ y: mockupY, scale: mockupScale, perspective: 1400 }}>
            <motion.div initial={{ rotateX: 22, rotateY: -10, opacity: 0, scale: 0.93 }} animate={{ rotateX: 7, rotateY: -6, opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.65, ease: EASE }} style={{ transformStyle: "preserve-3d" }}
              whileHover={{ rotateX: 3, rotateY: -3, transition: { duration: 0.5 } }}>
              <div className="relative">
                <div className="absolute pointer-events-none" style={{ bottom: -30, left: "10%", right: "10%", height: 60, background: "radial-gradient(ellipse, rgba(99,87,232,0.3) 0%, transparent 70%)", filter: "blur(16px)" }} />
                <AppMockup dark={dark} scale={1.1} />
              </div>
            </motion.div>
          </motion.div>
        </div>

        <FadeUp delay={0.9} className="flex justify-center mt-12">
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub }}>
            Trusted by teams at{" "}
            {["Figma", "Linear", "Vercel", "Stripe"].map((co, i) => (
              <span key={co}><strong style={{ color: dark ? "#5A5A52" : "#A8A8A0" }}>{co}</strong>{i < 3 ? ", " : ""}</span>
            ))}
          </p>
        </FadeUp>
      </motion.div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

const notionFeatures = [
  { icon: FileText, label: "Docs", color: "#6357E8", title: "Write anything, beautifully", desc: "Rich text with Markdown shortcuts, code blocks, callouts, and toggles. The most powerful editor that stays out of your way." },
  { icon: Database, label: "Databases", color: "#22C27D", title: "Databases with a soul", desc: "Every database is also a page. Add properties, filters, sorts, and formulas. Link between databases. Build the exact system you need." },
  { icon: LayoutGrid, label: "Board view", color: "#F59E0B", title: "Kanban without the chaos", desc: "Drag and drop tasks across columns. Group by any property. Every card is a full page with notes, checklists, and attachments." },
  { icon: Table2, label: "Table view", color: "#EC4899", title: "Spreadsheet meets document", desc: "Inline editing, multi-select, relation fields, rollup calculations. All the power of a spreadsheet without leaving your notes." },
  { icon: Calendar, label: "Calendar", color: "#6357E8", title: "Plan your time visually", desc: "Switch any database to calendar view. Drag events to reschedule. Filter by assignee, tag, or status." },
  { icon: BookOpen, label: "Wiki", color: "#22C27D", title: "One home for team knowledge", desc: "Nested pages with infinite depth. Verification badges so you always know what's current." },
  { icon: Layers, label: "Templates", color: "#F59E0B", title: "Start from a proven structure", desc: "Thousands of community templates — from meeting notes to project trackers. One click, ready to go." },
  { icon: Globe, label: "Publish to web", color: "#EC4899", title: "Share a link, share the world", desc: "Every note and database can become a public webpage in one toggle." },
  { icon: Link2, label: "Relations", color: "#6357E8", title: "Connect everything", desc: "Link any two databases with a relation field. Pull data across with rollups. Build relational systems, no code needed." },
];

function FeatureGrid() {
  const { dark } = useTheme();
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const cardBg = dark ? "#141412" : "#FFFFFF";
  const borderColor = dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.08)";

  return (
    <section style={{ padding: "140px 0", background: dark ? "#0A0A08" : "#F7F6F2" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeUp className="flex items-center gap-3 mb-6"><div className="h-px bg-[#6357E8]" style={{ width: 28 }} /><span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Features</span></FadeUp>
        <div className="mb-20">
          <RevealLine><h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 7vw, 6.5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 0.95 }}>Every tool</h2></RevealLine>
          <RevealLine delay={0.1}><h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 7vw, 6.5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#6357E8", lineHeight: 0.95 }}>you actually use.</h2></RevealLine>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden" style={{ border: `1px solid ${borderColor}`, background: borderColor }}>
          {notionFeatures.map((f, i) => (
            <FadeUp key={f.label} delay={i * 0.06}>
              <motion.div whileHover={{ scale: 1.015 }} transition={{ duration: 0.25 }} className="h-full flex flex-col" style={{ padding: 32, background: cardBg, cursor: "default" }}>
                <div className="rounded-xl flex items-center justify-center mb-6" style={{ width: 46, height: 46, background: f.color + "16" }}>
                  <f.icon size={21} style={{ color: f.color }} />
                </div>
                <div className="flex items-center gap-2 mb-2"><span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, color: f.color, letterSpacing: "0.06em", textTransform: "uppercase" }}>{f.label}</span></div>
                <h3 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg, marginBottom: 8, letterSpacing: "-0.01em" }}>{f.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.7 }}>{f.desc}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Showcase row ─────────────────────────────────────────────────────────────

function ShowcaseRow({ reverse = false, icon: Icon, tag, tagColor, headline, subText, bullets }: {
  reverse?: boolean; icon: React.ElementType; tag: string; tagColor: string; headline: string[]; subText: string; bullets: string[];
}) {
  const { dark } = useTheme();
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const card = dark ? "#141412" : "#FFFFFF";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.09)";

  return (
    <div className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-16`} style={{ marginBottom: 140 }}>
      <div className="flex-1">
        <FadeUp className="flex items-center gap-2 mb-6">
          <div style={{ width: 36, height: 36, borderRadius: 10, background: tagColor + "18", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={17} style={{ color: tagColor }} /></div>
          <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: tagColor, letterSpacing: "0.09em", textTransform: "uppercase" }}>{tag}</span>
        </FadeUp>
        {headline.map((line, i) => (
          <RevealLine key={i} delay={0.08 + i * 0.1}>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(2.2rem, 4.5vw, 4rem)", fontWeight: 800, letterSpacing: "-0.035em", color: i % 2 === 0 ? fg : tagColor, lineHeight: 0.95, marginBottom: "0.05em" }}>{line}</h2>
          </RevealLine>
        ))}
        <FadeUp delay={0.25}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: sub, lineHeight: 1.75, maxWidth: 440, margin: "20px 0 24px" }}>{subText}</p></FadeUp>
        <FadeUp delay={0.32}>
          <div className="flex flex-col gap-3">
            {bullets.map(b => (
              <div key={b} className="flex items-start gap-3">
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: tagColor + "18", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}><Check size={10} style={{ color: tagColor }} /></div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.6 }}>{b}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
      <SlideIn from={reverse ? "left" : "right"} delay={0.15} className="flex-1 flex justify-center">
        <div className="relative w-full max-w-lg">
          <div className="rounded-2xl overflow-hidden shadow-xl border" style={{ border: `1px solid ${border}`, background: card, padding: 24, minHeight: 260 }}>
            <div className="flex items-center gap-2 mb-4">
              <Icon size={16} style={{ color: tagColor }} />
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 15, fontWeight: 700, color: fg }}>{tag}</span>
              <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
                {["Filter", "Sort"].map(a => <div key={a} className="rounded-md" style={{ padding: "4px 10px", background: dark ? "rgba(255,255,255,0.06)" : "rgba(14,14,12,0.06)", fontSize: 11, color: sub, fontFamily: "'DM Sans', sans-serif" }}>{a}</div>)}
              </div>
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg" style={{ padding: "10px 8px", background: i === 1 ? (dark ? "rgba(99,87,232,0.1)" : "rgba(99,87,232,0.06)") : "transparent", marginBottom: 4 }}>
                <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${i < 2 ? tagColor : (dark ? "rgba(255,255,255,0.12)" : "rgba(14,14,12,0.15)")}`, background: i < 2 ? tagColor : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {i < 2 && <Check size={9} style={{ color: "white" }} />}
                </div>
                <div style={{ flex: 1, height: 10, borderRadius: 99, background: dark ? "rgba(255,255,255,0.06)" : "rgba(14,14,12,0.07)", maxWidth: `${60 + i * 8}%` }} />
                <div style={{ width: 48, height: 10, borderRadius: 99, background: tagColor + "30" }} />
              </div>
            ))}
          </div>
        </div>
      </SlideIn>
    </div>
  );
}

function Showcases() {
  const { dark } = useTheme();
  return (
    <section style={{ padding: "140px 0 0", background: dark ? "#0E0E0C" : "#FFFFFF" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <ShowcaseRow icon={Database} tag="Databases" tagColor="#22C27D" headline={["Build any system.", "No code needed."]} subText="Tables, boards, calendars, timelines, galleries — every view is powered by the same database. Switch instantly, keep all your data." bullets={["Relation and rollup fields for cross-database linking", "Formulas for calculated properties", "Filter and sort rules that save and share"]} />
        <ShowcaseRow reverse icon={BookOpen} tag="Wiki" tagColor="#F59E0B" headline={["Team knowledge,", "finally findable."]} subText="Nested pages with a sidebar that mirrors your hierarchy. Verification badges. Breadcrumbs. Full-text search across every page." bullets={["Mark pages as verified — or out of date", "Nested up to any depth, with backlinks", "Import from Confluence, Notion, or Markdown"]} />
        <ShowcaseRow icon={LayoutGrid} tag="Boards" tagColor="#EC4899" headline={["Kanban that feels", "native, not bolted on."]} subText="Every card is a full page. Drag across columns. Group by any property. The board updates in real time across your whole team." bullets={["Subtasks with their own boards", "Custom column colors and limits", "Archive and reopen cards without losing history"]} />
      </div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────

function Stats() {
  const { dark } = useTheme();
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const borderColor = dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.08)";
  const stats = [
    { value: "40ms", label: "Median search latency" }, { value: "99.97%", label: "Uptime last 12 months" },
    { value: "2.4M", label: "Notes captured daily" }, { value: "184+", label: "Countries with users" },
  ];
  return (
    <section style={{ borderTop: `1px solid ${borderColor}`, borderBottom: `1px solid ${borderColor}`, padding: "80px 0", background: dark ? "#0E0E0C" : "#F7F6F2" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <FadeUp key={s.label} delay={i * 0.07} className="text-center">
            <RevealLine delay={i * 0.06}>
              <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
            </RevealLine>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub }}>{s.label}</div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// ─── Pricing ─────────────────────────────────────────────────────────────────

function Pricing() {
  const { dark } = useTheme();
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const card = dark ? "#141412" : "#FFFFFF";
  const borderColor = dark ? "rgba(255,255,255,0.08)" : "rgba(14,14,12,0.09)";
  const included = ["Unlimited notes and pages", "Unlimited databases", "All views — table, board, calendar, gallery", "Web publishing", "Nested pages (infinite depth)", "Real-time collaboration (up to 10 guests)", "Templates library", "File uploads (up to 5 MB each)", "Desktop and mobile apps", "Markdown import and export", "API access", "Community support"];

  return (
    <section style={{ padding: "140px 0", background: dark ? "#0A0A08" : "#F7F6F2" }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
        <FadeUp className="flex items-center justify-center gap-3 mb-6"><div className="h-px bg-[#6357E8]" style={{ width: 28 }} /><span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6357E8", letterSpacing: "0.1em", textTransform: "uppercase" }}>Pricing</span><div className="h-px bg-[#6357E8]" style={{ width: 28 }} /></FadeUp>
        <RevealLine><h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 800, letterSpacing: "-0.045em", color: fg, lineHeight: 0.92, marginBottom: "0.12em" }}>Free.</h2></RevealLine>
        <RevealLine delay={0.1}><h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 800, letterSpacing: "-0.045em", color: "#6357E8", lineHeight: 0.92 }}>Forever.</h2></RevealLine>
        <FadeUp delay={0.25}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: sub, maxWidth: 480, margin: "24px auto 48px", lineHeight: 1.65 }}>No trials. No paywalls. No credit card. NoteFlow is completely free — now and always.</p></FadeUp>
        <FadeUp delay={0.3}>
          <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }} className="rounded-2xl border text-left" style={{ padding: 40, background: card, borderColor, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #6357E8, #22C27D)" }} />
            <div className="flex items-end gap-3 mb-2">
              <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 800, letterSpacing: "-0.04em", color: fg, lineHeight: 1 }}>$0</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: sub, marginBottom: 12 }}>/month, forever</span>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: sub, marginBottom: 32 }}>Everything included. No hidden upgrades.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
              {included.map(item => (
                <div key={item} className="flex items-center gap-2.5">
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(99,87,232,0.14)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><Check size={10} style={{ color: "#6357E8" }} /></div>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub }}>{item}</span>
                </div>
              ))}
            </div>
            <Link to="/signup" className="inline-flex items-center gap-2 rounded-full group transition-all duration-300"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, padding: "14px 32px", background: "#6357E8", color: "white", textDecoration: "none" }}>
              Create your free account <ArrowRight size={15} />
            </Link>
          </motion.div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────

function CTABanner() {
  const { dark } = useTheme();
  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#6E6E68" : "#8A8A80";
  const bg = dark ? "#0E0E0C" : "#F7F6F2";
  return (
    <section style={{ padding: "140px 0", background: bg, overflow: "hidden", position: "relative" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(${dark ? "rgba(255,255,255,0.025)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.025)" : "rgba(14,14,12,0.04)"} 1px, transparent 1px)`, backgroundSize: "64px 64px" }} />
      <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative">
        <RevealLine><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: fg, lineHeight: 0.92 }}>Start today.</div></RevealLine>
        <RevealLine delay={0.1}><div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(3.5rem, 10vw, 9rem)", fontWeight: 800, letterSpacing: "-0.045em", color: "#6357E8", lineHeight: 0.92 }}>It&apos;s free.</div></RevealLine>
        <FadeUp delay={0.25}><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: sub, maxWidth: 440, margin: "28px auto 40px", lineHeight: 1.65 }}>No credit card. No trial. Just a better place to think and work.</p></FadeUp>
        <FadeUp delay={0.35} className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/signup" className="rounded-full flex items-center gap-2 group transition-all duration-300"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", background: "#6357E8", color: "white", textDecoration: "none" }}>
            Get NoteFlow free <ArrowRight size={15} />
          </Link>
          <Link to="/docs" className="rounded-full transition-all duration-300"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 34px", border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(14,14,12,0.14)"}`, color: fg, textDecoration: "none" }}>
            Read the docs
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

const footerLinks = {
  Product: [
    { label: "Features", to: "/features" },
    { label: "Pricing", to: "/pricing" },
    { label: "Changelog", to: "/changelog" },
    { label: "Roadmap", to: "/roadmap" },
    { label: "Status", to: "/status" },
  ],
  Resources: [
    { label: "Docs", to: "/docs" },
    { label: "API Reference", to: "/api-reference" },
    { label: "Templates", to: "/templates" },
    { label: "Community", to: "/community" },
  ],
  Company: [
    { label: "About", to: "/about" },
    { label: "Blog", to: "/blog" },
    { label: "Careers", to: "/careers" },
    { label: "Press Kit", to: "/press-kit" },
  ],
  Legal: [
    { label: "Privacy", to: "/privacy" },
    { label: "Terms", to: "/terms" },
    { label: "Cookie Policy", to: "/cookie-policy" },
    { label: "Security", to: "/security" },
  ],
};

function Footer() {
  const { dark } = useTheme();
  const sub = "#8A8A80";
  const borderColor = "rgba(255,255,255,0.07)";

  return (
    <footer style={{ background: "#0A0A08", padding: "80px 0 40px" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="rounded-lg bg-[#6357E8] flex items-center justify-center" style={{ width: 34, height: 34 }}><PenLine size={16} className="text-white" /></div>
              <span className="font-bold tracking-tight text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18 }}>NoteFlow</span>
            </div>
            <FadeUp><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: sub, lineHeight: 1.75, maxWidth: 240 }}>A free workspace for docs, databases, and wikis. Think clearly. Note freely.</p></FadeUp>
          </div>
          {Object.entries(footerLinks).map(([group, links], gi) => (
            <div key={group}>
              <FadeUp delay={gi * 0.05}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "white", marginBottom: 16 }}>{group}</div>
                <div className="flex flex-col gap-2.5">
                  {links.map((link, li) => (
                    <RevealLine key={link.to} delay={gi * 0.03 + li * 0.025}>
                      <a href={link.to} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub, display: "block", textDecoration: "none" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "white")}
                        onMouseLeave={e => (e.currentTarget.style.color = sub)}>
                        {link.label}
                      </a>
                    </RevealLine>
                  ))}
                </div>
              </FadeUp>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: `1px solid ${borderColor}` }}>
          <RevealLine><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: sub }}>© 2025 NoteFlow, Inc. · Free forever · Made with care</span></RevealLine>
          <FadeUp><div className="flex items-center gap-2" style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: sub }}><div className="w-1.5 h-1.5 rounded-full bg-[#22C27D]" />All systems operational</div></FadeUp>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Landing() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <Hero />
      <FeatureGrid />
      <Showcases />
      <Stats />
      <Pricing />
      <CTABanner />
      <Footer />
    </div>
  );
}
