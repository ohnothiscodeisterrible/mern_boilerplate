import React, { Component } from 'react';

class Todo extends Component {
	constructor(props) {
	    super(props);
	    this.state = { todo : '', newItem : '', error : { visible : 'false', text : '' } }
	}
	
	handleError(error){
		this.setState({ error : { visible :  true, text : error.toString() }});
		setTimeout(()=>{ this.setState({ error : { visible :  false, text : '' }}) }, 5000);
	}

	getTodo() {
	    fetch('http://localhost:9000/todo/get')
	    	.then(res => res.text())
	    	.then(res => this.setState({ todo : JSON.parse(res) }))
				.catch(err => this.handleError(err));
	}

	componentDidMount() {
	    this.getTodo();
	}
	
	changeTodo(e){
		this.setState({ newItem : e.target.value });
	}
	
	addTodo(){
		fetch('http://localhost:9000/todo/add', { method : 'post', headers: { "Content-Type": "application/json" }, body : JSON.stringify({ item : this.state.newItem }) })
  		.then(res => res.text())
  		.then(res => this.setState({ todo : JSON.parse(res), newItem : '' }))
			.catch(err => this.handleError(err));
	}
	
	deleteTodo(id, e){
		e.preventDefault();
		fetch('http://localhost:9000/todo/remove/' + id, { method : 'delete' })
  		.then(res => res.text())
  		.then(res => this.setState({ todo : JSON.parse(res) }))
			.catch(err => this.handleError(err));
	}
	
	render(){
		let items = [];
		
		if(this.state.todo){
			this.state.todo.forEach((x, i)=>{
				items.push(<li key={i}><div className="todo-item">{x}</div><button onClick={ this.deleteTodo.bind(this, i) }>x</button></li>);
			});
		}
		
		return(
			<div className="todo-div">
			<input type="text" onChange={this.changeTodo.bind(this)} value={this.state.newItem}></input>
				<button onClick={this.addTodo.bind(this)}>Add</button>
				<br />
				<ul className="todo-list">
					{items}
				</ul>
				<span className={this.state.error.visible ? 'todo-error show' : 'todo-error hide' }>{this.state.error.text}</span>
			</div>
		);
	}
}

export default Todo;