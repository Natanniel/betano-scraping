const puppeteer = require("puppeteer");
const { logar } = require('../helper/login');

class Scrapper {
  constructor() {
    this.name = '';
    this.url = '';
    this.page = null;
    this.lastAnalyze = [];
    this.method = '';
    this.iteration = 0;
  }

  async init(page) {
    this.page = page;
    let button = await page.waitForSelector("a[data-msgid='LOGIN']");
    button.click();

    //let input = await page.waitForSelector("#username");
    //await input.click()
    await new Promise(resolve => setTimeout(resolve, 3000));
    await page.keyboard.type('natanniel95');
    await page.keyboard.press('Tab');
    await page.keyboard.type('Q2aw3@se4');
    await page.keyboard.press('Enter');
    await new Promise(resolve => setTimeout(resolve, 5000));
    await page.goto("https://br.betano.com/casino/live/");
    await new Promise(resolve => setTimeout(resolve, 5000));

    button = await page.waitForSelector(".games-list-container .games-list .game-grid article a");
    await button.click()

    await new Promise(resolve => setTimeout(resolve, 10000));
   

    //sidebar-buttons li
    //console.log(frame)
    let esperandoRoletas = true

    let iframe = await page.$('iframe');
    iframe = await iframe.getProperty('src')
    iframe = await iframe.jsonValue()
    await page.goto(iframe);
   
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    button = await page.$('.sidebar-buttons li')
    button.click();

    await new Promise(resolve => setTimeout(resolve, 2000));
    button = await page.$('.main-menu li')
    button.click();
    
    return this;
  }

  //Status
  // -1 - Error
  //  0 - updated
  //  1 - nonUpdated
  async analyze() {
    /*  await this.page.bringToFront();
      
      if(await this.page.url() !== this.url || this.iteration > 20){
        this.iteration = 0;
        await this.init(this.page);
        return{
          roleta : this.name,
          value : "Indefinido",
          status : -1
        };
      }
  
      const hasNoAccess = await this.page.evaluate(() => document.querySelector('#my-account-modal iframe') !== null);
      if(hasNoAccess){
        const elementHandle = await this.page.$('iframe[src="/casino/myaccount/login"]',);
        await logar(elementHandle);
        return {
          roleta : this.name,
          value : "Indefinido",
          status : -1
        };
      }
  
      const history = (await this.page.$('.game-play-desktop-split-window-container__window iframe.game-play-providers')) || null;
      if(history === null){
        return{
          roleta : this.name,
          value : "Indefinido",
          status : -1
        };
      }
    
      const frame = await history.contentFrame();
      const values = await this.method(frame);
      if(values == []){
        return{
          roleta : this.name,
          value : "Indefinido",
          status : -1
        };
      }
      let status = 1;
      const equals = (a, b) => a.length === b.length && a.every((v, i) => v == b[i]);
  
      if(!equals(this.lastAnalyze, values)){
        status = 0;
        this.iteration++;
      }
  
      const [value] = values;
      this.lastAnalyze = values;
      return {
        roleta : this.name,
        value,
        status
      }*/
  }

}

module.exports = Scrapper; 