var express = require('express');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcrypt-nodejs');
var router = express.Router();
var tokenSecret = require('./tokenSecret');
/* GET home page. */
router
  .post('/', function(req, res) {
    console.log('req.body', req.body);
    //look up user here with username and password. if found, you'll have an user object.

    //This is normally used when saving a password to the database.
    var hash = bcrypt.hashSync('pwd1234');

    //Get user object from database with req.body.username (or whatever)
    user = {
      name: 'Greg',
      password: hash,
      adminTF: true
    };

    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else if (user) {

      // check if password matches - this is where we hash the password
      //if (user.password != req.body.password) {
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.json({
          success: false,
          message: 'Authentication failed. Wrong password.'
        });
      } else {

        //removes the password from the user object before returning it
        delete user['password'];

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
          token: token,
          user: user
        });
      };
    };//end else-if(user)
  })//end .post

  ;

module.exports = router;
