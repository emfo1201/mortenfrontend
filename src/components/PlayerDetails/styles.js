import { styled } from "@mui/system";
import { Paper, CardMedia, Dialog, IconButton } from "@mui/material";

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
}));

export const StyledCardMedia = styled(CardMedia)(() => ({
  objectFit: "cover",
  maxWidth: 300,
}));

export const StyledImageContainer = styled("div")(() => ({
  width: 200,
  maxHeight: "500px",
  overflowY: "auto",
  paddingRight: 16,
}));

export const StyledImage = styled("img")(() => ({
  width: "100%",
  height: "40%",
  objectFit: "cover",
  objectPosition: "center",
  opacity: 0.5,
  transition: "opacity 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    opacity: 1,
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
    objectFit: "contain", // Förhindra beskärning av innehållet
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
