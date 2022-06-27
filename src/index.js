"use strict";

const browserInstance = require("./browser");
const { logar } = require("./controller");
const connect = require('./database/mongodb');
const Roletas = require('./model/roletas')

async function main() {
  const browser = await browserInstance();
  const page = (await browser.pages())[0] // Pegando a re

  await page.setDefaultNavigationTimeout(0);
  await page.goto('https://br.betano.com/', { delay: 1000 })

  await logar(page)

  let resultados = [];


  while (true) {


    let roletas = await page.$$('.lobby-tables__item')

    for (const roleta of roletas) {

      try {

        const nomeRoleta = await roleta.$eval('.lobby-table__footer div', el => el.innerText);
        const v1 = await roleta.$eval('.lobby-table__body div:nth-child(5) div:nth-child(1) div', el => el.innerText);
        const v2 = await roleta.$eval('.lobby-table__body div:nth-child(5) div:nth-child(2) div', el => el.innerText);
        const v3 = await roleta.$eval('.lobby-table__body div:nth-child(5) div:nth-child(3) div', el => el.innerText);
        const v4 = await roleta.$eval('.lobby-table__body div:nth-child(5) div:nth-child(4) div', el => el.innerText);
        const v5 = await roleta.$eval('.lobby-table__body div:nth-child(5) div:nth-child(5) div', el => el.innerText);

        let encontrado = false;

        for (let i = 0; i < resultados.length; i++)
          if (resultados[i] == (nomeRoleta + '-' + v1 + v2 + v3 + v4 + v5))
            encontrado = true


        if (encontrado == false) {

          for (let i = 0; i < resultados.length; i++)
            if (resultados[i].split('-')[0] == nomeRoleta)
              resultados[i] = nomeRoleta + '-' + v1 + v2 + v3 + v4 + v5

          let Roleta = await Roletas.findOne({ 'roletas.nome': nomeRoleta });

          if (Roleta != null) {
            Roleta.roletas[0].resultados.push({ numero: v1 })
            await Roleta.save()
          }

        }




      } catch (e) {
        // declarações para manipular quaisquer exceções
        console.log(e); // passa o objeto de exceção para o manipulador de erro
      }
    }

    await new Promise(resolve => setTimeout(resolve, 5000));

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