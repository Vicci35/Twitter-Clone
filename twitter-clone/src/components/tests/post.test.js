import React from "react";
import { render, screen } from "@testing-library/react";
import Post from "../post.js";

describe("Post component", () => {
  const mockPost = {
    content: "Detta är ett testinlägg",
    author: "VT",
    createdAt: new Date().toISOString(),
  };

  test("renderar post-innehållet korrekt", () => {
    render(<Post post={mockPost} />);
    expect(screen.getByTestId("post-content")).toHaveTextContent(
      "Detta är ett testinlägg"
    );
    expect(screen.getByTestId("post-author")).toHaveTextContent("@VT");
    expect(screen.getByTestId("post-date")).toBeInTheDocument();
  });

  test("visar rätt författarnamn", () => {
    render(<Post post={mockPost} />);
    expect(screen.getByTestId("post-author")).toHaveTextContent("@VT");
  });

  test("visar datum", () => {
    render(<Post post={mockPost} />);
    expect(screen.getByTestId("post-date")).toBeInTheDocument();
  });
});
