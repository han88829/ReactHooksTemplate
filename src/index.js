import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './Route';
import { StoreProvider, createStore } from 'easy-peasy';
import model from './model';
import * as serviceWorker from './serviceWorker';

const store = createStore(model)

ReactDOM.render(
    <StoreProvider store={store}>
        <App />
    </StoreProvider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
