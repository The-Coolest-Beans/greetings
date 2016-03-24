var Sequelize = require('sequelize');
var config = require('../config.js');

// Forms a connection URI from the information found in the configuration file (config.js)
// Creates a Sequelize object that can be used by the API to retrieve  data
// from the database, returning the data in JSON rather than tables.
// Sequelize documentation: http://docs.sequelizejs.com/en/latest/
var sequelize = new Sequelize('mysql://' + config.db.user + ':' + config.db.password + '@' + config.db.host + ':' + config.db.port + '/' + config.db.name);

module.exports = sequelize;

// Example on how to create a new entry into one of the tables using sequelize.
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

// Example on how to find an entry in one of the tables using sequelize.
// (A real example is being used in the themes API)
/*Users.findOne().then(function (user) {
    console.log(user.name);
});*/