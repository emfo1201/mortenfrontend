import React, {useEffect} from 'react';
import { Grid, CircularProgress } from '@mui/material';
import {shallowEqual, useSelector} from 'react-redux';

import Player from './Player/Player';
import useStyles from './styles';

const Players = () => {
    const { isLoading, players } = useSelector((state) => state.players)
    const classes = useStyles()

    if(!players.length && !isLoading)
        return "Sorry, but there is no players in this category"

    return (
           isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {players.map((player) => (
                    <Grid key={player._id} item xs={12} sm={6} md={4}>
                        <Player player={player} />
                    </Grid>
                ))}
            </Grid>
        )
    )
}

export default Players;