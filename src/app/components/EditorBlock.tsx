import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { GripVertical, Plus, Trash2, ArrowUp, ArrowDown, Copy, Type, Heading1, Heading2, Heading3, List, ListOrdered, CheckSquare, Quote, Code, Minus, AlertCircle, Image as ImageIcon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export type BlockType = "text" | "heading1" | "heading2" | "heading3" | "bullet_list_item" | "numbered_list_item" | "todo" | "quote" | "code" | "callout" | "divider" | "image";

export interface EditorBlockData {
  id: string;
  type: BlockType;
  content: string;
  checked?: boolean;
  expanded?: boolean;
  meta?: Record<string, any>;
}

interface EditorBlockProps {
  block: EditorBlockData;
  onChange: (id: string, content: string) => void;
  onTypeChange: (id: string, type: BlockType) => void;
  onDelete: (id: string) => void;
  onAddBelow: (id: string, type?: BlockType, content?: string, checked?: boolean) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  onDuplicate: (id: string) => void;
  onFocusNext: (id: string) => void;
  onFocusPrev: (id: string) => void;
  onIndent: (id: string) => void;
  onOutdent: (id: string) => void;
  onCheckToggle: (id: string, checked: boolean) => void;
  isFirst: boolean;
  isLast: boolean;
  indentLevel: number;
  listNumber: number;
  autoFocus?: boolean;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function EditorBlock({
  block, onChange, onTypeChange, onDelete, onAddBelow,
  onMoveUp, onMoveDown, onDuplicate, onFocusNext, onFocusPrev,
  onIndent, onOutdent, onCheckToggle,
  isFirst, isLast, indentLevel, listNumber, autoFocus
}: EditorBlockProps) {
  const { dark } = useTheme();
  const [showHandle, setShowHandle] = useState(false);
  const [showBlockMenu, setShowBlockMenu] = useState(false);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashFilter, setSlashFilter] = useState("");
  const [slashIndex, setSlashIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const blockMenuRef = useRef<HTMLDivElement>(null);
  const slashMenuRef = useRef<HTMLDivElement>(null);
  const suppressSync = useRef(false);

  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.08)";
  const hoverBg = dark ? "rgba(255,255,255,0.04)" : "rgba(14,14,12,0.03)";
  const cardBg = dark ? "#1A1A18" : "#FFFFFF";
  const accent = "#6357E8";

  // Sync content from props to DOM only when content changes externally
  useEffect(() => {
    if (contentRef.current && !suppressSync.current) {
      const currentText = contentRef.current.textContent || "";
      if (currentText !== block.content) {
        contentRef.current.textContent = block.content;
      }
    }
    suppressSync.current = false;
  }, [block.content]);

  // Auto-focus
  useEffect(() => {
    if (autoFocus && contentRef.current) {
      contentRef.current.focus();
      const sel = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(contentRef.current);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [autoFocus]);

  // Close menus on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (blockMenuRef.current && !blockMenuRef.current.contains(e.target as Node)) setShowBlockMenu(false);
      if (slashMenuRef.current && !slashMenuRef.current.contains(e.target as Node)) setShowSlashMenu(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Reset slash menu index when filter changes
  useEffect(() => {
    setSlashIndex(0);
  }, [slashFilter]);

  const slashCommands = [
    { type: "text" as BlockType, label: "Text", icon: Type, description: "Plain text" },
    { type: "heading1" as BlockType, label: "Heading 1", icon: Heading1, description: "Large heading" },
    { type: "heading2" as BlockType, label: "Heading 2", icon: Heading2, description: "Medium heading" },
    { type: "heading3" as BlockType, label: "Heading 3", icon: Heading3, description: "Small heading" },
    { type: "bullet_list_item" as BlockType, label: "Bullet list", icon: List, description: "Bulleted list" },
    { type: "numbered_list_item" as BlockType, label: "Numbered list", icon: ListOrdered, description: "Numbered list" },
    { type: "todo" as BlockType, label: "To-do", icon: CheckSquare, description: "Checkbox list" },
    { type: "quote" as BlockType, label: "Quote", icon: Quote, description: "Block quote" },
    { type: "callout" as BlockType, label: "Callout", icon: AlertCircle, description: "Highlighted callout" },
    { type: "code" as BlockType, label: "Code", icon: Code, description: "Code block" },
    { type: "divider" as BlockType, label: "Divider", icon: Minus, description: "Horizontal divider" },
    { type: "image" as BlockType, label: "Image", icon: ImageIcon, description: "Embed image" },
  ];

  const filteredSlash = slashCommands.filter(cmd =>
    cmd.label.toLowerCase().includes(slashFilter.toLowerCase())
  );

  const handleInput = useCallback(() => {
    if (contentRef.current) {
      const text = contentRef.current.textContent || "";
      suppressSync.current = true;
      onChange(block.id, text);
    }
  }, [block.id, onChange]);

  // Markdown shortcuts: convert block type as you type prefixes
  const applyMarkdownShortcut = useCallback((text: string): boolean => {
    const shortcuts: Array<{ prefix: string; type: BlockType; consumes: string }> = [
      { prefix: "# ", type: "heading1", consumes: "# " },
      { prefix: "## ", type: "heading2", consumes: "## " },
      { prefix: "### ", type: "heading3", consumes: "### " },
      { prefix: "- ", type: "bullet_list_item", consumes: "- " },
      { prefix: "* ", type: "bullet_list_item", consumes: "* " },
      { prefix: "1. ", type: "numbered_list_item", consumes: "1. " },
      { prefix: "[] ", type: "todo", consumes: "[] " },
      { prefix: "[ ] ", type: "todo", consumes: "[ ] " },
      { prefix: "> ", type: "quote", consumes: "> " },
      { prefix: "``` ", type: "code", consumes: "``` " },
      { prefix: "--- ", type: "divider", consumes: "--- " },
    ];
    for (const sc of shortcuts) {
      if (text.startsWith(sc.prefix)) {
        const rest = text.slice(sc.prefix.length);
        onTypeChange(block.id, sc.type);
        suppressSync.current = true;
        onChange(block.id, rest);
        if (contentRef.current) contentRef.current.textContent = rest;
        return true;
      }
    }
    return false;
  }, [block.id, onChange, onTypeChange]);

  const handleSlashSelect = useCallback((type: BlockType) => {
    onTypeChange(block.id, type);
    setShowSlashMenu(false);
    setSlashFilter("");
    if (contentRef.current) contentRef.current.textContent = "";
    suppressSync.current = true;
    onChange(block.id, "");
    contentRef.current?.focus();
  }, [block.id, onTypeChange, onChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const el = contentRef.current;
    if (!el) return;

    // Slash menu navigation
    if (showSlashMenu) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSlashIndex(prev => Math.min(prev + 1, filteredSlash.length - 1));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSlashIndex(prev => Math.max(prev - 1, 0));
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const cmd = filteredSlash[slashIndex];
        if (cmd) handleSlashSelect(cmd.type);
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setShowSlashMenu(false);
        return;
      }
    }

    const selection = window.getSelection();
    const textContent = el.textContent || "";

    let isAtStart = true;
    let isAtEnd = true;
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(el);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      const caretOffset = preCaretRange.toString().length;
      isAtStart = caretOffset === 0;
      isAtEnd = caretOffset >= textContent.length;
    }

    // Markdown shortcut: trigger on space when block content + space matches a prefix
    if (e.key === " " && textContent.length > 0) {
      const converted = applyMarkdownShortcut(textContent + " ");
      if (converted) {
        e.preventDefault();
        return;
      }
    }

    const isListType = block.type === "bullet_list_item" || block.type === "numbered_list_item" || block.type === "todo";

    // Enter: continue lists, else new block
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      if (isListType) {
        if (textContent.trim() === "") {
          // Empty list item: convert back to text (Notion behavior)
          onTypeChange(block.id, "text");
          suppressSync.current = true;
          onChange(block.id, "");
          if (contentRef.current) contentRef.current.textContent = "";
        } else {
          onAddBelow(block.id, block.type, "", block.type === "todo" ? false : undefined);
        }
      } else if (block.type === "code") {
        // In code blocks, Enter inserts a line break instead of new block
        document.execCommand("insertText", false, "\n");
      } else {
        onAddBelow(block.id);
      }
      return;
    }

    // Backspace: convert non-text blocks to text before deleting
    if (e.key === "Backspace" && isAtStart) {
      if (block.type !== "text" && textContent.length === 0) {
        e.preventDefault();
        onTypeChange(block.id, "text");
        return;
      }
      if (block.type !== "text" && isAtStart && textContent.length > 0) {
        // Caret at start of non-empty non-text block: convert to text first
        e.preventDefault();
        onTypeChange(block.id, "text");
        return;
      }
      if (textContent.length === 0) {
        e.preventDefault();
        onDelete(block.id);
        onFocusPrev(block.id);
        return;
      }
    }

    if (e.key === "ArrowUp" && isAtStart) {
      e.preventDefault();
      onFocusPrev(block.id);
      return;
    }

    if (e.key === "ArrowDown" && isAtEnd) {
      e.preventDefault();
      onFocusNext(block.id);
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      if (e.shiftKey) onOutdent(block.id);
      else onIndent(block.id);
      return;
    }

    // Inline formatting
    if ((e.ctrlKey || e.metaKey) && (e.key === "b" || e.key === "i" || e.key === "e")) {
      e.preventDefault();
      e.stopPropagation();
      if (e.key === "b") document.execCommand("bold");
      else if (e.key === "i") document.execCommand("italic");
      else if (e.key === "e") document.execCommand("code");
      return;
    }

    // Slash command
    if (e.key === "/" && isAtStart) {
      setTimeout(() => {
        const val = contentRef.current?.textContent || "";
        if (val === "/" || val.startsWith("/")) {
          setShowSlashMenu(true);
          setSlashFilter(val.substring(1));
        }
      }, 10);
    }
  }, [block.id, block.type, onAddBelow, onDelete, onFocusPrev, onFocusNext, onIndent, onOutdent, onTypeChange, onChange, showSlashMenu, slashIndex, filteredSlash.length, applyMarkdownShortcut, handleSlashSelect]);

  const handleKeyUp = useCallback((e: React.KeyboardEvent) => {
    if (showSlashMenu && contentRef.current) {
      const val = contentRef.current.textContent || "";
      if (val.startsWith("/")) setSlashFilter(val.substring(1));
      else { setShowSlashMenu(false); setSlashFilter(""); }
    }
  }, [showSlashMenu]);


  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  }, []);

  const blockMenuItems = [
    { label: "Duplicate", icon: Copy, action: () => { onDuplicate(block.id); setShowBlockMenu(false); } },
    { label: "Delete", icon: Trash2, action: () => { onDelete(block.id); setShowBlockMenu(false); }, danger: true },
    { type: "separator" as const },
    { label: "Move up", icon: ArrowUp, action: () => { onMoveUp(block.id); setShowBlockMenu(false); }, disabled: isFirst },
    { label: "Move down", icon: ArrowDown, action: () => { onMoveDown(block.id); setShowBlockMenu(false); }, disabled: isLast },
  ];


  const commonContentEditableProps = {
    ref: contentRef,
    contentEditable: true as const,
    suppressContentEditableWarning: true,
    onInput: handleInput,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    onPaste: handlePaste,
    onFocus: () => setShowHandle(true),
    onBlur: () => setTimeout(() => { if (!showBlockMenu) setShowHandle(false); }, 200),
    style: {
      outline: "none",
      padding: "3px 0",
      minHeight: "1.4em",
      cursor: "text",
      wordBreak: "break-word" as const,
    },
  };

  const renderBlockContent = () => {
    switch (block.type) {
      case "heading1":
        return (
          <div
            {...commonContentEditableProps}
            style={{
              ...commonContentEditableProps.style,
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
              fontWeight: 800,
              color: fg,
              letterSpacing: "-0.02em",
              lineHeight: 1.3,
            }}
          />
        );
      case "heading2":
        return (
          <div
            {...commonContentEditableProps}
            style={{
              ...commonContentEditableProps.style,
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              fontWeight: 700,
              color: fg,
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
            }}
          />
        );
      case "heading3":
        return (
          <div
            {...commonContentEditableProps}
            style={{
              ...commonContentEditableProps.style,
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
              fontWeight: 600,
              color: fg,
              lineHeight: 1.4,
            }}
          />
        );
      case "bullet_list_item":
        return (
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <span style={{ color: accent, fontSize: 14, marginTop: 6, flexShrink: 0, userSelect: "none" }}>•</span>
            <div
              {...commonContentEditableProps}
              style={{
                ...commonContentEditableProps.style,
                flex: 1,
                fontSize: 14,
                color: fg,
                lineHeight: 1.7,
              }}
            />
          </div>
        );
      case "numbered_list_item":
        return (
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <span style={{ color: sub, fontSize: 14, marginTop: 6, flexShrink: 0, minWidth: 20, fontFamily: "'Geist Mono', monospace", userSelect: "none" }}>{listNumber}.</span>
            <div
              {...commonContentEditableProps}
              style={{
                ...commonContentEditableProps.style,
                flex: 1,
                fontSize: 14,
                color: fg,
                lineHeight: 1.7,
              }}
            />
          </div>
        );
      case "todo":
        return (
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <input
              type="checkbox"
              checked={block.checked || false}
              onChange={(e) => onCheckToggle(block.id, e.target.checked)}
              style={{ marginTop: 6, width: 16, height: 16, accentColor: accent, cursor: "pointer", flexShrink: 0 }}
            />
            <div
              {...commonContentEditableProps}
              style={{
                ...commonContentEditableProps.style,
                flex: 1,
                fontSize: 14,
                color: block.checked ? sub : fg,
                lineHeight: 1.7,
                textDecoration: block.checked ? "line-through" : "none",
              }}
            />
          </div>
        );
      case "quote":
        return (
          <div style={{ borderLeft: `3px solid ${accent}`, paddingLeft: 16, margin: "4px 0" }}>
            <div
              {...commonContentEditableProps}
              style={{
                ...commonContentEditableProps.style,
                fontSize: 15,
                color: dark ? "#C0C0B8" : "#3A3A38",
                lineHeight: 1.7,
                fontStyle: "italic",
              }}
            />
          </div>
        );
      case "code":
        return (
          <div style={{
            background: dark ? "rgba(255,255,255,0.04)" : "rgba(14,14,12,0.04)",
            borderRadius: 8, padding: "12px 16px", margin: "4px 0", border: `1px solid ${border}`,
          }}>
            <div
              {...commonContentEditableProps}
              style={{
                ...commonContentEditableProps.style,
                fontSize: 13, color: fg, lineHeight: 1.6, fontFamily: "'Geist Mono', monospace", whiteSpace: "pre-wrap",
              }}
            />
          </div>
        );
      case "callout":
        return (
          <div style={{
            display: "flex", gap: 12, background: dark ? "rgba(99,87,232,0.08)" : "rgba(99,87,232,0.06)",
            borderRadius: 8, padding: "12px 16px", margin: "4px 0", border: `1px solid ${accent}20`,
          }}>
            <span style={{ fontSize: 18, flexShrink: 0, marginTop: 2, userSelect: "none" }}>💡</span>
            <div
              {...commonContentEditableProps}
              style={{
                ...commonContentEditableProps.style,
                flex: 1, fontSize: 14, color: fg, lineHeight: 1.7,
              }}
            />
          </div>
        );
      case "divider":
        return (
          <div style={{ padding: "8px 0", cursor: "pointer", userSelect: "none" }}>
            <div style={{ height: 1, background: border }} />
          </div>
        );
      case "image":
        return (
          <div style={{
            padding: "8px 0", textAlign: "center", background: dark ? "rgba(255,255,255,0.02)" : "rgba(14,14,12,0.02)",
            borderRadius: 8, border: `1px dashed ${border}`, minHeight: 80, display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {block.content ? (
              <img src={block.content} alt="" style={{ maxWidth: "100%", borderRadius: 4 }} />
            ) : (
              <span style={{ fontSize: 13, color: sub }}>Add image URL or paste</span>
            )}
          </div>
        );
      default: // text
        return (
          <div
            {...commonContentEditableProps}
            style={{
              ...commonContentEditableProps.style,
              fontSize: 14, color: fg, lineHeight: 1.8,
            }}
          />
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.15, ease: EASE }}
      className="group relative"
      style={{ paddingLeft: indentLevel * 24, position: "relative" }}
      onMouseEnter={() => setShowHandle(true)}
      onMouseLeave={() => { if (!showBlockMenu) setShowHandle(false); }}
    >
      {/* Drag handle */}
      <div className="absolute flex items-center" style={{ left: indentLevel * 24 - 28, top: 0, bottom: 0, opacity: showHandle ? 1 : 0, transition: "opacity 0.15s" }}>
        <button onClick={() => setShowBlockMenu(!showBlockMenu)} style={{ width: 24, height: 24, background: "none", border: "none", color: sub, cursor: "pointer", borderRadius: 4 }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = hoverBg)}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "none")}>
          <GripVertical size={14} />
        </button>
      </div>

      {/* Add block below */}
      <div className="absolute flex items-center justify-center" style={{ left: indentLevel * 24 - 14, top: -10, opacity: 0, transition: "opacity 0.15s", zIndex: 10 }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "0")}>
        <button onClick={() => onAddBelow(block.id)} style={{ width: 20, height: 20, background: accent, border: "none", color: "white", cursor: "pointer", borderRadius: "50%", boxShadow: "0 2px 8px rgba(99,87,232,0.3)" }}>
          <Plus size={10} />
        </button>
      </div>

      {/* Block menu */}
      {showBlockMenu && (
        <div ref={blockMenuRef} style={{ position: "absolute", left: indentLevel * 24 - 28, top: 28, zIndex: 50, width: 200, background: cardBg, border: `1px solid ${border}`, borderRadius: 10, boxShadow: "0 8px 32px rgba(0,0,0,0.2)", overflow: "hidden", padding: "4px" }}>
          {blockMenuItems.map((item, i) => {
            if ("type" in item && item.type === "separator") return <div key={i} style={{ height: 1, background: border, margin: "4px 8px" }} />;
            if ("action" in item) {
              const menuItem = item as typeof blockMenuItems[0] & { action: () => void; disabled?: boolean; danger?: boolean };
              return (
                <button key={i} onClick={menuItem.action} disabled={menuItem.disabled}
                  style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "7px 10px", background: "none", border: "none", cursor: menuItem.disabled ? "default" : "pointer", color: menuItem.danger ? "#EF4444" : (menuItem.disabled ? sub : fg), fontSize: 13, borderRadius: 6, textAlign: "left", opacity: menuItem.disabled ? 0.4 : 1 }}
                  onMouseEnter={e => { if (!menuItem.disabled) (e.currentTarget as HTMLElement).style.background = hoverBg; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "none"; }}>
                  <menuItem.icon size={14} /> {menuItem.label}
                </button>
              );
            }
            return null;
          })}
        </div>
      )}

      {/* Slash command menu */}
      {showSlashMenu && (
        <div ref={slashMenuRef} style={{ position: "absolute", left: indentLevel * 24, top: "100%", zIndex: 50, width: 260, maxHeight: 320, background: cardBg, border: `1px solid ${border}`, borderRadius: 10, boxShadow: "0 8px 32px rgba(0,0,0,0.2)", overflow: "hidden" }}>
          <div style={{ padding: "8px 12px 4px", fontSize: 10, fontWeight: 600, color: sub, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Geist Mono', monospace" }}>Basic blocks</div>
          <div style={{ maxHeight: 280, overflowY: "auto", scrollbarWidth: "none" }}>
            {filteredSlash.length === 0 && (
              <div style={{ padding: "12px", fontSize: 13, color: sub }}>No results</div>
            )}
            {filteredSlash.map((cmd, i) => {
              const Icon = cmd.icon;
              const isSelected = i === slashIndex;
              return (
                <button key={cmd.type} onClick={() => handleSlashSelect(cmd.type)}
                  style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "8px 12px", background: isSelected ? hoverBg : "none", border: "none", cursor: "pointer", textAlign: "left", transition: "background 0.1s" }}
                  onMouseEnter={() => setSlashIndex(i)}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: dark ? "rgba(255,255,255,0.06)" : "rgba(14,14,12,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={15} style={{ color: isSelected ? accent : sub }} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: isSelected ? accent : fg, lineHeight: 1.3 }}>{cmd.label}</div>
                    <div style={{ fontSize: 11, color: sub, lineHeight: 1.3 }}>{cmd.description}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Block content */}
      {renderBlockContent()}
    </motion.div>
  );
}