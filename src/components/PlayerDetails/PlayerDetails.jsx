import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  useTheme,
  useMediaQuery,
  Dialog,
  IconButton,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPlayerById } from "../../actions/players";
import useStyles from "./styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CloseIcon from "@material-ui/icons/Close";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Player = () => {
  const { player, isLoading } = useSelector((state) => state.players);
  const [open, setOpen] = useState(false);
  const [cardImageIndex, setCardImageIndex] = useState(0);
  const [dialogImageIndex, setDialogImageIndex] = useState(0);
  const { i18n } = useTranslation();
  const swiperRef = useRef(null);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  const handleImageClick = useCallback((index) => {
    setCardImageIndex(index);
  }, []);

  const handleNextImage = useCallback(() => {
    swiperRef.current?.swiper?.slideNext();
  }, []);

  const handlePreviousImage = useCallback(() => {
    swiperRef.current?.swiper?.slidePrev();
  }, []);

  const handleSlideChange = useCallback((swiper) => {
    setDialogImageIndex(swiper.activeIndex);
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" || event.key === " ") {
        handleImageClick(event.currentTarget.dataset.index);
      }
    },
    [handleImageClick]
  );

  const renderImageListItem = useCallback(
    (item, index) => (
      <ImageListItem
        key={item}
        cols={1}
        role="listitem"
        onClick={() => handleImageClick(index)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label={`Main image of ${player.name}`}
        data-index={index}
        className={classes.imageListItem}
      >
        <img src={item} alt={`image-${index}`} />
      </ImageListItem>
    ),
    [handleImageClick, handleKeyDown, player.name, classes.imageListItem]
  );

  if (!player) {
    return null;
  }

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const playerInfo =
    i18n.language === "no" ? player.infoNorwegian : player.infoEnglish;

  return (
    <Paper className={classes.paper} elevation={6}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <IconButton onClick={handlePreviousImage} aria-label="Previous image">
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={handleNextImage} aria-label="Next image">
          <ArrowForwardIcon fontSize="large" />
        </IconButton>
      </div>
      <div className={classes.card}>
        <div>
          <ImageList rowHeight={160} className={classes.imageList1} cols={1}>
            {player.images.map((item, index) =>
              index !== cardImageIndex ? renderImageListItem(item, index) : null
            )}
          </ImageList>
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={player.images[cardImageIndex]}
            alt={player.name}
            onClick={() => handleClickOpen(cardImageIndex)}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`Enlarge image of ${player.name}`}
          />
        </div>
        <div className={classes.section}>
          <Typography variant="h4" component="h4">
            {player.name}
          </Typography>
          <Typography variant="h6" component="h4">
            {player.club}
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Typography gutterBottom variant="body1" component="p">
            {playerInfo}
          </Typography>
        </div>
      </div>
      <Divider style={{ margin: "20px 0" }} />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: isMobile ? "90%" : "40%",
            maxWidth: "none",
            height: "80%",
            maxHeight: "80%",
            margin: 0,
            padding: 0,
            border: "none",
          },
        }}
      >
        <div className={classes.swiperContainer}>
          <IconButton
            className={`${classes.iconButton} ${classes.closeIconButton}`}
            onClick={handleClose}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
          <Swiper
            ref={swiperRef}
            spaceBetween={0}
            slidesPerView={1}
            initialSlide={dialogImageIndex}
            loop
            style={{ width: "100%", height: "100%" }}
            onSlideChange={handleSlideChange}
          >
            {player.images.map((item, index) => (
              <SwiperSlide key={item} className={classes.swiperSlide}>
                <img
                  src={item}
                  alt={`image-${index}`}
                  className={classes.swiperImage}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <IconButton
            className={`${classes.iconButton} ${classes.prevIconButton}`}
            onClick={handlePreviousImage}
            aria-label="Previous slide"
          >
            <ArrowBackIcon fontSize="large" />
          </IconButton>
          <IconButton
            className={`${classes.iconButton} ${classes.nextIconButton}`}
            onClick={handleNextImage}
            aria-label="Next slide"
          >
            <ArrowForwardIcon fontSize="large" />
          </IconButton>
        </div>
      </Dialog>
    </Paper>
  );
};

export default Player;
