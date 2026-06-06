import styles from "./FormInput.module.css";

function FormInput({
  type = "text",
  name,
  label,
  onChange,
  onBlur,
  id,
  value,
  placeholder,
  isRequired,
  error,
  disabled = false,
}) {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id}>
        {label}
        <span>{!isRequired && "(Optional)"}</span>
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={isRequired}
        aria-required={isRequired}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={error ? styles.validationError : ""}
        autoComplete={name}
        disabled={disabled}
      />
      {error && (
        <span id={`${id}-error`} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export default FormInput;
