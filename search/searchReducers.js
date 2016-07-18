import {SAVE_SEARCH_RESULTS} from './searchActions';
import {STORE_SEARCH_DATA_UPDATED, STORE_SEARCH_DATA_INITIALIZED} from '../datastore/datastore';
import {groupBy} from 'lodash';

export function searchResults(state = [], action) {
    if (action.type === SAVE_SEARCH_RESULTS) {
        state = groupBy(action.searchResults, 'source');
    }

    return state;
}

export function searchHistory(state = [], action) {
    if (action.type === STORE_SEARCH_DATA_UPDATED || action.type === STORE_SEARCH_DATA_INITIALIZED) {
        return Object.keys(action.searchHistory);
    }

    return state;
}
