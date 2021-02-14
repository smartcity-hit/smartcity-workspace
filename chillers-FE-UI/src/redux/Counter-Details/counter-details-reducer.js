const initialState = {
    counterName: '',
    i1: 0,
    i2: 0,
    i3: 0,
    n_v1: 0,
    n_v2: 0,
    n_v3: 0,
    v1_v2: 0,
    v1_v3: 0,
    v2_v3: 0,
    cos: 0,
    isLoading: false,
    createdDate: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'counter/initCounter':
            return {
                ...state
            };
        case 'counter/setIsLoading':
            return {
                ...state,
                isLoading: true,
            };
        case 'counter/getCounterFetched':
            return {
                ...state,
                isLoading: false,
                counterName: action.payload.counterName,
                i1: action.payload.i1,
                i2: action.payload.i2,
                i3: action.payload.i3,
                n_v1: action.payload.n_v1,
                n_v2: action.payload.n_v2,
                n_v3: action.payload.n_v3,
                v1_v2: action.payload.v1_v2,
                v1_v3: action.payload.v1_v3,
                v2_v3: action.payload.v2_v3,
                cos: action.payload.cos,
                createdDate: action.payload.createdDate
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