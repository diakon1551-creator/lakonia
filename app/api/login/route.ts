import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Невірний email або пароль." },
        { status: 401 }
      );
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return NextResponse.json(
        { error: "Невірний email або пароль." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      nickname: user.nickname,
      wordBalance: user.wordBalance,
    });

    response.cookies.set("userId", String(user.id), {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // для localhost
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 днів
    });

    return response;

} catch (error) {
  console.error(error);

  return NextResponse.json(
    { error: String(error) },
    { status: 500 }
  );
}
}