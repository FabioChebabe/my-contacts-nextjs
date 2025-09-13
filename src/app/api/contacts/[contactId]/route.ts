import { db } from "@/lib/db";
import { type NextRequest, NextResponse } from "next/server";

interface IPUTProps {
  params: {
    contactId: string;
  };
}

export async function PUT(request: NextRequest, { params }: IPUTProps) {
  const contactId = params.contactId;
  const { name, email } = await request.json();

  if (!name || !email) {
    return NextResponse.json(
      {
        error: "Name and email are required",
      },
      { status: 400 }
    );
  }

  const emailAlreadyExists = await db.contact.findFirst({
    where: {
      email,
      AND: {
        NOT: {
          id: contactId,
        },
      },
    },
    select: {
      email: true,
      id: true,
    },
  });

  if (emailAlreadyExists) {
    return NextResponse.json(
      { error: "Email already exists" },
      { status: 409 }
    );
  }

  const contact = await db.contact.update({
    where: { id: contactId },
    data: {
      name,
      email,
    },
  });

  return NextResponse.json({ contact }, { status: 200 });
}
