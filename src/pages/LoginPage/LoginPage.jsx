import { Link, Navigate } from "react-router";
import AuthForm from "../../components/AuthForm/AuthForm";
import FormInput from "../../components/FormInput/FormInput";
import styles from "./LoginPage.module.css";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import AlertBox from "../../components/AlertBox/AlertBox";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

function LoginPage() {
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();

  async function handleLogin(e) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.get("username"),
          password: formData.get("password"),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.errors) {
          const mappedErrors = {};
          data.errors.forEach((err) => {
            mappedErrors[err.path] = err.msg;
          });
          setFieldErrors(mappedErrors);
        } else {
          setError(data.message);
        }
        setLoading(false);
        return;
      }
      login(data.user);
      setLoading(false);
    } catch {
      setError("An error has occurred. Please try again later.");
      setLoading(false);
    }
  }

  if (user) return <Navigate to="/" />;

  return (
    <>
      {error && (
        <AlertBox type="error" onClose={() => setError(null)}>
          {error}
        </AlertBox>
      )}
      {loading && <LoadingSpinner />}
      <section className={styles.formContainer}>
        <AuthForm type={"Login"} onSubmit={handleLogin} loading={loading}>
          <FormInput
            type="text"
            label="Username"
            name="username"
            placeholder="stolaris"
            isRequired={true}
            error={fieldErrors?.username}
          />
          <FormInput
            type="password"
            label="Password"
            name="password"
            placeholder="*******"
            isRequired={true}
            error={fieldErrors?.password}
          />
        </AuthForm>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </section>
    </>
  );
}

export default LoginPage;
