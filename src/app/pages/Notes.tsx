import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import { Plus, Search, Tag, Clock, Star, MoreHorizontal, Bold, Italic, Code, List, Hash, Link2, Image, FileText, GripVertical, Trash2, Copy, ArrowUp, ArrowDown, Type, Heading1, Heading2, Heading3, ListOrdered, CheckSquare, Quote, Minus, AlertCircle } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { getUserWorkspace, getPages, getPageById, createPage, updatePageTitle, createBlock, replacePageBlocks, trashPage } from "../../lib/api";
import type { Page, Block } from "../../lib/api";
import BlockEditor from "../components/BlockEditor";
import type { EditorBlockData, BlockType } from "../components/EditorBlock";
import { blocksToContent, parseContentToBlocks } from "../components/BlockEditor";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Notes() {
  const { dark } = useTheme();
  const { user } = useAuth();
  const [activeTag, setActiveTag] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<{ id: string; title: string; content: string; updated_at: string } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  // Helper to decode block content (strip metadata prefix)
  function decodeBlockContent(block: Block): { content: string; checked?: boolean; indent: number } {
    const raw = block.content || "";
    const metaMatch = raw.match(/^__BLOCK_META__(\{.*?\})__\n/);
    if (metaMatch) {
      try {
        const meta = JSON.parse(metaMatch[1]);
        return {
          content: raw.slice(metaMatch[0].length),
          checked: meta.checked,
          indent: meta.indent || 0,
        };
      } catch {
        return { content: raw, indent: 0 };
      }
    }
    return { content: raw, indent: 0 };
  }

  // Helper to get plain content from blocks (for initialContent)
  function getBlocksContent(blocks: Block[]): string {
    return blocks.map(b => decodeBlockContent(b).content).join("\n");
  }

  useEffect(() => {
    if (!user) return;
    getUserWorkspace(user.id).then(wsId => {
      if (wsId) getPages(wsId).then(data => {
        setPages(data);
        if (data.length > 0) {
          getPageById(data[0].id).then(pageData => {
            if (pageData) {
              const content = getBlocksContent(pageData.blocks || []);
              setSelected({ id: pageData.id, title: pageData.title, content, updated_at: pageData.updated_at });
              setEditContent(content);
            }
          });
        }
        setLoading(false);
      });
    });
  }, [user]);

  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const card = dark ? "#141412" : "#FFFFFF";
  const panelBg = dark ? "#111110" : "#FAFAF8";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.08)";
  const hoverBg = dark ? "rgba(255,255,255,0.04)" : "rgba(14,14,12,0.03)";
  const activeBg = dark ? "rgba(99,87,232,0.12)" : "rgba(99,87,232,0.07)";

  const filtered = pages.filter(p =>
    (activeTag === "All") &&
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  async function handleSelect(page: Page) {
    const pageData = await getPageById(page.id);
    if (pageData) {
      const content = getBlocksContent(pageData.blocks || []);
      setSelected({ id: pageData.id, title: pageData.title, content, updated_at: pageData.updated_at });
      setEditContent(content);
      setIsEditing(false);
    }
  }

  async function handleNewNote() {
    if (!user) return;
    const wsId = await getUserWorkspace(user.id);
    if (wsId) {
      const pageId = await createPage(wsId, user.id, "Untitled");
      if (pageId) {
        // Create an initial empty block
        await createBlock(pageId, user.id, "text", "", 0);
        handleSelect({ id: pageId, title: "Untitled", updated_at: new Date().toISOString() } as Page);
        setPages(prev => [{ id: pageId, title: "Untitled", workspace_id: wsId, icon: null, is_published: false, is_trashed: false, created_by: user.id, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }, ...prev]);
      }
    }
  }

  async function handleDeleteNote() {
    if (!selected) return;
    await trashPage(selected.id);
    const remaining = pages.filter(p => p.id !== selected.id);
    setPages(remaining);
    if (remaining.length > 0) {
      handleSelect(remaining[0]);
    } else {
      setSelected(null);
    }
  }

  const handleSaveBlocks = useCallback(async (blocks: EditorBlockData[]) => {
    if (!selected || !user) return;
    setIsSaving(true);
    
    try {
      const content = blocksToContent(blocks);

      // Encode metadata (checked, indent) into content using a special delimiter
      const encodedBlocks = blocks.map((block, i) => {
        const metaStr = JSON.stringify({
          checked: block.checked,
          indent: block.meta?.indent || 0
        });
        return {
          type: block.type,
          content: `__BLOCK_META__${metaStr}__\n${block.content}`,
          position: i,
        };
      });
      await replacePageBlocks(selected.id, encodedBlocks);

      setEditContent(content);
      setLastSaved(new Date());
    } catch (err) {
      console.error("Error saving blocks:", err);
    } finally {
      setIsSaving(false);
    }
  }, [selected, user]);

  const handleTitleSave = useCallback(async () => {
    if (!selected) return;
    const newTitle = titleValue.trim() || "Untitled";
    await updatePageTitle(selected.id, newTitle);
    setSelected(prev => prev ? { ...prev, title: newTitle } : null);
    setPages(prev => prev.map(p => p.id === selected.id ? { ...p, title: newTitle } : p));
    setEditingTitle(false);
  }, [selected, titleValue]);

  return (
    <div className="flex h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Sidebar */}
      <div className="flex flex-col flex-shrink-0 border-r" style={{ width: 280, background: panelBg, borderColor: border }}>
        <div style={{ padding: "20px 16px 12px" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, color: fg }}>Notes</h2>
            <button className="rounded-lg flex items-center justify-center transition-colors"
              style={{ width: 28, height: 28, background: "#6357E8", border: "none", cursor: "pointer" }}
              onClick={handleNewNote}>
              <Plus size={14} className="text-white" />
            </button>
          </div>
          <div className="flex items-center gap-2 rounded-lg" style={{ padding: "8px 12px", background: dark ? "rgba(255,255,255,0.05)" : "rgba(14,14,12,0.06)", border: `1px solid ${border}` }}>
            <Search size={12} style={{ color: sub, flexShrink: 0 }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search notes…"
              style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 13, color: fg, fontFamily: "'DM Sans', sans-serif" }} />
          </div>
        </div>

        <div className="flex gap-1.5 overflow-x-auto px-4 pb-3" style={{ scrollbarWidth: "none" }}>
          {["All"].map(t => (
            <button key={t} onClick={() => setActiveTag(t)}
              className="rounded-full flex-shrink-0 transition-all duration-150"
              style={{ padding: "4px 12px", fontSize: 12, fontWeight: 500, border: "none", cursor: "pointer", background: activeTag === t ? "#6357E8" : (dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.07)"), color: activeTag === t ? "white" : sub }}>
              {t}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          {filtered.map(page => (
            <motion.div key={page.id} whileHover={{ x: 2 }}
              onClick={() => handleSelect(page)}
              className="cursor-pointer border-b"
              style={{ padding: "14px 16px", borderColor: border, background: selected?.id === page.id ? activeBg : "transparent" }}>
              <div className="flex items-start justify-between gap-1 mb-2">
                <span style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 14, fontWeight: 600, color: fg, lineHeight: 1.3, flex: 1 }}>
                  {page.title}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <span style={{ fontSize: 10, color: sub }}>
                  {new Date(page.updated_at).toLocaleDateString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col min-w-0" style={{ background: card }}>
        {selected ? (
          <>
            {/* Toolbar */}
            <div className="flex items-center gap-2 border-b flex-shrink-0" style={{ padding: "12px 28px", borderColor: border }}>
              <div className="flex items-center gap-1 mr-2">
                {[Bold, Italic, Code].map((Icon, i) => (
                  <button key={i} className="rounded-md flex items-center justify-center transition-colors"
                    style={{ width: 28, height: 28, background: "none", border: "none", color: sub, cursor: "pointer" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = hoverBg)}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "none")}
                    onClick={() => {
                      // Focus the first editable block and apply formatting
                      const firstBlock = document.querySelector('[contenteditable="true"]') as HTMLElement;
                      if (firstBlock) {
                        firstBlock.focus();
                        const cmd = i === 0 ? "bold" : i === 1 ? "italic" : "code";
                        document.execCommand(cmd);
                      }
                    }}>
                    <Icon size={13} />
                  </button>
                ))}
              </div>
              <div style={{ width: 1, height: 18, background: border }} />
              <div className="flex items-center gap-1">
                {[List, Hash, Link2, Image].map((Icon, i) => (
                  <button key={i} className="rounded-md flex items-center justify-center transition-colors"
                    style={{ width: 28, height: 28, background: "none", border: "none", color: sub, cursor: "pointer" }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = hoverBg)}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "none")}>
                    <Icon size={13} />
                  </button>
                ))}
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span style={{ fontSize: 11, color: sub, fontFamily: "'Geist Mono', monospace" }}>
                  {isSaving ? "Saving…" : lastSaved ? `Saved · ${lastSaved.toLocaleTimeString()}` : `Saved · ${new Date(selected.updated_at).toLocaleDateString()}`}
                </span>
                <button className="rounded-md flex items-center justify-center transition-colors"
                  style={{ width: 28, height: 28, background: "none", border: "none", color: sub, cursor: "pointer" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = hoverBg)}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "none")}
                  onClick={handleDeleteNote}
                  title="Delete note">
                  <Trash2 size={13} />
                </button>
                <button className="rounded-lg flex items-center gap-1.5 transition-colors"
                  style={{ padding: "5px 12px", background: "#6357E8", border: "none", color: "white", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>
                  Share
                </button>
                <button style={{ background: "none", border: "none", color: sub, cursor: "pointer" }}>
                  <MoreHorizontal size={15} />
                </button>
              </div>
            </div>

            {/* Editor content */}
            <div className="flex-1 overflow-y-auto" style={{ padding: "40px 64px 80px", scrollbarWidth: "none" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1.5" style={{ fontSize: 12, color: sub }}>
                  <Clock size={11} /> {new Date(selected.updated_at).toLocaleDateString()}
                </div>
              </div>

              {/* Editable title */}
              {editingTitle ? (
                <input
                  ref={titleRef}
                  autoFocus
                  value={titleValue}
                  onChange={e => setTitleValue(e.target.value)}
                  onBlur={handleTitleSave}
                  onKeyDown={e => {
                    if (e.key === "Enter") handleTitleSave();
                    if (e.key === "Escape") { setEditingTitle(false); setTitleValue(selected.title); }
                  }}
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                    fontWeight: 800,
                    color: fg,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.15,
                    marginBottom: 24,
                    background: "none",
                    border: "none",
                    outline: "none",
                    width: "100%",
                  }}
                />
              ) : (
                <h1
                  onClick={() => { setEditingTitle(true); setTitleValue(selected.title); }}
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                    fontWeight: 800,
                    color: fg,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.15,
                    marginBottom: 24,
                    cursor: "text",
                  }}
                >
                  {selected.title}
                </h1>
              )}

              {/* Block Editor */}
              <BlockEditor
                key={selected.id}
                pageId={selected.id}
                initialContent={editContent}
                onSave={handleSaveBlocks}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div style={{ textAlign: "center", color: sub }}>
              <FileText size={40} style={{ opacity: 0.3, margin: "0 auto 12px" }} />
              <p style={{ fontSize: 15 }}>No notes yet. Create one to get started.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}