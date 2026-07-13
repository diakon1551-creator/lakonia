import Link from "next/link";
import Image from "next/image";

export default function ConstitutionPage() {
  return (
    <main className="min-h-screen bg-[#f7f2ea] px-6 py-12">

      <div className="max-w-3xl mx-auto">

        <div className="flex justify-center mb-6">
          <Link href="/">
  <img
    src="/logo.png"
    alt="LAKONIA"
    width={120}
    className="h-auto cursor-pointer"
  />
</Link>
        </div>

        <h1 className="text-4xl font-serif text-center text-[#37253f] mb-10">
          Конституція Лаконії
        </h1>

        <p className="text-xl text-center italic mb-12 text-[#46344c]">
          Лаконія — це місце, де слова мають вагу.
        </p>

        <div className="space-y-8 text-lg leading-8 text-[#37253f]">

          <section>
            <h2 className="font-semibold mb-2">1. Слова мають вагу.</h2>
            <p>Пиши лише тоді, коли справді маєш що сказати.</p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">2. Поважай інших.</h2>
            <p>Критикуй думки, а не людей.</p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">3. Не засмічуй простір.</h2>
            <p>Якість важливіша за кількість.</p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">4. Будь чесним.</h2>
            <p>Не видавай чуже за своє.</p>
          </section>

          <section>
            <h2 className="font-semibold mb-2">5. Будуй Лаконію разом з нами.</h2>
            <p>Кожен учасник впливає на майбутнє спільноти.</p>
          </section>

        </div>

        <div className="mt-14 text-center">
          <Link
            href="/register"
            className="inline-block bg-[#311b37] text-white rounded-xl px-8 py-4 hover:opacity-90 transition"
          >
            Повернутися до реєстрації
          </Link>
        </div>
<footer className="mt-16 pb-6 text-center text-sm text-gray-500">
  © LAKONIA 2026 • v0.0.2
</footer>
      </div>

    </main>
  );
}