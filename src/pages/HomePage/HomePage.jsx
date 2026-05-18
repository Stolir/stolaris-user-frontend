import { useLoaderData } from "react-router";
import styles from "./HomePage.module.css";
import FeaturedArticle from "../../components/FeaturedArticle/FeaturedArticle";
import ArticlesList from "../../components/ArticlesList/ArticlesList";

function HomePage() {
  const data = useLoaderData();

  return (
    <main>
      <FeaturedArticle article={data.featured} />
      <ArticlesList articles={data.all} />
    </main>
  );
}

export default HomePage;
