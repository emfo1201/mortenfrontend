import { START_LOADING, END_LOADING, FETCH_PLAYERS, FETCH_PLAYERS_BY_SEARCH,
    FETCH_PLAYER_DETAILS, ADD_PLAYER, UPDATE_PLAYER, DELETE_PLAYER } from "../constants/actionTypes";

    const initialState = {
        isLoading: true,
        players: [], // Hela listan med spelare
        filteredPlayers: [], // Filtrerade eller sökta spelare
        currentPage: 1,
        numberOfPages: 1,
      };
      
      const playersReducer = (state = initialState, action) => {
        switch (action.type) {
          case START_LOADING:
            return { ...state, isLoading: true };
          case END_LOADING:
            return { ...state, isLoading: false };
          case FETCH_PLAYERS:
            console.log("fetch_players: ", action.payload.isLoading)
            return { ...state, players: action.payload };
          case FETCH_PLAYERS_BY_SEARCH:
            console.log("fetch: ", action.payload)
            return {
              ...state,
              filteredPlayers: action.payload.data,
              currentPage: action.payload.currentPage,
              numberOfPages: action.payload.numberOfPages,
              isLoading: false,
            };
          case FETCH_PLAYER_DETAILS:
            return { ...state, player: action.payload };
          case ADD_PLAYER:
            return { ...state, players: [...state.players, action.payload] };
          case UPDATE_PLAYER:
            return {
              ...state,
              players: state.players.map((player) => 
                player._id === action.payload._id ? action.payload : player
              ),
            };
          case DELETE_PLAYER:
            return {
              ...state,
              players: state.players.filter((player) => player._id !== action.payload),
            };
          default:
            return state;
        }
      };      

      export default playersReducer;