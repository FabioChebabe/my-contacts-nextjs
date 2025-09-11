import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { EditContactForm } from "./edit-contact-form";

interface CreateContactPageProps {
  params: {
    contactId: string;
  };
}

export default async function CreateContactPage({
  params,
}: CreateContactPageProps) {
  const { contactId } = params;

  try {
    const contact = await db.contact.findUnique({
      where: { id: contactId },
    });

    if (!contact) {
      redirect("/");
    }

    return <EditContactForm contact={contact} />;
  } catch (_error) {
    redirect("/");
  }
}
