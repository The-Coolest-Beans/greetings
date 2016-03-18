var express = require('express');//using express module
var router = express.Router();//

//Include this module if you want the route secured -- i.e. user must be logged in.
//var authCheck = require('./authCheck');
//router.use(authCheck);

router.get('/', function(req, res, next){
  res.send([
    {id:0 , theme: 'Birthday'},
    {id:1 , theme: 'Valentine\'s Day'},
    {id:2 , theme: 'St. Patrick\'s Day'},

  ]);

})

.get('/:theme', function(req, res, next){

  var cards = [
    {id:0 , theme: 'Birthday'},
    {id:1 , theme: 'Valentine\'s Day'},
    {id:2 , theme: 'St. Patrick\'s Day'}
  ]
  var theme = req.params.theme;
  for( var i in cards){

    if(cards[i].theme === theme){
      res.send([
        cards[i]
      ]);

    }//closing if

  }//closing for

});//closing get


module.exports = router;
