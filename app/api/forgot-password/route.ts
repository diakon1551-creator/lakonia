import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Вкажіть Email." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // завжди однакова відповідь (безпека)
    if (!user) {
      return NextResponse.json({ success: true });
    }

    const code = generateCode();

    const expires = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetCode: code,
        resetExpiresAt: expires,
      },
    });

    await resend.emails.send({
      from: "LAKONIA <onboarding@resend.dev>",
      to: email,
      subject: "Повернення доступу до LAKONIA",
      html: `
        <div style="font-family:Arial;padding:30px">
          <h2>LAKONIA</h2>
          <p>Ваш код доступу:</p>
          <h1 style="letter-spacing:8px;">${code}</h1>
          <p>Код дійсний 10 хвилин.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}