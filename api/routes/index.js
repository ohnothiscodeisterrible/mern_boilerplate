var express = require('express');
var Todo = require('../models/todo');
var router = express.Router();

var mainTodo = new Todo();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/todo/get', function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(mainTodo.getAllItems()));
});

router.post('/todo/add', function(req, res, next) {
	if(req.body.hasOwnProperty('item')){
		try {
			mainTodo.addItem(req.body.item);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(mainTodo.getAllItems()));
		}
		catch (err){
			res.status(500).send(JSON.stringify(err));
		}
	} else {
		res.status(500).send('Correct parameters not supplied');
	}
});

router.delete('/todo/remove/:index', function(req, res, next) {
	if(req.params.hasOwnProperty('index')){
		try {
			mainTodo.removeItem(req.params.index);
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(mainTodo.getAllItems()));
		}
		catch (err){
			res.status(500).send(JSON.stringify(err));
		}
	} else {
		res.status(500).send('Correct parameters not supplied');
	}
});

module.exports = router;
