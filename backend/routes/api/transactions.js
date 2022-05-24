const express = require('express');
const asyncHandler = require('express-async-handler');
const { Transaction, Account } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async(req, res) => {
    const transactions = await Transaction.findAll({
        include: [Account]
    }).map(transaction => {
        return {
            payer: transaction.Account.payer,
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

    let account = await Account.findOne({
        where: {
            payer
        }
    });

    if (account) {
        await Account.update({
            points: Number(account.points) + Number(points)
        },
        {
            where: {
                id: account.id
            }
        });
    } else {
        account = await Account.create({
            payer,
            points: Number(points)
        });
    }

    await Transaction.create({
        accountId: account.id,
        points,
        timestamp
    });

    const response = {
        payer: account.payer,
        points,
        timestamp
    };

    return res.json(response);
}));

module.exports = router;
