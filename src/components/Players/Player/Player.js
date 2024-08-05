import React, { useState } from 'react';
import { Card, CardActions, CardMedia, Button, Typography, ButtonBase, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import ScrollDialog from '../../../components/dialog';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { deletePlayer, updatePlayer } from '../../../actions/players'
import PlayerForm from '../../Admin/Player/PlayerForm';
import { useAuth } from '../../Auth/AuthContext';

import useStyles from './styles';

const Player = ({ player }) => {
    const dispatch = useDispatch()
    const history = useNavigate()
    const classes = useStyles()
    const { isAuthenticated } = useAuth();

    const [openDialog, setOpenDialog] = useState(false);
    const [openUpdatePlayer, setOpenUpdatePlayer] = useState(false);

    const handleOpenUpdatePlayer = () => {
        setOpenUpdatePlayer(true);
    };

    const handleCloseUpdatePlayer = () => {
        setOpenUpdatePlayer(false);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDeletePlayer = () => {
        dispatch(deletePlayer(player._id));
        setOpenDialog(false);
    };

    const openPlayer = () => {
        console.log("player: ", player)
        history(`/players/${player._id}`, { redirect: true })
    }

    const handleSubmit = (updatedPlayerData) => {
        const data = new FormData();

        console.log("updatedPlayerData: ", updatedPlayerData)
  
        // Lägg till spelarinformation i FormData
        data.append('name', updatedPlayerData.name);
        data.append('club', updatedPlayerData.club);
        data.append('infoEnglish', updatedPlayerData.infoEnglish);
        data.append('infoNorwegian', updatedPlayerData.infoNorwegian);
        for (const categoryKey in updatedPlayerData.categories) {
            if (updatedPlayerData.categories.hasOwnProperty(categoryKey)) {
                const categoryValue = updatedPlayerData.categories[categoryKey];
                data.append(`categories[${categoryKey}]`, categoryValue);
            }
        }
        // Lägg till bilder i FormData
        updatedPlayerData.images.forEach((image, index) => {
            data.append(`images`, image);
        });
  
        console.log("data: ", data.get('categories'))
        // Skicka FormData till servern med hjälp av Redux dispatch
        dispatch(updatePlayer(player._id, data));
    }; 

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase
                component="span"
                className={classes.cardAction}
                onClick={openPlayer}
            >
                <CardMedia className={classes.media} image={`https://s3.amazonaws.com/norskfotballdraktmuseum/${player.images[0]}`} title={player.name} />

                <div className={classes.overlay}>
                    <Typography variant="h6">{player.club}</Typography>
                </div>
                <Typography className={classes.name} gutterBottom variant="h5" component="h2">{player.name}</Typography>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <ScrollDialog title="Update Player" open={openUpdatePlayer} onClose={handleCloseUpdatePlayer}>
                    <PlayerForm player={player} handleSubmit={handleSubmit} handleCloseUpdatePlayer={handleCloseUpdatePlayer} />
                </ScrollDialog>
                {isAuthenticated && (
                    <>
                        <Button size="small" color="primary" onClick={handleOpenUpdatePlayer}>
                            <UpdateIcon fontSize="small" /> &nbsp; Update
                        </Button>
                        <Button size="small" color="secondary" onClick={handleOpenDialog}>
                            <DeleteIcon fontSize="small" /> &nbsp; Delete
                        </Button>
                    </>
                )}
            </CardActions>

            {/* Dialogkomponent för delete player */}
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