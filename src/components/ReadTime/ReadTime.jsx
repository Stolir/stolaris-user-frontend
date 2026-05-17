import styles from "./ReadTime.module.css";

function ReadTime({ time }) {
  return <p className={styles.readTime}>{time} minute read</p>;
}

export default ReadTime;
