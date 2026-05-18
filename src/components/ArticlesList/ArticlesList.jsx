import ArticleCard from "../ArticleCard/ArticleCard";
import styles from "./ArticlesList.module.css";

function ArticlesList({ articles }) {
  return (
    <section className={styles.articlesList}>
      <hr />
      <h1>All Articles</h1>
      <div className={styles.articlesContainer}>
        {articles.map((article) => (
          <ArticleCard article={article} />
        ))}
      </div>
    </section>
  );
}

export default ArticlesList;
