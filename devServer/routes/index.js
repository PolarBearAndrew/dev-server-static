var express = require('express');
var router = express.Router();
var fs = require('fs');

router.post('/', function(req, res, next) {
	fs.writeFile( 'public/' + req.body.name + '.html', req.body.data, function (err) {
		if (err) throw err;
		console.log('Saved: ' + req.body.name + '.html' );
	});

	res.json({ ok : 1});
});


/* GET home page. */
router.get('/index', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

module.exports = router;
