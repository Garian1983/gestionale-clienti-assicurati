require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const clientiRoutes = require('./routes/clienti');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connesso'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/clienti', clientiRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server in ascolto sulla porta ${PORT}`));