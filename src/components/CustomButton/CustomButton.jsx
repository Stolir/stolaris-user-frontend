import styles from "./CustomButton.module.css";

function CustomButton({ text, type = "button", onClick }) {
  return (
    <button className={styles.customButton} type={type} onClick={onClick}>
      {text}
    </button>
  );
}

export default CustomButton;
