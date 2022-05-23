const puppeteer = require("puppeteer");
const {logar} = require('../helper/login');

class Scrapper{
  constructor(name, url, analyze){
    this.name = name;
    this.url  = url;
    this.page = null; 
    this.lastAnalyze = [];
    this.method = analyze;
    this.iteration = 0;
  }

  async init(page){
    this.page = page;
    console.log(`scrapper ${this.url}`);
    await page.setDefaultNavigationTimeout(0);
    await page.goto(this.url, {delay: 1000});
    
    const hasNoAccess = await page.evaluate(() => document.querySelector('#my-account-modal iframe') !== null);

    if(hasNoAccess){
      const elementHandle = await page.$('iframe[src="/casino/myaccount/login"]',);
      await logar(elementHandle);
    }

    await new Promise(resolve => setTimeout(resolve, 4000));
    return this;
  }

  //Status
  // -1 - Error
  //  0 - updated
  //  1 - nonUpdated
  async analyze(){
    await this.page.bringToFront();
    
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
    }
  }
}

module.exports = Scrapper; 