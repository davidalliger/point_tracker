import { handleResponse } from "../utils";

const LOAD = 'transactions/LOAD';
const ADD = 'transactions/ADD';

const loadTransactions = transactions => {
    return {
        type: LOAD,
        transactions
    };
};

const addTransaction = transaction => {
    return {
        type: ADD,
        transaction
    }
}

export const getTransactions = () => async(dispatch) => {
    const response = await fetch('/api/transactions');
    if (response.ok) {
        const transactions = await response.json();
        dispatch(loadTransactions(transactions));
        return transactions;
    } else {
        const data = await handleResponse(response);
        return data;
    }
}
export const createTransaction = (payload) => async(dispatch) => {
    const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const transaction = await response.json();
        dispatch(addTransaction(transaction));
        return transaction;
    } else {
        const data = await handleResponse(response);
        return data;
    }
}

const transactionsReducer = (state={}, action) => {
    let newState = {...state};
    switch(action.type) {
        case LOAD:
            action.transactions.forEach(transaction => {
                newState[transaction.id] = transaction;
            });
            return newState;
        case ADD:
            newState[action.transaction.id] = action.transaction;
            return newState;
        default:
            return newState;
    }
}

export default transactionsReducer;
