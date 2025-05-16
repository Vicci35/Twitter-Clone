import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import DashHeader, { deleteToken } from "../Header";

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Dashheader", () => {
  test("Display username", () => {
    renderWithRouter(<DashHeader userName="test user" />);
    expect(screen.getByText("Welcome test user")).toBeInTheDocument();
  });

  test("Clear localStorage", () => {
    localStorage.setItem("token", "abc123");
    localStorage.setItem("user", "tester");

    deleteToken();
    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("user")).toBeNull();
  });
});
