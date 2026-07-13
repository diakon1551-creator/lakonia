import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

function countWords(text: string) {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function containsLinks(text: string) {
  return /(https?:\/\/|www\.|[a-zA-Z0-9-]+\.(com|ua|org|net|io|app|dev|me|co|xyz))/i.test(
    text
  );
}

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();

    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json(
        { error: "Не авторизовано." },
        { status: 401 }
      );
    }

    const { parentId, text } = await req.json();

    if (!parentId || !text) {
      return NextResponse.json(
        { error: "Недостатньо даних." },
        { status: 400 }
      );
    }

    if (containsLinks(text)) {
      return NextResponse.json(
        { error: "У Лаконії посилання заборонені." },
        { status: 400 }
      );
    }

    const words = countWords(text);

    if (words === 0) {
      return NextResponse.json(
        { error: "Замітка порожня." },
        { status: 400 }
      );
    }

    const author = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    if (!author) {
      return NextResponse.json(
        { error: "Користувача не знайдено." },
        { status: 404 }
      );
    }

    const parentNote = await prisma.note.findUnique({
      where: {
        id: Number(parentId),
      },
    });

    if (!parentNote) {
      return NextResponse.json(
        { error: "Думку не знайдено." },
        { status: 404 }
      );
    }

    if (parentNote.authorId === author.id) {
      return NextResponse.json(
        {
          error: "До власної думки долучитися не можна.",
        },
        { status: 400 }
      );
    }

    if (author.wordBalance < words) {
      return NextResponse.json(
        {
          error: "Недостатньо слів.",
        },
        { status: 400 }
      );
    }

    await prisma.$transaction(async (tx) => {
      await tx.note.create({
        data: {
          text,
          wordCount: words,
          published: true,

          authorId: author.id,

          parentId: parentNote.id,
        },
      });

      await tx.user.update({
        where: {
          id: author.id,
        },
        data: {
          wordBalance: {
            decrement: words,
          },
        },
      });

      await tx.user.update({
        where: {
          id: parentNote.authorId,
        },
        data: {
          wordBalance: {
            increment: words,
          },
        },
      });
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Помилка сервера.",
      },
      {
        status: 500,
      }
    );
  }
}