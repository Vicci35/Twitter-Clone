import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UsersProfile from "../Dashboard/Header/Profile/UsersProfile.jsx"
import { MemoryRouter } from 'react-router-dom';
import { useUser } from '../../utils/UserContext.jsx';


jest.mock('../../utils/UserContext.jsx', () => ({
  useUser: () => ({ user: { _id: 'user123' } }),
}));


jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: 'user456' }),
    useNavigate: () => jest.fn(),
  };
});

global.fetch = jest.fn();

describe('UsersProfile', () => {
  afterEach(() => {
    fetch.mockReset();
  });

  it('visar laddningstext innan datan laddas', () => {
    render(
      <MemoryRouter>
        <UsersProfile />
      </MemoryRouter>
    );
    expect(screen.getByText(/laddar profil/i)).toBeInTheDocument();
  });

  it('visar användarens namn och follow-knapp efter laddning', async () => {
    fetch.mockResolvedValueOnce({
      ok:true, 
      json: () =>
        Promise.resolve({
          name: 'Anna',
          nickname: 'anna123',
          about: 'Hej!',
          hometown: 'Stockholm',
          occupation: 'Utvecklare',
          email: 'anna@example.com',
          website: 'www.anna.se',
        }),
    }).mockResolvedValueOnce({
      ok:true, 
      json: () =>
        Promise.resolve({
          following: [{ id: 'user789' }],
        }),
    }).mockResolvedValueOnce({
      ok:true, 
    json: () => Promise.resolve({
      followers: [],
    }),
  })
  .mockResolvedValueOnce({
    ok:true,
    json: () => Promise.resolve([]), // tom lista med inlägg
  });

    render(
      <MemoryRouter>
        <UsersProfile />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Anna')).toBeInTheDocument();
      expect(screen.getByText('Follow')).toBeInTheDocument();
    });
  });

  it("byter text på knapp till unfollow om användaren redan följs", async () => {
  fetch
    .mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
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
      json: () =>
        Promise.resolve({
          following: [{ id: "user456" }],
        }),
    })
    .mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          followers: [],
        }),
    })
    .mockResolvedValueOnce({
      json: () => Promise.resolve([]),
    });

  render(
    <MemoryRouter>
      <UsersProfile />
    </MemoryRouter>
  );

 await waitFor(() => {
    expect(screen.getByText("Unfollow")).toBeInTheDocument();
  });
});
});
