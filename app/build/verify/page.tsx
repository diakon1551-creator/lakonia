import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function VerifyPlacePage() {
  const place = await prisma.place.findFirst({
    orderBy: {
      createdAt: "asc",
    },
    include: {
      author: true,
    },
  });

  if (!place) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f7f2ea]">
        <p className="font-serif text-3xl text-[#5a3b43]">
          Наразі немає місць для перевірки.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f2ea] text-[#37253f]">
      <div className="max-w-4xl mx-auto px-8 py-12">

        <h1 className="font-serif text-6xl text-[#a87b2c] text-center">
          Перевірити місце
        </h1>

        <p className="text-center text-2xl mt-4">
          Якщо опис відповідає реальності —
          підтвердьте його.
        </p>

        <div className="mt-12 rounded-[30px] bg-white p-8 border border-[#d9c9a7]">

          <h2 className="font-serif text-4xl">
            {place.title}
          </h2>

          <p className="mt-6 text-xl leading-9">
            {place.description}
          </p>

          <div className="mt-8 text-[#a87b2c]">
            Автор: {place.author.nickname}
          </div>

          <div className="mt-4 text-[#666]">
            Нагорода за підтвердження:
            {" "}
            {place.wordCount} слів
          </div>

        </div>

        <div className="mt-10 flex justify-center">

          <Link
            href={`/verify-place/${place.id}`}
            className="
              rounded-full
              px-10
              py-4
              bg-[#311b37]
              text-white
              text-2xl
              font-serif
            "
          >
            Перевірити місце
          </Link>

        </div>

      </div>
    </main>
  );
}