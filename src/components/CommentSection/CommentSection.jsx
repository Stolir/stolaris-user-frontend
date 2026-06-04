import { useEffect, useMemo, useState } from "react";
import CommentForm from "../CommentForm/CommentForm";
import styles from "./CommentSection.module.css";
import { getArticleComments, postComment } from "../../lib/serverRequests";
import AlertBox from "../AlertBox/AlertBox";
import CommentCard from "../CommentCard/CommentCard";
import { buildCommentsTree } from "../../lib/utils";

function CommentSection({ articleId }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);

  function toggleReplyBox(commentId) {
    if (replyingTo === commentId) {
      setReplyingTo(null);
    } else {
      setReplyingTo(commentId);
    }
  }

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
      setComments((prev) => [comment, ...prev]);
      setReplyingTo(null);
      return true;
    }
    setError("An error occurred");
    return false;
  }

  const commentsTree = useMemo(() => {
    if (comments.length > 0) {
      return buildCommentsTree(comments);
    } else {
      return [];
    }
  }, [comments]);

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
          {commentsTree.length > 0 && (
            <div className={styles.commentsContainer}>
              {commentsTree.map((comment) => (
                <div key={comment.id}>
                  <CommentCard
                    comment={comment}
                    handleClick={toggleReplyBox}
                    replyingTo={replyingTo}
                    onPostReply={handlePostComment}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default CommentSection;
