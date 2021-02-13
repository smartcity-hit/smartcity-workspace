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

export default appApiBaseUrl;