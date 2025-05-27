import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from '../Dashboard/Header/Profile/Profile';

const mockUser = {
  name: 'VT',
  nickname: 'vt123',
  about: 'Testar profilkomponent',
  hometown: 'Göteborg',
  occupation: 'Utvecklare',
  email: 'vt@example.com',
  website: 'https://example.com',
};

jest.mock('../../utils/UserContext', () => ({
  useUser: () => ({ user: mockUser }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  Link: ({ children }) => <div>{children}</div>,
}));

jest.mock(
  '../Dashboard/Header/Profile/UserPosts.js/UserPosts',
  () => () => <div data-testid="user-posts-mock">UserPosts Mock</div>
);

describe('Profile component', () => {
  test('visar användarens profilinfo', () => {
    render(<Profile />);
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.nickname)).toBeInTheDocument();
    expect(screen.getByText(mockUser.about)).toBeInTheDocument();
    expect(screen.getByText(mockUser.hometown)).toBeInTheDocument();
    expect(screen.getByText(mockUser.occupation)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByText(mockUser.website)).toBeInTheDocument();
  });

 test('renderar UserPosts komponenten', () => {
    render(<Profile />);
    expect(screen.getByTestId('user-posts-mock')).toBeInTheDocument();
  });
});
