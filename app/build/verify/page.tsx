import dynamic from "next/dynamic";

const LakoniaMap = dynamic(
  () => import("../../components/LakoniaMap"),
  {
    ssr: false,
  }
);

export default function VerifyPlacePage() {
  return (
    <main className="min-h-screen bg-[#f7f2ea] text-[#37253f]">
      <div className="max-w-6xl mx-auto px-8 py-12">

        <h1 className="font-serif text-6xl text-[#a87b2c] text-center">
          Перевірити місце
        </h1>

        <p className="text-center text-2xl mt-4 mb-10">
          Відвідайте місце та підтвердьте або спростуйте замітку.
        </p>

        <LakoniaMap />

      </div>
    </main>
  );
}