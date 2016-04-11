var express = require('express'); //using express module
var router = express.Router();
var nodemailer = require('nodemailer');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; //Turns HTTPS checks off (DANGEROUS FOR HTTPS WEBSITES)

router.get('/', function(req, res, next) {
  console.log('sendAuthEmail called');

  // create reusable transporter object using the default SMTP transport
  //NOTE!!! the 'pass' needs to be replaced with real password but it left out to keep out of git repository
  var transporter = nodemailer.createTransport(
    'smtp://greetings%40cs.nmsu.edu:pass@mailsec.cs.nmsu.edu:587'
  );

  console.log('Transporter has been created. ', transporter);

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: '"Norman Smith 👥" <mikaela@steeleconsult.com>', // sender address
    to: 'mikaela@nmsu.edu', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world 🐴', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
  };

  // send mail with defined transport object
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
