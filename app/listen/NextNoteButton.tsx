"use client";

type Props = {
  currentId: number;
};

export default function NextNoteButton({
  currentId,
}: Props) {
  async function nextNote() {
    try {
      const res = await fetch("/api/next-note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentId,
        }),
      });

      if (!res.ok) {
        return;
      }

      const data = await res.json();

      window.location.href = `/listen?id=${data.id}`;
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <button
      onClick={nextNote}
      className="
        mt-8
        h-24
        w-full
        rounded-[28px]
        border
        border-[#eadbc2]
        bg-white/40
        flex
        items-center
        justify-between
        px-12
        hover:bg-white/60
        transition
        cursor-pointer
      "
    >
      <span className="font-serif text-4xl">
        Наступна думка
      </span>

      <span className="text-5xl text-[#9f7a30]">
        →
      </span>
    </button>
  );
}