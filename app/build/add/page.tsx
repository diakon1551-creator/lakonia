"use client";

import { useState } from "react";

export default function AddPlacePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const [locationStatus, setLocationStatus] = useState("");

  const wordCount = description
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const isTooLong = wordCount > 50;

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Ваш браузер не підтримує геолокацію.");
      return;
    }

    setLocationStatus("Отримання геолокації...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLocationStatus("📍 Геолокацію отримано.");
      },
      () => {
        setLocationStatus("Не вдалося отримати геолокацію.");
      }
    );
  };

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

          <div className="rounded-xl border border-[#d9c9a7] bg-white p-5">

            <button
              type="button"
              onClick={getLocation}
              className="w-full p-4 rounded-xl bg-[#43253f] text-white hover:opacity-90 transition"
            >
              Поділитися геолокацією
            </button>

            {locationStatus && (
              <p className="mt-4 text-center">
                {locationStatus}
              </p>
            )}

          </div>

          <button
            disabled={isTooLong || !latitude || !longitude}
            className={`w-full p-4 rounded-xl text-white font-semibold transition ${
              isTooLong || !latitude || !longitude
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