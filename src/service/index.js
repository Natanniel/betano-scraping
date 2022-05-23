const Registro = require('./../model/registro');

const insert = async (registro) => {
  try{
    await Registro.create(registro);
    return true;
  }catch(err){
    console.error(err);
    return false;
  }
};

module.exports = {insert};