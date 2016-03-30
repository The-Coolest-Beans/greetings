var Sequelize = require('sequelize');
var db = require('../db.js');

/* 
Tells sequelize how our database is set up so it
knows which columns to convert into which JSON fields.
*/
var Themes = db.define('themes', {
  id: {
    type: Sequelize.INTEGER,
    field: 'id',
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    field: 'name'
  },
}, {
  freezeTableName: true
});

module.exports = Themes;
