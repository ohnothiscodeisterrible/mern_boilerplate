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
		throw err;
	}

	getAllUsers(callback){
		sql.getAllUsers((result)=>{
			this.items = result;
			callback(JSON.stringify(this.items));
		});
	}

	addUser(user, callback){
		if(typeof user === 'string'){
			user = user.trim();
	    if(user.length === 0){
	      this.throwError('Username must be a valid string with at least 1 character');
	    } else {
				sql.addUser(user, (result)=>{
					callback(true);
				});
			}
		} else {
			this.throwError('Username may only be a string');
		}
	}

	removeUser(index, callback){
		sql.getUser(index, (currentUser)=>{
			if(currentUser.length == 1){
				sql.removeUser(index, (result)=>{
					callback(true);
				});
			} else {
				this.throwError('No user exists with that id');
			}
		});
	}

}

module.exports = Users;
