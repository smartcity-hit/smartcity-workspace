import { appApiBaseUrl, getRequestOptions } from '../utils/apiUtils';

export default {
    getCounters: async () => {
        try {
            const res = await fetch(
                appApiBaseUrl + `/api/1/counters/get`,
                getRequestOptions('GET')
            );
            if (res) {
                const data = await res.json();
                return data;
            }
        }
        catch (err) {
            console.log('countersService getCounters Error:' + err);
        }
    },
    getCounterById: async (counterId) => {
        try {
            if (!counterId) {
                return console.log('getCounterById must recieve counter id');
            }
            const res = await fetch(
                appApiBaseUrl + `/api/1/counters/getCounterById/${counterId}`,
                getRequestOptions('GET')
            );
            if (res) {
                const data = await res.json();
                return data;
            }
        }
        catch (err) {
            console.log('countersService getCounterById Error: ', err);
        }
    }
};