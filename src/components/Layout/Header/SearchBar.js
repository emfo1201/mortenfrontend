import React, { useCallback } from "react";
import DOMPurify from "dompurify";
import SearchIcon from "@mui/icons-material/Search";
import { SearchInput, SearchIconWrapper, SearchWrapper } from "./styles";

/**
 * SearchBar component provides an input field for searching players.
 * It allows users to type a search query and triggers a search function on a key press.
 *
 * @param {Object} props - The component props.
 * @param {string} props.search - The current search query.
 * @param {function} props.setSearch - Function to update the search query state.
 * @param {function} props.handleKeyPress - Function to handle key press events for search submission.
 * @returns {JSX.Element} The rendered SearchBar component.
 */
const SearchBar = ({ search, setSearch, handleKeyPress }) => {
  // Hantering av inputändringar och sanering av värde
  const handleSearchChange = useCallback(
    (e) => {
      const sanitizedValue = DOMPurify.sanitize(e.target.value);
      setSearch(sanitizedValue);
    },
    [setSearch]
  );

  return (
    <SearchWrapper>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <SearchInput
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={search}
        onKeyDown={handleKeyPress}
        onChange={handleSearchChange}
      />
    </SearchWrapper>
  );
};

export default SearchBar;
