const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');

const scraper = require('./scraper');
// const db = require('./db')

app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // disabled for security on local
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get('/creators', async (req, res) => {
    const products = req.body;
    console.log(req.body, 'get');
    res.send(products);
})

app.post('/creators', async (req, res) => {
    const scrapeData = await scraper.scrapeWebsite(req.body.channelURL);
    console.log(scrapeData, 'post');
    
    res.send(scrapeData);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))