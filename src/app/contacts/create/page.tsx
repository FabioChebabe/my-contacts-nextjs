import { ContactForm } from "@/components/ContactForm";
import { Contact } from "@/generated/prisma";
import { db } from "@/lib/db";
import { mockContact } from "@/lib/utils";
import { ActionResponse } from "@/types/ActionResponse";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import z from "zod";

const schema = z.object({
  name: z.string().min(1, "O nome é obrigatótrio"),
  email: z.email("Informe um e-mail válido"),
});

export default function CreateContactPage() {
  async function submitAction(formData: FormData): Promise<
    ActionResponse<{
      message: string;
      contact?: Contact;
    }>
  > {
    "use server";

    const data = Object.fromEntries(formData);
    const parsedData = schema.safeParse(data);
    if (!parsedData.success) {
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      return {
        status: "error",
        body: {
          message: parsedData.error.issues
            .map((issue) => issue.message)
            .join(" e "),
          contact: mockContact(name, email),
        },
      };
    }

    const { email, name } = parsedData.data;

    const emailAlreadyExists = await db.contact.findFirst({
      where: {
        email,
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
          message: "Este e-mail já está salvo",
          contact: mockContact(name, email),
        },
      };
    }

    const contact = await db.contact.create({
      data: {
        name,
        email,
      },
    });

    return {
      status: "success",
      body: {
        message: "Contato salvo com sucesso!",
        contact,
      },
    };
  }

  return (
    <>
      <header>
        <Link
          href="/"
          className="text-muted-foreground flex items-center gap-1 text-xs mb-2 dark:hover:text-sky-300 hover:text-sky-600"
        >
          <ArrowLeftIcon className="size-4" />
          <span>Voltar para a lista</span>
        </Link>
        <h1 className="font-semibold text-3xl tracking-tighter">
          Criar contato
        </h1>
      </header>

      <ContactForm submitAction={submitAction} />
    </>
  );
}
