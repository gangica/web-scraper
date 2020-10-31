const puppeteer = require('puppeteer');

async function scrapeWebsite(url) {
    const objs = [];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // const elmtProducts = await page.$x('//div[contains(@class, "item_prosp")]');
    // const products = await page.evaluate((...elmtProducts) => {
    //     return elmtProducts.map((e, i) => {
    //         objs[i] = {}
    //     });
    // }, ...elmtProducts)
    // console.log(products);

    const elmtNames = await page.$x('//*[@class="woocommerce-loop-product__title"]');  
    const names = await page.evaluate((...elmtNames) => {
        return elmtNames.map(e => e.innerText);
    }, ...elmtNames);

    const elmtPrices = await page.$x('//*[@class="woocommerce-Price-amount amount"]');
    const prices = await page.evaluate((...elmtPrices) => {
        return elmtPrices.map(e => e.innerText);
    }, ...elmtPrices);
    
    const elmtImg = await page.$x('//*[@class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"]');
    const imgs = await page.evaluate((...elmtImg) => {
        return elmtImg.map(e => e.src);
    }, ...elmtImg);

    // create object

    browser.close();

    return {names, prices, imgs};
}

// scrapeWebsite('https://suabottot.com/sua-tang-can-cho-be/');
module.exports = { scrapeWebsite };