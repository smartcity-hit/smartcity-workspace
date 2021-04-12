import store from '../store';
import * as actionTypes from './user-details-types';
import userUtils from '../../utils/userUtils';
import { appApiBaseUrl, getRequestOptions } from '../../utils/apiUtils';

export const initEnvironment = () => async (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return console.log('No token in storage');
    }

    try {
        dispatch({ type: actionTypes.SET_LOADING });
        const res = await fetch(appApiBaseUrl + '/api/users/get', getRequestOptions());
        const data = await res.json();
        if (res && res.status === 200) {
            const user = userUtils.parseUserObject(data);
            dispatch({
                type: actionTypes.USER_LOADED,
                payload: { user, token },
            });
        } else if (res.status === 401) {
            if (localStorage.getItem('token')) {
                localStorage.removeItem('token');
            }
            dispatch({
                type: actionTypes.USER_LOADED_ERROR,
                payload: { error: null },
            });
        } else {
            throw data;
        }
    } catch (error) {
        console.log('ChillerActions initEnvironment Error: ', error);
        dispatch({
            type: actionTypes.USER_LOADED_ERROR,
            payload: {
                error: {
                    message: 'Cannot reach servers. please contact support.',
                    code: 404,
                },
            },
        });
    }
};

export const signInUser = ({ userId, password }) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.SET_LOADING });
        const res = await fetch(appApiBaseUrl + '/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                userId,
                password,
            }),
        });
        console.log(res);
        const data = await res.json();
        console.log(data);
        if (res && res.status === 200) {
            const { token } = data;
            const user = userUtils.parseUserObject(data.user);
            localStorage.setItem('token', token);
            dispatch({
                type: actionTypes.SIGN_IN_SUCCESS,
                payload: { user, token },
            });
        } else {
            throw data;
        }
    } catch (error) {
        console.log('initEnvironment Error: ', error);
        dispatch({
            type: actionTypes.SIGN_IN_ERROR,
            payload: { error },
        });
    }
};

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.SET_LOADING });
        const res = await fetch(appApiBaseUrl + '/api/users/get/all', getRequestOptions());
        const data = await res.json();
        if (res && res.status === 200) {
            console.log('getAllUsers Users:', data);
            dispatch({
                type: actionTypes.FETCHED_ALL_USERS,
                payload: { usersList: data },
            });
        } else {
            throw data;
        }
    } catch (err) {
        console.log('chillerActions getAllUsers Error:', err);
    }
};

export const signOutUser = () => (dispatch) => {
    localStorage.removeItem('token');
    dispatch({
        type: actionTypes.SIGN_OUT,
    });
};

export const signUpUser = (userData) => async (dispatch) => {
    console.log('userActions signUpUser user: ', userData);
    const { userId, userType, fullName, address, phone, email, password } = userData;
    try {
        dispatch({ type: actionTypes.SET_LOADING });
        const res = await fetch(appApiBaseUrl + '/api/users/create', {
            ...getRequestOptions('POST'),
            body: JSON.stringify({
                userId,
                userType,
                fullName,
                address,
                phone,
                email,
                password,
            }),
        });
        const data = await res.json();
        if (res && res.status === 200) {
            console.log('SignUpUser Success responseData:', data);
            dispatch({
                type: actionTypes.ADD_USER_SUCCESS,
                payload: { user: data },
            });
        }
    } catch (error) {
        console.log('SignUpUser Error: ', error);
        dispatch({
            type: actionTypes.ADD_USER_ERROR,
            payload: { error },
        });
    }
};

export const deleteUserById = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.SET_LOADING });
        console.log('userActions deleteUserById user:', data);
        const res = await fetch(
            appApiBaseUrl + `/api/users/delete/${id}`,
            getRequestOptions('DELETE')
        );
        const data = await res.json();
        if (res && res.status === 200) {
            dispatch({
                type: actionTypes.USER_DELETED,
                payload: id,
            });
        }
    } catch (error) {
        console.log('userActions deleteUserById Error: ', error);
        dispatch({
            type: actionTypes.USER_MODIFY_ERROR,
            payload: { error },
        });
    }
};

export const editUser = (userId, userNewData) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.SET_LOADING });
        console.log('userActions editUser userNewData:', userNewData);
        const res = await fetch(appApiBaseUrl + `/api/users/edit/${userId}`, {
            ...getRequestOptions('PATCH'),
            body: JSON.stringify(userNewData),
        });
        if (res && res.status === 200) {
            const data = await res.json();
            console.log('userActions editUser Success User: ', data);
            const allUsersList = [...store.getState().user.allUsersList];
            const userIndex = allUsersList.findIndex((user) => user.id === userId);
            if (userIndex !== -1) {
                allUsersList[userIndex] = data;
            }
            dispatch({
                type: actionTypes.USER_EDITED,
                payload: { allUsersList },
            });
        }
    } catch (err) {
        console.log('userActions editUser Error: ', err);
        dispatch({});
    }
};
