"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme, type Theme } from "@/components/theme/theme-provider";

const themes: Theme[] = ["light", "dark", "system"];
const icons = { light: Sun, dark: Moon, system: Monitor };
const nextTheme: Record<Theme, Theme> = {
  light: "dark",
  dark: "system",
  system: "light",
};

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme, mounted } = useTheme();
  if (!mounted) {
    return (
      <span
        aria-hidden="true"
        className={`theme-toggle-placeholder ${className}`}
      />
    );
  }

  const action = nextTheme[theme];
  const actionLabel = action === "system" ? "system theme" : `${action} mode`;

  return (
    <button
      type="button"
      aria-label={`Current theme: ${theme}. Switch to ${actionLabel}.`}
      title={`Current theme: ${theme}. Switch to ${actionLabel}.`}
      onClick={() => setTheme(action)}
      className={`theme-toggle ${className}`}
    >
      {themes.map((item) => {
        const ThemeIcon = icons[item];
        return (
          <ThemeIcon
            key={item}
            aria-hidden="true"
            className={`theme-toggle-icon ${item === theme ? "is-current" : ""}`}
          />
        );
      })}
    </button>
  );
}
