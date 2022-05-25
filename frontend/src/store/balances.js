import { handleResponse } from "../utils";

const LOAD = 'balances/LOAD';
const TOTAL = 'balances/TOTAL';
const CHANGE = 'balances/CHANGE';
const TRANSACTION = 'balances/TRANSACTION';

const loadBalances = payload => {
    return {
        type: LOAD,
        payload
    };
};

const loadTotal = payload => {
    return {
        type: TOTAL,
        payload
    }
}

const changeBalances = balances => {
    return {
        type: CHANGE,
        balances
    }
}

export const transactionBalances = transaction => {
    return {
        type: TRANSACTION,
        transaction
    }
}

export const getBalances = () => async(dispatch) => {
    const response = await fetch('/api/accounts');
    if (response.ok) {
        const payload = await response.json();
        dispatch(loadBalances(payload));
        return payload;
    } else {
        const data = await handleResponse(response);
        return data;
    }
}

export const getTotal = () => async(dispatch) => {
    const response = await fetch('/api/accounts/total');
    if (response.ok) {
        const payload = await response.json();
        dispatch(loadTotal(payload));
        return payload;
    } else {
        const data = await handleResponse(response);
        return data;
    }
}

export const updateBalances = (payload) => async(dispatch) => {
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
            newState['balances'] = action.payload;
            return newState;
        case TOTAL:
            newState['totalPoints'] = action.payload;
            return newState;
        case CHANGE:
            action.balances.forEach(account => {
                newState.balances[account.payer] += account.points;
            });
            return newState;
        case TRANSACTION:
            if (newState['balances']) {
                if (newState['balances'][action.transaction.payer]) {
                    newState['balances'][action.transaction.payer] += action.transaction.points;
                } else {
                    newState['balances'][action.transaction.payer] = action.transaction.points;
                }
            } else {
                newState['balances'] = {};
                newState['balances'][action.transaction.payer] = action.transaction.points;
            }
            newState['totalPoints'] += action.transaction.points;
            return newState;
        default:
            return newState;
    }
}

export default balancesReducer;
