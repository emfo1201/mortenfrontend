import React from 'react';
import { Card, CardMedia, Grid, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import image from "../../../images/profile.png";
import useStyles from './styles';
import ScrollDialog from '../../dialog';
import PlayerForm from '../../Admin/Player/PlayerForm';
import { addPlayer } from '../../../actions/players';

const AddNewPlayer = ({ handleOpenDialog, handleCloseDialog, openDialog }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSubmit = (updatedPlayerData) => {
    const data = new FormData();

    // Add player information to FormData
    data.append('name', updatedPlayerData.name);
    data.append('club', updatedPlayerData.club);
    data.append('infoEnglish', updatedPlayerData.infoEnglish);
    data.append('infoNorwegian', updatedPlayerData.infoNorwegian);

    // Handle categories
    let categoriesToSend = [];

  if (updatedPlayerData.category) {
    // Om det finns en kategori, oavsett om det är en sträng eller en array, gör det till en array
    if (Array.isArray(updatedPlayerData.category)) {
      // Om det är en array, använd den direkt
      categoriesToSend = updatedPlayerData.category;
    } else {
      // Annars, skapa en array med det enskilda värdet
      categoriesToSend = [updatedPlayerData.category];
    }
  }

  // Omvandla kategorier till det format du behöver och lägg till i FormData
  const selectedCategoriesToSend = categoriesToSend.map((subCategory) => ({
    main: subCategory.main,
    sub: subCategory.sub,
  }));
    
    console.log("selectedCategoriesToSend:", selectedCategoriesToSend);
    
    data.append('categories', JSON.stringify(selectedCategoriesToSend));
    

    // Add images
    updatedPlayerData.images.forEach((image, index) => {
      data.append(`images`, image);
    });

    // Dispatch addPlayer with FormData
    dispatch(addPlayer(data));
  };  

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card} raised elevation={6}>
        <CardMedia
          className={classes.media}
          image={image}
          title="Add New Player"
          onClick={handleOpenDialog}
        />
        <div className={classes.overlay} onClick={handleOpenDialog}>
          <Typography variant="h6">Add New Player</Typography>
        </div>
        <ScrollDialog title="Add New Player" open={openDialog} onClose={handleCloseDialog}>
                    <PlayerForm handleSubmit={handleSubmit} handleCloseUpdatePlayer={handleCloseDialog} />
                </ScrollDialog>
      </Card>
    </Grid>
  );
};

export default AddNewPlayer;