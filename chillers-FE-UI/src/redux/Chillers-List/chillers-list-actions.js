import { appApiBaseUrl, getRequestOptions } from '../../utils/apiUtils';
import * as actionTypes from './chillers-list-types';

export const initChillers = () => async (dispatch) => {
    dispatch({
        type: actionTypes.INIT_CHILLERS,
        payload: null,
    });
};

export const getChillers = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_CHILLERS_REQUEST });
        const res = await fetch(
            appApiBaseUrl + `/api/chillers/`,
            getRequestOptions('GET')
        );
        const data = await res.json();
        if (res && res.status === 200) {
            dispatch({
                type: actionTypes.GET_CHILLERS_SUCCESS,
                payload: data
            });
        }
    } catch (err) {
        return dispatch({
            type: actionTypes.GET_CHILLERS_FAIL,
            payload: err
        });
    }
};