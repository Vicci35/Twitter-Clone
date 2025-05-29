import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import UsersProfile from '../components/Profile/ProfilePage/UsersProfile';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useUser } from '../../../utils/UserContext';
import React from 'react';

vi.mock('../../../utils/UserContext', () => ({
    useUser: () => ({ user: {_id: "user123" } })
}));

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useParams: () => ({ id: "user456" }),
        useNavigate: () => vi.fn(),
    };
});

global.fetch = vi.fn();

describe("UsersProfile", () => {
    beforeEach(() => {
        fetch.mockReset();
    });

    it("visar laddningstext innan datan laddas", () => {
        render(
            <MemoryRouter>
                <UsersProfile/>
            </MemoryRouter>
        );
        expect(screen.getByText(/laddar profil/i)).toBeInDocument();
    });

    it("visar användarens namn och follow-knapp efter laddning", async () => {
        fetch.mockResolvedValueOnce({
            json: () =>
                Promise.resolve({
                    name: "Anna",
                    nickname: "anna123",
                    about: "Hej!",
                    hometown: "Stockholm",
                    occupation: "Utvecklare",
                    email: "anna@example.com",
                    website: "www.anna.se",
                }),
        })
        .mockResolvedValueOnce({
            json: () =>
                Promise.resolve({
                    following: [{ id: "user789" }],
                }),
        });
        render(
            <MemoryRouter>
                <UsersProfile/>
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByText("Anna")).toBeInDocument();
            expect(screen.getByText("Follow")).toBeInDocument();
        });
    });

    it("byter text på knapp till unfollow om användaren redan följs", async () => {
        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({
                name: "Anna",
                nickname: "anna123",
                about: "",
                hometown: "",
                occupation: "",
                email: "",
                website: "",
            }),
        })
        .mockResolvedValueOnce({
            json: () => Promise.resolve({
                following: [{ id: "user456" }],
            }),
        }),
        render(
            <MemoryRouter>
                <UsersProfile/>
            </MemoryRouter>
        );
        
        await waitFor(() => {
            expect(screen.getByText("Unfollow")).toBeInDocument();
        });
    });
})