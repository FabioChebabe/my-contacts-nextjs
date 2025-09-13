import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { Edit2Icon, PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { DeleteContactDialog } from "./_components/DeleteContactDialog";

export default async function Home() {
  const contacts = await db.contact.findMany();

  return (
    <>
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-3xl tracking-tighter">
            MyContacts
          </h1>
          <p className="text-muted-foreground">Seus contatos em um só lugar.</p>
        </div>

        <div className="flex items-center gap-4">
          <Button asChild size="sm" className="gap-1">
            <Link href="/contacts/create">
              <PlusCircleIcon className="size-4" />
              Criar novo contato
            </Link>
          </Button>

          <Separator orientation="vertical" className="h-6" />

          <ThemeSwitcher />
        </div>
      </header>

      <div className="space-y-2">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="border flex items-center justify-between p-2 rounded-lg"
          >
            <div className="flex gap-2">
              <div className="size-10 bg-secondary rounded-full" />
              <div className="flex flex-col">
                <span>{contact.name}</span>
                <small className="text-muted-foreground">{contact.email}</small>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button size="sm" className="h-8" variant="outline" asChild>
                <Link href={`/contacts/${contact.id}/edit`}>
                  <Edit2Icon className="size-4" />
                </Link>
              </Button>

              <DeleteContactDialog contactId={contact.id} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
