import {
	SET_CHILLER_LOADING,
	STOP_CHILLER_LODAING
} from '../redux/Chiller-Details/chiller-details-types';
import store from '../redux/store';
import { appApiBaseUrl, getRequestOptions } from '../utils/apiUtils';

export default {
	getChillerDateRange: async (chillerId) => {
		try {
			store.dispatch({ type: SET_CHILLER_LOADING });
			if (!chillerId) {
				return console.log('getChillerDateRange must recieve chiller id');
			}
			const res = await fetch(
				appApiBaseUrl + `/api/chillers/daterange/${chillerId}`,
				getRequestOptions('GET')
			);
			if (res) {
				const data = await res.json();
				store.dispatch({
					type: STOP_CHILLER_LODAING,
				});
				return data;
			}
		}
		catch (err) {
			console.log('chillersService getChillerDateRange Error: ', err);
			store.dispatch({
				type: STOP_CHILLER_LODAING,
			});
		}
	},
	getChillerHistory: async (id, startDate, endDate) => {
		try {
			store.dispatch({ type: SET_CHILLER_LOADING });
			const res = await fetch(
				appApiBaseUrl + `/api/chillers/history/${id}/${startDate}/${endDate}`,
				getRequestOptions('GET')
			);
			if (res) {
				const data = await res.json();
				store.dispatch({
					type: STOP_CHILLER_LODAING,
				});
				const chillerHistory = data.reverse();
				return chillerHistory;
			}
		} catch (err) {
			console.log('chillersService getChillerHistory Error: ', err);
			store.dispatch({
				type: STOP_CHILLER_LODAING,
			});
			throw data;
		}
	}
};
