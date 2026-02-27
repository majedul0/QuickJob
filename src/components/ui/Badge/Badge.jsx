import "./Badge.css";

/**
 * Reusable Badge / Tag component
 * @param {"primary"|"accent"|"warning"|"danger"|"info"|"neutral"} variant
 */
export default function Badge({ children, variant = "primary", className = "" }) {
  return (
    <span className={`badge badge--${variant} ${className}`}>{children}</span>
  );
}
