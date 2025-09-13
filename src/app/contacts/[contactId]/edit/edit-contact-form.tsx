"use client";

import { editContactAction } from "@/app/_actions/editContactActions";
import { ContactForm } from "@/components/ContactForm";
import { Contact } from "@/generated/prisma";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

interface EditContactFormProps {
  contact: Contact;
}

export function EditContactForm({ contact }: EditContactFormProps) {
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
          Editar contato
        </h1>
      </header>

      <ContactForm
        contact={contact}
        submitAction={(formData) => editContactAction(formData, contact.id)}
      />
    </>
  );
}
