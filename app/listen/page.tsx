import Link from "next/link";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import NextNoteButton from "./NextNoteButton";

export default async function ListenPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  const cookieStore = await cookies();

  const userId = Number(cookieStore.get("userId")?.value);

  let note = null;

  if (id) {
    note = await prisma.note.findFirst({
      where: {
        id: Number(id),
        published: true,
        authorId: {
          not: userId,
        },
      },
      include: {
        author: true,
      },
    });
  }

  if (!note) {
    note = await prisma.note.findFirst({
      where: {
        published: true,
        authorId: {
          not: userId,
        },
      },
      orderBy: {
        id: "asc",
      },
      include: {
        author: true,
      },
    });
  }

  if (!note) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f7f2ea]">
        <p className="font-serif text-3xl text-[#5a3b43]">
          Ліліт поки що не знайшла жодної думки.
        </p>
      </main>
    );
  }

  const preview =
    note.text
      .trim()
      .split(/\s+/)
      .slice(0, 10)
      .join(" ") + "...";

  return (
    <main
      className="min-h-screen bg-[#f7f2ea] text-[#37253f] relative overflow-hidden"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
      }}
    >
      <div className="max-w-5xl mx-auto px-8 py-8 relative z-10">

        {/* Верхня панель */}

        <div className="flex justify-between items-start">

          <Link
            href="/dashboard"
            className="text-[#b78d3d] text-6xl hover:opacity-70 transition"
          >
            ‹
          </Link>

          <Link href="/dashboard">
            <img
              src="/logo.png"
              alt="Lakonia"
              className="w-24 hover:scale-105 transition"
            />
          </Link>

          <div className="flex items-start gap-4">

            <div className="text-right">

             <Link
  href="/profile"
  className="font-serif text-3xl hover:text-[#b78d3d] transition"
>
  {note.author.nickname}
</Link>

              <div className="w-20 h-px bg-[#b78d3d] mt-2 ml-auto"></div>

              <p className="mt-2 text-2xl font-serif">
                {note.author.wordBalance} слів
              </p>

            </div>

            <button
              className="
                w-14
                h-14
                rounded-full
                border-2
                border-[#b78d3d]
                flex
                items-center
                justify-center
              "
            >
              👤
            </button>

          </div>

        </div>

        {/* Заголовок */}

        <div className="text-center mt-10">

          <h1 className="font-serif text-7xl">
            Почути когось
          </h1>

          <p className="mt-4 text-3xl text-[#a87b2c] font-serif">
            Ліліт пропонує одну думку, написану кимось.
          </p>

        </div>

        {/* декоративна риска */}

        <div className="flex items-center justify-center gap-4 mt-8 mb-12">

          <div className="w-24 h-px bg-[#c8a35d]" />

          <div className="text-[#c8a35d]">
            ✦
          </div>

          <div className="w-24 h-px bg-[#c8a35d]" />

        </div>

        {/* Картка */}

        <div
          className="
            rounded-[36px]
            border
            border-[#eadbc2]
            bg-white/45
            backdrop-blur-sm
            shadow-xl
            px-12
            py-12
          "
        >

          <p className="font-serif text-3xl">
            {note.author.nickname}
          </p>

          <div className="mt-10">

            <p
              className="
                whitespace-pre-wrap
                text-[42px]
                leading-[1.45]
                font-serif
              "
            >
              {preview}
            </p>

          </div>

          <div className="border-t border-[#eadbc2] mt-12 pt-8">

            <p className="text-2xl font-serif text-[#5f5048]">
              Думку продовжили 0 разів
            </p>

          </div>

        </div>

        {/* Кнопка читати */}

        <Link
          href={`/listen/${note.id}`}
          className="
            mt-10
            h-24
            rounded-[28px]
            bg-gradient-to-r
            from-[#ead19c]
            to-[#f6e7c8]
            flex
            items-center
            justify-between
            px-12
            shadow-lg
            hover:scale-[1.01]
            transition
          "
        >
          <span className="font-serif text-4xl">
            Читати
          </span>

          <span className="text-5xl text-[#9f7a30]">
            →
          </span>
        </Link>

        {/* Наступна думка */}

        <NextNoteButton currentId={note.id} />

        {/* Низ */}

        <div className="mt-20 text-center">

          <p className="font-serif text-3xl text-[#a87b2c]">
            Слова мають вагу.
          </p>

          <div className="flex justify-center items-center gap-4 mt-6">

            <div className="w-24 h-px bg-[#c8a35d]" />

            <div className="text-[#c8a35d]">
              ✦
            </div>

            <div className="w-24 h-px bg-[#c8a35d]" />

          </div>

        </div>

      </div>
    </main>
  );
}