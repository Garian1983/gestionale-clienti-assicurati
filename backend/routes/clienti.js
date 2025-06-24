const express = require('express');
const Cliente = require('../models/Cliente');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  const clienti = await Cliente.find({ owner: req.user._id }).sort({ createdAt: -1 });
  res.json(clienti);
});

router.post('/', async (req, res) => {
  try {
    const cliente = new Cliente({ ...req.body, owner: req.user._id });
    await cliente.save();
    res.status(201).json(cliente);
  } catch (err) {
    res.status(400).json({ message: 'Errore nel salvataggio', error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!cliente) return res.status(404).json({ message: 'Cliente non trovato' });
    res.json({ message: 'Cliente eliminato' });
  } catch (err) {
    res.status(500).json({ message: 'Errore del server' });
  }
});

module.exports = router;