import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LogInStep2 from "../Login/LogInStep2";
import React from "react";

globalThis.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ token: "fake-token" }),
  })
);

test("kan logga in och spara token", async () => {
  render(
    <MemoryRouter>
      <LogInStep2 />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText("E-post"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Lösenord"), {
    target: { value: "password123" },
  });

  fireEvent.click(screen.getByText("Logga in"));

  await waitFor(() => expect(localStorage.getItem("token")).toBe("fake-token"));
});
