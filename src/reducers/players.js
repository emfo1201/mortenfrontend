// reducers/players.js
import {
  START_LOADING,
  END_LOADING,
  FETCH_PLAYERS,
  FETCH_PLAYERS_BY_SEARCH,
  FETCH_PLAYER_DETAILS,
  ADD_PLAYER,
  UPDATE_PLAYER,
  DELETE_PLAYER,
} from "../constants/actionTypes";

// Initial state of the players reducer
const initialState = {
  isLoading: true, // Indicates if the data is currently being loaded
  players: [], // Complete list of players
  filteredPlayers: [], // List of players filtered by search or other criteria
  currentPage: 1, // Current page in pagination
  numberOfPages: 1, // Total number of pages available in pagination
};

const playersReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true }; // Set loading state to true
    case END_LOADING:
      return { ...state, isLoading: false }; // Set loading state to false
    case FETCH_PLAYERS:
      console.log("fetch_players: ", action.payload.isLoading);
      return { ...state, players: action.payload }; // Update state with the fetched players
    case FETCH_PLAYERS_BY_SEARCH:
      console.log("fetch: ", action.payload.data);
      return {
        ...state,
        filteredPlayers: action.payload.data, // Update state with filtered players
        currentPage: action.payload.currentPage, // Set current page
        numberOfPages: action.payload.numberOfPages, // Set total number of pages
        isLoading: false, // End loading state after fetching
      };
    case FETCH_PLAYER_DETAILS:
      return { ...state, player: action.payload }; // Set the selected player's details
    case ADD_PLAYER:
      const addedPlayers = [...state.players, action.payload];
      console.log("ADD_PLAYER: ", action.payload);
      return {
        ...state,
        players: addedPlayers, // Add the new player to the full list
        filteredPlayers: addedPlayers, // Reflect the addition in the filtered list as well
      };
    case UPDATE_PLAYER:
      const updatedPlayers = state.players.map((player) =>
        player._id === action.payload._id ? action.payload : player
      );
      const updatedFilteredPlayers = state.filteredPlayers.map((player) =>
        player._id === action.payload._id ? action.payload : player
      );
      return {
        ...state,
        players: updatedPlayers, // Update the player in the full list
        filteredPlayers: updatedFilteredPlayers, // Update the player in the filtered list
      };
    case DELETE_PLAYER:
      const remainingPlayers = state.players.filter(
        (player) => player._id !== action.payload
      );
      const remainingFilteredPlayers = state.filteredPlayers.filter(
        (player) => player._id !== action.payload
      );
      return {
        ...state,
        players: remainingPlayers, // Remove the player from the full list
        filteredPlayers: remainingFilteredPlayers, // Remove the player from the filtered list
      };
    default:
      return state; // Return the current state for any unknown action types
  }
};

export default playersReducer;
