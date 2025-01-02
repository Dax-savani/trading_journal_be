const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfigSequelize');
const bcrypt = require('bcrypt');

const Users = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('ADMIN', 'USER'),
        allowNull: false,
        defaultValue: 'USER',
    },
    other_info: {
        type: DataTypes.JSON,
        allowNull: true,
    },
}, {
    tableName: 'users',
    timestamps: true,
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        },
    },
});

module.exports = Users;
