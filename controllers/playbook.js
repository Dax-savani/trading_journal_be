const express = require('express');
const Playbook = require('../models/playbook');
const handleError = require('../helpers/handleError');

const playbookRouter = express.Router();


playbookRouter.post('/', async (req, res) => {
    const { emoji, playbook_name, description, notes, criteria } = req.body;
    const user_id = req.user.id;
    try {
        const playbook = await Playbook.create({ emoji, playbook_name, description, notes, criteria, user_id });
        return res.status(201).json(playbook);
    } catch (error) {
        handleError(error, res);
    }
});


playbookRouter.get('/', async (req, res) => {
    try {
        const playbooks = await Playbook.findAll();
        return res.status(200).json(playbooks);
    } catch (error) {
        handleError(error, res);
    }
});


playbookRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const playbook = await Playbook.findByPk(id);
        if (!playbook) {
            return res.status(404).json({
                message: `Playbook with ID ${id} not found`,
            });
        }

        return res.status(200).json(playbook);
    } catch (error) {
        handleError(error, res);
    }
});


playbookRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { emoji, playbook_name, description, notes, criteria } = req.body;
    const user_id = req.user.id;
    try {
        const playbook = await Playbook.findByPk(id);
        if (!playbook) {
            return res.status(404).json({
                message: `Playbook with ID ${id} not found`,
            });
        }

        await playbook.update({ emoji, playbook_name, description, notes, criteria, user_id });
        return res.status(200).json({
            message: 'Playbook updated successfully',
            playbook,
        });
    } catch (error) {
        handleError(error, res);
    }
});


playbookRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const playbook = await Playbook.findByPk(id);
        if (!playbook) {
            return res.status(404).json({
                message: `Playbook with ID ${id} not found`,
            });
        }

        await playbook.destroy();
        return res.status(200).json({
            message: 'Playbook deleted successfully',
        });
    } catch (error) {
        handleError(error, res);
    }
});

module.exports = playbookRouter;
