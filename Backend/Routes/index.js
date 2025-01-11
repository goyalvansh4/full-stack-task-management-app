const auth = require('./Auth/auth.routes');
const menu = require('./Menu/menu.routes');
const order = require('./Order/order.routes');

module.exports = {
    auth,
    menu,
    order
};