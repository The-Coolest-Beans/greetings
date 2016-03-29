var express = require('express');
var router = express.Router();

//Include this module if you want the route secured -- i.e. user must be logged in.
var authCheck = require('./authCheck');
router.use(authCheck);

router.get('/', function(req, res, next) {
  res.send([
    req.decoded, //This is the logged in user object. Cached from when 1st logged in
    {name:'Mittens', desc:'tan', age: 3, weight: 1.25},
    {name:'Claws', desc:'white', age: 7, weight: 3.5},
    {name:'La Muerta Negra', desc:'spotted', age: 1000, weight: 2.5},
  ]);
});

module.exports = router;
