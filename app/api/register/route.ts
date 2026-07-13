import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { nickname, email, password } = await req.json();

    if (!nickname || !email || !password) {
      return NextResponse.json(
        { error: "Заповніть усі поля." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { nickname },
          { email }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Нік або Email вже існує." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        nickname,
        email,
        password: hashedPassword,
          wordBalance: 300,
      },
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Помилка сервера." },
      { status: 500 }
    );
  }
}