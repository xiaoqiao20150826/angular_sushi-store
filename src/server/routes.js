var shopRoutes = require('server/shop/routes');

module.exports = function routes(app) {
    app.use('/shop', shopRoutes);
};