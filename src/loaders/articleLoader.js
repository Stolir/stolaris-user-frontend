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

  const [featuredAuthor, ...articleAuthors] = await Promise.all([
    getAuthor(featuredArticle.userId),
    ...articles.map((article) => getAuthor(article.userId)),
  ]);
  console.log(articles);

  const articlesWithAuthors = articles.map((article, i) => ({
    ...article,
    author: articleAuthors[i].name,
  }));

  return {
    featured: { ...featuredArticle, author: featuredAuthor.name },
    all: articlesWithAuthors,
  };
}
