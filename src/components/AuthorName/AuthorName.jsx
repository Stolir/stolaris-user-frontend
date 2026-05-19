import styles from "./AuthorName.module.css";

function AuthorName({ author, extraDash = false }) {
  return (
    <p className={styles.authorName}>
      <span className={styles.dash}></span>
      By {author}
      {extraDash && <span className={styles.dash}></span>}{" "}
    </p>
  );
}

export default AuthorName;
