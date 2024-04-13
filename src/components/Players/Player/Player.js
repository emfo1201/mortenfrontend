import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';
import DeleteIcon from '@mui/material/Delete';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom'
import { deletePlayer } from '../../../actions/players'
import ScrollDialog from '../../../components/dialog'
import AddPlayer from '../../Admin/AddPlayer/Player'

import useStyles from './styles';

const Player = ({ player }) => {
    const dispatch = useDispatch()
    const history = useNavigate()
    const classes = useStyles()
    const { searchParams } = useLocation()


    console.log("params " + searchParams)

    const openPlayer = () => {
        history(`/players/${player._id}`, { redirect: true })
    }

    return (
        <Card className={classes.card} raised elevation={6}>
            <ButtonBase
                component="span"
                className={classes.cardAction}
                onClick={openPlayer}
            >
                <CardMedia className={classes.media} image={`http://localhost:5000/static/${player.images[0]}`} title={player.name} />

                <div className={classes.overlay}>
                    <Typography variant="h6">{player.name}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant="h5" component="h2">{player.club}</Typography>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <ScrollDialog title="Update Player">
                    <AddPlayer currentPlayer={player._id} />
                </ScrollDialog>
                <Button size="small" color="secondary" onClick={() => dispatch(deletePlayer(player._id))}>
                    <DeleteIcon fontSize="small" /> &nbsp; Delete
                </Button>
            </CardActions>
        </Card>
    );
};

export default Player;