import { render, screen, waitFor } from '@testing-library/react';
import UserPosts from '../components/Profile/ProfilePage/UserPosts/UserPosts';
import { useUser } from '../../../../utils/UserContext';
import * as postsApi from '../../../../api/posts';

vi.mock('../../../../utils/UserContext', () => ({
  useUser: () => ({ user: { _id: 'user123' } }),
}));

vi.mock('../../../../api/posts');

describe("UserPosts", () => {
    it("visar laddning när posts laddas", async () => {
        postsApi.profilePosts.mockResolvedValue([]);

        render(<UserPosts userId="user123" />);
        expect(screen.getByText(/Loading posts/i)).toBeInDocument();

        await waitFor(() => 
        expect(screen.getByText(/No posts to show/i)).toBeInDocument()
    );
    });

    it("visar post när en post finns", async () => {
        postsApi.profilePosts.mockResolvedValue([
            {
                _id: "post1",
                title: "Test Post",
                content: "Test Content",
            },
        ]);

        render(<UserPosts userId="user123" />);

        await waitFor(() => 
        expect(screen.getByText(/Test Post/i)).toBeInDocument()
        );
    });
});