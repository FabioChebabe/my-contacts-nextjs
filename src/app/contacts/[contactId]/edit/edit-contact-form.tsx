"use client";

import { ContactForm } from "@/components/ContactForm";
import { Contact } from "@/generated/prisma";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

interface EditContactFormProps {
  contact: Contact;
}

export function EditContactForm({ contact }: EditContactFormProps) {
  async function handleSubmit(data: { name: string; email: string }) {
    try {
      const response = await fetch(`/api/contacts/${contact.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const body = await response.json();
      console.log("body >>", body);
      if (body.error) {
        alert(body.error);
      }
    } catch (err) {
      console.error("error >>", err);
      alert(err);
    }
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
          Editar contato
        </h1>
      </header>

      <ContactForm contact={contact} onSubmit={handleSubmit} />
    </>
  );
}
