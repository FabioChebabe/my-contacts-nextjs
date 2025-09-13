"use server";

import { Contact } from "@/generated/prisma";
import { db } from "@/lib/db";
import { ActionResponse } from "@/types/ActionResponse";
import z from "zod";

const schema = z.object({
  name: z.string().min(1, "O nome é obrigatótrio"),
  email: z.email("Informe um e-mail válido"),
});

export async function editContactAction(
  formData: FormData,
  contactId: string
): Promise<ActionResponse<{ message: string; contact?: Contact }>> {
  "use server";

  const data = Object.fromEntries(formData);
  const parsedData = schema.safeParse(data);

  if (!parsedData.success) {
    return {
      status: "error",
      body: {
        message: parsedData.error.issues
          .map((issue) => issue.message)
          .join(" e "),
      },
    };
  }

  const { email, name } = parsedData.data;

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
    return {
      status: "error",
      body: {
        message: "Este e-mail já está em uso",
      },
    };
  }

  const contact = await db.contact.update({
    where: { id: contactId },
    data: {
      name,
      email,
    },
  });

  return {
    status: "success",
    body: {
      message: "Contato editado com sucesso!",
      contact,
    },
  };
}
