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

  test("Dropdown appears when ☰-button is clicked", () => {
    renderWithRouter(<DashHeader userName="tester" />);

    fireEvent.click(screen.getByRole("button", { name: "☰" }));

    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Log out")).toBeInTheDocument();
  });

  test('Clicking "Logout" shows confirmation dialog', () => {
    renderWithRouter(<DashHeader userName="tester" />);

    fireEvent.click(screen.getByRole("button", { name: "☰" }));
    fireEvent.click(screen.getByText("Logout"));

    expect(screen.getByText("Do you want to log out?")).toBeInTheDocument();
  });

  test('Clicking "Cancel" sets logout div className to "hide-logout"', () => {
    renderWithRouter(<DashHeader userName="tester" />);

    fireEvent.click(screen.getByRole("button", { name: "☰" }));
    fireEvent.click(screen.getByText("Logout"));

    const logoutDiv = screen.getByTestId("logout-confirmation");

    expect(logoutDiv).toHaveClass("show-logout");

    fireEvent.click(screen.getByText("Cancel"));

    expect(logoutDiv).toHaveClass("hide-logout");
  });
});
