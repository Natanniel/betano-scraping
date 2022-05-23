const mongoose = require('mongoose');

const RegistroSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  value: Number,
  roulette: String,
  type: String,
}, {
  timestamps: {
    createdAt: 'timestamp'
  }
});

const Registro = mongoose.model('Registro', RegistroSchema);

module.exports = Registro;