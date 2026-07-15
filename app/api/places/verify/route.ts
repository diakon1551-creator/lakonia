import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

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

    const { placeId } = await req.json();

    if (!placeId) {
      return NextResponse.json(
        { error: "Не вказано місце." },
        { status: 400 }
      );
    }

    const place = await prisma.place.findUnique({
      where: {
        id: Number(placeId),
      },
    });

    if (!place) {
      return NextResponse.json(
        { error: "Місце не знайдено." },
        { status: 404 }
      );
    }

    const alreadyVerified =
      await prisma.placeVerification.findUnique({
        where: {
          placeId_userId: {
            placeId: place.id,
            userId: Number(userId),
          },
        },
      });

    if (alreadyVerified) {
      return NextResponse.json(
        {
          error: "Ви вже підтвердили це місце.",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.$transaction(async (tx) => {
      await tx.placeVerification.create({
        data: {
          placeId: place.id,
          userId: Number(userId),
        },
      });

      await tx.user.update({
        where: {
          id: Number(userId),
        },
        data: {
          wordBalance: {
            increment: place.wordCount,
          },
        },
      });
    });

    return NextResponse.json({
      success: true,
      reward: place.wordCount,
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