import Link from "next/link";

export default function BuildPage() {
  return (
    <main className="min-h-screen bg-[#f7f2ea] text-[#37253f]">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 md:py-12">

        <div className="text-center">

          <h1 className="font-serif text-4xl md:text-6xl text-[#a87b2c]">
            Будувати Лаконію
          </h1>

          <p className="mt-4 text-lg md:text-2xl">
            Допоможіть створювати карту знань Лаконії.
          </p>

        </div>

        <div className="mt-10 md:mt-14 space-y-6 md:space-y-8">

          <Link
            href="/build/add"
            className="
              block
              rounded-[28px] md:rounded-[34px]
              bg-white/80
              border border-[#e5d5b7]
              p-5 md:p-8
              hover:shadow-lg
              transition
            "
          >
            <h2 className="font-serif text-3xl md:text-4xl">
              Додати місце
            </h2>

            <p className="mt-2 text-base md:text-xl text-[#666]">
              Поділитися координатами та коротким описом місця.
            </p>
          </Link>

          <Link
            href="/build/verify"
            className="
              block
              rounded-[28px] md:rounded-[34px]
              bg-white/80
              border border-[#e5d5b7]
              p-5 md:p-8
              hover:shadow-lg
              transition
            "
          >
            <h2 className="font-serif text-3xl md:text-4xl">
              Перевірити місце
            </h2>

            <p className="mt-2 text-base md:text-xl text-[#666]">
              Відвідати місце та підтвердити або спростувати замітку.
            </p>
          </Link>

        </div>

      </div>
    </main>
  );
}