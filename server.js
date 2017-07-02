var express = require('express'); 
var app = express(); 

var bodyParser = require('body-parser'); 
var cookieParser = require('cookie-parser');
 
var mongo = require('mongodb').MongoClient;  //for storage of attack files

app.set('views', './views'); 
app.set('view engine', 'pug');


//connect to the database
var db; 
mongo.connect("mongodb://localhost:27017/CanuckDB", function(err, database) {
	if(err) throw err; 
        db = database; 
        app.listen(2406, function() {console.log("server listening on 2406");});
});

app.use(express.static('views')); 


//all requests travel through this path first
app.use(function(req, res, next) {
	console.log(req.method + " request for " + req.url); 
        next();

}); 

//goes to the home page
app.get(['/', '/index.html', '/home', '/index/'], function(req, res) {

	res.render('index', {}); 

});


//this will get the feedback
app.use('/feedback', bodyParser.json()); 
app.use('/feedback', bodyParser.urlencoded({extended:true})); 

app.post('/feedback', function(req, res) {

  console.log(req.body.feedback); 

  db.collection("feedback").insert({feedback:req.body.feedback}, function(err, result) {
    if (err) {
      res.sendStatus(500); 
    } else {
      res.sendStatus(200); 
    }
}); 
});

 


