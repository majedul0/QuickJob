import Select from "../ui/Select/Select";
import { CATEGORIES, LOCATIONS } from "../../data/jobs";
import "./JobFilters.css";

/**
 * Category + Location filter row – reusable filter bar.
 */
export default function JobFilters({
  category,
  onCategoryChange,
  location,
  onLocationChange,
}) {
  return (
    <div className="job-filters">
      <Select
        id="filter-category"
        options={CATEGORIES}
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        aria-label="Filter by category"
      />
      <Select
        id="filter-location"
        options={LOCATIONS}
        value={location}
        onChange={(e) => onLocationChange(e.target.value)}
        aria-label="Filter by location"
      />
    </div>
  );
}
