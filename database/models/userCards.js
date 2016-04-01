var Sequelize = require('sequelize');
var db = require('../db.js');

/*
Tells sequelize how our database is set up so it
knows which columns to convert into which JSON fields.
*/
var UserCards = db.define('userCards', {
  id: {
    type: Sequelize.STRING,
    field: 'id',
    primaryKey: true
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
    type: Sequelize.STRING,
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
