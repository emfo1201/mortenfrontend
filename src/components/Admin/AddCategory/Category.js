import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { addPlayer } from '../../../actions/players';

const Player = () => {

    const [menuData, setMenuData] = useState({ category: '', subCategory: '' });
    const dispatch = useDispatch();
    const classes = useStyles();

    const clear = () => {
        setMenuData({ category: '', subCategory: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(menuData)
        dispatch(addPlayer(menuData))
        clear();
    };

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">Add player</Typography>
                <TextField name="name" variant="outlined" label="Name" fullWidth value={playerData.name} onChange={(e) => setPlayerData({ ...playerData, name: e.target.value })} />
                <TextField name="club" variant="outlined" label="Club" fullWidth value={playerData.club} onChange={(e) => setPlayerData({ ...playerData, club: e.target.value })} />
                <TextField name="infoEnglish" variant="outlined" label="Info English" fullWidth multiline rows={4} value={playerData.infoEnglish} onChange={(e) => setPlayerData({ ...playerData, infoEnglish: e.target.value })} />
                <TextField name="infoNorwegian" variant="outlined" label="Info Norwegian" fullWidth multiline rows={4} value={playerData.infoNorwegian} onChange={(e) => setPlayerData({ ...playerData, infoNorwegian: e.target.value })} />
                <TextField name="category" variant="outlined" label="Category (coma separated)" fullWidth value={playerData.category} onChange={(e) => setPlayerData({ ...playerData, category: e.target.value.split(',') })} />

                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
};

export default Player;