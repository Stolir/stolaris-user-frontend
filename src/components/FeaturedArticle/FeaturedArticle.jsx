import { Link } from "react-router";
import { createArticleHTML } from "../../lib/tiptapUtils";
import styles from "./FeaturedArticle.module.css";
import { useEffect, useState } from "react";
import { getAuthor, getUser } from "../../lib/serverRequests";
import AuthorName from "../AuthorName/AuthorName";
import ReadTime from "../ReadTime/ReadTime";
import { ArrowRight, FastArrowRight, LongArrowRightUp } from "iconoir-react";
import ReadMoreButton from "../ReadMoreButton/ReadMoreButton";

function FeaturedArticle({ article }) {
  const content = article.content.content;
  // Find first paragraph and use it for the description
  const firstPara = content.find((item) => item.type === "paragraph").content;
  const description = createArticleHTML(firstPara);
  console.log(article);
  return (
    <section className={styles.featuredArticle}>
      <hr />
      <p className={styles.sectionName}>Featured Article</p>
      <Link to={`/article/${article.slug}`}>
        <h1>{article.title}</h1>
      </Link>
      <div className={styles.extraInfo}>
        <AuthorName author={article.author} />
        {article.readTime && (
          <>
            <span>•</span>
            <ReadTime time={article.readTime} />
          </>
        )}
      </div>
      <p className={styles.description} dangerouslySetInnerHTML={description} />
      <ReadMoreButton link={`/article/${article.slug}`} />
    </section>
  );
}

export default FeaturedArticle;
