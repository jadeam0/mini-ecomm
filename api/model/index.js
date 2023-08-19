const Users = require('./users');
const Products = require('./products');

// Export all objects
module.exports = {
    users: new Users(),
    Products: new Products()
}