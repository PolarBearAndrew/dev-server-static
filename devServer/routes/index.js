var express = require('express');
var router  = express.Router();

var request = require('request');
var list    = require('../../list.js')
var db      = require('../data/index.js');
var file    = require('../feature/fs.js');
var queryString = require('../feature/queryString.js');

//read page (using on dev)
router.get('/', (req, res, next) => {

	if( req.query.page !== undefined && req.query.data !== undefined){

		let page	 = req.query.page;  // using jade page
		let data	 = req.query.data;  // using data
		let appbar = db.appbar || {}; // appbar data
    let title  = page + '/' + data;

    // console.log('db[data]', db[data]);

		res.render( page, { appbar: appbar, data: db[data], page: page }); // output, title: title

	}else{ return next('頁面不存在'); }
});

//read page for build

//recheck queryString insid ()

//build page
router.get('/build', (req, res, next) => {

  list.forEach( ( val, index ) => {

    let name = val.page + '_' + val.data;

    // request file
    request({
      url:  queryString( 'http://127.0.0.1:8080/', { page: val.page, data: val.data } ),
      method: 'GET'

    },( err, res, data ) => {

      //delete origin files
      file.remove(name)
          .then( () => {
            return file.write( name, data )
          })
          .catch( err => {
            console.log('build file fail', err);

            res.status(500).json(err);
          });
    });
  });

  // report finish
  res.json({ count: list.length });
});

router.get('/admin', (req, res, next) => {
  res.render('_build')
});

module.exports = router;
