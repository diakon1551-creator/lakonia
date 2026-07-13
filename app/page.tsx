import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f2ea] relative">

      {/* Перемикач мов */}
      <div className="absolute top-8 right-10 flex gap-4 text-xl font-serif">
        <button className="text-amber-700">UA</button>
        <span>|</span>
        <button>RU</button>
        <span>|</span>
        <button>EN</button>
      </div>

      {/* Центральний блок */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6">

<Link href="/">
  <img
    src="/logo.png"
    alt="LAKONIA"
    width={120}
    className="h-auto cursor-pointer"
  />
</Link>

        <h1 className="mt-6 text-5xl tracking-[0.3em] font-serif text-[#37253f]">
          LAKONIA
        </h1>

        <p className="mt-8 text-xl font-serif text-[#46344c] text-center">
          Місце, де слова мають вагу.
        </p>

        <p className="mt-6 text-2xl leading-relaxed text-center font-serif text-[#46344c]">
          Говоріть лише тоді,<br />
          коли справді є що сказати.
        </p>

        <Link
          href="/login"
          className="mt-12 w-72 rounded-2xl bg-[#311b37] text-white text-xl py-3 hover:scale-105 transition text-center"
        >
          Увійти
        </Link>

        <Link
          href="/register"
          className="mt-4 w-72 rounded-2xl border-2 border-[#b28b43] text-[#311b37] text-xl py-3 hover:bg-white transition text-center"
        >
          Стати учасником
        </Link>
        <footer className="mt-16 pb-6 text-center text-sm text-gray-500">
  © LAKONIA 2026 • v0.0.2
</footer>

      </div>
    </main>
  );
}