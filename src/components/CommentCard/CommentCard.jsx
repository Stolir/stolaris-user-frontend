import { Reply } from "iconoir-react";
import { getDateString } from "../../lib/utils";
import styles from "./CommentCard.module.css";
import Markdown from "react-markdown";
import CommentForm from "../CommentForm/CommentForm";

function CommentCard({ comment, handleClick, replyingTo, onPostReply }) {
  console.log(comment);
  return (
    <article className={styles.commentCard}>
      <div className={styles.commentInformation}>
        <p>{comment.user?.username || "Anonymous"}</p>{" "}
        <p>{getDateString(comment.createdAt)}</p>
      </div>
      <Markdown>{comment.content}</Markdown>
      {handleClick && (
        <button
          onClick={() => handleClick(comment.id)}
          className={styles.replyButton}
        >
          <Reply />
        </button>
      )}
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
  );
}

export default CommentCard;
