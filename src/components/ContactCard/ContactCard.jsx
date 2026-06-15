import { Link } from "react-router";
import styles from "./ContactCard.module.css";

function ContactCard({ icon, link = null, text }) {
  return (
    <article className={styles.contactCard}>
      {icon && icon}
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ) : (
        <p>{text}</p>
      )}
    </article>
  );
}

export default ContactCard;
