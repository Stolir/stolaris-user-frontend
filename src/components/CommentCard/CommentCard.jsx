import { getDateString } from "../../lib/utils";
import styles from "./CommentCard.module.css";
import Markdown from "react-markdown";

function CommentCard({ comment }) {
  return (
    <article className={styles.commentCard}>
      <div className={styles.commentInformation}>
        <p>{comment.user || "Anonymous"}</p>{" "}
        <p>{getDateString(comment.createdAt)}</p>
      </div>
      <Markdown>{comment.content}</Markdown>
    </article>
  );
}

export default CommentCard;
