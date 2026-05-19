export async function getUser() {
  try {
    const response = await fetch("/auth/me", {
      credentials: "include",
    });
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data?.user;
  } catch (err) {
    return null;
  }
}

export async function getAuthor(id) {
  try {
    const response = await fetch(`/api/user/${id}`);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch {
    return null;
  }
}

export async function getFeaturedArticle() {
  try {
    const response = await fetch("/api/articles/featured");
    if (!response.ok) {
      return null;
    }
    const data = await response.json();

    return data;
  } catch {
    return null;
  }
}

export async function getArticles() {
  try {
    const response = await fetch("/api/articles");
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch {
    return null;
  }
}

export async function getArticleBySlug(slug, setError) {
  try {
    const response = await fetch(`/api/articles/${slug}`);
    const data = await response.json();
    if (!response.ok) {
      setError(data.message);
      return;
    }
    const author = await getAuthor(data.userId);
    return { ...data, author: author.name };
  } catch (err) {
    setError(err);
  }
}
