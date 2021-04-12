import { appApiBaseUrl, getRequestOptions } from '../../utils/apiUtils';
import * as actionTypes from './chiller-details-types';

export const initChillers = () => async (dispatch) => {
    dispatch({
        type: actionTypes.INIT_CHILLER,
        payload: null,
    });
};

export const getChillerBasicDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_CHILLER_BASIC_DETAILS_REQUEST });
        const res = await fetch(
            appApiBaseUrl + `/api/chillers/${id}/basicDetails`,
            getRequestOptions('GET')
        );
        const data = await res.json();
        if (res && res.status === 200) {
            dispatch({
                type: actionTypes.GET_CHILLER_BASIC_DETAILS_SUCCESS,
                payload: data
            });
        }
    } catch (err) {
        return dispatch({
            type: actionTypes.GET_CHILLER_BASIC_DETAILS_FAIL,
            payload: err
        });
    }
};

export const getChillerSamples = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_CHILLER_SAMPLES_REQUEST });
        const res = await fetch(
            appApiBaseUrl + `/api/chillers/${id}/samples`,
            getRequestOptions('GET')
        );
        const data = await res.json();
        if (res && res.status === 200) {
            dispatch({
                type: actionTypes.GET_CHILLER_SAMPLES_SUCCESS,
                payload: data
            });
        }
    } catch (err) {
        return dispatch({
            type: actionTypes.GET_CHILLER_SAMPLES_FAIL,
            payload: err
        });
    }
};