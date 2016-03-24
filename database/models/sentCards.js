var Sequelize = require('sequelize');
var db = require('../db.js');

var SentCards = db.define('sentCards', {
  sentId: {
    type: Sequelize.INTEGER,
    field: 'sentId',
    primaryKey: true
  },
  cardId: {
    type: Sequelize.INTEGER,
    field: 'cardId'
  },
  toAddress: {
    type: Sequelize.STRING,
    field: 'toAddress'
  },
  fromAddress: {
    type: Sequelize.STRING,
    field: 'fromAddress'
  },
  emailBody: {
    type: Sequelize.STRING,
    field: 'emailBody'
  },
}, {
  freezeTableName: true
});

module.exports = SentCards;
