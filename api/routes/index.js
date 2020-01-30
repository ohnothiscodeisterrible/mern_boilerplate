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
      res.status(error.code).send({ 'message' : error.message });
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
          res.status(error.code).send({ 'message' : error.message });
        } else {
          res.end(result.toString());
        }
      });
		} catch (error){
			res.status(error.code).send({ 'message' : error.message });
		}
	} else {
		res.status(400).send('Username not supplied');
	}
});

router.delete('/user/remove/:index', function(req, res, next) {
	if(req.params.hasOwnProperty('index')){
    try {
			res.setHeader('Content-Type', 'application/json');
      allUsers.removeUser(req.params.index, (error, result)=>{
        if(error){
          res.status(error.code).send({ 'message' : error.message });
        } else {
          res.end(result.toString());
        }
      });
		} catch (error){
			res.status(error.code).send({ 'message' : error.message });
		}
	} else {
    res.status(400).send({ 'message' : 'Id not supplied' });
	}
});

module.exports = router;
