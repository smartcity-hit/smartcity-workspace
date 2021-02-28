import { appApiBaseUrl, getRequestOptions } from '../../utils/apiUtils';
import * as actionTypes from './counter-details-types';

export const initCounters = () => async (dispatch) => {
    dispatch({
        type: actionTypes.INIT_COUNTER,
        payload: null,
    });
};

export const getCounterDetails = (id) => async (dispatch) => {
    try {
        debugger
        dispatch({ type: actionTypes.GET_COUNTER_DETAILS_REQUEST });
        const res = await fetch(
            appApiBaseUrl + `/api/1/counters/get/${id}`,
            getRequestOptions('GET')
        );
        const data = await res.json();
        if (res && res.status === 200) {
            dispatch({
                type: actionTypes.GET_COUNTER_DETAILS_SUCCESS,
                payload: data
            });
        }
    } catch (err) {
        return dispatch({
            type: actionTypes.GET_COUNTER_DETAILS_FAIL,
            payload: err
        });
    }
};