import * as actionTypes from './user-details-types';

const initialState = {
    loading: false,
    error: null,
    userData: null,
    token: null,
    allUsersList: [],
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case actionTypes.SET_LOADING:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case actionTypes.USER_LOADED:
            return {
                ...state,
                loading: false
            };
        case actionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                userData: payload.user,
                token: payload.token,
            };
        case actionTypes.USER_LOADED_ERROR:
        case actionTypes.SIGN_IN_ERROR:
            return {
                ...state,
                loading: false,
                error: payload.error,
                userData: null,
            };
        case actionTypes.ADD_USER_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                allUsersList: [...state.allUsersList, payload.user],
            };
        case actionTypes.ADD_USER_ERROR:
            return {
                ...state,
                loading: false,
                error: payload.error,
            };
        case actionTypes.SIGN_OUT:
            return {
                ...state,
                loading: false,
                error: null,
                userData: null,
            };
        case actionTypes.FETCHED_ALL_USERS:
            return {
                ...state,
                loading: false,
                error: null,
                allUsersList: payload.usersList,
            };
        case actionTypes.USER_DELETED:
            return {
                ...state,
                loading: false,
                error: null,
                allUsersList: state.allUsersList.filter((user) => {
                    return user.id !== payload;
                }),
            };
        case actionTypes.USER_EDITED:
            return {
                ...state,
                loading: false,
                error: null,
                allUsersList: payload.allUsersList,
            };
        case actionTypes.USER_MODIFY_ERROR:
            return {
                ...state,
                loading: false,
                error: payload.error,
            };

        default:
            return state;
    }
};
