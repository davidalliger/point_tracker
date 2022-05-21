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
    const response = await fetch('/api/balances');
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
    const response = await fetch('/api/balances', {
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
    const response = await fetch('/api/balances', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const balances = await response.json();
        dispatch(loadBalances(balances));
        return balances;
    } else {
        const data = await handleResponse(response);
        return data;
    }
}

const balancesReducer = (state={}, action) => {
    let newState = {...state};
    switch(action.type) {
        case LOAD:
            //TODO
        case ADD:
            //TODO
        case CHANGE:
            //TODO
        default:
            return newState;
    }
}

export default balancesReducer;