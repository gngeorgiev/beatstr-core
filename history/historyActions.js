import {
    getDataStore,
    STORE_HISTORY_REMOVE,
    STORE_HISTORY_ADD
} from '../datastore/datastore';

export function removeFromHistory(track) {
    const dataStore = getDataStore();
    return dispatch => {
        dataStore.removeFromHistory(track);

        dispatch({
            type: STORE_HISTORY_REMOVE,
            history: dataStore.state.history
        });
    }
}

export function addToHistory(track) {
    const dataStore = getDataStore();
    return dispatch => {
        dataStore.addToHistory(track);

        dispatch({
            type: STORE_HISTORY_ADD,
            history: dataStore.state.history
        });
    };
}
