var express = require('express'); //using express module
var bcrypt = require('bcrypt-nodejs');
var randomstring = require("randomstring");
var router = express.Router();
var users = require('../database/models/users.js'); // get users table from database
var nodemailer = require('nodemailer');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; //Turns HTTPS checks off (DANGEROUS FOR HTTPS WEBSITES)


router.post('/' , function(req, res, next){

  //save the email of the user in question
  var userEmail = req.body.userEmail;
  //generate a new password
  var tempPass = randomstring.generate(8);
  //hash new password for storage
  var hash = bcrypt.hashSync(tempPass);
  //add hashed password to database at this user's email
  users.update(
    {password: hash },
    {where: {email: userEmail}}

  );//closing update

  //now send tempPass to the user
  var transporter = nodemailer.createTransport(
    'smtp://greetings%40cs.nmsu.edu:pass@mailsec.cs.nmsu.edu:587'
  );

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: '"Cool Bean Cards" <greetings@cs.nmsu.edu>', // sender address
    to: userEmail, //list of receivers
    subject: 'Your new password!', //Subject line
    text: "Here is your new password. Please log on with the following : " + tempPass, //plaintext body
    html:  '<p>Here is your new Password: <b>' + tempPass
  };

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
      message: 'Your temporary password was sent. Please check your email (' + req.body.userEmail + ')'
    });
    return;
  });
})//closing post
; //end of router

module.exports = router;
