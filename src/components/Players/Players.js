//Players.js
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import AddNewPlayer from "./Player/AddNewPlayer";
import Player from "./Player/Player";
import Paginate from "../Pagination/Pagination";
import useStyles from "./styles";
import { useAuth } from "../Auth/AuthContext";

function useQuery() {
  const location = useLocation();

  return useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params;
  }, [location.search]);
}

const Players = () => {
  const { isLoading, filteredPlayers } = useSelector((state) => state.players);
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const isAuthenticated = useAuth().isAuthenticated;
  const query = useQuery();
  const page = query.get("page") || 1;

  useEffect(() => {
    console.log("isLoading: ", isLoading);
    console.log("filteredPlayers: ", filteredPlayers);
  }, [filteredPlayers, isLoading]);

  const handleOpenDialog = useCallback(() => {
    if (isAuthenticated) {
      setOpenDialog(true);
    }
  }, [isAuthenticated]);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false);
  }, []);

  return isLoading || !filteredPlayers ? (
    <CircularProgress />
  ) : (
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
  );
};

export default Players;
