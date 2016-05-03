var express = require('express');//using express module
var router = express.Router();//
var userCards = require('../database/models/userCards.js');//get user cards table from database

router.get('/:cardID', function(req, res) {
  console.log('Get specific card by id: ', req.params.cardID);
  userCards.find({
    where: {
        id:req.params.cardID, //get specific cardID
        deletedAt:null, //all that haven't been deleted
    }
  }).then(function (cardData){
    cardData.increment('views', {by: 1});
    res.send(cardData);
  }).catch(function (err) {
    res.status(500).send({
        success: false,
        message: err
    });
  })
})

module.exports = router;
