import {
	SIGN_IN_SUCCESS,
	SIGN_IN_ERROR,
	USER_LOADED,
	USER_LOADED_ERROR,
	SIGN_OUT,
	ADD_USER_SUCCESS,
	ADD_USER_ERROR,
	FETCHED_ALL_USERS,
	SET_LOADING,
	USER_DELETED,
	USER_EDITED,
	USER_MODIFY_ERROR,
} from '../constants/types';

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
		case SET_LOADING:
			return {
				...state,
				loading: true,
				error: null,
			};
		case USER_LOADED:
		case SIGN_IN_SUCCESS:
			console.log('SignIn payload: ', payload);
			return {
				...state,
				loading: false,
				error: null,
				userData: payload.user,
				token: payload.token,
			};
		case USER_LOADED_ERROR:
		case SIGN_IN_ERROR:
			return {
				...state,
				loading: false,
				error: payload.error,
				userData: null,
			};
		case ADD_USER_SUCCESS:
			return {
				...state,
				error: null,
				loading: false,
				allUsersList: [...state.allUsersList, payload.user],
			};
		case ADD_USER_ERROR:
			return {
				...state,
				loading: false,
				error: payload.error,
			};
		case SIGN_OUT:
			return {
				...state,
				loading: false,
				error: null,
				userData: null,
			};
		case FETCHED_ALL_USERS:
			return {
				...state,
				loading: false,
				error: null,
				allUsersList: payload.usersList,
			};
		case USER_DELETED:
			return {
				...state,
				loading: false,
				error: null,
				allUsersList: state.allUsersList.filter((user) => {
					return user.id !== payload;
				}),
			};
		case USER_EDITED:
			return {
				...state,
				loading: false,
				error: null,
				allUsersList: payload.allUsersList,
			};
		case USER_MODIFY_ERROR:
			return {
				...state,
				loading: false,
				error: payload.error,
			};
		default:
			return state;
	}
};
