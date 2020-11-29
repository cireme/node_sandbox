const DBManager = require('./db-manager');
const express = require('express');
const exphbs = require('express-handlebars');
const { response } = require('express');

const app = express();
const dbManager = new DBManager();

app.engine('hbs', exphbs({
    extname: '.hbs'
}));

app.use(express.static('public'));

app.set('view engine', 'hbs');

app.get('/', function (req, res) {
    let query = "select * from products";

    dbManager.db.query(query, function (err, result) {
        if (err) { throw err };

        res.render('home', {
            products: result
        });
    });
});

app.get('/search', function (req, res) {
    let query = "select * from products";
    const search = req.query.search;

    console.log(search);

    if(search) {
        query += ' where productName like "%' + search + '%"';
    } else {
        throw new Error('missing search parameter');
    }

    dbManager.db.query(query, function (err, result) {
        if (err) { throw err };

        res.send(result);
    });
});

app.listen(3000, () => {
    console.log('The web server has started on port 3000');
});