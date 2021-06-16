const Transaction = require('../models/Transaction')

/**
 * @desc Get all transactions
 * @route GET /api/v1/transactions
 * @access Public
 */
exports.getTransactions = async (req, res, next) => {
    // res.send('GET transactions! ') // test
    try {
        const transactions = await Transaction.find();

        res.sendStatus(200)
        // .json({
        //     success: true,
        //     count: transaction.length,
        //     data: transactions
        // });
    } catch (error) {
        return res.sendStatus(500)
        // .json({
        //     success: false,
        //     error: 'Server Error!'
        // })
    }
}

/**
 * @desc Add transactions
 * @route POST /api/v1/transactions
 * @access Public
 */
 exports.addTransaction = async (req, res, next) => {
    // res.send('POST transactions! ') // test
    // try {
    //     const transactions = await Transaction.find();

    //     return res.status(200).json({
    //         success: true,
    //         count: transaction.length,
    //         data: transactions
    //     });
    // } catch (error) {
    //     return res.send(500).json({
    //         success: false,
    //         error: 'Server Error!'
    //     })
    // }
}

/**
 * @desc DELETE transactions
 * @route DELETE /api/v1/transactions/:id
 * @access Public
 */
 exports.deleteTransaction = async (req, res, next) => {
    // res.send('DELETE transactions! ') // test
    // try {
    //     const transactions = await Transaction.find();

    //     return res.status(200).json({
    //         success: true,
    //         count: transaction.length,
    //         data: transactions
    //     });
    // } catch (error) {
    //     return res.send(500).json({
    //         success: false,
    //         error: 'Server Error!'
    //     })
    // }
}