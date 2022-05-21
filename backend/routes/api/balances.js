const express = require('express');
const asyncHandler = require('express-async-handler');
const { Result } = require('express-validator');
const { Balance, Transaction } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async(req, res) => {
    const balances = await Balance.findAll();
    return res.json(balances);
}));

router.post('/', asyncHandler(async(req, res) => {
    const {
        payer,
        points
    } = req.body;

    const balance = await Balance.create({
        payer,
        points
    });

    const response = {
        payer: balance.payer,
        points: balance.points
    };

    return res.json(response);
}));

router.put('/', asyncHandler(async(req, res) => {
    let { points } = req.body;

    const transactions = await Transaction.findAll({
        order: [['timestamp','ASC']]
    });
    console.log(transactions);

    let round = 1;
    let count = 1;
    const rounds = {};
    const order = {};
    transactions.array.forEach(transaction => {
        if (transaction.points < 0) {
            if (order[transaction.payer]) {
                rounds[round[order[transaction.payer]]] = rounds[round[order[transaction.payer]]] - transaction.points;
            }
        } else {
            if (order[transaction.payer]) {
                round++;
                order[transaction.payer] = count;
                rounds[round[count]] = transaction.points;
            } else {
                order[transaction.payer] = count;
                rounds[round[count]] = transaction.points;
            }
            count++;
        }
    });
    let currentRound = 1;
    let currentCount = 1;
    const response = [];
    const numCount = Object.keys(rounds[currentRound]);
    while (currentCount <= numCount) {
        if (rounds[currentRound[currentCount]]) {
            if (rounds[currentRound[currentCount]] >= points) {
                const balance = await Balance.findOne({
                    where: {
                        payer: order[currentCount]
                    }
                });
                await Balance.update({
                    points: balance.points - points
                },
                {
                    where: {
                        id: balance.id
                    }
                });
                await Transaction.create({
                    balanceId: balance.id,
                    points: -points,
                    timestamp: Date.now()
                });
                response.push({
                    payer: balance.payer,
                    points: -points
                });
                return res.json(response);
            } else {
                points -= rounds[currentRound[currentCount]];
                const balance = await Balance.findOne({
                    where: {
                        payer: order[currentCount]
                    }
                });
                await Balance.update({
                    points: balance.points - rounds[currentRound[currentCount]]
                },
                {
                    where: {
                        id: balance.id
                    }
                });
                await Transaction.create({
                    balanceId: balance.id,
                    points: -rounds[currentRound[currentCount]],
                    timestamp: Date.now()
                });
                response.push({
                    payer: balance.payer,
                    points: -rounds[currentRound[currentCount]]
                });
            }
            count++;
        }
        round++
    }

    return res.json(response);
}));
