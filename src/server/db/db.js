var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/shop');

var Shop = mongoose.model('Shop', {
 
});

module.exports.Shop = Shop;
