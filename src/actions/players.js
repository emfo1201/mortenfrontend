import * as api from '../api';
import { START_LOADING, END_LOADING, FETCH_PLAYERS, FETCH_PLAYERS_BY_SEARCH, FETCH_PLAYER_DETAILS, DELETE_PLAYER, ADD_PLAYER, UPDATE_PLAYER } from "../constants/actionTypes";

// Fetch a single player and update state
export const getPlayer = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.getPlayer();
        dispatch({ type: FETCH_PLAYERS, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
};

// Fetch players based on key and pagination, then update state
export const getPlayers = (key, page) => async (dispatch) => {
    try {
        const { data } = await api.getPlayers({ key, page });
        dispatch({ type: FETCH_PLAYERS_BY_SEARCH, payload: data });
    } catch (error) {
        console.log(error);
    }
};

// Fetch player details by ID and update state
export const getPlayerById = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.getPlayerById(id);
        dispatch({ type: FETCH_PLAYER_DETAILS, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

// Search players based on query and pagination, then update state
export const getPlayersBySearch = (searchQuery, page) => async (dispatch) => {
    try {
        const { data } = await api.getPlayersBySearch({ searchQuery, page });
        dispatch({ type: FETCH_PLAYERS_BY_SEARCH, payload: data });
    } catch (error) {
        console.log(error);
    }
};

// Add a new player and update state
export const addPlayer = (player) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.addPlayer(player);
        dispatch({ type: ADD_PLAYER, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
};

// Update an existing player and update state
export const updatePlayer = (id, player) => async (dispatch) => {
    try {
        const { data } = await api.updatePlayer(id, player);
        dispatch({ type: UPDATE_PLAYER, payload: data });
    } catch (error) {
        console.log(error.message);
    }
};

// Delete a player by ID and update state
export const deletePlayer = (id) => async (dispatch) => {
    try {
        await api.deletePlayer(id);
        dispatch({ type: DELETE_PLAYER, payload: id });
    } catch (error) {
        console.log(error);
    }
};