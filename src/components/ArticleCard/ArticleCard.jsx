import { Link } from "react-router";
import { getArticleDescription } from "../../lib/utils";
import ReadTime from "../ReadTime/ReadTime";
import styles from "./ArticleCard.module.css";
import ReadMoreButton from "../ReadMoreButton/ReadMoreButton";

function ArticleCard({ article }) {
  const description = getArticleDescription(article);
  return (
    <article className={styles.articleCard}>
      <Link to={`/article/${article.slug}`}>
        <h3>{article.title}</h3>
      </Link>
      <p dangerouslySetInnerHTML={description} />
      <ReadTime time={article.readTime} />
      <ReadMoreButton link={`/article/${article.slug}`} />
    </article>
  );
}

export default ArticleCard;
