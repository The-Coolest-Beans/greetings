var express = require('express');//using express module
var router = express.Router();//

//Include this module if you want the route secured -- i.e. user must be logged in.
var authCheck = require('./authCheck');
router.use(authCheck);

var userCards = require('../database/models/userCards.js');//get user cards table from database



//this section deletes a card based on the id of that card
router.patch('/', function(req, res, next){


  var user = req.decoded; //current user info

  userCards.update({

    deletedAt : new Date().getDate() + new Date().getTime(), //getting time stamp
  }, {
    where: {
      id: req.body.id,//checking if the id requested
      ownerId: user.id, //can't delete someone else's card!
    }//closing where-in
  }).catch(function (err) {
    res.status(500).send({
        success: false,
        message: err
    });
  }).then(function(){
  	return res.status(200).send({//200 indicates 'Ok'
      success: true,
      message: 'Update successful'
  	});
  })
});//closing delete

module.exports = router;
