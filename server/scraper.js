const puppeteer = require('puppeteer');

async function scrapeWebsite(url) {
    let result = [];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const links = await page.$$eval('[class*="item_prosp"]', urls => {
        urls = urls.map(item => {
            return item.querySelector('div > a').href;
        })
        return urls;
    });
    
    const productDetail = (link) => new Promise(async(resolve, reject) => {
        const productPage = await browser.newPage();
        await productPage.goto(link);

        let name = await productPage.$eval('.product_title', name => name.innerText);
        let rating = await productPage.$eval('.woocommerce-product-rating .devvn_average_rate', rating => rating.innerText);
        let price = await productPage.$eval('.woocommerce-Price-amount', price => price.innerText);
        let desc = await productPage.$eval('.woocommerce-product-details__short-description', desc => desc.innerText);
        let img = await productPage.$eval('.woocommerce-product-gallery__wrapper img', img => img.src);

        resolve({ name, rating, price, desc, img });
        await productPage.close();

        reject(new Error('no'));
    });

    for (link in links) {
        let productData = await productDetail(links[link]);
        result.push(productData);
    }
    
    browser.close();
    // console.log('finished');

    return result;
}

// scrapeWebsite('https://suabottot.com/sua-tang-can-cho-nguoi-gay/');
module.exports = { scrapeWebsite };