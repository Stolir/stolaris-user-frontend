import { Link } from "react-router";
import { createArticleHTML } from "../../lib/tiptapUtils";
import styles from "./FeaturedArticle.module.css";
import { useEffect, useState } from "react";
import { getAuthor, getUser } from "../../lib/serverRequests";
import AuthorName from "../AuthorName/AuthorName";
import ReadTime from "../ReadTime/ReadTime";
import { ArrowRight, FastArrowRight, LongArrowRightUp } from "iconoir-react";

function FeaturedArticle({ article }) {
  const [author, setAuthor] = useState("Author");

  useEffect(
    () => async () => {
      const author = await getAuthor(article.userId);
      if (author) {
        setAuthor(author.name);
      } else {
        setAuthor("Author");
      }
      console.log(author, article.userId);
    },
    [article.user],
  );

  const content = article.content.content;
  // Find first paragraph and use it for the description
  const description = content.find((item) => item.type === "paragraph")
    .content[0].text;
  return (
    <section className={styles.featuredArticle}>
      <hr />
      <p className={styles.sectionName}>Featured Article</p>
      <Link to={`/article/${article.slug}`}>
        <h1>{article.title}</h1>
      </Link>
      <div className={styles.extraInfo}>
        <AuthorName author={author} />
        <span>•</span>
        <ReadTime time={article.readTime} />
      </div>
      <p className={styles.description}>{description}</p>
      <Link className={styles.readMore} to={`/article/${article.slug}`}>
        Read More
        <span>
          <FastArrowRight />
        </span>
      </Link>
    </section>
  );
}

export default FeaturedArticle;
