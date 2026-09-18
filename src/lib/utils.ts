import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function waLink(message: string) {
  const number = "919830001122";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function unsplash(id: string, w = 1200, q = 78) {
  return `https://images.unsplash.com/${id}?q=${q}&w=${w}&auto=format&fit=crop`;
}