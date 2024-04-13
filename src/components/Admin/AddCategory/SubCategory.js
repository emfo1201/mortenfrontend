import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { addSubCategory } from '../../../actions/menu';

const SubCategory = () => {

    const [categoryData, setCategoryData] = useState({ category: '', subCategory: '' });
    const dispatch = useDispatch();
    const classes = useStyles();

    const clear = () => {
        setCategoryData({ category: '', subCategory: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(categoryData)
        dispatch(addSubCategory(categoryData))
        clear();
    };

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">Add sub category</Typography>
                <TextField name="name" variant="outlined" label="Name" fullWidth value={categoryData.name} onChange={(e) => setcategoryData({ ...playerData, name: e.target.value })} />
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

export default SubCategory;