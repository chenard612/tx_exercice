"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface TableAsset {
  id: string;
  type: "table";
  title: string;
  rows: string[][];
}

export interface NoteAsset {
  id: string;
  type: string;
  title: string;
  text?: string;
}

export interface ImageAsset {
  id: string;
  type: string;
  title: string;
  text?: string;
  url?: string;
}

export type Asset = NoteAsset | ImageAsset | TableAsset;

interface Props {
  assets: Asset[];
  selected: Set<string>;
  toggle: (id: string) => void;
}

export default function AssetList({ selected, toggle }: Props) {

    const [assets, setAssets] = useState<Asset[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
    async function fetchAssets() {
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
    fetchAssets();
    }, []);

    if (loading) {
        return <p className="text-sm text-gray-500">Loading assets…</p>;
    }

    if (error) {
        return (
        <div className="text-sm text-red-600">
            {error}
            <button
            onClick={() => location.reload()}
            className="ml-2 underline"
            >
            retry
            </button>
        </div>
        );
    }

    return (
        <>
        {assets.length === 0 ? (
            <p className="text-sm text-gray-500">No assets yet.</p>
        ) : (
            <ul className="space-y-3">
            {assets.map((asset) => (
                <li key={asset.id} className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={selected.has(String(asset.id))}
                    onChange={() => toggle(String(asset.id))}
                    className="h-4 w-4 accent-blue-600"
                />
                <span className="text-sm">
                    {asset.type.toUpperCase()} – {asset.title}
                </span>
                </li>
            ))}
            </ul>
        )}

        <button
            onClick={() => router.push("/builder")}
            className="mt-6 w-full rounded bg-blue-600 py-2 text-white text-sm font-medium hover:bg-blue-700 transition cursor-pointer"
        >
            Create New Asset
        </button>
        </>
    );
}