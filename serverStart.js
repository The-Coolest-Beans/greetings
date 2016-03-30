var express = require('express');
//var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./database/db.js'); // connect server to database

var app = express();
var serverPort = 3000;
var morgan = require('morgan'); //This tells the server to log all requests to the console.
app.use(morgan('combined'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies
// require('./tokenCheck');

var checkToken = function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, tokenSecret, function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
};

//when some calls that url , give them this file
var templates = require('./routes/templates');//folder of file
app.use('/api/templates', templates);//url called

var users = require('./routes/users');
app.use('/api/users', users);

var auth = require('./routes/auth');
app.use('/auth', auth);

var cards = require('./routes/cards');
app.use('/api/cards', cards);

var secureAccessTest = require('./routes/secureAccessTest');
app.use('/api/secureAccessTest', secureAccessTest);

var connection_test = require('./routes/connection_test');
app.use('/api/contest', connection_test);
//Serve all files from the public directory.
app.use(express.static(process.cwd() + '/public'));

console.log('Express server listening on port ' + serverPort);
app.listen(serverPort);
