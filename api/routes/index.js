var express = require('express');
var Users = require('../models/users');
var router = express.Router();

var allUsers = new Users();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user/get', function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');
  allUsers.getAllUsers((result)=>{
    res.end(result);
  });
});

router.post('/user/add', function(req, res, next) {
	if(req.body.hasOwnProperty('item')){
		try {
			res.setHeader('Content-Type', 'application/json');
      allUsers.addUser(req.body.item, (result)=>{
        res.end(result.toString());
      });
		} catch (err){
			res.status(500).send(JSON.stringify(err));
		}
	} else {
		res.status(500).send('Correct parameters not supplied');
	}
});

router.delete('/user/remove/:index', function(req, res, next) {
	if(req.params.hasOwnProperty('index')){
    try {
			res.setHeader('Content-Type', 'application/json');
      allUsers.removeUser(req.params.index, (result)=>{
        res.end(result.toString());
      });
		} catch (err){
			res.status(500).send(JSON.stringify(err));
		}
	} else {
		res.status(500).send('Correct parameters not supplied');
	}
});

module.exports = router;
