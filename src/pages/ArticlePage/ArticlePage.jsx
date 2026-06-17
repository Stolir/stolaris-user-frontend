import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ArticlePage.module.css";
import { useNavigate, useParams } from "react-router";
import { getArticleBySlug } from "../../lib/serverRequests";
import AlertBox from "../../components/AlertBox/AlertBox";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { createArticleHTML } from "../../lib/tiptapUtils";
import AuthorName from "../../components/AuthorName/AuthorName";
import ReadTime from "../../components/ReadTime/ReadTime";
import ArticleExtraInfo from "../../components/ArticleExtraInfo/ArticleExtraInfo";
import CommentSection from "../../components/CommentSection/CommentSection";
import hljs from "highlight.js";

function ArticlePage() {
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [articleHTML, setArticleHTML] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();

  const articleContainerRef = useRef(null);

  useEffect(() => {
    (async () => {
      const article = await getArticleBySlug(slug, setError);
      if (article) {
        setLoading(false);
        setArticle(article);
      }
    })();
  }, [slug]);

  useEffect(() => {
    if (articleContainerRef?.current) {
      const articleElement =
        articleContainerRef.current.querySelectorAll("pre code");
      console.log(articleElement);
      articleElement.forEach((block) => {
        hljs.highlightElement(block);
      });
    }
  }, [articleContainerRef.current]); // Generate article HTML content and remove first heading since it's already the title

  useEffect(() => {
    let ignored = false;
    (async () => {
      if (!article) return null;

      const raw = await createArticleHTML(article.content.content);
      const doc = new DOMParser().parseFromString(raw.__html, "text/html");
      doc.querySelector(":first-child:is(h1, h2, h3, h4, h5, h6)")?.remove();
      if (!ignored) {
        setArticleHTML(doc.body.innerHTML);
      }
    })();

    return () => (ignored = true);
  }, [article]);

  if (error) {
    return (
      <>
        <AlertBox
          type={"error"}
          onClose={() => {
            setError(null);
            navigate("/");
          }}
        >
          {error}
        </AlertBox>
        <LoadingSpinner />
      </>
    );
  }

  if (loading) return <LoadingSpinner />;

  return (
    <section className={styles.articleSection}>
      <ArticleExtraInfo article={article} />
      <hr />
      <article className={styles.articleContainer}>
        <div
          ref={articleContainerRef}
          dangerouslySetInnerHTML={{ __html: articleHTML }}
        ></div>
      </article>
      <hr />
      <CommentSection articleId={article.id} />
    </section>
  );
}

export default ArticlePage;
