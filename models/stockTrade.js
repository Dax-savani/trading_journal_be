const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfigSequelize');

const StockTrade = sequelize.define('StockTrade', {
    stock_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date_and_time: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    side: {
        type: DataTypes.ENUM('BUY', 'SELL'),
        allowNull: false,
    },
    entry_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    stop_loss: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    target: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    exit_price: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    learning_from_trade: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    mistake: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    rate: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    profit_or_loss: {
        type: DataTypes.ENUM('PROFIT', 'LOSS'),
        allowNull: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    playbook_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'playbooks',
            key: 'id',
        },
    },
}, {
    tableName: 'stock_trades',
    timestamps: true,
});

module.exports = StockTrade;
