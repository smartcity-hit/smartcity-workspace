import { appApiBaseUrl, getRequestOptions } from '../../utils/apiUtils';
import * as actionTypes from './counter-details-types';

export const initCounters = () => async (dispatch) => {
    dispatch({
        type: actionTypes.INIT_COUNTER,
        payload: null,
    });
};

export const getCounterBasicDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_COUNTER_BASIC_DETAILS_REQUEST });
        const res = await fetch(
            appApiBaseUrl + `/api/counter/${id}/basicDetails`,
            getRequestOptions('GET')
        );
        const data = await res.json();
        if (res && res.status === 200) {
            dispatch({
                type: actionTypes.GET_COUNTER_BASIC_DETAILS_SUCCESS,
                payload: data
            });
        }
    } catch (err) {
        return dispatch({
            type: actionTypes.GET_COUNTER_BASIC_DETAILS_FAIL,
            payload: err
        });
    }
};

export const getCounterSamples = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_COUNTER_SAMPLES_REQUEST });
        const res = await fetch(
            appApiBaseUrl + `/api/counter/${id}/samples`,
            getRequestOptions('GET')
        );
        const data = await res.json();
        if (res && res.status === 200) {
            dispatch({
                type: actionTypes.GET_COUNTER_SAMPLES_SUCCESS,
                payload: data
            });
        }
    } catch (err) {
        return dispatch({
            type: actionTypes.GET_COUNTER_SAMPLES_FAIL,
            payload: err
        });
    }
};

export const addCounter = (counterData) => async (dispatch) => {

};