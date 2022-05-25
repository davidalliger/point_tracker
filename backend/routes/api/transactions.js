const express = require('express');
const asyncHandler = require('express-async-handler');
const { Transaction, Account } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation.js');
const { check } = require('express-validator');

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

const checkNotInFuture = (req, res, next) => {
    let notInFuture = true;
    const { timestamp } = req.body;
    const dateTime = new Date(timestamp);
    const today = new Date();
    if (dateTime > today) {
        notInFuture = false;
    }
    req.body.notInFuture = notInFuture;
    next();
}

const validateTransaction = [
    check('payer')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a payer name.')
        .if(check('payer').exists({checkFalsy: true}))
        .isLength({ max: 100 })
        .withMessage('Payer name must be 100 characters or less.'),
    check('points')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a point amount.')
        .if(check('points').exists({ checkFalsy: true }))
        .isInt()
        .withMessage('Point amount must be an integer.'),
    check('timestamp')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a date and time.'),
    check('notInFuture').custom((value) => {
            if (value === false) {
                throw new Error('Transaction date and time cannot be in the future.');
            } else {
                return true;
            }
        }),
    handleValidationErrors
];

router.post('/', checkNotInFuture, validateTransaction, asyncHandler(async(req, res) => {
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
