import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import LoginStep1 from "./LoginStep1";

test("navigerar till /login/password när 'Nästa'-knappen klickas", async () => {
  const Step2 = () => (
    <div>Vi går vidare till sidan där lösenord skrivs i.</div>
  );

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({}),
    })
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

  const text = await screen.findByText(
    "Vi går vidare till sidan där lösenord skrivs i."
  );
  expect(text).toBeInTheDocument();
});
