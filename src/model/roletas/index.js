const mongoose = require('mongoose');

const RegistroSchema = new mongoose.Schema({
  status: Number,
  nome: String,
  roletas: [{
    nome: String,
    url :String
  }]
}, {
  timestamps: {
    createdAt: 'timestamp'
  }
});

const Registro = mongoose.model('roletas', RegistroSchema);

module.exports = Registro;