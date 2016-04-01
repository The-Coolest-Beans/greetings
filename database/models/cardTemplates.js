var Sequelize = require('sequelize');
var db = require('../db.js');
/* 
Tells sequelize how our database is set up so it
knows which columns to convert into which JSON fields.
*/
var CardTemplates = db.define('cardTemplates', {
  id: {
    type: Sequelize.INTEGER,
    field: 'id',
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    field: 'name'
  },
  description: {
    type: Sequelize.STRING,
    field: 'description'
  },
  imagePath: {
    type: Sequelize.STRING,
    field: 'imagePath'
  },
  defaultHeaderText: {
    type: Sequelize.STRING,
    field: 'defaultHeaderText'
  },
  defaultHeaderTextColor: {
    type: Sequelize.STRING,
    field: 'defaultHeaderTextColor'
  },
  defaultBodyText: {
    type: Sequelize.STRING,
    field: 'defaultBodyText'
  },
  defaultBodyTextColor: {
    type: Sequelize.STRING,
    field: 'defaultBodyTextColor'
  },
  deletedAt: {
    type: Sequelize.DATE,
    field: 'deletedAt'
  }
}, {
  freezeTableName: true
});

module.exports = CardTemplates;