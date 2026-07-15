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
    <main className="min-h-screen bg-[#f7f2ea] flex items-center justify-center px-4 md:px-6">

      <div className="w-full max-w-md">

        <div className="flex justify-center mb-6">
          <Link href="/">
            <img
              src="/logo.png"
              alt="LAKONIA"
              className="w-20 md:w-[120px] h-auto cursor-pointer"
            />
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-serif text-center text-[#37253f]">
          LAKONIA
        </h1>

        <p className="text-center text-gray-600 mt-2 mb-6 md:mb-8 text-sm md:text-base">
          Повернути доступ
        </p>

        <form
          onSubmit={codeSent ? changePassword : sendCode}
          className="space-y-4 md:space-y-5"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full
              rounded-xl
              border border-gray-300
              p-3 md:p-4
              text-base md:text-lg
              focus:outline-none
              focus:ring-2
              focus:ring-amber-600
            "
          />

          {!codeSent && (
            <button
              type="submit"
              className="
                w-full
                rounded-xl
                bg-[#311b37]
                text-white
                py-3 md:py-4
                text-lg md:text-xl
                hover:opacity-90
                transition
              "
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
                className="
                  w-full
                  rounded-xl
                  border border-gray-300
                  p-3 md:p-4
                  text-base md:text-lg
                  focus:outline-none
                  focus:ring-2
                  focus:ring-amber-600
                "
              />

              <input
                type="password"
                placeholder="Новий пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  w-full
                  rounded-xl
                  border border-gray-300
                  p-3 md:p-4
                  text-base md:text-lg
                  focus:outline-none
                  focus:ring-2
                  focus:ring-amber-600
                "
              />

              <input
                type="password"
                placeholder="Повторіть пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="
                  w-full
                  rounded-xl
                  border border-gray-300
                  p-3 md:p-4
                  text-base md:text-lg
                  focus:outline-none
                  focus:ring-2
                  focus:ring-amber-600
                "
              />

              <button
                type="submit"
                className="
                  w-full
                  rounded-xl
                  bg-[#311b37]
                  text-white
                  py-3 md:py-4
                  text-lg md:text-xl
                  hover:opacity-90
                  transition
                "
              >
                Змінити пароль
              </button>
            </>
          )}

        </form>

        <p className="text-center mt-6 md:mt-8">
          <Link
            href="/login"
            className="text-amber-700 hover:underline text-sm md:text-base"
          >
            ← Повернутися до входу
          </Link>
        </p>

        <footer className="mt-10 md:mt-16 pb-4 md:pb-6 text-center text-xs md:text-sm text-gray-500">
          © LAKONIA 2026 • v0.0.3
        </footer>

      </div>

    </main>
  );
}