var Sequelize = require('sequelize');
var db = require('../db.js');

/* 
Tells sequelize how our database is set up so it
knows which columns to convert into which JSON fields.
*/
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
