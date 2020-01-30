var express = require('express');
var Users = require('../models/users');
var router = express.Router();

var allUsers = new Users();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user/get', function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');
  allUsers.getAllUsers((error, result)=>{
    if(error){
      res.statusMessage = error.message;
      res.status(error.code).end();
    } else {
      res.end(result);
    }
  });
});

router.post('/user/add', function(req, res, next) {
	if(req.body.hasOwnProperty('item')){
		try {
			res.setHeader('Content-Type', 'application/json');
      allUsers.addUser(req.body.item, (error, result)=>{
        if(error){
          res.statusMessage = error.message;
          res.status(error.code).end();
        } else {
          res.end(result.toString());
        }
      });
		} catch (error){
      res.statusMessage = error.message;
			res.status(error.code).end();
		}
	} else {
    res.statusMessage = 'Username not supplied';
		res.status(400).end();
	}
});

router.delete('/user/remove/:index', function(req, res, next) {
	if(req.params.hasOwnProperty('index')){
    try {
			res.setHeader('Content-Type', 'application/json');
      allUsers.removeUser(req.params.index, (error, result)=>{
        if(error){
          res.statusMessage = error.messsage;
          res.status(error.code).end();
        } else {
          res.end(result.toString());
        }
      });
		} catch (error){
      res.statusMessage = error.message;
			res.status(error.code).end();
		}
	} else {
    res.statusMessage = 'Id not supplied';
    res.status(400).end();
	}
});

module.exports = router;
