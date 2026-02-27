import "./Button.css";

/**
 * Reusable Button component
 * @param {"primary"|"secondary"|"outline"|"danger"|"ghost"} variant
 * @param {"sm"|"md"|"lg"} size
 * @param {boolean} fullWidth
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  type = "button",
  disabled = false,
  onClick,
  className = "",
  ...rest
}) {
  const classes = [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && "btn--full",
    disabled && "btn--disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
