import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const note = await prisma.note.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      author: true,
    },
  });

  if (!note) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f7f2ea] px-6">
        <p className="font-serif text-xl md:text-3xl text-center text-[#5a3b43]">
          Думку не знайдено.
        </p>
      </main>
    );
  }

  const repliesCount = 0;

  return (
    <main
      className="min-h-screen bg-[#f7f2ea] text-[#37253f]"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-6 md:py-8">

        {/* Верх */}

        <div className="flex justify-between items-start gap-3">

          <Link
            href="/listen"
            className="text-4xl md:text-6xl text-[#b78d3d] hover:opacity-70 transition"
          >
            ‹
          </Link>

          <Link href="/dashboard">
            <img
              src="/logo.png"
              alt="LAKONIA"
              className="w-14 md:w-24 hover:scale-105 transition"
            />
          </Link>

          <div className="text-right">

            <Link
              href="/profile"
              className="font-serif text-lg md:text-3xl hover:text-[#b78d3d] transition break-all"
            >
              {note.author.nickname}
            </Link>

            <div className="w-12 md:w-20 h-px bg-[#b78d3d] mt-2 ml-auto"></div>

            <p className="mt-2 font-serif text-sm md:text-2xl">
              {note.author.wordBalance} слів
            </p>

          </div>

        </div>

        {/* декоративна риска */}

        <div className="flex items-center justify-center gap-3 md:gap-4 mt-8 md:mt-10">

          <div className="w-12 md:w-24 h-px bg-[#c8a35d]" />

          <div className="text-[#c8a35d]">
            ✦
          </div>

          <div className="w-12 md:w-24 h-px bg-[#c8a35d]" />

        </div>

        {/* Автор */}

        <div className="text-center mt-8 md:mt-10">

          <h1 className="font-serif text-3xl md:text-5xl">
            {note.author.nickname}
          </h1>

        </div>

        {/* Текст */}

        <div
          className="
            mt-8
            md:mt-12
            rounded-[24px]
            md:rounded-[36px]
            bg-white/40
            backdrop-blur-sm
            border
            border-[#eadbc2]
            px-5
            py-6
            md:px-12
            md:py-12
            shadow-lg
          "
        >
          <p
            className="
              whitespace-pre-wrap
              text-lg
              md:text-[34px]
              leading-relaxed
              md:leading-[1.8]
              font-serif
              break-words
            "
          >
            {note.text}
          </p>
        </div>

        {/* Долучитися */}

        <Link
          href={`/reply/${note.id}`}
          className="
            mt-8
            md:mt-12
            w-full
            h-16
            md:h-24
            rounded-[20px]
            md:rounded-[28px]
            bg-gradient-to-r
            from-[#ead19c]
            to-[#f5e6c7]
            flex
            items-center
            justify-between
            px-4
            md:px-10
            shadow-lg
            hover:scale-[1.01]
            transition
          "
        >
          <div className="flex items-center gap-3 md:gap-5 min-w-0">

            <img
              src="/icons/note.png"
              alt=""
              className="w-7 h-7 md:w-10 md:h-10 flex-shrink-0"
            />

            <span className="font-serif text-lg md:text-4xl truncate">
              Долучитися до думки
            </span>

          </div>

          <span className="text-2xl md:text-5xl text-[#9f7a30] ml-3">
            →
          </span>

        </Link>

        {/* Кількість відповідей */}

        <div className="mt-6 md:mt-8 text-center font-serif text-xl md:text-3xl text-[#a87b2c]">

          {repliesCount === 0 ? (
            <>До думки ще ніхто не долучився.</>
          ) : (
            <>
              До думки долучилися{" "}
              <Link
                href={`/reply/${note.id}/list`}
                className="
                  underline
                  underline-offset-4
                  hover:text-[#8c6826]
                  transition
                "
              >
                {repliesCount} {repliesCount === 1 ? "людина" : "людей"}
              </Link>
            </>
          )}

        </div>

        {/* декоративна риска */}

        <div className="flex items-center justify-center gap-3 md:gap-4 mt-8 md:mt-10">

          <div className="w-12 md:w-24 h-px bg-[#c8a35d]" />

          <div className="text-[#c8a35d]">
            ✦
          </div>

          <div className="w-12 md:w-24 h-px bg-[#c8a35d]" />

        </div>

        {/* Низ */}

        <p className="text-center mt-6 md:mt-8 font-serif text-2xl md:text-3xl text-[#a87b2c]">
          Слова мають вагу.
        </p>

      </div>
    </main>
  );
}