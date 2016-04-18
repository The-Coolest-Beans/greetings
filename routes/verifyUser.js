var express = require('express');//using express module
var router = express.Router();//
var users = require('../database/models/users.js'); // get users table from database

//this section updates a user's verification status based on their id
router.get('/:userID', function(req, res, next){
  console.log('verifyUser api call is starting.');

  var userID = req.params.userID;

  //this section updates the user's verified status based on the id
  users.update({
    updatedAt : new Date().getDate() + new Date().getTime(), //getting time stamp
    verifiedTF : 1,
  }, {
    where: {
      id : userID, //only update the user with the right ID
    }
  });//closing update
  return res.status(200).send({//200 indicates 'Ok'
      success: true,
      message: 'update successful'
  });

});//closing delete

module.exports = router;
