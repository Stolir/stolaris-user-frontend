import { Reply, Trash, TrashSolid } from "iconoir-react";
import { getDateString } from "../../lib/utils";
import styles from "./CommentCard.module.css";
import Markdown from "react-markdown";
import CommentForm from "../CommentForm/CommentForm";
import { useAuth } from "../../context/AuthContext";
import { deleteComment } from "../../lib/serverRequests";
import { useState } from "react";
import AlertBox from "../AlertBox/AlertBox";

function CommentCard({
  comment,
  handleClick,
  replyingTo,
  onPostReply,
  removeComment,
}) {
  const [error, setError] = useState(null);
  const { user } = useAuth();

  async function handleDeleteComment(id) {
    const isDeleted = await deleteComment(id, setError);
    console.log(isDeleted, removeComment);
    if (isDeleted) {
      removeComment(id);
    }
  }

  return (
    <>
      {error && (
        <AlertBox type="error" onClose={() => setError(null)}>
          {error}
        </AlertBox>
      )}
      <article className={styles.commentCard}>
        <div className={styles.commentInformation}>
          <p>{comment.user?.username || "Anonymous"}</p>
          <p>{getDateString(comment.createdAt)}</p>
        </div>
        <Markdown>{comment.content}</Markdown>
        <div className={styles.controlsCard}>
          {handleClick && (
            <button
              onClick={() => handleClick(comment.id)}
              className={styles.replyButton}
            >
              <Reply />
            </button>
          )}
          {comment.userId === user.id && (
            <button
              onClick={() => {
                handleDeleteComment(comment.id);
              }}
              className={styles.replyButton}
            >
              <TrashSolid />
            </button>
          )}
        </div>
        {comment.id === replyingTo && (
          <>
            <p className={styles.replyingText}>
              replying to <span>{comment.user?.username || "Anonymous"}</span>
            </p>
            <CommentForm parentId={comment.id} onPostComment={onPostReply} />
          </>
        )}
        {comment.replies?.length > 0 && (
          <div className={styles.repliesContainer}>
            {comment.replies.map((c) => (
              <CommentCard
                key={c.id}
                comment={c}
                handleClick={handleClick}
                replyingTo={replyingTo}
                onPostReply={onPostReply}
              />
            ))}
          </div>
        )}
      </article>
    </>
  );
}

export default CommentCard;
