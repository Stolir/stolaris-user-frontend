import {
  getArticles,
  getAuthor,
  getFeaturedArticle,
} from "../lib/serverRequests";

export async function homeArticlesLoader() {
  const [featuredArticle, articles] = await Promise.all([
    getFeaturedArticle(),
    getArticles(),
  ]);

  if (!featuredArticle || !articles) {
    throw new Response("Failed to load articles", { status: 500 });
  }

  // remove featured article from all articles to remove duplicates
  const filteredArticles = articles.filter(
    (article) => article.id !== featuredArticle.id,
  );

  return {
    featured: featuredArticle,
    all: filteredArticles,
  };
}
