import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress, makeStyles, Card, CardMedia, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import AddNewPlayer from '../Players/Player/AddNewPlayer'
import Player from './Player/Player'; // Importera Player-komponenten
import useStyles from './styles';
import { useAuth } from '../Auth/AuthContext';

const Players = () => {
  const { isLoading, players } = useSelector((state) => state.players);
  const classes = useStyles(); // Använd det befintliga useStyles här
  const [openDialog, setOpenDialog] = useState(false);
  const { searchQuery } = useLocation();
  const isAuthenticated = useAuth().isAuthenticated;

  useEffect(() => {
    // Hämta kategori och subkategori från URL-query
    const [category, subCategory] = searchQuery ? decodeURIComponent(searchQuery).split(',') : ['', ''];
    
 /*   if (category && subCategory) {
      console.log("i if-statement")
      // Ladda spelare baserat på den aktuella kategorin och subkategorin
      const sortedPlayers = players.filter((player) => player.category === category && player.subCategory === subCategory);
      console.log(players)
      setFilteredPlayers(players)
    } else {
      // Ladda alla spelare om kategori och subkategori saknas
      setFilteredPlayers(players);
    } */
  }, [searchQuery]); 

  const handleOpenDialog = () => {
    if (isAuthenticated) {
      console.log("handle open ", isAuthenticated)
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (!players.length && !!isLoading)
    return "Sorry, but there are no players in this category";

  return (
    isLoading ? <CircularProgress /> : (
      <Grid container alignItems="stretch" spacing={3}>
        {/* Visa befintliga spelare */}
        {players.map((player, index) => (
          <Grid key={player._id} item xs={12} sm={6} md={4}>
            <Player player={player} />
          </Grid>
        ))}

        {/* Lägg till knappen för att lägga till ny spelare i sista kortet */}
        {isAuthenticated && (
        <AddNewPlayer
          handleOpenDialog={handleOpenDialog}
          handleCloseDialog={handleCloseDialog}
          openDialog={openDialog}
        />
      )}    
      </Grid>
    )
  );
};

export default Players;