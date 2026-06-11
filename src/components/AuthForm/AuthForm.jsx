import styles from "./AuthForm.module.css";

function AuthForm({ children, type, onSubmit }) {
  return (
    <form className={styles.authForm} onSubmit={onSubmit}>
      {children}
      <button type="submit">{type}</button>
    </form>
  );
}

export default AuthForm;
