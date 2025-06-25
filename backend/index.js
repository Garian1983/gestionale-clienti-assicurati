require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const clientiRoutes = require('./routes/clienti');

const app = express();

// ✅ CORS configurato per accettare richieste dal frontend Netlify
app.use(cors({
  origin: 'https://gestionaleclientiassicurati.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Connessione a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connessione a MongoDB riuscita'))
  .catch(err => console.error('❌ Errore connessione MongoDB:', err));

// Rotte
app.use('/api/auth', authRoutes);
app.use('/api/clienti', clientiRoutes);

// Avvio server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server attivo sulla porta ${PORT}`));
