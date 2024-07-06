import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import AddNewPlayer from '../Players/Player/AddNewPlayer';
import Player from './Player/Player';
import useStyles from './styles';
import { useAuth } from '../Auth/AuthContext';

const Players = () => {
  const { isLoading, players } = useSelector((state) => state.players);
  const classes = useStyles();
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [redirected, setRedirected] = useState(false); // Ny tillståndsvariabel för att spåra om en omdirigering redan har skett
  const { search } = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  const isAuthenticated = useAuth().isAuthenticated;
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const searchQuery = params.get('searchQuery');

    if (searchQuery) {
      const [category, subCategory] = searchQuery.split(',');
      const filtered = players.filter(player => player.category.includes(category) && player.subCategory.includes(subCategory));
      setFilteredPlayers(filtered);

      // Om inga matchande spelare hittades, gör en omdirigering till 404-sidan
      if (filtered.length === 0 && !redirected && !isAuthenticated) {
        setRedirected(true); // Ställ in redirected till true för att undvika ytterligare omdirigeringar
        navigate('/404');
      }
    } else {
      // Om sökfrågan inte finns, visa alla spelare
      setFilteredPlayers(players);
    }
  }, [search, players, navigate, redirected]);

  if (isLoading) {
    return <CircularProgress />;
  }

  const handleOpenDialog = () => {
    if (isAuthenticated) {
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Grid container alignItems="stretch" spacing={3} className={classes.root}>
      {filteredPlayers.map((player) => (
        <Grid key={player._id} item xs={12} sm={6} md={4}>
          <Player player={player} />
        </Grid>
      ))}
      {isAuthenticated && (
        <AddNewPlayer
        handleOpenDialog={handleOpenDialog}
        handleCloseDialog={handleCloseDialog}
        openDialog={openDialog}
      />
      )}
    </Grid>
  );
};

export default Players;