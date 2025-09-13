"use client";

import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { deleteContactAction } from "../_actions/deleteContactAction";
import { useState } from "react";
import { toast } from "sonner";

interface IDeleteContactDialogProps {
  contactId: string;
}

export function DeleteContactDialog({ contactId }: IDeleteContactDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    setIsLoading(true);
    const response = await deleteContactAction(contactId);

    if (response.status === "error") {
      toast.error(response.body.message, {
        duration: 3000,
        richColors: true,
      });
    }
    if (response.status === "success") {
      toast.success(response.body.message, {
        richColors: true,
      });
    }
    setIsLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          className="h-8"
          variant="destructive"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2Icon className="size-4 mr-1 animate-spin" />
          ) : (
            <Trash2Icon className="size-4" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            O contato será deletado permanentemente e não poderá ser recuperado.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Deletar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
