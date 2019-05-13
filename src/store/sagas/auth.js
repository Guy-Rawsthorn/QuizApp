import {put, call} from 'redux-saga/effects';
import LocalStorage from 'react';
import axios from '../../axios-instance';
import {Alert} from 'react';
import * as actions from '../actions/index';

export function* logoutSaga(action) {
    // call function makes generators more testable
    yield localStorage.removeItem("tokenExpiration");
    yield localStorage.removeItem("token");
    yield localStorage.removeItem("userId");
    yield put(actions.logoutSucceed());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
        let requestBody = {
            query: `
                query Login($email: String!, $password: String!){
                    login(email: $email, password: $password) {
                        userId
                        token
                        tokenExpiration
                    }
                }
            `,
            variables: {
                email: action.email,
                password: action.password
            }
        };
        const res = yield axios.post('/', JSON.stringify(requestBody));
        console.log("response", res);
        if (res.status === 200 && res.status !== 201) {
            yield put(actions.authSuccess(res.data.data.login.token, res.data.data.login.userId, res.data.data.login.tokenExpiration, res.data.data.login.name));
            yield localStorage.setItem("token", res.data.data.login.token);
            yield localStorage.setItem("userId", res.data.data.login.userId);
            yield localStorage.setItem("tokenExpiration", res.data.data.login.tokenExpiration);
            yield localStorage.setItem("name", res.data.data.login.name);

            // navigation links
        } else {
            yield put(actions.authFail());
            Alert.alert('Unsuccessful login 🔒', 'Login failed. Please try again')
        }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem("token");
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = yield new Date(
            localStorage.getItem("tokenExpiration")
        );
        if (expirationDate <= new Date()) {
            yield put(actions.logout());
        } else {
            const userId = yield localStorage.getItem("userId");
            yield put(actions.authSuccess(token, userId));
            yield put(
                actions.checkAuthTimeout(
                    (expirationDate.getTime() - new Date().getTime()) / 1000
                )
            );
        }
    }
}
