"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type UserData = {
  nickname: string;
  wordBalance: number;
};

export default function ExpressPage() {
  const [user, setUser] = useState<UserData>({
    nickname: "",
    wordBalance: 0,
  });

  const [text, setText] = useState("");

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/me");

        if (!res.ok) return;

        const data = await res.json();

        setUser(data);
      } catch {}
    }

    loadUser();
  }, []);

  function countWords(value: string) {
    return value
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
  }

  const words = useMemo(() => {
    return countWords(text);
  }, [text]);

  const remaining = user.wordBalance - words;

  function containsLinks(value: string) {
    const pattern =
      /(https?:\/\/|www\.|[a-zA-Z0-9-]+\.(com|ua|org|net|io|app|dev|me|co|xyz))/i;

    return pattern.test(value);
  }

  const hasLinks = useMemo(() => {
    return containsLinks(text);
  }, [text]);

  const canPublish =
    text.trim().length > 0 &&
    remaining >= 0 &&
    !hasLinks;

    async function publishNote() {
  try {
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    alert("Замітку опубліковано.");

    window.location.href = "/dashboard";

  } catch {
    alert("Помилка сервера.");
  }
}

  return (
    <main
      className="min-h-screen bg-[#f7f2ea] text-[#37253f]"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
      }}
    >
      <div className="max-w-4xl mx-auto px-8 py-8">

        {/* Верх */}

        <div className="flex justify-between items-center">

          <Link
            href="/dashboard"
            className="text-[#b78d3d] hover:underline"
          >
            ← Назад
          </Link>

          <div className="text-right">

           <Link
  href="/profile"
  className="font-serif text-3xl hover:text-[#b78d3d] transition"
>
  {user.nickname}
</Link>

            <div className="w-20 h-[2px] bg-[#b78d3d] mt-2 ml-auto rounded-full"></div>

          </div>

        </div>

        {/* Заголовок */}

        <div className="text-center mt-10">

          <img
            src="/icons/quill.svg"
            alt=""
            className="w-16 mx-auto mb-5"
          />

          <h1 className="font-serif text-6xl text-[#43253f]">
            Висловитися
          </h1>

          <p className="mt-5 text-2xl text-[#666]">
            Напишіть думку,
            якою хочете поділитися.
          </p>

        </div>

        {/* Поле */}

        <div className="mt-12">

          <textarea
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
            placeholder="Почніть писати..."
            className="
              w-full
              h-[380px]
              rounded-[34px]
              border
              border-[#d7c8ab]
              bg-white/90
              backdrop-blur-sm
              p-8
              text-xl
              leading-9
              resize-none
              outline-none
              focus:border-[#b78d3d]
              focus:ring-2
              focus:ring-[#d9c08b]
            "
          />

        </div>
                {/* Повідомлення про посилання */}

        {hasLinks && (
          <div className="mt-8 rounded-[28px] border border-[#d8c39a] bg-[#fff8ec] p-6">

            <p className="font-serif text-3xl text-[#b78d3d]">
              У Лаконії не використовують посилання.
            </p>

            <p className="mt-3 text-xl text-[#5f5f5f]">
              Ми цінуємо не адреси сайтів,
              а думки людей.
            </p>

          </div>
        )}

        {/* Статистика */}

        <div className="mt-10 grid grid-cols-3 gap-6">

          <div className="rounded-[28px] bg-white/90 border border-[#e3d7c0] p-6 text-center">

            <p className="text-[#b78d3d] font-serif text-2xl">
              Баланс
            </p>

            <p className="font-serif text-6xl mt-3">
              {user.wordBalance}
            </p>

          </div>

          <div className="rounded-[28px] bg-white/90 border border-[#e3d7c0] p-6 text-center">

            <p className="text-[#b78d3d] font-serif text-2xl">
              Замітка
            </p>

            <p className="font-serif text-6xl mt-3">
              {words}
            </p>

          </div>

          <div className="rounded-[28px] bg-white/90 border border-[#e3d7c0] p-6 text-center">

            <p className="text-[#b78d3d] font-serif text-2xl">
              Після публікації
            </p>

            <p
              className={`font-serif text-6xl mt-3 ${
                remaining < 0
                  ? "text-red-600"
                  : ""
              }`}
            >
              {remaining}
            </p>

          </div>

        </div>

        {/* Правило */}

        <p className="mt-8 text-center text-[#8b7d6d] text-lg">

          Кожна послідовність символів між пробілами
          вважається одним словом.

        </p>

        {/* Кнопка */}

        <div className="mt-10 flex justify-center">

          <button
            onClick={publishNote}
            disabled={!canPublish}
            className={`
              rounded-full
              px-12
              py-5
              text-2xl
              font-serif
              transition

              ${
                canPublish
                  ? "bg-[#311b37] text-white hover:opacity-90"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            Опублікувати
          </button>

        </div>

        {/* Нижня цитата */}

        <div className="mt-16 mb-10">

          <div className="flex items-center justify-center gap-4">

            <div className="w-24 h-px bg-[#c8a35d]"></div>

            <div className="text-[#b78d3d]">
              ✦
            </div>

            <div className="w-24 h-px bg-[#c8a35d]"></div>

          </div>

          <p className="mt-6 text-center text-[#a87b2c] font-serif text-3xl">
            Слова мають вагу.
          </p>

        </div>

      </div>

    </main>
  );
}