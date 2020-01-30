var mysql = require('mysql');
var config = require('./config.js');

class SqlObject {

  constructor(){
    this.connection = mysql.createConnection(config.mysql);
  }

  query(sql, values, callback){
    this.connection.query(sql, values, function (error, results, fields) {
      callback(error, JSON.parse(JSON.stringify(results)));
    }.bind(this));
  }

  deleteAllUsers(callback){
    let sql = "DELETE FROM Users";
    let values = [];
    this.query(sql, values, callback);
  }

  getAllUsers(callback){
    let sql = "SELECT * FROM Users";
    let values = [];
    this.query(sql, values, callback);
  }

  getUser(id, callback){
    let sql = "SELECT * FROM Users WHERE id = ?";
    let values = [id];
    this.query(sql, values, callback);
  }

  getUserByUsername(username, callback){
    let sql = "SELECT * FROM Users WHERE username = ?";
    let values = [username];
    this.query(sql, values, callback);
  }

  addUser(userName, callback){
    let sql = "INSERT INTO Users (userName) VALUES (?)";
    let values = [userName];
    this.query(sql, values, callback);
  }

  removeUser(id, callback){
    let sql = "DELETE FROM Users WHERE id = ?";
    let values = [id];
    this.query(sql, values, callback);
  }

}

module.exports = SqlObject;
