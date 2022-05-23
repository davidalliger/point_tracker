import { createStore, combineReducers, applyMiddleware } from 'redux';
import transactionsReducer from './transactions';
import balancesReducer from './balances';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    transactions: transactionsReducer,
    balances: balancesReducer
});

const enhancer = applyMiddleware(thunk);

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
