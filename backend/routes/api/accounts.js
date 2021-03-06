const e = require('express');
const express = require('express');
const asyncHandler = require('express-async-handler');
const { Account, Transaction } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation.js');
const { check } = require('express-validator');

const router = express.Router();

router.get('/', asyncHandler(async(req, res) => {
    const accounts = {};
    const accountsArray = await Account.findAll()
    accountsArray.forEach(account => {
        if (account.points > 0) {
            accounts[account.payer] = account.points;
        } else {
            accounts[account.payer] = 0;
        }
    });
    return res.json(accounts);
}));

const calculateTotal = async() => {
    const accounts = await Account.findAll();
    const total = accounts.reduce((sum, account) => {
        sum += account.points;
        return sum;
    }, 0);
    return total;
}

router.get('/total', asyncHandler(async(req, res) => {
    let totalPoints = await calculateTotal();
    totalPoints = totalPoints > 0 ? totalPoints : 0;
    return res.json(totalPoints);
}));

const checkAgainstTotal = async(req, res, next) => {
    let exceedsTotal = false;
    const { points } = req.body;
    const total = await calculateTotal();
    if (points > total) {
        exceedsTotal = true;
    }
    req.body.exceedsTotal = exceedsTotal;
    next();
}

const validateSpend = [
    check('points')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a point amount')
        .if(check('points').exists({ checkFalsy: true }))
        .custom(value => Number(value) > 0)
        .withMessage('Point amount must be greater than 0.')
        .isInt()
        .withMessage('Point amount must be an integer.'),
        check('exceedsTotal').custom((value) => {
            if (value === true) {
                throw new Error('Point amount cannot exceed total points.');
            } else {
                return true;
            }
        }),
    handleValidationErrors
];

router.put('/', checkAgainstTotal, validateSpend, asyncHandler(async(req, res) => {
    let { points } = req.body;

    const transactions = await Transaction.findAll({
        include: [Account],
        order: [['timestamp','ASC']]
    });

    let count = 1;
    const rounds = {};
    const order = {};
    while (count <= transactions.length) {
        let round = 1;
        if (transactions[count - 1].points < 0) {
            if (order[transactions[count - 1].Account.payer]) {
                let deductPoints = Number(transactions[count - 1].points);
                    for (let i = 1; i <= order[transactions[count - 1].Account.payer].length; i++) {
                        if (Math.abs(deductPoints) >= Math.abs(rounds[i][order[transactions[count - 1].Account.payer][i - 1]])) {
                            deductPoints += Number(rounds[i][order[transactions[count - 1].Account.payer][i - 1]]);
                            rounds[i][order[transactions[count - 1].Account.payer][i - 1]] = 0;
                        } else {
                            rounds[i][order[transactions[count - 1].Account.payer][i - 1]] =
                                Number(rounds[i][order[transactions[count - 1].Account.payer][i - 1]]) + Number(deductPoints);
                            deductPoints = 0;
                        }
                    }
            }
        } else {
            if (order[transactions[count - 1].Account.payer]) {
                order[transactions[count - 1].Account.payer].push(count);
                round = order[transactions[count - 1].Account.payer].length;
                if (rounds[round]) {
                    rounds[round][count] = Number(transactions[count - 1].points);
                } else {
                    rounds[round] = {};
                    rounds[round][count] = Number(transactions[count - 1].points);
                }
            } else {
                order[transactions[count - 1].Account.payer] = [count];
                if (rounds[round]) {
                    rounds[round][count] = Number(transactions[count - 1].points);
                } else {
                    rounds[round] = {};
                    rounds[round][count] = Number(transactions[count - 1].points);
                }
            }
        }
        count++;
    }
    let currentRound = 1;
    const response = [];
    const roundCount = Object.keys(rounds);
    while (currentRound <= roundCount.length) {
        let currentCount = 1;
        while (currentCount <= transactions.length) {
            if (rounds[currentRound][currentCount]) {
                if (rounds[currentRound][currentCount] >= points) {
                    const account = await Account.findOne({
                        where: {
                            payer: transactions[currentCount - 1].Account.payer
                        }
                    });
                    await Account.update({
                        points: Number(account.points) - Number(points)
                    },
                    {
                        where: {
                            id: account.id
                        }
                    });
                    await Transaction.create({
                        accountId: account.id,
                        points: -points,
                        timestamp: Date.now()
                    });
                    response.push({
                        payer: account.payer,
                        points: -points
                    });
                    return res.json(response);
                } else {
                    points -= rounds[currentRound][currentCount];
                    const account = await Account.findOne({
                        where: {
                            payer: transactions[currentCount - 1].Account.payer
                        }
                    });
                    await Account.update({
                        points: Number(account.points) - Number(rounds[currentRound][currentCount])
                    },
                    {
                        where: {
                            id: account.id
                        }
                    });
                    await Transaction.create({
                        accountId: account.id,
                        points: -rounds[currentRound][currentCount],
                        timestamp: Date.now()
                    });
                    response.push({
                        payer: account.payer,
                        points: -rounds[currentRound][currentCount]
                    });
                }
                currentCount++;
            } else {
                if (currentRound + 1 <= roundCount.length) {
                    currentRound++;
                } else {
                    currentRound = 1;
                    currentCount++;
                }
            }
        }
        currentRound++
    }

    return res.json(response);
}));

module.exports = router;
