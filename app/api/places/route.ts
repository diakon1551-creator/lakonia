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

    const {
      title,
      description,
      latitude,
      longitude,
    } = await req.json();

    if (
      !title ||
      !description ||
      latitude === null ||
      longitude === null
    ) {
      return NextResponse.json(
        { error: "Недостатньо даних." },
        { status: 400 }
      );
    }

    if (containsLinks(title) || containsLinks(description)) {
      return NextResponse.json(
        {
          error:
            "У Лаконії посилання заборонені.",
        },
        { status: 400 }
      );
    }

    const words = countWords(description);

    if (words === 0) {
      return NextResponse.json(
        { error: "Опис порожній." },
        { status: 400 }
      );
    }

    if (words > 50) {
      return NextResponse.json(
        {
          error:
            "Опис місця не може перевищувати 50 слів.",
        },
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

    await prisma.$transaction(async (tx) => {
      await tx.place.create({
        data: {
          title,
          description,
          wordCount: words,
          latitude,
          longitude,
          authorId: author.id,
        },
      });

      await tx.user.update({
        where: {
          id: author.id,
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