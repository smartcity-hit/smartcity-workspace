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
            appApiBaseUrl + `/api/1/counters/get/basicDetails/${id}`,
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
            appApiBaseUrl + `/api/1/counters/get/samples/${id}`,
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
    const { host, port, unitId,deviceType, } = counterData;
    try {
        dispatch({ type: actionTypes.SET_LOADING });
        const res = await fetch(appApiBaseUrl + '/api/1/counters/create', {
            ...getRequestOptions('POST'),
            body: JSON.stringify({
                host,
                port,
                unitId,
                deviceType,
            }),
        });
        const data = await res.json();
        if (res && res.status === 200) {
            dispatch({
                type: actionTypes.ADD_COUNTER_SUCCESS,
                payload: { user: data },
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.ADD_COUNTER_ERROR,
            payload: { error },
        });
    }
};