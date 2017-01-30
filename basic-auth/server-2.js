var express = require('express');
var morgan = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);


var hostname = 'localhost';
var port = 5000;

var app = express();

app.use(morgan('dev'));
app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: true,
  resave: true,
  store: new FileStore()   //to keep track of sessions
}));


function auth (req,res,next){
  console.log(req.headers);

    if(!req.session.user){
        var authHeader = req.headers.authorization;
        if(!authHeader) {
          var err = new Error('You are not authenticated');
          err.status = 401;
          next(err);
          return;
        }

        var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
        var username = auth[0];
        var password = auth[1];

        if(username == 'admin' &&  password == 'password'){
          res.session.username = 'admin';
          next(); //authorized
        }
        else {
          var err = new Error('You are not authenticated');
          err.status = 401;
          next(err);
        }
      }
      else{
          if(req.session.username === 'admin'){
            console.log('req.session: ', req.session);
            next();
          }
          else{
            var err = new Error('You are not authenticated');
            err.status = 401;
            next(err);
          }
      }
}

app.use(auth);

app.use(express.static(__dirname + '/public'));

app.use(function(err,req,res,next){

      res.writeHead(err.status || 500, {
          'WWW-Authenticate' : 'Basic',
          'Content-Type' : 'text-plain'

      });
      res.end(err.message);

});

app.listen(port, hostname, function(){
  console.log('Server running at http://${hostname}');

});
