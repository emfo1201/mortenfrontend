import React, { useState, useEffect, useRef } from 'react';
import { Paper, Typography, CircularProgress, Divider, useTheme, useMediaQuery, Dialog, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPlayerById } from "../../actions/players";
import useStyles from './styles';
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

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
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 

    // Fetch player data when component mounts or when 'id' changes
    useEffect(() => {
        dispatch(getPlayerById(id));
    }, [dispatch, id]);

    // Open image dialog and set the current image index
    const handleClickOpen = (index) => {
        setDialogImageIndex(index);
        setOpen(true);
    };

    // Close image dialog
    const handleClose = () => {
        setOpen(false);
    };

    // Change the main displayed image in the card view
    const handleImageClick = (index) => {
        setCardImageIndex(index);
    };

    // Go to the next image in the Swiper component
    const handleNextImage = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };

    // Go to the previous image in the Swiper component
    const handlePreviousImage = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    // If no player data is available, return null
    if (!player) {
        return null;
    }

    // Show a loading spinner while data is being fetched
    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        );
    }

    // Determine which language-specific player info to display
    const playerInfo = player ? (i18n.language === 'no' ? player.infoNorwegian : player.infoEnglish) : '';

    return (
        <Paper className={classes.paper} elevation={6}>
            <div style={{ display: 'flex', justifyContent: "space-between", width: '100%' }}>
                <ArrowBackIcon />
                <ArrowForwardIcon />
            </div>
            <div className={classes.card}>
                <div>
                    <ImageList rowHeight={160} className={classes.imageList1} cols={1}>
                        {player.images
                            .map((item, index) => (
                                index !== cardImageIndex && (
                                    <ImageListItem key={item} cols={1} onClick={() => handleImageClick(index)} className={classes.imageListItem}>
                                        <img src={item} alt={`image-${index}`} />
                                    </ImageListItem>
                                )
                            ))}
                    </ImageList>
                </div>
                <div className={classes.imageSection}>
                    <img
                        className={classes.media}
                        src={player.images[cardImageIndex]}
                        alt={player.name}
                        onClick={() => handleClickOpen(cardImageIndex)}
                    />
                </div>
                <div className={classes.section}>
                    <Typography variant="h4" component="h4">{player.name}</Typography>
                    <Typography variant="h6" component="h4">{player.club}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography gutterBottom variant="body1" component="p">{playerInfo}</Typography>
                </div>
            </div>
            <Divider style={{ margin: '20px 0' }} />
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        width: isMobile ? '90%' : '40%',
                        maxWidth: 'none',
                        height: '80%',
                        maxHeight: '80%',
                        margin: 0,
                        padding: 0,
                        border: 'none',
                    },
                }}
            >
                <div className={classes.swiperContainer}>
                    <IconButton
                        className={`${classes.iconButton} ${classes.closeIconButton}`}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Swiper
                        ref={swiperRef}
                        spaceBetween={0}
                        slidesPerView={1}
                        initialSlide={dialogImageIndex}
                        loop={true}
                        style={{ width: '100%', height: '100%' }}
                        onSlideChange={(swiper) => setDialogImageIndex(swiper.activeIndex)}
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
                    >
                        <ArrowBackIcon fontSize="large" />
                    </IconButton>
                    <IconButton
                        className={`${classes.iconButton} ${classes.nextIconButton}`}
                        onClick={handleNextImage}
                    >
                        <ArrowForwardIcon fontSize="large" />
                    </IconButton>
                </div>
            </Dialog>
        </Paper>
    );        
};

export default Player;