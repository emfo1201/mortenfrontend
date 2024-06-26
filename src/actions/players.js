import * as api from '../api'
import { START_LOADING, END_LOADING, FETCH_PLAYERS, FETCH_PLAYER, FETCH_PLAYER_DETAILS, DELETE_PLAYER } from "../constants/actionTypes";

export const getPlayer = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.getPlayer()
        dispatch({ type: FETCH_PLAYER, payload: data })
        dispatch({ type: END_LOADING })
    } catch(error) {
        console.log(error.message)
    }
}

export const getPlayers = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data: { data } } = await api.getPlayers(searchQuery)

        dispatch({ type: FETCH_PLAYERS, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error);
    }
}

export const getPlayerById = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.getPlayerById(id)
        dispatch({ type: FETCH_PLAYER_DETAILS, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(error);
    }
}

export const addPlayer = (player) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.addPlayer(player)
        dispatch({ type: 'ADD_PLAYER', payload: data })
        dispatch({ type: END_LOADING })
    } catch(error) {
        console.log(error.message)
    }
}

export const updatePlayer = (id, player) => async (dispatch) => {
    try {
        const { data } = await api.updatePlayer(id, player)
        dispatch({ type: 'UPDATE_PLAYER', payload: data })
    } catch(error) {
        console.log(error.message)
    }
}

export const deletePlayer = (id) => async (dispatch) => {
    try {
        await await api.deletePlayer(id);

        dispatch({ type: DELETE_PLAYER, payload: id });
    } catch (error) {
        console.log(error);
    }
}