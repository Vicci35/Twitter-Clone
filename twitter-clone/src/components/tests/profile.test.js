import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Profile from '../Dashboard/Header/Profile/Profile';

const mockUser = {
  _id: "123",
  name: 'VT',
  nickname: 'vt123',
  about: 'Testar profilkomponent',
  hometown: 'Göteborg',
  occupation: 'Utvecklare',
  email: 'vt@example.com',
  website: 'https://example.com',
};

const mockSetUser = jest.fn();

jest.mock('../../utils/UserContext', () => ({
  useUser: () => ({ user: mockUser, setUser: mockSetUser }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  Link: ({ children }) => <div>{children}</div>,
}));

jest.mock(
  '../Dashboard/Header/Profile/UserPosts/UserPosts',
  () => () => <div data-testid="user-posts-mock">UserPosts Mock</div>
);

beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockUser),
    })
  );
});

afterAll(() => {
  global.fetch.mockClear();
  delete global.fetch;
});

describe('Profile component', () => {
  test('visar användarens profilinfo', async () => {
    render(<Profile />);
    expect(await screen.findByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.nickname)).toBeInTheDocument();
    expect(screen.getByText(mockUser.about)).toBeInTheDocument();
    expect(screen.getByText(mockUser.hometown)).toBeInTheDocument();
    expect(screen.getByText(mockUser.occupation)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByText(mockUser.website)).toBeInTheDocument();
  });

 test('renderar UserPosts komponenten', async () => {
    render(<Profile />);
    await waitFor(() => expect(screen.getByTestId('user-posts-mock')).toBeInTheDocument());
  });
});
