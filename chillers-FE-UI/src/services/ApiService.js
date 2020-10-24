import { SET_CHILLER_LOADING, STOP_CHILLER_LODAING } from '../constants/types';
import store from '../store';

export const appApiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3200';

export const getRequestOptions = (method = 'GET') => {
	const token = store.getState().user.token || localStorage.getItem('token');
	if (!token) {
		console.log('No token available');
		throw { code: 401, message: 'Not Authorized' };
	}
	const options = {
		method,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};
	return options;
};

export default {
	/* Chillers */
	getChillerDateRange: async (chillerId) => {
		try {
			store.dispatch({ type: SET_CHILLER_LOADING });
			if (!chillerId) {
				return console.log('getChillerDateRange must recieve chiller id');
			}
			const res = await fetch(
				appApiBaseUrl + `/api/1/chillers/daterange/${chillerId}`,
				getRequestOptions()
			);
			if (res) {
				const data = await res.json();
				console.log('ApiService getChillerDateRange response: ', data);
				store.dispatch({
					type: STOP_CHILLER_LODAING,
				});
				return data;
			}
		} catch (err) {
			console.log('ApiService getChillerDateRange Error: ', err);
			store.dispatch({
				type: STOP_CHILLER_LODAING,
			});
		}
	},

	getChillerHistory: async (id, startDate, endDate) => {
		try {
			store.dispatch({ type: SET_CHILLER_LOADING });
			const res = await fetch(
				appApiBaseUrl + `/api/1/chillers/history/${id}/${startDate}/${endDate}`,
				getRequestOptions()
			);
			if (res) {
				const data = await res.json();
				console.log('chillerActions getChillerHistory response: ', data);
				store.dispatch({
					type: STOP_CHILLER_LODAING,
				});
				const chillerHistory = data.reverse();
				return chillerHistory;
			}
		} catch (error) {
			console.log('ApiService getChillerHistory Error: ', error);
			store.dispatch({
				type: STOP_CHILLER_LODAING,
			});
			throw data;
		}
	},
};
