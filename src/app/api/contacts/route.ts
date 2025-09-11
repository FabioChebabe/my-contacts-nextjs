import { db } from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, email } = await request.json();

  if (!name || !email) {
    return NextResponse.json(
      {
        error: "Name and email are required",
      },
      { status: 400 }
    );
  }

  const emailAlreadyExists = await db.contact.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
    },
  });

  if (emailAlreadyExists) {
    return NextResponse.json(
      {
        error: "Email already exists",
      },
      { status: 409 }
    );
  }

  const contact = await db.contact.create({
    data: {
      name,
      email,
    },
  });

  return NextResponse.json({ contact }, { status: 201 });
}
