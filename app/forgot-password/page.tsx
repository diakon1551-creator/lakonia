"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const sendCode = async (e: React.FormEvent) => {
  e.preventDefault();

  const res = await fetch("/api/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error);
    return;
  }

  alert(
    "Якщо такий Email зареєстрований, код уже надіслано."
  );

  setCodeSent(true);
};

 const changePassword = async (e: React.FormEvent) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Паролі не співпадають.");
    return;
  }

  const res = await fetch("/api/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      code,
      password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error);
    return;
  }

  alert("Пароль успішно змінено.");
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
          Повернути доступ
        </p>

        <form
          onSubmit={codeSent ? changePassword : sendCode}
          className="space-y-5"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-4 text-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
          />

          {!codeSent && (
            <button
              type="submit"
              className="w-full rounded-xl bg-[#311b37] text-white py-4 text-xl hover:opacity-90 transition"
            >
              Надіслати код
            </button>
          )}

          {codeSent && (
            <>
              <input
                type="text"
                placeholder="Код доступу"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full rounded-xl border border-gray-300 p-4 text-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
              />

              <input
                type="password"
                placeholder="Новий пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-300 p-4 text-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
              />

              <input
                type="password"
                placeholder="Повторіть пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-300 p-4 text-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-[#311b37] text-white py-4 text-xl hover:opacity-90 transition"
              >
                Змінити пароль
              </button>
            </>
          )}

        </form>

        <p className="text-center mt-8">
          <Link
            href="/login"
            className="text-amber-700 hover:underline"
          >
            ← Повернутися до входу
          </Link>
        </p>

        <footer className="mt-16 pb-6 text-center text-sm text-gray-500">
          © LAKONIA 2026 • v0.0.3
        </footer>

      </div>

    </main>
  );
}