import React, { Component } from 'react';

class User extends Component {
	constructor(props) {
	    super(props);
	    this.state = { user : '', newItem : '', error : { visible : 'false', text : '' } }
	}

	handleError(error){
		this.setState({ error : { visible :  true, text : error.toString() }});
		setTimeout(()=>{ this.setState({ error : { visible :  false, text : '' }}) }, 5000);
	}

	getUser() {
	    fetch('http://localhost:9000/user/get')
	    	.then(res => res.text())
	    	.then(res => this.setState({ user : JSON.parse(res) }))
				.catch(err => this.handleError(err));
	}

	componentDidMount() {
	    this.getUser();
	}

	changeUser(e){
		this.setState({ newItem : e.target.value });
	}

	addUser(){
		fetch('http://localhost:9000/user/add', { method : 'post', headers: { "Content-Type": "application/json" }, body : JSON.stringify({ item : this.state.newItem }) })
  		.then(res => res.text())
  		.then(res => this.setState({ newItem : '' }))
			.then(res => this.getUser())
			.catch(err => this.handleError(err));
	}

	deleteUser(id, e){
		e.preventDefault();
		fetch('http://localhost:9000/user/remove/' + id, { method : 'delete' })
  		.then(res => res.text())
  		.then(res => this.getUser())
			.catch(err => this.handleError(err));
	}

	render(){
		let items = [];

		if(this.state.user){
			this.state.user.forEach((x)=>{
				items.push(<li key={x.id}><div className="user-item">{x.username}</div><button onClick={ this.deleteUser.bind(this, x.id) }>x</button></li>);
			});
		}

		return(
			<div className="user-div">
			<input type="text" onChange={this.changeUser.bind(this)} value={this.state.newItem}></input>
				<button onClick={this.addUser.bind(this)}>Add</button>
				<br />
				<ul className="user-list">
					{items}
				</ul>
				<span className={this.state.error.visible ? 'user-error show' : 'user-error hide' }>{this.state.error.text}</span>
			</div>
		);
	}
}

export default User;
