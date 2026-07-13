"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    setLoading(false);

    if (!res.ok) {
      alert(data.error);
      return;
    }

    router.push("/dashboard");
  }

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
          Вхід
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

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

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#311b37] text-white py-4 text-xl hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Вхід..." : "Увійти"}
          </button>

        </form>

        <div className="mt-8 space-y-3 text-center">

          <p className="text-gray-600">
            Забули пароль?{" "}
            <Link
              href="/forgot-password"
              className="text-amber-700 hover:underline"
            >
              Повернути доступ
            </Link>
          </p>

          <p className="text-gray-600">
            Ще не учасник?{" "}
            <Link
              href="/register"
              className="text-amber-700 hover:underline"
            >
              Стати учасником
            </Link>
          </p>

        </div>

        <footer className="mt-16 pb-6 text-center text-sm text-gray-500">
          © LAKONIA 2026 • v0.0.2
        </footer>

      </div>
    </main>
  );
}