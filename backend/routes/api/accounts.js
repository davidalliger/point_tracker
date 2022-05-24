const e = require('express');
const express = require('express');
const asyncHandler = require('express-async-handler');
const { Account, Transaction } = require('../../db/models');

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
    // const totalPoints = accounts.reduce((sum, account) => {
    //     sum += account.points;
    //     return sum;
    // }, 0);
    return res.json(accounts);
}));

router.get('/total', asyncHandler(async(req, res) => {
    const accounts = await Account.findAll()
    let totalPoints = accounts.reduce((sum, account) => {
        sum += account.points;
        return sum;
    }, 0);
    totalPoints = totalPoints > 0 ? totalPoints : 0;
    return res.json(totalPoints);
}));

// router.post('/', asyncHandler(async(req, res) => {
//     const {
//         payer,
//         points
//     } = req.body;

//     const account = await Account.create({
//         payer,
//         points
//     });

//     const response = {
//         payer: account.payer,
//         points: account.points
//     };

//     return res.json(response);
// }));

router.put('/', asyncHandler(async(req, res) => {
    let { points } = req.body;

    const transactions = await Transaction.findAll({
        include: [Account],
        order: [['timestamp','ASC']]
    });
    // console.log(transactions);

    let round = 1;
    let count = 1;
    const rounds = {};
    const order = {};
    while (count <= transactions.length) {
        console.log('current transaction ', transactions[count - 1]);
        if (transactions[count - 1].points < 0) {
            if (order[transactions[count - 1].Account.payer]) {
                    rounds[round][order[transactions[count - 1].Account.payer]] = Number(rounds[round][order[transactions[count - 1].Account.payer]]) + Number(transactions[count - 1].points);
            }
        } else {
            if (order[transactions[count - 1].Account.payer]) {
                round++;
                order[transactions[count - 1].Account.payer] = count;
                rounds[round] = {};
                rounds[round][count] = Number(transactions[count - 1].points);
            } else {
                order[transactions[count - 1].Account.payer] = count;
                if (rounds[round]) {
                    rounds[round][count] = transactions[count - 1].points;
                } else {
                    rounds[round] = {};
                    rounds[round][count] = transactions[count - 1].points;
                }
            }
        }
        count++;
    }
    console.log(rounds);
    console.log(order);
    let currentRound = 1;
    let currentCount = 1;
    const response = [];
    const roundCount = Object.keys(rounds);
    while (currentRound <= roundCount.length) {
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
            }
            currentCount++;
        }
        currentRound++
    }

    return res.json({response: response});
}));


// router.put('/', asyncHandler(async(req, res) => {
//     let { points } = req.body;

//     const transactions = await Transaction.findAll({
//         order: [['timestamp','ASC']]
//     });
//     console.log(transactions);

//     const response = [];

//     transactions.forEach(async(transaction) => {
//         const account = await Account.findOne({
//             where: {
//                 id: transaction.accountId
//             }
//         });
//         if (transaction.remaining > 0) {
//             if (transaction.remaining >= points) {
//                 await Transaction.update({
//                     remaining: transaction.remaining - points
//                 },
//                 { where: {
//                     id: transaction.id
//                 }});
//                 const newTransaction = await Transaction.create({
//                     accountId: transaction.accountId,
//                     points: -points,
//                     remaining: 0,
//                     timestamp: Date.now()
//                 });
//                 response.push({
//                     payer: account.payer,
//                     points: newTransaction.points
//                 });
//                 await Account.update({
//                     points: account.points - points
//                 },
//                 {
//                     where: {
//                         id: account.id
//                     }
//                 });
//             } else {
//                 await Account.update({
//                     points: account.points - transaction.remaining
//                 },
//                 {
//                     where: {
//                         id: account.id
//                     }
//                 });
//                 const newTransaction = await Transaction.create({
//                     accountId: transaction.accountId,
//                     points: -transaction.remaining,
//                     remaining: 0,
//                     timestamp: Date.now()
//                 });
//                 response.push({
//                     payer: account.payer,
//                     points: newTransaction.points
//                 });
//                 await Transaction.update({
//                     remaining: 0
//                 },
//                 { where: {
//                     id: transaction.id
//                 }});
//             }
//         }
//     })

//     return res.json(response);
// }));

module.exports = router;
