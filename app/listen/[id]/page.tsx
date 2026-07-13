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
      <main className="min-h-screen flex items-center justify-center bg-[#f7f2ea]">
        <p className="font-serif text-3xl text-[#5a3b43]">
          Думку не знайдено.
        </p>
      </main>
    );
  }

  // Поки що вручну.
  // Пізніше тут буде кількість відповідей із БД.
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
      <div className="max-w-4xl mx-auto px-8 py-8">

        {/* Верх */}

        <div className="flex justify-between items-start">

          <Link
            href="/listen"
            className="text-6xl text-[#b78d3d] hover:opacity-70 transition"
          >
            ‹
          </Link>

          <Link href="/dashboard">
            <img
              src="/logo.png"
              alt="LAKONIA"
              className="w-24 hover:scale-105 transition"
            />
          </Link>

          <div className="text-right">

            <Link
  href="/profile"
  className="font-serif text-3xl hover:text-[#b78d3d] transition"
>
  {note.author.nickname}
</Link>

            <div className="w-20 h-px bg-[#b78d3d] mt-2 ml-auto"></div>

            <p className="mt-2 font-serif text-2xl">
              {note.author.wordBalance} слів
            </p>

          </div>

        </div>

        {/* декоративна риска */}

        <div className="flex items-center justify-center gap-4 mt-10">

          <div className="w-24 h-px bg-[#c8a35d]" />

          <div className="text-[#c8a35d]">
            ✦
          </div>

          <div className="w-24 h-px bg-[#c8a35d]" />

        </div>

        {/* Автор */}

        <div className="text-center mt-10">

          <h1 className="font-serif text-5xl">
            {note.author.nickname}
          </h1>

        </div>

        {/* Текст */}

        <div
          className="
            mt-12
            rounded-[36px]
            bg-white/40
            backdrop-blur-sm
            border
            border-[#eadbc2]
            px-12
            py-12
            shadow-lg
          "
        >
          <p
            className="
              whitespace-pre-wrap
              text-[34px]
              leading-[1.8]
              font-serif
            "
          >
            {note.text}
          </p>
        </div>

        {/* Долучитися */}

        <Link
          href={`/reply/${note.id}`}
          className="
            mt-12
            w-full
            h-24
            rounded-[28px]
            bg-gradient-to-r
            from-[#ead19c]
            to-[#f5e6c7]
            flex
            items-center
            justify-between
            px-10
            shadow-lg
            hover:scale-[1.01]
            transition
          "
        >
          <div className="flex items-center gap-5">

            <img
              src="/icons/note.png"
              alt=""
              className="w-10 h-10"
            />

            <span className="font-serif text-4xl">
              Долучитися до думки
            </span>

          </div>

          <span className="text-5xl text-[#9f7a30]">
            →
          </span>

        </Link>

        {/* Кількість відповідей */}

        <div className="mt-8 text-center font-serif text-3xl text-[#a87b2c]">

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

        <div className="flex items-center justify-center gap-4 mt-10">

          <div className="w-24 h-px bg-[#c8a35d]" />

          <div className="text-[#c8a35d]">
            ✦
          </div>

          <div className="w-24 h-px bg-[#c8a35d]" />

        </div>

        {/* Низ */}

        <p className="text-center mt-8 font-serif text-3xl text-[#a87b2c]">
          Слова мають вагу.
        </p>

      </div>
    </main>
  );
}