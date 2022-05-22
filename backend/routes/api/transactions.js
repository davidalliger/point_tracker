const express = require('express');
const asyncHandler = require('express-async-handler');
const { Transaction, Account } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async(req, res) => {
    const transactions = await Transaction.findAll({
        include: [Account]
    }).map(transaction => {
        return {
            payer: Account.payer,
            points: transaction.points,
            timestamp: transaction.timestamp
        }
    });
    return res.json(transactions);
}));

router.post('/', asyncHandler(async(req, res) => {
    const {
        payer,
        points,
        timestamp
    } = req.body;

    const account = await Account.findOne({
        where: {
            payer
        }
    });

    remaining = points > 0 ? points : 0;

    const transaction = await Transaction.create({
        accountId: account.id,
        points,
        remaining,
        timestamp
    });

    await Account.update({
        points: account.points + points
    },
    {
        where: {
            id: account.id
        }
    });

    const response = {
        payer: account.payer,
        points,
        timestamp
    };

    return res.json(response);
}));
