var Sequelize = require('sequelize');
var config = require('../config.js');
var sequelize = new Sequelize('mysql://' + config.db.user + ':' + config.db.password + '@' + config.db.host + ':' + config.db.port + '/' + config.db.name);

module.exports = sequelize;

// Example on how to create a new entry into one of the tables
/*Users.sync().then(function () {
  // Table created
  return User.create({
    id: 200,
    name: 'HelloWorld2',
    password: 'Hi2',
    email: 'test2@test.com',
    admin: false,
    banned: false
  });
});*/

// Example on how to find an entry in one of the tables
/*Users.findOne().then(function (user) {
    console.log(user.name);
});*/