var Sequelize = require('sequelize');
var db = require('../db.js');

var CardTemplates = db.define('cardTemplates', {
  id: {
    type: Sequelize.INTEGER,
    field: 'templateId',
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    field: 'templateName'
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