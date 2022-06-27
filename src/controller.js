
const logar = async (page) => {

 // page = await page.contentFrame();
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
 
  let iframe = await page.$('iframe');
  iframe = await iframe.getProperty('src')
  iframe = await iframe.jsonValue()
  await page.goto(iframe);
 
  await new Promise(resolve => setTimeout(resolve, 10000));
  
  button = await page.$('.sidebar-buttons li')
  await button.click();

  await new Promise(resolve => setTimeout(resolve, 2000));
  button = await page.$('.main-menu li')
  await button.click();
  
  await new Promise(resolve => setTimeout(resolve, 5000));
}

module.exports = {logar};