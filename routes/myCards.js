var express = require('express');//using express module
var router = express.Router();//

//Include this module if you want the route secured -- i.e. user must be logged in.
var authCheck = require('./authCheck');
router.use(authCheck);

var Sequelize = require('sequelize');
var userCards = require('../database/models/userCards.js');//get user cards table from database
var sentCards = require('../database/models/sentCards.js');//get user cards table from database
var templates = require('../database/models/cardTemplates.js');

router.get('/', function(req, res, next){
  var decoded = req.decoded; //getting the user object

  userCards.findAll({
    where: {
        ownerId:decoded.id,//all that match my ID
        deletedAt:null, //all that haven't been deleted
    },
    include: [{
        model: templates,
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
    }]
  }).then(function (cardData){
    res.send(cardData);
  });

})

// Get cards sent
router.get('/sent', function(req, res, next){
  
  var decoded = req.decoded; //getting the user object
  
  sentCards.findAll({
    where: {
        userId:decoded.id,//all that match my ID
    },
    include: [{
        model: userCards,
        include: [{
          model: templates,
          attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        }]
    }]
  }).then(function (cardData){
    res.send(cardData);
  });

})

.get('/:cardID', function(req, res) {
  var decoded = req.decoded;
  console.log('Get specific card by id: ', req.params.cardID);
  console.log('decoded object: ', decoded);
  userCards.find({
    where: {
        id:req.params.cardID, //get specific cardID
        ownerId:decoded.id, //card belongs to logged in user
        deletedAt:null, //all that haven't been deleted
    }
  }).then(function (cardData){
    res.send(cardData);
  }).catch(function (err) {
    res.status(500).send({
        success: false,
        message: err
    });
  });
})

//this section deletes a card based on the id of that card
router.delete('/:id', function(req, res, next){
  var cardId = req.params.theme;
  var date = new Date();

  userCards.update({
    deletedAt : date.getTime(), //getting time stamp
  }, {
    where: {
      id:cardId,//checking if the id requested
      ownerId:decoded.id, //can't delete someone else's card!
    }//closing where-in
  })//closing update
});//closing delete

module.exports = router;
