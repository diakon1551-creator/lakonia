"use client";

import dynamic from "next/dynamic";

const LakoniaMapClient = dynamic(
  () => import("./LakoniaMapClient"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[70vh] flex items-center justify-center">
        Завантаження карти...
      </div>
    ),
  }
);

export default function LakoniaMap() {
  return <LakoniaMapClient />;
}