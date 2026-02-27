import "./Textarea.css";

/**
 * Reusable Textarea component
 */
export default function Textarea({
  label,
  id,
  error,
  className = "",
  rows = 4,
  ...rest
}) {
  return (
    <div className={`textarea-group ${error ? "textarea-group--error" : ""} ${className}`}>
      {label && (
        <label htmlFor={id} className="textarea-group__label">
          {label}
        </label>
      )}
      <textarea id={id} className="textarea-group__field" rows={rows} {...rest} />
      {error && <span className="textarea-group__error">{error}</span>}
    </div>
  );
}
