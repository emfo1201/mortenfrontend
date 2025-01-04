import { styled } from "@mui/system";
import { Paper, CardMedia, Dialog, IconButton, Box } from "@mui/material";

export const CircularPaper = styled(Paper)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  borderRadius: "15px",
  height: "39vh",
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 0,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(2),
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "column",
  paddingTop: theme.spacing(2),
  [theme.breakpoints.down("md")]: {
    flexDirection: "row", // Horizontal layout on medium screens
    justifyContent: "center",
  },
  [theme.breakpoints.up("md")]: {
    flexDirection: "row", // Horizontal layout on medium screens
    justifyContent: "center",
  },
}));

export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  objectFit: "cover",
  maxWidth: 300,
  [theme.breakpoints.down("sm")]: {
    order: 1, // Put first on small screens
  },
}));

export const StyledImageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column", // Standard: vertical layout
  width: "100%",
  overflowY: "auto",
  paddingRight: 16,
  [theme.breakpoints.down("md")]: {
    flexDirection: "row", // Horizontal layout on medium screens
    overflowX: "auto",
    overflowY: "hidden",
    gap: "2px",
    width: "100%",
    height: "40%",
    maxHeight: "150px",
    justifyContent: "center",
    paddingTop: theme.spacing(1),
    margin: "0",
    order: 2,
  },
  [theme.breakpoints.up("md")]: {
    height: "auto",
    maxHeight: "350px",
    maxWidth: "200px",
  },
}));

export const StyledImage = styled("img")(({ theme }) => ({
  width: "100%",
  objectFit: "cover",
  objectPosition: "center",
  paddingBottom: theme.spacing(1),
  opacity: 0.5,
  transition: "opacity 0.3s ease",
  cursor: "pointer",
  [theme.breakpoints.down("sm")]: {
    paddingTop: theme.spacing(1),
    margin: "0 4px",
    width: "45%",
  },
  "&:hover": {
    opacity: 1,
  },

  [theme.breakpoints.up("sm")]: {
    height: "40%",
    maxHeight: "350px",
    maxWidth: "200px",
  },
}));

export const StyledTextContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginLeft: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    order: 3, // Move to the bottom on small screens
    width: "100%",
    marginTop: theme.spacing(2),
    marginLeft: 0,
  },
  [theme.breakpoints.down("md")]: {
    order: 2, // Move under images on medium screens
    width: "100%",
    marginTop: theme.spacing(2),
    marginLeft: 0,
  },
}));

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    width: "30%",
    height: "auto",
    maxWidth: "none",
    margin: 0,
    padding: 0,
    border: "none",
    objectFit: "contain",
  },
}));

export const StyledDialogContent = styled("div")(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  overflow: "hidden",
}));

export const StyledIconButtonClose = styled(IconButton)(() => ({
  position: "absolute",
  top: 10,
  right: 10,
  zIndex: 10,
}));

export const StyledIconButtonRight = styled(IconButton)(() => ({
  position: "absolute",
  right: 10,
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
}));

export const StyledIconButtonLeft = styled(IconButton)(() => ({
  position: "absolute",
  left: 10,
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 10,
}));
