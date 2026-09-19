import { useState } from "react";
import BlockEditor from "../components/BlockEditor";
import type { EditorBlockData } from "../components/EditorBlock";

export default function EditorTest() {
  const [saved, setSaved] = useState<EditorBlockData[] | null>(null);

  return (
    <div style={{ padding: 40, fontFamily: "'DM Sans', sans-serif", maxWidth: 720, margin: "0 auto" }}>
      <h1 data-testid="editor-test">Editor Test Harness</h1>
      <BlockEditor
        pageId="test-page"
        initialContent=""
        onSave={(blocks) => setSaved(blocks)}
      />
      <div data-testid="saved-state" style={{ marginTop: 24, fontSize: 12 }}>
        {saved ? saved.map(b => `${b.type}:${b.checked ? "x" : ""}${b.content}`).join(" | ") : "not saved yet"}
      </div>
    </div>
  );
}
