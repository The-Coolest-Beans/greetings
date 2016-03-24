var express = require('express');//using express module
var router = express.Router();


module.exports = router;

router.get('/' , function(req, res, next){

  //creating connection to database
  var mysql = require('mysql');
  var connection = mysql.createConnection({

    host: 'greetings.cs.nmsu.edu',
    user:'dev',
    password:'greetings12',
    database: 'greetingCards'

  });

  //function to display if connection unsuccessful
  connection.connect(function(err){
    if(err){//if there is a problem display this{
      console.log("There was an error connecting to the database.");
    }//closing if

    else{
        console.log("Connection to greetingCards database sucessful.");
    }//closing else

  })//closing err function creation

  //now add a value for testing the cards file
  //var testCard = {templateId: 5};
  //connection.query('INSERT INTO cardTemplates SET ?', testCard,  function(err, res){
    //console.log("Result is " , res);
    //if(err) throw "Query error in connection test";
  //})//closing query
  /*
  var testName = 'Birthday';
  connection.query('UPDATE cardTemplates SET templateName = ? WHERE templateId = 5' , testName, function(err, res){
    console.log("Result is " , res);
    if(err) throw "Querry error in update";
  } )
  */

  var testId = 5;
  connection.query('DELETE from cardTemplates WHERE templateId = ?' , testId, function(err, res){
    console.log("Result is " , res);
    if(err) throw "Query error in delete by id";
  } )
}
)
