import store from '../store/store';

export const LOADING_ACTION = 'LOADING_ACTION';

let timeout = null;
export function loading(state = false, action) {
    let loading = state;

    if (action.type === LOADING_ACTION) {
        loading = action.loading;
    }

    if (loading && !timeout) {
        timeout = setTimeout(() => {
            store.dispatch({
                action: LOADING_ACTION,
                loading: false
            });
        }, 10 * 1000);
    } else {
        clearTimeout(timeout);
    }

    return loading;
}
