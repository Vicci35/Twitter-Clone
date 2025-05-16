import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignUp from "./SignUp";
import { BrowserRouter } from "react-router-dom";
import * as userService from "../../api/userService";

// jest.spyOn(userService, "saveNewUser").mockImplementation(() => {});
jest.spyOn(userService, "saveNewUser").mockResolvedValue({ ok: true });

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe("SignUp", () => {
  test("Should display error message if passwords don't match", () => {
    renderWithRouter(<SignUp />);

    fireEvent.change(screen.getByLabelText("Lösenord:"), {
      target: { value: "abc123", id: "password" },
    });
    fireEvent.change(screen.getByLabelText("Repetera lösenord:"), {
      target: { value: "def456", id: "repeatPassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Spara" }));

    expect(screen.getByText(/lösenorden måste matcha/i)).toBeInTheDocument();
    expect(userService.saveNewUser).not.toHaveBeenCalled();
  });

  test("Should call saveNewUser when all input fields are correctly filled", async () => {
    renderWithRouter(<SignUp />);

    fireEvent.change(screen.getByLabelText("Namn:"), {
      target: { value: "Sebastian", id: "name" },
    });
    fireEvent.change(screen.getByLabelText("Användarnamn:"), {
      target: { value: "seb", id: "username" },
    });
    fireEvent.change(screen.getByLabelText("E-post:"), {
      target: { value: "seb@example.com", id: "email" },
    });
    fireEvent.change(screen.getByLabelText("Lösenord:"), {
      target: { value: "abc123", id: "password" },
    });
    fireEvent.change(screen.getByPlaceholderText("Repetera lösenord"), {
      target: { value: "abc123", id: "repeatPassword" },
    });

    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: /spara/i }));
    });

    expect(userService.saveNewUser).toHaveBeenCalled();
  });
});
