import { appApiBaseUrl, getRequestOptions } from '../utils/apiUtils';
export const initCounter = () => async (dispatch) => {
    dispatch(getCounters());
    dispatch({
        type: 'counters/initCounter',
        payload: null,
    });
};

export const getCounters = () => async (dispatch) => {
    try {
        debugger
        dispatch({ type: 'counters/setIsLoading' });
        const res = await fetch(
            appApiBaseUrl + `/api/1/counters/get`,
            getRequestOptions('GET')
        );
        const data = await res.json();
        if (res && res.status === 200) {
            dispatch({
                type: 'counters/getCountersFetched',
                payload: data
            });
        }
    } catch (err) {
        dispatch({ type: 'counters/getCountersError', payload: err });
        console.log('countersActions getCounters: Error: ', err);
    }
};