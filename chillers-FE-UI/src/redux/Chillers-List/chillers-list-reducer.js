import * as actionTypes from './chillers-list-type';

const initialState = {
    chillers: [],
    numOfChillers: 0,
    isLoading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_CHILLERS:
            return {
                ...state
            };
        case actionTypes.GET_CHILLERS_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.GET_CHILLERS_SUCCESS:
            return {
                ...state,
                chillers: action.payload.chillers,
                numOfCHILLERS: action.payload && action.payload.chillers.length,
                isLoading: false
            };
        case actionTypes.GET_CHILLERS_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        default:
            return state;
    }
};