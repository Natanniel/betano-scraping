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
  let repeticoes = 49

  while (true) {
    repeticoes = repeticoes + 1;

    if (repeticoes == 50) {
      let button = await page.$('.lobby-category__slide:nth-child(3)')
      await button.click();
      await new Promise(resolve => setTimeout(resolve, 5000));

      button = await page.$('.lobby-category__slide:nth-child(2)')
      await button.click();


      await new Promise(resolve => setTimeout(resolve, 5000));

      repeticoes = 0;
    }
    let roletas = [];

    try {
      roletas = await page.$$('.lobby-tables__item')
    }catch{
      console.log("PROBLEMA CRITICO AO PEGAR AS ROLETAS")
    }
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
          let existeNoFor = false
          for (let i = 0; i < resultados.length; i++)
            if (resultados[i].split('-')[0] == nomeRoleta) {
              resultados[i] = nomeRoleta + '-' + v1 + v2 + v3 + v4 + v5;
              existeNoFor = true;
            }

          if (existeNoFor == false) {
            resultados.push(nomeRoleta + '-' + v1 + v2 + v3 + v4 + v5)
          }



          let Roleta = await Roletas.findOne({ 'roletas.nome': nomeRoleta });

          if (Roleta != null) {
            try {

              for (let i = 0; i < Roleta.roletas.length; i++) {

                if (Roleta.roletas[i].nome == nomeRoleta)
                  Roleta.roletas[i].resultados.push({ numero: v1 })

              }

              await Roleta.save()
            } catch (e) {
              // declarações para manipular quaisquer exceções
              console.log(e); // passa o objeto de exceção para o manipulador de erro
            }
          } else {
            if (nomeRoleta.length > 3) {
              Roleta = await Roletas.findOne({ 'nome': 'Playtech' });
              Roleta.roletas.push({
                nome: nomeRoleta,
                roletas: []
              })
              await Roleta.save()
            }
          }




        }


        /*  Roleta Brasileira - 143251813
            - 26035610
            - 302416
          Quantum Roulette Live - 342913435
            - 26261511
          Football Roulette - 2413311815
          Speed Roulette - 19035160
          American Roulette - 332836325
          Roulette - 8276357
          Prestige Roulette - 5249216
          Spread Bet Roulette - 18111227
          Quantum Auto Roulette - 32261615
          UK Roulette - 303353631
          Deutsches Roulette - 420342513
          Roulette Italiana - 0228331
          Hindi Roulette - 3276013
          Greek Roulette - 23535269
          Turkish Roulette - 1624191218
          Football French Roulette - 157273115
          French Roulette - 8276357
          Bucharest Roulette - 101232730
          Bucharest French Roulette - 101232730
          Greek Quantum Roulette - 19933333
          Auto Roulette - 163229230
          Speed Auto Roulette - 12824331
            - 303192426
  */


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

async function teste() {

  //let Rolet = new Roletas({
  //  status: 1,
  //  nome: 'Playtech',
  //})

  //await Rolet.save();

  // console.log("Salvouy")

  let Roleta = await Roletas.findOne({ 'roletas.nome': 'Bucharest Roulette' });

  if (Roleta != null) {
    try {
      Roleta.roletas[0].resultados.push({ numero: 1 })
      console.log(Roleta.roletas[0].resultados)
      await Roleta.save()
    } catch (e) {
      // declarações para manipular quaisquer exceções
      console.log(e); // passa o objeto de exceção para o manipulador de erro
    }
  } else {


    console.log(Roleta)
    //  status: Number,
    // nome: String,
    // roletas: [{
    //   nome: String,
    //  resultados: [{
    //   numero: String
    // }]
    // }]
    //

    //  Roleta = new Roletas({

    //})
  }
}
//teste();