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

  return (
    <main className="min-h-screen bg-[#f7f2ea] text-[#37253f] p-10">

      <div className="max-w-5xl mx-auto">

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