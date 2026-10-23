// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  ThemeProvider,
  useTheme,
} from "../components/theme/theme-provider";

function ThemeControls() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <span>{theme}</span>
      <button onClick={() => setTheme("dark")}>Enable dark mode</button>
      <button onClick={() => setTheme("light")}>Enable light mode</button>
    </div>
  );
}

describe("ThemeProvider", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    document.documentElement.dataset.themeMode = "system";
    document.documentElement.classList.remove("dark", "theme-transition");
    document.documentElement.style.colorScheme = "";
    localStorage.clear();

    window.matchMedia = vi.fn((query) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    window.requestAnimationFrame = (callback) => {
      callback(0);
      return 1;
    };
    window.cancelAnimationFrame = vi.fn();

    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
    vi.restoreAllMocks();
  });

  it("applies and persists explicit light and dark theme changes", async () => {
    await act(async () => {
      root.render(
        <ThemeProvider>
          <ThemeControls />
        </ThemeProvider>,
      );
    });

    expect(container.textContent).toContain("system");

    await act(async () => {
      container.querySelector("button")?.click();
    });

    expect(localStorage.getItem("surhires-theme")).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.style.colorScheme).toBe("dark");

    await act(async () => {
      container.querySelectorAll("button")[1]?.click();
    });

    expect(localStorage.getItem("surhires-theme")).toBe("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(document.documentElement.style.colorScheme).toBe("light");
  });
});
