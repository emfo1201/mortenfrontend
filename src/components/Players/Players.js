import React, { useEffect, useState, useMemo } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import AddNewPlayer from '../Players/Player/AddNewPlayer';
import Player from './Player/Player';
import Paginate from '../Pagination/Pagination';
import useStyles from './styles';
import { useAuth } from '../Auth/AuthContext';

function useQuery() {
  const location = useLocation();
  console.log("useQuery")
  
  // Använd useMemo för att bara skapa en ny URLSearchParams när location.search ändras
  return useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);
}

const Players = () => {
  const { isLoading, players } = useSelector((state) => state.players);
  const classes = useStyles();
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [redirected, setRedirected] = useState(false);
  const { search } = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  const isAuthenticated = useAuth().isAuthenticated;
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  useEffect(() => {
    console.log("IN PLAYERS!!!!")
    const params = new URLSearchParams(search);
    const searchQuery = params.get('searchQuery');
    const key = query.get('key'); // Om du har lagt till "key" i din query-string

    if (!isLoading && players.length > 0) {
        let filtered = players;

        // Filtrera baserat på kategori och underkategori
        if (searchQuery) {
            const [category, subCategory] = searchQuery.split(',');
            filtered = players.filter(player => 
                player.category.includes(category) && 
                player.subCategory.includes(subCategory)
            );
        } else if (key) {
            const categoryKey = key.split(',');
            filtered = players.filter(player =>
                player.category.some(cat =>
                    cat.main === categoryKey[0] && cat.sub === categoryKey[1]
                )
            );
        }

        // Endast uppdatera om filtreringen faktiskt ger ett nytt resultat
        if (JSON.stringify(filtered) !== JSON.stringify(filteredPlayers)) {
            setFilteredPlayers(filtered);
        }

        // Hantera omdirigering om inga spelare hittas
        if (filtered.length === 0 && !redirected && !isAuthenticated) {
            setRedirected(true);
            navigate('/404');
        }
    }
}, [search, query, players, isLoading, isAuthenticated, redirected, navigate]);

  const handleOpenDialog = () => {
    if (isAuthenticated) {
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    isLoading ? <CircularProgress /> : (
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
        <Grid item xs={12} container justifyContent="center">
          <Grid item xs={8} sm={6} md={4}>
            <Paginate page={page} searchParams={query} />
          </Grid>
        </Grid>
      </Grid>
    )
  );
};

export default Players;
