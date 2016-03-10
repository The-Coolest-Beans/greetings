var express = require('express');//using express module
var router = express.Router();//

//Include this module if you want the route secured -- i.e. user must be logged in.
//var authCheck = require('./authCheck');
//router.use(authCheck);

router.get('/', function(req, res, next) {
  res.send([
    {theme:'Happy Birthday', date: '1/23/2007' },
    {theme:'Valentine\'s Day', date:'2/14/2015' },
    {theme:'St Patrick\'s Day', date:'3/14/2012' },
    {theme:'Anniversary', date:'6/23/2014'}
  ]);
});

module.exports = router;
