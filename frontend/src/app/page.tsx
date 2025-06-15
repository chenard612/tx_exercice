"use client";

import { useState, useEffect } from "react";
import AssetList, { Asset } from "@/components/AssetList";
import AssetCanvas from "@/components/AssetCanvas";

export default function Home() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchAll() {
      try {
        const res = await fetch("http://localhost:8001/");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Asset[] = await res.json();
        setAssets(data);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load assets.");
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);


  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });

    const activeAssets = assets.filter((a) => selected.has(a.id));

  return (
    <div className="grid grid-cols-4 gap-6 min-h-screen p-8 bg-slate-50">
      <section className="col-span-3 bg-white rounded-xl p-6 overflow-y-auto shadow">
        <AssetCanvas assets={activeAssets} />
      </section>

      <aside className="col-span-1 bg-gray-200 rounded-xl p-6 shadow">
        <h2 className="font-semibold mb-4 text-center">Available Assets</h2>

        {loading && <p className="text-sm text-gray-500">Loading assets…</p>}
        {error   && <p className="text-sm text-red-600">{error}</p>}

        {!loading && !error && (
          <AssetList assets={assets} selected={selected} toggle={toggle} />
        )}
      </aside>
    </div>
  );
}