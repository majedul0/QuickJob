import "./Input.css";

/**
 * Reusable Input component
 * @param {string} label
 * @param {string} error
 * @param {React.ReactNode} icon - optional leading icon
 */
export default function Input({
  label,
  id,
  error,
  icon,
  className = "",
  ...rest
}) {
  return (
    <div className={`input-group ${error ? "input-group--error" : ""} ${className}`}>
      {label && (
        <label htmlFor={id} className="input-group__label">
          {label}
        </label>
      )}
      <div className="input-group__wrapper">
        {icon && <span className="input-group__icon">{icon}</span>}
        <input id={id} className="input-group__field" {...rest} />
      </div>
      {error && <span className="input-group__error">{error}</span>}
    </div>
  );
}
