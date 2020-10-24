import {
  INIT_CHILLER,
  SET_CHILLER_LOADING,
  STOP_CHILLER_LODAING,
  ALL_CHILLERS_DATA_FETCHED,
  CHILLER_DATA_FETCHED,
} from '../constants/types';
import { appApiBaseUrl, getRequestOptions } from '../services/ApiService';
import store from '../store';

/* Temporary */

const insertFakeCoolingCircuitData = (chillersArray) => {
  chillersArray.forEach((chiller) => {
    // Temporary - hardcoded
    chiller.coolingCircuit = { compressors: [true, false, true, true, false, true, false, true] };
  });
};

/* Chiller Actions */

export const initChiller = () => async (dispatch) => {
  dispatch(getAllChillersData());
  dispatch({
    type: INIT_CHILLER,
    payload: null,
  });
};

export const getAllChillersData = () => async (dispatch) => {
  try {
    dispatch({ type: SET_CHILLER_LOADING });
    const res = await fetch(appApiBaseUrl + '/api/1/chillers/get', getRequestOptions());
    const data = await res.json();
    console.log('chillersActions getChillersData Chillers:', data);
    if (res && res.status === 200) {
      const allChillers = data;
      insertFakeCoolingCircuitData(allChillers);
      dispatch({
        type: ALL_CHILLERS_DATA_FETCHED,
        payload: { allChillers },
      });
    }
  } catch (err) {
    console.log('ChillerActions getAllChillersData Error: ', err);
    dispatch({ type: STOP_CHILLER_LODAING });
    // throw data;
  }
};

export const setActiveChiller = (chillerIndex) => async (dispatch) => {
  try {
    dispatch({ type: SET_CHILLER_LOADING });
    const chillerNumber = chillerIndex + 1;
    const res = await fetch(
      appApiBaseUrl + `/api/1/chillers/get/${chillerNumber}`,
      getRequestOptions()
    );
    const data = await res.json();
    if (res && res.status === 200) {
      console.log('chillersActions setActiveChiller Chiller:', data);
      const { allChillers } = store.getState().chiller;
      allChillers[chillerIndex] = data;
      insertFakeCoolingCircuitData(allChillers);
      dispatch({
        type: CHILLER_DATA_FETCHED,
        payload: { allChillers, activeChillerIndex: chillerIndex },
      });
    } else {
      throw data;
    }
  } catch (err) {
    console.log('ChillerActions setActiveChiller Error: ', err);
    dispatch({ type: STOP_CHILLER_LODAING });
  }
};
