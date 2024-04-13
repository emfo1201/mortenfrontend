import { START_LOADING, END_LOADING, FETCH_PLAYER, FETCH_PLAYERS,
    FETCH_PLAYER_DETAILS, ADD_PLAYER, UPDATE_PLAYER, DELETE_PLAYER } from "../constants/actionTypes";

export default (state = { loading: true, players: []}, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, loading: true }
        case END_LOADING:
            return { ...state, loading: false }
        case FETCH_PLAYER:
            return { ...state, players: action.payload }
        case FETCH_PLAYERS:
            return { ...state, players: action.payload }
        case FETCH_PLAYER_DETAILS:
            return { ...state, player: action.payload }
        case ADD_PLAYER:
            return { ...state, players: [...state.players, action.payload] }
        case UPDATE_PLAYER:
            return { ...state, players: state.players.map((player) => (player._id === action.payload._id ? action.payload : player)) }
        case DELETE_PLAYER:
            return { ...state, players: state.players.filter((player) => player._id !== action.payload) }
        default:
            return state;
    }
};