import { Link } from "react-router";
import styles from "./ReadMoreButton.module.css";
import { FastArrowRight } from "iconoir-react";

function ReadMoreButton({ article }) {
  return (
    <Link to={`/article/${article.slug}`} className={styles.readMore}>
      Read More
      <span>
        <FastArrowRight />
      </span>
    </Link>
  );
}

export default ReadMoreButton;
