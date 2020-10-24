import {
	ALL_CHILLERS_DATA_FETCHED,
	CHILLER_DATA_FETCHED,
	INIT_CHILLER,
	SET_CHILLER_LOADING,
	STOP_CHILLER_LODAING,
} from '../constants/types';

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
		case INIT_CHILLER:
			return { ...state };
		case SET_CHILLER_LOADING:
			return {
				...state,
				chillerLoading: true,
			};
		case STOP_CHILLER_LODAING:
			return {
				...state,
				chillerLoading: false,
			};
		case ALL_CHILLERS_DATA_FETCHED: {
			const { allChillers } = payload;
			return {
				...state,
				chillerLoading: false,
				allChillers,
				numOfChillers: allChillers && allChillers.length,
				activeChillerIndex: 0,
			};
		}
		case CHILLER_DATA_FETCHED: {
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
