import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./SignupPage.css";

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [role, setRole] = useState("jobseeker"); // "jobseeker" | "employer"
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required";
    if (!form.lastName.trim()) errs.lastName = "Last name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "Must be at least 6 characters";
    if (!form.confirmPassword) errs.confirmPassword = "Confirm your password";
    else if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match";
    if (!agreed) errs.terms = "You must agree to the terms";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitting(true);
      try {
        await signup({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
          role,
        });
        navigate("/");
      } catch (err) {
        setApiError(err.message);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const iconStyle = {
    position: "absolute",
    left: 12,
    top: "50%",
    transform: "translateY(-50%)",
    color: "var(--color-gray-400)",
  };

  const toggleStyle = {
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
  };

  return (
    <section className="signup">
      <div className="signup__card">
        {/* Header */}
        <div className="signup__header">
          <img src="/logo.png" alt="QuickHire" className="signup__logo" />
          <h1 className="signup__title">Create Account</h1>
          <p className="signup__subtitle">Join QuickHire and find your dream job</p>
        </div>

        {/* Role Tabs */}
        <div className="signup__tabs">
          <button
            type="button"
            className={`signup__tab ${role === "jobseeker" ? "signup__tab--active" : ""}`}
            onClick={() => setRole("jobseeker")}
          >
            Job Seeker
          </button>
          <button
            type="button"
            className={`signup__tab ${role === "employer" ? "signup__tab--active" : ""}`}
            onClick={() => setRole("employer")}
          >
            Employer
          </button>
        </div>

        {/* API Error */}
        {apiError && <div className="signup__api-error">{apiError}</div>}

        {/* Form */}
        <form className="signup__form" onSubmit={handleSubmit} noValidate>
          {/* Name Row */}
          <div className="signup__row">
            <div className="signup__field">
              <label className="signup__label" htmlFor="signup-fn">
                First Name
              </label>
              <div style={{ position: "relative" }}>
                <User size={18} style={iconStyle} />
                <input
                  id="signup-fn"
                  type="text"
                  className={`signup__input ${errors.firstName ? "signup__input--error" : ""}`}
                  placeholder="First name"
                  value={form.firstName}
                  onChange={handleChange("firstName")}
                  style={{ paddingLeft: 40 }}
                />
              </div>
              {errors.firstName && <span className="signup__error">{errors.firstName}</span>}
            </div>

            <div className="signup__field">
              <label className="signup__label" htmlFor="signup-ln">
                Last Name
              </label>
              <div style={{ position: "relative" }}>
                <User size={18} style={iconStyle} />
                <input
                  id="signup-ln"
                  type="text"
                  className={`signup__input ${errors.lastName ? "signup__input--error" : ""}`}
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={handleChange("lastName")}
                  style={{ paddingLeft: 40 }}
                />
              </div>
              {errors.lastName && <span className="signup__error">{errors.lastName}</span>}
            </div>
          </div>

          {/* Email */}
          <div className="signup__field">
            <label className="signup__label" htmlFor="signup-email">
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={18} style={iconStyle} />
              <input
                id="signup-email"
                type="email"
                className={`signup__input ${errors.email ? "signup__input--error" : ""}`}
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange("email")}
                style={{ paddingLeft: 40 }}
              />
            </div>
            {errors.email && <span className="signup__error">{errors.email}</span>}
          </div>

          {/* Password */}
          <div className="signup__field">
            <label className="signup__label" htmlFor="signup-pw">
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={18} style={iconStyle} />
              <input
                id="signup-pw"
                type={showPassword ? "text" : "password"}
                className={`signup__input ${errors.password ? "signup__input--error" : ""}`}
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange("password")}
                style={{ paddingLeft: 40, paddingRight: 40 }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                style={toggleStyle}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <span className="signup__error">{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div className="signup__field">
            <label className="signup__label" htmlFor="signup-cpw">
              Confirm Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={18} style={iconStyle} />
              <input
                id="signup-cpw"
                type={showConfirm ? "text" : "password"}
                className={`signup__input ${errors.confirmPassword ? "signup__input--error" : ""}`}
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange("confirmPassword")}
                style={{ paddingLeft: 40, paddingRight: 40 }}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                style={toggleStyle}
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="signup__error">{errors.confirmPassword}</span>
            )}
          </div>

          {/* Terms */}
          <label className="signup__terms">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked);
                if (errors.terms) setErrors((prev) => ({ ...prev, terms: "" }));
              }}
            />
            <span>
              I agree to the <a href="#">Terms of Service</a> and{" "}
              <a href="#">Privacy Policy</a>
            </span>
          </label>
          {errors.terms && <span className="signup__error">{errors.terms}</span>}

          {/* Submit */}
          <button type="submit" className="signup__submit" disabled={submitting}>
            {submitting ? "Creating Account..." : "Create Account"}
          </button>

          {/* Divider */}
          <div className="signup__divider">
            <span>Or sign up with</span>
          </div>

          {/* Social */}
          <div className="signup__social">
            <button type="button" className="signup__social-btn">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
            <button type="button" className="signup__social-btn">
              <svg viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="signup__footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}
