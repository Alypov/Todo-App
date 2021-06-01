import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import { createLogger } from 'redux-logger';

const store = createStore(
  rootReducer,
  compose(applyMiddleware(createLogger()))
);

export default store;
