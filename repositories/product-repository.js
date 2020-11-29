class ProductRepository {

    constructor(dbManager) {
        this._dbManager = dbManager;
    }

    findAll() {
        return this._dbManager.query('select * from products');
    }

    searchByName(text) {
        return this._dbManager.query('select * from products where productName like "%' + text + '%"');
    }
}

module.exports = ProductRepository;
