const express = require('express');
const asyncHandler = require('express-async-handler');
const { Account, Transaction } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async(req, res) => {
    const accounts = await Account.findAll().map(account => {
        return {
            payer: account.payer,
            points: account.points
        }
    });
    const totalPoints = accounts.reduce((sum, account) => {
        sum += account.points;
        return sum;
    }, 0);
    return res.json({ accounts, totalPoints });
}));

router.post('/', asyncHandler(async(req, res) => {
    const {
        payer,
        points
    } = req.body;

    const account = await Account.create({
        payer,
        points
    });

    const response = {
        payer: account.payer,
        points: account.points
    };

    return res.json(response);
}));

router.put('/', asyncHandler(async(req, res) => {
    let { points } = req.body;

    const transactions = await Transaction.findAll({
        order: [['timestamp','ASC']]
    });
    console.log(transactions);

    const response = [];

    transactions.array.forEach(transaction => {
        const account = await Account.findOne({
            where: {
                id: transaction.accountId
            }
        });
        if (transaction.remaining > 0) {
            if (transaction.remaining >= points) {
                await Transaction.update({
                    remaining: transaction.remaining - points
                },
                { where: {
                    id: transaction.id
                }});
                const newTransaction = await Transaction.create({
                    accountId: transaction.accountId,
                    points: -points,
                    remaining: 0,
                    timestamp: Date.now()
                });
                response.push({
                    payer: account.payer,
                    points: newTransaction.points
                });
                await Account.update({
                    points: account.points - points
                },
                {
                    where: {
                        id: account.id
                    }
                });
            } else {
                await Account.update({
                    points: account.points - transaction.remaining
                },
                {
                    where: {
                        id: account.id
                    }
                });
                const newTransaction = await Transaction.create({
                    accountId: transaction.accountId,
                    points: -transaction.remaining,
                    remaining: 0,
                    timestamp: Date.now()
                });
                response.push({
                    payer: account.payer,
                    points: newTransaction.points
                });
                await Transaction.update({
                    remaining: 0
                },
                { where: {
                    id: transaction.id
                }});
            }
        }
    })

    return res.json(response);
}));
