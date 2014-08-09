var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get('/', function(req, res) {
  var db = req.db
  var json1 = {}
  db.view('freeFoodViews/getUniversities', {group: true}, function (err, response) {
	var jpost = JSON.stringify(response);
	 var json = response
	
	res.render('index', {jsonx: json});		
	});
});

router.get('/eventList/:uni', function(req, res) {
	var db = req.db
    var uni = req.params.uni
    db.view('freeFoodViews/getEventsByUni', {key: uni,include_docs: true}, function (err, doc) {
		var json = doc.rows
		res.render('eventList', {jsonx: json});	
	});
	//var jpost = JSON.stringify(res.rows);
	//res.render('helloworld', { title: 'Hello, World!' })
});	


	
	//var jpost = JSON.stringify(res.email);
	//res.render('index', {post : jpost});
  // });
	
	//console.log(jpost);
router.post('/registerEvent', function(req,res){
	var db = req.db;
	// var uni = req.body.Uni;
	// var location = req.body.Location;
	// var time = req.body.Time;
	// var organizer = req.body.Organizer;
	// var description = req.body.Description;
	// var picture = req.body.Picture;
	// var jsonx = "{Uni: " + "'" + uni + "'" + "," + "Location: " + "'" + location + "'" + "," + "Time: " + "'" + time + "'" + "," + "Organizer: " + "'" + organizer + "'" + "," + "Description: " + "'" + description +"'" + "," + "Picture: " + "'" + picture +"'" + " }";
	//var json = JSON.parse(jsonx);
	// var tmp_path = req.files.Picture.path;
	
	// console.log(req.body);
	// var target_path = '/tmp/' + req.files.Picture.name;
	// fs.readFile(target_path, function(err, data) {
	// var base64data = new Buffer(data).toString('base64');
	   
	// });
	// console.log(base64data);
	var jsonx = req.body;
	// delete jsonx.Picture;
	var json = jsonx;
	
	db.save(json);
	console.log(json);
	
	res.render('thankYou');
})

module.exports = router;
