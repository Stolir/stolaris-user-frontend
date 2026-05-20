import { getDateString } from "../../lib/utils";
import AuthorName from "../AuthorName/AuthorName";
import ReadTime from "../ReadTime/ReadTime";
import styles from "./ArticleExtraInfo.module.css";

function ArticleExtraInfo({ article }) {
  const date = getDateString(article.createdAt);
  return (
    <div className={styles.articleInfo}>
      <h1 className={styles.articleTitle}>{article.title}</h1>
      <div className={styles.dateReadTime}>
        <p className={styles.creationDate}>{date}</p>
        <span style={{ opacity: 0.5 }}>•</span>
        <ReadTime time={article.readTime} />
      </div>
      <AuthorName author={article.user.name} extraDash={true} />
    </div>
  );
}

export default ArticleExtraInfo;
