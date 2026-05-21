import { useEffect, useState } from "react";
import CommentForm from "../CommentForm/CommentForm";
import styles from "./CommentSection.module.css";
import { getArticleComments, postComment } from "../../lib/serverRequests";
import AlertBox from "../AlertBox/AlertBox";
import CommentCard from "../CommentCard/CommentCard";

function CommentSection({ articleId }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (articleId) {
      let ignored = false;
      (async () => {
        const comments = await getArticleComments(articleId, setError);
        if (comments) {
          setComments(comments);
        }
      })();

      return () => (ignored = true);
    }
  }, [articleId]);

  async function handlePostComment(content, parentId = null) {
    const comment = await postComment(content, parentId, articleId, setError);
    if (comment) {
      setComments((prev) => [...prev, comment]);
      return true;
    }
    return false;
  }

  return (
    <>
      {error && (
        <AlertBox
          type={"error"}
          onClose={() => {
            setError(null);
          }}
        >
          {error}
        </AlertBox>
      )}
      <section className={styles.commentSection}>
        <div>
          <h1>Comments</h1>
          <CommentForm onPostComment={handlePostComment} />
          {comments.length > 0 && (
            <div className={styles.commentsContainer}>
              {comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default CommentSection;
