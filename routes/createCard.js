var express = require('express');//using express module
var router = express.Router();//
//Include this module if you want the route secured -- i.e. user must be logged in.
var authCheck = require('./authCheck');
router.use(authCheck);

var userCards = require('../database/models/userCards.js');//get user cards table from database

var generateUUID = function() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;

}



router.post('/' , function(req, res, next){

  console.log("Create call is called", req.body);//printing request data
  var tempGuid = generateUUID();//making unique card id
  console.log("guid created is " , tempGuid);
  var user = req.decoded; //user info

  userCards.create({//look into what create returns or do a try-catch

    id: tempGuid, //generate a guid for this particular card as the id
    templateId: req.body.templateId, //This will link to the background image in the cardTemplate table
    headerText: req.body.headerText,
    headerTextColor: req.body.headerTextColor, //Will be hexidecimal color code
    bodyText: req.body.bodyText,
    bodyTextColor: req.body.bodyTextColor, //Will be hexidecimal color code
    ownerId: user.id, // This is the GUID of the user who is creating the card

  })
  console.log("Done with sql insert");
  return res.status(200).send({//200 indicates 'Ok'
      success: true,
      message: 'Insert successful'
  });
});//closing post

module.exports = router;
