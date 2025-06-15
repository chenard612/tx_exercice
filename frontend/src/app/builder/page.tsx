"use client";

import { useState } from "react";
import NoteAssetForm from "@/components/forms/NoteAssetForm";
import ImageAssetForm from "@/components/forms/ImageAssetForm";

export default function BuilderPage() {
  const labels = ["Note", "Image", "Chart", "Table"];
  const [chosen, setChosen] = useState<string | null>(null);

  const handleTextSave = (data: { title: string; text: string }) => {
    console.log("Text asset saved:", data);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <p className="ml-3 mt-3 text-sm text-gray-600">
        Choose the asset you want to create
      </p>
      <section className="h-[25vh] w-full flex items-center justify-around bg-white shadow-sm">
        {labels.map((label) => (
          <button
            key={label}
            onClick={() => setChosen(label)}
            className="
              aspect-square w-40 rounded-md bg-gray-200 text-black
              flex items-center justify-center font-medium cursor-pointer
              border-2 border-transparent
              hover:border-black hover:shadow-md
              transition
            "
          >
            {label}
          </button>
        ))}
      </section>

      <section className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-700 mb-10">
          Builder workspace
        </h1>
        {chosen === "Note" && <NoteAssetForm onSave={handleTextSave} />}

        {chosen === "Image" && <ImageAssetForm />}

        {chosen && chosen !== "Note" && chosen !== "Image" && (
          <p className="text-gray-500">“{chosen}” form not implemented yet.</p>
        )}
      </section>
    </div>
  );
}