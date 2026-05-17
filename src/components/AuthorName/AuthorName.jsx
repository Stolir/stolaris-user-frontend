import styles from "./AuthorName.module.css";

function AuthorName({ author }) {
  return (
    <p className={styles.authorName}>
      <span className={styles.dash}></span>
      By {author}
    </p>
  );
}

export default AuthorName;
