var Sequelize = require('sequelize');
var db = require('../db.js');

/* 
Tells sequelize how our database is set up so it
knows which columns to convert into which JSON fields.
*/
var SentCards = db.define('sentCards', {
  userId: {
    type: Sequelize.STRING,
    field: 'userId',
    primaryKey: true
  },
  cardId: {
    type: Sequelize.STRING,
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
