import "./Select.css";

/**
 * Reusable Select component
 */
export default function Select({
  label,
  id,
  options = [],
  value,
  onChange,
  className = "",
  ...rest
}) {
  return (
    <div className={`select-group ${className}`}>
      {label && (
        <label htmlFor={id} className="select-group__label">
          {label}
        </label>
      )}
      <select
        id={id}
        className="select-group__field"
        value={value}
        onChange={onChange}
        {...rest}
      >
        {options.map((opt) => {
          const val = typeof opt === "string" ? opt : opt.value;
          const text = typeof opt === "string" ? opt : opt.label;
          return (
            <option key={val} value={val}>
              {text}
            </option>
          );
        })}
      </select>
    </div>
  );
}
