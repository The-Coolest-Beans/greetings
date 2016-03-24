var Sequelize = require('sequelize');
var db = require('../db.js');

var UserCards = db.define('userCards', {
  id: {
    type: Sequelize.INTEGER,
    field: 'cardId',
    primaryKey: true
  },
  guid: {
    type: Sequelize.STRING,
    field: 'cardGUID'
  },
  templateId: {
    type: Sequelize.INTEGER,
    field: 'templateId'
  },
  headerText: {
    type: Sequelize.STRING,
    field: 'headerText'
  },
  headerTextColor: {
    type: Sequelize.STRING,
    field: 'headerTextColor'
  },
  bodyText: {
    type: Sequelize.STRING,
    field: 'bodyText'
  },
  bodyTextColor: {
    type: Sequelize.STRING,
    field: 'bodyTextColor'
  },
  ownerId: {
    type: Sequelize.INTEGER,
    field: 'ownerId'
  },
  deletedAt: {
    type: Sequelize.DATE,
    field: 'deletedAt'
  }
}, {
  freezeTableName: true
});

module.exports = UserCards;