"use strict";

const browserInstance = require("./browser");
const { logar } = require("./controller");
const connect = require('./database/mongodb');

async function main() {
  const browser = await browserInstance();
  const page = (await browser.pages())[0] // Pegando a re

  await page.setDefaultNavigationTimeout(0);
  await page.goto('https://br.betano.com/', { delay: 1000 })

  let roletasPlaytech = [];
  let roletasEvolution = [];

  await logar(page)


  while (true) {

    console.log('teste')
    let roletas = await page.$$('.lobby-tables__item')

    for (const roleta of roletas) {

      try {

        const nomeRoleta = await roleta.$eval('.lobby-table__footer div', el => el.innerText);
        console.log(nomeRoleta)
        resultados = await roleta.$$('.lobby-table__body');


        console.log(resultados)


      } catch {

      }
    }

    await new Promise(resolve => setTimeout(resolve, 60000));

  }

  /*
  const Registro = require('./model/roletas');
  let roletas = await Registro.find({});
 
  for (let index = 0; index < roletas.length; index++) {
    
    //if (roletas[index].nome = 'Playtech')
    //  buffer.playtech = roletas[index].roletas;
    if (roletas[index].nome == 'Evolution'){
      roletasEvolution = roletas[index].roletas;
    }
  }

  console.log(roletasEvolution);



  for (let i = 0; i < roletasPlaytech.length; i++) {
    const roleta = roletasPlaytech[i];
    const page = i === 0 ? (await browser.pages())[0] : await browser.newPage();
    const scrapper = await controller(page, getPlaytechScrapper(roleta.nome, roleta.url));
    buffer.playtech.push(scrapper);
  }

  for (let i = 0; i < roletasEvolution.length; i++) {
    const roleta = roletasEvolution[i];
    const page = await browser.newPage();
    const scrapper = await controller(page, getEvolutionScrapper(roleta.nome, roleta.url));
    buffer.evolution.push(scrapper);
  } */

  // await new Promise(resolve => setTimeout(resolve, 15000));

  // await scanner(buffer);
}

async function scanner(buffer) {

  console.info(`Scanner: `);
  while (true) {
    buffer.playtech.forEach(async roleta => {
      const analyze = await roleta.analyze();
      const response = {
        roulette: analyze.roleta.toUpperCase().replaceAll(' ', '-'),
        value: analyze.value,
        type: 'Playtech'
      }
      if (analyze.status === 0) {
        console.log(response);
        insert(response);
      }
    });
    buffer.evolution.forEach(async roleta => {
      const analyze = await roleta.analyze();
      console.log(analyze)
      const response = {
        roulette: analyze.roleta.toUpperCase().replaceAll(' ', '-'),
        value: analyze.value,
        operador: 'Evolution'
      }
      if (analyze.status === 0) {
        console.log(response);
        insert(response);
      }
    });
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
}

connect();
main();