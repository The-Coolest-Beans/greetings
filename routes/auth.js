var express = require('express');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcrypt-nodejs');
var router = express.Router();
var tokenSecret = require('./tokenSecret');
var users = require('../database/models/users.js'); // get users table from database
/* GET home page. */
router
  .post('/', function(req, res) {
    console.log('I AM HERE LISTENTING TO YOU!!!!!!');
    console.log('req.body', req.body);
    //look up user here with username and password. if found, you'll have an user object.

    //This is also used when saving a password to the database.
    var hash = bcrypt.hashSync(req.body.password);
    console.log('hashed password: ', hash);

    //Get user object from database that matches the passed email
    users.find({
      where: {
        email: req.body.name
      }
    }).then(function(foundUser) {
      var user = foundUser.dataValues;
      console.log('Authenticate this user: ', user);

      if (!user || !user.name) {
        console.log('User wan\'t found.');
        res.json({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      } else if (user) {
        console.log('Passed Password: ', req.body.password);
        console.log('Passed Password Hashed: ', hash);
        console.log('Saved Password: ', user.password);
        // check if password matches - this is where we hash the password
        if (!bcrypt.compareSync(req.body.password, user.password)) {
          console.log('User password doesn\'t match.');
          console.log('Passed Password: ', req.body.password);
          console.log('Saved Password: ', user.password);
          res.json({
            success: false,
            message: 'Authentication failed. Wrong password.'
          });
        } else {
          //check to see if the user is verified or banned
          if (!user.verifiedTF) {
            console.log('User isn\'t verified');
            res.json({
              success: false,
              message: 'Authentication failed. User not verified.'
            });
            return;
          } else if (user.bannedTF) {
            console.log('User is banned.');
            res.json({
              success: false,
              message: 'Authentication failed. User is banned.'
            });
            return;
          }
          console.log('User is verified and isn\'t banned.');

          //If the password was correct and they are verified and not banned,
          //Then continue to generate the authentication token.

          //removes the password from the user object before returning it
          delete user['password'];
          //We don't need these dates in the token
          delete user['createdAt'];
          delete user['updatedAt'];

          //This is the user data that will create the token
          console.log('user object: ', user);

          // create a token with the user data
          var token = jwt.sign(user, tokenSecret, {
            expiresInMinutes: 1440 // expires in 24 hours
          });
          console.log("token:", token);
          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token,
            user: user
          });
        };
      }; //end else-if(user)
    });

    // if(req.body.name == 'mikaela@steeleconsult.com')
    // {
    //   user = {
    //     name: 'mikaela@steeleconsult.com',
    //     password: hash,
    //     adminTF: true
    //   };
    // }
    // else {
    //   user = undefined;
    // }

  }) //end .post

;

module.exports = router;
