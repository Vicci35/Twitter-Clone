import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
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


describe('feed component', () => {
  beforeEach(() => {
    useUser.mockReturnValue({ user: { _id: '1234', nickname: 'tester' } });
  });

  test('hämtar och visar lista med poster', async () => {
    const mockPosts = [
      {
        _id: '1',
        content: 'Första posten',
        createdAt: new Date().toISOString(),
        author: { _id: '1', nickname: 'VT' },
      },
      {
        _id: '2',
        content: 'Andra posten',
        createdAt: new Date().toISOString(),
        author: { _id: '2', nickname: 'Thaison' },
      },
    ];

    searchController.searchPosts.mockResolvedValue(mockPosts);

     render(
      <MemoryRouter>
        <HomeFeed />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Första posten/)).toBeInTheDocument();
      expect(screen.getByText(/Andra posten/)).toBeInTheDocument();
    });
  });

   test('visar meddelande om inga poster finns', async () => {
    searchController.searchPosts.mockResolvedValue([]); 

    render(
      <MemoryRouter>
        <HomeFeed />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/No posts yet. Be the first!/)).toBeInTheDocument();
    });
  });

  test('visar laddningsindikator under hämtning', async () => {
    let resolvePosts;
    const postsPromise = new Promise((resolve) => {
      resolvePosts = resolve;
    });

    searchController.searchPosts.mockReturnValue(postsPromise);

    render(<HomeFeed />);

    expect(screen.getByText(/Loading posts.../)).toBeInTheDocument();

    resolvePosts([]);

    await waitFor(() => {
      expect(screen.queryByText(/Loading posts.../)).not.toBeInTheDocument();
    });
  });
});