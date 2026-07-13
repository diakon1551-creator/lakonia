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
  const pattern =
    /(https?:\/\/|www\.|[a-zA-Z0-9-]+\.(com|ua|org|net|io|app|dev|me|co|xyz))/i;

  return pattern.test(text);
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

    const { text } = await req.json();

    if (!text || !text.trim()) {
      return NextResponse.json(
        { error: "Порожній текст." },
        { status: 400 }
      );
    }

    if (containsLinks(text)) {
      return NextResponse.json(
        {
          error:
            "Ми цінуємо не адреси сайтів, а думки людей.",
        },
        { status: 400 }
      );
    }

    const wordCount = countWords(text);

    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Користувача не знайдено." },
        { status: 404 }
      );
    }

    if (user.wordBalance < wordCount) {
      return NextResponse.json(
        { error: "Недостатньо слів." },
        { status: 400 }
      );
    }

    await prisma.$transaction([
      prisma.note.create({
        data: {
          text,
          wordCount,
          authorId: user.id,
        },
      }),

      prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          wordBalance: {
            decrement: wordCount,
          },
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
    });

  } catch (err) {
    console.error(err);

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