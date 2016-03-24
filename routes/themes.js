var express = require('express');//using express module
var router = express.Router();//
var templates = require('../database/models/cardTemplates.js'); // get cardTemplates table from database

//Include this module if you want the route secured -- i.e. user must be logged in.
//var authCheck = require('./authCheck');
//router.use(authCheck);

router.get('/', function(req, res, next) {
  
  templates.findAll({
  		attributes: { exclude: ['createdAt', 'deletedAt', 'updatedAt'] }
	}).then(function (cardTemplates) {
		res.send(cardTemplates);
	});
  /*res.send([
    {name:'Happy Birthday', defaultText:'Happy Birthday!', mainColor: 'yellow', accentColor: 'teal'},
    {name:'Leap Day', defaultText:'Happy Leap Day!!!!', mainColor: 'blue', accentColor: 'yellow'},
    {name:'St. Patrick\'s Day', defaultText:'Happy St. Patrick\'s Day!', mainColor: 'green', accentColor: 'gold' },
  ]);*/
});

module.exports = router;
