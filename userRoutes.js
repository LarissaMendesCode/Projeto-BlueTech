const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Listar usuários
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Criar usuário
router.post('/', async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        const newUser = new User({ firstname, lastname, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Deletar usuário
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Editar usuário
router.put('/:id', async (req, res) => {
    const { firstname, lastname, email } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { firstname, lastname, email }, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


module.exports = router;
