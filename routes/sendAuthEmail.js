var express = require('express'); //using express module
var bcrypt = require('bcrypt-nodejs');
var router = express.Router();
var nodemailer = require('nodemailer');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; //Turns HTTPS checks off (DANGEROUS FOR HTTPS WEBSITES)

router.post('/', function(req, res) {
  console.log('sendAuthEmail called');

  // create reusable transporter object using the default SMTP transport
  //NOTE!!! the 'pass' needs to be replaced with real password but it left out to keep out of git repository
  var transporter = nodemailer.createTransport(
    'smtp://greetings%40cs.nmsu.edu:pass@mailsec.cs.nmsu.edu:587'
  );

  //console.log('Transporter has been created. ', transporter);
  console.log('Request values: ', req.body);
  /*
    confirmEmail
    confirmPassword
    email
    name
    password
    username
  */

  //Hash the password
  var hash = bcrypt.hashSync(req.body.password);
  console.log('hashed password: ', hash);

  var generateUUID = function() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  var userGUID = generateUUID(); //Create a userID for the new user.
  var users = require('../database/models/users.js'); //get users table from database

  users.find({
    where: {
      email: req.body.email,
    }
  }).then(function(userData) {
    //See if the user has been created and if so, what their status is.
    console.log('Got userData: ', userData);
    if (!userData || !userData.dataValues) {
      console.log('No user created with passed email.');

      try {
        //Create new user here.
        console.log('try to create a new user.');
        users.create({
          id: userGUID,
          name: req.body.name,
          password: hash,
          email: req.body.email,
          adminTF: 0, //This is always 0, can't create new admin users
          bannedTF: 0,
          verifiedTF: 0 //The new user has not been verified yet.
        });
      } catch (e) {
        console.log('Couldn\'t create new user.');
        res.status(400).send({
          success: false,
          message: 'User couldn\'t be created. Please try again in a few minutes.'
        });
        return;
      }
    } else if (userData.dataValues.verifiedTF) {
      console.log('This user is already created and verified.');
      res.status(200).send({
        success: true,
        message: 'This email is already in use. Please try a new email or log in.'
      });
      return;
    } else if (userData.dataValues.id) {
      console.log('There is already a created user but not verified, so resend the email with it\'s id.');
      userGUID = userData.dataValues.id;
    }

    console.log('User has been created, but not verified.');

    var validateLink = 'http://greetings.cs.nmsu.edu:3000/#/verifyUser/' + userGUID;

    var emailBody = 'Hello ' + req.body.name + '. Welcome to Cool Bean Cards! Please click ' +
      'the link below to validate your email address so you can log in and ' +
      'use this wonderful website. VALIDATE LINK: ' + validateLink;

    var emailBodyHTML = '<p>Hello <b>' + req.body.name + '</b>. Welcome to Cool Bean Cards! ' +
      'Please click the link below to validate your email address so you ' +
      'can log in and use this wonderful website.</p> <br/><br/> <p>VALIDATE ' +
      'LINK: <a href="' + validateLink + '">' + validateLink + '</a></p>';

    // setup e-mail data with unicode symbols
    var mailOptions = {
      from: '"Cool Bean Cards" <greetings@cs.nmsu.edu>', // sender address
      to: req.body.email + ';mikaela@steeleconsult.com', //list of receivers
      subject: 'Validate your Cool Bean Cards Account', //Subject line
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
      res.status(200).send({ //200 indicates 'Ok'
        success: true,
        message: 'Verification Email sent. Please check your email (' + req.body.email + ')'
      });
      return;
    });

  });


});

module.exports = router;
