import type { ApiResponse, Intervention, Symptom } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const checkForErrors = (response: ApiResponse<Symptom | Symptom[] | Intervention>)=> {
    if (response.code !== 200) {
      throw new Error("Failed to fetch symptom");
    }
  
    if (typeof response.message === "string") {
      throw new Error(response.message);
    }
}
