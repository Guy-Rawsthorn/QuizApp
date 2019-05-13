import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import App from './App';
import Home from './components/Home';
import Auth from './components/Auth';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/configureStore';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import {watchQuestions, watchAuth} from './store/sagas/index';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore(sagaMiddleware);

sagaMiddleware.run(watchQuestions);
sagaMiddleware.run(watchAuth);

const routing = (
    <Router>
        <div>
            <ul>
                <li>
                    <Link to="/">React</Link>
                </li>
                <li>
                    <Link to="/users">Users</Link>
                </li>
                <li>
                    <Link to="/home">home</Link>
                </li>
            </ul>

            <Switch>
                <Provider store={store}>
                    <Route exact path="/" component={App} />
                    <Route exact path="/users/" component={Auth} />
                    <Route exact path="/home" component={Home} />
                    {/*<Route component={NotFound} />*/}
                </Provider>
            </Switch>
        </div>
        {console.log("store",store)}
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
