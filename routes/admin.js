var express = require('express');//using express module
var router = express.Router();//

//Include this module if you want the route secured -- i.e. user must be logged in.
var authCheck = require('./authCheck');
router.use(authCheck);


//variable corresponding to the user's table
var users = require('../database/models/users.js');//get user cards table from database
//variable corresponding to the sentCards table
var sentCards = require('../database/models/sentCards.js');
var templates = require('../database/models/cardTemplates.js');
var userCards = require('../database/models/userCards.js');
//returns all users in the database, name, email, adminTF, bannedTF, verifiedTF,
router.get('/allUsers', function(req, res, next){
  if(!req.decoded.adminTF){
    console.log("You are not authorized to perform this action.");
    return;
  }
  //var userId = req.body.id;
  users.findAll({
      attributes: { exclude: [ 'password'] }
  }).then(function (usersList){
    res.send(usersList);
  }); //closing call back function
}); // closing router get

/*That's a good question. I'm not sure what you already have done, but we need to be able to:
1. get all users (authenticated call)   CHECK - tested
2. get a specific user based on userId (which is a GUID) (authenticated call) CHECK - tested
3. get all sent cards (authenticated call) CHECK - tested
4. get all sent cards for specific user based on userId (which is a GUID) (authenticated call) CHECK - tested
5. update a specific user based on userId (which is a GUID) (authenticated call) CHECK - tested
*/


/**** ADMIN UPDATE USER FUNCTION ****
admin can change a user's info.
id of the user to change must be sent, along with all other user information except for password.
(if you haven't changed it , enter the current value)
TESTED: working as tested by Sarah
*****************************/
router.patch('/updateUser' , function(req, res, next){
  if(!req.decoded.adminTF){
    console.log("You are not authorized to perform this action.");
    return;
  }
  else{
    console.log("Welcome admin. You are authorized.");
  }
  var userId = req.body.id;
  var date = new Date();
  users.update({ // filling out all the infor
    name: req.body.name,
    email: req.body.email,
    updatedAt: date.getTime(), //fill in with current date
    adminTF: req.body.adminTF,
    bannedTF: req.body.bannedTF,
    verifiedTF: req.body.verifiedTF
  },
  //only where the id matches your request id
  {where: {
    id: userId
  }}).then(function(){
    return res.status(200).send({//200 indicates 'Ok'
    success: true,
    message: 'Update user done'

  })//closing update
});

});//closing patch

/* This function gets all of the cards that all users have sent out
TESTED : is working as looked at by Sarah
*/
router.get('/getAllSent' , function(req, res, next){
  if(!req.decoded.adminTF){
    console.log("You are not authorized to perform this action.");
    return;
  }
  else{
    console.log("Welcome admin. You are authorized.");
  }
  sentCards.findAll({
    /*return all of the sent cards, nothing here because no info to exclude.*/
    attributes: {}
  }).then(function(cardList){ // close of find all on this line
    res.send(cardList);
  })//closing response function
} );//closing get

/* This call returns a single card as requested by an admin.

*/
router.get('/getSingleSent/:cardId', function(req, res, next){
  if(!req.decoded.adminTF){
    console.log("You are not authorized to perform this action.");
    return;
  }
  else{
    console.log("Welcome admin. You are authorized.");
  }
  var id = req.params.cardId;
  userCards.findAll({
    where: {
        Id: id,//all that match my ID
    },
    include: [{
        model: templates,
        attributes: {  }
    }]
  }).then(function (cardData) {
    res.send(cardData);
  });
} ); //closing get
/*this call takes in the user guid as a param and returns all cards sent by that user
NOTE: this is very similar to 'mycards', however this calls works from the admin's perspective,
whereas my cards works from the perspective of the loggin in user.
TESTED: works as tested by Sarah
*/
router.get('/getSentByUser/:user', function(req, res, next){
  if(!req.decoded.adminTF){
    console.log("You are not authorized to perform this action.");
    return;
  }
  else{
    console.log("Welcome admin. You are authorized.");
  }
  var userId = req.params.user;
  sentCards.findAll({
    where:{
      userId:userId
    }
  }).then(function(cardList){
    res.send(cardList);
  })//closing response function
});//closing get




//returns a single user based on the id specified
//TESTED by Sarah and works
router.get('/:singleId', function(req, res, next){
  if(!req.decoded.adminTF){
    console.log("You are not authorized to perform this action.");
    return;
  }
  else{
    console.log("Welcome admin. You are authorized.");
  }
  var userId = req.params.singleId;
  users.findAll({
    where: {
      id: userId
    },//closing where
    attributes: {exclude : ['password']}//closing attributes
  }).then(function (userList){
    res.send(userList);
  });
})//closing get function
/*
Project.update(
  {
    title: 'a very different title now'
  },
  {
    where: { _id : 1 }
  })
  .success(function () {

  })
  .error(function () {

  });*/
module.exports = router;
