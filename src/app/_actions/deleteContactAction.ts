"use server";

import { db } from "@/lib/db";
import { ActionResponse } from "@/types/ActionResponse";
import { revalidatePath } from "next/cache";

export async function deleteContactAction(
  contactId: string
): Promise<ActionResponse<{ message: string }>> {
  try {
    await db.contact.delete({
      where: { id: contactId },
    });

    revalidatePath("/");

    return {
      status: "success",
      body: {
        message: "Contato deletado com sucesso",
      },
    };
  } catch (_error) {
    {
      return {
        status: "error",
        body: {
          message: "Erro ao deletar o contato",
        },
      };
    }
  }
}
