import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { currentId } = await req.json();

  const next = await prisma.note.findFirst({
    where: {
      published: true,
      id: {
        gt: Number(currentId),
      },
    },
    orderBy: {
      id: "asc",
    },
    select: {
      id: true,
    },
  });

  if (next) {
    return NextResponse.json(next);
  }

  const first = await prisma.note.findFirst({
    where: {
      published: true,
    },
    orderBy: {
      id: "asc",
    },
    select: {
      id: true,
    },
  });

  return NextResponse.json(first);
}