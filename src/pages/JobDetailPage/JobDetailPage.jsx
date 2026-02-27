import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Briefcase, Clock, DollarSign } from "lucide-react";
import { useState } from "react";
import { useJobs } from "../../context/JobContext";
import Badge from "../../components/ui/Badge/Badge";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import Textarea from "../../components/ui/Textarea/Textarea";
import "./JobDetailPage.css";

const TAG_VARIANTS = {
  Design: "warning",
  Technology: "primary",
  Marketing: "accent",
  Business: "info",
  "Human Resources": "danger",
};

export default function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getJobById, addApplication } = useJobs();
  const job = getJobById(id);

  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    resumeLink: "",
    coverNote: "",
  });
  const [errors, setErrors] = useState({});

  if (!job) {
    return (
      <div className="container job-detail__not-found">
        <h2>Job not found</h2>
        <p>The job listing you are looking for does not exist.</p>
        <Link to="/">
          <Button variant="primary">Back to Jobs</Button>
        </Link>
      </div>
    );
  }

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (!form.resumeLink.trim())
      newErrors.resumeLink = "Resume link is required";
    else if (
      !/^https?:\/\/.+/.test(form.resumeLink)
    )
      newErrors.resumeLink = "Enter a valid URL (https://...)";
    if (!form.coverNote.trim()) newErrors.coverNote = "Cover note is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    addApplication({ ...form, jobId: job.id, jobTitle: job.title });
    setSubmitted(true);
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="job-detail">
      {/* Breadcrumb */}
      <div className="job-detail__breadcrumb-bg">
        <div className="container">
          <button className="job-detail__back" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
            Back to jobs
          </button>
        </div>
      </div>

      <div className="container job-detail__container">
        {/* Main Content */}
        <div className="job-detail__main">
          {/* Header card */}
          <div className="job-detail__header-card">
            <img
              src={job.logo}
              alt={`${job.company} logo`}
              className="job-detail__logo"
            />
            <div className="job-detail__header-info">
              <h1 className="job-detail__title">{job.title}</h1>
              <p className="job-detail__company">
                {job.company} <span className="job-detail__dot">·</span>{" "}
                {job.location}
              </p>
              <div className="job-detail__tags">
                {job.tags?.map((tag) => (
                  <Badge key={tag} variant={TAG_VARIANTS[tag] || "neutral"}>
                    {tag}
                  </Badge>
                ))}
                <Badge variant="neutral">{job.type}</Badge>
              </div>
            </div>
            <div className="job-detail__header-action">
              <Button variant="primary" onClick={() => setShowForm(true)}>
                Apply Now
              </Button>
            </div>
          </div>

          {/* Description */}
          <section className="job-detail__section">
            <h2>Description</h2>
            <p>{job.description}</p>
          </section>

          {/* Responsibilities */}
          {job.responsibilities && (
            <section className="job-detail__section">
              <h2>Responsibilities</h2>
              <ul className="job-detail__list">
                {job.responsibilities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Requirements */}
          {job.requirements && (
            <section className="job-detail__section">
              <h2>Requirements</h2>
              <ul className="job-detail__list">
                {job.requirements.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Apply Form */}
          {showForm && !submitted && (
            <section className="job-detail__section job-detail__apply" id="apply-form">
              <h2>Apply for this Job</h2>
              <form className="job-detail__form" onSubmit={handleSubmit}>
                <Input
                  label="Full Name"
                  id="apply-name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange("name")}
                  error={errors.name}
                />
                <Input
                  label="Email Address"
                  id="apply-email"
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange("email")}
                  error={errors.email}
                />
                <Input
                  label="Resume Link (URL)"
                  id="apply-resume"
                  type="url"
                  placeholder="https://drive.google.com/your-resume"
                  value={form.resumeLink}
                  onChange={handleChange("resumeLink")}
                  error={errors.resumeLink}
                />
                <Textarea
                  label="Cover Note"
                  id="apply-cover"
                  placeholder="Tell us why you'd be a great fit for this role..."
                  value={form.coverNote}
                  onChange={handleChange("coverNote")}
                  error={errors.coverNote}
                  rows={5}
                />
                <div className="job-detail__form-actions">
                  <Button type="submit" variant="primary" size="lg">
                    Submit Application
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </section>
          )}

          {submitted && (
            <section className="job-detail__section job-detail__success">
              <div className="job-detail__success-icon">✓</div>
              <h2>Application Submitted!</h2>
              <p>
                Thank you for applying to <strong>{job.title}</strong> at{" "}
                <strong>{job.company}</strong>. We&apos;ll review your application
                and get back to you.
              </p>
              <Link to="/">
                <Button variant="primary">Browse More Jobs</Button>
              </Link>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="job-detail__sidebar">
          <div className="job-detail__sidebar-card">
            <h3>About this role</h3>
            <div className="job-detail__sidebar-row">
              <MapPin size={18} />
              <div>
                <span className="job-detail__sidebar-label">Location</span>
                <span className="job-detail__sidebar-value">{job.location}</span>
              </div>
            </div>
            <div className="job-detail__sidebar-row">
              <Briefcase size={18} />
              <div>
                <span className="job-detail__sidebar-label">Job Type</span>
                <span className="job-detail__sidebar-value">{job.type}</span>
              </div>
            </div>
            <div className="job-detail__sidebar-row">
              <DollarSign size={18} />
              <div>
                <span className="job-detail__sidebar-label">Salary</span>
                <span className="job-detail__sidebar-value">{job.salary}</span>
              </div>
            </div>
            <div className="job-detail__sidebar-row">
              <Clock size={18} />
              <div>
                <span className="job-detail__sidebar-label">Posted</span>
                <span className="job-detail__sidebar-value">{job.postedAt}</span>
              </div>
            </div>
          </div>

          <div className="job-detail__sidebar-card">
            <h3>Categories</h3>
            <div className="job-detail__sidebar-tags">
              <Badge variant={TAG_VARIANTS[job.category] || "neutral"}>
                {job.category}
              </Badge>
              {job.tags
                ?.filter((t) => t !== job.category)
                .map((tag) => (
                  <Badge key={tag} variant={TAG_VARIANTS[tag] || "neutral"}>
                    {tag}
                  </Badge>
                ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
