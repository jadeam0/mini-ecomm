const express = require('express');
const bodyParser = require('body-parser');
const route = express.Router();
const db = require('../config/index');


route.get('/products', (req, res) => {
    product.fetchproducts(req, res);
});

route.get('/product/:id', (req,res) => {
    product.fetchproduct(req, res);
});

route.post('/product', bodyParser.json(), (req, res) => {
    product.addProduct(req, res);
});

route.put('/product/:id', bodyParser.json(), (req, res) => {
    product.updateProduct(req, res);
});

route.delete('/product/:id', (req, res) => {
    product.deleteProduct(req, res);
});

module.exports = route;