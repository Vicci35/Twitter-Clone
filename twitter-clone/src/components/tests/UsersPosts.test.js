// __tests__/UserPosts.test.jsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import UserPosts from "../Dashboard/Header/Profile/UserPosts/UserPosts";
import { useUser } from "../../utils/UserContext";
import { profilePosts } from "../../api/posts";

// Mocka externa beroenden
jest.mock("../../utils/UserContext", () => ({
  useUser: jest.fn(),
}));

jest.mock("../../api/posts", () => ({
  profilePosts: jest.fn(),
}));

jest.mock("../Dashboard/Header/Profile/UserPosts/PostCard", () => ({ post }) => (
  <div data-testid="post-card">{post.title}</div>
));

describe("UserPosts", () => {
  const mockUser = { _id: "user123" };
  const mockPosts = [
    { _id: "post1", title: "Post One" },
    { _id: "post2", title: "Post Two" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("visar laddningsmeddelande medan data hämtas", async () => {
    useUser.mockReturnValue({ user: mockUser });
    profilePosts.mockImplementation(() => new Promise(() => {}));

    render(<UserPosts />);
    expect(screen.getByText("Loading posts...")).toBeInTheDocument();
  });

  test("visar inlägg när hämtningen lyckas", async () => {
    useUser.mockReturnValue({ user: mockUser });
    profilePosts.mockResolvedValue(mockPosts);

    render(<UserPosts />);

    await waitFor(() => {
      expect(screen.queryByText("Loading posts...")).not.toBeInTheDocument();
    });

    expect(screen.getByText("Post One")).toBeInTheDocument();
    expect(screen.getByText("Post Two")).toBeInTheDocument();
  });

  test("visar meddelande när inga inlägg finns", async () => {
    useUser.mockReturnValue({ user: mockUser });
    profilePosts.mockResolvedValue([]);

    render(<UserPosts />);

    await waitFor(() => {
      expect(screen.queryByText("Loading posts...")).not.toBeInTheDocument();
    });

    expect(screen.getByText("No posts to show")).toBeInTheDocument();
  });

  test("renderar loading om user saknas (ingen userId)", () => {
  useUser.mockReturnValue({ user: null });

  render(<UserPosts />);
  expect(screen.getByText("Loading posts...")).toBeInTheDocument();
});

  test("använder propUserId om det skickas in", async () => {
    useUser.mockReturnValue({ user: null });
    profilePosts.mockResolvedValue(mockPosts);

    render(<UserPosts userId="custom123" />);

    await waitFor(() => {
      expect(profilePosts).toHaveBeenCalledWith("custom123");
    });
  });
});
