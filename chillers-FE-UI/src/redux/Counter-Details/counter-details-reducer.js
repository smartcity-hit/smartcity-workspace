import * as actionTypes from './counter-details-types';

const initialState = {
    isLoading: false,
    counterName: '',
    location: '',
    state: '',
    createdDate: null,
    samples: [],
    //i1: 0,
    //i2: 0,
    //i3: 0,
    //n_v1: 0,
    //n_v2: 0,
    //n_v3: 0,
    //v1_v2: 0,
    //v1_v3: 0,
    //v2_v3: 0,
    //cos: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_COUNTER:
            return {
                ...state
            };
        case actionTypes.GET_COUNTER_DETAILS_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.GET_COUNTER_DETAILS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                counterName: action.payload.counterName,
                location: action.payload.location,
                state: action.payload.state,
                createdDate: action.payload.createdDate

                //i1: action.payload.i1,
                //i2: action.payload.i2,
                //i3: action.payload.i3,
                //n_v1: action.payload.n_v1,
                //n_v2: action.payload.n_v2,
                //n_v3: action.payload.n_v3,
                //v1_v2: action.payload.v1_v2,
                //v1_v3: action.payload.v1_v3,
                //v2_v3: action.payload.v2_v3,
                //cos: action.payload.cos

            };
        case actionTypes.GET_COUNTER_DETAILS_FAIL:
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
                samples: action.payload.samples
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