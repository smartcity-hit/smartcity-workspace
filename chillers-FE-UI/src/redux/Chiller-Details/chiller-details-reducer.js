import * as actionTypes from './chiller-details-types';

const initialState = {
    isLoading: false,
    chillerName: '',
    chillerId: 0,
    chillerLocation: '',
    chillerIP: '',
    createdDate: null,
    isAlive: false,
    chillerSamples: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_CHILLER:
            return {
                ...state
            };
        case actionTypes.GET_CHILLER_BASIC_DETAILS_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.GET_CHILLER_BASIC_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                chillerName: action.payload.name,
                chillerId: action.payload.deviceId,
                chillerLocation: action.payload.location ? action.payload.location : 'No location set',
                chillerIP: action.payload.host,
                createdDate: action.payload.createdAt,
                isAlive: action.payload.isAlive !== undefined ? action.payload.isAlive.toString() : 'No Status'
            };
        case actionTypes.GET_CHILLER_BASIC_DETAILS_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case actionTypes.GET_CHILLER_SAMPLES_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.GET_CHILLER_SAMPLES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                chillerSamples: action.payload.chillerSamples
            }
        case actionTypes.GET_CHILLER_SAMPLES_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state;
    }
};