var express = require('express'); //using express module
var bcrypt = require('bcrypt-nodejs');
var router = express.Router();
var users = require('../database/models/users.js'); // get users table from database
var nodemailer = require('nodemailer');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; //Turns HTTPS checks off (DANGEROUS FOR HTTPS WEBSITES)

//Include this module if you want the route secured -- i.e. user must be logged in.
var authCheck = require('./authCheck');
router.use(authCheck);

router.get('/', function(req, res, next) {

  // Finds and retrieves all rows of the user table (excluding the (hashed) passwords column).
  // After getting the data, the data will be sent to the API (That's what the 'then' is doing.)
  // Sequelize documentation: http://docs.sequelizejs.com/en/latest/
  users.findAll({
    attributes: {
      exclude: ['password']
    }
  }).then(function(userList) {
    res.send(userList);
  });

  /*res.send([
    {name:'sarah95', lastLogin: 'Monday', sent: 12},
    {name:'scooper', lastLogin: 'Saturday', sent: 23},
    {name:'john_cena', lastLogin: 'Tuesday', sent: 61},
    {name:'bazinga', lastLogin: 'Tuesday', sent: 2},
    {name:'beans-r-chilled', lastLogin: 'Thursday', sent: 45},
  ]);*/

})

.patch('/login', function(req, res, next) {
    var userID = req.decoded.id;

    users.update({
      loggedIn: true, //getting time stamp
    }, {
      where: {
        id: userID, //checking if the id requested
      } //closing where-in
    }).then(function (userData){
      console.log(userData);
      res.status(200).send({
          success: true,
          message: "User has been logged in."
      });
    }).catch(function (err) {
      res.status(500).send({
          success: false,
          message: err
      });
    })

  }) //closing patch

.patch('/logout', function(req, res, next) {
    var userID = req.decoded.id;

    users.update({
      loggedIn: false, //getting time stamp
    }, {
      where: {
        id: userID, //checking if the id requested
      } //closing where-in
    }).then(function (userData){
      console.log(userData);
      res.status(200).send({
          success: true,
          message: "User has been logged out."
      });
    }).catch(function (err) {
      res.status(500).send({
          success: false,
          message: err
      });
    })

  }) //closing patch

.get('/:userID', function(req, res, next) {
    var userID = req.params.userID;

    users.find({
      where: {
        id: userID,
      }
    }).then(function(userData) {
      res.send(userData);
    });

  }) //closing get

.post('/resetPassword', function(req, res) {
  console.log('resetPassword api called.');
  var userID = req.body.userID;
  console.log('resetPassword for userID: ', userID);

  var decoded = req.decoded;

  //If the logged in user doesn't match the passed ID nor are they an admin, error
  if (decoded.id != userID && !decoded.adminTF) {
    console.log('User doesn\'t match and not an admin.');
    return res.status(400).send({ //400 indicates 'client error'
      success: false,
      message: 'User ins\'t authorized to make the change.'
    });
  }

  users.find({
    where: {
      id: userID,
    }
  }).then(function(userData) {

    if(!userData || !userData.dataValues) {
      res.json({
        success: false,
        message: 'User doesn\'t exist.'
      });
      return;
    }

    var hash = bcrypt.hashSync(req.body.newPassword);
    console.log('hashed new password: ', hash);

    // check if password matches - this is where we hash the password
    if (!bcrypt.compareSync(req.body.oldPassword, userData.dataValues.password)) {
      console.log('User password doesn\'t match.');
      //console.log('Passed Password: ', req.body.oldPassword);
      //console.log('Saved Password: ', userData.dataValues.password);
      res.status(200).send({
        success: false,
        message: 'The old password is incorrect.'
      });
      return;
    }

    //update the user record with the new password
    users.update({
        password: hash
      }, {
        where: {
          id: userID, //Only update the passed user
        } //closing where-in
      }).then(function(newData) {
        console.log('updated the record with new password.');
        res.status(200).send({
          success: true,
          message: 'Password updated.'
        });
        return;
      }) //closing update

  }); //end of user find

}) //closing reset password

.patch('/updateUser', function(req, res) {
    console.log('updateUser called.');
    var userID = req.body.userID;
    console.log('Updating userID: ', userID);

    var decoded = req.decoded; //getting the user object

    //If the logged in user doesn't match the passed ID nor are they an admin, error
    if (decoded.id != userID && !decoded.adminTF) {
      console.log('User doesn\'t match and not an admin.');
      return res.status(400).send({ //400 indicates 'client error'
        success: false,
        message: 'User ins\'t authorized to make the change.'
      });
    }

    console.log('userData: ', req.body);

    //If the email changes, a verification email will have to be resent.
    if (req.body.emailChangedTF == true) {
      console.log('updating the user with the email being changed.');

      users.find({
        where: {
          email: req.body.email,
        }
      }).then(function(userData) {
        //See if the email has been used before.
        //console.log('Got userData: ', userData);
        if (userData && userData.dataValues) {
          console.log('This email is already in use.');
          res.status(200).send({
            success: false,
            message: 'This email is already in use. Please try a new email.'
          });
          return;
        }

        //If the email isn't in use, update it and reverify the account.
        users.update({
            name: req.body.name,
            email: req.body.email,
            verifiedTF: false, //the email changed, so send the verification email
          }, {
            where: {
              id: userID, //Only update the passed user
            } //closing where-in
          }) //closing update

        // create reusable transporter object using the default SMTP transport
        //NOTE!!! the 'pass' needs to be replaced with real password but it left out to keep out of git repository
        var transporter = nodemailer.createTransport(
          'smtp://greetings%40cs.nmsu.edu:pass@mailsec.cs.nmsu.edu:587'
        );

        //send verification email
        var validateLink = 'http://greetings.cs.nmsu.edu:3000/#/verifyUser/' + userID;

        var emailBody = 'Hello ' + req.body.name + '. Your Cool Bean Card email address has been updated! Please click ' +
          'the link below to validate your new email address so you can verify your account again and ' +
          'use this wonderful website. VALIDATE LINK: ' + validateLink;

        var emailBodyHTML = '<p>Hello <b>' + req.body.name + '</b>. Your Cool Bean Card email address has been updated! ' +
          'Please click the link below to validate your new email address so you can verify your account again and ' +
          'use this wonderful website.</p> <br/><br/> <p>VALIDATE ' +
          'LINK: <a href="' + validateLink + '">' + validateLink + '</a></p>';

        // setup e-mail data with unicode symbols
        var mailOptions = {
          from: '"Cool Bean Cards" <greetings@cs.nmsu.edu>', // sender address
          to: req.body.email, //list of receivers
          subject: 'Re-validate your Cool Bean Cards Account', //Subject line
          text: emailBody, //plaintext body
          html: emailBodyHTML //html body
        };

        console.log('Send mail with the following options: ', mailOptions);

        //send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
            res.status(400).send({ //400 indicates 'Error'
              success: false,
              message: error
            });
            return;
          }
          console.log('Message sent: ' + info.response);
          res.status(200).send({ //400 indicates 'client error'
            success: true,
            message: 'User updated. Please check your new email ' + req.body.email + ' to reverify your account.'
          });
          return;
        });

      });

    } else {
      console.log('updating the user without the email changing.');
      users.update({
        name: req.body.name, //if the email isn't being updated, than just change the name
      }, {
        where: {
          id: userID, //Only update the passed user
        } //closing where-in
      }).then(function(data) {
        console.log('result: ', data);
        return res.status(200).send({ //400 indicates 'client error'
          success: true,
          message: 'User updated.'
        });
      }); //closing update
    } //closing else




  }) //end of patch

//this section deactivates an account based on the userID passed
.delete('/deactivateAccount/:userID', function(req, res) {
  console.log('deactivateAccount called.');
  var userID = req.params.userID;
  console.log('deactivating userID: ', userID);

  var decoded = req.decoded; //getting the user object

  //If the logged in user doesn't match the passed ID nor are they an admin, error
  if (decoded.id != userID && !decoded.adminTF) {
    console.log('User doesn\'t match and not an admin.');
    return res.status(400).send({ //400 indicates 'client error'
      success: false,
      message: 'User ins\'t authorized to make the change.'
    });
  }

  users.update({
      verifiedTF: false, //getting time stamp
    }, {
      where: {
        id: userID, //checking if the id requested
      } //closing where-in
    }) //closing update

  return res.status(200).send({ //400 indicates 'client error'
    success: true,
    message: 'User has been deactivated.'
  });
})

//this section bans an account based on the userID passed
.patch('/banAccount/:userID', function(req, res) {
  console.log('ban account called.');
  var userID = req.params.userID;
  console.log('banning userID: ', userID);

  var decoded = req.decoded; //getting the user object

  //If the logged in user doesn't match the passed ID nor are they an admin, error
  if (decoded.id != userID && !decoded.adminTF) {
    console.log('User doesn\'t match and not an admin.');
    return res.status(400).send({ //400 indicates 'client error'
      success: false,
      message: 'User ins\'t authorized to make the change.'
    });
  }

  users.update({
      bannedTF: true, //getting time stamp
    }, {
      where: {
        id: userID, //checking if the id requested
      } //closing where-in
    }) //closing update

  return res.status(200).send({ //400 indicates 'client error'
    success: true,
    message: 'User has been deactivated.'
  });
})

//this section bans an account based on the userID passed
.patch('/unbanAccount/:userID', function(req, res) {
  console.log('unban account called.');
  var userID = req.params.userID;
  console.log('unbanning userID: ', userID);

  var decoded = req.decoded; //getting the user object

  //If the logged in user doesn't match the passed ID nor are they an admin, error
  if (decoded.id != userID && !decoded.adminTF) {
    console.log('User doesn\'t match and not an admin.');
    return res.status(400).send({ //400 indicates 'client error'
      success: false,
      message: 'User ins\'t authorized to make the change.'
    });
  }

  users.update({
      bannedTF: false, //getting time stamp
    }, {
      where: {
        id: userID, //checking if the id requested
      } //closing where-in
    }) //closing update

  return res.status(200).send({ //400 indicates 'client error'
    success: true,
    message: 'User has been deactivated.'
  });
})

; //end of router

module.exports = router;
