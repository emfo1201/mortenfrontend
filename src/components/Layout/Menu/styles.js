import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

// Styled button component
export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.primary.light,
  transition: "background-color 0.3s",
  "&:focus": {
    backgroundColor: theme.palette.primary.light,
    outline: "none",
  },
  "&:active": {
    backgroundColor: theme.palette.primary.main,
  },
}));

// Styled head menu container
export const MainMenuContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexFlow: "column wrap",
  maxHeight: 500,
  overflow: "auto",
}));

// Styled head menu item
export const MainMenuItem = styled("div")(({ theme }) => ({
  fontSize: "1rem",
  paddingTop: 1,
  paddingBottom: 1,
}));

// Styled sub menu item
export const SubMenuItem = styled("div")(({ theme }) => ({
  fontSize: "0.2rem",
  color: "#264554",
  paddingTop: 1,
  paddingBottom: 1,
  paddingLeft: theme.spacing(3),
}));

// Styled button for adding a category
export const AddCategoryButton = styled(Button)(({ theme }) => ({
  paddingTop: 2,
  paddingBottom: 1,
  paddingLeft: theme.spacing(3),
}));

// Styled close button for menu
export const CloseMenuButton = styled(Button)(({ theme }) => ({
  alignSelf: "flex-start",
  margin: theme.spacing(2),
}));
