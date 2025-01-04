const express = require('express');
const userRouter = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const handleError = require("../helpers/handleError");
const {generateToken} = require("../auth/jwt");


userRouter.post('/register', async (req, res) => {
    try {
        const { email, password, role, other_info } = req.body;

        const newUser = await User.create({
            email,
            password,
            role,
            other_info,
        });

        return res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
                other_info: newUser.other_info,
            },
        });
    } catch (error) {
        handleError(error, res);
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user?.id);
        res.cookie('token', token, { httpOnly: true });
        return res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        handleError(error, res);
    }
});


userRouter.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        handleError(error, res);
    }
});


userRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: `User with ID ${id} not found`,
            });
        }
        return res.status(200).json(user);
    } catch (error) {
        handleError(error, res);
    }
});


userRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { email, password, role, other_info } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: `User with ID ${id} not found`,
            });
        }

        await user.update({
            email,
            password,
            role,
            other_info,
        });

        return res.status(200).json({
            message: 'User updated successfully',
            user,
        });
    } catch (error) {
        handleError(error, res);
    }
});


userRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: `User with ID ${id} not found`,
            });
        }

        await user.destroy();
        return res.status(200).json({
            message: 'User deleted successfully',
        });
    } catch (error) {
        handleError(error, res);
    }
});

module.exports = userRouter;
