// SearchBar.js
import React, { useCallback } from "react";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "../styles";

const SearchBar = ({ search, setSearch, handleKeyPress }) => {
  const classes = useStyles();

  const handleSearchChange = useCallback(
    (e) => {
      setSearch(e.target.value);
    },
    [setSearch]
  );

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        value={search}
        onKeyDown={handleKeyPress}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBar;
