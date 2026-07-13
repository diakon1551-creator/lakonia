import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const cookieStore = await cookies();

  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return NextResponse.json(
      { error: "Не авторизовано." },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
   select: {
  id: true,
  nickname: true,
  wordBalance: true,
},
  });

  if (!user) {
    return NextResponse.json(
      { error: "Користувача не знайдено." },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}