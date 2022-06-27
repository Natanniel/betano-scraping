const Roleta = require('./roleta');
const playtech = require('./roleta/playtech');
const evolution = require('./roleta/evolution');

function getPlaytechScrapper(name, url){
  const obj = getScrapper(name, url, playtech);
  return obj;
}

function getEvolutionScrapper(name, url){
  const obj = getScrapper(name, url, evolution);
  return obj;
}

function getScrapper(){
  const obj = new Roleta();
  return obj;
}

module.exports = {getScrapper};