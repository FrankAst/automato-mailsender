var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema; 
var usermails = new Schema({
	mail : {type:String} ,
	opendate : {type : Date},
	sended: {type: Boolean, default: true},
	opensum: { type: Number, default: 0},
	clicksum: { type: Number, default: 0},
	content: {type: String}
});

module.exports = mongoose.model('usermails', usermails);