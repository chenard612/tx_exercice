"use client";

import { useState } from "react";
import AssetList from "@/components/AssetList";

export default function Home() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  // const activeAssets = ASSETS.filter((a) => selected.has(a.id));

  return (
    <div className="grid grid-cols-4 gap-6 min-h-screen p-8 bg-slate-50">
      <section className="col-span-3 bg-white rounded-xl p-6 overflow-y-auto shadow">
        {/* <AssetCanvas assets={activeAssets} /> */}
        DISPLAY
      </section>

      <aside className="col-span-1 bg-white rounded-xl p-6 shadow">
        <h2 className="font-semibold mb-4 text-center">Available Assets</h2>
        <AssetList selected={selected} toggle={toggle} />
      </aside>
    </div>
  );
}