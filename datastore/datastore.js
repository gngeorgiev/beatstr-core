import LocalDataStore from './LocalDataStore'
import {
    STORE_SEARCH_DATA_UPDATED as searchDataUpdated,
    STORE_HISTORY_ADD as storeAdd,
    STORE_HISTORY_REMOVE as storeRemove,
    STORE_HISTORY_INITIALIZED as storeInitialized,
    STORE_SEARCH_DATA_INITIALIZED as storeSearchInitialized,
    STORE_FAVORITES_ADD as storeFavoritesAdd,
    STORE_FAVORITES_REMOVE as storeFavoritesRemove,
    STORE_FAVORITES_INITIALIZED as storeFavoritesInitialized
} from './events';

export let dataStore = null;
export function getDataStore() {
    return dataStore;
}

export function initializeDataStore() {
    dataStore = new LocalDataStore();
}

export const STORE_SEARCH_DATA_UPDATED = searchDataUpdated;
export const STORE_HISTORY_ADD = storeAdd;
export const STORE_HISTORY_REMOVE = storeRemove;
export const STORE_HISTORY_INITIALIZED = storeInitialized;
export const STORE_SEARCH_DATA_INITIALIZED = storeSearchInitialized;
export const STORE_FAVORITES_ADD = storeFavoritesAdd;
export const STORE_FAVORITES_REMOVE = storeFavoritesRemove;
export const STORE_FAVORITES_INITIALIZED = storeFavoritesInitialized;
