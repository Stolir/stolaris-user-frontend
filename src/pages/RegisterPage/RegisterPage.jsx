import { useState } from "react";
import styles from "./RegisterPage.module.css";
import { useAuth } from "../../context/AuthContext";
import { Link, Navigate, useNavigate } from "react-router";
import AlertBox from "../../components/AlertBox/AlertBox";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import AuthForm from "../../components/AuthForm/AuthForm";
import FormInput from "../../components/FormInput/FormInput";

function RegisterPage() {
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const [usernameStatus, setUsernameStatus] = useState(null);

  const navigate = useNavigate();

  async function checkUsername(username) {
    setUsernameStatus(null);
    setFieldErrors((prev) => ({ ...prev, username: null }));
    try {
      const response = await fetch("/api/user/username-attempt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
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
        return;
      }
      if (data.available) {
        setUsernameStatus(true);
      } else {
        setUsernameStatus(false);
      }
    } catch {
      setError("An error occurred.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: formData.get("username"),
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
          confirmPassword: formData.get("confirmPassword"),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.errors) {
          const mappedErrors = {};
          data.errors.forEach((err) => (mappedErrors[err.path] = err.msg));
          setFieldErrors(mappedErrors);
        } else {
          setError(data.message);
        }
        setLoading(false);
        return;
      }
      navigate("/login");
    } catch {
      setError("An error occurred.");
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
        <AuthForm type={"Register"} onSubmit={handleSubmit} loading={loading}>
          <div className={styles.usernameField}>
            <FormInput
              type="text"
              label="Username"
              name="username"
              placeholder="stolaris"
              onBlur={(e) => checkUsername(e.target.value)}
              isRequired={true}
              error={fieldErrors?.username}
            />
            {usernameStatus === true && (
              <span className={styles.usernameSuccess}>
                Username Available!
              </span>
            )}
            {usernameStatus === false && (
              <span className={styles.usernameFail}>
                Username Not Available.
              </span>
            )}
          </div>
          <FormInput
            type="text"
            label="Name"
            name="name"
            placeholder="John Doe"
            isRequired={true}
            error={fieldErrors?.name}
          />
          <FormInput
            type="email"
            label="Email"
            name="email"
            placeholder="stolaris@example.com"
            error={fieldErrors?.email}
          />
          <FormInput
            type="password"
            label="Password"
            name="password"
            placeholder="*******"
            isRequired={true}
            error={fieldErrors?.password}
          />
          <FormInput
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            placeholder="*******"
            isRequired={true}
            error={fieldErrors?.confirmPassword}
          />
        </AuthForm>
        <p>
          Already a reader? <Link to="/login">Log in</Link>
        </p>
      </section>
    </>
  );
}

export default RegisterPage;
