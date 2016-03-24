var express = require('express');//using express module
var router = express.Router();
var users = require('../database/models/users.js'); // get users table from database

//Include this module if you want the route secured -- i.e. user must be logged in.
//var authCheck = require('./authCheck');
//router.use(authCheck);

router.get('/', function(req, res, next) {
	users.findAll({
  		attributes: { exclude: ['password'] }
	}).then(function (userList) {
		res.send(userList);
	});
	
  /*res.send([
    {name:'sarah95', lastLogin: 'Monday', sent: 12},
    {name:'scooper', lastLogin: 'Saturday', sent: 23},
    {name:'john_cena', lastLogin: 'Tuesday', sent: 61},
    {name:'bazinga', lastLogin: 'Tuesday', sent: 2},
    {name:'beans-r-chilled', lastLogin: 'Thursday', sent: 45},
  ]);*/

});

module.exports = router;
