import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Typography,
  CircularProgress,
  CardMedia,
  Divider,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  CircularPaper,
  StyledPaper,
  StyledCardMedia,
  StyledImageContainer,
  StyledImage,
  StyledDialog,
  StyledDialogContent,
  StyledIconButtonClose,
  StyledIconButtonRight,
  StyledIconButtonLeft,
} from "./styles";
import { useTranslation } from "react-i18next";
import { getPlayerById } from "../../actions/players";

const Player = () => {
  const { player, isLoading } = useSelector((state) => state.players);
  const [open, setOpen] = useState(false);
  const [cardImageIndex, setCardImageIndex] = useState(0);
  const [dialogImageIndex, setDialogImageIndex] = useState(0);
  const swiperRef = useRef(null);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPlayerById(id));
  }, [dispatch, id]);

  const handleClickOpen = useCallback((index) => {
    setDialogImageIndex(index);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleNextImage = useCallback(() => {
    swiperRef.current?.swiper?.slideNext();
  }, []);

  const handlePreviousImage = useCallback(() => {
    swiperRef.current?.swiper?.slidePrev();
  }, []);

  const playerInfo = player
    ? i18n.language === "no"
      ? player.infoNorwegian
      : player.infoEnglish
    : "";

  if (!player) {
    return null;
  }

  if (isLoading) {
    return (
      <CircularPaper elevation={6}>
        <CircularProgress size="7em" />
      </CircularPaper>
    );
  }

  return (
    <StyledPaper>
      <Box display="flex" justifyContent="space-between" width="100%">
        <ArrowBackIcon />
        <ArrowForwardIcon />
      </Box>
      <Box display="flex" flexWrap={{ xs: "wrap", sm: "nowrap" }} pt={2}>
        <StyledImageContainer>
          {player.images.map(
            (item, index) =>
              index !== cardImageIndex && (
                <StyledImage
                  key={item}
                  src={item}
                  alt={`image-${index}`}
                  onClick={() => setCardImageIndex(index)}
                />
              )
          )}
        </StyledImageContainer>
        <Box mx={2}>
          <StyledCardMedia
            component="img"
            height="400"
            image={player.images[cardImageIndex]}
            alt={player.name}
            onClick={() => handleClickOpen(cardImageIndex)}
          />
        </Box>
        <Box flex={1} mx={2}>
          <Typography variant="h4">{player.name}</Typography>
          <Typography variant="h6">{player.club}</Typography>
          <Divider sx={{ marginY: 2 }} />
          <Typography gutterBottom variant="body1">
            {playerInfo || "Ingen information tillgänglig"}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ marginY: 2 }} />
      <StyledDialog open={open} onClose={handleClose}>
        <StyledDialogContent>
          <StyledIconButtonClose onClick={handleClose}>
            <CloseIcon />
          </StyledIconButtonClose>
          <Swiper
            ref={swiperRef}
            spaceBetween={0}
            slidesPerView={1}
            initialSlide={dialogImageIndex}
            loop
            style={{ width: "100%", height: "100%" }}
          >
            {player.images.map((item, index) => (
              <SwiperSlide key={item}>
                <img
                  src={item}
                  alt={`image-${index}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <StyledIconButtonLeft onClick={handlePreviousImage}>
            <ArrowBackIcon fontSize="large" />
          </StyledIconButtonLeft>
          <StyledIconButtonRight onClick={handleNextImage}>
            <ArrowForwardIcon fontSize="large" />
          </StyledIconButtonRight>
        </StyledDialogContent>
      </StyledDialog>
    </StyledPaper>
  );
};

export default Player;
