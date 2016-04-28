var express = require('express');//using express module
var router = express.Router();//
var templates = require('../database/models/cardTemplates.js'); // get cardTemplates table from database
var Themes = require('../database/models/themes.js');
//Include this module if you want the route secured -- i.e. user must be logged in.
//var authCheck = require('./authCheck');
//router.use(authCheck);

router.get('/', function(req, res, next) {

  // Finds and retrieves all rows of the templates table (excluding date columns).
  // After getting the data, the data will be sent to the API (That's what the 'then' is doing.)
  // Sequelize documentation: http://docs.sequelizejs.com/en/latest/

  templates.findAll({
    attributes: { exclude: ['deletedAt'] }, // Exclude from template JSON object
    include: [{
      model: Themes,
      through: {
          attributes: { exclude: ['createdAt', 'updatedAt'] } // Exclude from templateThemes JSON object
      },
      attributes: { exclude: ['createdAt', 'updatedAt', 'id'] } // Exclude these attributes from theme JSON object
    }]
  }).then(function (cardTemplates) {
    res.send(cardTemplates);

  });
});

router.get('/popular', function(req, res, next) {

  templates.findAll({
    order: [['popularity', 'DESC']],
    limit: 6,
    attributes: { exclude: ['deletedAt'] }, // Exclude from template JSON object
    include: [{
      model: Themes,
      through: {
          attributes: { exclude: ['createdAt', 'updatedAt'] } // Exclude from templateThemes JSON object
      },
      attributes: { exclude: ['createdAt', 'updatedAt', 'id'] } // Exclude these attributes from theme JSON object
    }]
  }).then(function (cardTemplates) {
    res.send(cardTemplates);
  });
});

router.get('/:id', function(req, res, next) {

  // Finds and retrieves all rows of the templates table (excluding date columns).
  // After getting the data, the data will be sent to the API (That's what the 'then' is doing.)
  // Sequelize documentation: http://docs.sequelizejs.com/en/latest/

  templates.findAll({
    attributes: { exclude: ['deletedAt'] }, // Exclude from template JSON object
    where: { id: req.params.id }
  }).then(function (cardTemplates) {
    res.send(cardTemplates);

  });
});

// Get templates by themeId
router.get('/by-theme/:themeId', function(req, res, next) {

  var themeId = req.params.themeId;
  templates.findAll({
    attributes: { exclude: ['deletedAt'] }, // Exclude from template JSON object
    include: [{
      model: Themes,
      through: {
          attributes: { exclude: ['createdAt', 'updatedAt'] }
      },
      where: { id: req.params.themeId},
      attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
    }]
  }).then(function (cardTemplates) {
    res.send(cardTemplates);

  });
});

module.exports = router;
