const puppeteer = require('puppeteer-extra');

async function start() {
    let browser;

    try {
        console.log("Abrindo navegador......");
        browser = await puppeteer.launch({
            headless: false,
            devtools: false,
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-web-security",
                "--disable-gpu",
                "--disable-dev-shm-usage",
                "--disable-features=IsolateOrigins,site-per-process",
            ],
            ignoreHTTPSErrors: true,
        });

    } catch (error) {
        console.log(error)
    }
    return browser;
}

module.exports = start