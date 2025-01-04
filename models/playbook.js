const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfigSequelize');

const Playbook = sequelize.define('Playbook', {
    emoji: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    playbook_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    // notes: {
    //     type: DataTypes.JSON,
    //     allowNull: true,
    // },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
}, {
    tableName: 'playbooks',
    timestamps: true,
});

module.exports = Playbook;
