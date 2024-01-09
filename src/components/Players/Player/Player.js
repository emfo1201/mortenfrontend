import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import ScrollDialog from '../../../components/dialog';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom'
import { deletePlayer } from '../../../actions/players'
import UpdatePlayer from '../../Admin/Player/UpdatePlayer';

import useStyles from './styles';

const Player = ({ player }) => {
    const dispatch = useDispatch()
    const history = useNavigate()
    const classes = useStyles()
    const { searchParams } = useLocation()

    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDeletePlayer = () => {
        console.log("spelare: ", player._id)
        dispatch(deletePlayer(player._id));
        setOpenDialog(false); // Stänger dialogen efter borttagning
    };

    const openPlayer = () => {
        console.log("spelare: ", player._id)
        history(`/players/${player._id}`, { redirect: true })
    }

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase
                component="span"
                className={classes.cardAction}
                onClick={openPlayer}
            >
                <CardMedia className={classes.media} image={`http://localhost:5000/images/${player.images[0]}`} title={player.name} />

                <div className={classes.overlay}>
                    <Typography variant="h6">{player.name}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant="h5" component="h2">{player.club}</Typography>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                {/* Öppna dialogen när "Update" klickas */}
                <ScrollDialog title="Update Player">
                    <UpdatePlayer player={player} /> {/* Skicka spelaren till UpdatePlayer */}
                </ScrollDialog>
                <Button size="small" color="secondary" onClick={handleOpenDialog}>
                    <DeleteIcon fontSize="small" /> &nbsp; Delete
                </Button>
            </CardActions>

            {/* Dialogkomponent */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete {player.name}?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeletePlayer} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default Player;