var express = require('express');//using express module
var router = express.Router();//

//Include this module if you want the route secured -- i.e. user must be logged in.
var authCheck = require('./authCheck');
router.use(authCheck);

var userCards = require('../database/models/userCards.js');//get user cards table from database

router.get('/', function(req, res, next){

  userCards.findAll({
    where: {
        ownerId:'sarah95',//all that match my ID
        deletedAt:null, //all that haven't been deleted
    }
  }).then(function (cardData){
    res.send(cardData);
  });

});

//this section deletes a card based on the id of that card
router.delete('/:id', function(req, res, next){
  var cardId = req/params.theme;
  var date = new Date();

  userCards.update({
    deletedAt : date.getTime(), //getting time stamp
  }, {
    where: {
      id:cardId,//checking if the id requested
      ownerId:'sarah95', //can't delete someone else's card!
    }//closing where-in
  })//closing update
});//closing delete

module.exports = router;
