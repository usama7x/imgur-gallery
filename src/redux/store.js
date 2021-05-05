import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunk, sagaMiddleware];

const bindMiddlewares = middlewares => {
    if(process.env.NODE_ENV !== 'production') {
        const {composeWithDevTools} = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middlewares))
    }
    return applyMiddleware(...middlewares);
};

const store = createStore(rootReducer, bindMiddlewares(middlewares));
sagaMiddleware.run(rootSaga);
export {store};