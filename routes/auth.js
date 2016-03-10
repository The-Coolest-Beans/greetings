var express = require('express');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var router = express.Router();
var tokenSecret = require('./tokenSecret');
/* GET home page. */
router
  .post('/', function(req, res) {
    console.log('req.body', req.body);
    //look up user here with username and password. if found, you'll have an user object.
    user = {
      name: 'Greg',
      password: 'pwd1234'
    };

    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({
          success: false,
          message: 'Authentication failed. Wrong password.'
        });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, tokenSecret, {
          expiresInMinutes: 1440 // expires in 24 hours
        });
        console.log("token:", token);
        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      };
    };//end else-if(user)
  })//end .post

  ;

module.exports = router;
