const mongoose = require('mongoose');

const RegistroSchema = new mongoose.Schema({
  status: Number,
  nome: String,
  roletas: [{
    nome: String,
    resultados: [{
      numero: String
    }]
  }]
}, {
  timestamps: {
    createdAt: 'timestamp'
  }
});

const Registro = mongoose.model('roletas', RegistroSchema);

module.exports = Registro;