import {
    getDataStore,
    STORE_FAVORITES_ADD,
    STORE_FAVORITES_REMOVE
} from '../datastore/datastore';

export function addToFavorites(track) {
    const dataStore = getDataStore();
    return dispatch => {
        track.date = new Date().toISOString();
        dataStore.addToFavorites(track);

        dispatch({
            type: STORE_FAVORITES_ADD,
            favorites: dataStore.state.favorites
        });
    };
}

export function removeFromFavorites(track) {
    const dataStore = getDataStore();
    return dispatch => {
        dataStore.removeFromFavorites(track);

        dispatch({
            type: STORE_FAVORITES_REMOVE,
            favorites: dataStore.state.favorites
        });
    };
}
