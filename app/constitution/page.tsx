import Link from "next/link";

export default function ConstitutionPage() {
  return (
    <main className="min-h-screen bg-[#f7f2ea] text-[#37253f]">

      <div className="max-w-4xl mx-auto px-8 py-12">

        <div className="flex justify-center mb-8">
          <Link href="/">
            <img
              src="/logo.png"
              alt="LAKONIA"
              className="w-32 h-auto cursor-pointer"
            />
          </Link>
        </div>

        <h1 className="font-serif text-6xl text-center tracking-wide">
          Конституція Лаконії
        </h1>

        <div className="flex items-center justify-center gap-4 mt-8">

          <div className="w-24 h-px bg-[#c8a35d]" />

          <div className="text-[#b78d3d] text-xl">
            ✦
          </div>

          <div className="w-24 h-px bg-[#c8a35d]" />

        </div>

        <p className="text-center italic text-2xl mt-8 text-[#5b4b61]">
          Лаконія — це місце, де слова мають вагу.
        </p>

        <div className="mt-12 space-y-6">

          <Article
            number="1"
            title="Слова мають вагу"
            text="Пиши лише тоді, коли справді маєш що сказати."
          />

          <Article
            number="2"
            title="Поважай інших"
            text="Критикуй думки, а не людей."
          />

          <Article
            number="3"
            title="Не засмічуй простір"
            text="Якість важливіша за кількість."
          />

          <Article
            number="4"
            title="Будь чесним"
            text="Не видавай чуже за своє."
          />

          <Article
            number="5"
            title="Будуй Лаконію разом з нами"
            text="Кожен учасник впливає на майбутнє спільноти."
          />

        </div>

        <div className="mt-14 text-center">

          <Link
            href="/register"
            className="inline-block rounded-xl bg-[#311b37] px-8 py-4 text-white hover:opacity-90 transition"
          >
            Повернутися до реєстрації
          </Link>

        </div>

        <footer className="mt-16 text-center text-sm text-[#8b7c6d]">
          © LAKONIA 2026 • v0.0.2
        </footer>

      </div>

    </main>
  );
}

function Article({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div
      className="rounded-[24px] bg-white/80 border border-[#e5d5b7]
      shadow-[0_10px_35px_rgba(0,0,0,0.06)] p-6"
    >
      <div className="text-[#b78d3d] font-serif text-xl mb-2">
        Стаття {number}
      </div>

      <h2 className="font-serif text-3xl mb-3">
        {title}
      </h2>

      <p className="text-lg">
        {text}
      </p>
    </div>
  );
}