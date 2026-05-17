import { useLoaderData } from "react-router";
import styles from "./HomePage.module.css";
import FeaturedArticle from "../../components/FeaturedArticle/FeaturedArticle";

function HomePage() {
  const data = useLoaderData();

  return (
    <main>
      <FeaturedArticle article={data.featured} />
    </main>
  );
}

export default HomePage;
