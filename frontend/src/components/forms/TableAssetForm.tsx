"use client";

import { useState } from "react";

interface Row {
  id: string;
  cells: string;
}

export default function TableAssetForm() {
  const [title, setTitle] = useState("");
  const [rows, setRows]   = useState<Row[]>([
    { id: crypto.randomUUID(), cells: "" },
  ]);
  const [saving, setSaving] = useState(false);

  const addRow = () =>
    setRows((prev) => [...prev, { id: crypto.randomUUID(), cells: "" }]);

  const updateRow = (id: string, value: string) =>
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, cells: value } : r))
    );

  const removeRow = (id: string) =>
    setRows((prev) => prev.filter((r) => r.id !== id));

  async function save() {
    const formatted = rows
      .filter((r) => r.cells.trim() !== "")
      .map((r) => r.cells.split(",").map((c) => c.trim()));

    if (formatted.length === 0)
      return alert("Add at least one row before saving.");

    setSaving(true);

    const res = await fetch("http://localhost:8000/tables", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "table",
        title,
        rows: formatted,
      }),
    });

    setSaving(false);
    if (!res.ok) {
      alert("Failed to save table");
      return;
    }

    const saved = await res.json();
    console.log("Saved table:", saved);
    setTitle("");
    setRows([{ id: crypto.randomUUID(), cells: "" }]);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}
      className="space-y-6 max-w-lg mx-auto"
    >
      {/* title */}
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
          placeholder="e.g. Quarterly Sales Table"
          required
        />
      </div>

      {/* dynamic rows */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Rows (comma-separated)</label>
        {rows.map((row, idx) => (
          <div key={row.id} className="flex gap-2">
            <input
              value={row.cells}
              onChange={(e) => updateRow(row.id, e.target.value)}
              className="flex-1 rounded border px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
              placeholder={`Row ${idx + 1}: col1, col2, col3`}
              required
            />
            {rows.length > 1 && (
              <button
                type="button"
                onClick={() => removeRow(row.id)}
                className="text-red-500 text-xs font-medium hover:underline"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addRow}
          className="mt-2 text-blue-600 text-sm font-medium hover:underline"
        >
          + Add row
        </button>
      </div>

      {/* save */}
      <button
        type="submit"
        disabled={saving}
        className="rounded bg-blue-600 text-white text-sm font-medium px-4 py-2 hover:bg-blue-700 disabled:opacity-60 transition"
      >
        {saving ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
