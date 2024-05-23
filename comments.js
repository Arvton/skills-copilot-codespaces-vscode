// create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// create server
var server = app.listen(3000, function(){
	console.log("Server is running on port 3000");
});

// create comments
app.post('/comments', function(req, res){
	var comment = req.body;
	var data = fs.readFileSync('comments.json');
	var json = JSON.parse(data);
	json.push(comment);
	fs.writeFileSync('comments.json', JSON.stringify(json));
	res.send(json);
});

// get comments
app.get('/comments', function(req, res){
	var data = fs.readFileSync('comments.json');
	var json = JSON.parse(data);
	res.send(json);
});