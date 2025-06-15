"use client";

import { useState } from "react";

interface Props {
  onSave: (payload: { title: string; text: string }) => void;
}

export default function TextAssetForm({ onSave }: Props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ title, text });
      }}
      className="space-y-4 max-w-lg mx-auto"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
          placeholder="e.g. Executive Summary"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded border px-3 py-2 text-sm h-32 resize-y focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Write your paragraph here…"
          required
        />
      </div>

      <button
        type="submit"
        className="rounded bg-blue-600 text-white text-sm font-medium px-4 py-2 hover:bg-blue-700 transition cursor-pointer"
      >
        Save
      </button>
    </form>
  );
}
