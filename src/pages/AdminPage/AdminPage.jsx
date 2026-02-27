import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, ExternalLink } from "lucide-react";
import { useJobs } from "../../context/JobContext";
import { CATEGORIES, LOCATIONS, JOB_TYPES } from "../../data/jobs";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import Select from "../../components/ui/Select/Select";
import Textarea from "../../components/ui/Textarea/Textarea";
import Badge from "../../components/ui/Badge/Badge";
import "./AdminPage.css";

const TAG_VARIANTS = {
  Design: "warning",
  Technology: "primary",
  Marketing: "accent",
  Business: "info",
  "Human Resources": "danger",
};

const INITIAL_FORM = {
  title: "",
  company: "",
  location: LOCATIONS[1],
  type: JOB_TYPES[0],
  category: CATEGORIES[1],
  salary: "",
  description: "",
  responsibilities: "",
  requirements: "",
  tags: "",
};

export default function AdminPage() {
  const { jobs, addJob, deleteJob } = useJobs();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    const value = e.target ? e.target.value : e;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Job title is required";
    if (!form.company.trim()) newErrors.company = "Company name is required";
    if (!form.salary.trim()) newErrors.salary = "Salary range is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const parsedTags = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    addJob({
      ...form,
      tags: parsedTags.length > 0 ? parsedTags : [form.category],
      responsibilities: form.responsibilities
        .split("\n")
        .map((r) => r.trim())
        .filter(Boolean),
      requirements: form.requirements
        .split("\n")
        .map((r) => r.trim())
        .filter(Boolean),
      logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        form.company
      )}&background=4640DE&color=fff&rounded=true&size=64`,
    });

    setForm(INITIAL_FORM);
    setShowForm(false);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete "${title}"? This cannot be undone.`)) {
      deleteJob(id);
    }
  };

  return (
    <div className="admin-page">
      {/* Header */}
      <section className="admin-page__hero">
        <div className="container admin-page__hero-inner">
          <div>
            <h1 className="admin-page__title">Admin Dashboard</h1>
            <p className="admin-page__subtitle">
              Manage your job listings — add new positions or remove outdated ones.
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={() => setShowForm((prev) => !prev)}
          >
            <Plus size={18} />
            {showForm ? "Close Form" : "Add New Job"}
          </Button>
        </div>
      </section>

      <div className="container admin-page__body">
        {/* Add Job Form */}
        {showForm && (
          <section className="admin-page__form-section">
            <h2>Create New Job Listing</h2>
            <form className="admin-page__form" onSubmit={handleSubmit}>
              <div className="admin-page__form-grid">
                <Input
                  label="Job Title"
                  id="admin-title"
                  placeholder="e.g. Frontend Developer"
                  value={form.title}
                  onChange={handleChange("title")}
                  error={errors.title}
                />
                <Input
                  label="Company Name"
                  id="admin-company"
                  placeholder="e.g. Acme Corp"
                  value={form.company}
                  onChange={handleChange("company")}
                  error={errors.company}
                />
                <Select
                  label="Location"
                  id="admin-location"
                  options={LOCATIONS.filter((l) => l !== "All Locations")}
                  value={form.location}
                  onChange={handleChange("location")}
                />
                <Select
                  label="Job Type"
                  id="admin-type"
                  options={JOB_TYPES}
                  value={form.type}
                  onChange={handleChange("type")}
                />
                <Select
                  label="Category"
                  id="admin-category"
                  options={CATEGORIES.filter((c) => c !== "All")}
                  value={form.category}
                  onChange={handleChange("category")}
                />
                <Input
                  label="Salary Range"
                  id="admin-salary"
                  placeholder="e.g. $60k - $90k"
                  value={form.salary}
                  onChange={handleChange("salary")}
                  error={errors.salary}
                />
              </div>

              <Textarea
                label="Description"
                id="admin-desc"
                placeholder="Write a brief job description..."
                value={form.description}
                onChange={handleChange("description")}
                error={errors.description}
                rows={4}
              />
              <Textarea
                label="Responsibilities (one per line)"
                id="admin-resp"
                placeholder="Develop UI components&#10;Write unit tests&#10;Collaborate with designers"
                value={form.responsibilities}
                onChange={handleChange("responsibilities")}
                rows={4}
              />
              <Textarea
                label="Requirements (one per line)"
                id="admin-req"
                placeholder="3+ years experience&#10;Proficiency in React&#10;Strong communication skills"
                value={form.requirements}
                onChange={handleChange("requirements")}
                rows={4}
              />
              <Input
                label="Tags (comma-separated)"
                id="admin-tags"
                placeholder="e.g. Design, Technology"
                value={form.tags}
                onChange={handleChange("tags")}
              />

              <div className="admin-page__form-actions">
                <Button type="submit" variant="primary" size="lg">
                  <Plus size={18} /> Publish Job
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

        {/* Job Listings Table */}
        <section className="admin-page__listings">
          <div className="admin-page__listings-header">
            <h2>Job Listings ({jobs.length})</h2>
          </div>

          {jobs.length === 0 ? (
            <div className="admin-page__empty">
              <p>No job listings yet. Click "Add New Job" to create one.</p>
            </div>
          ) : (
            <div className="admin-page__table-wrap">
              <table className="admin-page__table">
                <thead>
                  <tr>
                    <th>Job</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Salary</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id}>
                      <td>
                        <div className="admin-page__job-cell">
                          <img
                            src={job.logo}
                            alt=""
                            className="admin-page__job-logo"
                          />
                          <div>
                            <span className="admin-page__job-title">
                              {job.title}
                            </span>
                            <span className="admin-page__job-company">
                              {job.company}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>{job.location}</td>
                      <td>
                        <Badge variant="neutral">{job.type}</Badge>
                      </td>
                      <td>
                        <Badge
                          variant={TAG_VARIANTS[job.category] || "neutral"}
                        >
                          {job.category}
                        </Badge>
                      </td>
                      <td>{job.salary}</td>
                      <td>
                        <div className="admin-page__actions">
                          <Link to={`/jobs/${job.id}`}>
                            <Button variant="ghost" size="sm">
                              <ExternalLink size={14} /> View
                            </Button>
                          </Link>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(job.id, job.title)}
                          >
                            <Trash2 size={14} /> Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
