import { useState, useMemo, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  ArrowRight,
  Pen,
  BarChart3,
  Megaphone,
  Camera,
  Monitor,
  Code2,
  Briefcase,
  Users,
} from "lucide-react";
import { useJobs } from "../../context/JobContext";
import SearchBar from "../../components/jobs/SearchBar";
import JobFilters from "../../components/jobs/JobFilters";
import JobCard from "../../components/jobs/JobCard";
import "./HomePage.css";

const CATEGORIES = [
  { name: "Design", jobs: 235, icon: Pen },
  { name: "Sales", jobs: 756, icon: BarChart3 },
  { name: "Marketing", jobs: 140, icon: Megaphone, highlighted: true },
  { name: "Finance", jobs: 325, icon: Camera },
  { name: "Technology", jobs: 436, icon: Monitor },
  { name: "Engineering", jobs: 542, icon: Code2 },
  { name: "Business", jobs: 211, icon: Briefcase },
  { name: "Human Resource", jobs: 346, icon: Users },
];

export default function HomePage() {
  const { jobs } = useJobs();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef(null);
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All Locations");

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return jobs
      .filter(
        (job) =>
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q)
      )
      .slice(0, 5);
  }, [jobs, search]);

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const matchSearch =
        !search ||
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        category === "All" || job.category === category || job.tags?.includes(category);

      const matchLocation =
        location === "All Locations" || job.location === location;

      return matchSearch && matchCategory && matchLocation;
    });
  }, [jobs, search, category, location]);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <h1 className="hero__title">
              Discover
              <br />
              more than
              <br />
              <span className="hero__highlight">
                5000+ Jobs
                <svg className="hero__scribble" viewBox="0 0 328 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 8.5C52.6667 3.16667 187.6 -3.4 326 8.5" stroke="#26A4FF" strokeWidth="3" strokeLinecap="round" />
                  <path d="M2 10C60 4 150 2 200 5C250 8 300 6 326 10" stroke="#26A4FF" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M15 6C80 1 170 3 220 2C280 1 310 4 326 5" stroke="#26A4FF" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="hero__subtitle">
              Great platform for the job seeker that searching for new career
              heights and passionate about startups.
            </p>
            <div className="hero__search-wrapper" ref={searchRef}>
              <div className="hero__search-bar">
                <div className="hero__search-field">
                  <Search size={20} className="hero__search-icon" />
                  <input
                    type="text"
                    className="hero__search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    placeholder="Job title or keyword"
                  />
                </div>
                <div className="hero__search-divider" />
                <div className="hero__search-field">
                  <MapPin size={20} className="hero__search-icon hero__search-icon--location" />
                  <input
                    type="text"
                    className="hero__search-input"
                    placeholder="Florence, Italy"
                    readOnly
                  />
                </div>
                <button className="hero__search-btn">Search my job</button>
              </div>

              {/* Search Results Dropdown */}
              {searchFocused && search.trim() && (
                <div className="hero__search-results">
                  {searchResults.length > 0 ? (
                    searchResults.map((job) => (
                      <Link
                        key={job.id}
                        to={`/jobs/${job.id}`}
                        className="hero__search-result-item"
                        onClick={() => setSearchFocused(false)}
                      >
                        <img
                          src={job.logo}
                          alt={job.company}
                          className="hero__search-result-logo"
                        />
                        <div className="hero__search-result-info">
                          <span className="hero__search-result-title">{job.title}</span>
                          <span className="hero__search-result-meta">
                            {job.company} &middot; {job.location}
                          </span>
                        </div>
                        <span className="hero__search-result-type">{job.type}</span>
                      </Link>
                    ))
                  ) : (
                    <div className="hero__search-result-empty">
                      No jobs found for "{search}"
                    </div>
                  )}
                </div>
              )}
            </div>
            <p className="hero__popular">
              <span>Popular:</span> UI Designer, UX Researcher, Android, Admin
            </p>
          </div>
          <div className="hero__illustration">
            {/* Decorative diamond shapes */}
            <div className="hero__diamonds">
              <div className="hero__diamond hero__diamond--1" />
              <div className="hero__diamond hero__diamond--2" />
              <div className="hero__diamond hero__diamond--3" />
            </div>
            <img
              src="/hero-person.png"
              alt="Professional pointing at job listings"
              className="hero__person"
            />
          </div>
        </div>
      </section>

      {/* Explore by Category Section */}
      <section className="categories">
        <div className="container">
          <h2 className="categories__title">
            Explore by <span className="categories__highlight">category</span>
          </h2>
          <div className="categories__grid">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.name}
                  className={`categories__card ${
                    cat.highlighted ? "categories__card--active" : ""
                  }`}
                >
                  <Icon
                    size={32}
                    className="categories__card-icon"
                  />
                  <h3 className="categories__card-name">{cat.name}</h3>
                  <p className="categories__card-count">
                    {cat.jobs} jobs available <ArrowRight size={16} />
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="cta-banner">
        <div className="container cta-banner__inner">
          <div className="cta-banner__content">
            <h2 className="cta-banner__title">Start posting jobs today</h2>
            <p className="cta-banner__text">Start posting jobs for only $10.</p>
            <Link to="/admin" className="cta-banner__btn">
              Sign Up For Free
            </Link>
          </div>
          <div className="cta-banner__preview">
            <div className="cta-banner__mockup">
              <div className="cta-banner__mockup-bar">
                <span /><span /><span />
              </div>
              <div className="cta-banner__mockup-body">
                <div className="cta-banner__mockup-sidebar">
                  <div className="cta-banner__mockup-logo">QuickHire</div>
                  <div className="cta-banner__mockup-line" />
                  <div className="cta-banner__mockup-line" />
                  <div className="cta-banner__mockup-line" />
                  <div className="cta-banner__mockup-line" />
                </div>
                <div className="cta-banner__mockup-main">
                  <div className="cta-banner__mockup-greeting">Good morning, Maria</div>
                  <div className="cta-banner__mockup-cards">
                    <div className="cta-banner__mockup-stat cta-banner__mockup-stat--green">76</div>
                    <div className="cta-banner__mockup-stat cta-banner__mockup-stat--yellow">3</div>
                    <div className="cta-banner__mockup-stat cta-banner__mockup-stat--purple">24</div>
                  </div>
                  <div className="cta-banner__mockup-chart" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section id="featured-jobs" className="listings">
        <div className="container">
          <div className="listings__header">
            <div className="listings__title-row">
              <h2 className="listings__title">
                Featured <span className="listings__title-highlight">jobs</span>
              </h2>
              <Link to="/" className="listings__show-all">
                Show all jobs <ArrowRight size={16} />
              </Link>
            </div>
            <div className="listings__filters">
              <div className="listings__search-mobile">
                <SearchBar
                  value={search}
                  onChange={setSearch}
                  placeholder="Search jobs..."
                />
              </div>
              <JobFilters
                category={category}
                onCategoryChange={setCategory}
                location={location}
                onLocationChange={setLocation}
              />
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="listings__grid">
              {filtered.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="listings__empty">
              <p>No jobs found matching your criteria.</p>
              <p>Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
