import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <main
      className="min-h-screen bg-[#f7f2ea] text-[#37253f] relative overflow-hidden"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
      }}
    >
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-6 md:py-8 relative z-10">

        {/* Верхній правий кут */}

        <div className="flex justify-end items-center gap-3 md:gap-4 mb-8 md:mb-10">

          <div className="text-right">

            <Link
              href="/profile"
              className="font-serif text-xl md:text-3xl hover:text-[#b78d3d] transition"
            >
              {user.nickname}
            </Link>

            <div className="w-14 md:w-20 h-[2px] bg-[#b78d3d] mt-2 ml-auto rounded-full"></div>

          </div>

          <button className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-[#b78d3d] flex items-center justify-center hover:bg-[#f2eadc] transition">
            👤
          </button>

        </div>

        {/* Логотип */}

        <div className="flex flex-col items-center">

          <img
            src="/logo.png"
            alt="LAKONIA"
            className="w-24 md:w-36 mb-4 md:mb-6"
          />

          <h1 className="font-serif tracking-[0.18em] md:tracking-[0.42em] text-[38px] sm:text-[52px] md:text-[90px] leading-none text-center">
            LAKONIA
          </h1>

        </div>

        {/* декоративна риска */}

        <div className="flex items-center justify-center gap-3 md:gap-4 mt-8 md:mt-10">

          <div className="w-12 md:w-24 h-px bg-[#c8a35d]"></div>

          <div className="text-[#b78d3d] text-xl">
            ✦
          </div>

          <div className="w-12 md:w-24 h-px bg-[#c8a35d]"></div>

        </div>

        {/* Вітання */}

        <div className="text-center mt-6 md:mt-8">

          <h2 className="font-serif text-3xl md:text-5xl text-[#a87b2c]">
            Добрий вечір, {user.nickname}.
          </h2>

          <p className="mt-3 text-xl md:text-3xl font-serif">
            Рада бачити тебе у Лаконії.
          </p>

        </div>

        {/* декоративна риска */}

        <div className="flex items-center justify-center gap-3 md:gap-4 mt-8 md:mt-10">

          <div className="w-12 md:w-24 h-px bg-[#c8a35d]"></div>

          <div className="text-[#b78d3d] text-xl">
            ✦
          </div>

          <div className="w-12 md:w-24 h-px bg-[#c8a35d]"></div>

        </div>

        {/* Баланс */}

        <div className="text-center mt-8 md:mt-10">

          <p className="font-serif text-2xl md:text-3xl text-[#a87b2c]">
            Баланс слів
          </p>

          <h2 className="font-serif text-[72px] sm:text-[90px] md:text-[120px] leading-none mt-3 md:mt-4">
            {user.wordBalance}
          </h2>

          <p className="font-serif text-2xl md:text-4xl mt-2">
            слів
          </p>

        </div>

        {/* Меню */}

        <div className="mt-10 md:mt-14 space-y-5 md:space-y-8">

          <MenuCard
            href="/express"
            image="/icons/quill.png"
            title="Висловитися"
            subtitle="Поділитися своєю думкою"
          />

          <MenuCard
            href="/listen"
            image="/icons/note.png"
            title="Почути когось"
            subtitle="Прочитати чужу замітку"
          />

          <MenuCard
            href="/build"
            image="/icons/location.png"
            title="Будувати Лаконію"
            subtitle="Заробити слова, наповнюючи світ"
          />

        </div>

        {/* Нижній декоративний блок */}

        <div className="mt-12 md:mt-16 mb-10 md:mb-12">

          <div className="flex items-center justify-center gap-3 md:gap-4">

            <div className="w-12 md:w-24 h-px bg-[#c8a35d]"></div>

            <div className="text-[#b78d3d] text-xl">
              ✦
            </div>

            <div className="w-12 md:w-24 h-px bg-[#c8a35d]"></div>

          </div>

          <p className="text-center mt-6 text-[#a87b2c] font-serif text-2xl md:text-3xl">
            Слова мають вагу.
          </p>

        </div>

      </div>
    </main>
  );
}

function MenuCard({
  href,
  image,
  title,
  subtitle,
}: {
  href: string;
  image: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Link
      href={href}
      className="
        block
        rounded-[28px] md:rounded-[34px]
        bg-white/80
        backdrop-blur-sm
        border border-[#e5d5b7]
        shadow-[0_10px_35px_rgba(0,0,0,0.08)]
        hover:shadow-[0_12px_45px_rgba(0,0,0,0.12)]
        transition
      "
    >
      <div className="flex items-center px-4 md:px-8 py-5 md:py-8">

        <div
          className="
            w-16 h-16 md:w-24 md:h-24
            rounded-full
            border-2 border-[#c8a35d]
            flex items-center justify-center
            flex-shrink-0
          "
        >
          <img
            src={image}
            alt=""
            className="w-8 h-8 md:w-12 md:h-12 object-contain"
          />
        </div>

        <div className="ml-4 md:ml-8 flex-1 min-w-0">

          <h2 className="font-serif text-2xl md:text-5xl leading-none text-[#43253f]">
            {title}
          </h2>

          <p className="mt-2 md:mt-3 text-sm md:text-2xl text-[#666]">
            {subtitle}
          </p>

        </div>

        <div className="text-[#b78d3d] text-3xl md:text-6xl ml-3 md:ml-6 flex-shrink-0">
          ›
        </div>

      </div>
    </Link>
  );
}