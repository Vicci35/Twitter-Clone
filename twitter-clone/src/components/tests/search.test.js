import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import HomeFeed from '../Home/Home';
import { useUser } from '../../utils/UserContext';
import * as searchController from '../../controllers/searchController';

jest.mock('../../utils/UserContext', () => ({
  useUser: jest.fn(),
}));

jest.mock('../../controllers/searchController.js', () => ({
  searchPosts: jest.fn(),
}));

describe('search functionality in HomeFeed', () => {
  beforeEach(() => {
    useUser.mockReturnValue({ user: { _id: '1234', nickname: 'tester' } });
  });

  test('kallar på sökfunktionen när man skriver i sökfältet', async () => {
    const mockSearch = jest.fn().mockResolvedValue([]);
    searchController.searchPosts.mockImplementation(mockSearch);

    render(
      <MemoryRouter>
        <HomeFeed />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText(/sök hashtags eller personer/i);
    await userEvent.type(searchInput, 'React');

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalled();
    });
  });

  test('visar sökresultat korrekt', async () => {
    const mockSearchResults = [
      {
        _id: '1',
        content: 'Testar React',
        createdAt: new Date().toISOString(),
        author: { _id: '1', nickname: 'VT' },
      },
    ];

    searchController.searchPosts.mockResolvedValue(mockSearchResults);

    render(
      <MemoryRouter>
        <HomeFeed />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText(/sök hashtags eller personer/i);
    await userEvent.type(searchInput, 'React');

    await waitFor(() => {
      expect(screen.getByText(new RegExp(mockSearchResults[0].content))).toBeInTheDocument();
      expect(screen.getByText(new RegExp(mockSearchResults[0].author.nickname))).toBeInTheDocument();
    });
  });
});