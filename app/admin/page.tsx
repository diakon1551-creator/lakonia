import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const usersCount = await prisma.user.count();

  const notesCount = await prisma.note.count({
    where: {
      parentId: null,
    },
  });

  const repliesCount = await prisma.note.count({
    where: {
      parentId: {
        not: null,
      },
    },
  });

  const engagement =
    notesCount > 0
      ? Math.round((repliesCount / notesCount) * 100)
      : 0;

  return (
    <main className="min-h-screen bg-[#f7f2ea] text-[#37253f]">
      <div className="max-w-5xl mx-auto px-8 py-12">

        <h1 className="font-serif text-6xl text-center mb-12">
          Адміністрування Лаконії
        </h1>

        <div className="grid md:grid-cols-3 gap-8">

          <StatCard
            title="Учасники"
            value={usersCount}
          />

          <StatCard
            title="Замітки"
            value={notesCount}
          />

          <StatCard
            title="Відповіді"
            value={repliesCount}
          />

        </div>

        <div className="mt-12 text-center">

          <p className="font-serif text-3xl text-[#a87b2c]">
            Співвідношення відповідей до заміток
          </p>

          <p className="font-serif text-7xl mt-4">
            {engagement}%
          </p>

        </div>

        <div className="flex items-center justify-center gap-4 mt-12">

          <div className="w-24 h-px bg-[#c8a35d]" />

          <div className="text-[#c8a35d]">
            ✦
          </div>

          <div className="w-24 h-px bg-[#c8a35d]" />

        </div>

        <p className="text-center mt-6 text-[#8a7d72]">
          Слова мають вагу.
        </p>

      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div
      className="
        rounded-[34px]
        bg-white
        border
        border-[#e5d5b7]
        p-10
        text-center
        shadow-lg
      "
    >
      <p className="font-serif text-3xl text-[#a87b2c]">
        {title}
      </p>

      <h2 className="font-serif text-7xl mt-6">
        {value}
      </h2>
    </div>
  );
}