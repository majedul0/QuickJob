import { Search } from "lucide-react";
import "./SearchBar.css";

/**
 * Search bar with integrated icon – used in hero and listing sections.
 */
export default function SearchBar({ value, onChange, placeholder = "Search jobs..." }) {
  return (
    <div className="search-bar">
      <Search size={20} className="search-bar__icon" />
      <input
        type="text"
        className="search-bar__input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
