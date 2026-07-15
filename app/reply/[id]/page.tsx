"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type User = {
  id: number;
  nickname: string;
  wordBalance: number;
};

type Note = {
  id: number;
  text: string;
  author: {
    id: number;
    nickname: string;
  };
};

export default function ReplyPage() {
  const params = useParams();

  const [user, setUser] = useState<User>({
    id: 0,
    nickname: "",
    wordBalance: 0,
  });

  const [note, setNote] = useState<Note | null>(null);

  const [text, setText] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [meRes, noteRes] = await Promise.all([
          fetch("/api/me"),
          fetch(`/api/notes/${params.id}`),
        ]);

        if (!meRes.ok || !noteRes.ok) return;

        const me = await meRes.json();
        const currentNote = await noteRes.json();

        setUser(me);
        setNote(currentNote);
      } catch {}
    }

    load();
  }, [params.id]);

  function countWords(value: string) {
    return value
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
  }

  const words = useMemo(() => countWords(text), [text]);

  const remaining = user.wordBalance - words;

  function containsLinks(value: string) {
    return /(https?:\/\/|www\.|[a-zA-Z0-9-]+\.(com|ua|org|net|io|app|dev|me|co|xyz))/i.test(
      value
    );
  }

  const hasLinks = useMemo(() => containsLinks(text), [text]);

  const canPublish =
    text.trim().length > 0 &&
    remaining >= 0 &&
    !hasLinks;

  async function publishReply() {
    try {
      const res = await fetch("/api/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parentId: note?.id,
          text,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      alert("Думку додано.");

      window.location.href = "/dashboard";
    } catch {
      alert("Помилка сервера.");
    }
  }

  if (!note) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f7f2ea]">
        Завантаження...
      </main>
    );
  }

  const ownNote = note.author.id === user.id;

  return (
    <main
      className="min-h-screen bg-[#f7f2ea] text-[#37253f]"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Верх */}

        <div className="flex justify-between items-center gap-4">

          <Link
            href={`/listen/${note.id}`}
            className="text-[#b78d3d] hover:underline text-sm sm:text-base"
          >
            ← Назад
          </Link>

          <div className="text-right">

            <Link
              href="/profile"
              className="font-serif text-xl sm:text-2xl lg:text-3xl hover:text-[#b78d3d] transition"
            >
              {user.nickname}
            </Link>

            <div className="w-16 sm:w-20 h-[2px] bg-[#b78d3d] mt-2 ml-auto rounded-full"></div>

          </div>

        </div>

        {/* Заголовок */}

        <div className="text-center mt-8 sm:mt-10">

          <img
            src="/icons/note.png"
            alt=""
            className="w-12 sm:w-16 mx-auto mb-4 sm:mb-5"
          />

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl">
            Долучитися до думки
          </h1>

        </div>

        {/* Початкова думка */}

        <div className="mt-8 sm:mt-12 rounded-[24px] sm:rounded-[34px] border border-[#d7c8ab] bg-white/90 p-5 sm:p-8">

          <p className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#b78d3d]">
            {note.author.nickname}
          </p>

          <p className="mt-5 sm:mt-8 whitespace-pre-wrap text-lg sm:text-xl lg:text-2xl leading-8 sm:leading-10">
            {note.text}
          </p>

        </div>

        {ownNote ? (
          <div className="mt-10 sm:mt-12 text-center">

            <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#b78d3d]">
              Це ваша думка.
            </p>

            <p className="mt-4 sm:mt-5 text-lg sm:text-xl">
              До власної думки долучитися не можна.
            </p>

            <Link
              href="/express"
              className="inline-block mt-8 sm:mt-10 rounded-full bg-[#311b37] text-white px-6 sm:px-10 py-3 sm:py-4 text-lg sm:text-2xl font-serif"
            >
              Висловитися →
            </Link>

          </div>
        ) : (
          <>

            {/* Поле */}

            <div className="mt-8 sm:mt-12">

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Що ви хочете додати?"
                className="
                  w-full
                  h-[260px]
                  sm:h-[340px]
                  rounded-[24px]
                  sm:rounded-[34px]
                  border
                  border-[#d7c8ab]
                  bg-white/90
                  p-5
                  sm:p-8
                  text-base
                  sm:text-xl
                  leading-7
                  sm:leading-9
                  resize-none
                  outline-none
                  focus:border-[#b78d3d]
                  focus:ring-2
                  focus:ring-[#d9c08b]
                "
              />

            </div>

            {hasLinks && (
              <div className="mt-6 sm:mt-8 rounded-[24px] sm:rounded-[28px] border border-[#d8c39a] bg-[#fff8ec] p-5 sm:p-6">

                <p className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#b78d3d]">
                  У Лаконії не використовують посилання.
                </p>

                <p className="mt-3 text-base sm:text-lg lg:text-xl text-[#5f5f5f]">
                  Ми цінуємо не адреси сайтів,
                  а думки людей.
                </p>

              </div>
            )}

            {/* Статистика */}

            <div className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

              <div className="rounded-[24px] sm:rounded-[28px] bg-white/90 border border-[#e3d7c0] p-4 sm:p-6 text-center">

                <p className="text-[#b78d3d] font-serif text-lg sm:text-2xl">
                  Баланс
                </p>

                <p className="font-serif text-4xl sm:text-5xl lg:text-6xl mt-3">
                  {user.wordBalance}
                </p>

              </div>

              <div className="rounded-[24px] sm:rounded-[28px] bg-white/90 border border-[#e3d7c0] p-4 sm:p-6 text-center">

                <p className="text-[#b78d3d] font-serif text-lg sm:text-2xl">
                  Замітка
                </p>

                <p className="font-serif text-4xl sm:text-5xl lg:text-6xl mt-3">
                  {words}
                </p>

              </div>

              <div className="rounded-[24px] sm:rounded-[28px] bg-white/90 border border-[#e3d7c0] p-4 sm:p-6 text-center">

                <p className="text-[#b78d3d] font-serif text-lg sm:text-2xl">
                  Після
                </p>

                <p
                  className={`font-serif text-4xl sm:text-5xl lg:text-6xl mt-3 ${
                    remaining < 0 ? "text-red-600" : ""
                  }`}
                >
                  {remaining}
                </p>

              </div>

              <div className="rounded-[24px] sm:rounded-[28px] bg-white/90 border border-[#e3d7c0] p-4 sm:p-6 text-center">

                <p className="text-[#b78d3d] font-serif text-lg sm:text-2xl">
                  Передано
                </p>

                <p className="font-serif text-4xl sm:text-5xl lg:text-6xl mt-3">
                  {words}
                </p>

              </div>

            </div>

            <p className="mt-6 sm:mt-8 text-center text-[#8b7d6d] text-sm sm:text-lg">
              Кожна послідовність символів між пробілами
              вважається одним словом.
            </p>

            <div className="mt-8 sm:mt-10 flex justify-center">

              <button
                onClick={publishReply}
                disabled={!canPublish}
                className={`
                  rounded-full
                  px-6
                  sm:px-12
                  py-3
                  sm:py-5
                  text-lg
                  sm:text-2xl
                  font-serif
                  transition
                  ${
                    canPublish
                      ? "bg-[#311b37] text-white hover:opacity-90"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }
                `}
              >
                Долучитися до думки
              </button>

            </div>

          </>
        )}

      </div>
    </main>
  );
}