import { handleResponse } from "../utils";

const LOAD = 'balances/LOAD';
const ADD = 'balances/ADD';
const CHANGE = 'balances/CHANGE'

const loadBalances = balances => {
    return {
        type: LOAD,
        balances
    };
};

const addBalance = balance => {
    return {
        type: ADD,
        balance
    }
}

const changeBalances = balances => {
    return {
        type: CHANGE,
        balances
    }
}

export const getBalances = () => async(dispatch) => {
    const response = await fetch('/api/accounts');
    if (response.ok) {
        const balances = await response.json();
        dispatch(loadBalances(balances));
        return balances;
    } else {
        const data = await handleResponse(response);
        return data;
    }
}

export const createBalance = (payload) => async(dispatch) => {
    const response = await fetch('/api/accounts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const balance = await response.json();
        dispatch(addBalance(balance));
        return balance;
    } else {
        const data = await handleResponse(response);
        return data;
    }
}

export const updateBalances = () => async(dispatch) => {
    const response = await fetch('/api/accounts', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const balances = await response.json();
        dispatch(changeBalances(balances));
        return balances;
    } else {
        const data = await handleResponse(response);
        return data;
    }
}

const balancesReducer = (state={}, action) => {
    let newState = { ...state };
    switch(action.type) {
        case LOAD:
            action.balances.forEach(balance => {
                newState[balance.payer] = balance;
            });
            return newState;
        case ADD:
            newState[action.balance.payer] = action.balance;
            return newState;
        case CHANGE:
            action.balances.forEach(balance => {
                newState[balance.payer].points += balance.points;
            });
            return newState;
        default:
            return newState;
    }
}

export default balancesReducer;
