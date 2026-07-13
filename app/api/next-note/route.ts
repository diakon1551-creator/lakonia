import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { currentId } = await request.json();

  const cookieStore = await cookies();

  const userId = Number(cookieStore.get("userId")?.value);

  let note = await prisma.note.findFirst({
    where: {
      published: true,
      authorId: {
        not: userId,
      },
      id: {
        gt: Number(currentId),
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  if (!note) {
    note = await prisma.note.findFirst({
      where: {
        published: true,
        authorId: {
          not: userId,
        },
      },
      orderBy: {
        id: "asc",
      },
    });
  }

  if (!note) {
    return NextResponse.json(
      {
        error: "Немає доступних думок.",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json({
    id: note.id,
  });
}