var express = require('express');
var router = express.Router();

//Include this module if you want the route secured -- i.e. user must be logged in.
var authCheck = require('./authCheck');
router.use(authCheck);

/* GET home page. */
router
  .get('/', function(req, res, next) {
    res.send([{
      id: 1,
      name: 'Shadow',
      desc: 'tan',
      age: 10,
      weight: 15.5
    }, {
      id: 2,
      name: 'Pooh Bear',
      desc: 'white',
      age: 14,
      weight: 10.5
    }, {
      id: 3,
      name: 'Buddy',
      desc: 'spotted',
      age: 8,
      weight: 18.5
    }, ]);
  })
  .get('/:id', function(req, res, next) {
    console.log("req.params", req.params);
    res.send({
      id: req.params.id,
      name: 'Shadow',
      desc: 'tan',
      age: 10,
      weight: 15.5
    });
  })
  .post('/', function(req, res, next) {
    console.log('req.params', req.params);
    console.log('req.body', req.body);
    console.log('req.body.name (dog name that was sent:) ', req.body.name);
    res.send('Got post request');
  })
  .patch('/:id', function(req, res, next) {
    console.log('req.params', req.params);
    console.log('req.body', req.body);
    console.log('req.body.name (dog name that was sent:) ', req.body.name);
    res.send('Got patch request for ' + req.params.id);
  })
  .delete('/:id', function(req, res, next) {
    console.log('Got delete request for ', req.params.id);
    res.send('Got delete request for ' + req.params.id);
  });

module.exports = router;
