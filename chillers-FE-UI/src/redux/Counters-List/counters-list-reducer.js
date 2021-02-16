import * as actionTypes from './counters-list-types';

const initialState = {
    counters: [],
    numOfCounters: 0,
    isLoading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_COUNTERS:
            return {
                ...state
            };
        case actionTypes.GET_COUNTERS_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.GET_COUNTERS_SUCCESS:
            return {
                ...state,
                counters: action.payload,
                numOfCounters: action.payload && action.payload.length,
                isLoading: false
            };
        case actionTypes.GET_COUNTERS_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        default:
            return state;
    }
};