const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let DesenvolvedorSchema = new Schema({
  status: Number,
  nome: String,
  roletas: [{
    nome: String,
    resultados: [{
      numero: String
    }]
  }]
}, { timestamps: true });

// Export the model
module.exports = mongoose.model("roletas", DesenvolvedorSchema);
