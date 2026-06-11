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
    const response = await fetch(`/api/users/${id}`);
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
    const data = await response?.json();
    if (!response.ok) {
      setError(data.message);
      return;
    }
    return data;
  } catch {
    setError("A Network Error Occurred. Please try again later");
  }
}

export async function getArticleComments(articleId, setError) {
  try {
    const response = await fetch(`/api/articles/${articleId}/comments`);
    const data = await response.json();
    if (!response.ok) {
      setError(data);
      return;
    }
    return data;
  } catch {
    setError("A Network Error Occurred. Please try again later");
  }
}

export async function postComment(
  content,
  parentId = null,
  articleId,
  setError,
  setFieldErrors,
) {
  try {
    const response = await fetch(`/api/articles/${articleId}/comments`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comment: content,
        parentId,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      if (data.errors) {
        setError(data.errors.map((err) => err.msg));
      } else {
        setError(data.message);
      }
      return;
    }
    return data;
  } catch {
    setError("A Network Error Occurred. Please try again later");
  }
}

export async function checkUsername(username, setError, setFieldErrors) {
  setFieldErrors((prev) => ({ ...prev, username: null }));
  try {
    const response = await fetch("/api/users/username-attempt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      if (data.errors) {
        const mappedErrors = {};
        data.errors.forEach((err) => {
          mappedErrors[err.path] = err.msg;
        });
        setFieldErrors(mappedErrors);
      } else {
        setError(data.message);
      }
      return;
    }
    return data.available;
  } catch {
    setError("An error occurred.");
  }
}
