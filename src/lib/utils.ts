import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mockContact(name: string, email: string) {
  return {
    name,
    email,
    id: "",
    createdAt: new Date(),
  };
}
