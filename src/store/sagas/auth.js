import {put, call} from 'redux-saga/effects';
import LocalStorage from 'react';
import axios from '../../axios-instance';
import {Alert} from 'react-native';
import * as actions from '../actions/index';
import {Platform} from "react-native";

export function* logoutSaga(action) {
    // call function makes generators more testable
    yield localStorage.removeItem("tokenExpiration");
    yield localStorage.removeItem("token");
    yield localStorage.removeItem("userId");
    yield put(actions.logoutSucceed());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());

    if (action.isSignUp) {
        try {
            let requestBody = {
                query: `
                mutation CreateUser($email: String!, $password: String!, $name: String!) {
                    createUser(userInput: {
                        email: $email,
                        password: $password,
                        name: $name,
                        role: "customer"
                    }) {
                        _id
                        email
                        name
                    }
                }
            `,
                variables: {
                    email: action.email,
                    password: action.password,
                    name: action.name
                }
            };

            const response = yield axios.post('http://localhost:3000/graphql', JSON.stringify(requestBody));
            if (response.data.errors) {
                throw Error(response.data.errors[0].message);
            }
            if (response.status === 200 && response.status !== 201) {
                try {
                    let requestBody = {
                        query: `
                query Login($email: String!, $password: String!){
                    login(email: $email, password: $password) {
                        userId
                        token
                        tokenExpiration
                        name
                    }
                }
            `,
                        variables: {
                            email: action.email,
                            password: action.password
                        }
                    };

                    const res = yield axios.post('/', JSON.stringify(requestBody));
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
                } catch (err) {
                    console.log(err);
                    Alert.alert('Unsuccessful login 🔒', 'Authentication failed. Please try again')
                }
            } else {
                Alert.alert('Unsuccessful sign up', 'Account sign up failed. Please try again')
            }
        } catch (err) {
            console.log(err);
            Alert.alert('Unsuccessful sign up', `Account sign up failed.\n\n ${err}.`);
        }
    } else {
        try {
            let requestBody = {
                query: `
                query Login($email: String!, $password: String!){
                    login(email: $email, password: $password) {
                        userId
                        token
                        tokenExpiration
                        name
                    }
                }
            `,
                variables: {
                    email: action.email,
                    password: action.password
                }
            };

            const response = yield axios.post('/', JSON.stringify(requestBody));
            if (response.status === 200 && response.status !== 201) {
                yield put(actions.authSuccess(response.data.data.login.token, response.data.data.login.userId, response.data.data.login.tokenExpiration, response.data.data.login.name));
                // navigation
            } else {
                yield put(actions.authFail());
                Alert.alert('Unsuccessful login 🔒', 'Login failed. Please try again')
            }
        } catch (err) {
            console.log(err);
            Alert.alert('Unsuccessful login 🔒', 'Authentication failed. Please try again')
        }
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
