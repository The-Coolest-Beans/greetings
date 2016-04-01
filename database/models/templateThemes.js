var Sequelize = require('sequelize');
var db = require('../db.js');

/* 
Tells sequelize how our database is set up so it
knows which columns to convert into which JSON fields.
*/
var TemplateThemes = db.define('templateThemes', {
  templateId: {
    type: Sequelize.INTEGER,
    field: 'templateId',
  },
  themeId: {
    type: Sequelize.INTEGER,
    field: 'themeId'
  },
}, {
  freezeTableName: true
});

module.exports = TemplateThemes;
