import { Link } from "react-router-dom";
import { MapPin, Briefcase, Clock } from "lucide-react";
import Badge from "../ui/Badge/Badge";
import "./JobCard.css";

const TAG_VARIANTS = {
  Design: "warning",
  Technology: "primary",
  Marketing: "accent",
  Business: "info",
  "Human Resources": "danger",
};

function getRelativeTime(dateStr) {
  const diff = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diff === 0) return "Today";
  if (diff === 1) return "1 day ago";
  if (diff < 7) return `${diff} days ago`;
  if (diff < 30) return `${Math.floor(diff / 7)} weeks ago`;
  return `${Math.floor(diff / 30)} months ago`;
}

/**
 * Job listing card – used in listing grids.
 */
export default function JobCard({ job }) {
  return (
    <Link to={`/jobs/${job.id}`} className="job-card">
      <div className="job-card__header">
        <img
          src={job.logo}
          alt={`${job.company} logo`}
          className="job-card__logo"
          loading="lazy"
        />
        <div className="job-card__meta">
          <h3 className="job-card__title">{job.title}</h3>
          <span className="job-card__company">
            {job.company} <span className="job-card__dot">·</span> {job.location}
          </span>
        </div>
      </div>

      <p className="job-card__desc">{job.description}</p>

      <div className="job-card__footer">
        <div className="job-card__tags">
          {job.tags?.map((tag) => (
            <Badge key={tag} variant={TAG_VARIANTS[tag] || "neutral"}>
              {tag}
            </Badge>
          ))}
          <Badge variant="neutral">{job.type}</Badge>
        </div>
        <div className="job-card__info">
          <span className="job-card__info-item">
            <MapPin size={14} /> {job.location}
          </span>
          <span className="job-card__info-item">
            <Briefcase size={14} /> {job.salary}
          </span>
          <span className="job-card__info-item">
            <Clock size={14} /> {getRelativeTime(job.postedAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}
