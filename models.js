var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/mashup');

var imgSchema = mongoose.Schema({
	id: String,
	url: String,
	location: String,
	name: String,
	price: String,
	airbnbLink: String
});

var Img = mongoose.model('Img', imgSchema);

module.exports.Img = Img;