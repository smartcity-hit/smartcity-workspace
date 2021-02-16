import { appApiBaseUrl, getRequestOptions } from '../../utils/apiUtils';
import * as actionTypes from './counters-list-types';

export const initCounters = () => async (dispatch) => {
    dispatch({
        type: actionTypes.INIT_COUNTERS,
        payload: null,
    });
};

export const getCounters = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_COUNTERS_REQUEST });
        const res = await fetch(
            appApiBaseUrl + `/api/1/counters/get`,
            getRequestOptions('GET')
        );
        const data = await res.json();
        if (res && res.status === 200) {
            dispatch({
                type: actionTypes.GET_COUNTERS_SUCCESS,
                payload: data
            });
        }
    } catch (err) {
        return dispatch({
            type: actionTypes.GET_COUNTERS_FAIL,
            payload: err
        });
    }
};