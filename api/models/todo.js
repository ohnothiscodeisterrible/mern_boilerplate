class Todo {
	
	constructor(){
		this.title = 'Sample Todo List';
		this.items = [];
		this.items.push('Sample todo item 1');
		this.items.push('Sample todo item 2');
	}
	
	getAllItems(){
		return this.items;
	}
	
	addItem(item){
		if(typeof item === 'string'){
			this.items.push(item);
			return;
		}
		let err = new Error('Todo list may only contain strings');
		err.code = 100;
		throw err;
	}
	
	removeItem(index){
		if(index < this.items.length){
			this.items.splice(index, 1);
			return;
		}
		let err = new Error('Item does not exist in the array');
		err.code = 101;
		throw err;
	}
	
}

module.exports = Todo;