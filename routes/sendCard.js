var express = require('express'); //using express module
var router = express.Router();
var nodemailer = require('nodemailer');
var authCheck = require('./authCheck');
router.use(authCheck);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

router.post('/', function(req, res, next) {
  console.log('testSend called');

  // create reusable transporter object using the default SMTP transport
  //Had access to this company server, pass needs to be replaced with real password (need an account from nmsu to use instead).
  var transporter = nodemailer.createTransport('smtp://greetings%40cs.nmsu.edu:pass@mailsec.cs.nmsu.edu:587');
  var user = req.decoded;

  var fromString = '"' + user.name + '" <' + user.email + '>';
  console.log('recipient is ', req.body.toEmail);
  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: fromString,//'"Fred Foo 👥" <mikaela@steeleconsult.com>', // sender address
    to: req.body.toEmail,//'greg@steeleconsult.com, mikaela@nmsu.edu', // list of receivers
    subject: req.body.subject,//'Hello ✔', // Subject line
    text: req.body.plainText, //'Hello world 🐴', // plaintext body
    html: req.body.htmlText//'<b>Hello world 🐴</b>' // html body
  };

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
    console.log('Finished calling testSend');
    return res.status(200).send({ //200 indicates 'Ok'
      success: true,
      message: 'Email Sent'
    });//closing return
  });//closing send mail
}); //closing post

module.exports = router;
