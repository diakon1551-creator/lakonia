export default function AddPlacePage() {
  return (
    <main className="min-h-screen bg-[#f7f2ea] text-[#37253f]">
      <div className="max-w-3xl mx-auto px-8 py-12">

        <h1 className="font-serif text-6xl text-[#a87b2c] text-center">
          Додати місце
        </h1>

        <p className="text-center text-2xl mt-4">
          Поділіться місцем, яке варте уваги Лаконії.
        </p>

        <div className="mt-12 space-y-6">

          <input
            type="text"
            placeholder="Назва місця"
            className="w-full p-4 rounded-xl border"
          />

          <textarea
            placeholder="Що знаходиться тут? (до 50 слів)"
            rows={5}
            className="w-full p-4 rounded-xl border"
          />

          <input
            type="text"
            placeholder="Широта"
            className="w-full p-4 rounded-xl border"
          />

          <input
            type="text"
            placeholder="Довгота"
            className="w-full p-4 rounded-xl border"
          />

          <button
            className="w-full p-4 rounded-xl bg-[#b78d3d] text-white font-semibold"
          >
            Надіслати Ліліт
          </button>

        </div>

      </div>
    </main>
  );
}