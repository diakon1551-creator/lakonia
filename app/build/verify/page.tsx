export default function VerifyPlacePage() {
  return (
    <main className="min-h-screen bg-[#f7f2ea] text-[#37253f]">
      <div className="max-w-3xl mx-auto px-8 py-12">

        <h1 className="font-serif text-6xl text-[#a87b2c] text-center">
          Перевірити місце
        </h1>

        <p className="text-center text-2xl mt-4">
          Відвідайте місце та підтвердьте або спростуйте замітку.
        </p>

        <div
          className="mt-12 rounded-[34px] bg-white/80 border border-[#e5d5b7]
          shadow-[0_10px_35px_rgba(0,0,0,0.08)] p-8"
        >
          <h2 className="font-serif text-4xl">
            Заміток для перевірки поки немає
          </h2>

          <p className="mt-4 text-xl text-[#666]">
            Коли учасники Лаконії почнуть додавати місця,
            вони з'являться тут для перевірки.
          </p>
        </div>

      </div>
    </main>
  );
}