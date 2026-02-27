import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Mail, Lock, Eye, EyeOff, ArrowLeft, AlertCircle, Info } from "lucide-react";
import "./AdminLoginPage.css";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const ADMIN_EMAIL = "admin@gmail.com";
  const ADMIN_PASSWORD = "admin";

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = "Admin email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.password) errs.password = "Password is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError("");
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // Mock admin auth
    if (form.email === ADMIN_EMAIL && form.password === ADMIN_PASSWORD) {
      navigate("/admin");
    } else {
      setLoginError("Invalid admin credentials. Please try again.");
    }
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    if (loginError) setLoginError("");
  };

  const iconStyle = {
    position: "absolute",
    left: 12,
    top: "50%",
    transform: "translateY(-50%)",
    color: "var(--color-gray-400)",
  };

  return (
    <section className="admin-login">
      <div className="admin-login__card">
        {/* Header */}
        <div className="admin-login__header">
          <div className="admin-login__icon">
            <Shield size={28} />
          </div>
          <h1 className="admin-login__title">Admin Portal</h1>
          <p className="admin-login__subtitle">
            Authorized personnel only. Enter your admin credentials to access the dashboard.
          </p>
        </div>

        {/* Error Alert */}
        {loginError && (
          <div className="admin-login__alert" role="alert">
            <AlertCircle size={18} />
            <span>{loginError}</span>
          </div>
        )}

        {/* Form */}
        <form className="admin-login__form" onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="admin-login__field">
            <label className="admin-login__label" htmlFor="admin-email">
              Admin Email
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={18} style={iconStyle} />
              <input
                id="admin-email"
                type="email"
                className={`admin-login__input ${errors.email ? "admin-login__input--error" : ""}`}
                placeholder="admin@gmail.com"
                value={form.email}
                onChange={handleChange("email")}
                style={{ paddingLeft: 40 }}
                autoComplete="email"
              />
            </div>
            {errors.email && <span className="admin-login__error">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className="admin-login__field">
            <label className="admin-login__label" htmlFor="admin-password">
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={18} style={iconStyle} />
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                className={`admin-login__input ${errors.password ? "admin-login__input--error" : ""}`}
                placeholder="Enter admin password"
                value={form.password}
                onChange={handleChange("password")}
                style={{ paddingLeft: 40, paddingRight: 40 }}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--color-gray-400)",
                  padding: 0,
                  display: "flex",
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <span className="admin-login__error">{errors.password}</span>}
          </div>

          {/* Submit */}
          <button type="submit" className="admin-login__submit">
            <Shield size={18} />
            Access Dashboard
          </button>

          {/* Hint */}
          <p className="admin-login__hint">
            <Info size={14} />
            Demo: admin@quickhire.com / admin123
          </p>
        </form>

        {/* Footer */}
        <div className="admin-login__footer">
          <Link to="/" className="admin-login__back">
            <ArrowLeft size={16} />
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
