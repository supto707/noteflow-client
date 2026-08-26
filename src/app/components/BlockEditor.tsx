import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import EditorBlock, { type EditorBlockData, type BlockType } from "./EditorBlock";
import { useTheme } from "../context/ThemeContext";

interface BlockEditorProps {
  initialContent?: string;
  pageId: string;
  onSave: (blocks: EditorBlockData[]) => void;
  readOnly?: boolean;
}

let blockCounter = 0;
function generateBlockId(): string {
  blockCounter++;
  return `block_${Date.now()}_${blockCounter}`;
}

function parseContentToBlocks(content: string): EditorBlockData[] {
  if (!content || content.trim() === "") {
    return [{ id: generateBlockId(), type: "text", content: "" }];
  }
  
  const lines = content.split("\n");
  const blocks: EditorBlockData[] = [];
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    if (trimmed.startsWith("## ")) {
      blocks.push({ id: generateBlockId(), type: "heading2", content: trimmed.slice(3) });
    } else if (trimmed.startsWith("### ")) {
      blocks.push({ id: generateBlockId(), type: "heading3", content: trimmed.slice(4) });
    } else if (trimmed.startsWith("# ")) {
      blocks.push({ id: generateBlockId(), type: "heading1", content: trimmed.slice(2) });
    } else if (trimmed.startsWith("- [ ] ")) {
      blocks.push({ id: generateBlockId(), type: "todo", content: trimmed.slice(6), checked: false });
    } else if (trimmed.startsWith("- [x] ")) {
      blocks.push({ id: generateBlockId(), type: "todo", content: trimmed.slice(6), checked: true });
    } else if (trimmed.startsWith("- ")) {
      blocks.push({ id: generateBlockId(), type: "bullet_list_item", content: trimmed.slice(2) });
    } else if (trimmed.startsWith("> ")) {
      blocks.push({ id: generateBlockId(), type: "quote", content: trimmed.slice(2) });
    } else if (trimmed.startsWith("```")) {
      blocks.push({ id: generateBlockId(), type: "code", content: "" });
    } else if (trimmed.startsWith("---")) {
      blocks.push({ id: generateBlockId(), type: "divider", content: "" });
    } else if (trimmed === "") {
      continue;
    } else {
      blocks.push({ id: generateBlockId(), type: "text", content: line });
    }
  }
  
  if (blocks.length === 0) {
    blocks.push({ id: generateBlockId(), type: "text", content: "" });
  }
  
  return blocks;
}

function blocksToContent(blocks: EditorBlockData[]): string {
  return blocks.map(block => {
    switch (block.type) {
      case "heading1": return `# ${block.content}`;
      case "heading2": return `## ${block.content}`;
      case "heading3": return `### ${block.content}`;
      case "bullet_list_item": return `- ${block.content}`;
      case "numbered_list_item": return `1. ${block.content}`;
      case "todo": return block.checked ? `- [x] ${block.content}` : `- [ ] ${block.content}`;
      case "quote": return `> ${block.content}`;
      case "code": return `\`\`\`\n${block.content}\n\`\`\``;
      case "callout": return `> 💡 ${block.content}`;
      case "divider": return "---";
      case "image": return `![alt](${block.content})`;
      default: return block.content;
    }
  }).join("\n");
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function BlockEditor({ initialContent, pageId, onSave, readOnly }: BlockEditorProps) {
  const { dark } = useTheme();
  const [blocks, setBlocks] = useState<EditorBlockData[]>(() => 
    parseContentToBlocks(initialContent || "")
  );
  const [focusedBlockId, setFocusedBlockId] = useState<string | null>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initialLoadRef = useRef(true);

  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";

  // Auto-save with debounce
  useEffect(() => {
    if (initialLoadRef.current) {
      initialLoadRef.current = false;
      return;
    }
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }
    saveTimerRef.current = setTimeout(() => {
      onSave(blocks);
    }, 1000);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [blocks, onSave]);

  // Update blocks when pageId changes (new page selected)
  useEffect(() => {
    initialLoadRef.current = true;
    setBlocks(parseContentToBlocks(initialContent || ""));
    setFocusedBlockId(null);
  }, [pageId]);

  const handleBlockChange = useCallback((id: string, content: string) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, content } : b));
  }, []);

  const handleTypeChange = useCallback((id: string, type: BlockType) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, type, content: b.content } : b));
  }, []);

  const handleDelete = useCallback((id: string) => {
    setBlocks(prev => {
      if (prev.length <= 1) {
        return [{ id: generateBlockId(), type: "text", content: "" }];
      }
      return prev.filter(b => b.id !== id);
    });
  }, []);

  const handleAddBelow = useCallback((id: string) => {
    const newBlock: EditorBlockData = {
      id: generateBlockId(),
      type: "text",
      content: "",
    };
    setBlocks(prev => {
      const idx = prev.findIndex(b => b.id === id);
      const next = [...prev];
      next.splice(idx + 1, 0, newBlock);
      return next;
    });
    setTimeout(() => {
      setFocusedBlockId(newBlock.id);
    }, 0);
  }, []);

  const handleMoveUp = useCallback((id: string) => {
    setBlocks(prev => {
      const idx = prev.findIndex(b => b.id === id);
      if (idx <= 0) return prev;
      const next = [...prev];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
  }, []);

  const handleMoveDown = useCallback((id: string) => {
    setBlocks(prev => {
      const idx = prev.findIndex(b => b.id === id);
      if (idx >= prev.length - 1) return prev;
      const next = [...prev];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next;
    });
  }, []);

  const handleDuplicate = useCallback((id: string) => {
    setBlocks(prev => {
      const idx = prev.findIndex(b => b.id === id);
      if (idx === -1) return prev;
      const original = prev[idx];
      const duplicate: EditorBlockData = {
        ...original,
        id: generateBlockId(),
      };
      const next = [...prev];
      next.splice(idx + 1, 0, duplicate);
      return next;
    });
  }, []);

  const handleFocusNext = useCallback((id: string) => {
    setBlocks(prev => {
      const idx = prev.findIndex(b => b.id === id);
      if (idx < prev.length - 1) {
        setFocusedBlockId(prev[idx + 1].id);
      }
      return prev;
    });
  }, []);

  const handleFocusPrev = useCallback((id: string) => {
    setBlocks(prev => {
      const idx = prev.findIndex(b => b.id === id);
      if (idx > 0) {
        setFocusedBlockId(prev[idx - 1].id);
      }
      return prev;
    });
  }, []);

  const handleIndent = useCallback((id: string) => {
    setBlocks(prev => prev.map(b => 
      b.id === id ? { ...b, meta: { ...b.meta, indent: (b.meta?.indent || 0) + 1 } } : b
    ));
  }, []);

  const handleOutdent = useCallback((id: string) => {
    setBlocks(prev => prev.map(b => 
      b.id === id ? { ...b, meta: { ...b.meta, indent: Math.max(0, (b.meta?.indent || 0) - 1) } } : b
    ));
  }, []);

  const handleCheckToggle = useCallback((id: string, checked: boolean) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, checked } : b));
  }, []);

  const handleToggleExpand = useCallback((id: string) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, expanded: !b.expanded } : b));
  }, []);

  const handleColorChange = useCallback((id: string, color: string) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, color } : b));
  }, []);

  const handleAddBlockAtEnd = useCallback(() => {
    const newBlock: EditorBlockData = {
      id: generateBlockId(),
      type: "text",
      content: "",
    };
    setBlocks(prev => [...prev, newBlock]);
    setTimeout(() => {
      setFocusedBlockId(newBlock.id);
    }, 0);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <AnimatePresence mode="popLayout">
        {blocks.map((block, index) => (
          <motion.div
            key={block.id}
            layout
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.15, ease: EASE }}
          >
            <EditorBlock
              block={block}
              onChange={handleBlockChange}
              onTypeChange={handleTypeChange}
              onDelete={handleDelete}
              onAddBelow={handleAddBelow}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
              onDuplicate={handleDuplicate}
              onFocusNext={handleFocusNext}
              onFocusPrev={handleFocusPrev}
              onIndent={handleIndent}
              onOutdent={handleOutdent}
              onCheckToggle={handleCheckToggle}
              onToggleExpand={handleToggleExpand}
              onColorChange={handleColorChange}
              isFirst={index === 0}
              isLast={index === blocks.length - 1}
              indentLevel={block.meta?.indent || 0}
              autoFocus={block.id === focusedBlockId}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {blocks.length === 0 && (
        <div
          onClick={handleAddBlockAtEnd}
          style={{
            padding: "12px 0",
            fontSize: 14,
            color: dark ? "rgba(255,255,255,0.15)" : "rgba(14,14,12,0.2)",
            cursor: "text",
            fontStyle: "italic",
          }}
        >
          Click to add a block, or type / for commands
        </div>
      )}

      <div
        className="flex items-center gap-2"
        style={{
          padding: "8px 0",
          opacity: 0.4,
          transition: "opacity 0.15s",
          cursor: "pointer",
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "0.4")}
        onClick={handleAddBlockAtEnd}
      >
        <div style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: dark ? "rgba(255,255,255,0.08)" : "rgba(14,14,12,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M5 1V9M1 5H9" stroke={sub} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <span style={{ fontSize: 12, color: sub }}>Add a block</span>
      </div>
    </div>
  );
}

export { parseContentToBlocks, blocksToContent };