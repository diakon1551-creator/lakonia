import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const note = await prisma.note.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        author: {
          select: {
            id: true,
            nickname: true,
          },
        },
      },
    });

    if (!note) {
      return NextResponse.json(
        { error: "Замітку не знайдено." },
        { status: 404 }
      );
    }

    return NextResponse.json(note);

  } catch {
    return NextResponse.json(
      { error: "Помилка сервера." },
      { status: 500 }
    );
  }
}