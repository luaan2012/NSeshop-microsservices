import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { CardTypes, Cart, Focused, SelectedProductType, Toaster } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { UseFormSetValue } from "react-hook-form";

export const getGravatarUrl = async (email: string, size: number = 200): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(email.trim().toLowerCase());
  const buffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(buffer));
  const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  const baseUrl = "https://www.gravatar.com/avatar/";
  const defaultImage = "https://img.freepik.com/free-icon/user_318-563642.jpg";

  return `${baseUrl}${hashHex}?d=${encodeURIComponent(defaultImage)}`;
};

export const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(" ");
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DateBR = (date: string) => {
  return new Date(date).toLocaleString('pt-BR')
}

export const ValidCpf = (cpf: string): boolean => {
  const cleanedCPF = cpf.replace(/\D/g, "");

  if (cleanedCPF.length !== 11) {
    return false;
  }

  if (/^(\d)\1+$/.test(cleanedCPF)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanedCPF.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit > 9) {
    digit = 0;
  }
  if (parseInt(cleanedCPF.charAt(9)) !== digit) {
    return false;
  }

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanedCPF.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit > 9) {
    digit = 0;
  }
  if (parseInt(cleanedCPF.charAt(10)) !== digit) {
    return false;
  }

  return true;
};

export const validateEmail = (email: string): boolean => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);
};

export const formatToCurrency = (value: number): string => {
  return (value || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export const ToastEmitter = ({
  title,
  info,
  position = "top-left",
  autoClose = 4000,
  hideProgressBar = false,
  closeOnClick = true,
  pauseOnHover = true,
  draggable = true,
  theme = "colored",
}: Toaster) => {
  if (!info) {
    toast(title, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: theme,
    });
  } else {
    toast[info](title, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: theme,
    });
  }
};

export const ToastPromise = (func: any) => {
  toast.promise(func, {
    pending: "Carregando...",
    success: {
      render({ data }: any) {
        return `Olá, ${data?.user?.email}`;
      },
    },
    error: {
      render({ data }: any) {
        return `Olá, ${data?.errors?.Messages[0] || "Alguma coisa aconteceu, tente novamente mais tarde."}`;
      },
    },
  });
};

export function removeCollectionsPrefix(key: string, str: string) {
  return str.replace(key, "");
}

export function deduplicateByOptions<T extends Record<string, any>>(objectArray: T[], key: keyof T): string[] {
  return Array.from(new Set(objectArray.flatMap((object) => object[key])));
}

export const handleOnChangeString = (name: Focused, value: string, setValue: UseFormSetValue<CardTypes>) => {
  setValue(name, value);
};

export const handleOnChangeNumber = (name: Focused, value: string, setValue: UseFormSetValue<CardTypes>) => {
  setValue(name, value.replace(/[^0-9]/g, ""));
};

export const handleOnFocus = (value: Focused, callback: Dispatch<SetStateAction<Focused | undefined>>) => {
  callback(value);
};
