"use client";

import LakoniaMap from "../../components/LakoniaMap";

export default function VerifyPlacePage() {
  return (
    <main className="min-h-screen bg-[#f7f2ea] text-[#37253f]">
      <div className="max-w-6xl mx-auto px-8 py-12">

        <h1 className="font-serif text-6xl text-[#a87b2c] text-center">
          Перевірити місце
        </h1>

        <p className="text-center text-2xl mt-4 mb-10">
          Відвідайте місце та підтвердьте або спростуйте замітку.
        </p>

        <div className="rounded-[24px] overflow-hidden shadow-lg border border-[#e5d5b7]">
          <LakoniaMap />
        </div>

      </div>
    </main>
  );
}