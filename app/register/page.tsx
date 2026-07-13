"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [accepted, setAccepted] = useState(false);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Ласкаво просимо до LAKONIA!");
      window.location.href = "/";
    } else {
      alert(data.error);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f2ea] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Link href="/">
            <img
              src="/logo.png"
              alt="LAKONIA"
              width={120}
              className="h-auto cursor-pointer"
            />
          </Link>
        </div>

        <h1 className="text-4xl font-serif text-center text-[#37253f]">
          LAKONIA
        </h1>

        <p className="text-center text-gray-600 mt-2 mb-8">
          Стати учасником
        </p>

        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="text"
            placeholder="Нік у Лаконії"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-4 text-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-4 text-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
          />

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-4 text-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
          />

          <label className="flex items-start gap-3 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1 h-4 w-4"
            />

            <span>
              Я ознайомився(лася) з{" "}
              <Link
                href="/constitution"
                className="text-amber-700 hover:underline"
              >
                Конституцією Лаконії
              </Link>
            </span>
          </label>

          <button
            type="submit"
            disabled={!accepted}
            className={`w-full rounded-xl py-4 text-xl transition ${
              accepted
                ? "bg-[#311b37] text-white hover:opacity-90"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Стати учасником
          </button>
        </form>

        <p className="text-center mt-8 text-gray-600">
          Уже маєте акаунт?{" "}
          <Link
            href="/login"
            className="text-amber-700 hover:underline"
          >
            Увійти
          </Link>
        </p>

        <footer className="mt-16 pb-6 text-center text-sm text-gray-500">
          © LAKONIA 2026 • v0.0.2
        </footer>
      </div>
    </main>
  );
}