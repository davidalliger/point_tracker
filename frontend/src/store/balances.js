import { handleResponse } from "../utils";

const LOAD = 'balances/LOAD';
const TOTAL = 'balances/TOTAL';
const CHANGE = 'balances/CHANGE'

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

// export const createBalance = (payload) => async(dispatch) => {
//     const response = await fetch('/api/accounts', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//     });
//     if (response.ok) {
//         const balance = await response.json();
//         dispatch(addBalance(balance));
//         return balance;
//     } else {
//         const data = await handleResponse(response);
//         return data;
//     }
// }

export const updateBalances = (payload) => async(dispatch) => {
    const response = await fetch('/api/accounts', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    console.log('In thunk ', response);
    if (response.ok) {
        const balances = await response.json();
        console.log('In thunk ', balances);
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
            // if (!newState['totalPoints']) newState['totalPoints'] = 0;
            newState['balances'] = action.payload;
            // Object.keys(action.payload).forEach(payer => {
            //     newState['totalPoints'] += action.payload[payer];
            // });
            // action.payload.accounts.forEach(account => {
            //     newState.balances[account.payer] = account.points;
            //     newState['totalPoints'] += account.points;
            // });
            return newState;
        case TOTAL:
            newState['totalPoints'] = action.payload;
            return newState;
        case CHANGE:
            action.balances.forEach(account => {
                newState.balances[account.payer] += account.points;
                newState['totalPoints'] += account.points;
            });
            return newState;
        default:
            return newState;
    }
}

export default balancesReducer;
