import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import Navbar from "./Navbar";
import { BrowserRouter } from "react-router-dom";

beforeEach(() => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
});

describe("Navbar Component", () => {
  it("Renders links correctly", () => {
    expect(screen.getAllByRole("link")).toHaveLength(4);
  });

  it("Renders Home link with proper href", () => {
    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("Renders Products link with proper href", () => {
    const productLink = screen.getByRole("link", { name: "Products" });
    expect(productLink).toHaveAttribute("href", "/products");
  });

  it("Renders About link with proper href", () => {
    const cartLink = screen.getByRole("link", { name: "Cart" });
    expect(cartLink).toHaveAttribute("href", "/cart");
  });

  it("Renders About link with proper href", () => {
    const loginLink = screen.getByRole("link", { name: "Login" });
    expect(loginLink).toHaveAttribute("href", "/login");
  });
});
