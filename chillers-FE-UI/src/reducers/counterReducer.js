const initialState = {
    counters: [],
    numOfCounters: 0,
    isLoading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'counters/initCounter':
            return {
                ...state
            };
        case 'counters/setIsLoading':
            debugger
            return {
                ...state,
                isLoading: true,
            };
        case 'counters/getCountersFetched':
            return {
                ...state,
                counters: action.payload,
                numOfCounters: action.payload && action.payload.length,
                isLoading: false
            };
        case 'counters/getCountersError':
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        default:
            return state;
    }
};