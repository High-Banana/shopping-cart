import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Footer";

beforeEach(() => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );
});

describe("Footer Componennt", () => {
  it("Renders logo properly", () => {
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("Renders links properly", () => {
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });

  it("Renders Home link with proper href", () => {
    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("Renders Products link with proper href", () => {
    const productLink = screen.getByRole("link", { name: "Products" });
    expect(productLink).toHaveAttribute("href", "/products");
  });

  it("Renders Repository link with proper href", () => {
    const productLink = screen.getByRole("link", { name: "Repository" });
    expect(productLink).toHaveAttribute("href", "https://github.com/High-Banana/shopping-cart");
  });
});
