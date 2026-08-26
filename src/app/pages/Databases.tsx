import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Table2, LayoutGrid, Calendar, List, Filter, ArrowUpDown, ChevronDown, Trash2, Copy, X, GripVertical, PlusCircle, AlertCircle, CheckCircle, Info, Pencil } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import {
  getUserWorkspace, getDatabases, getDatabaseRecords as getRecords,
  createDatabaseRecord, createDatabase, createDatabaseColumn,
  setRecordValue, deleteDatabaseRecord, deleteDatabaseColumn, renameDatabase
} from "../../lib/api";
import type { DatabaseColumn, DatabaseRecordWithValues } from "../../lib/api";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const STATUS_OPTIONS = ["Not started", "In progress", "Done", "Blocked"];
const PRIORITY_OPTIONS = ["Low", "Medium", "High", "Urgent"];

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  "Not started": { bg: "rgba(138,138,128,0.15)", text: "#8A8A80" },
  "In progress": { bg: "rgba(99,87,232,0.15)", text: "#6357E8" },
  "Done": { bg: "rgba(34,194,125,0.15)", text: "#22C27D" },
  "Blocked": { bg: "rgba(239,68,68,0.15)", text: "#EF4444" },
};

const PRIORITY_COLORS: Record<string, string> = {
  "Low": "#8A8A80",
  "Medium": "#F59E0B",
  "High": "#6357E8",
  "Urgent": "#EF4444",
};

const VIEWS = [
  { label: "Table", icon: Table2 },
  { label: "Board", icon: LayoutGrid },
  { label: "Calendar", icon: Calendar },
  { label: "List", icon: List },
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

function PropertyDropdown({
  value, options, colors, columnId, recordId, onSave, dark, onClose
}: {
  value: string; options: string[]; colors?: Record<string, string | { bg: string; text: string }>;
  columnId: string; recordId: string; onSave: (recordId: string, columnId: string, value: string) => Promise<void>;
  dark: boolean; onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const cardBg = dark ? "#1A1A18" : "#FFFFFF";
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(14,14,12,0.1)";
  const hoverBg = dark ? "rgba(255,255,255,0.05)" : "rgba(14,14,12,0.05)";

  return (
    <div ref={ref} className="fixed z-50 rounded-xl shadow-2xl overflow-hidden"
      style={{ width: 200, background: cardBg, border: `1px solid ${border}`, padding: "4px" }}>
      {options.map(opt => {
        const isSelected = opt === value;
        return (
          <button key={opt} onClick={() => { onSave(recordId, columnId, opt); onClose(); }}
            style={{
              display: "flex", alignItems: "center", gap: 8, width: "100%",
              padding: "7px 10px", background: isSelected ? hoverBg : "none",
              border: "none", cursor: "pointer", borderRadius: 6, fontSize: 13, color: fg,
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = hoverBg)}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = isSelected ? hoverBg : "none")}
          >
            {options.includes("Not started") ? (
              <span className="rounded-full" style={{ width: 8, height: 8, background: (STATUS_COLORS[opt]?.text) || "#8A8A80", flexShrink: 0 }} />
            ) : (
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: PRIORITY_COLORS[opt] || "#8A8A80", flexShrink: 0 }} />
            )}
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export default function Databases() {
  const { dark } = useTheme();
  const { user } = useAuth();
  const [view, setView] = useState("Table");
  const [columns, setColumns] = useState<DatabaseColumn[]>([]);
  const [records, setRecords] = useState<DatabaseRecordWithValues[]>([]);
  const [dbName, setDbName] = useState("Product Tasks");
  const [loading, setLoading] = useState(true);
  const [allDatabases, setAllDatabases] = useState<any[]>([]);
  const [activeDbId, setActiveDbId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editField, setEditField] = useState("");
  const [editValue, setEditValue] = useState("");
  const [openDropdown, setOpenDropdown] = useState<{ recordId: string; columnId: string; field: string; elRect: DOMRect } | null>(null);
  const [contextMenu, setContextMenu] = useState<{ recordId: string; x: number; y: number } | null>(null);
  const [editingDbTitle, setEditingDbTitle] = useState(false);
  const [dbTitleValue, setDbTitleValue] = useState("");
  const dbTitleRef = useRef<HTMLInputElement>(null);
  const [addingColumn, setAddingColumn] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fg = dark ? "#E8E8E0" : "#0E0E0C";
  const sub = dark ? "#8A8A80" : "#6E6E68";
  const card = dark ? "#141412" : "#FFFFFF";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(14,14,12,0.08)";
  const hoverBg = dark ? "rgba(255,255,255,0.035)" : "rgba(14,14,12,0.025)";
  const headBg = dark ? "#0E0E0C" : "#F7F6F2";

  // Notification timer
  useEffect(() => {
    if (notification) {
      const t = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(t);
    }
  }, [notification]);

  function notify(type: "success" | "error", message: string) {
    setNotification({ type, message });
    if (type === "error") console.error(message);
  }

  const loadData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const wsId = await getUserWorkspace(user.id);
      if (!wsId) { setLoading(false); notify("error", "No workspace found"); return; }
      const dbs = await getDatabases(wsId);
      setAllDatabases(dbs as any[]);
      if (dbs.length > 0) {
        setDbName(dbs[0].name);
        setActiveDbId(dbs[0].id);
        const result = await getRecords(dbs[0].id);
        setColumns(result.columns);
        setRecords(result.records);
      }
    } catch (err: any) {
      notify("error", `Load error: ${err.message}`);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => { loadData(); }, [loadData]);

  async function handleNewRow() {
    if (!activeDbId || !user) { notify("error", "No active database"); return; }
    try {
      const recordId = await createDatabaseRecord(activeDbId, user.id, records.length);
      if (recordId) {
        if (columns.length > 0) {
          await setRecordValue(recordId, columns[0].id, "Untitled");
        }
        const vals: Record<string, string> = {};
        if (columns.length > 0) vals[columns[0].name] = "Untitled";
        setRecords(prev => [...prev, { id: recordId, database_id: activeDbId, position: prev.length, created_at: new Date().toISOString(), values: vals }]);
      }
    } catch (err: any) {
      notify("error", `Failed to add row: ${err.message}`);
    }
  }

  async function handleNewDatabase() {
    if (!user) { notify("error", "Please log in"); return; }
    try {
      const wsId = await getUserWorkspace(user.id);
      if (!wsId) { notify("error", "No workspace"); return; }
      const dbId = await createDatabase(wsId, user.id, "New Database");
      if (!dbId) { notify("error", "Failed to create database - check console"); return; }
      const col1 = await createDatabaseColumn(dbId, "Title", "text", 0);
      const col2 = await createDatabaseColumn(dbId, "Status", "select", 1);
      const col3 = await createDatabaseColumn(dbId, "Priority", "select", 2);
      if (!col1) notify("error", "Failed to create Title column");
      setAllDatabases(prev => [...prev, { id: dbId, name: "New Database", workspace_id: wsId, created_by: user.id, created_at: new Date().toISOString() } as any]);
      setActiveDbId(dbId);
      setDbName("New Database");
      const result = await getRecords(dbId);
      setColumns(result.columns);
      setRecords(result.records);
      notify("success", "Database created successfully");
    } catch (err: any) {
      notify("error", `Failed to create database: ${err.message}`);
    }
  }

  async function switchDatabase(dbId: string) {
    if (!dbId || dbId === activeDbId) return;
    setLoading(true);
    try {
      const result = await getRecords(dbId);
      const db = allDatabases.find(d => d.id === dbId);
      setDbName(db?.name || "Database");
      setActiveDbId(dbId);
      setColumns(result.columns);
      setRecords(result.records);
    } catch (err: any) {
      notify("error", `Failed to switch database: ${err.message}`);
    }
    setLoading(false);
  }

  async function handleRenameSave() {
    if (!activeDbId) { setEditingDbTitle(false); return; }
    const newName = dbTitleValue.trim();
    setEditingDbTitle(false);
    if (!newName || newName === dbName) return;
    try {
      await renameDatabase(activeDbId, newName);
      setAllDatabases(prev => prev.map(d => d.id === activeDbId ? { ...d, name: newName } : d));
      setDbName(newName);
      notify("success", "Database renamed");
    } catch (err: any) {
      notify("error", `Failed to rename: ${err.message}`);
    }
  }

  async function handleSaveCell(recordId: string, columnId: string, value: string) {
    try {
      await setRecordValue(recordId, columnId, value);
      const col = columns.find(c => c.id === columnId);
      setRecords(prev => prev.map(r => r.id === recordId ? { ...r, values: { ...r.values, [col?.name || columnId]: value } } : r));
    } catch (err: any) {
      notify("error", `Failed to save: ${err.message}`);
    }
  }

  async function handleDeleteRow(recordId: string) {
    try {
      await deleteDatabaseRecord(recordId);
      setRecords(prev => prev.filter(r => r.id !== recordId));
    } catch (err: any) {
      notify("error", `Failed to delete: ${err.message}`);
    }
    setContextMenu(null);
  }

  async function handleDuplicateRow(recordId: string) {
    if (!activeDbId || !user) return;
    try {
      const original = records.find(r => r.id === recordId);
      if (!original) return;
      const newId = await createDatabaseRecord(activeDbId, user.id, records.length);
      if (newId) {
        for (const col of columns) {
          const val = original.values[col.name];
          if (val) await setRecordValue(newId, col.id, val);
        }
        const result = await getRecords(activeDbId);
        setRecords(result.records);
      }
    } catch (err: any) {
      notify("error", `Failed to duplicate: ${err.message}`);
    }
    setContextMenu(null);
  }

  async function handleAddColumn() {
    if (!activeDbId || !newColumnName.trim()) return;
    try {
      const colId = await createDatabaseColumn(activeDbId, newColumnName.trim(), "text", columns.length);
      if (colId) {
        const newCol: DatabaseColumn = { id: colId, database_id: activeDbId, name: newColumnName.trim(), type: "text", options: null, position: columns.length };
        setColumns(prev => [...prev, newCol]);
        setNewColumnName("");
        setAddingColumn(false);
      }
    } catch (err: any) {
      notify("error", `Failed to add column: ${err.message}`);
    }
  }

  async function handleDeleteColumn(columnId: string) {
    try {
      await deleteDatabaseColumn(columnId);
      setColumns(prev => prev.filter(c => c.id !== columnId));
    } catch (err: any) {
      notify("error", `Failed to delete column: ${err.message}`);
    }
  }

  const statusValues = [...new Set(records.map(r => r.values["Status"] || r.values["status"] || "Not started"))];
  const boardCols = statusValues.length > 0 ? statusValues : ["Not started", "In progress", "Done"];
  const prependColumns = ["Title", ...(columns.filter(c => c.name !== "Title").map(c => c.name))];

  function getColumnIdByName(name: string): string {
    return columns.find(c => c.name === name)?.id || "";
  }

  const handleSaveRef = useCallback(async (recordId: string, columnId: string, value: string) => {
    await handleSaveCell(recordId, columnId, value);
  }, [columns]);

  useEffect(() => {
    function handleClick() { setContextMenu(null); }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  let filteredRecords = records;
  if (filterText) {
    filteredRecords = filteredRecords.filter(r =>
      Object.values(r.values).some(v => v.toLowerCase().includes(filterText.toLowerCase()))
    );
  }
  if (sortBy) {
    filteredRecords = [...filteredRecords].sort((a, b) => {
      const va = (a.values[sortBy] || "").toLowerCase();
      const vb = (b.values[sortBy] || "").toLowerCase();
      return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va);
    });
  }

  if (loading) {
    return (
      <div style={{ padding: "32px 40px", minHeight: "100%", background: dark ? "#0A0A08" : "#F7F6F2" }}>
        <div style={{ textAlign: "center", paddingTop: 80, color: sub, fontSize: 14 }}>Loading databases…</div>
      </div>
    );
  }

  return (
    <div style={{ padding: "32px 40px", fontFamily: "'DM Sans', sans-serif", minHeight: "100%", background: dark ? "#0A0A08" : "#F7F6F2", position: "relative" }}>
      {/* Notification toast */}
      <AnimatePresence>
        {notification && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-xl shadow-2xl"
            style={{
              padding: "10px 16px", background: notification.type === "success" ? "#22C27D" : "#EF4444",
              color: "white", fontSize: 13, fontWeight: 500,
            }}
          >
            {notification.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* If no databases exist, show empty state */}
      {allDatabases.length === 0 ? (
        <div className="flex items-center justify-center" style={{ minHeight: "60vh" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }}>
              <Table2 size={48} />
            </div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 20, fontWeight: 700, color: fg, marginBottom: 8 }}>
              No databases yet
            </h2>
            <p style={{ fontSize: 14, color: sub, marginBottom: 24 }}>
              Create your first database to get started.
            </p>
            <button onClick={handleNewDatabase}
              className="flex items-center gap-2 rounded-xl mx-auto transition-all"
              style={{ padding: "12px 24px", background: "#6357E8", border: "none", color: "white", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
              <Plus size={16} /> New database
            </button>
          </div>
        </div>
      ) : (
        <>
          <FadeUp delay={0.05}>
            <div className="flex items-end justify-between mb-6">
              <div>
                <p style={{ fontSize: 11, color: sub, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Geist Mono', monospace", marginBottom: 6 }}>Database</p>
                <div className="flex items-center gap-2">
                  {editingDbTitle ? (
                    <input ref={dbTitleRef} autoFocus value={dbTitleValue}
                      onChange={e => setDbTitleValue(e.target.value)}
                      onBlur={handleRenameSave}
                      onKeyDown={e => {
                        if (e.key === "Enter") handleRenameSave();
                        if (e.key === "Escape") { setEditingDbTitle(false); setDbTitleValue(dbName); }
                      }}
                      style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                        fontWeight: 800, color: fg, letterSpacing: "-0.03em", background: "transparent",
                        border: "none", borderBottom: `2px solid #6357E8`, outline: "none",
                        minWidth: 280, maxWidth: 480,
                      }} />
                  ) : (
                    <>
                      <select value={activeDbId || ""} onChange={e => switchDatabase(e.target.value)} title="Switch database"
                        style={{
                          fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                          fontWeight: 800, color: fg, letterSpacing: "-0.03em", background: "transparent",
                          border: "none", cursor: "pointer", outline: "none", appearance: "none", maxWidth: 480,
                        }}>
                        {allDatabases.map(db => (
                          <option key={db.id} value={db.id}>{db.name}</option>
                        ))}
                      </select>
                      <ChevronDown size={20} style={{ color: sub, flexShrink: 0, marginTop: 10 }} />
                      <button onClick={() => { setEditingDbTitle(true); setDbTitleValue(dbName); }} title="Rename database"
                        style={{ background: "none", border: "none", color: sub, cursor: "pointer", padding: 6, borderRadius: 6 }}
                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = hoverBg)}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "none")}>
                        <Pencil size={16} />
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleNewDatabase} className="flex items-center gap-2 rounded-xl transition-all"
                  style={{ padding: "10px 18px", background: "transparent", border: `1px solid ${border}`, color: sub, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
                  <Plus size={14} /> New database
                </button>
                <button onClick={handleNewRow} className="flex items-center gap-2 rounded-xl transition-all"
                  style={{ padding: "10px 18px", background: "#6357E8", border: "none", color: "white", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
                  <Plus size={14} /> New row
                </button>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-1 rounded-xl p-1" style={{ background: card, border: `1px solid ${border}` }}>
                {VIEWS.map(({ label, icon: Icon }) => (
                  <button key={label} onClick={() => setView(label)}
                    className="flex items-center gap-1.5 rounded-lg transition-all duration-150"
                    style={{ padding: "6px 14px", fontSize: 13, fontWeight: 500, border: "none", cursor: "pointer", background: view === label ? (dark ? "rgba(99,87,232,0.2)" : "#6357E8") : "transparent", color: view === label ? (dark ? "#A09CF0" : "white") : sub }}>
                    <Icon size={13} /> {label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button onClick={() => setFilterOpen(!filterOpen)}
                    style={{ padding: "7px 14px", background: filterText ? "#6357E8" : card, border: `1px solid ${border}`, color: filterText ? "white" : sub, fontSize: 12, fontWeight: 500, cursor: "pointer", borderRadius: 8 }}>
                    <Filter size={12} /> Filter
                  </button>
                  {filterOpen && (
                    <div className="absolute right-0 top-full mt-1 z-40 rounded-xl shadow-2xl overflow-hidden"
                      style={{ width: 240, background: card, border: `1px solid ${border}`, padding: "8px" }}>
                      <input autoFocus value={filterText} onChange={e => setFilterText(e.target.value)}
                        placeholder="Filter by any value…"
                        style={{ width: "100%", padding: "7px 10px", fontSize: 13, background: dark ? "rgba(255,255,255,0.05)" : "rgba(14,14,12,0.05)", border: `1px solid ${border}`, borderRadius: 8, color: fg, outline: "none" }}
                      />
                      {filterText && (
                        <button onClick={() => { setFilterText(""); setFilterOpen(false); }}
                          style={{ marginTop: 6, fontSize: 12, color: "#6357E8", background: "none", border: "none", cursor: "pointer" }}>
                          Clear filter
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button onClick={() => setSortOpen(!sortOpen)}
                    style={{ padding: "7px 14px", background: sortBy ? "#6357E8" : card, border: `1px solid ${border}`, color: sortBy ? "white" : sub, fontSize: 12, fontWeight: 500, cursor: "pointer", borderRadius: 8 }}>
                    <ArrowUpDown size={12} /> Sort
                  </button>
                  {sortOpen && (
                    <div className="absolute right-0 top-full mt-1 z-40 rounded-xl shadow-2xl overflow-hidden"
                      style={{ width: 240, background: card, border: `1px solid ${border}`, padding: "8px" }}>
                      <div style={{ fontSize: 10, color: sub, fontWeight: 600, textTransform: "uppercase", fontFamily: "'Geist Mono', monospace", padding: "4px 6px", marginBottom: 4 }}>Sort by</div>
                      {prependColumns.map(col => (
                        <button key={col} onClick={() => { setSortBy(sortBy === col ? null : col); setSortOpen(false); }}
                          style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "6px 10px", background: sortBy === col ? hoverBg : "none", border: "none", cursor: "pointer", borderRadius: 6, fontSize: 13, color: sortBy === col ? "#6357E8" : fg, textAlign: "left" }}>
                          {col}
                        </button>
                      ))}
                      {sortBy && (
                        <button onClick={() => setSortAsc(!sortAsc)} style={{ marginTop: 6, fontSize: 12, color: "#6357E8", background: "none", border: "none", cursor: "pointer" }}>
                          {sortAsc ? "↑ Ascending" : "↓ Descending"}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </FadeUp>

          {view === "Table" && (
            <FadeUp delay={0.15}>
              <div className="rounded-2xl overflow-hidden border" style={{ background: card, borderColor: border }}>
                <div className="grid border-b" style={{ gridTemplateColumns: `24px repeat(${Math.min(prependColumns.length, 7)}, 1fr) 40px`, borderColor: border, background: headBg }}>
                  <div style={{ padding: "10px 4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <GripVertical size={12} style={{ color: sub, opacity: 0.5 }} />
                  </div>
                  {prependColumns.slice(0, 7).map((h, i) => (
                    <div key={i} className="flex items-center gap-1 group" style={{ padding: "10px 16px", fontSize: 11, fontWeight: 600, color: sub, letterSpacing: "0.04em", textTransform: "uppercase", fontFamily: "'Geist Mono', monospace", cursor: "pointer" }}>
                      <span>{h}</span>
                      <ChevronDown size={10} style={{ opacity: 0.5 }} />
                      {h !== "Title" && (
                        <button onClick={(e) => { e.stopPropagation(); handleDeleteColumn(getColumnIdByName(h)); }}
                          className="opacity-0 group-hover:opacity-100 ml-auto" style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", padding: 2 }}>
                          <X size={10} />
                        </button>
                      )}
                    </div>
                  ))}
                  <div style={{ padding: "6px 8px", display: "flex", alignItems: "center" }}>
                    <button onClick={() => setAddingColumn(true)} style={{ background: "none", border: "none", color: sub, cursor: "pointer", padding: 4 }}>
                      <PlusCircle size={14} />
                    </button>
                  </div>
                </div>

                {addingColumn && (
                  <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ borderColor: border, background: hoverBg }}>
                    <input autoFocus value={newColumnName} onChange={e => setNewColumnName(e.target.value)}
                      placeholder="Column name…"
                      onKeyDown={e => { if (e.key === "Enter") handleAddColumn(); if (e.key === "Escape") { setAddingColumn(false); setNewColumnName(""); } }}
                      onBlur={() => { if (!newColumnName.trim()) { setAddingColumn(false); } }}
                      style={{ flex: 1, padding: "5px 10px", fontSize: 13, background: dark ? "rgba(255,255,255,0.05)" : "rgba(14,14,12,0.05)", border: `1px solid ${border}`, borderRadius: 6, color: fg, outline: "none" }}
                    />
                    <button onClick={handleAddColumn} style={{ background: "#6357E8", border: "none", color: "white", cursor: "pointer", padding: "5px 10px", borderRadius: 6, fontSize: 12 }}>
                      Add
                    </button>
                  </div>
                )}

                {filteredRecords.length === 0 ? (
                  <div style={{ padding: "32px 16px", textAlign: "center", color: sub, fontSize: 13 }}>
                    {filterText ? "No rows match your filter." : "No rows yet. Click \"New row\" to add one."}
                  </div>
                ) : (
                  filteredRecords.map((row, i) => (
                    <motion.div key={row.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.03, ease: EASE }}
                      className="grid border-b group transition-colors"
                      style={{ gridTemplateColumns: `24px repeat(${Math.min(prependColumns.length, 7)}, 1fr) 40px`, borderColor: border }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = hoverBg)}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "transparent")}>
                      <div style={{ padding: "12px 4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <button onClick={(e) => { e.stopPropagation(); const rect = (e.currentTarget as HTMLElement).getBoundingClientRect(); setContextMenu({ recordId: row.id, x: rect.left, y: rect.top + 24 }); }}
                          className="opacity-0 group-hover:opacity-100" style={{ background: "none", border: "none", color: sub, cursor: "pointer", padding: 2 }}>
                          <GripVertical size={12} />
                        </button>
                      </div>
                      {prependColumns.slice(0, 7).map((colName, ci) => (
                        <div key={ci} style={{ padding: "12px 16px", display: "flex", alignItems: "center" }}>
                          {colName === "Title" ? (
                            editingId === row.id && editField === "Title" ? (
                              <input autoFocus value={editValue} onChange={e => setEditValue(e.target.value)}
                                onBlur={async () => {
                                  if (editValue !== (row.values["Title"] || "")) {
                                    const col = columns.find(c => c.name === "Title");
                                    if (col) await setRecordValue(row.id, col.id, editValue);
                                    setRecords(prev => prev.map(r => r.id === row.id ? { ...r, values: { ...r.values, "Title": editValue } } : r));
                                  }
                                  setEditingId(null);
                                }}
                                onKeyDown={e => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); if (e.key === "Escape") setEditingId(null); }}
                                style={{ fontSize: 13, fontWeight: 500, color: fg, background: "transparent", border: `1px solid ${border}`, borderRadius: 4, padding: "2px 6px", outline: "none", width: "100%" }} />
                            ) : (
                              <span style={{ fontSize: 13, fontWeight: 500, color: fg, cursor: "text" }}
                                onClick={() => { setEditingId(row.id); setEditField("Title"); setEditValue(row.values["Title"] || ""); }}>
                                {row.values["Title"] || "Untitled"}
                              </span>
                            )
                          ) : colName.toLowerCase() === "status" ? (
                            <button onClick={(e) => { const rect = (e.currentTarget as HTMLElement).getBoundingClientRect(); setOpenDropdown({ recordId: row.id, columnId: getColumnIdByName(colName), field: colName, elRect: rect }); }}
                              className="rounded-full" style={{ fontSize: 11, fontWeight: 500, padding: "3px 10px", border: "none", cursor: "pointer", background: (STATUS_COLORS[row.values[colName]]?.bg) || "rgba(138,138,128,0.15)", color: (STATUS_COLORS[row.values[colName]]?.text) || sub }}>
                              {row.values[colName] || "—"}
                            </button>
                          ) : colName.toLowerCase() === "priority" ? (
                            <button onClick={(e) => { const rect = (e.currentTarget as HTMLElement).getBoundingClientRect(); setOpenDropdown({ recordId: row.id, columnId: getColumnIdByName(colName), field: colName, elRect: rect }); }}
                              style={{ fontSize: 12, fontWeight: 500, border: "none", background: "none", cursor: "pointer", color: PRIORITY_COLORS[row.values[colName]] || sub }}>
                              {row.values[colName] || "—"}
                            </button>
                          ) : colName.toLowerCase() === "due" ? (
                            <input type="date" value={row.values[colName] || ""}
                              onChange={async (e) => { await handleSaveCell(row.id, getColumnIdByName(colName), e.target.value); }}
                              style={{ fontSize: 12, color: fg, background: "transparent", border: "none", outline: "none", cursor: "pointer" }}
                            />
                          ) : colName.toLowerCase() === "tag" ? (
                            <span className="rounded" style={{ fontSize: 11, fontWeight: 500, padding: "2px 8px", background: "#6357E818", color: "#6357E8" }}>
                              {row.values[colName] || "—"}
                            </span>
                          ) : colName ? (
                            <span style={{ fontSize: 12, color: fg }}>{row.values[colName] || "—"}</span>
                          ) : null}
                        </div>
                      ))}
                      <div style={{ padding: "12px 4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <button onClick={() => handleDeleteRow(row.id)}
                          className="opacity-0 group-hover:opacity-100" style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", padding: 2 }}>
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}

                <button onClick={handleNewRow} className="flex items-center gap-2 w-full transition-colors"
                  style={{ padding: "10px 16px", background: "none", border: "none", color: sub, fontSize: 13, cursor: "pointer", textAlign: "left" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = hoverBg)}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "none")}>
                  <Plus size={13} /> New row
                </button>
              </div>
            </FadeUp>
          )}

          {view === "Board" && (
            <FadeUp delay={0.15}>
              <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>
                {boardCols.map(col => {
                  const colRecords = filteredRecords.filter(r => (r.values["Status"] || r.values["status"] || "Not started") === col);
                  return (
                    <div key={col} className="flex-shrink-0 rounded-2xl border" style={{ width: 300, background: card, borderColor: border, overflow: "hidden" }}>
                      <div className="flex items-center justify-between" style={{ padding: "14px 16px", borderBottom: `1px solid ${border}` }}>
                        <div className="flex items-center gap-2">
                          <span className="rounded-full" style={{ width: 8, height: 8, background: (STATUS_COLORS[col]?.text) || sub }} />
                          <span style={{ fontSize: 13, fontWeight: 600, color: fg }}>{col}</span>
                          <span className="rounded-full" style={{ fontSize: 10, fontWeight: 600, padding: "1px 7px", background: dark ? "rgba(255,255,255,0.08)" : "rgba(14,14,12,0.08)", color: sub }}>{colRecords.length}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2" style={{ padding: 12, maxHeight: 480, overflowY: "auto", scrollbarWidth: "none" }}>
                        {colRecords.length === 0 ? (
                          <div style={{ padding: "16px 0", textAlign: "center", color: sub, fontSize: 12 }}>No items</div>
                        ) : (
                          colRecords.map(row => (
                            <motion.div key={row.id} layout whileHover={{ y: -1 }}
                              className="rounded-xl border" style={{ padding: "14px", background: dark ? "#1A1A18" : "#FAFAF8", borderColor: border }}>
                              <div style={{ fontSize: 13, fontWeight: 500, color: fg, marginBottom: 8 }}>{row.values["Title"] || "Untitled"}</div>
                              <div className="flex items-center gap-2 flex-wrap">
                                {row.values["Priority"] && (
                                  <span style={{ fontSize: 10, fontWeight: 500, color: PRIORITY_COLORS[row.values["Priority"]] || sub }}>{row.values["Priority"]}</span>
                                )}
                                {row.values["Tag"] && (
                                  <span style={{ fontSize: 10, fontWeight: 500, padding: "2px 7px", borderRadius: 4, background: "#6357E818", color: "#6357E8" }}>{row.values["Tag"]}</span>
                                )}
                                {row.values["Due"] && <span style={{ fontSize: 10, color: sub }}>📅 {row.values["Due"]}</span>}
                              </div>
                              <button onClick={() => handleDeleteRow(row.id)}
                                style={{ marginTop: 8, background: "none", border: "none", color: sub, cursor: "pointer", padding: 2, opacity: 0.4, fontSize: 11 }}
                                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "0.4")}>
                                Delete
                              </button>
                            </motion.div>
                          ))
                        )}
                        <button onClick={handleNewRow} className="flex items-center gap-1.5 rounded-lg transition-colors w-full"
                          style={{ padding: "8px 10px", background: "none", border: "none", color: sub, fontSize: 12, cursor: "pointer", textAlign: "left" }}
                          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = hoverBg)}
                          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "none")}>
                          <Plus size={12} /> Add item
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </FadeUp>
          )}

          {(view === "Calendar" || view === "List") && (
            <FadeUp delay={0.15}>
              <div className="rounded-2xl border flex items-center justify-center" style={{ background: card, borderColor: border, height: 400 }}>
                <div className="text-center">
                  <div style={{ fontSize: 40, marginBottom: 12 }}>{view === "Calendar" ? "📅" : "📋"}</div>
                  <div style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 18, fontWeight: 700, color: fg, marginBottom: 6 }}>{view} view</div>
                  <div style={{ fontSize: 14, color: sub }}>Coming soon to NoteFlow</div>
                </div>
              </div>
            </FadeUp>
          )}

          {openDropdown && (
            <PropertyDropdown
              value={records.find(r => r.id === openDropdown.recordId)?.values[openDropdown.field] || ""}
              options={openDropdown.field.toLowerCase() === "status" ? STATUS_OPTIONS : PRIORITY_OPTIONS}
              colors={openDropdown.field.toLowerCase() === "status" ? STATUS_COLORS : PRIORITY_COLORS}
              columnId={openDropdown.columnId}
              recordId={openDropdown.recordId}
              onSave={handleSaveRef}
              dark={dark}
              onClose={() => setOpenDropdown(null)}
            />
          )}

          <AnimatePresence>
            {contextMenu && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40" onClick={() => setContextMenu(null)} />
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  className="fixed z-50 rounded-xl shadow-2xl overflow-hidden"
                  style={{ top: contextMenu.y, left: contextMenu.x, width: 180, background: card, border: `1px solid ${border}`, padding: "4px" }}>
                  <button onClick={() => handleDuplicateRow(contextMenu.recordId)}
                    style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "7px 10px", background: "none", border: "none", cursor: "pointer", color: fg, fontSize: 13, borderRadius: 6, textAlign: "left" }}>
                    <Copy size={14} /> Duplicate
                  </button>
                  <button onClick={() => handleDeleteRow(contextMenu.recordId)}
                    style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "7px 10px", background: "none", border: "none", cursor: "pointer", color: "#EF4444", fontSize: 13, borderRadius: 6, textAlign: "left" }}>
                    <Trash2 size={14} /> Delete
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}