"use client";

import { Asset } from "./AssetList";

interface Props {
  assets: Asset[];
}

export default function AssetCanvas({ assets }: Props) {
  if (assets.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Select assets on the right to preview them here…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {assets.map((a) => {
        switch (a.type) {
          case "note":
            return (
              <div key={a.id} className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold mb-1">{a.title}</h3>
                <p>{a.text}</p>
              </div>
            );
          case "image":
            return (
              <div key={a.id} className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold mb-2">{a.title}</h3>
                <img
                src={`http://localhost:8000${a.url}`}
                alt={a.title ?? "image"}
                className="max-h-64 rounded object-contain mx-auto"
                />
              </div>
            );
          case "table":
            return (
              <div key={a.id} className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold mb-2">{a.title}</h3>
                <table className="w-full text-sm border-collapse">
                  <tbody>
                    {(a.rows as string[][]).map((row, rIdx) => (
                      <tr key={rIdx} className="odd:bg-gray-50">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="border px-2 py-1">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return (
              <p key={a.id} className="text-sm text-gray-500">
                Unsupported type: {a.type}
              </p>
            );
        }
      })}
    </div>
  );
}
