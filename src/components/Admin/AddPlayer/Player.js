import React, { useState, useEffect } from 'react';
import {TextField, Button, Typography, Paper, List} from '@mui/material';
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import {addPlayer, updatePlayer} from '../../../actions/players';
import Menu from "../../Menus/Menu/Menu";

const AddPlayer = ({currentPlayer}) => {

    const [playerData, setPlayerData] = useState({ name: '', club: '', infoEnglish: '', infoNorwegian: '',
        category: '', image: '' });
    const player = useSelector((state) => currentPlayer ? state.players.players.find((p) => p._id === currentPlayer) : null)
    const categories = useSelector((state) => state.menus)
    const subCategories = useSelector((state) => currentPlayer ? state.players.players.find((p) => p._id === currentPlayer) : null)
    const [selectedFiles, setSelectedFiles] = useState(undefined)
    const [category, setCategory] = React.useState('')
    const [subCategory, setSubCategory] = React.useState('')
    const [imagePreviews, setImagePreviews] = useState([])
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        console.log("player " + currentPlayer)
        if(player)
            setPlayerData(player)
    }, [player])

    const clear = () => {
        setPlayerData({ name: '', club: '', infoEnglish: '', infoNorwegian: '',
            category: '', image: '' })
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(currentPlayer) {
            dispatch(updatePlayer(currentPlayer, playerData))
        } else{
            dispatch(addPlayer(playerData))
        }
        clear()
    };

    const selectFiles = (e) => {
        let images = []

        for(let i = 0; i < e.target.files.length; i++) {
            images.push(URL.createObjectURL(e.target.files[i]))
        }

        setSelectedFiles(e.target.files)
        setPlayerData({ ...playerData, image: e.target.files })
        setImagePreviews(images)
    }

    const handleCategory = (event) => {
        setCategory(event.target.value);
    }

    const handleSubCategory = (event) => {
        setSubCategory(event.target.value);
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <TextField name="name" variant="outlined" label="Name" fullWidth value={playerData.name} onChange={(e) => setPlayerData({ ...playerData, name: e.target.value })} />
                <TextField name="club" variant="outlined" label="Club" fullWidth value={playerData.club} onChange={(e) => setPlayerData({ ...playerData, club: e.target.value })} />
                <TextField name="infoEnglish" variant="outlined" label="Info English" fullWidth multiline rows={4} value={playerData.infoEnglish} onChange={(e) => setPlayerData({ ...playerData, infoEnglish: e.target.value })} />
                <TextField name="infoNorwegian" variant="outlined" label="Info Norwegian" fullWidth multiline rows={4} value={playerData.infoNorwegian} onChange={(e) => setPlayerData({ ...playerData, infoNorwegian: e.target.value })} />
                <TextField name="category" variant="outlined" label="Category (coma separated)" fullWidth value={playerData.category} onChange={(e) => setPlayerData({ ...playerData, category: e.target.value.split(',') })} />
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={category}
                        onChange={handleCategory}
                        label="Category"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {categories.map((menu, i) => (
                            <MenuItem value={i}>{menu.mainMenu}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Sub category</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={subCategory}
                        onChange={handleSubCategory}
                        label="Age"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {subCategories.map((menu, i) => (
                            <MenuItem value={i}>{menu.mainMenu}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <div className="row">
                    <div className="col-8">
                        <label className="btn btn-default p-0">
                            <input className={classes.fileInput}
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={selectFiles}
                            />
                        </label>
                    </div>
                </div>
                <ImageList rowHeight={160} className={classes.imageList} cols={3}>
                    {imagePreviews.map((item, i) => (
                        <ImageListItem key={i} cols={1}>
                            <img src={item} alt={"image-" + i} />
                        </ImageListItem>

                    ))}
                </ImageList>

                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
};

export default AddPlayer;