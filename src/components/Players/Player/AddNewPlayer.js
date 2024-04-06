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

      // Lägg till spelarinformation i FormData
      data.append('name', updatedPlayerData.name);
      data.append('club', updatedPlayerData.club);
      data.append('infoEnglish', updatedPlayerData.infoEnglish);
      data.append('infoNorwegian', updatedPlayerData.infoNorwegian);

      if (Array.isArray(updatedPlayerData.category)) {
        // Konvertera till en array och skapa en ny array med omformade element
        const selectedCategoriesToSend = Array.from(updatedPlayerData.category).map((subCategory) => ({
          main: subCategory.main,
          sub: subCategory.sub,
        }));
      
        data.append('categories', JSON.stringify(selectedCategoriesToSend));
      } else {
        console.error('updatedPlayerData.category är inte en array.');
      }

      updatedPlayerData.images.forEach((image, index) => {
          data.append(`images`, image);
      });

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
