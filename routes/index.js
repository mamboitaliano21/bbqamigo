var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var db = req.db
  var json1 = {}
  db.view('freeFoodViews/getEventsByUni', function (err, response) {

	//var jpost = JSON.stringify(res.rows);
	var json = response.rows
	
	res.render('index', {jsonx: json});		
	});
});
router.get('/eventList/:uni', function(req, res) {
	var db = req.db
    var uni = req.params.uni
    db.view('freeFoodViews/getEventsByUni', {key: uni}, function (err, doc) {
//		console.log(doc)
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
	var db = req.db
	db.save(req.body)
	console.log(req.body);
})

module.exports = router;