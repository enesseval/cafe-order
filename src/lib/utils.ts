import { type ClassValue, clsx } from "clsx";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export const renderLastActivity = (date: string) => {
   return formatDistanceToNow(new Date(date), { addSuffix: true, locale: tr });
};
