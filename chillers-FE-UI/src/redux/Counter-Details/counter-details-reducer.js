import * as actionTypes from './counter-details-types';

const initialState = {
    isLoading: false,
    counterName: '',
    counterId: 0,
    counterLocation: '',
    counterIP: '',
    createdDate: null,
    isAlive: false,
    counterSamples: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_COUNTER:
            return {
                ...state
            };
        case actionTypes.GET_COUNTER_BASIC_DETAILS_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.GET_COUNTER_BASIC_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                counterName: action.payload.name,
                counterId: action.payload.deviceId,
                counterLocation: action.payload.location ? action.payload.location : 'No location set',
                counterIP: action.payload.host,
                createdDate: action.payload.createdAt,
                isAlive: action.payload.isAlive !== undefined ? action.payload.isAlive.toString() : 'No Status'
            };
        case actionTypes.GET_COUNTER_BASIC_DETAILS_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case actionTypes.GET_COUNTER_SAMPLES_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.GET_COUNTER_SAMPLES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                counterSamples: action.payload.counterSamples
            }
        case actionTypes.GET_COUNTER_SAMPLES_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state;
    }
};