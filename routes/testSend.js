var express = require('express'); //using express module
var router = express.Router();
var nodemailer = require('nodemailer');

router.post('/', function(req, res, next) {
  console.log('testSend called');

  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport(
    'smtp://greetings%40cs.nmsu.edu:pass@mailsec.cs.nmsu.edu:587'
  );

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: '"Fred Foo 👥" <mikaela@nmsu.edu>', // sender address
    to: 'sarah95@nmsu.edu;mikaela@steeleconsult.com', // list of receivers
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
    console.log('Finished calling testSend');
    return res.status(200).send({ //200 indicates 'Ok'
      success: true,
      message: 'Email Sent'
    });
  });
});

module.exports = router;
