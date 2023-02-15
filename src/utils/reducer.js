export const initialState = {
    token: null,
    user: null,
    playlists: [],
    playing: false,
    item: null,
    selectedPlaylistId: "37i9dQZF1E4mYF8c7kG9MP",
    selectedPlaylist: null,
    currentlyPlaying: null,
    playerState: false,
}

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user,
            };
        case "SET_TOKEN":
            return {
                ...state,
                token: action.token,
            };
        case "SET_PLAYLISTS":
            return {
                ...state,
                playlists: action.playlists,
            };
        case "SET_PLAYLIST":
            return {
                ...state,
                selectedPlaylist: action.selectedPlaylist,
            };
        case "SET_PLAYING":
            return {
                ...state,
                currentlyPlaying: action.currentlyPlaying,
            };
        case "SET_PLAYER_STATE":
            return {
                ...state,
                playerState: action.playerState,
            };
        case "SET_DISCOVER_WEEKLY":
            return {
                ...state,
                discover_weekly: action.discover_weekly,
            };
        case "SET_TOP_ARTISTS":
            return {
                ...state,
                top_artists: action.top_artists,
            };
        case "SET_SPOTIFY":
            return {
                ...state,
                spotify: action.spotify,
            };
        default:
            return state;

    }
}

export default reducer;