import React from "react";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { AppProvider } from "./context";

const renderAt = (path) => {
  window.history.pushState({}, "", path);
  window.localStorage.clear();
  return render(
    <AppProvider>
      <App />
    </AppProvider>
  );
};

describe("page structure", () => {
  test("home page has one h1, a main landmark and a labelled search", () => {
    renderAt("/");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("search", { name: "Search places" })).toBeInTheDocument();
    expect(screen.getByLabelText(/search for a place/i)).toBeInTheDocument();
  });

  test("the skip link is the first focusable element and targets main", () => {
    renderAt("/");
    userEvent.tab();
    const skip = screen.getByRole("link", { name: "Skip to main content" });
    expect(skip).toHaveFocus();
    expect(skip).toHaveAttribute("href", "#main");
    expect(screen.getByRole("main")).toHaveAttribute("id", "main");
  });

  test("every place picture has its own description", () => {
    renderAt("/place");
    const alts = screen.getAllByRole("img").map((i) => i.getAttribute("alt"));
    const places = alts.filter((a) => a && a.length > 40);
    expect(new Set(places).size).toBe(places.length);
    expect(places.length).toBeGreaterThanOrEqual(16);
  });

  test("unknown routes show a helpful 404 with an h1", () => {
    renderAt("/does-not-exist");
    expect(screen.getByRole("heading", { level: 1, name: "Page not found" })).toBeInTheDocument();
    expect(document.title).toBe("Page not found | Metabnb");
  });
});

describe("navigation", () => {
  test("changing page updates the title and moves focus to the new h1", () => {
    renderAt("/");
    userEvent.click(screen.getAllByRole("link", { name: "NFTs" })[0]);
    const h1 = screen.getByRole("heading", { level: 1, name: "Metabnb NFTs" });
    expect(document.title).toBe("NFT memberships | Metabnb");
    expect(h1).toHaveFocus();
  });

  test("the current page link is marked with aria-current", () => {
    renderAt("/community");
    const nav = screen.getByRole("navigation", { name: "Main" });
    expect(within(nav).getByRole("link", { name: "Community" })).toHaveAttribute("aria-current", "page");
    expect(within(nav).getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
  });
});

describe("wallet dialog (demo)", () => {
  test("opens as a labelled dialog, connects and reports status inside the dialog", async () => {
    renderAt("/");
    userEvent.click(screen.getAllByRole("button", { name: "Connect wallet" })[0]);
    const dialog = screen.getByRole("dialog", { name: "Connect wallet" });
    expect(within(dialog).getByText(/demo only/i)).toBeInTheDocument();
    expect(within(dialog).getByRole("button", { name: "MetaMask" })).toBeInTheDocument();
    expect(within(dialog).getByRole("button", { name: "WalletConnect" })).toBeInTheDocument();
    userEvent.click(within(dialog).getByRole("button", { name: "MetaMask" }));
    expect(within(dialog).getByRole("status")).toHaveTextContent("Connecting to MetaMask");
    await waitFor(() => expect(within(dialog).getByRole("status")).toHaveTextContent(/Connected to MetaMask as 0x71C7…976F/), { timeout: 3000 });
  });

  test("the close button closes the dialog", () => {
    renderAt("/");
    userEvent.click(screen.getAllByRole("button", { name: "Connect wallet" })[0]);
    userEvent.click(screen.getByRole("button", { name: "Close wallet window" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("places", () => {
  test("filtering by category updates the list, the URL and the status message", async () => {
    renderAt("/place");
    expect(screen.getAllByRole("article")).toHaveLength(16);
    userEvent.click(screen.getByRole("radio", { name: "Castle" }));
    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(window.location.search).toContain("category=Castle");
    await waitFor(() => expect(screen.getByText("2 places found.")).toBeInTheDocument(), { timeout: 2000 });
  });

  test("a search with no matches shows an empty state", async () => {
    renderAt("/place");
    userEvent.type(screen.getByLabelText("Search by name or type"), "zzzz");
    expect(await screen.findByRole("heading", { name: "No places match your filters" })).toBeInTheDocument();
  });

  test("saving a place toggles aria-pressed and updates the saved count", () => {
    renderAt("/place");
    const heart = screen.getByRole("button", { name: "Save Violet Tower to your places" });
    expect(heart).toHaveAttribute("aria-pressed", "false");
    userEvent.click(heart);
    expect(heart).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("link", { name: "Saved places, 1" })).toBeInTheDocument();
  });
});

describe("booking form", () => {
  test("submitting an empty form shows a focused error summary and inline errors", () => {
    renderAt("/place/violet-tower");
    userEvent.click(screen.getByRole("button", { name: "Connect wallet to reserve" }));
    const summary = screen.getByRole("group", { name: /problems/ });
    expect(summary).toHaveFocus();
    expect(within(summary).getAllByRole("link")).toHaveLength(2);
    const checkIn = screen.getByLabelText("Check-in");
    expect(checkIn).toHaveAttribute("aria-invalid", "true");
    expect(checkIn).toHaveAttribute("aria-describedby", "check-in-error");
    expect(document.getElementById("check-in-error")).toHaveTextContent(/Error: Choose a check-in date/);
  });

  test("an error link moves focus to its field", () => {
    renderAt("/place/violet-tower");
    userEvent.click(screen.getByRole("button", { name: "Connect wallet to reserve" }));
    userEvent.click(screen.getByRole("link", { name: "Choose a check-in date." }));
    expect(screen.getByLabelText("Check-in")).toHaveFocus();
  });

  test("a valid form without a wallet asks to connect one", () => {
    renderAt("/place/violet-tower");
    const d = (n) => {
      const t = new Date();
      t.setDate(t.getDate() + n);
      return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
    };
    userEvent.type(screen.getByLabelText("Check-in"), d(3));
    userEvent.type(screen.getByLabelText("Check-out"), d(6));
    expect(screen.getByText(/3 nights/)).toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: "Connect wallet to reserve" }));
    expect(screen.getByRole("dialog", { name: "Connect wallet" })).toBeInTheDocument();
  });

  test("an unknown place shows the not found page", () => {
    renderAt("/place/nope");
    expect(screen.getByRole("heading", { level: 1, name: "We could not find that place" })).toBeInTheDocument();
  });
});
