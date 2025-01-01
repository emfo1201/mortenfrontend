import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";

// Root-styling för Header
export const Root = styled("div")(({ theme }) => ({
  flexGrow: 1,
  position: "relative",
  zIndex: 1000,
}));

// AppBar-styling med dynamisk bakgrundsfärg
export const AppBarStyled = styled(AppBar)(({ location }) => ({
  backgroundColor: location.pathname === "/" ? "transparent" : "black",
  transition: "background-color 0.3s ease",
}));

// Toolbar-styling med flexbox
export const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

// Wrapper för SearchBar och LanguageToggle
export const SearchLanguageWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "16px", // Mellanrum mellan SearchBar och LanguageToggle
});

export const SearchWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "transparent", // Transparent bakgrund
  borderRadius: "4px",
  padding: "2px 8px",
  border: `1px solid ${theme.palette.divider}`, // Lägg till en kantlinje om det behövs
}));

export const SearchIconWrapper = styled("div")({
  padding: "8px",
});

export const SearchInput = styled(InputBase)(({ theme }) => ({
  marginLeft: "8px",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: "8px",
    borderRadius: "4px",
    backgroundColor: theme.palette.background.default,
  },
}));
