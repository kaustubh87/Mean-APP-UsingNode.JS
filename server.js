var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var hostname = 'localhost';
var port = 8000;

var dishRouter = require('./dishRouter.js');
var promoRouter = require('./promoRouter.js');
var leaderRouter = require('./leaderRouter.js');

var app = express();
app.use(morgan('dev'));

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leadership', leaderRouter);

app.listen(port, hostname, function(){
  console.log('Server running at ' +hostname + ' and port no ' +port );
});
