const mongoose = require('mongoose');

const connect = () => {
  //const uri = "mongodb+srv://cassino:cassino@cluster0.rjggj.mongodb.net/betano?retryWrites=true&w=majority";
   const uri = "mongodb://localhost:27017/betano";
  //const uri = " mongodb+srv://superuserprovision:Z5rUXK6Mm6DmHM6t@cluster0.vfchy.mongodb.net/betano?retryWrites=true&w=majority";

  try{
    mongoose.connect(
      uri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected"),
    );
  }catch(e) {
    console.error(e);
  }
}
module.exports = connect;