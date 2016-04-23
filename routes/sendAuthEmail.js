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

  //TODO: Make it to where emails that are already used don't get emails sent
  try {
    //Create new user here.
    var users = require('../database/models/users.js'); //get users table from database
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
    return res.status(400).send({
      success: false,
      message: 'User couldn\'t be created. Please try again in a few minutes.'
    });
  }

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
    to: 'mikaela@steeleconsult.com;sarah95@nmsu.edu;techie@nmsu.edu;tcaldwel@nmsu.edu',//req.body.email, //list of receivers
    subject: 'Validate your Cool Bean Cards Account', //Subject line
    text: emailBody, //plaintext body
    html: emailBodyHTML //html body
  };

  console.log('Send mail with the following options: ', mailOptions);

  //send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      return res.status(400).send({ //400 indicates 'Error'
        success: false,
        message: error
      });
    }
    console.log('Message sent: ' + info.response);
    console.log('Finished calling testSend');
    return res.status(200).send({ //200 indicates 'Ok'
      success: true,
      message: 'Email Sent'
    });
  });
});

module.exports = router;
