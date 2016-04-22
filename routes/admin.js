var express = require('express');//using express module
var router = express.Router();//

//Include this module if you want the route secured -- i.e. user must be logged in.
var authCheck = require('./authCheck');
router.use(authCheck);



var users = require('../database/models/users.js');//get user cards table from database

//returns all users in the database, name, email, adminTF, bannedTF, verifiedTF,
router.get('/userInfo', function(req, res, next){

  users.findAll({
      attributes: { exclude: ['id' , 'password'] }
  }).then(function (usersList){
    res.send(usersList);
  }); //closing call back function
}); // closing router get 

module.exports = router;
