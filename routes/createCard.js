var express = require('express');//using express module
var router = express.Router();//
//Include this module if you want the route secured -- i.e. user must be logged in.
var authCheck = require('./authCheck');
router.use(authCheck);

var userCards = require('../database/models/userCards.js');//get user cards table from database



router.post('/' , function(req, res, next){

  userCards.create({
    templateID: 3, //This will link to the background image in the cardTemplate table
    headerText: req.body.headerText,
    headerTextColor: req.body.headerTextColor, //Will be hexidecimal color code
    bodyText: req.body.bodyText,
    bodyTextColor: req.body.bodyTextColor, //Will be hexidecimal color code
    ownerId: 'sarah95', // This is the GUID of the user who is creating the card

  })
});//closing post
