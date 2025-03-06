import React, { useCallback, useState } from "react";
import DOMPurify from "dompurify";
import { IconButton } from "@mui/material";
import { PlaceholdersAndVanishInput } from "../../ui/placeholders-and-vanish-input";
import {
  MobileSearchIconStyled,
  MobileSearchIconWrapper,
  DialogStyled,
  DialogContentStyled,
} from "./styles";
import CloseIcon from "@mui/icons-material/Close";

const SearchBar = ({ search, setSearch, handleKeyPress }) => {
  const [open, setOpen] = useState(false);

  const handleSearchChange = useCallback(
    (e) => {
      const sanitizedValue = DOMPurify.sanitize(e.target.value);
      setSearch(sanitizedValue);
    },
    [setSearch]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    handleKeyPress({ key: "Enter" });
  };

  const toggleDialog = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const placeholders = [
    "Fredrikstad",
    "Simen Brenne",
    "2009",
    "Mjøndalen",
    "Bo Andersen",
  ];

  return (
    <>
      {/* Desktop Search */}
      <div className="relative hidden sm:block">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleSearchChange}
          onSubmit={onSubmit}
        />
      </div>

      {/* Mobile Search */}
      <div className="sm:hidden">
        <IconButton onClick={toggleDialog} aria-label="Open search">
          <MobileSearchIconStyled />
        </IconButton>
      </div>

      {/* Dialog for Mobile */}
      <DialogStyled open={open} onClose={toggleDialog}>
        <DialogContentStyled>
          <IconButton onClick={toggleDialog} aria-label="Close search">
            <CloseIcon />
          </IconButton>
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleSearchChange}
            onSubmit={onSubmit}
          />
        </DialogContentStyled>
      </DialogStyled>
    </>
  );
};

export default SearchBar;
