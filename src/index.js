"use strict";

const browserInstance = require("./browser");
const controller = require("./controller");
const {getPlaytechScrapper, getEvolutionScrapper} = require("./scrapper");
const {roletasPlaytech, roletasEvolution} = require("./entity/roletas");
const {insert} = require('./service');
const connect = require('./database/mongodb');

async function main(){
  const browser = await browserInstance();
  const buffer  = {
    playtech: [],
    evolution: []
  };

  for(let i = 0; i < roletasPlaytech.length; i++){
    const roleta = roletasPlaytech[i];
    const page = i === 0 ? (await browser.pages())[0] : await browser.newPage() ;
    const scrapper = await controller(page, getPlaytechScrapper(roleta.name, roleta.url));
    buffer.playtech.push(scrapper);
  }

  for(let i = 0; i < roletasEvolution.length; i++){
    const roleta = roletasEvolution[i];
    const page = await browser.newPage() ;
    const scrapper = await controller(page, getEvolutionScrapper(roleta.name, roleta.url));
    buffer.evolution.push(scrapper);
  }

  await new Promise(resolve => setTimeout(resolve, 15000));

  await scanner(buffer);
}

async function scanner(buffer){

  console.info(`Scanner: `);
  while(true){
    buffer.playtech.forEach(async roleta => {
      const analyze = await roleta.analyze();
      const response = {
        roulette: analyze.roleta.toUpperCase().replaceAll(' ', '-'),
        value: analyze.value,
        type: 'playtech'
      }
      if(analyze.status === 0){
        console.log(response);
        insert(response);
      }
    });
    buffer.evolution.forEach(async roleta => {
      const analyze = await roleta.analyze();
      const response = {
        roulette: analyze.roleta.toUpperCase().replaceAll(' ', '-'),
        value: analyze.value,
        operador: 'evolution'
      }
      if(analyze.status === 0){
        console.log(response);
        insert(response);
      }
    });
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
}

connect();
main();