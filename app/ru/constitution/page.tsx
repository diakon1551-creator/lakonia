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

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="flex justify-center mb-8">
          <Link href="/ru">
            <img
              src="/logo.png"
              alt="LAKONIA"
              className="w-28 h-auto cursor-pointer"
            />
          </Link>
        </div>

        <h1 className="text-center font-serif text-6xl text-[#37253f]">
          Конституция Лаконии
        </h1>

        <p className="text-center text-xl italic mt-4 text-[#6b5b71]">
          Соглашение между Лилит и человеком.
        </p>

        <div className="flex items-center justify-center gap-4 mt-8 mb-12">

          <div className="w-24 h-px bg-[#c8a35d]" />

          <div className="text-[#b78d3d] text-xl">
            ✦
          </div>

          <div className="w-24 h-px bg-[#c8a35d]" />

        </div>

        <div className="relative grid lg:grid-cols-2 gap-10">

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

          <section
            className="
              rounded-[34px]
              bg-white/80
              backdrop-blur-sm
              border border-[#e5d5b7]
              shadow-[0_10px_35px_rgba(0,0,0,0.08)]
              p-8
            "
          >
            <h2 className="font-serif text-5xl text-[#a87b2c]">
              Лилит
            </h2>

            <p className="mt-3 mb-8 text-[#6b5b71] italic">
              То, чего Лилит никогда не будет делать.
            </p>

            <div className="space-y-8">

              <Rule
                icon={<Hourglass size={34} />}
                title="Время принадлежит человеку"
                text="Лилит не стремится удерживать внимание пользователя дольше, чем это необходимо. Жизнь важнее пребывания в Лаконии."
              />

              <Rule
                icon={<Moon size={34} />}
                title="Молчание не является проступком"
                text="Лилит не наказывает за пассивность, отсутствие или длительное молчание. Каждый говорит только тогда, когда ему действительно есть что сказать."
              />

              <Rule
                icon={<Feather size={34} />}
                title="Слова принадлежат автору"
                text="Лилит не редактирует, не цензурирует и не оценивает тексты. Ответственность за слова несёт их автор."
              />

              <Rule
                icon={<EyeOff size={34} />}
                title="Человек не является объектом наблюдения"
                text="Лилит не изучает пользователей, не создаёт психологические профили и не подбирает контент на основе поведения."
              />

              <Rule
                icon={<Trophy size={34} />}
                title="Без рейтингов и соревнования"
                text="Лилит не выставляет оценки, не формирует рейтинги и не превращает общение в борьбу за популярность."
              />

              <Rule
                icon={<Scale size={34} />}
                title="Слова имеют вес"
                text="Лилит ведёт лишь учёт слов. Она не определяет их ценность, но напоминает, что каждое слово имеет вес."
              />

            </div>
          </section>

          <section
            className="
              rounded-[34px]
              bg-white/80
              backdrop-blur-sm
              border border-[#e5d5b7]
              shadow-[0_10px_35px_rgba(0,0,0,0.08)]
              p-8
            "
          >
            <h2 className="font-serif text-5xl text-[#a87b2c]">
              Участник Лаконии
            </h2>

            <p className="mt-3 mb-8 text-[#6b5b71] italic">
              То, за что отвечает каждый участник.
            </p>

            <div className="space-y-8">

              <Rule
                icon={<ShieldCheck size={34} />}
                title="Совершеннолетие"
                text="Участником Лаконии может быть только совершеннолетний человек, способный самостоятельно отвечать за свои слова."
              />

              <Rule
                icon={<Handshake size={34} />}
                title="Уважение к собеседнику"
                text="Допускается критика мыслей, идей и взглядов. Не допускаются оскорбления, унижение и переход на личности."
              />

              <Rule
                icon={<BookOpen size={34} />}
                title="Честность"
                text="Не выдавай чужое за своё. Не приписывай себе того, чего не делал и не знаешь."
              />

              <Rule
                icon={<Compass size={34} />}
                title="Ответственность за сказанное"
                text="Прежде чем говорить, стоит задуматься. После сказанного ответственность остаётся за автором."
              />

            </div>
          </section>

        </div>

        <div className="text-center mt-14">

          <Link
            href="/ru/register"
            className="
              inline-block
              px-8
              py-4
              rounded-xl
              bg-[#311b37]
              text-white
              hover:opacity-90
              transition
            "
          >
            Вернуться к регистрации
          </Link>

        </div>

        <footer className="mt-16 text-center text-sm text-[#8a7d72]">
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
    <div className="flex gap-4">

      <div className="text-[#b78d3d] mt-1 flex-shrink-0">
        {icon}
      </div>

      <div>

        <h3 className="font-serif text-2xl mb-2">
          {title}
        </h3>

        <p className="text-[17px] leading-7 text-[#4d4052]">
          {text}
        </p>

      </div>

    </div>
  );
}