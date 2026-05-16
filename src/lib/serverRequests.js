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
