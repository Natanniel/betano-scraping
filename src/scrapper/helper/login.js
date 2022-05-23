const user = require('../../entity/user');
const puppeteer = require('puppeteer');

const logar = async (iframe) => {
  const frame = await iframe.contentFrame();

  await frame.waitForSelector('#username');
  await frame.type('#username', user.email);

  await frame.waitForSelector('#password');
  await frame.type('#password', user.password);

  await frame.click('button[data-msgid="LOGIN"]');
}

module.exports = {logar};