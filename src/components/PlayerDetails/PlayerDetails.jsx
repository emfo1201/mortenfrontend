import React, { useEffect } from 'react'
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { getPlayerById } from "../../actions/players"
import useStyles from './styles'
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem"
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";

const Player = () => {
    const { player, players, isLoading } = useSelector((state) => state.players)
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('body');
   // const [searchParams, setSearchParams] = useSearchParams() (use in update for react-router-dom v6)
    const dispatch = useDispatch()
    const history = useNavigate()
    const classes = useStyles()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getPlayerById(id))
    }, [id])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open])

    if (!player) {
        console.log("no player")
        return null }

    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        )
    }

    return (
        <Paper style={{ padding: '10px', borderRadius: '10px' }} elevation={6}>
            <div style={{ display: 'flex', justifyContent: "space-between", width: '100%'}}>
                <ArrowBackIcon/>
                <ArrowForwardIcon/>
            </div>
            <div className={classes.card}>
                <div>
                    <ImageList rowHeight={160} className={classes.imageList1} cols={1}>
                        {player.images.map((item) => (
                            <ImageListItem key={item} cols={1}>
                                <img src={`http://localhost:5000/images/${item}`} alt={item._id} />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={`http://localhost:5000/images/${player.images[0]}` || "http://localhost:5000/images/1627834412100--brad.jpg"} alt={player.name}
                    onClick={handleClickOpen}/>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        scroll={scroll}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                    >
                        <DialogContent dividers={scroll === 'paper'}>
                            <img src={`http://localhost:5000/images/${player.images[0]}` || "http://localhost:5000/images/1627834412100--brad.jpg"} alt={player.name}/>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className={classes.section}>
                    <Typography variant="h4" component="h4">{player.name}</Typography>
                    <Typography variant="h6" component="h4">{player.club}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography gutterBottom variant="body1" component="p">{player.infoNorwegian}</Typography>
                </div>
            </div>
            <Divider style={{ margin: '20px 0' }} />
            <div>
                <ImageList className={classes.imageList} cols={2.5}>
                    { player.images.map((item) => (
                        <ImageListItem key={item}>
                            <img src={`http://localhost:5000/images/${item}`} alt={item._id} />
                        </ImageListItem>
                    ))}
                </ImageList>


            </div>
        </Paper>
    )
};

export default Player