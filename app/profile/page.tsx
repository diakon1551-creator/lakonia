import Link from "next/link";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const cookieStore = await cookies();

  const userId = Number(
    cookieStore.get("userId")?.value
  );

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      notes: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f7f2ea] px-6">
        <p className="font-serif text-xl md:text-3xl text-center">
          Користувача не знайдено.
        </p>
      </main>
    );
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
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-8">

        {/* Верх */}

        <div className="flex justify-between items-center">

          <Link
            href="/dashboard"
            className="text-[#b78d3d] text-4xl md:text-6xl hover:opacity-70"
          >
            ‹
          </Link>

          <img
            src="/logo.png"
            alt="Lakonia"
            className="w-14 md:w-24"
          />

          <div className="w-8 md:w-12" />

        </div>

        {/* Автор */}

        <div className="text-center mt-8 md:mt-10">

          <h1 className="font-serif text-3xl md:text-6xl break-all">
            {user.nickname}
          </h1>

          <div className="w-20 md:w-32 h-px bg-[#c8a35d] mx-auto mt-4" />

          <p className="mt-4 md:mt-5 font-serif text-2xl md:text-3xl text-[#a87b2c]">
            {user.wordBalance} слів
          </p>

        </div>

        {/* Риска */}

        <div className="flex items-center justify-center gap-3 md:gap-4 mt-8 md:mt-12">

          <div className="w-12 md:w-24 h-px bg-[#c8a35d]" />

          <div className="text-[#c8a35d]">
            ✦
          </div>

          <div className="w-12 md:w-24 h-px bg-[#c8a35d]" />

        </div>

        {/* Заголовок */}

        <h2 className="text-center mt-8 md:mt-12 font-serif text-3xl md:text-5xl">
          Мої замітки
        </h2>

        {/* Замітки */}

        <div className="mt-8 md:mt-10 space-y-4 md:space-y-6">

          {user.notes.map((note) => (
            <Link
              key={note.id}
              href={`/listen/${note.id}`}
              className="
                block
                rounded-[20px]
                md:rounded-[28px]
                border
                border-[#eadbc2]
                bg-white/45
                backdrop-blur-sm
                p-5
                md:p-8
                hover:bg-white/60
                transition
              "
            >
              <p className="font-serif text-lg md:text-3xl leading-relaxed break-words">

                {note.text
                  .split(/\s+/)
                  .slice(0, 15)
                  .join(" ")}

                ...

              </p>

              <p className="mt-3 md:mt-4 text-sm md:text-base text-[#a87b2c]">
                {note.wordCount} слів
              </p>

            </Link>
          ))}

        </div>

        {user.notes.length === 0 && (
          <div
            className="
              mt-8
              rounded-[20px]
              md:rounded-[28px]
              border
              border-[#eadbc2]
              bg-white/45
              backdrop-blur-sm
              p-6
              text-center
            "
          >
            <p className="font-serif text-xl md:text-3xl text-[#a87b2c]">
              У вас ще немає заміток.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}