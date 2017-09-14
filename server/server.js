var express = require('express');
var file = require('./files');
var router = express.Router();
var bodyParser = require('body-parser');
var morgan = require('morgan');
const app = express();
var path =require('path');
var Port = 3000;
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(morgan('dev'));

app.use(express.static('static/'))
var index = require('./routes/index')
app.use('/api', index)


app.get('*', (req, res) => {
	console.log(req.query)
	res.sendFile('index.html', { root: path.join(__dirname, '../static') });
})
// http://localhost:3000/api/getimage
// abracadabra123456---
app.listen(Port, () => {
   console.log('Test server running on '+Port);
});

module.exports = app