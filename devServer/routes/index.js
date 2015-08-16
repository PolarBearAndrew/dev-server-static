var express = require('express');
var router = express.Router();
var fs = require('fs');

var db = require('../data/index.js');

// //建置static html page
// router.post('/', (req, res, next) => {

// 	var path = 'public/' + req.body.name + '.html';

// 	fs.unlink(path, () => {
// 		setTimeout( () => {
// 			fs.writeFile( path, req.body.data, err => {
// 				if (err) throw err;
// 				console.log('Saved: ' + req.body.name + '.html' );
// 			});
// 		}, 1000);
// 	});
// 	res.json({ ok : 1 });
// });

//read page (using on dev)
router.get('/', (req, res, next) => {

	if( req.query.page !== undefined && req.query.data !== undefined){

		let page	 = req.query.page;  //using jade page
		let data	 = req.query.data;  //using data
		let appbar = db.appbar || {}; //appbar data

		res.render( page, { appbar: appbar, data: store[data] }); //output

	}else{ return next('頁面不存在'); }
});

//build page
router.get('/build', (req, res, next) => {



}

module.exports = router;
