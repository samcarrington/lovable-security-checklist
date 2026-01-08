import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "./ThemeToggle";
import { ThemeProvider } from "next-themes";

const renderWithThemeProvider = (component: React.ReactElement) => {
  return render(
    <ThemeProvider attribute="class" defaultTheme="light">
      {component}
    </ThemeProvider>
  );
};

describe("ThemeToggle", () => {
  it("renders button after mounting", async () => {
    renderWithThemeProvider(<ThemeToggle />);

    await waitFor(() => {
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  it("shows correct icon for light theme", async () => {
    renderWithThemeProvider(<ThemeToggle />);

    await waitFor(() => {
      const button = screen.getByRole("button");
      expect(button).toHaveAccessibleName("Switch to dark mode");
    });
  });

  it("toggles theme when clicked", async () => {
    const user = userEvent.setup();
    renderWithThemeProvider(<ThemeToggle />);

    await waitFor(() => {
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    const button = screen.getByRole("button");
    await user.click(button);

    // After click, theme should change
    await waitFor(() => {
      expect(button).toHaveAccessibleName("Switch to light mode");
    });
  });

  it("has correct accessibility label", async () => {
    renderWithThemeProvider(<ThemeToggle />);

    await waitFor(() => {
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label");
    });
  });
});
