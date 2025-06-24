const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nome: String,
  cognome: String,
  cellulare: String,
  tipologia: String,
  scadenza: Date,
  targa: String,
  frazionamento: String,
  dettaglio: String,
  note: String,
  massimale: String,
  attivita: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Cliente', ClienteSchema);