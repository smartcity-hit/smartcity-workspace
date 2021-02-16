import * as actionTypes from './chiller-details-types';

const initialState = {
    chillerLoading: false,
    allChillers: [],
    activeChillerIndex: 0,
    numOfChillers: 0,
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    let chillerIndex;
    if (payload && payload.chillerIndex) {
        chillerIndex = payload.chillerIndex;
    }
    switch (type) {
        case actionTypes.INIT_CHILLER:
            return { ...state };
        case actionTypes.SET_CHILLER_LOADING:
            return {
                ...state,
                chillerLoading: true,
            };
        case actionTypes.STOP_CHILLER_LODAING:
            return {
                ...state,
                chillerLoading: false,
            };
        case actionTypes.ALL_CHILLERS_DATA_FETCHED: {
            const { allChillers } = payload;
            return {
                ...state,
                chillerLoading: false,
                allChillers,
                numOfChillers: allChillers && allChillers.length,
                activeChillerIndex: 0,
            };
        }
        case actionTypes.CHILLER_DATA_FETCHED: {
            const { allChillers, activeChillerIndex } = payload;
            return {
                ...state,
                chillerLoading: false,
                allChillers,
                activeChillerIndex,
            };
        }

        default:
            return state;
    }
};
