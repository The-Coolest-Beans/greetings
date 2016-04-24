var express = require('express'); //using express module
var router = express.Router();
var nodemailer = require('nodemailer');
var authCheck = require('./authCheck');
router.use(authCheck);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var sentCards = require('../database/models/sentCards.js');//get sent cards table from database

router.post('/', function(req, res, next) {
  console.log('sendCard called');

  // create reusable transporter object using the default SMTP transport
  //Had access to this company server, pass needs to be replaced with real password (need an account from nmsu to use instead).
  var transporter = nodemailer.createTransport('smtp://greetings%40cs.nmsu.edu:pass@mailsec.cs.nmsu.edu:587');
  var user = req.decoded;

  var fromString = '"' + user.name + '" <' + user.email + '>';
  console.log('recipient is ', req.body.toEmail);

  //Add the unique cardID link to the body text
  var cardLink = 'http://greetings.cs.nmsu.edu:3000/#/viewCard/' + req.body.cardID;

  var plainText = req.body.plainText + ' Click to view your card: ' + cardLink;
  var htmlText = req.body.htmlText + '<br/><br/> <p>Click to view your card: <a href="' + cardLink + '">' + cardLink + '</a></p>';

  //Save the sent card record to the database
  sentCards.create({
    userId: user.id, // This is the GUID of the user who is creating the card
    cardId: req.body.cardID,
    toAddress: req.body.toEmail,
    fromAddress: fromString,
    emailBodyPlain: plainText,
    emailBodyHtml: htmlText
  }).then(function (){
    console.log('Sent Card Transaction saved to database.');
  }).catch(function (err) {
    res.status(500).send({
        success: false,
        message: err
    });
  });

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: fromString,//'"Fred Foo 👥" <mikaela@steeleconsult.com>', // sender address
    to: req.body.toEmail,//'greg@steeleconsult.com, mikaela@nmsu.edu', // list of receivers
    subject: req.body.subject,//'Hello ✔', // Subject line
    text: plainText, //'Hello world 🐴', // plaintext body
    html: htmlText//'<b>Hello world 🐴</b>' // html body
  };

  console.log('send mail options: ', mailOptions);
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      return res.status(400).send({ //200 indicates 'Ok'
        success: false,
        message: error
      });
    }//closing if
    console.log('Message sent: ' + info.response);
    console.log('Finished calling sendCard');
    return res.status(200).send({ //200 indicates 'Ok'
      success: true,
      message: 'Email Sent'
    });//closing return
  });//closing send mail
}); //closing post

module.exports = router;
