import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import LoginStep1 from "./LoginStep1";

test("navigerar till /login/password när 'Nästa'-knappen klickas", () => {
  const Step2 = () => (
    <div>Vi går vidare till sidan där lösenord skrivs i.</div>
  );

  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<LoginStep1 />} />
        <Route path="/login/password" element={<Step2 />} />
      </Routes>
    </MemoryRouter>
  );

  const input = screen.getByPlaceholderText("E-postadress eller användarnamn");
  fireEvent.change(input, { target: { value: "test@example.com" } });

  expect(input.value).toBe("test@example.com");

  fireEvent.click(screen.getByText("Nästa"));

  expect(
    screen.getByText("Vi går vidare till sidan där lösenord skrivs i.")
  ).toBeInTheDocument();
});
