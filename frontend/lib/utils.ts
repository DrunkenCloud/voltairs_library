import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const backendUrl: string = "http://localhost:8080";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
