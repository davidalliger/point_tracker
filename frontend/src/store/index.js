import { configureStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    transactions: transactionsReducer,
    balances: balancesReducer
});

export default rootReducer;
