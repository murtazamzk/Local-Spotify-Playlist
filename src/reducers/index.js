import { ADD_PLAYLISTS, ADD_LOCAL_PLAYLISTS, SAVE_PLAYLIST  } from '../utils/constants';

export const initialState = {
    playlists: [],
    local_playlists: [],
}

export const reducer = (state, action) => {
    switch (action.type) {
        case ADD_PLAYLISTS:
            return {
                ...state,
                playlists: action.payload
            }
        case ADD_LOCAL_PLAYLISTS:
            return {
                ...state,
                local_playlists: action.payload
            }
        case SAVE_PLAYLIST:
            let localPlaylists = [...state.local_playlists];
            localPlaylists.push(action.payload);
            return {
                ...state,
                local_playlists: localPlaylists,
            }
    }
    return state;
}