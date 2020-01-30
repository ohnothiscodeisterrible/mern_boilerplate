var SqlObject =  require('../data/sqlobject');
let sql = new SqlObject();

class Users {

	constructor(){
		this.title = 'Sample User List';
		this.items = [
			{ id : '0', username : 'Sample user item 0'},
			{ id : '1', username : 'Sample user item 1'},
		];
	}

	throwError(errorText){
		let err = new Error(errorText);
		err.code = 400;
		return err;
	}

	deleteAllUsers(callback){
		sql.deleteAllUsers((error, results)=>{
			callback(error, results);
		});
	}

	getAllUsers(callback){
		sql.getAllUsers((error, result)=>{
			if(error){ callback(error); }
			this.items = result;
			callback(null, JSON.stringify(this.items));
		});
	}

	getUserByUsername(username, callback){
		sql.getUserByUsername(username, (error, result)=>{
			if(result.length === 0){
				callback(error);
			}
			callback(null, result[0]);
		});
	}

	addUser(user, callback){
		if(typeof user === 'string'){
			user = user.trim();
	    if(user.length === 0){
	      callback(this.throwError('Username must be a valid string with at least 1 character'));
	    } else {
				sql.addUser(user, (error, result)=>{
					if(error){ callback(error); }
					callback(null, true);
				});
			}
		} else {
			callback(this.throwError('Username may only be a string'));
		}
	}

	removeUser(index, callback){
		sql.getUser(index, (error, currentUser)=>{
			if(error){ callback(error, currentUser); }
			if(currentUser.length === 1){
				sql.removeUser(index, (error1, result1)=>{
					if(error1){ callback(error1); }
					callback(null, true);
				});
			} else {
				callback(this.throwError('No user exists with that id'));
			}
		});
	}

}

module.exports = Users;
