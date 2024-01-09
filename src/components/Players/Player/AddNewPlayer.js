import React, { useState } from 'react';
import { Card, CardMedia, Dialog, DialogTitle, DialogContent, DialogActions, Grid, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import image from "../../../images/profile.png";
import useStyles from './styles';
import AddPlayer from '../../Admin/Player/AddPlayer';

const AddNewPlayer = ({ handleOpenDialog, handleCloseDialog, openDialog }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card} raised elevation={6}>
        <CardMedia
          className={classes.media}
          image={image} // Ersätt med sökväg till din bild
          title="Add New Player"
          onClick={handleOpenDialog} // Öppna dialogrutan när du klickar på bilden
        />
        <div className={classes.overlay} onClick={handleOpenDialog}>
          <Typography variant="h6">Add New Player</Typography>
        </div>
        {/* Dialogkomponent */}
        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
          <DialogTitle>
            <IconButton edge="end" color="inherit" onClick={handleCloseDialog} aria-label="close" className={classes.closeButton}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <AddPlayer />
          </DialogContent>
        </Dialog>
      </Card>
    </Grid>
  );
};

export default AddNewPlayer;
