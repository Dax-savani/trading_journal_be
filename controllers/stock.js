const express = require('express');
const stockRouter = express.Router();
const StockTrade = require('../models/stockTrade');
const handleError = require("../helpers/handleError");

stockRouter.post('/', async (req, res) => {
    try {
        const {
            stock_name,
            date_and_time,
            qty,
            side,
            entry_price,
            stop_loss,
            target,
            exit_price,
            learning_from_trade,
            mistake,
            rate,
            profit_or_loss,
            playbook_id
        } = req.body;

        const user_id = req.user.id;

        const newStockTrade = await StockTrade.create({
            stock_name,
            date_and_time,
            qty,
            side,
            entry_price,
            stop_loss,
            target,
            exit_price,
            learning_from_trade,
            mistake,
            rate,
            profit_or_loss,
            user_id,
            playbook_id,
        });

        return res.status(201).json({
            message: 'Stock trade created successfully',
            stockTrade: newStockTrade,
        });
    } catch (error) {
        handleError(error, res);
    }
});

stockRouter.get('/', async (req, res) => {
    try {
        const { playbookId } = req.query;
        const user_id = req.user.id;
        const stockTrades = playbookId
            ? await StockTrade.findAll({
                where: {
                    user_id: user_id,
                    playbook_id: playbookId
                }
            })
            : await StockTrade.findAll({
                where: {
                    user_id: user_id
                }
            });
        return res.status(200).json(stockTrades);
    } catch (error) {
        handleError(error, res);
    }
});

stockRouter.get('/:id', async (req, res) => {
    const {id} = req.params;
    const user_id = req.user.id;
    try {
        const stockTrade = await StockTrade.findOne({
            where: {
                id: id,
                user_id: user_id
            }
        });
        if (!stockTrade) {
            return res.status(404).json({
                message: `Stock trade with ID ${id} not found or not owned by you`,
            });
        }
        return res.status(200).json(stockTrade);
    } catch (error) {
        handleError(error, res);
    }
});

stockRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {
        stock_name,
        date_and_time,
        qty,
        side,
        entry_price,
        stop_loss,
        target,
        exit_price,
        learning_from_trade,
        mistake,
        rate,
        profit_or_loss,
        playbook_id
    } = req.body;

    const user_id = req.user.id;

    try {
        const stockTrade = await StockTrade.findOne({
            where: {
                id: id,
                user_id: user_id
            }
        });
        if (!stockTrade) {
            return res.status(404).json({
                message: `Stock trade with ID ${id} not found or not owned by you`,
            });
        }
        await stockTrade.update({
            stock_name,
            date_and_time,
            qty,
            side,
            entry_price,
            stop_loss,
            target,
            exit_price,
            learning_from_trade,
            mistake,
            rate,
            profit_or_loss,
            user_id,
            playbook_id,
        });

        return res.status(200).json({
            message: 'Stock trade updated successfully',
            stockTrade,
        });
    } catch (error) {
        handleError(error, res);
    }
});

stockRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id;
    try {
        const stockTrade = await StockTrade.findOne({
            where: {
                id: id,
                user_id: user_id
            }
        });
        if (!stockTrade) {
            return res.status(404).json({
                message: `Stock trade with ID ${id} not found or not owned by you`,
            });
        }
        await stockTrade.destroy();
        return res.status(200).json({
            message: 'Stock trade deleted successfully',
        });
    } catch (error) {
        handleError(error, res);
    }
});

module.exports = stockRouter;
