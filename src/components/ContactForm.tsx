"use client";

import { useActionState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Loader2Icon } from "lucide-react";
import { ActionResponse } from "@/types/ActionResponse";
import { useRouter } from "next/navigation";
import { Contact } from "@/generated/prisma";
import { toast } from "sonner";

interface IContactFormProps {
  contact?: {
    name: string;
    email: string;
  };
  submitAction: (
    formData: FormData
  ) => Promise<ActionResponse<{ message: string; contact?: Contact }>>;
}

export function ContactForm({ contact, submitAction }: IContactFormProps) {
  const router = useRouter();
  const [_state, clientSubmitAction, isPending] = useActionState(
    async (_prevData: unknown, formData: FormData) => {
      const response = await submitAction(formData);
      if (response?.status === "success") {
        toast.success(response.body.message, {
          richColors: true,
        });
        router.push(`/contacts/${response.body?.contact?.id}/edit`);
      }
      if (response?.status === "error") {
        toast.error(response?.body?.message, {
          duration: 3000,
          richColors: true,
        });
      }
      return response;
    },
    null
  );

  return (
    <form className="space-y-4" action={clientSubmitAction}>
      <div className="space-y-1.5">
        <Label>Nome</Label>
        <Input name="name" defaultValue={contact?.name} />
      </div>

      <div className="space-y-1.5">
        <Label>E-mail</Label>
        <Input name="email" defaultValue={contact?.email} />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending && <Loader2Icon className="size-4 mr-1 animate-spin" />}
        {contact ? "Salvar" : "Criar"}
      </Button>
    </form>
  );
}
