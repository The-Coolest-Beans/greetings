var Sequelize = require('sequelize');
var db = require('../db.js');

// createdAt and updatedAt fields are automatically defined when using sequelize
var Users = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    field: 'userId', // Will result in an attribute that is id when user facing but userId in the database
  	primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    field: 'name'
  },
  password: {
    type: Sequelize.STRING,
    field: 'password'
  },
  email: {
    type: Sequelize.STRING,
    field: 'email'
  },
  admin: {
    type: Sequelize.BOOLEAN,
    field: 'admin'
  },
  banned: {
    type: Sequelize.BOOLEAN,
    field: 'banned'
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

module.exports = Users;