import { getArticles, getFeaturedArticle } from "../lib/serverRequests";

export async function homeArticlesLoader() {
  const [featuredArticle, articles] = await Promise.all([
    getFeaturedArticle(),
    getArticles(),
  ]);

  if (!featuredArticle || !articles) {
    throw new Response("Failed to load articles", { status: 500 });
  }

  return { featured: featuredArticle, all: articles };
}
