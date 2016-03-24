var express = require('express');//using express module
var router = express.Router();//


//Include this module if you want the route secured -- i.e. user must be logged in.
//var authCheck = require('./authCheck');
//router.use(authCheck);

//TODO: check the this connection works
//establishing database connection

var mysql = require('mysql');
var connection = mysql.createConnection({

  host: 'greetings.cs.nmsu.edu',
  user:'dev',
  password:'greetings12',
  database: 'greetingCards'

});

//function to display if connection unsuccessful
connection.connect(function(err){
  if(err){
    //if there is a problem display this
    console.log("There was an error connecting to the database.");
  }//closing if
  else{
      console.log("Connection to greetingCards database sucessful.");
  }//closing else

})//closing err function creation

router.get('/', function(req, res, next){

  //get all data from card template table
  var queryString = 'SELECT*FROM cardTemplates';
  connection.query(queryString, function(err, rows, fields){
    var json = rows;
    if (err) throw "Query error.";
    console.log("json out ", json);
    res.send(json);
  })//closing query
  /* Note to Adam : this is what will be returned from the database query
  json out  [ RowDataPacket {
      templateId: 1,
      templateName: 'HB_test',
      imagePath: null,
      defaultHeaderText: 'Happy Birthday!',
      defaultHeaderTextColor: 'blue',
      defaultBodyText: 'It\'s your birthday, I hope you enjoy it!',
      userId: null,
      createDT: null,
      deleteDT: null } ]
*/
})

.get('/:theme', function(req, res, next){

  var cards = [
    {id:0 , theme: 'Birthday'},
    {id:1 , theme: 'Valentine\'s Day'},
    {id:2 , theme: 'St. Patrick\'s Day'}
  ]
  var theme = req.params.theme;
  for( var i in cards){

    if(cards[i].theme === theme){
      res.send([
        cards[i]
      ]);

    }//closing if

  }//closing for

});//closing get


module.exports = router;
