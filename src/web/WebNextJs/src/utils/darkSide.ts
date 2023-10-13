import { Theme } from "@/types";
import { useEffect, useState } from "react";

export default function useDarkSide() {
  const isBrowser = typeof window !== "undefined";
  const storedTheme = isBrowser ? localStorage?.theme : "light";
  const [theme, setTheme] = useState<Theme>(storedTheme as Theme);
  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    if (isBrowser) {
      const root = window.document.documentElement;
      root.classList.remove(colorTheme);
      root.classList.add(theme);
      localStorage.setItem("theme", theme);
    }
  }, [isBrowser, theme, colorTheme]);

  return [colorTheme, setTheme] as const;
}
