var express = require('express'); //using express module
var router = express.Router();
var nodemailer = require('nodemailer');

router.get('/', function(req, res, next) {
  console.log('testSend called');

  // create reusable transporter object using the default SMTP transport
  //Had access to this company server, pass needs to be replaced with real password (need an account from nmsu to use instead).
  var transporter = nodemailer.createTransport('smtp://support%40responsivelearning.com:pass@smtp.steeleconsult.com');

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: '"Fred Foo 👥" <mikaela@steeleconsult.com>', // sender address
    to: 'greg@steeleconsult.com, mikaela@nmsu.edu', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world 🐴', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      return res.status(400).send({ //200 indicates 'Ok'
        success: false,
        message: error
      });
    }
    console.log('Message sent: ' + info.response);
  });

  console.log('Finished calling testSend');
  return res.status(200).send({ //200 indicates 'Ok'
    success: true,
    message: 'Email Sent'
  });
});

module.exports = router;
