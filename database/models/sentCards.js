var Sequelize = require('sequelize');
var db = require('../db.js');

/*
Tells sequelize how our database is set up so it
knows which columns to convert into which JSON fields.
*/
var SentCards = db.define('sentCards', {
  id: {
    type: Sequelize.INTEGER,
    field: 'id',
    primaryKey: true
  },
  userId: {
    type: Sequelize.STRING,
    field: 'userId'
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
  emailBodyPlain: {
    type: Sequelize.STRING,
    field: 'emailBodyPlain'
  },
  emailBodyHtml: {
    type: Sequelize.STRING,
    field: 'emailBodyHtml'
  },
}, {
  freezeTableName: true
});

module.exports = SentCards;
