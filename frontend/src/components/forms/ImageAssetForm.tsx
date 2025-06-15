"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";

export default function ImageAssetForm() {
  const [title, setTitle] = useState("");
  const [file, setFile]   = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;

    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function save() {
    if (!file) return alert("Choose an image first.");

    setSaving(true);

    const form = new FormData();
    form.append("title", title);
    form.append("file", file);

    const res = await fetch("http://localhost:8001/images", {
      method: "POST",
      body: form,
    });

    setSaving(false);
    if (!res.ok) {
      alert("Failed to save image");
      return;
    }

    const saved = await res.json();
    console.log("Saved image:", saved);

    // reset
    setTitle("");
    setFile(null);
    setPreview(null);
  }

  return (
    <form onSubmit={e => { e.preventDefault(); save(); }}
          className="space-y-4 max-w-lg mx-auto">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
          placeholder="e.g. Company Logo"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image file</label>
            <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="
                block w-full text-sm text-gray-700
                file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold
                file:bg-gray-700 file:text-white
                hover:file:bg-gray-800
            "
            required
          />
        {preview && (
          <div className="mt-3 h-32 relative">
            <Image
              src={preview}
              alt="preview"
              fill
              className="object-contain rounded border"
              style={{ objectFit: "contain" }}
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={saving}
        className="rounded bg-blue-600 text-white text-sm font-medium px-4 py-2 hover:bg-blue-700 disabled:opacity-60 transition cursor-pointer"
      >
        {saving ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
