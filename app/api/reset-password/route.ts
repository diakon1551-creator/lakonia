import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { email, code, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json(
      { error: "no user" },
      { status: 400 }
    );
  }

  // 🔴 ДИАГНОСТИКА
  console.log("DB CODE:", user.resetCode);
  console.log("INPUT CODE:", code);

  if (user.resetCode !== code) {
    return NextResponse.json(
      { error: "wrong code" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { email },
    data: {
      password: hashedPassword,
      resetCode: null,
      resetExpiresAt: null,
    },
  });

  return NextResponse.json({
    success: true,
  });
}