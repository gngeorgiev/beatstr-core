import {flatten, map} from 'lodash';
import {LOADING_ACTION} from '../reducers/common';
import searchers from './searchers/searchers';
import {getDataStore, STORE_SEARCH_DATA_UPDATED} from '../datastore/datastore';

export const SAVE_SEARCH_RESULTS = 'SAVE_SEARCH_RESULTS';

export function addToSearch(text) {
    return dispatch => {
        getDataStore().addToSearch(text);

        dispatch({
            type: STORE_SEARCH_DATA_UPDATED,
            searchHistory: getDataStore().state.search
        });
    }
}

export function search(text) {
    return dispatch => {
        if (!text) {
            return dispatch({
                type: SAVE_SEARCH_RESULTS,
                searchResults: []
            });
        }

        addToSearch(text)(dispatch);

        dispatch({
            type: LOADING_ACTION,
            loading: true
        });

        const searchPromises = map(searchers, s => {
            return s.search(text);
        });

        Promise.all(searchPromises).then((results) => {
            const flattenedResults = flatten(results);

            dispatch({
                type: SAVE_SEARCH_RESULTS,
                searchResults: flattenedResults
            });

            dispatch({
                type: LOADING_ACTION,
                loading: false
            });
        }).catch(err => {
            console.error(err);

            dispatch({
                type: LOADING_ACTION,
                loading: false
            });
        });
    };
}
