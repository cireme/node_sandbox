/* Imports */
const DBManager = require('./db-manager');
const ProductRepository = require('./repositories/product-repository');
const express = require('express');
const exphbs = require('express-handlebars');
const { response } = require('express');

/* Server & Templating configuration */
const app = express();

app.engine('hbs', exphbs({
    extname: '.hbs'
}));

app.use(express.static('public'));

app.set('view engine', 'hbs');

/* Routes definition */
const dbManager = new DBManager();
const productRepository = new ProductRepository(dbManager);

app.get('/', function (req, res) {
    productRepository.findAll().then((products => {
        res.render('home', {
            products
        });
    }));
});

app.get('/search', function (req, res) {
    const search = req.query.search;

    if(!search) {
        throw new Error('missing search parameter');
    }

    productRepository.searchByName(search).then((products => {
        res.send(products);
    }));
});

app.listen(3000, () => {
    console.log('The web server has started on port 3000');
});