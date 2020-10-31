const express = require('express')
const app = express()
const port = 3000

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
    const products = [
        {id: '1', name: 'Product 1', price: 38.0, description: 'abc'},
        {id: '2', name: 'Product 2', price: 8.0, description: 'abc'},
        {id: '3', name: 'Product 3', price: 3.0, description: 'abc'}
    ];
    res.send(products);
})

app.post('/creators', async (req, res) => {
    console.log(req.body);
    const scrapeData = await scraper.scrapeWebsite(req.body.channelURL);
    console.log(scrapeData);
    
    res.send('success');
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))