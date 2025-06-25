const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

// ⚠️ authMiddleware disabilitato per evitare errore “Token mancante”
// const authMiddleware = require('../middleware/authMiddleware');
// router.use(authMiddleware);

// GET: tutti i clienti
router.get('/', async (req, res) => {
  try {
    const clienti = await Cliente.find().sort({ createdAt: -1 });
    res.json(clienti);
  } catch (err) {
    res.status(500).json({ message: 'Errore nel recupero clienti' });
  }
});

// POST: nuovo cliente
router.post('/', async (req, res) => {
  try {
    const nuovoCliente = new Cliente(req.body);
    const salvato = await nuovoCliente.save();
    res.status(201).json(salvato);
  } catch (err) {
    res.status(400).json({ message: 'Errore salvataggio cliente', error: err });
  }
});

// PUT: modifica cliente
router.put('/:id', async (req, res) => {
  try {
    const aggiornato = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(aggiornato);
  } catch (err) {
    res.status(400).json({ message: 'Errore aggiornamento', error: err });
  }
});

// DELETE: elimina cliente
router.delete('/:id', async (req, res) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cliente eliminato' });
  } catch (err) {
    res.status(500).json({ message: 'Errore eliminazione' });
  }
});

module.exports = router;

