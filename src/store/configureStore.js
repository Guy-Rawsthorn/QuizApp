import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import authReducer from './reducers/auth';
import questionsReducer from './reducers/questions';

const rootReducer = combineReducers({
    auth: authReducer,
    questions: questionsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (sagaMiddleware) => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
};

export default configureStore;
