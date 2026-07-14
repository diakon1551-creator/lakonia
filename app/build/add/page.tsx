"use client";

import { useState } from "react";

export default function AddPlacePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const wordCount = description
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const isTooLong = wordCount > 50;

  return (
    <main className="min-h-screen bg-[#f7f2ea] text-[#37253f]">
      <div className="max-w-3xl mx-auto px-8 py-12">

        <h1 className="font-serif text-6xl text-[#a87b2c] text-center">
          Додати місце
        </h1>

        <p className="text-center text-2xl mt-4">
          Поділіться місцем, яке варте уваги Лаконії.
        </p>

        <div className="mt-12 space-y-6">

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Назва місця"
            className="w-full p-4 rounded-xl border border-[#d9c9a7] bg-white"
          />

          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Опишіть це місце (до 50 слів)"
              rows={6}
              className="w-full p-4 rounded-xl border border-[#d9c9a7] bg-white resize-none"
            />

            <div
              className={`mt-2 text-right text-lg ${
                isTooLong ? "text-red-600" : "text-[#666]"
              }`}
            >
              {wordCount} / 50 слів
            </div>
          </div>

          <button
            disabled={isTooLong}
            className={`w-full p-4 rounded-xl text-white font-semibold transition ${
              isTooLong
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#b78d3d] hover:opacity-90"
            }`}
          >
            Надіслати Ліліт
          </button>

        </div>

      </div>
    </main>
  );
}