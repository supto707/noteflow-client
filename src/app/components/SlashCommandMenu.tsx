import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heading1, Heading2, Heading3, List, ListOrdered, CheckSquare,
  Quote, Code, Minus, Image, AlertCircle, Type
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export interface SlashCommand {
  id: string;
  label: string;
  description: string;
  icon: typeof Heading1;
  prefix: string;
  category: string;
}

export const SLASH_COMMANDS: SlashCommand[] = [
  { id: "text", label: "Text", description: "Plain text paragraph", icon: Type, prefix: "", category: "Basic" },
  { id: "h1", label: "Heading 1", description: "Large section heading", icon: Heading1, prefix: "# ", category: "Basic" },
  { id: "h2", label: "Heading 2", description: "Medium section heading", icon: Heading2, prefix: "## ", category: "Basic" },
  { id: "h3", label: "Heading 3", description: "Small section heading", icon: Heading3, prefix: "### ", category: "Basic" },
  { id: "bullet", label: "Bullet List", description: "Create a bulleted list", icon: List, prefix: "- ", category: "Lists" },
  { id: "numbered", label: "Numbered List", description: "Create a numbered list", icon: ListOrdered, prefix: "1. ", category: "Lists" },
  { id: "todo", label: "To-do", description: "Track tasks with a to-do list", icon: CheckSquare, prefix: "- [ ] ", category: "Lists" },
  { id: "quote", label: "Quote", description: "Capture a quote", icon: Quote, prefix: "> ", category: "Blocks" },
  { id: "code", label: "Code", description: "Insert a code block", icon: Code, prefix: "```\n", category: "Blocks" },
  { id: "divider", label: "Divider", description: "Visual separator between blocks", icon: Minus, prefix: "---\n", category: "Blocks" },
  { id: "callout", label: "Callout", description: "Make writing stand out", icon: AlertCircle, prefix: "> 💡 ", category: "Blocks" },
  { id: "image", label: "Image", description: "Upload or embed an image", icon: Image, prefix: "![alt](", category: "Media" },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface SlashCommandMenuProps {
  open: boolean;
  onClose: () => void;
  onSelect: (command: SlashCommand) => void;
  position: { top: number; left: number };
  filter: string;
}

export default function SlashCommandMenu({ open, onClose, onSelect, position, filter }: SlashCommandMenuProps) {
  const { dark } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const cardBg = dark ? "#1A1A18" : "#FFFFFF";
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(14,14,12,0.1)";
  const hoverBg = dark ? "rgba(99,87,232,0.12)" : "rgba(99,87,232,0.07)";
  const accent = "#6357E8";

  const filtered = SLASH_COMMANDS.filter(cmd =>
    cmd.label.toLowerCase().includes(filter.toLowerCase()) ||
    cmd.description.toLowerCase().includes(filter.toLowerCase())
  );

  // Group by category
  const grouped = filtered.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, SlashCommand[]>);

  const flatFiltered = Object.values(grouped).flat();

  useEffect(() => {
    setSelectedIndex(0);
  }, [filter]);

  useEffect(() => {
    if (!listRef.current) return;
    const selectedEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(i => (i + 1) % flatFiltered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(i => (i - 1 + flatFiltered.length) % flatFiltered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (flatFiltered[selectedIndex]) {
        onSelect(flatFiltered[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  }, [open, flatFiltered, selectedIndex, onSelect, onClose]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!open) return null;

  let itemIndex = -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.15, ease: EASE }}
          style={{
            position: "fixed",
            top: position.top,
            left: position.left,
            zIndex: 100,
            width: 280,
            maxHeight: 340,
            background: cardBg,
            border: `1px solid ${border}`,
            borderRadius: 12,
            boxShadow: "0 8px 32px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "8px 8px 4px", fontSize: 10, fontWeight: 600, color: sub, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Geist Mono', monospace", paddingLeft: 12 }}>
            Blocks
          </div>
          <div ref={listRef} style={{ maxHeight: 300, overflowY: "auto", scrollbarWidth: "none" }}>
            {Object.entries(grouped).map(([category, commands]) => (
              <div key={category}>
                <div style={{ padding: "6px 12px 4px", fontSize: 10, fontWeight: 600, color: sub, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "'Geist Mono', monospace" }}>
                  {category}
                </div>
                {commands.map((cmd) => {
                  itemIndex++;
                  const idx = itemIndex;
                  const isSelected = idx === selectedIndex;
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      data-index={idx}
                      onClick={() => onSelect(cmd)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        width: "100%",
                        padding: "8px 12px",
                        background: isSelected ? hoverBg : "transparent",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "background 0.1s",
                      }}
                    >
                      <div style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: isSelected ? accent + "20" : (dark ? "rgba(255,255,255,0.06)" : "rgba(14,14,12,0.06)"),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        <Icon size={15} style={{ color: isSelected ? accent : sub }} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: fg, lineHeight: 1.3 }}>
                          {cmd.label}
                        </div>
                        <div style={{ fontSize: 11, color: sub, lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {cmd.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
            {flatFiltered.length === 0 && (
              <div style={{ padding: "16px 12px", textAlign: "center", fontSize: 13, color: sub }}>
                No results
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function getCaretPosition(textarea: HTMLTextAreaElement): { top: number; left: number } {
  const text = textarea.value.substring(0, textarea.selectionStart);
  const lines = text.split("\n");
  const currentLine = lines.length - 1;
  const currentCol = lines[currentLine].length;

  const style = window.getComputedStyle(textarea);
  const lineHeight = parseFloat(style.lineHeight) || 24;
  const fontSize = parseFloat(style.fontSize) || 14;
  const paddingLeft = parseFloat(style.paddingLeft) || 0;
  const paddingTop = parseFloat(style.paddingTop) || 0;

  const rect = textarea.getBoundingClientRect();
  const scrollTop = textarea.scrollTop;

  return {
    top: rect.top + paddingTop + (currentLine * lineHeight) - scrollTop + lineHeight + 4,
    left: rect.left + paddingLeft + (currentCol * fontSize * 0.6) + 4,
  };
}
