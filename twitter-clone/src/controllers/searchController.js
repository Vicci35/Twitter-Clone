const API_URL = "http://localhost:3000/api/posts/feed";

export async function searchPosts(searchString) {
  const response = await fetch(API_URL);
  const data = await response.json();

  const lowerSearch = searchString.toLowerCase();

  const filteredPosts = data.filter((post) => {
    const nickname = post.author.nickname.toLowerCase();
    const content = post.content.toLowerCase();

    const matchesNickname = nickname.includes(lowerSearch);

    const hashtagRegex = /#[\wåäöÅÄÖ]+/g;
    const hashtags = content.match(hashtagRegex) || [];
    const matchesHashtag = hashtags.some((tag) =>
      tag.toLowerCase().includes(lowerSearch)
    );

    return matchesNickname || matchesHashtag;
  });

  return filteredPosts;
}
