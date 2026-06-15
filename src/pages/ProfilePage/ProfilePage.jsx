import { Navigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import styles from "./ProfilePage.module.css";
import FormInput from "../../components/FormInput/FormInput";
import { useEffect, useState } from "react";
import { checkUsername, getUserComments } from "../../lib/serverRequests";
import FormButton from "../../components/FormButton/FormButton";
import AlertBox from "../../components/AlertBox/AlertBox";
import CommentCard from "../../components/CommentCard/CommentCard";

function ProfilePage() {
  const { user, login } = useAuth();
  const [userInfo, setUserInfo] = useState(user);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [usernameStatus, setUsernameStatus] = useState(null);
  const [changePassword, setChangePassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userComments, setUserComments] = useState([]);

  useEffect(() => {
    let ignored = false;
    (async () => {
      const comments = await getUserComments(user?.id, setError);
      if (comments && !ignored) {
        return setUserComments(comments);
      }
    })();

    return () => (ignored = true);
  }, [user?.id]);

  function removeComment(id) {
    setUserComments((prev) => prev.filter((comment) => comment.id !== id));
  }

  function toggleEditing(e = null, newUser = null) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (isEditing) {
      setIsEditing(false);
      setChangePassword(false);
      setUserInfo(newUser || user);
      setUsernameStatus(null);
      setFieldErrors({});
      setError(null);
    } else {
      setIsEditing(true);
    }
  }

  function toggleChangePassword() {
    if (isEditing) {
      setChangePassword(!changePassword);
    } else {
      setChangePassword(false);
    }
  }

  async function handleUsernameOnBlur(username) {
    setUsernameStatus(null);
    setFieldErrors((prev) => ({ ...prev, username: null }));
    if (username === user.username) {
      return;
    }
    setUsernameStatus(null);
    const isAvailable = await checkUsername(username, setError, setFieldErrors);
    if (isAvailable === true || isAvailable === false)
      setUsernameStatus(isAvailable);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    const formData = new FormData(e.target);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.get("username"),
          name: formData.get("name"),
          email: formData.get("email"),
          newPassword: formData.get("newPassword"),
          confirmNewPassword: formData.get("confirmNewPassword"),
          currentPassword: formData.get("currentPassword"),
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
      // Display success message
      setSuccess("Profile saved");
      login(data.user);
      setUserInfo(data.user);
      toggleEditing(e, data.user);
    } catch {
      setError("An error occurred. Please try again.");
    }
  }

  if (!user) return <Navigate to="/login" />;

  return (
    <>
      {error && (
        <AlertBox type="error" onClose={() => setError(null)}>
          {error}
        </AlertBox>
      )}
      {success && (
        <AlertBox type="success" onClose={() => setSuccess(null)}>
          {success}
        </AlertBox>
      )}
      <section className={styles.profileSection}>
        <section className={styles.userSettings}>
          <h2>Reader Settings</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.usernameField}>
              <FormInput
                type="text"
                label="Username"
                name="username"
                value={userInfo.username}
                onChange={(e) =>
                  setUserInfo((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }))
                }
                onBlur={(e) => handleUsernameOnBlur(e.target.value)}
                isRequired={true}
                disabled={!isEditing}
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
              value={userInfo.name}
              onChange={(e) =>
                setUserInfo((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              placeholder="John Doe"
              isRequired={true}
              disabled={!isEditing}
              error={fieldErrors?.name}
            />
            <FormInput
              type="email"
              label="Email"
              name="email"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              placeholder="stolaris@example.com"
              disabled={!isEditing}
              error={fieldErrors?.email}
            />
            <button
              className={styles.changePassword}
              type="button"
              disabled={!isEditing}
              onClick={() => {
                toggleChangePassword();
              }}
            >
              {!changePassword ? "Change password" : "Cancel"}
            </button>
            {(changePassword || userInfo.email !== user.email) && (
              <FormInput
                type="password"
                id="currentPassword"
                name="currentPassword"
                onChange={(e) =>
                  setUserInfo((prev) => ({
                    ...prev,
                    currentPassword: e.target.value,
                  }))
                }
                value={userInfo.currentPassword || ""}
                isRequired={true}
                label={"Current Password"}
                error={fieldErrors.currentPassword}
              />
            )}
            {changePassword && (
              <>
                <FormInput
                  type="password"
                  label="Password"
                  name="password"
                  onChange={(e) =>
                    setUserInfo((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  placeholder="*******"
                  isRequired={true}
                  error={fieldErrors?.password}
                />
                <FormInput
                  type="password"
                  label="Confirm Password"
                  name="confirmPassword"
                  onChange={(e) =>
                    setUserInfo((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                  placeholder="*******"
                  isRequired={true}
                  error={fieldErrors?.confirmPassword}
                />
              </>
            )}
            <div className={styles.buttonContainer}>
              {isEditing ? (
                <>
                  <FormButton type="submit">Save</FormButton>
                  <FormButton type="button" onClick={toggleEditing}>
                    Cancel
                  </FormButton>
                </>
              ) : (
                <FormButton type="button" onClick={(e) => toggleEditing(e)}>
                  Edit
                </FormButton>
              )}
            </div>
          </form>
        </section>
        <section className={styles.userActivity}>
          <h2>Reader Activity</h2>
          {userComments.length > 0 ? (
            <section className={styles.commentsContainer}>
              {userComments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  removeComment={removeComment}
                />
              ))}
            </section>
          ) : (
            <p>No recorded Activity.</p>
          )}
        </section>
      </section>
    </>
  );
}

export default ProfilePage;
