import React from "react";
import Link from "next/link";
import {
  Hourglass,
  Moon,
  Feather,
  EyeOff,
  Trophy,
  Scale,
  ShieldCheck,
  Handshake,
  BookOpen,
  Compass,
} from "lucide-react";

export default function ConstitutionPage() {
  return (
    <main className="min-h-screen bg-[#f7f2ea] text-[#37253f]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">

        {/* Логотип */}

        <div className="flex justify-center mb-6 md:mb-8">
          <Link href="/">
            <img
              src="/logo.png"
              alt="LAKONIA"
              className="w-20 md:w-28 h-auto cursor-pointer"
            />
          </Link>
        </div>

        {/* Заголовок */}

        <h1 className="text-center font-serif text-4xl md:text-6xl text-[#37253f]">
          Конституція Лаконії
        </h1>

        <p className="text-center text-base md:text-xl italic mt-4 text-[#6b5b71]">
          Угода між Ліліт та людиною.
        </p>

        {/* Розділювач */}

        <div className="flex items-center justify-center gap-4 mt-8 mb-10 md:mb-12">

          <div className="w-12 md:w-24 h-px bg-[#c8a35d]" />

          <div className="text-[#b78d3d] text-xl">
            ✦
          </div>

          <div className="w-12 md:w-24 h-px bg-[#c8a35d]" />

        </div>

        {/* Колонки */}

        <div className="relative grid lg:grid-cols-2 gap-6 md:gap-10">

          {/* Центральна лінія */}

          <div
            className="
              hidden lg:block
              absolute
              left-1/2
              top-0
              bottom-0
              w-px
              bg-gradient-to-b
              from-transparent
              via-[#c8a35d]
              to-transparent
              -translate-x-1/2
            "
          />

          {/* Ліліт */}

          <section
            className="
              rounded-[28px] md:rounded-[34px]
              bg-white/80
              backdrop-blur-sm
              border border-[#e5d5b7]
              shadow-[0_10px_35px_rgba(0,0,0,0.08)]
              p-5 md:p-8
            "
          >
            <h2 className="font-serif text-3xl md:text-5xl text-[#a87b2c]">
              Ліліт
            </h2>

            <p className="mt-3 mb-6 md:mb-8 text-sm md:text-base text-[#6b5b71] italic">
              Те, чого Ліліт ніколи не робитиме.
            </p>

            <div className="space-y-6 md:space-y-8">

              <Rule
                icon={<Hourglass size={30} />}
                title="Час належить людині"
                text="Ліліт не прагне утримувати увагу користувача довше, ніж це необхідно. Життя важливіше за перебування в Лаконії."
              />

              <Rule
                icon={<Moon size={30} />}
                title="Мовчання не є провиною"
                text="Ліліт не карає за пасивність, відсутність чи тривале мовчання. Кожен говорить лише тоді, коли справді має що сказати."
              />

              <Rule
                icon={<Feather size={30} />}
                title="Слова належать автору"
                text="Ліліт не редагує, не цензурує і не оцінює тексти. Відповідальність за слова несе їхній автор."
              />

              <Rule
                icon={<EyeOff size={30} />}
                title="Людина не є об'єктом спостереження"
                text="Ліліт не вивчає користувачів, не створює психологічних профілів і не підбирає контент на основі поведінки."
              />

              <Rule
                icon={<Trophy size={30} />}
                title="Без рейтингів і змагання"
                text="Ліліт не виставляє оцінок, не формує рейтингів і не перетворює спілкування на боротьбу за популярність."
              />

              <Rule
                icon={<Scale size={30} />}
                title="Слова мають вагу"
                text="Ліліт веде лише облік слів. Вона не визначає їхню цінність, але нагадує, що кожне слово має вагу."
              />

            </div>
          </section>

          {/* Учасник */}

          <section
            className="
              rounded-[28px] md:rounded-[34px]
              bg-white/80
              backdrop-blur-sm
              border border-[#e5d5b7]
              shadow-[0_10px_35px_rgba(0,0,0,0.08)]
              p-5 md:p-8
            "
          >
            <h2 className="font-serif text-3xl md:text-5xl text-[#a87b2c]">
              Учасник Лаконії
            </h2>

            <p className="mt-3 mb-6 md:mb-8 text-sm md:text-base text-[#6b5b71] italic">
              Те, за що відповідає кожен учасник.
            </p>

            <div className="space-y-6 md:space-y-8">

              <Rule
                icon={<ShieldCheck size={30} />}
                title="Повноліття"
                text="Учасником Лаконії може бути лише повнолітня людина, здатна самостійно відповідати за свої слова."
              />

              <Rule
                icon={<Handshake size={30} />}
                title="Повага до співрозмовника"
                text="Дозволяється критикувати думки, ідеї та погляди. Не допускаються образи, приниження та перехід на особистості."
              />

              <Rule
                icon={<BookOpen size={30} />}
                title="Чесність"
                text="Не видавай чуже за своє. Не приписуй собі того, чого не робив і не знаєш."
              />

              <Rule
                icon={<Compass size={30} />}
                title="Відповідальність за сказане"
                text="Перш ніж говорити, варто замислитися. Після сказаного відповідальність залишається за автором."
              />

            </div>
          </section>

        </div>

        {/* Кнопка */}

        <div className="text-center mt-10 md:mt-14">

          <Link
            href="/register"
            className="
              inline-block
              px-6 md:px-8
              py-3 md:py-4
              rounded-xl
              bg-[#311b37]
              text-white
              hover:opacity-90
              transition
            "
          >
            Повернутися до реєстрації
          </Link>

        </div>

        <footer className="mt-12 md:mt-16 text-center text-sm text-[#8a7d72]">
          © LAKONIA 2026 • v0.0.2
        </footer>

      </div>
    </main>
  );
}

function Rule({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3 md:gap-4">

      <div className="text-[#b78d3d] mt-1 flex-shrink-0">
        {icon}
      </div>

      <div>

        <h3 className="font-serif text-xl md:text-2xl mb-2">
          {title}
        </h3>

        <p className="text-sm md:text-[17px] leading-6 md:leading-7 text-[#4d4052]">
          {text}
        </p>

      </div>

    </div>
  );
}